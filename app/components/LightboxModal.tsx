// src/components/LightboxModal.tsx
"use client";

import { useState, useEffect } from "react";
import { WorkItem } from "../data/works";

interface LightboxModalProps {
  work: WorkItem | null;
  onClose: () => void;
  onOpenChat: () => void;
}

export default function LightboxModal({ work, onClose, onOpenChat }: LightboxModalProps) {
  const [activeTab, setActiveTab] = useState<"main" | "detail">("main");

  // 모달이 바뀔 때마다 탭 상태 초기화
  useEffect(() => {
    if (work) setActiveTab("main");
  }, [work]);

  if (!work) return null;

  return (
    <div className="fixed inset-0 bg-[#3A3530]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-[#FAF9F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E6E4DD]/40 flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 bg-[#3A3530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base hover:scale-105 active:scale-95 transition z-10">
          ×
        </button>

        <div className="md:w-3/5 bg-black relative aspect-[4/5] md:aspect-auto md:h-[500px]">
          <img src={activeTab === "main" ? work.bgImg : work.detailImg} alt={work.title} className="w-full h-full object-cover transition-all duration-300" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#3A3530]/80 backdrop-blur-sm px-1.5 py-1 rounded-xl flex gap-1 border border-white/10">
            <button onClick={() => setActiveTab("main")} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${activeTab === "main" ? "bg-[#C49A45] text-white" : "text-white/70 hover:text-white"}`}>
              🏡 설치 전경
            </button>
            <button onClick={() => setActiveTab("detail")} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${activeTab === "detail" ? "bg-[#C49A45] text-white" : "text-white/70 hover:text-white"}`}>
              🛠️ 표면 디테일
            </button>
          </div>
        </div>

        <div className="md:w-2/5 p-6 flex flex-col justify-between bg-white text-[#3A3530]">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-wider block mb-1">{work.category}</span>
              <h4 className="text-xl font-black tracking-tight">{work.title}</h4>
              <p className="text-xs opacity-50 mt-0.5">📍 {work.location}</p>
            </div>
            <div className="pt-4 border-t border-[#E6E4DD]/60 space-y-2">
              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#E6E4DD]/40">
                <p className="text-[10px] font-bold text-[#C49A45] mb-0.5">소재 및 표면 마감법</p>
                <p className="text-xs font-bold opacity-90">{work.material}</p>
              </div>
              <p className="text-[11px] opacity-70 leading-relaxed">
                {work.description}
              </p>
            </div>
          </div>
          <div className="pt-6 mt-6 md:mt-0 border-t border-[#E6E4DD]/60">
            <button onClick={onOpenChat} className="w-full bg-[#3A3530] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#C49A45] transition flex items-center justify-center gap-1.5 shadow-sm">
              💬 이 스타일로 실시간 견적내기
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}