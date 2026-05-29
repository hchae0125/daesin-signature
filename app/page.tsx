"use client";

import { useState, useMemo } from "react";
import EstimateChat from "./components/EstimatedChat";

type Category = "All" | "Cast Brass" | "Stainless/Gold" | "Modern LED" | "Etched Plates";

// 포트폴리오 아이템 타입 정의
interface WorkItem {
  id: number;
  title: string;
  location: string;
  category: Category;
  material: string;
  bgImg: string;
  detailImg: string;
}

export default function Page() {
  const [active, setActive] = useState<Category>("All");
  const [chatOpen, setChatOpen] = useState(false);
  
  // --- 📸 라이트박스 모달 상태 관리 ---
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [activeTab, setActiveTab] = useState<"main" | "detail">("main");

  const works: WorkItem[] = [
    { id: 1, title: "압구정 샌드위치", location: "압구정동, 서울", category: "Cast Brass", material: "황동 솔리드 · 헤어라인 마감", bgImg: "/asset/Brass Sign 001 exterior.png", detailImg: "/asset/Brass Sign 001.jpg" },
    { id: 2, title: "한남동 부티크", location: "한남동, 서울", category: "Etched Plates", material: "황동 에칭 · 앤티크 부식 마감", bgImg: "/asset/cast iron sign 001 exterior.png", detailImg: "/asset/cast iron sign 001.jpg" },
    { id: 3, title: "한남동 와인바", location: "한남동, 서울", category: "Cast Brass", material: "샌드캐스트 · 핸드 에이징 주물", bgImg: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000&q=80", detailImg: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1000&q=80" },
    { id: 4, title: "합정동 미니멀 베이커리", location: "합정동, 서울", category: "Stainless/Gold", material: "스테인리스 · 브러시드 골드", bgImg: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80", detailImg: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80" },
    { id: 5, title: "이태원 브런치 레스토랑", location: "이태원, 서울", category: "Modern LED", material: "브러시드 황동 · 엣지 LED 조명", bgImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80", detailImg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80" },
    { id: 6, title: "경리단길 라이프스타일 샵", location: "경리단길, 서울", category: "Etched Plates", material: "딥 에칭 · 미러 폴리시 마감", bgImg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80", detailImg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80" }
  ];

  const filtered = useMemo(() => active === "All" ? works : works.filter((w) => w.category === active), [active]);

  // 라이트박스 열기 핸들러
  const handleOpenLightbox = (work: WorkItem) => {
    setSelectedWork(work);
    setActiveTab("main"); // 열릴 때 항상 메인 설치 사진부터 표시
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#3A3530] font-sans antialiased">
      {/* 1. 네비게이션 */}
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto backdrop-blur-sm sticky top-0 z-40">
        <h1 className="text-xl font-extrabold text-[#3A3530]">대신시그니처<span className="text-[#C49A45]">.</span></h1>
        <nav className="hidden sm:flex space-x-8 text-sm font-medium opacity-80">
          <a href="#portfolio" className="hover:text-[#C49A45]">포트폴리오</a>
          <a href="#craft" className="hover:text-[#C49A45]">장인정신</a>
          <a href="#process" className="hover:text-[#C49A45]">제작과정</a>
          <a href="#contact" className="hover:text-[#C49A45]">문의</a>
        </nav>
        <button onClick={() => setChatOpen(true)} className="bg-[#3A3530] text-white px-4 py-2 rounded-full text-xs font-semibold">즉시 견적내기</button>
      </header>

      {/* 2. 히어로 섹션 */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-xs font-bold tracking-widest text-[#C49A45] bg-[#E6E4DD]/50 px-3 py-1 rounded-full">✨ 을지로 30년 장인 정신, 트렌디한 디자인</span>
        <h2 className="text-4xl sm:text-5xl font-black mt-6 tracking-tight leading-tight text-[#3A3530]">우리 가게에 딱 맞는 금속 간판, <br />같이 만들어요 👋</h2>
        <p className="mt-6 opacity-80 text-sm sm:text-base max-w-2xl">카페, 스튜디오, 작은 가게를 위한 맞춤형 황동·메탈 간판. 30년 장인의 명품 퀄리티를 부담 없는 가격과 친근한 AI 상담으로 만나보세요.</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button onClick={() => setChatOpen(true)} className="bg-[#3A3530] text-white px-6 py-3 rounded-xl font-bold shadow-md text-sm">실시간 챗봇 견적 뽑기 →</button>
          <a href="#portfolio" className="bg-white text-[#3A3530] border border-[#E6E4DD] px-6 py-3 rounded-xl font-bold text-sm">포트폴리오 보기</a>
        </div>
      </section>

      {/* 3. 포트폴리오 섹션 (클릭 액션 추가) */}
      <section id="portfolio" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-[#C49A45] uppercase">PORTFOLIO</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">트렌디한 공간을 만드는 작은 간판들 🌿</h3>
          <p className="text-xs opacity-50 mt-1">카드를 클릭하시면 30년 장인의 표면 마감 디테일을 크게 보실 수 있습니다.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {(["All", "Cast Brass", "Stainless/Gold", "Modern LED", "Etched Plates"] as Category[]).map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={`px-4 py-2 rounded-full text-xs font-semibold ${active === cat ? "bg-[#3A3530] text-white" : "bg-[#E6E4DD]/60 text-[#3A3530]"}`}>{cat === "All" ? "전체보기" : cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((work) => (
            <div 
              key={work.id} 
              onClick={() => handleOpenLightbox(work)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E6E4DD]/30 cursor-pointer hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#FAF9F5]">
                <img src={work.bgImg} alt={work.title} className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" />
                <img src={work.detailImg} alt={work.title} className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105" />
                
                {/* 호버 시 안내 레이어 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 text-[#3A3530] text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
                    🔍 크게 보기
                  </span>
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

      {/* 4. 장인정신 섹션 */}
      <section id="craft" className="bg-[#E6E4DD]/30 py-20 scroll-mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12"><span className="text-[11px] font-bold text-[#C49A45]">CRAFT</span><h3 className="text-2xl sm:text-3xl font-extrabold mt-2">30년 동안 지켜온 세 가지 약속 💛</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E6E4DD]/40">
              <div className="text-2xl bg-[#FAF9F5] w-12 h-12 rounded-xl flex items-center justify-center border border-[#E6E4DD]">🛠️</div>
              <h4 className="text-lg font-bold mt-4 mb-2">손으로 주조한 황동</h4>
              <p className="text-xs opacity-80 leading-relaxed">작업장에서 하나씩 모래 주형으로 형틀을 짜고 직접 구워내어 마감해요. 진짜 금속 고유의 묵직함을 느껴보세요.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E6E4DD]/40">
              <div className="text-2xl bg-[#FAF9F5] w-12 h-12 rounded-xl flex items-center justify-center border border-[#E6E4DD]">✨</div>
              <h4 className="text-lg font-bold mt-4 mb-2">각인, 프린트가 아니에요</h4>
              <p className="text-xs opacity-80 leading-relaxed">금속 표면에 깊이를 파내어 새기거나 녹여 붙이기 때문에 오랜 시간이 지나 비바람을 맞아도 변색되지 않아요.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E6E4DD]/40">
              <div className="text-2xl bg-[#FAF9F5] w-12 h-12 rounded-xl flex items-center justify-center border border-[#E6E4DD]">💛</div>
              <h4 className="text-lg font-bold mt-4 mb-2">한 명의 장인이 끝까지</h4>
              <p className="text-xs opacity-80 leading-relaxed">브러시드, 미러, 앤티크 부식 등 모든 공정을 숙련된 한 명의 장인이 전담하여 책임지고 사인을 남겨 드립니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 제작과정 섹션 */}
      <section id="process" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-12">
        <div className="text-center mb-12"><span className="text-[11px] font-bold text-[#C49A45]">PROCESS</span><h3 className="text-2xl sm:text-3xl font-extrabold mt-2">네 단계로 끝나요. 간단하죠?</h3></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530]">STEP 01</span>
            <h4 className="font-bold text-sm mt-3 mb-2">💬 친근한 상담</h4>
            <p className="text-xs opacity-75">공간의 전체적인 무드와 브랜드 스토리를 귀담아듣습니다.</p>
          </div>
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530]">STEP 02</span>
            <h4 className="font-bold text-sm mt-3 mb-2">📐 도안 & 샘플 제공</h4>
            <p className="text-xs opacity-75">AI 가상 시안은 물론 실제 금속 조각 샘플 가이드를 지원합니다.</p>
          </div>
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530]">STEP 03</span>
            <h4 className="font-bold text-sm mt-3 mb-2">🔨 정성껏 주조 제작</h4>
            <p className="text-xs opacity-75">형틀 주조부터 조각 작업까지 을지로 작업실에서 정성을 다해 만듭니다.</p>
          </div>
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E6E4DD] rounded text-[#3A3530]">STEP 04</span>
            <h4 className="font-bold text-sm mt-3 mb-2">📦 전문 시공 및 배송</h4>
            <p className="text-xs opacity-75">안전하게 포장하여 배송하며 전문가 시공 가이드를 지원합니다.</p>
          </div>
        </div>
      </section>

      {/* 6. 견적서식 및 푸터 */}
      <section id="contact" className="bg-white border-t border-[#E6E4DD]/60 py-20 scroll-mt-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="text-[11px] font-bold text-[#C49A45]">CONTACT</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-6">공간 이야기를 들려주세요 ☕</h3>
            <p className="text-xs opacity-80 mb-6">스타일과 사이즈를 알려주시면 신속하게 시안 피드백 및 견적을 전송해 드립니다.</p>
          </div>
          <form className="space-y-4 bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]/40" onSubmit={(e) => e.preventDefault()}>
            <input type="text" className="w-full bg-white border border-[#E6E4DD] p-2 rounded-xl text-xs outline-none" placeholder="이름" />
            <textarea className="w-full bg-white border border-[#E6E4DD] p-2 rounded-xl text-xs h-20 outline-none resize-none" placeholder="사이즈 및 제작 내용"></textarea>
            <button className="w-full bg-[#3A3530] text-white p-3 rounded-xl font-bold text-xs">문의 보내기 💌</button>
          </form>
        </div>
      </section>

      {/* 7. 플로팅 버튼 및 모듈형 챗봇 연계 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#3A3530] text-white px-5 py-3.5 rounded-full shadow-xl font-bold text-xs flex items-center gap-2 border border-[#C49A45]/30"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C49A45] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C49A45]"></span>
          </span>
          AI 실시간 견적 상담
        </button>
        <EstimateChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      {/* --- 🖼️ 8. 프리미엄 라이트박스 모달 레이어 --- */}
      {selectedWork && (
        <div className="fixed inset-0 bg-[#3A3530]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-[#FAF9F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E6E4DD]/40 flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 bg-[#3A3530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base hover:scale-105 active:scale-95 transition z-10"
            >
              ×
            </button>

            {/* 이미지 뷰어 영역 (좌측/상단) */}
            <div className="md:w-3/5 bg-black relative aspect-[4/5] md:aspect-auto md:h-[500px]">
              <img 
                src={activeTab === "main" ? selectedWork.bgImg : selectedWork.detailImg} 
                alt={selectedWork.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              
              {/* 이미지 전환 탭 버튼 (내부 배치) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#3A3530]/80 backdrop-blur-sm px-1.5 py-1 rounded-xl flex gap-1 border border-white/10">
                <button 
                  onClick={() => setActiveTab("main")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${activeTab === "main" ? "bg-[#C49A45] text-white" : "text-white/70 hover:text-white"}`}
                >
                  🏡 설치 전경
                </button>
                <button 
                  onClick={() => setActiveTab("detail")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${activeTab === "detail" ? "bg-[#C49A45] text-white" : "text-white/70 hover:text-white"}`}
                >
                  🛠️ 표면 디테일
                </button>
              </div>
            </div>

            {/* 메타 콘텐츠 설명 영역 (우측/하단) */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between bg-white text-[#3A3530]">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-wider block mb-1">
                    {selectedWork.category}
                  </span>
                  <h4 className="text-xl font-black tracking-tight">{selectedWork.title}</h4>
                  <p className="text-xs opacity-50 mt-0.5">📍 {selectedWork.location}</p>
                </div>

                <div className="pt-4 border-t border-[#E6E4DD]/60 space-y-2">
                  <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#E6E4DD]/40">
                    <p className="text-[10px] font-bold text-[#C49A45] mb-0.5">소재 및 표면 마감법</p>
                    <p className="text-xs font-bold opacity-90">{selectedWork.material}</p>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed">
                    본 시안은 을지로 대신상가 현장에서 직접 형틀을 조각하여 주조해 낸 최고급 금속 가공물입니다. 기성 아크릴/시트지 간판과 달리 햇빛과 눈비를 맞아도 고유의 깊이감이 변치 않습니다.
                  </p>
                </div>
              </div>

              {/* 행동 유도 CTA 버튼 */}
              <div className="pt-6 mt-6 md:mt-0 border-t border-[#E6E4DD]/60">
                <button 
                  onClick={() => {
                    setSelectedWork(null);
                    setChatOpen(true);
                  }}
                  className="w-full bg-[#3A3530] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#C49A45] transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  💬 이 스타일로 실시간 견적내기
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <footer className="bg-[#3A3530] text-[#E6E4DD] py-12 text-center text-[11px]">
        <p className="font-bold text-white mb-2">대신기업 (온라인 브랜드: 대신시그니처)</p>
        <p className="opacity-60">대표: 김선옥 | 주소: [서울 중구 을지로 155 대신상가 3층](https://dns.daesinsign.co.kr/)</p>
      </footer>
    </div>
  );
}