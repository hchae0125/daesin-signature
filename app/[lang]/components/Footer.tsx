interface FooterProps {
  dict: any;
  lang: "ko" | "en";
}

export default function Footer({ dict, lang }: FooterProps) {
  const f = dict?.footer; // 💡 안전하게 다국어 푸터 노드 바인딩

  return (
    <footer className="bg-[#3A3530] text-[#E6E4DD] py-12 text-center text-[11px] border-t border-white/5">
      {/* 회사 및 브랜드명 */}
      <p className="font-bold text-white mb-2 tracking-wide">
        {f?.company}
      </p>
      
      {/* 사업자 기본 정보 */}
      <p className="opacity-60 leading-relaxed mb-3">
        {f?.info}
      </p>

      {/* 카피라이트 (선택 사항이지만 글로벌 사이트의 신뢰도를 위해 추가) */}
      <p className="text-[10px] opacity-30 font-mono tracking-wider">
        {f?.rights}
      </p>
    </footer>
  );
}