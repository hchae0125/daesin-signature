"use client";

// 💡 함수명을 역할에 맞게 ContactSection으로 정돈합니다.
export default function ContactSection({ dict, lang }: { dict: any; lang: "ko" | "en"; }) {
  const c = dict?.contact; // 💡 안전하게 다국어 문의하기 노드 바인딩

  return (
    <section id="contact" className="bg-white border-t border-[#E6E4DD]/60 py-24 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* 왼쪽: 설명 영역 */}
        <div>
          <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">PROJECT INQUIRY</span>
          {/* 💡 <br /> 태그가 문자열로 깨지지 않고 줄바꿈으로 정확히 먹히도록 처리합니다. */}
          <h3 
            className="text-2xl sm:text-3xl font-extrabold mt-2 mb-6 text-[#3A3530]"
            dangerouslySetInnerHTML={{ __html: c?.title || "" }}
          />
          <p className="text-xs opacity-80 leading-relaxed mb-6 text-[#55524E]">
            {c?.desc}
          </p>
        </div>

        {/* 오른쪽: 입력 폼 영역 */}
        <form className="space-y-4 bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]/40" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            className="w-full bg-white border border-[#E6E4DD] p-3 rounded-xl text-xs outline-none focus:border-[#3A3530] transition-colors text-[#3A3530]" 
            placeholder={c?.placeholderName} 
          />
          <textarea 
            className="w-full bg-white border border-[#E6E4DD] p-3 rounded-xl text-xs h-24 outline-none resize-none focus:border-[#3A3530] transition-colors text-[#3A3530]" 
            placeholder={c?.placeholderMessage}
          ></textarea>
          <button className="w-full bg-[#3A3530] hover:bg-[#C49A45] text-white p-3.5 rounded-xl font-bold text-xs transition-colors shadow-sm">
            {c?.submitBtn}
          </button>
        </form>

      </div>
    </section>
  );
}