export default function ProcessSection({ dict, lang }: { dict: any; lang: "ko" | "en"; }) {
  const p = dict?.process; // 💡 안전하게 다국어 프로세스 노드 바인딩

  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-12">
      
      {/* 상단 타이틀 영역 */}
      <div className="text-center mb-14">
        <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">PROCESS</span>
        <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 text-[#3A3530]">{p?.title}</h3>
      </div>

      {/* 프로세스 4단계 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* STEP 01 */}
        <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 01</span>
            <h4 className="font-bold text-sm mt-4 mb-2 text-[#3A3530]">{p?.step1?.title}</h4>
            <p className="text-xs opacity-75 leading-relaxed text-[#55524E]">{p?.step1?.desc}</p>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 02</span>
            <h4 className="font-bold text-sm mt-4 mb-2 text-[#3A3530]">{p?.step2?.title}</h4>
            <p className="text-xs opacity-75 leading-relaxed text-[#55524E]">{p?.step2?.desc}</p>
          </div>
        </div>

        {/* STEP 03 */}
        <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 03</span>
            <h4 className="font-bold text-sm mt-4 mb-2 text-[#3A3530]">{p?.step3?.title}</h4>
            <p className="text-xs opacity-75 leading-relaxed text-[#55524E]">{p?.step3?.desc}</p>
          </div>
        </div>

        {/* STEP 04 */}
        <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 04</span>
            <h4 className="font-bold text-sm mt-4 mb-2 text-[#3A3530]">{p?.step4?.title}</h4>
            <p className="text-xs opacity-75 leading-relaxed text-[#55524E]">{p?.step4?.desc}</p>
          </div>
        </div>

      </div>
    </section>
  );
}