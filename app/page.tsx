// src/app/page.tsx
"use client";

import { useState, useMemo } from "react";
import EstimateChat from "./components/EstimatedChat";
import LightboxModal from "./components/LightboxModal";
import { works, Category, categoryLabels, WorkItem } from "./data/works";

export default function Page() {
  const [active, setActive] = useState<Category>("All");
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

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

      {/* 3. 포트폴리오 섹션 */}
      <section id="portfolio" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-[#C49A45] uppercase">PORTFOLIO</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">트렌디한 공간을 만드는 작은 간판들 🌿</h3>
          <p className="text-xs opacity-50 mt-1">카드를 클릭하시면 30년 장인의 표면 마감 디테일을 크게 보실 수 있습니다.</p>
        </div>

        {/* 카테고리 필터 버튼 */}
        <div className="flex flex-wrap gap-2 justify-center my-12">
          {(["All", "Cast & Iron", "Brass & Copper", "Stainless & Gold", "Etched Plates", "Modern LED"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                active === cat ? "bg-[#3A3530] text-white" : "bg-[#E6E4DD]/60 text-[#3A3530] hover:bg-[#E6E4DD]"
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
                  <span className="bg-white/90 text-[#3A3530] text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">🔍 크게 보기</span>
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

      {/* 6. 견적양식 */}
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

      {/* 7. 플로팅 챗봇 버튼 단독 노출 */}
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

      {/* 🖼️ 8. 프리미엄 라이트박스 모달 연결 */}
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