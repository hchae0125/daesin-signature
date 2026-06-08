"use client";
import { useState } from "react";

export default function ContactSection({ dict, lang }: { dict: any; lang: "ko" | "en"; }) {
  const c = dict?.contact; 

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      alert(lang === "ko" ? "성함과 문의 내용을 모두 입력해 주세요." : "Please fill in both your name and message.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 🚀 백엔드 API Route 호출
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry");
      }

      // 전송 성공 알림
      alert(
        lang === "ko" 
          ? "🎯 문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다." 
          : "🎯 Your inquiry has been successfully submitted. We will get back to you shortly."
      );
      
      // 폼 초기화
      setName("");
      setMessage("");
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(
        lang === "ko" 
          ? "오류가 발생했습니다. 다시 시도해 주시거나 고객센터로 문의해 주세요." 
          : "An error occurred. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white border-t border-[#E6E4DD]/60 py-24 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* 왼쪽: 설명 영역 */}
        <div>
          <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-wider">PROJECT INQUIRY</span>
          <h3 
            className="text-2xl sm:text-3xl font-extrabold mt-2 mb-6 text-[#3A3530]"
            dangerouslySetInnerHTML={{ __html: c?.title || "" }}
          />
          <p className="text-xs opacity-80 leading-relaxed mb-6 text-[#55524E]">
            {c?.desc}
          </p>
        </div>

        {/* 오른쪽: 입력 폼 영역 */}
        <form className="space-y-4 bg-[#FAF9F5] p-6 rounded-2xl border border-[#E6E4DD]/40" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-[#E6E4DD] p-3 rounded-xl text-xs outline-none focus:border-[#3A3530] transition-colors text-[#3A3530]" 
            placeholder={c?.placeholderName} 
            required
            disabled={isSubmitting}
          />
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white border border-[#E6E4DD] p-3 rounded-xl text-xs h-24 outline-none resize-none focus:border-[#3A3530] transition-colors text-[#3A3530]" 
            placeholder={c?.placeholderMessage}
            required
            disabled={isSubmitting}
          ></textarea>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#3A3530] hover:bg-[#C49A45] text-white p-3.5 rounded-xl font-bold text-xs transition-colors shadow-sm disabled:opacity-50 disabled:hover:bg-[#3A3530]"
          >
            {isSubmitting 
              ? (lang === "ko" ? "전송 중..." : "Sending...") 
              : (c?.submitBtn || "Submit")}
          </button>
        </form>

      </div>
    </section>
  );
}