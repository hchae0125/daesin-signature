"use client";

import { useState, useMemo, useEffect } from "react";
import { works, Category, categoryLabels, WorkItem } from "../data/works";

interface PortfolioSectionProps {
  onWorkSelect: (work: WorkItem) => void;
  dict: any;
  lang: "ko" | "en";
}

export default function PortfolioSection({ onWorkSelect, dict, lang }: PortfolioSectionProps) {
  const [active, setActive] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredWorks = useMemo(() =>
    active === "All" ? works : works.filter((w) => w.category === active),
    [active]
  );

  useEffect(() => {
    setVisibleCount(6);
  }, [active]);

  return (
    <section id="portfolio" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-12">

      {/* 상단 타이틀 영역 */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">PORTFOLIO</span>
        <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 text-[#3A3530]">
          {lang === "ko" ? "트렌디한 공간을 채우는 시그니처 디자인 🌿" : "Architectural Signage Archive"}
        </h3>
        <p className="text-xs opacity-60 mt-2 text-[#55524E]">
          {lang === "ko" ? "카드를 클릭하시면 확대된 상세 컷으로 살펴보실 수 있습니다." : "Select any project to view expanded details and surface textures."}
        </p>
      </div>

      {/* 카테고리 네비게이션 & 가이드 박스 */}
      <div className="flex flex-col items-center my-12 gap-3">
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(categoryLabels).map(([key, labelObj]) => (
            <button key={key}
              onClick={() => setActive(key as Category)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${active === key
                ? "bg-[#3A3530] text-white border-[#3A3530] shadow-md"
                : "bg-white text-[#3A3530] border-[#E6E4DD] hover:border-[#3A3530]"
                }`}
            >
              {lang === "en" ? labelObj[lang].toUpperCase() : labelObj[lang]}
            </button>
          ))}
        </div>

        {/* 프로세스 인포메이션 바 */}
        <div className="text-[11px] text-[#8C8A83] bg-[#E6E4DD]/40 px-4 py-2 rounded-xl border border-[#E6E4DD]/60 text-center max-w-2xl leading-relaxed font-medium">
          {lang === "ko" ? (
            <>
              {active === "All" && "📋 전통 주물부터 하이엔드 부식·레이저 가공 및 LED까지 전 공정 아카이브"}
              {active === "Cast & Iron" && "🧱 [포함 공정] 전통 주물간판 · 철제간판"}
              {active === "Brass & Copper" && "✨ [포함 공정] 황동부식간판 · 적동부식간판 · 황동레이저간판 · 적동레이저간판"}
              {active === "Stainless & Gold" && "💿 [포함 공정] 스텐레스 부식간판 · 스텐체스레이저간판 · 아노타이징간판"}
              {active === "Etched Plates" && "🏷️ [포함 공정] 각종부식명판 · 연결식의자번호표"}
              {active === "Modern LED" && "💡 [포함 공정] LED간판"}
            </>
          ) : (
            <>
              {active === "All" && "Total Archive: From traditional foundry to high-end etching, laser-cutting, and LED systems."}
              {active === "Cast & Iron" && "Cast & Iron Works: Traditional Foundry Signage · Handcrafted Steel Signs"}
              {active === "Brass & Copper" && "Brass & Copper Atelier: Precision Etched Brass · Premium Copper · Laser-cut Finishing"}
              {active === "Stainless & Gold" && "Stainless & Gold Selection: Satin Stainless Etched · Mirror-finished Gold · Anodized Aluminum"}
              {active === "Etched Plates" && "Engraved Accents: Meticulous Nameplates · Serial Seating Indicator Plates"}
              {active === "Modern LED" && "Modern Luminance: Custom Architectural LED Signage"}
            </>
          )}
        </div>
      </div>

      {/* 포트폴리오 그리드 레이아웃 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredWorks.slice(0, visibleCount).map((work) => (
          <div
            key={work.id}
            onClick={() => onWorkSelect(work)}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E6E4DD]/30 cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#FAF9F5]">
              <img src={work.bgImg} alt={work.title[lang]} className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" />
              <img src={work.detailImg} alt={work.title[lang]} className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105" />

              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-[#3A3530] text-[11px] uppercase tracking-wider font-bold px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm transition-transform transform translate-y-2 group-hover:translate-y-0">
                  {lang === "ko" ? "🔍 자세히 보기" : "View Project"}
                </span>
              </div>
            </div>

            {/* ✨ [개선] 카드 하단 메타 정보 영역: 상하 구조 분리 (Catalogue Style) */}
            <div className="p-4 flex flex-col gap-2 bg-white">
              <h4 className={`
    text-[#3A3530] text-[15px] sm:text-[16px] 
    leading-snug block w-full
    ${lang === "en"
                  ? "font-sans-en font-medium tracking-normal" // 💡 영문은 두께를 medium(500)으로 내리고 자간을 넓힙니다.
                  : "font-bold tracking-tight"
                }
  `}>
                {work.title[lang]}
              </h4>
              {/* [상단 라인] 위치 정보와 소재 뱃지를 나란히 배치하여 기준선을 잡아줌 */}
              <div className="flex justify-between items-center text-[11px] text-[#8C8A83] tracking-tight">
                <span className="opacity-70">📍 {work.location[lang]}</span>

                {/* 영문일 때 소재가 너무 길어져서 밀리는 것을 방지하기 위해 텍스트 사이즈 미세 조정 */}
                <span className="font-bold text-[#C49A45] bg-[#FAF9F5] border border-[#E6E4DD] px-2 py-0.5 rounded-full uppercase text-[9px] sm:text-[10px] tracking-wider leading-none">
                  {work.material[lang].split(' · ')[0]}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 하단 더보기 버튼 */}
      {filteredWorks.length > visibleCount && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-white text-[#3A3530] border border-[#E6E4DD] hover:border-[#3A3530] hover:bg-[#FAF9F5] px-8 py-3 rounded-xl font-bold text-xs transition-all tracking-widest uppercase shadow-sm flex items-center gap-2"
          >
            {lang === "ko" ? "더 많은 포트폴리오 보기" : "More Works"}{" "}
            <span className="text-[10px] opacity-40 font-mono">({visibleCount} / {filteredWorks.length})</span>
          </button>
        </div>
      )}
    </section>
  );
}