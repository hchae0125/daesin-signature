export type Category = "All" | "Cast & Iron" | "Brass & Copper" | "Stainless & Gold" | "Etched Plates" | "Modern LED";

export interface WorkItem {
    id: number;
    title: string;
    location: string;
    category: Exclude<Category, "All">;
    material: string;
    bgImg: string;
    detailImg: string;
}

export const PRICING_MATRIX = {
  "Cast & Iron": { name: "프리미엄 주물", basePrice: 250000 },
  "Brass & Copper": { name: "클래식 황동", basePrice: 200000 },
  "Stainless & Gold": { name: "모던 스텐", basePrice: 120000 },
  "Essential Acrylic": { name: "실속형 아크릴", basePrice: 40000 }
};

export const SIZE_MULTIPLIERS = {
  small: 1.0,  // A4 내외
  medium: 1.4, // 우편함 내외
  large: 2.0   // 문 가로폭 내외
};

export const categoryLabels: Record<Category, string> = {
    All: "전체보기",
    "Cast & Iron": "주물 · 철제",
    "Brass & Copper": "황동 · 적동",
    "Stainless & Gold": "스텐 · 골드",
    "Etched Plates": "부식 현판",
    "Modern LED": "모던 LED",
};

export const works: WorkItem[] = [
    {
        id: 1,
        title: "압구정 샌드위치",
        location: "압구정동, 서울",
        category: "Brass & Copper",
        material: "황동 헤어라인 · 캐릭터 에폭시 채움",
        bgImg: "/asset/Brass_Sign_001_exterior.png",
        detailImg: "/asset/Brass_Sign_001.jpg"
    },
    {
        id: 2,
        title: "한남동 부티크",
        location: "한남동, 서울",
        category: "Cast & Iron",
        material: "망치톤 표면 처리 주물 철제 · 입체 금속 글씨",
        bgImg: "/asset/cast_iron_sign_001_exterior.png",
        detailImg: "/asset/cast_iron_sign_001.jpg"
    },
    {
        id: 3,
        title: "중앙감속기, 차이니즈 퓨전 레스토랑",
        location: "성수동, 서울",
        category: "Brass & Copper",
        material: "적동 헤어라인 · 음각 부식 백색 글씨",
        bgImg: "/asset/적동부식_001_interior.PNG",
        detailImg: "/asset/적동부식_001.jpg"
    },
    {
        id: 4,
        title: "키요이 스키야키, 일식 레스토랑",
        location: "서울대입구, 서울",
        category: "Cast & Iron", // ✨ 주물 간판 본연의 카테고리로 변경
        material: "황동 테두리 · 모래 주형 레드 주물 현판", // ✨ 사진 속 질감과 가공법 반영
        bgImg: "/asset/주물간판001_exterior.png", // ✨ 올려주신 외부 설치 전경 이미지 파일명 반영
        detailImg: "/asset/주물간판001.png"
    },
    {
        id: 5,
        title: "디자인 빌딩 준공 표지판",
        location: "성수동, 서울",
        category: "Stainless & Gold", // 아노다이징 금속류 통합
        material: "알루미늄 아노다이징 · 레이저 각인",
        bgImg: "/asset/anodizing_001_exterior.png",
        detailImg: "/asset/anodizing_001.jpg"
    },
    {
        id: 6, // 중복된 ID 수정
        title: "로라로라 한남 플래그십 스토어",
        location: "한남동, 서울",
        category: "Cast & Iron",
        material: "황동 테두리 · 블랙 주물 철제 현판",
        bgImg: "/asset/주물간판002_exterior.png",
        detailImg: "/asset/주물간판002.jpg"
    }
];
