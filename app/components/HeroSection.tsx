interface HeroSectionProps {
  onOpenChat: () => void;
}

export default function HeroSection({ onOpenChat }: HeroSectionProps) {
  return (
    <section className="px-6 py-28 text-center max-w-4xl mx-auto flex flex-col items-center">
      <span className="text-[10px] font-bold tracking-widest text-[#C49A45] bg-[#E6E4DD]/50 px-3 py-1 rounded-full uppercase">
        ✨ 30-Year Heritage & High-End Architecture Sign
      </span>
      
      <h2 className="text-4xl sm:text-5xl font-black mt-7 tracking-tight leading-snug text-[#3A3530]">
        공간의 첫인상을 완성하는 <br />
        <span className="text-[#C49A45]">단 하나의 프리미엄 에디션</span> 👋
      </h2>
      
      <p className="mt-6 opacity-80 text-sm sm:text-base max-w-2xl leading-relaxed">
        국내 유수의 플래그십 스토어, 감도 높은 크리에이티브 공간부터 <br />
        타임리스 디자인을 추구하는 건축물까지. 을지로 30년 헤리티지와 정교한 메탈 스펙트럼이 집약된 <br className="hidden sm:inline" />
        독보적인 Sign을 <span className="font-semibold text-[#C49A45]">복잡한 과정 없는 즉시 견적 시스템</span>으로 먼저 확인해 보세요.
      </p>
      
      <div className="mt-9 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={onOpenChat} 
          className="bg-[#3A3530] hover:bg-[#C49A45] text-white px-6 py-3.5 rounded-xl font-bold shadow-md text-sm transition-all transform hover:-translate-y-0.5"
        >
          즉시 견적 내기 →
        </button>
        <a 
          href="#portfolio" 
          className="bg-white text-[#3A3530] border border-[#E6E4DD] hover:border-[#3A3530] px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
        >
          포트폴리오 보기
        </a>
      </div>
    </section>
  );
}