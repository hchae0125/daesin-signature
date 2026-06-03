"use client";

import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PortfolioSection from "./components/PortfolioSection";
import MaterialSpectrum from "./components/MaterialSpectrum";
import ProcessSection from "./components/ProcessSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import EstimateChat from "./components/EstimatedChat";
import LightboxModal from "./components/LightboxModal";
import { WorkItem } from "./data/works";

export default function Page() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#3A3530] font-sans antialiased">
      {/* 1. 상단 글로벌 네비게이션 */}
      <Header onOpenChat={() => setChatOpen(true)} />

      {/* 2. 메인 핵심 섹션 리스트 */}
      <HeroSection onOpenChat={() => setChatOpen(true)} />
      <PortfolioSection onWorkSelect={(work) => setSelectedWork(work)} />
      <MaterialSpectrum />
      <ProcessSection />
      <ContactSection />

      {/* 3. 하단 글로벌 푸터 */}
      <Footer />

      {/* 4. 플로팅 챗봇 기능 */}
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

      {/* 5. 프리미엄 라이트박스 모달 */}
      <LightboxModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onOpenChat={() => {
          setSelectedWork(null);
          setChatOpen(true);
        }}
      />
    </div>
  );
}