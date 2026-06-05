import React from "react";

interface HeaderProps {
  onOpenChat: () => void;
  dict: any;
  lang: "ko" | "en";
}

export default function Header({ onOpenChat, dict, lang }: HeaderProps) {
  return (
    // ⭕ 1. 배경을 화면 끝까지(w-full) 채우고, sticky와 블러 처리는 여기에 줍니다.
    <header className="w-full bg-[#FAF9F5]/80 backdrop-blur-sm sticky top-0 z-40 border-b border-[#EAE6DF]/40">
      
      {/* ⭕ 2. 원래 쓰시던 정렬 방식(justify-between max-w-6xl mx-auto p-6)을 그대로 안쪽 상자에 적용합니다. */}
      <div className="max-w-6xl mx-auto p-6 flex justify-between items-center">
        
        {/* 로고 영역 */}
        <h1 className="text-xl font-extrabold text-[#3A3530]">
          <a href={`/${lang}`}>
            대신시그니처<span className="text-[#C49A45]">.</span>
          </a>
        </h1>

        {/* 네비게이션 링크 메뉴 (다국어 사전 데이터 연동) */}
        <nav className="hidden sm:flex space-x-8 text-sm font-medium opacity-80 text-[#3A3530]">
          <a href={`/${lang}/#portfolio`} className="hover:text-[#C49A45] transition-colors">
            {dict.header?.portfolio || "포트폴리오"}
          </a>
          <a href={`/${lang}/#material-spectrum`} className="hover:text-[#C49A45] transition-colors">
            {dict.header?.value || "브랜드 가치"}
          </a>
          <a href={`/${lang}/#process`} className="hover:text-[#C49A45] transition-colors">
            {dict.header?.process || "프로세스"}
          </a>
          <a href={`/${lang}/#contact`} className="hover:text-[#C49A45] transition-colors">
            {dict.header?.contact || "문의하기"}
          </a>
        </nav>

        {/* CTA 버튼 */}
        <button 
          onClick={onOpenChat} 
          className="bg-[#3A3530] hover:bg-[#C49A45] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
        >
          {dict.header?.cta || "즉시 견적내기"}
        </button>

      </div>
    </header>
  );
}