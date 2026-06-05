export type Category = "All" | "Cast & Iron" | "Brass & Copper" | "Stainless & Gold" | "Etched Plates" | "Modern LED";

export interface WorkItem {
  id: number;
  title: { ko: string; en: string };       // ⭕ 다국어 구조로 변경
  location: { ko: string; en: string };    // ⭕ 다국어 구조로 변경
  category: Exclude<Category, "All">;
  material: { ko: string; en: string };    // ⭕ 다국어 구조로 변경
  bgImg: string;
  detailImg: string;
  description: { ko: string; en: string }; // ⭕ 다국어 구조로 변경
}

export const PRICING_MATRIX = {
 "Cast & Iron": { name: { ko: "프리미엄 주물", en: "Premium Cast Metal" }, basePrice: 250000 },
  "Brass & Copper": { name: { ko: "클래식 황동", en: "Classic Brass" }, basePrice: 200000 },
  "Stainless & Gold": { name: { ko: "모던 스텐", en: "Modern Stainless" }, basePrice: 120000 },
  "Essential Acrylic": { name: { ko: "실속형 아크릴", en: "Essential Acrylic" }, basePrice: 40000 }
};

export const SIZE_MULTIPLIERS = {
  small: 1.0,  // A4 내외
  medium: 1.4, // 우편함 내외
  large: 2.0   // 문 가로폭 내외
};

export const categoryLabels: Record<Category, { ko: string; en: string }> = {
  All: { ko: "전체보기", en: "All Works" },
  "Cast & Iron": { ko: "주물 · 철제", en: "Cast & Iron" },
  "Brass & Copper": { ko: "황동 · 적동", en: "Brass & Copper" },
  "Stainless & Gold": { ko: "스텐 · 골드", en: "Stainless & Gold" },
  "Etched Plates": { ko: "부식 현판", en: "Etched Plates" },
  "Modern LED": { ko: "모던 LED", en: "Modern LED" },
};

export const works: WorkItem[] = [
  {
    id: 1,
    title: { ko: "압구정 샌드위치", en: "Apgujeong Sandwich" },
    location: { ko: "압구정동, 서울", en: "Apgujeong, Seoul" },
    category: "Brass & Copper",
    material: { ko: "신주헤어라인 · 부식", en: "Brushed Brass & Etched" },
    bgImg: "/asset/Brass_Sign_001_exterior.png",
    detailImg: "/asset/Brass_Sign_001.jpg",
    description: {
      ko: "리얼 황동(신주) 본연의 고급스러운 결을 살린 헤어라인 베이스에 정밀 화학 부식 공정을 적용했습니다. 정교하게 음각 각인된 텍스트와 깊이감 있는 도료 마감이 어우러져, 시간이 흘러도 변치 않는 클래식한 정체성을 완성합니다.",
      en: "Crafted on a brushed real brass base with a precision chemical etching process. The delicately engraved text harmonizes with deep paint finishing to establish a timeless, classic brand identity."
    }
  },
  {
    id: 2,
    title: { ko: "뷰록 메이크업 스튜디오", en: "Vulok Makeup Studio" },
    location: { ko: "신사동, 서울", en: "Sinsa, Seoul" },
    category: "Stainless & Gold",
    material: { ko: "스텐레스 헤어라인 (5T)", en: "Stainless Steel Hairline (5T)" },
    bgImg: "/asset/stainless-hairline-001.webp",
    detailImg: "/asset/stainless-hairline-001(1).jpg",
    description: {
      ko: "5mm 두께의 중후한 스텐레스 헤어라인 플레이트에 정밀 레이저 커팅 공정을 적용했습니다. 메탈 특유의 모던하고 정제된 결 위로 섬세하게 오려낸 로고와 텍스트가 돋보이며, 스튜디오 공간의 감각적이고 세련된 아이덴티티를 완성합니다.",
      en: "An impressive 5mm thick stainless steel hairline plate featuring precision laser cutting. The delicately cutout logo and text stand proud over the refined metallic texture, completing a sophisticated identity for the studio space."
    }
  },
  {
    id: 3,
    title: { ko: "중앙감속기, 차이니즈 퓨전 레스토랑", en: "Jungang Gamsokgi Restaurant" },
    location: { ko: "성수동, 서울", en: "Seongsu, Seoul" },
    category: "Brass & Copper",
    material: { ko: "적동", en: "Real Copper" },
    bgImg: "/asset/copper-patina-001_interior.PNG",
    detailImg: "/asset/copper-patina-001.jpg",
    description: {
      ko: "붉은빛 메탈 특유의 트렌디하고 감각적인 무드를 자아내는 리얼 적동 에디션입니다. 숙련된 마스터의 제어로 완성된 정밀 음각 부식 레이어 위에 섬세한 칠과 코팅을 더해, 인더스트리얼하면서도 세련된 공간의 포인트 오브제가 되어줍니다.",
      en: "A real copper edition evoking a trendy and sensory mood unique to reddish metals. Crafted with a precision etched layer controlled by an expert master, finished with delicate paint and protective coating to serve as a striking industrial focal object."
    }
  },
  {
    id: 4,
    title: { ko: "폴뉴아 한남 플래그십 스토어", en: "FOLNUA Hannam Flagship Store" },
    location: { ko: "한남동, 서울", en: "Hannam, Seoul" },
    category: "Cast & Iron",
    material: { ko: "황동 · 신주", en: "Cast Brass" },
    bgImg: "/asset/cast-metal-sign-003_exterior.png",
    detailImg: "/asset/cast-metal-sign-003.jpg",
    description: {
      ko: "황동(신주)을 정밀하게 녹여 틀에 부어내는 전통 금속 주조 방식으로 제작되었습니다. 양면 바탕에는 감각적인 컬러 도장을 입히고, 돌출된 글자와 테두리는 장인의 손길로 정교하게 광(주물 폴리싱)을 내어 완성한 하이엔드 양면 간판입니다.",
      en: "Manufactured using a traditional metal casting process by melting pure brass into dedicated molds. Features sophisticated background coatings on both sides, with the embossed lettering and borders meticulously hand-polished by artisans to achieve a high-end double-sided signage."
    }
  },
  {
    id: 5,
    title: { ko: "디자인 빌딩 준공 표지판", en: "Design Building Cornerstone Sign" },
    location: { ko: "성수동, 서울", en: "Seongsu, Seoul" },
    category: "Stainless & Gold",
    material: { ko: "알루미늄", en: "Anodized Aluminum" },
    bgImg: "/asset/anodizing_001_exterior.png",
    detailImg: "/asset/anodizing_001.jpg",
    description: {
      ko: "경량 알루미늄 표면에 고난도 전기화학 공정을 적용한 아노다이징 에디션입니다. 표면에 정밀하게 형성된 산화 피막이 금속 내부를 완벽히 보호하여 변색과 부식에 강하며, 모던한 감각과 탁월한 내구성을 동시에 자랑합니다.",
      en: "An anodized edition applying high-level electrochemical processes to lightweight aluminum. The precision-formed oxide layer perfectly protects the metal interior, ensuring maximum resistance to discoloration and corrosion while offering a sleek modern aesthetic."
    }
  },
  {
    id: 6,
    title: { ko: "로라로라 한남 플래그십 스토어", en: "Rolarola Hannam Flagship Store" },
    location: { ko: "한남동, 서울", en: "Hannam, Seoul" },
    category: "Cast & Iron",
    material: { ko: "황동 · 신주", en: "Cast Brass" },
    bgImg: "/asset/cast-metal-sign-002_exterior.png",
    detailImg: "/asset/cast-metal-sign-002.jpg",
    description: {
      ko: "브랜드 플래그십 스토어의 격에 맞춘 익스클루시브 금속 주조 간판입니다. 전통 주조 방식으로 완성된 두터운 황동 플레이트 위에 정밀한 도색과 섬세한 마감 처리를 입혀, 유동 인구가 많은 거리에서도 독보적인 존재감과 아우라를 발휘합니다.",
      en: "An exclusive cast metal signage tailored to match the prestige of a brand flagship store. The heavy brass plate, completed via traditional casting methods, is finished with premium coatings to command a distinct and powerful presence on high-traffic streets."
    }
  },
  {
    id: 7,
    title: { ko: "키요이 스키야키, 일식 레스토랑", en: "Kiyoi Sukiyaki Restaurant" },
    location: { ko: "서울대입구, 서울", en: "Seoul Nat'l Univ., Seoul" },
    category: "Cast & Iron",
    material: { ko: "황동 · 신주", en: "Cast Brass" },
    bgImg: "/asset/cast-metal-sign-001_exterior.png",
    detailImg: "/asset/cast-metal-sign-001.png",
    description: {
      ko: "단단한 황동 합금을 고유의 몰드에 부어내어 기계가 흉내 낼 수 없는 입체적인 볼륨감을 구현했습니다. 바탕면의 중후한 질감과 장인의 손끝에서 대비를 이루는 입체 글자의 은은한 광택이 어우러져, 매장의 첫인상에 깊은 신뢰감을 부여합니다.",
      en: "Solid brass alloy poured into bespoke molds to achieve a 3D volumetric depth unrepeatable by machinery. The heavy texture of the background and the elegant luster of the polished embossed lettering forge an immediate impression of deep credibility."
    }
  },
  {
    id: 8,
    title: { ko: "한남동 부티크", en: "Hannam-dong Boutique" },
    location: { ko: "한남동, 서울", en: "Hannam, Seoul" },
    category: "Cast & Iron",
    material: { ko: "황동 · 신주", en: "Cast Brass" },
    bgImg: "/asset/cast_iron_sign_001_exterior.png",
    detailImg: "/asset/cast_iron_sign_001.jpg",
    description: {
      ko: "고온의 주조 틀에서 탄생하는 묵직한 전통 주물 간판입니다. 금속을 녹여내어 형성된 특유의 원초적인 밀도감 위에, 테두리와 글자 엠보싱을 정교하게 폴리싱 마감하여 시간이 흐를수록 깊어지는 공간의 헤리티지를 보여줍니다.",
      en: "A heavy, traditional cast metal signage born in high-temperature foundry molds. Above the raw, pristine density formed by melting metal, the borders and embossed text are precisely polished to manifest a deep heritage that matures with time."
    }
  }
];

// src/app/data/works.ts (기존 파일 하단에 추가 또는 materials.ts로 분리)

export interface MaterialSwatch {
  id: string;
  name: { ko: string; en: string };
  finishing: { ko: string; en: string };
  description: { ko: string; en: string };
  imgUrl: string;
}

export const swatches: MaterialSwatch[] = [
  {
    id: "brass-hl",
    name: { ko: "리얼 황동 헤어라인", en: "Real Brass Hairline" },
    finishing: { ko: "정밀 브러시드 공정 (Brushed)", en: "Precision Brushed Process" },
    description: {
      ko: "금속 표면에 정교한 직선 결을 내어 빛을 은은하게 흡수하고 분산시킵니다. 타임리스하고 클래식한 건축물 파사드나 프리미엄 브랜드 플래그십에 주로 사용됩니다.",
      en: "Creates delicate, linear grains on the metal surface to subtly absorb and disperse light. It is predominantly featured in timeless architectural facades and premium brand flagships."
    },
    imgUrl: "/materials/real_brass.PNG"
  },
  {
    id: "stainless-mirror",
    name: { ko: "스테인리스 폴리싱 미러", en: "SUS Polishing Mirror" },
    finishing: { ko: "초정밀 광택 공정 (Polishing)", en: "Ultra-Precision Polishing Process" },
    description: {
      ko: "왜곡 없이 사물이 비치는 고난도 거울면 마감입니다. 미니멀하고 미래지향적인 무드를 연출하며, 크롬 특유의 높은 반사율로 공간에 강렬한 오브제 역할을 합니다.",
      en: "A highly demanding mirror-finish that reflects objects without any distortion. It delivers a minimal, futuristic mood, serving as a powerful focal object through chrome's distinct high reflectivity."
    },
    imgUrl: "/materials/SUS.PNG"
  },
  {
    id: "copper-patina",
    name: { ko: "적동 빈티지 파티나 부식", en: "Copper Vintage Patina" },
    finishing: { ko: "화학적 에이징 공정 (Aged)", en: "Chemical Aging Process" },
    description: {
      ko: "시간의 깊이를 정밀하게 시뮬레이션한 수제 부식 마감입니다. 인하우스 마스터가 직접 부식 밀도를 제어하여, 모든 개체가 예술품처럼 고유한 패턴의 질감을 가집니다.",
      en: "A handcrafted patina finish that precisely simulates the depth of time. Our in-house master controls the oxidation density, giving each piece a unique, art-like pattern and texture."
    },
    imgUrl: "/materials/Cooper.PNG"
  }
];
