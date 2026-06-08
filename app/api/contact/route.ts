import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 🚀 테이블 이름을 "estimates"로 정확하게 매핑하여 insert 실행
    const { data, error } = await supabase
      .from("estimates") // 💡 s가 붙은 복수형 이름으로 수정되었습니다.
      .insert([
        {
          flow_type: "inquiry",
          contact: name,
          inquiry_details: message, // 이전에 SQL로 추가한 새 컬럼명
          has_design: false,
          biz_type: null,
          category: null,
          size: null,
          estimated_price: null,
          blueprint_url: null
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}