"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "../utils/supabase/client";

interface EstimateChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

const SCENARIO_STEPS = {
  START: "START",
  CATEGORY: "CATEGORY",
  SIZE: "SIZE",
  RESULT: "RESULT",
  READY_MADE_MOOD: "READY_MADE_MOOD",
  READY_MADE_RESULT: "READY_MADE_RESULT",
  CHECK_DESIGN: "CHECK_DESIGN",
  CONTACT: "CONTACT",
  DONE: "DONE",
} as const;

type Step = typeof SCENARIO_STEPS[keyof typeof SCENARIO_STEPS];

const PRICING_MATRIX = {
  cast: { name: "🧱 주물 · 철제", basePrice: 250000, desc: "전통 방식으로 쇳물을 부어 제작하여 묵직하고 독보적인 입체감이 돋보되는 프리미엄 소재입니다." },
  brass: { name: "✨ 황동 · 적동", basePrice: 200000, desc: "시간이 흐를수록 공기와 만나 자연스러운 에이징(부식)이 진행되는 깊고 고급스러운 빈티지 소재입니다." },
  sus: { name: "💿 스텐 · 골드", basePrice: 120000, desc: "거울 같은 미러 효과나 은은한 헤어라인 가공으로 모던하고 세련된 분위기를 연출하는 메탈입니다." },
  acrylic: { name: "💡 실속형 아크릴 메탈", basePrice: 40000, desc: "합리적인 예산에 맞춘 실속형 라인으로, 가벼우면서도 표면 메탈 시트 처리로 고급스러움을 유지합니다." },
};

const SIZE_MULTIPLIERS = {
  small: { label: "소형 (A4 내외)", rate: 1.0 },
  medium: { label: "중형 (우편함 크기)", rate: 1.4 },
  large: { label: "대형 (문 가로폭 내외)", rate: 2.0 },
};

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
  const supabase = createClient();

  const [step, setStep] = useState<Step>(SCENARIO_STEPS.START);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUploading, setIsUploading] = useState(false); 
  const [mounted, setMounted] = useState(false);
  
  const latestBlueprintUrl = useRef<string>("");
  const currentSelections = useRef({
    bizType: "",
    category: "",
    size: "",
    readyMadeMood: "",
    hasDesign: "",
  });

  const [selections, setSelections] = useState({
    bizType: "",
    category: "",
    size: "",
    readyMadeMood: "",
    hasDesign: "",         
    blueprintUrl: "",      
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessages((prev) => [...prev, { id: `user-file-${Date.now()}`, sender: "user", text: `📁 도안 파일 선택 완료: ${file.name}` }]);

    try {
      const fileExt = (file.name.split('.').pop() || 'pdf').toLowerCase();
      const safeRandomString = Math.random().toString(36).substring(2, 10);
      const fileName = `${Date.now()}_${safeRandomString}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('estimates-blueprints')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('estimates-blueprints')
        .getPublicUrl(fileName);

      latestBlueprintUrl.current = publicUrl; 
      currentSelections.current.hasDesign = "yes";
      setSelections(prev => ({ ...prev, hasDesign: "yes", blueprintUrl: publicUrl }));
      
      triggerAiResponse(
        "도안 파일이 안전하게 동기화되었습니다! 📁 최종 견적 검토 결과를 받아보실 연락처를 입력해 주시면 오늘 중으로 신속히 답변드리겠습니다. 💌",
        SCENARIO_STEPS.CONTACT
      );
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [...prev, { id: `ai-err-${Date.now()}`, sender: "ai", text: "❌ 파일 처리 중 오류가 발생했습니다. 연락처를 남겨주시면 수동 접수를 도와드리겠습니다." }]);
      setStep(SCENARIO_STEPS.CONTACT);
    } finally {
      setIsUploading(false);
    }
  };

  const saveEstimateToDatabase = async (contactInfo: string) => {
    const activeSelections = currentSelections.current;
    const isReadyMade = activeSelections.bizType === "ready_made" || Boolean(activeSelections.readyMadeMood);
    
    let estimatedPriceText = "";
    if (isReadyMade) {
      const currentMood = activeSelections.readyMadeMood || "luxury";
      const pack = READY_MADE_PACKAGES[currentMood as keyof typeof READY_MADE_PACKAGES];
      estimatedPriceText = pack ? pack.price : "189,000원"; 
    } else {
      const { min, max } = calculatePrice(activeSelections.category, activeSelections.size);
      estimatedPriceText = `${min}-${max}만원`; 
    }

    const finalUrl = latestBlueprintUrl.current || null;
    const finalHasDesign = activeSelections.hasDesign === "yes" || Boolean(finalUrl);

    const insertData: any = {
      biz_type: isReadyMade ? "ready_made" : (activeSelections.bizType || "custom"),
      flow_type: isReadyMade ? "ready_made" : "custom",
      estimated_price: estimatedPriceText,
      contact: contactInfo.trim(),
      has_design: isReadyMade ? false : finalHasDesign,
    };

    if (!isReadyMade) {
      if (activeSelections.category) insertData.category = activeSelections.category;
      if (activeSelections.size) insertData.size = activeSelections.size;
      if (finalUrl) insertData.blueprint_url = finalUrl;
    } else {
      if (activeSelections.readyMadeMood) insertData.ready_made_mood = activeSelections.readyMadeMood;
    }

    try {
      const { error } = await supabase
        .from("estimates")
        .insert([insertData]);

      if (error) {
        console.error("❌ DB 저장 실패:", error.message);
      } else {
        latestBlueprintUrl.current = ""; 
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitContact = async (contactVal: string) => {
    if (!contactVal.trim()) return;

    setMessages(prev => [...prev, { id: `user-end-${Date.now()}`, sender: "user", text: contactVal }]);
    setInputValue('');
    setIsTyping(true);

    const activeSelections = currentSelections.current;
    const isReadyMade = activeSelections.bizType === "ready_made" || Boolean(activeSelections.readyMadeMood);

    let closingMessage = "접수가 완료되었습니다! ✨ ";

    if (isReadyMade) {
      closingMessage += "남겨주신 번호로 카카오톡 알림톡을 통해 시안 확인용 가이드라인을 즉시 발송해 드릴게요. 확인 후 회신 부탁드립니다! 💬";
    } else {
      if (activeSelections.hasDesign === "yes" || Boolean(latestBlueprintUrl.current)) {
        closingMessage += "등록해주신 도안을 담당 디자이너가 면밀히 검토한 뒤, 남겨주신 번호로 연락드려 제작 규격 조율 및 최종 제작 단가를 안내해 드리겠습니다. 📞";
      } else {
        closingMessage += "도안 디자인 지원 서비스 상담 예약이 완료되었습니다! 전담 매니저가 남겨주신 번호로 연락을 드려 매장 컨셉을 파악하고 전용 시안 스케치 작업을 바로 도와드릴게요. 📞";
      }
    }

    triggerAiResponse(closingMessage, SCENARIO_STEPS.DONE);
    await saveEstimateToDatabase(contactVal);
  };

  const handleSelectOption = (optionLabel: string, optionValue: string) => {
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: optionLabel }]);

    if (step === SCENARIO_STEPS.START && optionValue === "ready_made") {
      currentSelections.current.bizType = "ready_made";
      setSelections((prev) => ({ ...prev, bizType: "ready_made" }));
      triggerAiResponse("공간의 디테일을 채워줄 필수 표찰 세트 메뉴입니다. 텅 빈 벽면에 포인트가 되어줄 원하는 인테리어 톤앤매너를 골라주세요!", SCENARIO_STEPS.READY_MADE_MOOD);
    } 
    else if (step === SCENARIO_STEPS.READY_MADE_MOOD) {
      currentSelections.current.readyMadeMood = optionValue;
      setSelections((prev) => ({ ...prev, readyMadeMood: optionValue }));
      const pack = READY_MADE_PACKAGES[optionValue as keyof typeof READY_MADE_PACKAGES];

      triggerAiResponse(
        `[추천 기성 패키지 사양]\n📦 상품명: ${pack.name}\n💵 세트 특가: ${pack.price}\n\nℹ️ ${pack.items}\n\n💡 장인의 한마디: ${pack.desc}\n\n이 사양으로 각인 텍스트(호수 등)를 확정하고 정식 주문/상담 접수를 진행할까요? 다른 톤도 둘러보실 수 있습니다.`,
        SCENARIO_STEPS.READY_MADE_RESULT
      );
    } 
    else if (step === SCENARIO_STEPS.READY_MADE_RESULT) {
      if (optionValue === "go_contact") {
        triggerAiResponse("감사합니다! 주문 상품 제작 가이드 및 배송지 확인을 위해 연락처를 아래 입력창에 남겨주시면 오늘 중으로 신속히 연락 올리겠습니다. 💌", SCENARIO_STEPS.CONTACT);
      } else if (optionValue === "change_mood") {
        triggerAiResponse("비교해 보실 다른 인테리어 표찰 세트의 무드를 선택해 주세요. 🎨", SCENARIO_STEPS.READY_MADE_MOOD);
      } else if (optionValue === "back_to_main") {
        currentSelections.current.bizType = "";
        currentSelections.current.readyMadeMood = "";
        setSelections(prev => ({ ...prev, bizType: "", readyMadeMood: "" }));
        triggerAiResponse("메인 맞춤 간판 견적 플로우로 이동합니다. 준비 중이신 매장의 업종을 선택해 주세요. ☕", SCENARIO_STEPS.START);
      }
    } 
    else if (step === SCENARIO_STEPS.START) {
      currentSelections.current.bizType = optionValue;
      setSelections((prev) => ({ ...prev, bizType: optionValue }));
      triggerAiResponse("간판의 메인 무드를 결정할 금속 소재를 골라주세요. (ℹ️ 버튼을 누르면 장인의 소재 팁 확인 가능)", SCENARIO_STEPS.CATEGORY);
    }
    else if (step === SCENARIO_STEPS.CATEGORY) {
      currentSelections.current.category = optionValue;
      setSelections((prev) => ({ ...prev, category: optionValue }));
      triggerAiResponse("간판을 설치할 공간의 대략적인 크기 범위도 선택해 주세요.", SCENARIO_STEPS.SIZE);
    }
    else if (step === SCENARIO_STEPS.SIZE) {
      const updatedSize = optionValue;
      currentSelections.current.size = updatedSize;
      setSelections((prev) => ({ ...prev, size: updatedSize }));
      const { min, max } = calculatePrice(currentSelections.current.category, updatedSize);
      const matName = PRICING_MATRIX[currentSelections.current.category as keyof typeof PRICING_MATRIX]?.name;
      const sizeLabel = SIZE_MULTIPLIERS[updatedSize as keyof typeof SIZE_MULTIPLIERS]?.label;

      triggerAiResponse(`[산출된 커스텀 가견적]\n📍 사양: ${matName} / ${sizeLabel}\n💵 예상 금액: ${min}만 원 ~ ${max}만 원 선\n\n금액대는 마음에 드시나요? 사양을 변경하여 다시 계산해보거나, 이대로 장인실에 정식 견적 검토를 요청하실 수 있습니다.`, SCENARIO_STEPS.RESULT);
    }
    else if (step === SCENARIO_STEPS.RESULT) {
      if (optionValue === "go_contact") {
        triggerAiResponse("탁월한 선택이십니다! 📐 정확한 단가 확정 및 도면 가공을 위해 간판에 들어갈 로고 파일이나 도안(AI, CAD, 고화질 이미지 등)을 혹시 가지고 계신가요?", SCENARIO_STEPS.CHECK_DESIGN);
      } else if (optionValue === "change_cat") {
        triggerAiResponse("변경하실 새로운 간판 소재를 골라주세요. 기존 사이즈 사양은 그대로 유지됩니다. 💿", SCENARIO_STEPS.CATEGORY);
      } else if (optionValue === "change_size") {
        triggerAiResponse("변경하실 간판의 크기 범위를 새로 선택해 주세요. 기존 소재 사양은 유지됩니다. 📐", SCENARIO_STEPS.SIZE);
      }
    }
    else if (step === SCENARIO_STEPS.CHECK_DESIGN) {
      if (optionValue === "no_design") {
        currentSelections.current.hasDesign = "no";
        setSelections(prev => ({ ...prev, hasDesign: "no" }));
        triggerAiResponse("도안이 없으셔도 걱정 마세요! 을지로 30년 장인실의 전담 시각디자이너가 매장 업종에 최적화된 서체 폰트 배치 및 1:1 커스텀 시안 개발을 전폭적으로 지원해 드립니다. ✨ 디자인 서비스를 안내받으실 연락처를 남겨주세요.", SCENARIO_STEPS.CONTACT);
      }
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed bottom-24 right-0 sm:right-6 w-full sm:w-[400px] h-[550px] bg-[#FAF9F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E6E4DD] flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-200">

      <div className="bg-[#3A3530] p-4 text-white flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C49A45] animate-pulse" />
          <h3 className="text-xs font-bold tracking-tight">대신시그니처 커스텀 AI 견적기</h3>
        </div>
        <button onClick={onClose} className="text-white/75 hover:text-white font-bold text-sm px-2">×</button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF9F5]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${msg.sender === "user" ? "bg-[#3A3530] text-white rounded-br-none" : "bg-white text-[#3A3530] border border-[#E6E4DD]/60 rounded-bl-none shadow-sm"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {(isTyping || isUploading) && (
          <div className="flex justify-start">
            <div className="bg-white text-[#3A3530] border border-[#E6E4DD]/60 rounded-2xl rounded-bl-none p-3 text-xs flex gap-1 items-center shadow-sm">
              <span className="text-[10px] font-medium text-gray-500 mr-1">{isUploading ? "파일을 암호화 전송 중..." : "장인 AI 분석 중"}</span>
              <span className="w-1.5 h-1.5 bg-[#3A3530]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-[#3A3530]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-[#3A3530]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-[#E6E4DD]/60 flex flex-col gap-2">

        {step === SCENARIO_STEPS.START && !isTyping && (
          <div className="flex flex-col gap-2">
            <button onClick={() => handleSelectOption("🛒 [기성품 특가] 필수 표찰·문패 세트 구경하기", "ready_made")} className="w-full bg-[#C49A45] hover:bg-[#3A3530] text-white text-[11px] font-bold py-3 rounded-xl transition text-center shadow-md">
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

        {step === SCENARIO_STEPS.READY_MADE_MOOD && !isTyping && (
          <div className="flex flex-col gap-1.5">
            <button onClick={() => handleSelectOption("✨ 클래식 리얼 황동 세트", "luxury")} className="w-full border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition text-center">✨ 하이엔드 무드 (리얼 황동 패키지)</button>
            <button onClick={() => handleSelectOption("💿 모던 시크 헤어라인 스텐 세트", "modern")} className="w-full border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition text-center">💿 미니멀 모던 무드 (스텐 헤어라인 패키지)</button>
            <button onClick={() => handleSelectOption("💡 가성비 에센셜 아크릴 메탈 세트", "eco")} className="w-full border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition text-center text-amber-800">💡 초가성비 실속 무드 (아크릴 메탈 패키지)</button>
          </div>
        )}

        {step === SCENARIO_STEPS.READY_MADE_RESULT && !isTyping && (
          <div className="flex flex-col gap-1.5">
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

        {step === SCENARIO_STEPS.CATEGORY && !isTyping && (
          <div className="flex flex-col gap-1.5">
            {(Object.keys(PRICING_MATRIX) as Array<keyof typeof PRICING_MATRIX>).map((key) => (
              <div key={key} className="flex gap-1.5 w-full">
                <button onClick={() => handleSelectOption(PRICING_MATRIX[key].name, key)} className="flex-1 text-left pl-4 border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[11px] font-bold py-2.5 rounded-xl transition">{PRICING_MATRIX[key].name}</button>
                <button onClick={() => handleShowInfo(key, PRICING_MATRIX[key].name)} className="px-3 border border-[#E6E4DD] hover:bg-[#3A3530] hover:text-white text-[#8C8A83] text-xs font-bold rounded-xl transition">ℹ️</button>
              </div>
            ))}
          </div>
        )}

        {step === SCENARIO_STEPS.SIZE && !isTyping && (
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(SIZE_MULTIPLIERS) as Array<keyof typeof SIZE_MULTIPLIERS>).map((key) => (
              <button key={key} onClick={() => handleSelectOption(SIZE_MULTIPLIERS[key].label, key)} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-3 rounded-xl transition text-center">
                {SIZE_MULTIPLIERS[key].label.split(" ")[0]}<br /><span className="text-[9px] font-normal opacity-60">{SIZE_MULTIPLIERS[key].label.split(" ")[1] || ""}</span>
              </button>
            ))}
          </div>
        )}

        {step === SCENARIO_STEPS.RESULT && !isTyping && (
          <div className="flex flex-col gap-1.5">
            <button onClick={() => handleSelectOption("🙋‍♂️ 이대로 장인실에 정식 견적 신청하기", "go_contact")} className="w-full bg-[#3A3530] hover:bg-[#C49A45] text-white text-[11px] font-bold py-3 rounded-xl transition text-center shadow-md">🙋‍♂️ 이대로 정식 견적 신청하기</button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleSelectOption("💿 다른 소재로 바꿔서 계산하기", "change_cat")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-2.5 rounded-xl transition text-center">🔄 소재 변경하기</button>
              <button onClick={() => handleSelectOption("📐 사이즈 조절해서 다시 계산", "change_size")} className="border border-[#E6E4DD] hover:border-[#3A3530] bg-[#FAF9F5] text-[#3A3530] text-[10px] font-bold py-2.5 rounded-xl transition text-center">📐 크기 변경하기</button>
            </div>
          </div>
        )}

        {step === SCENARIO_STEPS.CHECK_DESIGN && !isTyping && (
          <div className="flex flex-col gap-1.5">
            <label className="w-full bg-[#C49A45] hover:bg-[#3A3530] text-white text-[11px] font-bold py-3 rounded-xl transition text-center shadow-md cursor-pointer block">
              📁 네, 도안이 있어요 (AI, 이미지 파일 업로드)
              <input
                type="file"
                accept=".ai,.pdf,.png,.jpg,.jpeg,.cad,.dwg"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
            <button
              onClick={() => handleSelectOption("🎨 도안이 없어서 디자인 지원을 받고 싶어요", "no_design")}
              className="w-full border border-[#3A3530] bg-white text-[#3A3530] hover:bg-[#FAF9F5] text-[11px] font-bold py-3 rounded-xl transition text-center"
            >
              🎨 도안이 없어요 (장인실 디자인 지원 서비스 신청)
            </button>
          </div>
        )}

        {(step === SCENARIO_STEPS.CONTACT || step === SCENARIO_STEPS.DONE) && (
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-[#FAF9F5] border border-[#E6E4DD] rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#3A3530] transition text-[#3A3530]"
              placeholder="연락처를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={step === SCENARIO_STEPS.DONE}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmitContact(inputValue);
                }
              }}
            />
            <button
              onClick={() => handleSubmitContact(inputValue)}
              className="bg-[#3A3530] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#C49A45] transition"
              disabled={step === SCENARIO_STEPS.DONE}
            >
              전송
            </button>
          </div>
        )}

      </div>
    </div>
  );
}