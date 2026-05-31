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
}

// 🎯 시나리오 단계 정의 (READY_MADE 관련 플로우 추가)
const SCENARIO_STEPS = {
  START: "START",
  CATEGORY: "CATEGORY",
  SIZE: "SIZE",
  RESULT: "RESULT",
  READY_MADE_MOOD: "READY_MADE_MOOD",   // 기성품 무드 선택
  READY_MADE_RESULT: "READY_MADE_RESULT", // 기성품 세트 제안
  CONTACT: "CONTACT",
  DONE: "DONE",
} as const;

type Step = typeof SCENARIO_STEPS[keyof typeof SCENARIO_STEPS];

// 📊 메인 간판 가격 매트릭스
const PRICING_MATRIX = {
  cast: { name: "🧱 주물 · 철제", basePrice: 250000, desc: "전통 방식으로 쇳물을 부어 제작하여 묵직하고 독보적인 입체감이 돋보이는 프리미엄 소재입니다." },
  brass: { name: "✨ 황동 · 적동", basePrice: 200000, desc: "시간이 흐를수록 공기와 만나 자연스러운 에이징(부식)이 진행되는 깊고 고급스러운 빈티지 소재입니다." },
  sus: { name: "💿 스텐 · 골드", basePrice: 120000, desc: "거울 같은 미러 효과나 은은한 헤어라인 가공으로 모던하고 세련된 분위기를 연출하는 메탈입니다." },
  acrylic: { name: "💡 실속형 아크릴 메탈", basePrice: 40000, desc: "합리적인 예산에 맞춘 실속형 라인으로, 가벼우면서도 표면 메탈 시트 처리로 고급스러움을 유지합니다." },
};

const SIZE_MULTIPLIERS = {
  small: { label: "소형 (A4 내외)", rate: 1.0 },
  medium: { label: "중형 (우편함 크기)", rate: 1.4 },
  large: { label: "대형 (문 가로폭 내외)", rate: 2.0 },
};

// 🛒 기성품(Ready-made) 패키지 가격 매트릭스
const READY_MADE_PACKAGES = {
  luxury: {
    name: "✨ 클래식 프리미엄 리얼 황동 세트",
    price: "189,000원",
    items: "구성: 화장실 표찰 2종 + 호수 표찰 1종 + 와이파이&노스모킹 안내판",
    desc: "통황동을 섬세하게 밀링 가공하여 호텔, 고급 다이닝, 프리미엄 쇼룸에 어울리는 최고 존엄 무드입니다."
  },
  modern: {
    name: "💿 모던 시크 헤어라인 스텐 세트",
    price: "129,000원",
    items: "구성: 화장실 표찰 2종 + 호수 표찰 1종 + 와이파이 안내판",
    desc: " 유행을 타지 않는 모던 럭셔리의 정석. 깔끔한 미니멀 인테리어나 오피스, 감성 카페에 적극 추천합니다."
  },
  eco: {
    name: "💡 가성비 에센셜 아크릴 메탈 세트",
    price: "49,000원",
    items: "구성: 화장실 표찰 2종 + 와이파이 안내판",
    desc: "부담 없는 예산으로 완성하는 스마트한 선택! 특수 메탈 시트 마감으로 언뜻 봐서는 리얼 금속과 구분이 힘든 실속형 세트입니다."
  }
};

export default function EstimateChat({ isOpen, onClose }: EstimateChatProps) {
  const [step, setStep] = useState<Step>(SCENARIO_STEPS.START);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [selections, setSelections] = useState({
    bizType: "",
    category: "",
    size: "",
    readyMadeMood: "", // 기성품 선택 저장용
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerAiResponse(
        "안녕하세요! 을지로 30년 장인의 대신시그니처 AI 상담원입니다. ✨ 무엇을 도와드릴까요? 원하시는 서비스 단계를 선택해 주세요.",
        SCENARIO_STEPS.START
      );
    }
  }, [isOpen]);

  const triggerAiResponse = (text: string, nextStep: Step) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, sender: "ai", text }]);
      setStep(nextStep);
    }, 600);
  };

  const calculatePrice = (cat: string, sz: string) => {
    const base = PRICING_MATRIX[cat as keyof typeof PRICING_MATRIX]?.basePrice || 100000;
    const multiplier = SIZE_MULTIPLIERS[sz as keyof typeof SIZE_MULTIPLIERS]?.rate || 1.0;
    const finalPrice = base * multiplier;
    return {
      min: (finalPrice * 0.9 / 10000).toFixed(0),
      max: (finalPrice * 1.1 / 10000).toFixed(0)
    };
  };

  const handleShowInfo = (catKey: keyof typeof PRICING_MATRIX, label: string) => {
    setMessages((prev) => [...prev, { id: `user-info-${Date.now()}`, sender: "user", text: `${label} 특징 안내 부탁해` }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev, 
        { id: `ai-info-${Date.now()}`, sender: "ai", text: `[${PRICING_MATRIX[catKey].name}]\n${PRICING_MATRIX[catKey].desc}\n\n원하시는 사양이라면 아래 버튼을 눌러 계속 진행해 주세요! 👇` }
      ]);
    }, 400);
  };

  // 👤 통합 선택 핸들러
  const handleSelectOption = (optionLabel: string, optionValue: string) => {
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: optionLabel }]);

    // [루트 분기] 기성품 세트 메뉴를 선택했을 때
    if (step === SCENARIO_STEPS.START && optionValue === "ready_made") {
      setSelections((prev) => ({ ...prev, bizType: "ready_made" }));
      triggerAiResponse("공간의 디테일을 채워줄 필수 표찰 세트 메뉴입니다. 텅 빈 벽면에 포인트가 되어줄 원하는 인테리어 톤앤매너를 골라주세요!", SCENARIO_STEPS.READY_MADE_MOOD);
      return;
    }

    // [기성품 플로우 1] 무드 선택 -> 상품 제안
    if (step === SCENARIO_STEPS.READY_MADE_MOOD) {
      setSelections((prev) => ({ ...prev, readyMadeMood: optionValue }));
      const pack = READY_MADE_PACKAGES[optionValue as keyof typeof READY_MADE_PACKAGES];
      
      triggerAiResponse(
        `[추천 기성 패키지 사양]\n📦 상품명: ${pack.name}\n💵 세트 특가: ${pack.price}\n\nℹ️ ${pack.items}\n\n💡 장인의 한마디: ${pack.desc}\n\n이 사양으로 각인 텍스트(호수 등)를 확정하고 정식 주문/상담 접수를 진행할까요? 다른 톤도 둘러보실 수 있습니다.`,
        SCENARIO_STEPS.READY_MADE_RESULT
      );
      return;
    }

    // [기성품 플로우 2] 제안 후 분기 처리 (주문 접수 혹은 다른 톤 변경)
    if (step === SCENARIO_STEPS.READY_MADE_RESULT) {
      if (optionValue === "go_contact") {
        triggerAiResponse("감사합니다! 주문 상품 제작 가이드 및 배송지 확인을 위해 연락처(전화번호 또는 이메일)를 아래 입력창에 남겨주시면 오늘 중으로 신속히 연락 올리겠습니다. 💌", SCENARIO_STEPS.CONTACT);
      } else if (optionValue === "change_mood") {
        triggerAiResponse("비교해 보실 다른 인테리어 표찰 세트의 무드를 선택해 주세요. 🎨", SCENARIO_STEPS.READY_MADE_MOOD);
      } else if (optionValue === "back_to_main") {
        triggerAiResponse("메인 맞춤 간판 견적 플로우로 이동합니다. 준비 중이신 매장의 업종을 선택해 주세요. ☕", SCENARIO_STEPS.START);
      }
      return;
    }

    // --- 기존 커스텀 간판 플로우 유지 ---
    if (step === SCENARIO_STEPS.START) {
      setSelections((prev) => ({ ...prev, bizType: optionValue }));
      triggerAiResponse("간판의 메인 무드를 결정할 금속 소재를 골라주세요. (ℹ️ 버튼을 누르면 장인의 소재 팁 확인 가능)", SCENARIO_STEPS.CATEGORY);
    } 
    else if (step === SCENARIO_STEPS.CATEGORY) {
      setSelections((prev) => ({ ...prev, category: optionValue }));
      triggerAiResponse("간판을 설치할 공간의 대략적인 크기 범위도 선택해 주세요.", SCENARIO_STEPS.SIZE);
    } 
    else if (step === SCENARIO_STEPS.SIZE) {
      const updatedSize = optionValue;
      setSelections((prev) => ({ ...prev, size: updatedSize }));
      const { min, max } = calculatePrice(selections.category, updatedSize);
      const matName = PRICING_MATRIX[selections.category as keyof typeof PRICING_MATRIX]?.name;
      const sizeLabel = SIZE_MULTIPLIERS[updatedSize as keyof typeof SIZE_MULTIPLIERS]?.label;

      triggerAiResponse(`[산출된 커스텀 가견적]\n📍 사양: ${matName} / ${sizeLabel}\n💵 예상 금액: ${min}만 원 ~ ${max}만 원 선\n\n금액대는 마음에 드시나요? 사양을 변경하여 다시 계산해보거나, 이대로 장인실에 정식 견적 검토를 요청하실 수 있습니다.`, SCENARIO_STEPS.RESULT);
    }
    else if (step === SCENARIO_STEPS.RESULT) {
      if (optionValue === "go_contact") {
        triggerAiResponse("탁월한 선택이십니다! 정식 도안 검토 및 정밀 단가 조율을 위해 연락처를 입력창에 남겨주시면, 오늘 중으로 AI 비서가 다정하게 연락해 상담을 도와드릴게요. 💌", SCENARIO_STEPS.CONTACT);
      } else if (optionValue === "change_cat") {
        triggerAiResponse("변경하실 새로운 간판 소재를 골라주세요. 기존 사이즈 사양은 그대로 유지됩니다. 💿", SCENARIO_STEPS.CATEGORY);
      } else if (optionValue === "change_size") {
        triggerAiResponse("변경하실 간판의 크기 범위를 새로 선택해 주세요. 기존 소재 사양은 유지됩니다. 📐", SCENARIO_STEPS.SIZE);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-0 sm:right-6 w-full sm:w-[400px] h-[550px] bg-[#FAF9F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E6E4DD] flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-200">
      
      {/* 헤더 */}
      <div className="bg-[#3A3530] p-4 text-white flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C49A45] animate-pulse" />
          <h3 className="text-xs font-bold tracking-tight">대신시그니처 커스텀 AI 견적기</h3>
        </div>
        <button onClick={onClose} className="text-white/75 hover:text-white font-bold text-sm px-2">×</button>
      </div>

      {/* 스크롤 대화창 */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF9F5]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${msg.sender === "user" ? "bg-[#3A3530] text-white rounded-br-none" : "bg-white text-[#3A3530] border border-[#E6E4DD]/60 rounded-bl-none shadow-sm"}`}>
              {msg.text}
            </div>
          </div>
        ))}
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

      {/* 🔘 인터랙티브 하단 컨트롤 패널 */}
      <div className="p-4 bg-white border-t border-[#E6E4DD]/60 flex flex-col gap-2">
        
        {/* STEP 1: 첫 메인 화면 분기 (기성품 패키지 메뉴 전면 배치!) */}
        {step === SCENARIO_STEPS.START && !isTyping && (
          <div className="flex flex-col gap-2 animate-in fade-in-30">
            {/* 🔥 하이라이트된 기성품 유도 버튼 */}
            <button onClick={() => handleSelectOption("🛒 [기성품 특가] 필수 표찰·문패 세트 구경하기", "ready_made")} className="w-full bg-[#C49A45] hover:bg-[#3A3530] text-white text-[11px] font-bold py-3 rounded-xl transition text-center shadow-md animate-pulse">
              🛒 [기성 패키지] 화장실/호수 표찰 세트 보기
            </button>
            <div className="text-[10px] text-center text-[#8C8A83] font-medium my-0.5">— 또는 맞춤형 간판 1:1 가견적 산출 —</div>
            <div className="grid grid-cols-2 gap-2">
              {["☕ 카페 / 디저트", "🍽️ 식당 / 다이닝", "🌿 공방 / 스튜디오", "🏢 오피스 / 기타"].map((label, idx) => (
                <button key={idx} onClick={() => handleSelectOption(label, ["cafe", "restaurant", "studio", "office"][idx])} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-2 rounded-xl transition text-center">{label}</button>
              ))}
            </div>
          </div>
        )}

        {/* 🛒 기성품 플로우 STEP 2: 무드/톤 선택 */}
        {step === SCENARIO_STEPS.READY_MADE_MOOD && !isTyping && (
          <div className="flex flex-col gap-1.5 animate-in fade-in-30">
            <button onClick={() => handleSelectOption("✨ 클래식 리얼 황동 세트", "luxury")} className="w-full border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition text-center">✨ 하이엔드 무드 (리얼 황동 패키지)</button>
            <button onClick={() => handleSelectOption("💿 모던 시크 헤어라인 스텐 세트", "modern")} className="w-full border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition text-center">💿 미니멀 모던 무드 (스텐 헤어라인 패키지)</button>
            <button onClick={() => handleSelectOption("💡 가성비 에센셜 아크릴 메탈 세트", "eco")} className="w-full border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition text-center text-amber-800">💡 초가성비 실속 무드 (아크릴 메탈 패키지)</button>
          </div>
        )}

        {/* 🛒 기성품 플로우 STEP 3: 제안 결과 창 및 무한 루프 스위칭 제어 */}
        {step === SCENARIO_STEPS.READY_MADE_RESULT && !isTyping && (
          <div className="flex flex-col gap-1.5 animate-in fade-in-30">
            <button onClick={() => handleSelectOption("🙋‍♂️ 이 패키지로 주문 및 상담 신청", "go_contact")} className="w-full bg-[#3A3530] hover:bg-[#C49A45] text-white text-[11px] font-bold py-3 rounded-xl transition text-center shadow-md">
              🙋‍♂️ 이 패키지로 신청하기
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleSelectOption("🎨 다른 톤 패키지 볼래요", "change_mood")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-2.5 rounded-xl transition text-center">
                🔄 다른 톤 비교하기
              </button>
              <button onClick={() => handleSelectOption("🏢 메인 간판 견적하러 가기", "back_to_main")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-2.5 rounded-xl transition text-center">
                ⬅️ 메인 간판 견적
              </button>
            </div>
          </div>
        )}

        {/* 기존 플로우 STEPs (소재 선택) */}
        {step === SCENARIO_STEPS.CATEGORY && !isTyping && (
          <div className="flex flex-col gap-1.5 animate-in fade-in-30">
            {(Object.keys(PRICING_MATRIX) as Array<keyof typeof PRICING_MATRIX>).map((key) => (
              <div key={key} className="flex gap-1.5 w-full">
                <button onClick={() => handleSelectOption(PRICING_MATRIX[key].name, key)} className="flex-1 text-left pl-4 border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition">{PRICING_MATRIX[key].name}</button>
                <button onClick={() => handleShowInfo(key, PRICING_MATRIX[key].name)} className="px-3 border border-[#E6E4DD] hover:bg-[#3A3530] hover:text-white text-[#8C8A83] text-xs font-bold rounded-xl transition">ℹ️</button>
              </div>
            ))}
          </div>
        )}

        {/* 기존 플로우 STEPs (사이즈 선택) */}
        {step === SCENARIO_STEPS.SIZE && !isTyping && (
          <div className="grid grid-cols-3 gap-2 animate-in fade-in-30">
            {(Object.keys(SIZE_MULTIPLIERS) as Array<keyof typeof SIZE_MULTIPLIERS>).map((key) => (
              <button key={key} onClick={() => handleSelectOption(SIZE_MULTIPLIERS[key].label, key)} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-3 rounded-xl transition text-center">
                {SIZE_MULTIPLIERS[key].label.split(" ")[0]}<br/><span className="text-[9px] font-normal opacity-60">{SIZE_MULTIPLIERS[key].label.split(" ")[1] || ""}</span>
              </button>
            ))}
          </div>
        )}

        {/* 기존 플로우 STEPs (결과 확인 및 루프) */}
        {step === SCENARIO_STEPS.RESULT && !isTyping && (
          <div className="flex flex-col gap-1.5 animate-in fade-in-30">
            <button onClick={() => handleSelectOption("🙋‍♂️ 이대로 장인실에 정식 견적 신청하기", "go_contact")} className="w-full bg-[#3A3530] hover:bg-[#C49A45] text-white text-[11px] font-bold py-3 rounded-xl transition text-center shadow-md">🙋‍♂️ 이대로 정식 견적 신청하기</button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleSelectOption("💿 다른 소재로 바꿔서 계산하기", "change_cat")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-2.5 rounded-xl transition text-center">🔄 소재 변경하기</button>
              <button onClick={() => handleSelectOption("📐 사이즈 조절해서 다시 계산", "change_size")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-2.5 rounded-xl transition text-center">📐 크기 변경하기</button>
            </div>
          </div>
        )}

        {/* 최종 연락처 입력 폼 */}
        {(step === SCENARIO_STEPS.CONTACT || step === SCENARIO_STEPS.DONE) && (
          <div className="flex gap-2 animate-in fade-in-30">
            <input 
              type="text" 
              className="flex-1 bg-[#FAF9F5] border border-[#E6E4DD] rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#3A3530] transition text-[#3A3530]" 
              placeholder="연락처나 이메일을 입력하세요..." 
              disabled={step === SCENARIO_STEPS.DONE}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                  const val = e.currentTarget.value;
                  setMessages(prev => [...prev, { id: `user-end-${Date.now()}`, sender: "user", text: val }]);
                  e.currentTarget.value = '';
                  triggerAiResponse("접수가 완료되었습니다! 기성 사인의 경우 기재해주신 정보로 상세 시안 확인용 알림톡 혹은 가이드를 즉시 발송해 드릴게요. 대신시그니처를 찾아주셔서 감사합니다. ✨", SCENARIO_STEPS.DONE);
                }
              }}
            />
            <button className="bg-[#3A3530] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#C49A45] transition" disabled={step === SCENARIO_STEPS.DONE}>전송</button>
          </div>
        )}

      </div>
    </div>
  );
}