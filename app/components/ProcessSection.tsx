

export default function ProcessSection() {
  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-12">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">PROCESS</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">브랜드가 공간에 앉기까지의 여정</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 01</span>
            <h4 className="font-bold text-sm mt-4 mb-2">💬 스마트 오더 디렉팅</h4>
            <p className="text-xs opacity-75 leading-relaxed">전문 어시스턴트가 매장의 아이덴티티와 톤앤매너를 섬세하게 분석합니다.</p>
          </div>
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 02</span>
            <h4 className="font-bold text-sm mt-4 mb-2">📐 테크니컬 도안 가이드</h4>
            <p className="text-xs opacity-75 leading-relaxed">디지털 렌더링 시안은 물론, 필요 시 실제 하이엔드 금속 조각 샘플 가이드를 매칭해 실패 없는 초이스를 돕습니다.</p>
          </div>
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 03</span>
            <h4 className="font-bold text-sm mt-4 mb-2">🔨 아틀리에 익스클루시브 제작</h4>
            <p className="text-xs opacity-75 leading-relaxed">도안이 확정되면 을지로 인하우스 아틀리에에서 본격적인 정밀 주조 및 섬세한 수제 가공 마감에 돌입합니다.</p>
          </div>
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530] tracking-wide">STEP 04</span>
            <h4 className="font-bold text-sm mt-4 mb-2">📦 딜리버리 & 엔지니어 케어</h4>
            <p className="text-xs opacity-75 leading-relaxed">작품을 안전하게 안심 완충재로 포장하여 발송하며, 누구나 오차 없이 완벽히 수평 설치가 가능한 도면 전개도와 매뉴얼을 지원합니다.</p>
          </div>
        </div>
      </section>
  );
}