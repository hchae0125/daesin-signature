"use client";

import { useState, useEffect } from "react";
import { WorkItem } from "../data/works";

interface LightboxModalProps {
  work: WorkItem | null;
  onClose: () => void;
  onOpenChat: () => void;
  dict: any;
  lang: "ko" | "en";
}

// ⭕ 1. 파라미터 구조 분해 할당에 dict와 lang을 확실하게 추가합니다.
export default function LightboxModal({ work, onClose, onOpenChat, dict, lang }: LightboxModalProps) {
  const [activeTab, setActiveTab] = useState<"main" | "detail">("main");

  // 모달이 바뀔 때마다 탭 상태 초기화
  useEffect(() => {
    if (work) setActiveTab("main");
  }, [work]);

  if (!work) return null;

  return (
    <div className="fixed inset-0 bg-[#3A3530]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-[#FAF9F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E6E4DD]/40 flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 bg-[#3A3530] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base hover:scale-105 active:scale-95 transition z-10">
          ×
        </button>

        {/* 왼쪽: 이미지 영역 */}
        <div className="md:w-3/5 bg-black relative aspect-[4/5] md:aspect-auto md:h-[500px]">
          {/* ⭕ work.title[lang] 다국어 데이터로 대체 */}
          <img 
            src={activeTab === "main" ? work.bgImg : work.detailImg} 
            alt={work.title[lang]} 
            className="w-full h-full object-cover transition-all duration-300" 
          />
          
          {/* 이미지 탭 스위치 다국어 분기 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#3A3530]/80 backdrop-blur-sm px-1.5 py-1 rounded-xl flex gap-1 border border-white/10 w-max">
            <button 
              onClick={() => setActiveTab("main")} 
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition whitespace-nowrap ${activeTab === "main" ? "bg-[#C49A45] text-white" : "text-white/70 hover:text-white"}`}
            >
              {lang === "ko" ? "🏡 설치 전경" : "🏡 Installation View"}
            </button>
            <button 
              onClick={() => setActiveTab("detail")} 
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition whitespace-nowrap ${activeTab === "detail" ? "bg-[#C49A45] text-white" : "text-white/70 hover:text-white"}`}
            >
              {lang === "ko" ? "🛠️ 표면 디테일" : "🛠️ Surface Details"}
            </button>
          </div>
        </div>

        {/* 오른쪽: 상세 정보 영역 */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between bg-white text-[#3A3530]">
          <div className="space-y-4">
            <div>
              {/* 카테고리는 영문 공통 표기 구조이므로 그대로 노출 */}
              <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-wider block mb-1">{work.category}</span>
              
              {/* ⭕ 2. 모든 텍스트 바인딩 뒤에 [lang] 구조를 적용합니다. */}
              <h4 className="text-xl font-black tracking-tight">{work.title[lang]}</h4>
              <p className="text-xs opacity-50 mt-0.5">📍 {work.location[lang]}</p>
            </div>
            
            <div className="pt-4 border-t border-[#E6E4DD]/60 space-y-2">
              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#E6E4DD]/40">
                <p className="text-[10px] font-bold text-[#C49A45] mb-0.5">
                  {lang === "ko" ? "소재 및 표면 마감법" : "Material & Finish"}
                </p>
                <p className="text-xs font-bold opacity-90">{work.material[lang]}</p>
              </div>
              <p className="text-[11px] opacity-70 leading-relaxed">
                {work.description[lang]}
              </p>
            </div>
          </div>
          
          {/* 하단 CTA 버튼 다국어 분기 */}
          <div className="pt-6 mt-6 md:mt-0 border-t border-[#E6E4DD]/60">
            <button onClick={onOpenChat} className="w-full bg-[#3A3530] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#C49A45] transition flex items-center justify-center gap-1.5 shadow-sm">
              {lang === "ko" ? (
                <>💬 이 스타일로 실시간 견적내기</>
              ) : (
                <>💬 Get an Instant Quote for This Style</>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}