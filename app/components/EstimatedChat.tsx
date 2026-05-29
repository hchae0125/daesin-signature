"use client";

import { useState, useMemo, useEffect, useRef } from "react";

type SignType = "brass" | "stainless" | "led";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  isCalculator?: boolean;
}

interface EstimateChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EstimateChat({ isOpen, onClose }: EstimateChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [signType, setSignType] = useState<SignType>("brass");
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(20);
  const [includePremiumFinish, setIncludePremiumFinish] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "안녕하세요 사장님! 을지로 30년 간판 장인의 기술력을 바탕으로 트렌디한 맞춤형 간판을 제안하는 AI 비서입니다. ✨"
      },
      {
        id: 2,
        sender: "bot",
        text: "공간에 딱 맞는 간판의 크기와 종류를 선택해 보세요. 을지로 원가 마진 계산법을 기반으로 마진 거품을 뺀 실시간 예상 견적을 즉시 뽑아드립니다! 👇",
        isCalculator: true
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const estimatedPrice = useMemo(() => {
    let basePrice = 150000; 
    let perSquareCm = 150; 

    if (signType === "stainless") {
      basePrice = 120000;
      perSquareCm = 100;
    } else if (signType === "led") {
      basePrice = 220000;
      perSquareCm = 180;
    }

    const area = width * height;
    let totalPrice = basePrice + (area * perSquareCm);

    if (includePremiumFinish) {
      totalPrice += 70000;
    }

    return Math.round(totalPrice / 1000) * 1000;
  }, [signType, width, height, includePremiumFinish]);

  const handleApplyEstimate = () => {
    const typeLabel = signType === "brass" ? "황동 주물" : signType === "stainless" ? "스테인리스 골드" : "모던 LED 간판";
    const optionLabel = includePremiumFinish ? " (장인 프리미엄 마감 포함)" : "";
    
    const userSelectionText = `📐 [견적 확인] ${typeLabel} / ${width}x${height}cm${optionLabel} 선택`;
    const botResponseText = `확인되었습니다! 선택하신 조건의 실시간 예상 제작 비용은 원가 마진을 투명하게 공개하여 약 **${estimatedPrice.toLocaleString()}원**입니다. 이 도안을 토대로 장인 정밀 검토 및 무료 가상 시안을 받아보시겠어요? 아래 '상담 신청 완료하기'를 누르시면 상단 문의 양식으로 자동 연계됩니다. 💌`;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: userSelectionText },
      { id: Date.now() + 1, sender: "bot", text: botResponseText }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-16 right-0 w-[350px] bg-white rounded-2xl shadow-2xl border border-[#E6E4DD] overflow-hidden flex flex-col transition-all duration-200">
      {/* 헤더 */}
      <div className="bg-[#3A3530] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <div>
            <h3 className="font-bold text-xs text-white">대신시그니처 실시간 계산기</h3>
            <p className="text-[10px] text-[#E6E4DD] opacity-70">을지로 공장 직영 원가 마진 적용</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white opacity-60 hover:opacity-100 text-lg font-bold">×</button>
      </div>

      {/* 메시지 영역 */}
      <div className="p-4 space-y-4 h-[350px] overflow-y-auto bg-[#FAF9F5] text-xs">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
            <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === "user" ? "bg-[#3A3530] text-white rounded-tr-none" : "bg-white text-[#3A3530] rounded-tl-none border border-[#E6E4DD]/60 shadow-sm"}`}>
              {msg.text}
            </div>

            {msg.isCalculator && (
              <div className="w-full mt-3 bg-white border border-[#E6E4DD] rounded-xl p-4 shadow-sm space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#C49A45] block mb-1">1. 간판 소재 선택</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["brass", "stainless", "led"] as SignType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSignType(type)}
                        className={`py-2 text-[11px] font-bold rounded-lg border transition ${signType === type ? "border-[#3A3530] bg-[#3A3530] text-white" : "border-[#E6E4DD] bg-[#FAF9F5] text-[#3A3530] hover:bg-[#E6E4DD]/30"}`}
                      >
                        {type === "brass" ? "황동 주물" : type === "stainless" ? "스텐 골드" : "모던 LED"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#C49A45] block mb-1">2. 규격 지정 (cm)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 bg-[#FAF9F5] px-2 py-1.5 rounded-lg border border-[#E6E4DD]">
                      <span className="text-[10px] opacity-50">가로</span>
                      <input type="number" value={width} onChange={(e) => setWidth(Math.max(10, Number(e.target.value)))} className="w-full bg-transparent text-right font-bold outline-none text-xs" />
                      <span className="text-[10px] opacity-50">cm</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAF9F5] px-2 py-1.5 rounded-lg border border-[#E6E4DD]">
                      <span className="text-[10px] opacity-50">세로</span>
                      <input type="number" value={height} onChange={(e) => setHeight(Math.max(10, Number(e.target.value)))} className="w-full bg-transparent text-right font-bold outline-none text-xs" />
                      <span className="text-[10px] opacity-50">cm</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-bold text-[#C49A45]">3. 프리미엄 마감 옵션</span>
                  <input type="checkbox" checked={includePremiumFinish} onChange={(e) => setIncludePremiumFinish(e.target.checked)} className="w-4 h-4 accent-[#3A3530] cursor-pointer" />
                </div>

                <div className="bg-[#FAF9F5] p-3 rounded-xl border border-dashed border-[#C49A45]/40 flex justify-between items-center mt-2">
                  <span className="font-bold text-[11px]">실시간 예상가</span>
                  <span className="text-sm font-black text-[#C49A45]">{estimatedPrice.toLocaleString()}원</span>
                </div>

                <button onClick={handleApplyEstimate} className="w-full bg-[#C49A45] hover:bg-[#b38936] text-white py-2.5 rounded-xl font-bold text-[11px] transition mt-1 shadow-sm">
                  이 견적으로 대화 이어가기 📐
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 푸터 연계 */}
      <div className="p-3 border-t border-[#E6E4DD] bg-white">
        <a href="#contact" onClick={onClose} className="block w-full text-center bg-[#3A3530] text-white p-2.5 rounded-xl text-[11px] font-bold hover:opacity-90 transition shadow-sm">
          📝 장인 배정 및 정식 가상시안 신청서 작성
        </a>
      </div>
    </div>
  );
}