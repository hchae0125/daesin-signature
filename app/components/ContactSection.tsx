

export default function ProcessSection() {
  return (
     <section id="contact" className="bg-white border-t border-[#E6E4DD]/60 py-24 scroll-mt-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">PROJECT INQUIRY</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-6">브랜드의 아이덴티티를 <br />메탈에 담아냅니다 ☕</h3>
            <p className="text-xs opacity-80 leading-relaxed mb-6">프로젝트의 대략적인 규모, 원하는 소재나 디자인적 지향점을 공유해 주세요. 마스터 디자이너의 정밀한 피드백과 함께 맞춤형 스펙 사양 및 견적을 전송해 드립니다.</p>
          </div>
          <form className="space-y-4 bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]/40" onSubmit={(e) => e.preventDefault()}>
            <input type="text" className="w-full bg-white border border-[#E6E4DD] p-3 rounded-xl text-xs outline-none focus:border-[#3A3530] transition-colors" placeholder="성함 / 기업명 / 프로젝트명" />
            <textarea className="w-full bg-white border border-[#E6E4DD] p-3 rounded-xl text-xs h-24 outline-none resize-none focus:border-[#3A3530] transition-colors" placeholder="소재, 규격(가로x세로), 혹은 프로젝트의 콘셉트를 자유롭게 남겨주세요."></textarea>
            <button className="w-full bg-[#3A3530] hover:bg-[#C49A45] text-white p-3.5 rounded-xl font-bold text-xs transition-colors shadow-sm">프로젝트 문의 등록하기 💌</button>
          </form>
        </div>
      </section>
  );
}