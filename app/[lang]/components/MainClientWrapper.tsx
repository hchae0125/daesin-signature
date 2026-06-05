"use client";

import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import PortfolioSection from "./PortfolioSection";
import MaterialSpectrum from "./MaterialSpectrum";
import ProcessSection from "./ProcessSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import EstimateChat from "./EstimatedChat";
import LightboxModal from "./LightboxModal";
import { WorkItem } from "../data/works";

interface MainClientWrapperProps {
  dict: any;             // 번역 사전 데이터 타입
  lang: "ko" | "en";     // 현재 언어 세그먼트 ("ko" 또는 "en")
}

export default function MainClientWrapper({ dict, lang }: MainClientWrapperProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  return (
    // ⭕ 1. 최상단 부모 레이어는 max-w를 제거하고 화면 전체(w-full)를 배경색으로 채웁니다.
    <div className="w-full min-h-screen bg-[#FAF9F5] text-[#3A3530] font-sans antialiased flex flex-col">
      
      {/* 2. 상단 글로벌 네비게이션 */}
      {/* 💡 헤더 내부에서 가로폭을 잡아야 하므로 lang과 dict를 전달해 줍니다. */}
      <Header onOpenChat={() => setChatOpen(true)} dict={dict} lang={lang} />

      {/* 3. 메인 핵심 섹션 리스트 */}
      {/* 💡 각 섹션 컴포넌트 내부의 최상단 태그에 'max-w-7xl mx-auto px-4 md:px-8'를 주시면 레이아웃이 완벽해집니다. */}
      <main className="flex-1 w-full">
        <HeroSection onOpenChat={() => setChatOpen(true)} dict={dict} lang={lang} />
        <PortfolioSection onWorkSelect={(work) => setSelectedWork(work)} dict={dict} lang={lang} />
        <MaterialSpectrum dict={dict} lang={lang} />
        <ProcessSection dict={dict} lang={lang} />
        <ContactSection dict={dict} lang={lang} />
      </main>

      {/* 4. 하단 글로벌 푸터 (화면 전체 너비 밴드로 떨어지게 설정) */}
      <Footer dict={dict} lang={lang} />

      {/* 5. 플로팅 챗봇 기능 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#3A3530] text-white px-5 py-3.5 rounded-full shadow-xl font-bold text-xs flex items-center gap-2 border border-[#C49A45]/30 hover:bg-[#C49A45] transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FAF9F5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FAF9F5]"></span>
          </span>
          {lang === "ko" ? "온라인 견적 시뮬레이터" : "Online Estimator"}
        </button>
        {/* 챗봇 내부에도 다국어 텍스트 주입 */}
        <EstimateChat isOpen={chatOpen} onClose={() => setChatOpen(false)} dict={dict} lang={lang} />
      </div>

      {/* 6. 프리미엄 라이트박스 모달 */}
      <LightboxModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onOpenChat={() => {
          setSelectedWork(null);
          setChatOpen(true);
        }}
        dict={dict}
        lang={lang}
      />
    </div>
  );
}