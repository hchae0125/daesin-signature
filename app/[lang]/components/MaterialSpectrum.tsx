import { swatches } from "../data/works";

export default function MaterialSpectrum({ dict, lang }: { dict: any; lang: "ko" | "en"; }) {
  const m = dict?.materials; // 💡 안전하게 옵셔널 체이닝 처리

  return (
    <section id="material-spectrum" className="bg-[#E6E4DD]/30 py-24 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 상단 타이틀 영역 */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">{m?.badge}</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">{m?.title}</h3>
          <p className="text-xs opacity-60 mt-3 max-w-xl mx-auto leading-relaxed">
            {m?.subtitle}
          </p>
        </div>

        {/* 3대 핵심 공정 특장점 (안전한 옵셔널 체이닝 `?.` 완비) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* 전통 수제 몰드 */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E4DD]/60 shadow-sm flex gap-4 items-start">
            <div className="text-lg bg-[#FAF9F5] w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E4DD] shrink-0">🛠️</div>
            <div>
              <h4 className="text-xs font-bold text-[#3A3530] mb-1">{m?.features?.mold?.title}</h4>
              <p className="text-[11px] opacity-75 leading-relaxed text-[#55524E]">{m?.features?.mold?.desc}</p>
            </div>
          </div>

          {/* 정밀 음각 */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E4DD]/60 shadow-sm flex gap-4 items-start">
            <div className="text-lg bg-[#FAF9F5] w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E4DD] shrink-0">✨</div>
            <div>
              <h4 className="text-xs font-bold text-[#3A3530] mb-1">{m?.features?.engraving?.title}</h4>
              <p className="text-[11px] opacity-75 leading-relaxed text-[#55524E]">{m?.features?.engraving?.desc}</p>
            </div>
          </div>

          {/* 책임 크래프팅 마스터 */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E4DD]/60 shadow-sm flex gap-4 items-start">
            <div className="text-lg bg-[#FAF9F5] w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E4DD] shrink-0">👨‍🎨</div>
            <div>
              <h4 className="text-xs font-bold text-[#3A3530] mb-1">{m?.features?.master?.title}</h4>
              <p className="text-[11px] opacity-75 leading-relaxed text-[#55524E]">{m?.features?.master?.desc}</p>
            </div>
          </div>

        </div>

        <hr className="border-[#E6E4DD] mb-16 max-w-xs mx-auto" />

        {/* 하단 자재 스와치 리스트 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {swatches.map((swatch) => (
            <div key={swatch.id} className="group border-b border-[#E6E4DD]/60 pb-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              
              {/* 이미지 썸네일 */}
              <div className="w-full sm:w-44 aspect-square rounded-2xl bg-white border border-[#E6E4DD]/80 flex items-center justify-center p-5 shrink-0 relative overflow-hidden">
                <img 
                  src={swatch.imgUrl} 
                  alt={swatch.name[lang]} 
                  className="w-[85%] h-[85%] object-cover rounded-lg shadow-lg transform rotate-[-12deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-105" 
                />
              </div>
              
              {/* 텍스트 설명 영역 */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2">
                  <h4 className="font-extrabold text-base text-[#3A3530]">{swatch.name[lang]}</h4>
                  
                  {/* 💡 이미 영어 페이지(lang === "en")일 때는 굳이 engName이 겹쳐 나올 필요가 없으므로 한국어일 때만 띄워주는 서브 디테일 */}
                  {lang === "ko" && (
                    <span className="text-[10px] opacity-40 font-mono">{swatch.name['en']}</span>
                  )}
                </div>
                
                <span className="inline-block text-[10px] text-[#C49A45] font-bold bg-[#E6E4DD]/40 border border-[#C49A45]/10 px-2.5 py-0.5 rounded-full mt-2">
                  {swatch.finishing[lang]}
                </span>
                <p className="text-xs opacity-75 mt-4 leading-relaxed text-[#55524E]">{swatch.description[lang]}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}