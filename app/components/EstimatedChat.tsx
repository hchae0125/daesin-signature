// src/components/EstimateChat.tsx
"use client";

import { useState, useEffect, useRef } from "react";

interface EstimateChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  isButtons?: boolean;
}

// 🎯 시나리오 단계별 정적 데이터 정의
const SCENARIO_STEPS = {
  START: "START",
  CATEGORY: "CATEGORY",
  SIZE: "SIZE",
  CONTACT: "CONTACT",
  DONE: "DONE",
} as const;

type Step = typeof SCENARIO_STEPS[keyof typeof SCENARIO_STEPS];

export default function EstimateChat({ isOpen, onClose }: EstimateChatProps) {
  const [step, setStep] = useState<Step>(SCENARIO_STEPS.START);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // 유저가 선택한 견적 파라미터 수집 변수
  const [selections, setSelections] = useState({
    bizType: "",
    category: "",
    size: "",
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 하단 자동 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 챗봇이 처음 열렸을 때 첫 인사 트리거
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerAiResponse(
        "안녕하세요! 을지로 30년 장인의 손길을 전하는 대신시그니처 AI 상담원입니다. ✨ 멋진 공간의 오픈을 축하드립니다! 먼저 준비 중이신 매장의 업종(종류)을 선택해 주세요.",
        SCENARIO_STEPS.START
      );
    }
  }, [isOpen]);

  // 🤖 AI 응답 생성 함수 (가짜 타이핑 효과 포함)
  const triggerAiResponse = (text: string, currentStep: Step) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, sender: "ai", text }
      ]);
      setStep(currentStep);
    }, 800); // 0.8초 타이핑 딜레이로 현실감 부여
  };

  // 👤 유저 선택 핸들러
  const handleSelectOption = (optionLabel: string, optionValue: string) => {
    // 1. 유저가 선택한 말풍선 화면에 추가
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: optionLabel }
    ]);

    // 2. 단계별 데이터 저장 및 다음 AI 질문 분기
    if (step === SCENARIO_STEPS.START) {
      setSelections((prev) => ({ ...prev, bizType: optionValue }));
      triggerAiResponse(
        "분위기 있는 공간이 될 것 같아 벌써 기대되네요! ☕ 혹시 포트폴리오에서 눈여겨보셨거나 원하시는 간판의 메인 금속 소재가 있으실까요?",
        SCENARIO_STEPS.CATEGORY
      );
    } 
    else if (step === SCENARIO_STEPS.CATEGORY) {
      setSelections((prev) => ({ ...prev, category: optionValue }));
      triggerAiResponse(
        "탁월한 선택이십니다. 공간의 격이 한층 높아질 것 같아요. 간판을 설치할 대략적인 크기(사이즈) 범위도 정해지셨나요?",
        SCENARIO_STEPS.SIZE
      );
    } 
    else if (step === SCENARIO_STEPS.SIZE) {
      setSelections((prev) => ({ ...prev, size: optionValue }));
      
      // 가견적 산출 로직 가상 적용 (소재별, 사이즈별 금액대 매핑)
      let priceRange = "25만 원 ~ 35만 원";
      if (optionValue === "large" || selections.category === "cast") {
        priceRange = "45만 원 ~ 60만 원";
      }

      triggerAiResponse(
        `선택하신 내용을 바탕으로 분석한 결과, [${optionLabel} 크기] 기준으로 예상 가견적은 대략 ${priceRange} 선입니다. \n\n장인이 직접 형틀을 짜서 주조하는 수제 공정 특성상, 정밀 디자인 도안을 확인하면 더 정확한 정식 견적서를 받아보실 수 있습니다. 도안 검토 및 정식 견적 상담을 접수해 드릴까요?`,
        SCENARIO_STEPS.CONTACT
      );
    }
    else if (step === SCENARIO_STEPS.CONTACT) {
      if (optionValue === "yes") {
        triggerAiResponse(
          "감사합니다! 사장님의 연락처(이메일 또는 전화번호)를 아래 입력창에 남겨주시면, 을지로 작업실에서 내용을 검토한 후 오늘 내로 신속히 연락드리겠습니다. 💌",
          SCENARIO_STEPS.DONE
        );
      } else {
        triggerAiResponse(
          "네, 알겠습니다! 언제든 정식 시안이나 세부 마감 공법이 궁금해지시면 다시 이 챗봇을 찾아주세요. 편하게 둘러보세요! 😊",
          SCENARIO_STEPS.DONE
        );
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-0 sm:right-6 w-full sm:w-[400px] h-[550px] bg-[#FAF9F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E6E4DD] flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-200">
      
      {/* 챗봇 헤더 */}
      <div className="bg-[#3A3530] p-4 text-white flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C49A45] animate-pulse" />
          <h3 className="text-xs font-bold tracking-tight">대신시그니처 실시간 AI 견적</h3>
        </div>
        <button onClick={onClose} className="text-white/75 hover:text-white font-bold text-sm px-2">×</button>
      </div>

      {/* 대화창 스크롤 영역 */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF9F5]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-[#3A3530] text-white rounded-br-none"
                  : "bg-white text-[#3A3530] border border-[#E6E4DD]/60 rounded-bl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* AI 타이핑 애니메이션 효과 */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-[#3A3530] border border-[#E6E4DD]/60 rounded-2xl rounded-bl-none p-3 text-xs flex gap-1 items-center shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#3A3530]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-[#3A3530]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-[#3A3530]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* 🔘 인터랙티브 버튼 선택지 인터페이스 (하단 고정) */}
      <div className="p-4 bg-white border-t border-[#E6E4DD]/60 flex flex-col gap-2">
        
        {/* STEP 1: 업종 선택 */}
        {step === SCENARIO_STEPS.START && !isTyping && (
          <div className="grid grid-cols-2 gap-2 animate-in fade-in-50 duration-300">
            <button onClick={() => handleSelectOption("☕ 카페 / 디저트", "cafe")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 px-3 rounded-xl transition text-center">☕ 카페 / 디저트</button>
            <button onClick={() => handleSelectOption("🍽️ 식당 / 다이닝", "restaurant")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 px-3 rounded-xl transition text-center">🍽️ 식당 / 다이닝</button>
            <button onClick={() => handleSelectOption("🌿 공방 / 스튜디오", "studio")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 px-3 rounded-xl transition text-center">🌿 공방 / 스튜디오</button>
            <button onClick={() => handleSelectOption("🏢 오피스 / 기타숍", "office")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 px-3 rounded-xl transition text-center">🏢 오피스 / 기타숍</button>
          </div>
        )}

        {/* STEP 2: 소재 선택 */}
        {step === SCENARIO_STEPS.CATEGORY && !isTyping && (
          <div className="flex flex-col gap-1.5 animate-in fade-in-50 duration-300">
            <button onClick={() => handleSelectOption("🧱 주물 · 철제 (레트로 마감)", "cast")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 px-3 rounded-xl transition text-left pl-4">🧱 주물 · 철제 (레트로하고 묵직한 입체감)</button>
            <button onClick={() => handleSelectOption("✨ 황동 · 적동 (고급 마감)", "brass")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 px-3 rounded-xl transition text-left pl-4">✨ 황동 · 적동 (시간이 흐를수록 깊어지는 무드)</button>
            <button onClick={() => handleSelectOption("💿 스텐 · 골드 (모던 마감)", "sus")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 px-3 rounded-xl transition text-left pl-4">💿 스텐 · 골드 (세련되고 깔끔한 메탈 헤어라인)</button>
          </div>
        )}

        {/* STEP 3: 사이즈 범위 선택 */}
        {step === SCENARIO_STEPS.SIZE && !isTyping && (
          <div className="grid grid-cols-3 gap-2 animate-in fade-in-50 duration-300">
            <button onClick={() => handleSelectOption("🔍 소형 (A4 크기 내외)", "small")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-3 rounded-xl transition text-center">🔎 소형<br/><span className="text-[9px] font-normal opacity-60">A4 내외</span></button>
            <button onClick={() => handleSelectOption("📐 중형 (우편함 크기 내외)", "medium")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-3 rounded-xl transition text-center">📐 중형<br/><span className="text-[9px] font-normal opacity-60">우편함 크기</span></button>
            <button onClick={() => handleSelectOption("🪵 대형 (문 가로폭 내외)", "large")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-3 rounded-xl transition text-center">🪵 대형<br/><span className="text-[9px] font-normal opacity-60">문 가로폭 내외</span></button>
          </div>
        )}

        {/* STEP 4: 정식 견적 연계 신청 여부 */}
        {step === SCENARIO_STEPS.CONTACT && !isTyping && (
          <div className="grid grid-cols-2 gap-2 animate-in fade-in-50 duration-300">
            <button onClick={() => handleSelectOption("🙋‍♂️ 네, 정식 시안/견적 신청할래요", "yes")} className="bg-[#3A3530] hover:bg-[#C49A45] text-white text-[11px] font-bold py-3 rounded-xl transition text-center shadow-sm">🙋‍♂️ 정식 견적 신청</button>
            <button onClick={() => handleSelectOption("🙅‍♀️ 아니요, 조금 더 둘러볼게요", "no")} className="border border-[#E6E4DD] hover:bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-3 rounded-xl transition text-center">🙅‍♀️ 더 둘러보기</button>
          </div>
        )}

        {/* STEP 5: 완료 후 수동 입력창 활성화 (연락처 접수용) */}
        {step === SCENARIO_STEPS.DONE && (
          <div className="flex gap-2 animate-in fade-in-50 duration-300">
            <input 
              type="text" 
              className="flex-1 bg-[#FAF9F5] border border-[#E6E4DD] rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#3A3530] transition text-[#3A3530]" 
              placeholder="연락처 또는 이메일을 남겨주세요..." 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                  const val = e.currentTarget.value;
                  setMessages(prev => [...prev, { id: `user-${Date.now()}`, sender: "user", text: val }]);
                  e.currentTarget.value = '';
                  triggerAiResponse("접수가 안전하게 완료되었습니다! 확인 후 담당 장인이 빠르게 연락드리겠습니다. 감사합니다. ✨", SCENARIO_STEPS.DONE);
                }
              }}
            />
            <button className="bg-[#3A3530] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#C49A45] transition">전송</button>
          </div>
        )}

      </div>
    </div>
  );
}