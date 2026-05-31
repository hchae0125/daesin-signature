"use client";

import { useState, useMemo } from "react";
import EstimateChat from "./components/EstimatedChat"; 
import LightboxModal from "./components/LightboxModal";
import { works, Category, categoryLabels, WorkItem } from "./data/works";

// 🎨 디지털 소재 스와치 데이터 인터페이스 및 데이터 선언
interface MaterialSwatch {
  id: string;
  name: string;
  engName: string;
  finishing: string;
  description: string;
  zoomImg: string;     // 표면 마감 접사 이미지 (기본)
  contextImg: string;  // 실제 적용 및 완공 이미지 (호버 시)
}

const swatches = [
  {
    id: "brass-hl",
    name: "리얼 황동 헤어라인",
    engName: "Real Brass Hairline",
    finishing: "정밀 브러시드 공정 (Brushed)",
    description: "금속 표면에 정교한 직선 결을 내어 빛을 은은하게 흡수하고 분산시킵니다. 타임리스하고 클래식한 건축물 파사드나 프리미엄 브랜드 플래그십에 주로 사용됩니다.",
    imgUrl: "/materials/real_brass.png"
  },
  {
    id: "stainless-mirror",
    name: "스테인리스 폴리싱 미러",
    engName: "SUS Polishing Mirror",
    finishing: "초정밀 광택 공정 (Polishing)",
    description: "왜곡 없이 사물이 비치는 고난도 거울면 마감입니다. 미니멀하고 미래지향적인 무드를 연출하며, 크롬 특유의 높은 반사율로 공간에 강렬한 오브제 역할을 합니다.",
    imgUrl: "/materials/SUS.png"
  },
  {
    id: "copper-patina",
    name: "적동 빈티지 파티나 부식",
    engName: "Copper Vintage Patina",
    finishing: "화학적 에이징 공정 (Aged)",
    description: "시간의 깊이를 정밀하게 시뮬레이션한 수제 부식 마감입니다. 인하우스 마스터가 직접 부식 밀도를 제어하여, 모든 개체가 예술품처럼 고유한 패턴의 질감을 가집니다.",
    imgUrl: "/materials/Cooper.png"
  }
];

export default function Page() {
  const [active, setActive] = useState<Category>("All");
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  
  // 스와치 호버 상태 관리를 위한 ID 세팅
  const [hoveredSwatchId, setHoveredSwatchId] = useState<string | null>(null);

  const filteredWorks = useMemo(() =>
    active === "All" ? works : works.filter((w) => w.category === active),
    [active]
  );

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#3A3530] font-sans antialiased">
      {/* 1. 네비게이션 */}
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto backdrop-blur-sm sticky top-0 z-40">
        <h1 className="text-xl font-extrabold text-[#3A3530]">대신시그니처<span className="text-[#C49A45]">.</span></h1>
        <nav className="hidden sm:flex space-x-8 text-sm font-medium opacity-80">
          <a href="#portfolio" className="hover:text-[#C49A45] transition-colors">포트폴리오</a>
          <a href="#material-spectrum" className="hover:text-[#C49A45] transition-colors">브랜드 가치</a>
          <a href="#process" className="hover:text-[#C49A45] transition-colors">프로세스</a>
          <a href="#contact" className="hover:text-[#C49A45] transition-colors">문의하기</a>
        </nav>
        <button onClick={() => setChatOpen(true)} className="bg-[#3A3530] hover:bg-[#C49A45] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm">즉시 견적내기</button>
      </header>

      {/* 2. 히어로 섹션 */}
      <section className="px-6 py-28 text-center max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-widest text-[#C49A45] bg-[#E6E4DD]/50 px-3 py-1 rounded-full uppercase">✨ 30-Year Heritage & High-End Architecture Sign</span>
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
          <button onClick={() => setChatOpen(true)} className="bg-[#3A3530] hover:bg-[#C49A45] text-white px-6 py-3.5 rounded-xl font-bold shadow-md text-sm transition-all transform hover:-translate-y-0.5">즉시 견적 내기 →</button>
          <a href="#portfolio" className="bg-white text-[#3A3530] border border-[#E6E4DD] hover:border-[#3A3530] px-6 py-3.5 rounded-xl font-bold text-sm transition-all">포트폴리오 보기</a>
        </div>
      </section>

      {/* 3. 포트폴리오 섹션 */}
      <section id="portfolio" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">PORTFOLIO</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 text-[#3A3530]">트렌디한 공간을 채우는 시그니처 디자인 🌿</h3>
          <p className="text-xs opacity-60 mt-2">카드를 클릭하시면 대신시그니처만의 세밀한 메탈 표면 마감 감도를 원본 비율로 확인하실 수 있습니다.</p>
        </div>

        {/* 카테고리 필터 버튼 */}
        <div className="flex flex-wrap gap-2 justify-center my-12">
          {(["All", "Cast & Iron", "Brass & Copper", "Stainless & Gold", "Etched Plates", "Modern LED"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${active === cat ? "bg-[#3A3530] text-white shadow-sm" : "bg-[#E6E4DD]/60 text-[#3A3530] hover:bg-[#E6E4DD]"
                }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => setSelectedWork(work)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E6E4DD]/30 cursor-pointer hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#FAF9F5]">
                <img src={work.bgImg} alt={work.title} className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" />
                <img src={work.detailImg} alt={work.title} className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 text-[#3A3530] text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">🔍 자세히 보기</span>
                </div>
              </div>
              <div className="p-5 flex justify-between items-center bg-white">
                <div>
                  <h4 className="font-bold text-sm text-[#3A3530]">{work.title}</h4>
                  <p className="text-[11px] opacity-50">{work.location}</p>
                </div>
                <span className="text-[10px] font-bold text-[#C49A45] bg-[#FAF9F5] border border-[#E6E4DD] px-2 py-0.5 rounded-full uppercase">
                  {work.material.split(' · ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* 4. 브랜드 가치 및 디지털 메탈 스와치 아카이브 공간 */}
      <section id="material-spectrum" className="bg-[#E6E4DD]/30 py-24 scroll-mt-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* 4-A. 섹션 헤더 */}
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">OUR VALUE & MATERIAL</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">시간이 흐를수록 깊어지는 영속적인 가치 💛</h3>
            <p className="text-xs opacity-60 mt-3 max-w-xl mx-auto leading-relaxed">
              을지로 30년 헤리티지가 담긴 고집스러운 철학과, 대신시그니처 아틀리에에서 완성되는 <br className="hidden sm:inline" />
              하이엔드 메탈 공정의 정교한 표면 질감을 한눈에 탐색해 보세요.
            </p>
          </div>

          {/* 4-B. 브랜드 핵심 가치 미니 카드 (상단 배치) */}
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
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6E4DD]/60 shadow-sm flex gap-4 items-start flex-1">
              <div className="text-lg bg-[#FAF9F5] w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E4DD] shrink-0">👨‍🎨</div>
              <div>
                <h4 className="text-xs font-bold text-[#3A3530] mb-1">책임 크래프팅 마스터</h4>
                <p className="text-[11px] opacity-75 leading-relaxed text-[#55524E]">공장식 분업을 배제하고, 숙련된 인하우스 마스터가 표면 브러싱부터 최종 피니싱까지 전 공정을 책임집니다.</p>
              </div>
            </div>
          </div>

          <hr className="border-[#E6E4DD] mb-16 max-w-xs mx-auto" />

          {/* 4-C. 디지털 스와치 그리드 (하단 배치) */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
      {swatches.map((swatch) => (
        <div 
          key={swatch.id}
          className="group border-b border-[#E6E4DD]/60 pb-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start transition-all duration-300"
        >
          {/* 레퍼런스 PDF 스타일: 화이트 베이스 판 위에 입체감 있게 안착된 메탈 칩 */}
          <div className="w-full sm:w-44 aspect-square rounded-2xl bg-white border border-[#E6E4DD]/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] flex items-center justify-center p-5 shrink-0 relative overflow-hidden">
            
            {/* 정밀 공정을 상징하는 미니멀 모눈 격자선 배경 */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:12px_12px]"></div>
            
            <img 
              src={swatch.imgUrl} 
              alt={swatch.name}
              // 💡 레퍼런스 특유의 45도 사선 각도(rotate-[-12deg])와 고급스러운 부드러운 그림자를 완벽 구현했습니다.
              className="w-[85%] h-[85%] object-cover rounded-lg shadow-[5px_12px_20px_rgba(0,0,0,0.12)] border border-black/5 transform rotate-[-12deg] transition-all duration-500 ease-in-out group-hover:rotate-0 group-hover:scale-105"
            />
          </div>

          {/* 우측 텍스트 정보 구역 */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2 gap-y-1">
              <h4 className="font-extrabold text-base text-[#3A3530] tracking-tight">{swatch.name}</h4>
              <span className="text-[10px] opacity-40 font-mono tracking-tight">{swatch.engName}</span>
            </div>
            <span className="inline-block text-[10px] text-[#C49A45] font-bold bg-[#E6E4DD]/40 border border-[#C49A45]/10 px-2.5 py-0.5 rounded-full mt-2">
              {swatch.finishing}
            </span>
            <p className="text-xs opacity-75 mt-4 leading-relaxed font-normal text-[#55524E]">
              {swatch.description}
            </p>
          </div>
        </div>
      ))}
    </div>
        </div>
      </section>

      {/* 5. 제작과정 섹션 */}
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

      {/* 6. 견적양식 */}
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

      {/* 7. 플로팅 챗봇 버튼 단독 노출 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#3A3530] text-white px-5 py-3.5 rounded-full shadow-xl font-bold text-xs flex items-center gap-2 border border-[#C49A45]/30 hover:bg-[#C49A45] transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FAF9F5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FAF9F5]"></span>
          </span>
          온라인 견적 시뮬레이터
        </button>
        <EstimateChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      {/* 8. 프리미엄 라이트박스 모달 연결 */}
      <LightboxModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onOpenChat={() => {
          setSelectedWork(null);
          setChatOpen(true);
        }}
      />

      <footer className="bg-[#3A3530] text-[#E6E4DD] py-12 text-center text-[11px]">
        <p className="font-bold text-white mb-2">대신기업 (온라인 브랜드: 대신시그니처)</p>
        <p className="opacity-60">대표: 김선옥 | 주소: 서울 중구 을지로 155 대신상가 3층</p>
      </footer>
    </div>
  );
}