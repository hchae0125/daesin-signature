interface HeaderProps {
  onOpenChat: () => void;
}

export default function Header({ onOpenChat }: HeaderProps) {
  return (
    <header className="p-6 flex justify-between items-center max-w-6xl mx-auto backdrop-blur-sm sticky top-0 z-40">
      <h1 className="text-xl font-extrabold text-[#3A3530]">
        대신시그니처<span className="text-[#C49A45]">.</span>
      </h1>
      <nav className="hidden sm:flex space-x-8 text-sm font-medium opacity-80">
        <a href="#portfolio" className="hover:text-[#C49A45] transition-colors">포트폴리오</a>
        <a href="#material-spectrum" className="hover:text-[#C49A45] transition-colors">브랜드 가치</a>
        <a href="#process" className="hover:text-[#C49A45] transition-colors">프로세스</a>
        <a href="#contact" className="hover:text-[#C49A45] transition-colors">문의하기</a>
      </nav>
      <button 
        onClick={onOpenChat} 
        className="bg-[#3A3530] hover:bg-[#C49A45] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
      >
        즉시 견적내기
      </button>
    </header>
  );
}