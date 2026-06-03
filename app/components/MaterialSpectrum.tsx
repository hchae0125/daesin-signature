import { swatches } from "../data/works";

export default function MaterialSpectrum() {
  return (
    <section id="material-spectrum" className="bg-[#E6E4DD]/30 py-24 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">OUR VALUE & MATERIAL</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">시간이 흐를수록 깊어지는 영속적인 가치 💛</h3>
          <p className="text-xs opacity-60 mt-3 max-w-xl mx-auto leading-relaxed">
            을지로 30년 헤리티지가 담긴 고집스러운 철학과, 대신시그니처 아틀리에에서 완성되는 <br className="hidden sm:inline" />
            하이엔드 메탈 공정의 정교한 표면 질감을 한눈에 탐색해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E4DD]/60 shadow-sm flex gap-4 items-start">
            <div className="text-lg bg-[#FAF9F5] w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E4DD] shrink-0">🛠️</div>
            <div>
              <h4 className="text-xs font-bold text-[#3A3530] mb-1">전통 수제 몰드 주조</h4>
              <p className="text-[11px] opacity-75 leading-relaxed text-[#55524E]">모래 형틀에 쇳물을 부어 기계 프레스가 흉내 낼 수 없는 묵직한 메탈 고유의 밀도를 표현합니다.</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E4DD]/60 shadow-sm flex gap-4 items-start">
            <div className="text-lg bg-[#FAF9F5] w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E4DD] shrink-0">✨</div>
            <div>
              <h4 className="text-xs font-bold text-[#3A3530] mb-1">정밀 음각 및 본딩</h4>
              <p className="text-[11px] opacity-75 leading-relaxed text-[#55524E]">단순 프린팅이 아닌 금속 자체를 파내는 부식 및 조각 공정으로 수십 년간 변함없는 영속성을 가집니다.</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E4DD]/60 shadow-sm flex gap-4 items-start">
            <div className="text-lg bg-[#FAF9F5] w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E4DD] shrink-0">👨‍🎨</div>
            <div>
              <h4 className="text-xs font-bold text-[#3A3530] mb-1">책임 크래프팅 마스터</h4>
              <p className="text-[11px] opacity-75 leading-relaxed text-[#55524E]">공장식 분업을 배제하고, 숙련된 인하우스 마스터가 표면 브러싱부터 최종 피니싱까지 전 공정을 책임집니다.</p>
            </div>
          </div>
        </div>

        <hr className="border-[#E6E4DD] mb-16 max-w-xs mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {swatches.map((swatch) => (
            <div key={swatch.id} className="group border-b border-[#E6E4DD]/60 pb-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="w-full sm:w-44 aspect-square rounded-2xl bg-white border border-[#E6E4DD]/80 flex items-center justify-center p-5 shrink-0 relative overflow-hidden">
                <img src={swatch.imgUrl} alt={swatch.name} className="w-[85%] h-[85%] object-cover rounded-lg shadow-lg transform rotate-[-12deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-105" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2">
                  <h4 className="font-extrabold text-base text-[#3A3530]">{swatch.name}</h4>
                  <span className="text-[10px] opacity-40 font-mono">{swatch.engName}</span>
                </div>
                <span className="inline-block text-[10px] text-[#C49A45] font-bold bg-[#E6E4DD]/40 border border-[#C49A45]/10 px-2.5 py-0.5 rounded-full mt-2">
                  {swatch.finishing}
                </span>
                <p className="text-xs opacity-75 mt-4 leading-relaxed text-[#55524E]">{swatch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}