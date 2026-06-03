export type Category = "All" | "Cast & Iron" | "Brass & Copper" | "Stainless & Gold" | "Etched Plates" | "Modern LED";

export interface WorkItem {
    id: number;
    title: string;
    location: string;
    category: Exclude<Category, "All">;
    material: string;
    bgImg: string;
    detailImg: string;
    description: string;
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
    material: "신주헤어라인 · 부식",
    bgImg: "/asset/Brass_Sign_001_exterior.png",
    detailImg: "/asset/Brass_Sign_001.jpg",
    description: "리얼 황동(신주) 본연의 고급스러운 결을 살린 헤어라인 베이스에 정밀 화학 부식 공정을 적용했습니다. 정교하게 음각 각인된 텍스트와 깊이감 있는 도료 마감으로 클래식한 정체성을 완성합니다."
  },
  {
    id: 2,
    title: "한남동 부티크",
    location: "한남동, 서울",
    category: "Cast & Iron",
    material: "황동 · 신주",
    bgImg: "/asset/cast_iron_sign_001_exterior.png",
    detailImg: "/asset/cast_iron_sign_001.jpg",
    description: "고온의 주조 틀에서 탄생하는 묵직한 전통 주물 간판입니다. 금속을 녹여내어 형성된 특유의 원초적인 밀도감 위에 테두리와 글자 엠보싱을 정교하게 폴리싱 마감하여, 시간이 흐를수록 깊어지는 공간의 헤리티지를 보여줍니다."
  },
  {
    id: 3,
    title: "중앙감속기, 차이니즈 퓨전 레스토랑",
    location: "성수동, 서울",
    category: "Brass & Copper",
    material: "적동",
    bgImg: "/asset/적동부식_001_interior.PNG",
    detailImg: "/asset/적동부식_001.jpg",
    description: "붉은빛 메탈 특유의 트렌디하고 감각적인 무드를 자아내는 리얼 적동 에디션입니다. 숙련된 마스터의 제어로 완성된 정밀 음각 부식 레이어 위에 섬세한 칠과 코팅을 더해, 인더스트리얼하면서도 고급스러운 공간의 포인트 오브제 역할을 합니다."
  },
  {
    id: 4,
    title: "키요이 스키야키, 일식 레스토랑",
    location: "서울대입구, 서울",
    category: "Cast & Iron",
    material: "황동 · 신주",
    bgImg: "/asset/주물간판001_exterior.png",
    detailImg: "/asset/주물간판001.png",
    description: "단단한 황동 합금을 고유의 몰드에 부어내어 기계가 흉내 낼 수 없는 입체적인 볼륨감을 구현했습니다. 바탕면의 중후한 질감과 장인의 손끝에서 대비를 이루는 입체 글자의 광택이 어우러져 매장의 첫인상에 깊은 신뢰감을 부여합니다."
  },
  {
    id: 5,
    title: "디자인 빌딩 준공 표지판",
    location: "성수동, 서울",
    category: "Stainless & Gold",
    material: "알루미늄",
    bgImg: "/asset/anodizing_001_exterior.png",
    detailImg: "/asset/anodizing_001.jpg",
    description: "경량 알루미늄 표면에 고난도 전기화학 공정을 적용한 아노다이징 에디션입니다. 인위적으로 형성된 산화 피막이 금속 내부를 완벽히 보호하여 탁월한 내구성을 자랑합니다."
  },
  {
    id: 6,
    title: "로라로라 한남 플래그십 스토어",
    location: "한남동, 서울",
    category: "Cast & Iron",
    material: "황동 · 신주",
    bgImg: "/asset/주물간판002_exterior.png",
    detailImg: "/asset/주물간판002.jpg",
    description: "브랜드 플래그십 스토어의 격에 맞춘 익스클루시브 금속 주조 간판입니다. 전통 주조 방식으로 완성된 두터운 황동 플레이트 위에 정밀한 도색과 섬세한 마감 처리를 입혀, 유동 인구가 많은 거리에서도 독보적인 존재감을 발휘합니다."
  },
  {
    id: 7,
    title: "폴뉴아 한남 플래그십 스토어",
    location: "한남동, 서울",
    category: "Cast & Iron",
    material: "황동 · 신주",
    bgImg: "/asset/주물간판003_exterior.png",
    detailImg: "/asset/주물간판003.jpg",
    description: "브랜드 플래그십 스토어의 격에 맞춘 익스클루시브 금속 주조 간판입니다. 전통 주조 방식으로 완성된 두터운 황동 플레이트 위에 정밀한 도색과 섬세한 마감 처리를 입혀, 유동 인구가 많은 거리에서도 독보적인 존재감을 발휘합니다."
  }
];
