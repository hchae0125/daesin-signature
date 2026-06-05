import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["ko", "en"];
const defaultLocale = "ko";

function getLocale(request: NextRequest): string {
  try {
    const acceptLanguage = request.headers.get("accept-language");
    if (!acceptLanguage) return defaultLocale;

    // ⭕ 아스키코드가 아닌 모든 문자(한글 등)를 완전히 도려내어 ByteString 에러를 원천 차단합니다.
    const cleanCleanLanguage = acceptLanguage.replace(/[^\x00-\x7F]/g, "");
    const negotiatorHeaders = { "accept-language": cleanCleanLanguage };
    
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    return match(languages, locales, defaultLocale);
  } catch (error) {
    // ⭕ 어떤 이유로든 매칭 중 에러가 나면 무조건 기본값인 'ko'로 안전하게 팅겨냅니다.
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일, 이미지, 에셋 등은 미들웨어 체크에서 예외 처리
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  
  // ⭕ URL 객체를 완전히 새로 생성할 때, 한글 경로가 주소창에 꼬이지 않도록 안전하게 인코딩 처리합니다.
  const safePathname = encodeURI(pathname);
  const redirectUrl = new URL(`/${locale}${safePathname}${request.nextUrl.search}`, request.url);
  
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};