import type { Metadata } from "next";
import { Noto_Sans_KR, Montserrat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. 한국어 서체 선언
const notoSansSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-kr",
});

// 2. 영문 서체 선언 (세련된 지오메트릭 룩의 핵심)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-montserrat",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "대신시그니처 | Daesin Signature",
  description: "30년 헤리티지의 프리미엄 건축 사이니지 아틀리에",
};

export async function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "ko" | "en" }>;
}>) {
  const { lang } = await params;
  

 const fontClass = lang === "en" ? "font-sans-en" : "font-sans-ko";

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${fontClass} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${fontClass}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}