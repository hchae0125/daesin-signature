interface HeroSectionProps {
  onOpenChat: () => void;
  dict: any;
  lang: "ko" | "en";
}

// ⭕ 파라미터 구조 분해 할당에 dict와 lang을 추가합니다.
export default function HeroSection({ onOpenChat, dict, lang }: HeroSectionProps) {
  const h = dict?.hero; // 💡 안전하게 다국어 히어로 노드 바인딩

  return (
    <section className="px-6 py-28 text-center max-w-4xl mx-auto flex flex-col items-center">
      {/* 상단 뱃지 */}
      <span className="text-[10px] font-bold tracking-widest text-[#C49A45] bg-[#E6E4DD]/50 px-3 py-1 rounded-full uppercase">
        {h?.badge}
      </span>
      
      {/* 💡 타이틀 내부 HTML 태그 수용 구조로 변경 */}
      <h2 
        className="text-4xl sm:text-5xl font-black mt-7 tracking-tight leading-snug text-[#3A3530]"
        dangerouslySetInnerHTML={{ __html: h?.title || "" }}
      />
      
      {/* 💡 디스크립션 내부 HTML 태그 수용 구조로 변경 */}
      <p 
        className="mt-6 opacity-80 text-sm sm:text-base max-w-2xl leading-relaxed text-[#55524E]"
        dangerouslySetInnerHTML={{ __html: h?.desc || "" }}
      />
      
      {/* CTA 버튼 그룹 */}
      <div className="mt-9 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={onOpenChat} 
          className="bg-[#3A3530] hover:bg-[#C49A45] text-white px-6 py-3.5 rounded-xl font-bold shadow-md text-sm transition-all transform hover:-translate-y-0.5"
        >
          {h?.ctaQuote}
        </button>
        <a 
          href="#portfolio" 
          className="bg-white text-[#3A3530] border border-[#E6E4DD] hover:border-[#3A3530] px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
        >
          {h?.ctaPortfolio}
        </a>
      </div>
    </section>
  );
}