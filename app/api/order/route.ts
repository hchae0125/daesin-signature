// src/app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase 어드민 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bizType, category, size, contact } = body;

    // 예외 처리: 허수 진입 차단 (연락처 공백 방지)
    if (!contact || contact.trim() === "") {
      return NextResponse.json({ success: false, message: "연락처가 누락되었습니다." }, { status: 400 });
    }

    // 1. Supabase DB에 진성 고객의 오더 기록 인서트
    const { data, error } = await supabase
      .from("orders")
      .insert([
        { 
          biz_type: bizType, 
          category: category, 
          size: size, 
          contact: contact,
          status: "PENDING" // 사장님 검토 대기 상태
        }
      ])
      .select();

    if (error) {
      throw new Error(`Supabase Insert Error: ${error.message}`);
    }

    // 2. 사장님 폰으로 즉시 알림 발송 (Slack Webhook 연동)
    if (process.env.SLACK_WEBHOOK_URL) {
      const kstTime = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
      
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🔔 **[대신시그니처] 진성 오더 접수 완료!**\n\n• **접수 시간:** ${kstTime} (KST)\n• **업종 무드:** ${bizType}\n• **원하는 소재:** ${category}\n• **요청 사이즈:** ${size}\n\n📱 **고객 연락처:** \`${contact}\` \n\n*데이터가 Supabase에 안전하게 보관되었습니다. 미국 아침 기상 후 도안 검토를 진행해 주세요!*`
        })
      });
    }

    return NextResponse.json({ success: true, order: data[0] });

  } catch (error: any) {
    console.error("🚨 Order Processing Pipeline Failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}