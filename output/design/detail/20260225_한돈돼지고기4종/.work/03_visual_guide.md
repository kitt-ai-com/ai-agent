# 비주얼 기획 & 나노 바나나 이미지 프롬프트 가이드
## 국내산 한돈 냉장 돼지고기 4종 골라담기 - 모바일 상세페이지

---

# PART 1: 브랜드 디자인 시스템

---

## 1. 컬러 팔레트

| 역할 | 컬러명 | HEX | RGB | 사용처 |
|------|--------|-----|-----|--------|
| **주조색** | 숯불 블랙 | `#1A1A1A` | 26, 26, 26 | 배경, 헤더, 프리미엄 섹션 |
| **보조 배경** | 웜 크림 | `#FFF8F0` | 255, 248, 240 | 밝은 섹션 배경, 정보 영역 |
| **강조색 1** | 식욕 레드 | `#E63312` | 230, 51, 18 | 할인가, CTA 버튼, 긴급 태그 |
| **강조색 2** | 골드 옐로 | `#D4A017` | 212, 160, 23 | 프리미엄 뱃지, 별점, 한돈 인증 |
| **서브색** | 자연 그린 | `#4A7C3F` | 74, 124, 63 | 국내산 태그, 신선 아이콘, 안심 뱃지 |
| **텍스트 기본** | 다크 그레이 | `#333333` | 51, 51, 51 | 본문 텍스트 |
| **텍스트 보조** | 미드 그레이 | `#888888` | 136, 136, 136 | 캡션, 부가 설명 |
| **취소선 가격** | 라이트 그레이 | `#AAAAAA` | 170, 170, 170 | 정가 취소선 |
| **구분선** | 소프트 그레이 | `#E5E5E5` | 229, 229, 229 | 섹션 구분, 카드 테두리 |

### 컬러 사용 원칙
- 블랙 배경 섹션(Zone 1, 3)과 크림 배경 섹션(Zone 2, 4, 6)을 교차 배치하여 시각 리듬 형성
- 레드는 가격/CTA에만 한정 사용 -- 남용 시 긴급감 효과 상실
- 골드는 "프리미엄" 메시지가 필요한 포인트에만 사용
- 그린은 "안심/국내산" 맥락에서만 사용

---

## 2. 타이포그래피 가이드

| 역할 | 폰트 | 굵기 | 크기 (모바일 720px 기준) | 행간 | 용도 |
|------|------|------|-------------------------|------|------|
| **대형 헤드라인** | Pretendard | ExtraBold (800) | 36~40px | 130% | Zone 1 메인 카피, 핵심 후킹 |
| **중형 헤드라인** | Pretendard | Bold (700) | 28~32px | 140% | 각 Zone 타이틀 |
| **소형 헤드라인** | Pretendard | SemiBold (600) | 22~24px | 150% | 서브 헤드라인, 부위명 |
| **본문** | Pretendard | Regular (400) | 15~16px | 170% | 설명 텍스트, 상세 정보 |
| **캡션/태그** | Pretendard | Medium (500) | 13~14px | 160% | 뱃지, 태그, 부가 정보 |
| **가격 숫자** | Pretendard | ExtraBold (800) | 44~52px | 100% | 할인가 강조 |
| **취소선 가격** | Pretendard | Regular (400) | 20~22px | 100% | 정가 취소선 |

### 타이포 규칙
- 한 화면에 폰트 굵기 3단계 이하 유지 (너무 많으면 산만)
- 숫자(가격, 할인율, 평점)는 항상 ExtraBold + 강조색 적용
- 행간은 본문 170% 필수 유지 -- 모바일에서 가독성 핵심
- 최소 폰트 13px 미만 사용 금지

---

## 3. 모바일 레이아웃 공통 규칙

| 항목 | 규격 |
|------|------|
| **캔버스 너비** | 720px 고정 |
| **기본 비율** | 3:4 (720 x 960px) -- Zone별 높이는 콘텐츠에 따라 가변 |
| **좌우 패딩** | 40px (양쪽) -- 콘텐츠 영역 640px |
| **섹션 간 여백** | 60~80px |
| **요소 간 여백** | 20~32px |
| **카드 라운드** | 12~16px |
| **CTA 버튼 높이** | 56~64px, 라운드 12px |
| **시선 흐름** | F패턴 기본, 가격/CTA는 Z패턴 강조 |

---

---

# PART 2: ZONE별 비주얼 가이드 + 나노 바나나 프롬프트

---

## ZONE 1: 시선 강탈 (Attention Hijack)
### 캔버스: 720 x 960px (3:4)

---

### 1-1. 이미지 컨셉 & 레이아웃

**컨셉**: "숯불 위 지글거리는 삼겹살" -- 어두운 숯불 배경 위 황금빛으로 익어가는 삼겹살이 주인공. 연기와 불꽃이 역동성 부여.

**레이아웃 구조**:
```
┌─────────────────────────────────┐
│  [좌상단] 국내산 한돈 뱃지       │ ← 그린+골드 라운드 뱃지 (13px, 패딩 8x16)
│  (40, 40) 위치                  │
│                                 │
│         [풀블리드 히어로 이미지]    │ ← 숯불 위 삼겹살 시즐컷
│         720 x 960px 전체        │    45도 각도, 따뜻한 조명
│                                 │
│                                 │
│  ─── 하단 1/3 그라데이션 오버레이 ──│ ← 블랙→투명 그라데이션 (하단→상단)
│                                 │
│  [하단 텍스트 영역]               │
│  "국내산 한돈이" (24px, 크림)     │
│  "9,500원" (52px, 레드, ExBold) │ ← 핵심 가격 앵커
│  "정가 15,500원" (20px, 취소선)  │
│  [39% OFF 뱃지] (레드 배경, 흰 글씨)│
│                                 │
│  [하단 4종 미니 썸네일 스트립]     │ ← 삼겹/오겹/목살/항정 4칸 (각 140x105px)
│  (40, 820) 위치, 간격 20px      │
└─────────────────────────────────┘
```

**세부 가이드**:
- 히어로 이미지: 숯불 그릴 위 삼겹살 3~4점이 익고 있는 장면. 연기가 피어오르고, 기름이 숯불에 떨어져 불꽃이 튀는 순간
- 조명: 숯불의 따뜻한 오렌지빛 + 상단에서 내려오는 부드러운 스팟 조명
- 하단 그라데이션: rgba(26,26,26,0.95) → rgba(26,26,26,0) 방향으로 하단 40% 영역
- 가격 영역은 그라데이션 위에 배치하여 가독성 확보
- 4종 미니 썸네일: 원형 또는 라운드 사각형, 각 부위 원물컷 (핑크빛 신선 육색)

---

### 1-2. 나노 바나나 이미지 프롬프트

#### 프롬프트 A: 메인 히어로 시즐컷 (Nano Banana)

```
Korean BBQ pork belly (samgyeopsal) grilling on a traditional charcoal grill (sutbul gui).
Three thick slices of pork belly with visible layers of meat and fat,
golden-brown sear marks on top surface, glistening with rendered fat.
Wisps of smoke rising from the charcoal underneath.
Small flames licking up where fat drips onto the hot coals.
Shot from a 45-degree overhead angle.
Warm amber and orange lighting from the charcoal glow below,
soft directional light from upper left.
Dark moody background, shallow depth of field with the front slice in sharp focus.
Food photography style, hyper-realistic, appetizing,
rich warm color tones.
Aspect ratio 3:4.
```

> **모델**: Nano Banana (제품/배경 이미지에 최적)
> **생성 후 수정 팁**:
> - 연기가 부족하면 "more visible smoke wisps rising dramatically"를 추가
> - 색감이 차가우면 "warm golden hour lighting, amber tones"로 조명 보강
> - 고기 두께가 얇으면 "thick-cut, 1.5cm thick slices"를 명시
> - 배경이 밝으면 "very dark background, low-key lighting"을 강조

#### 프롬프트 B: 4종 부위 미니 원물컷 -- 삼겹살 (Nano Banana)

```
Fresh raw Korean pork belly (samgyeopsal) slab,
neatly trimmed rectangular cut showing beautiful layers of lean meat and white fat.
Pink fresh color, placed on a dark slate stone surface.
Overhead flat-lay angle, soft natural window light from the left.
Minimalist composition, clean background,
food photography, high detail on meat texture and marbling.
Square format 1:1.
```

#### 프롬프트 C: 4종 부위 미니 원물컷 -- 오겹살 (Nano Banana)

```
Fresh raw Korean five-layer pork belly (ogyeopsal),
showing five distinct alternating layers of lean meat and fat.
Slightly thicker cut than regular pork belly, pinkish-red fresh color.
Placed on a dark slate stone surface.
Overhead flat-lay angle, soft natural window light from the left.
Minimalist composition, clean background,
food photography, high detail on the five-layer cross-section.
Square format 1:1.
```

#### 프롬프트 D: 4종 부위 미니 원물컷 -- 목살 (Nano Banana)

```
Fresh raw Korean pork neck (mokssal/pork collar),
well-marbled cut with fine intramuscular fat throughout the lean meat.
Rich pinkish-red color, slightly irregular natural shape.
Placed on a dark slate stone surface.
Overhead flat-lay angle, soft natural window light from the left.
Minimalist composition, clean background,
food photography, high detail on the marbling pattern.
Square format 1:1.
```

#### 프롬프트 E: 4종 부위 미니 원물컷 -- 항정살 (Nano Banana)

```
Fresh raw Korean pork jowl (hangjeongsal),
premium cut with distinctive fine marbling and smooth texture.
Light pink color with delicate white fat lines running through.
Small premium portion, placed on a dark slate stone surface.
Overhead flat-lay angle, soft natural window light from the left.
Minimalist composition, clean background,
food photography, high detail on the fine marbling and smooth surface.
Square format 1:1.
```

> **4종 원물컷 공통 수정 팁**:
> - 4장 모두 동일한 배경(dark slate)과 조명(좌측 자연광)으로 통일감 유지
> - 색감 차이가 크면 "consistent color temperature, 5500K daylight"을 추가
> - 부위별 특징이 약하면 각 부위의 고유 설명을 더 구체적으로 보강

---

---

## ZONE 2: 공감 + 관심 유발 (Empathy & Interest)
### 캔버스: 720 x 1280px (확장 비율 -- 콘텐츠 풍부)

---

### 2-1. 이미지 컨셉 & 레이아웃

**컨셉**: "4종 부위 골라담기 그리드" -- 밝은 크림 배경 위에 4종 부위를 카드 형태로 배치. 선택의 자유로움과 재미를 시각화.

**레이아웃 구조**:
```
┌─────────────────────────────────┐
│  배경: #FFF8F0 (웜 크림)         │
│                                 │
│  [공감 카피 영역] (40, 40)       │
│  "마트 삼겹살은 비싸고,          │ ← 16px, #888, Regular
│   수입산은 불안하셨죠?"          │
│  "국내산 한돈 냉장육을            │ ← 28px, #1A1A1A, Bold
│   이 가격에 골라담으세요"         │
│                                 │
│  ── 구분선 (#E5E5E5) ──         │
│                                 │
│  [4종 부위 카드 그리드]           │ ← 2x2 그리드
│  ┌──────────┬──────────┐       │
│  │ 삼겹살    │ 오겹살    │       │ ← 각 카드 300x380px
│  │ [이미지]  │ [이미지]  │       │    라운드 16px, 그림자
│  │ 부위명    │ 부위명    │       │
│  │ 한줄설명  │ 한줄설명  │       │
│  │ 구이/수육  │ 구이/수육 │       │ ← 용도 태그 (그린/레드 칩)
│  ├──────────┼──────────┤       │
│  │ 목살     │ 항정살    │       │
│  │ [이미지]  │ [이미지]  │       │
│  │ 부위명    │ 부위명    │       │
│  │ 한줄설명  │ 한줄설명  │       │
│  │ 구이/수육  │ 구이/수육 │       │
│  └──────────┴──────────┘       │
│                                 │
│  [가격 비교 바]                  │ ← 수평 3칸 비교
│  마트 1,800원/100g              │
│  vs 온라인수입 800원/100g        │
│  vs ★본상품 950원/100g (레드)    │
│                                 │
│  "국내산 품질, 수입산 가격"       │ ← 22px, Bold, 중앙정렬
└─────────────────────────────────┘
```

**세부 가이드**:
- 카드 디자인: 흰색 배경(#FFFFFF), 그림자 (0 4px 16px rgba(0,0,0,0.08)), 라운드 16px
- 각 카드 상단 60%는 부위 이미지 (45도 각도, 조리된 상태), 하단 40%는 텍스트
- 부위명: 22px SemiBold, 한 줄 설명: 14px Regular #888
- 용도 태그: 라운드 칩 형태 -- 구이용(레드 아웃라인), 수육용(그린 아웃라인)
- 가격 비교 바: 3칸 수평 배치, 본 상품 칸만 레드 배경+흰 글씨로 강조

---

### 2-2. 나노 바나나 이미지 프롬프트

#### 프롬프트 F: 구운 삼겹살 카드 이미지 (Nano Banana)

```
Perfectly grilled Korean pork belly (samgyeopsal) slices on a clean white plate,
3-4 golden brown slices with crispy edges and juicy interior visible.
Accompanied by small side of sliced garlic and green chili pepper.
Bright, airy food photography with soft overhead natural light.
Light neutral background, slightly warm tones.
Shot from 45-degree angle, shallow depth of field.
Clean minimalist plating, appetizing and fresh look.
Aspect ratio 3:4.
```

#### 프롬프트 G: 구운 오겹살 카드 이미지 (Nano Banana)

```
Thick-cut grilled Korean five-layer pork belly (ogyeopsal) on a white ceramic plate,
showing the five distinct layers with beautiful golden-brown crust on outside
and tender juicy layers visible in cross-section.
Thicker and more substantial than regular pork belly.
Bright, airy food photography with soft overhead natural light.
Light neutral background, warm appetizing tones.
Shot from 45-degree angle, shallow depth of field.
Clean modern plating style.
Aspect ratio 3:4.
```

#### 프롬프트 H: 구운 목살 카드 이미지 (Nano Banana)

```
Grilled Korean pork neck (mokssal/pork collar) slices on a white plate,
beautifully charred edges with juicy, well-marbled interior.
The marbling creates a moist, tender appearance.
Some slices showing grill marks in a crosshatch pattern.
Bright, airy food photography with soft overhead natural light.
Light neutral background, warm appetizing tones.
Shot from 45-degree angle, shallow depth of field.
Clean plating with a small leaf of lettuce as accent.
Aspect ratio 3:4.
```

#### 프롬프트 I: 구운 항정살 카드 이미지 (Nano Banana)

```
Grilled Korean pork jowl (hangjeongsal) on a white plate,
premium small portions with delicate golden sear,
melt-in-your-mouth tender texture visible, fine marbling throughout.
Slightly pink interior showing perfect medium doneness.
Bright, airy food photography with soft overhead natural light.
Light neutral background, warm appetizing tones.
Shot from 45-degree angle, shallow depth of field.
Elegant minimalist plating emphasizing the premium quality.
Aspect ratio 3:4.
```

> **Zone 2 카드 이미지 공통 수정 팁**:
> - 4장 모두 "white plate, bright airy light, 45-degree angle"로 통일
> - 배경이 어두우면 "bright white background, high-key lighting"으로 변경
> - 고기가 너무 탄 느낌이면 "golden brown, not burnt, appetizing color"를 추가
> - 각 부위 특성이 잘 안 보이면 "cross-section view showing internal texture"를 추가

---

---

## ZONE 3: 욕구 폭발 (Desire Explosion)
### 캔버스: 720 x 1440px (풀 콘텐츠 확장)

---

### 3-1. 이미지 컨셉 & 레이아웃

**컨셉**: "지금 당장 먹고 싶은 순간들" -- 시즐컷 대형 이미지와 라이프스타일 장면으로 감각 자극 최대화. 어두운 배경으로 다시 전환하여 몰입감 극대화.

**레이아웃 구조**:
```
┌─────────────────────────────────┐
│  배경: #1A1A1A (숯불 블랙)       │
│                                 │
│  [감각 자극 카피] (중앙정렬)      │
│  "두툼한 삼겹살이"               │ ← 28px, #FFF8F0, Bold
│  "숯불 위에서 지글지글"           │ ← 36px, #FFF8F0, ExBold
│                                 │
│  [메인 시즐컷 -- 대형]           │ ← 720 x 540px (3:4 비율 내)
│  집게로 삼겹살 뒤집는 순간        │    풀 와이드, 동적 장면
│  연기+불꽃+육즙 방울             │
│                                 │
│  [마블링 클로즈업 스트립]         │ ← 가로 풀와이드 밴드
│  720 x 200px                   │    생고기 마블링 매크로
│  "눈으로 확인하는 한돈의 품질"    │ ← 16px, 골드, 오버레이 텍스트
│                                 │
│  ── 구분선 (골드, 얇은 실선) ──  │
│                                 │
│  [라이프스타일 3단 스크롤]        │
│                                 │
│  [Scene 1: 가족 식탁]           │ ← 640 x 480px, 라운드 16px
│  따뜻한 조명의 가정집 식탁        │
│  가족이 고기 구워먹는 장면        │
│  "퇴근 후 30분,                 │ ← 오버레이 텍스트
│   온 가족이 행복한 저녁 식탁"     │
│                                 │
│  [Scene 2: 캠핑 그릴]           │ ← 640 x 480px, 라운드 16px
│  야외 캠핑장에서 그릴 위 고기     │
│  자연광+화로 불빛               │
│  "주말 캠핑의 하이라이트,         │
│   직접 가져간 한돈 한 팩"        │
│                                 │
│  [Scene 3: 친구 모임]           │ ← 640 x 480px, 라운드 16px
│  집들이/홈파티 분위기             │
│  소주잔과 함께하는 삼겹살 장면     │
│  "친구가 물어봅니다              │
│   이거 어디서 샀어?"             │
│                                 │
│  [조리 과정 4단 스텝]            │ ← 4칸 수평 (각 140x140px)
│  포장 → 개봉 → 굽기 → 완성      │
│  "받자마자 바로 구워 드세요"      │ ← 22px, 레드, Bold
└─────────────────────────────────┘
```

**세부 가이드**:
- 메인 시즐컷: 집게로 뒤집는 동적 장면 -- 가장 식욕을 자극하는 "기름이 쏟아지는 순간"
- 마블링 밴드: 생고기 표면 매크로 촬영 느낌 -- 품질의 시각 증거
- 라이프스타일 3장: 각각 다른 사용 시나리오(가족/캠핑/친구) -- 페르소나별 맞춤 공감
- 조리 4단 스텝: 미니 아이콘형 -- "해동 없이 바로" 메시지 강조 (냉장의 장점)

---

### 3-2. 나노 바나나 이미지 프롬프트

#### 프롬프트 J: 메인 시즐컷 -- 뒤집는 순간 (Nano Banana)

```
Dynamic action shot of Korean BBQ:
metal tongs flipping a thick slice of pork belly on a charcoal grill,
the moment of flipping captured mid-air.
Golden-brown seared surface on the flipped side,
juicy fat rendering and dripping down,
small flames erupting from the charcoal where fat drops.
Dramatic wisps of smoke swirling upward.
Dark background, warm amber lighting from below (charcoal glow),
slight rim light on the tongs and meat edges.
Food photography, dramatic and dynamic composition,
hyper-realistic, appetizing warm color palette.
Aspect ratio 4:3.
```

> **수정 팁**:
> - 집게가 부자연스러우면 "stainless steel Korean BBQ tongs, realistic hand grip" 추가
> - 연기가 과하면 "subtle smoke, not obscuring the meat" 수정
> - 불꽃이 너무 크면 "small controlled flames, not a fire hazard" 조정

#### 프롬프트 K: 마블링 클로즈업 밴드 (Nano Banana)

```
Extreme close-up macro shot of fresh raw pork with beautiful marbling pattern,
fine white fat lines interspersed throughout pink lean meat.
Wet glossy surface reflecting light, showing premium meat quality.
Ultra-sharp focus on the marbling texture.
Soft gradient lighting from left, dark background fading to black on edges.
Food photography, studio lighting, high detail,
emphasis on the quality and freshness of the meat texture.
Wide panoramic aspect ratio 18:5.
```

> **수정 팁**:
> - 마블링이 약하면 "highly marbled, visible intramuscular fat network" 보강
> - 색감이 탁하면 "vibrant fresh pink color, not oxidized, freshly cut surface"

#### 프롬프트 L: 라이프스타일 -- 가족 식탁 (Nano Banana)

```
Warm cozy Korean family dinner scene at home:
a family of three (mother, father, young child around 7 years old)
gathered around a tabletop grill at the dining table.
Grilling pork belly together, the child excitedly reaching with chopsticks.
Side dishes (kimchi, ssamjang, lettuce wraps) arranged on the table.
Warm golden evening indoor lighting, residential dining room setting.
Candid natural moment, genuine smiles and happiness.
Soft bokeh background showing a cozy home interior.
Lifestyle photography, warm nostalgic tones, inviting atmosphere.
Aspect ratio 4:3.
```

> **수정 팁**:
> - 인물이 부자연스러우면 "photorealistic people, natural expressions, candid moment" 강조
> - 음식이 안 보이면 "tabletop grill clearly visible with grilling meat in center of frame"
> - 조명이 차가우면 "warm tungsten indoor lighting, golden hour warmth"

#### 프롬프트 M: 라이프스타일 -- 캠핑 그릴 (Nano Banana)

```
Outdoor camping BBQ scene:
a portable charcoal grill on a wooden camping table,
thick pork belly slices sizzling on the grill grate.
Natural forest/mountain backdrop slightly blurred.
Late afternoon golden sunlight filtering through trees.
Camping gear visible in background (tent, lantern).
Smoke rising from the grill into the natural setting.
Lifestyle photography, adventurous yet cozy mood,
warm natural color palette with greens and ambers.
Aspect ratio 4:3.
```

> **수정 팁**:
> - 배경이 너무 선명하면 "shallow depth of field, blurred nature background" 강조
> - 캠핑 느낌이 약하면 "camping folding table, outdoor portable grill, nature setting" 보강

#### 프롬프트 N: 라이프스타일 -- 친구 모임/소주 (Nano Banana)

```
Korean home party scene with friends:
a close-up of a sizzling pork belly on a tabletop grill,
two green soju bottles and small soju glasses visible on the table.
Lettuce leaves for wrapping, garlic, and dipping sauce arranged nearby.
Warm convivial atmosphere, slightly dim ambient lighting
with the warm glow from the grill illuminating the food.
Background shows blurred silhouettes of friends gathering.
Lifestyle food photography, social and fun mood,
warm inviting tones.
Aspect ratio 4:3.
```

#### 프롬프트 O: 조리 4단 스텝 -- 통합 이미지 (Nano Banana Pro)

```
Four-step cooking process shown in a 4-panel horizontal strip layout:
Panel 1: Vacuum-sealed package of fresh pink pork belly with Korean label.
Panel 2: Package being opened, fresh meat revealed on a cutting board.
Panel 3: Meat slices on a hot grill with visible sizzle and smoke.
Panel 4: Beautifully grilled golden-brown pork belly on a plate, ready to eat, with chopsticks.
Each panel cleanly separated, consistent bright lighting throughout all panels.
Clean white background behind each panel, instructional infographic style.
Numbered steps 1-2-3-4 visible.
Horizontal layout, aspect ratio 4:1.
```

> **모델**: Nano Banana Pro (텍스트/인포그래픽 포함 이미지)
> **수정 팁**:
> - 4칸 구분이 안 되면 "clearly separated four panels with thin dividing lines" 추가
> - 순서 번호가 안 보이면 별도로 디자인 툴에서 오버레이 추가 권장

---

---

## ZONE 4: 신뢰 구축 (Trust Building)
### 캔버스: 720 x 1200px

---

### 4-1. 이미지 컨셉 & 레이아웃

**컨셉**: "데이터와 인증으로 증명하는 품질" -- 밝은 크림 배경으로 전환. 리뷰, 인증, 배송 과정을 깔끔한 인포그래픽으로 정리.

**레이아웃 구조**:
```
┌─────────────────────────────────┐
│  배경: #FFF8F0 (웜 크림)         │
│                                 │
│  [신뢰 헤드라인]                 │
│  "이미 먹어본 분들의 솔직 후기"   │ ← 28px, Bold, 중앙정렬
│                                 │
│  [평점 대형 표시]                │
│  ★★★★★  5.0 / 5.0            │ ← 골드 별점 + 40px 숫자
│  "구매 고객 만족도"              │ ← 14px, #888
│                                 │
│  [리뷰 카드 슬라이드 3장]        │ ← 좌우 스와이프 느낌
│  ┌────────────────────┐        │
│  │ ★★★★★              │        │ ← 각 카드 580x200px
│  │ "이 가격에 국내산     │        │    흰 배경, 그림자, 라운드 12px
│  │  냉장이라니, 사기급!" │        │
│  │ 구매자 OOO          │        │
│  └────────────────────┘        │
│  (+ 2장 더 -- 슬라이드 도트)     │
│                                 │
│  ── 구분선 ──                   │
│                                 │
│  [인증 뱃지 가로 배치]           │ ← 3칸 수평 (각 200x80px)
│  [국내산 한돈] [냉장 직배송] [HACCP]│
│                                 │
│  ── 구분선 ──                   │
│                                 │
│  [배송 과정 인포그래픽]           │ ← 수평 5단계 화살표
│  산지 → 가공 → 냉장포장 → 배송 → 식탁│
│  각 단계 아이콘 + 한줄 설명       │ ← 아이콘 48x48px
│                                 │
│  [상품 정보 투명 공개 카드]       │
│  원산지: 국내산 | 상태: 냉장      │
│  보관: 0~4도 냉장보관            │ ← 14px, 테이블 형식
│  소비기한: 제조일로부터 OO일      │
└─────────────────────────────────┘
```

**세부 가이드**:
- 리뷰 카드: 그림자와 라운드로 카드감 부여, 핵심 문장 Bold 처리
- 인증 뱃지: 골드 테두리 + 아이콘 + 텍스트 조합. 그린(국내산), 블루(냉장), 오렌지(HACCP)
- 배송 인포그래픽: 좌→우 수평 흐름, 각 단계 사이 화살표 아이콘
- 전체적으로 "깔끔하고 신뢰감 있는" 정보 디자인 톤

---

### 4-2. 나노 바나나 이미지 프롬프트

#### 프롬프트 P: 인증 뱃지 및 아이콘 세트 (Nano Banana Pro)

```
A set of three certification badge icons for a Korean premium pork product,
arranged horizontally with equal spacing:
Badge 1: "Korean Handon" domestic pork certification badge with a pig silhouette icon,
green and gold color scheme, shield shape.
Badge 2: "Fresh Chilled Delivery" badge with a snowflake and truck icon,
blue and white color scheme, shield shape.
Badge 3: "HACCP" food safety certification badge with a checkmark icon,
orange and white color scheme, shield shape.
Each badge has clean flat design, modern minimalist style,
consistent size and shape across all three.
Light cream background (#FFF8F0).
Graphic design style, vector-like quality.
Aspect ratio 3:1.
```

> **모델**: Nano Banana Pro (텍스트/그래픽 포함)
> **수정 팁**:
> - 텍스트가 깨지면 뱃지 이미지는 그래픽 요소만 생성하고, 텍스트는 디자인 툴에서 별도 추가 권장
> - 색상이 안 맞으면 각 뱃지의 HEX 코드를 명시적으로 지정

#### 프롬프트 Q: 냉장 배송 과정 인포그래픽 (Nano Banana Pro)

```
Horizontal 5-step infographic showing the cold chain delivery process for fresh pork:
Step 1: Farm icon with a barn and pig - labeled "Farm"
Step 2: Factory icon with processing facility - labeled "Processing"
Step 3: Ice crystal/refrigerator icon with sealed package - labeled "Cold Packing"
Step 4: Refrigerated delivery truck icon - labeled "Chilled Delivery"
Step 5: Happy family at dining table icon - labeled "Your Table"
Connected by arrow icons between each step.
Clean flat design, minimal icons with thin line style.
Color palette: green (#4A7C3F) for farm, blue for cold chain steps,
warm red (#E63312) for the final dining table step.
White background, modern infographic style.
Aspect ratio 5:1.
```

> **모델**: Nano Banana Pro
> **수정 팁**:
> - 아이콘이 복잡하면 "simple line icons, minimalist flat design" 강조
> - 화살표가 안 보이면 "clearly visible right-pointing arrows between each step"
> - 텍스트 레이블은 디자인 툴에서 한글로 교체 권장 (영문으로 생성 후 한글 오버레이)

---

---

## ZONE 5: 긴급성 + 행동 촉발 (Urgency Trigger)
### 캔버스: 720 x 800px

---

### 5-1. 이미지 컨셉 & 레이아웃

**컨셉**: "지금 아니면 늦는다" -- 짧고 강렬한 긴급 메시지 섹션. 레드와 블랙의 강한 대비로 시각적 긴장감 조성.

**레이아웃 구조**:
```
┌─────────────────────────────────┐
│  배경: 그라데이션                │
│  #1A1A1A → #2D1A1A (미세 레드)  │ ← 미묘하게 레드 틴트 가미
│                                 │
│  [긴급 태그]                     │
│  "SALE" 또는 "한정 특가"         │ ← 레드 배경 라운드 칩, 13px 흰글씨
│                                 │
│  [메인 긴급 카피]                │
│  "이 가격, 지금이 아니면          │ ← 32px, #FFF8F0, Bold
│   다시 없습니다"                 │
│                                 │
│  [가격 앵커링 리마인드]           │ ← Zone 1 가격 재강조
│  정가 15,500원 (취소선)          │
│  → 9,500원 (52px, 레드)         │
│  "6,000원 절약!"               │ ← 골드, 22px, Bold
│                                 │
│  [무료배송 프로그레스 바]         │ ← 풀와이드 640px
│  ████████░░░░  "무료배송까지     │    레드 게이지 바
│   OO원 남았어요!"               │    12px 흰 글씨
│                                 │
│  [CTA 버튼 -- 대형]             │ ← 640 x 64px, 레드(#E63312)
│  "지금 바로 골라담기"            │    24px, 흰 글씨, ExBold
│                                 │    라운드 12px
│  [하단 안심 멘트]                │
│  "한정 수량 소진 시 가격이        │ ← 14px, #888, 중앙정렬
│   변경될 수 있습니다"            │
└─────────────────────────────────┘
```

**세부 가이드**:
- 이 Zone은 이미지보다 타이포그래피와 레이아웃이 핵심
- 가격 숫자는 화면에서 가장 큰 텍스트 요소 (52px)
- CTA 버튼: 미세한 그림자 + 호버 시 밝아지는 효과 (웹 구현 시)
- 프로그레스 바: 레드 게이지가 60~70% 차 있는 상태로 표현 -- "거의 다 됐다" 심리
- 과도한 타이머/카운트다운은 지양 -- 자연스러운 긴급감

---

### 5-2. 나노 바나나 이미지 프롬프트

> **Zone 5는 텍스트 중심 레이아웃이므로 별도 이미지 생성보다 디자인 툴에서 직접 구성을 권장합니다.**
> 필요 시 아래 배경 이미지를 생성하여 텍스트 아래에 깔 수 있습니다.

#### 프롬프트 R: 긴급 섹션 배경 이미지 (Nano Banana)

```
Dark dramatic background texture for a sale promotion banner:
subtle charcoal grill texture with faint red ember glow in the lower portion,
very dark overall (near black) with warm red-orange light accents.
Abstract and atmospheric, not showing specific food items.
Suitable as a text overlay background.
Dark moody, cinematic color grading,
slight smoke or haze effect for depth.
Aspect ratio 3:4.
```

> **수정 팁**:
> - 너무 밝으면 "extremely dark, almost black, just faint hints of warm light" 수정
> - 텍스트 가독성을 위해 생성 후 Brightness -20~30% 추가 조정 권장

---

---

## ZONE 6: 구매 전환 + 안심 (Conversion & Reassurance)
### 캔버스: 720 x 960px

---

### 6-1. 이미지 컨셉 & 레이아웃

**컨셉**: "안심하고 담으세요" -- 밝고 깨끗한 크림 배경. 교환/반품 정책, 무료배송, 최종 CTA를 명확하게 정리.

**레이아웃 구조**:
```
┌─────────────────────────────────┐
│  배경: #FFF8F0 (웜 크림)         │
│                                 │
│  [안심 헤드라인]                 │
│  "안심하고 주문하세요"            │ ← 28px, Bold, 중앙정렬
│                                 │
│  [안심 보증 카드 3종 -- 수평]     │ ← 3칸 (각 196x220px)
│  ┌────┐  ┌────┐  ┌────┐       │
│  │ 교환 │  │ 냉장 │  │ 국내산│       │
│  │ 보장 │  │ 배송 │  │ 한돈 │       │    각 카드: 아이콘 + 타이틀 + 설명
│  │ 아이콘│  │ 아이콘│  │ 아이콘│       │    흰 배경, 라운드 12px, 그림자
│  │ 7일  │  │ 신선 │  │ 인증 │       │
│  │ 이내 │  │ 유지 │  │ 완료 │       │
│  └────┘  └────┘  └────┘       │
│                                 │
│  [교환/반품 정책 안내]            │
│  "7일 이내 교환/반품 가능"       │ ← 16px, Bold
│  "불량 시 배송비는 저희가         │ ← 15px, Regular
│   부담합니다"                   │
│  "단순 변심도 교환 가능"         │
│                                 │
│  ── 구분선 ──                   │
│                                 │
│  [주문 프로세스 3단계]            │ ← 수평 3칸 + 화살표
│  ① 부위 선택 → ② 용도 선택 → ③ 결제│
│  "3번의 클릭으로 완료!"          │ ← 16px, 레드
│                                 │
│  ── 구분선 ──                   │
│                                 │
│  [최종 CTA 영역 -- 블랙 배경 밴드] │ ← #1A1A1A 배경 밴드
│                                 │
│  "국내산 한돈 4종,               │ ← 22px, 크림, SemiBold
│   오늘의 가격으로 골라담기"       │
│                                 │
│  [CTA 버튼 -- 최대형]           │ ← 640 x 72px, 레드
│  "지금 주문하기"                 │ ← 28px, ExBold, 흰 글씨
│                                 │
│  "50,000원 이상 무료배송"       │ ← 14px, 골드
│                                 │
└─────────────────────────────────┘
```

**세부 가이드**:
- 안심 카드 3종: 각각 아이콘(48px) + 타이틀(16px Bold) + 설명(13px Regular)
- 주문 프로세스: 번호 원형(레드 배경 + 흰 숫자) + 텍스트 + 화살표
- 최종 CTA 밴드: 블랙 배경으로 시선 집중, 버튼은 이 문서에서 가장 큰 CTA
- 무료배송 골드 텍스트로 추가 혜택 어필

---

### 6-2. 나노 바나나 이미지 프롬프트

#### 프롬프트 S: 안심 보증 아이콘 세트 (Nano Banana Pro)

```
Three clean guarantee/trust icons arranged horizontally for an e-commerce product page:
Icon 1: Exchange/Return guarantee - a circular arrow icon with a checkmark,
in green (#4A7C3F) color, text below reads "7-Day Return".
Icon 2: Fresh chilled delivery - a snowflake with a delivery box icon,
in blue (#3B82F6) color, text below reads "Cold Chain".
Icon 3: Korean domestic pork certification - a shield with a Korean flag-inspired icon,
in gold (#D4A017) color, text below reads "Korean Handon".
Flat design, modern minimalist icons, consistent style across all three.
White card background with subtle shadow, rounded corners.
Light cream (#FFF8F0) overall background.
Aspect ratio 3:1.
```

> **모델**: Nano Banana Pro
> **수정 팁**:
> - 영문 텍스트로 생성 후 한글 텍스트("교환보장", "냉장배송", "국내산 한돈")로 디자인 툴에서 교체
> - 아이콘 스타일이 불일치하면 "uniform line weight, same icon style family" 추가

#### 프롬프트 T: 주문 프로세스 인포그래픽 (Nano Banana Pro)

```
A simple 3-step ordering process infographic, horizontal layout:
Step 1: A selection grid icon showing 4 meat cuts with a finger tapping - "Select Cut"
Step 2: A toggle switch icon showing "Grilling / Boiling" options - "Select Style"
Step 3: A shopping cart icon with a checkmark - "Order Complete"
Right-pointing arrows connecting each step.
Red (#E63312) numbered circles (1, 2, 3) above each step.
Clean flat design, modern e-commerce style.
White background, minimal and clear.
Aspect ratio 4:1.
```

> **모델**: Nano Banana Pro
> **수정 팁**: 텍스트를 한글로 변경 필요 시 디자인 툴에서 오버레이

---

---

# PART 3: 이미지 생성 순서 & 워크플로우 추천

---

## 생성 우선순위 (효율적 작업 순서)

| 순서 | 프롬프트 ID | 이미지 | 사용 Zone | 모델 | 우선도 | 이유 |
|------|------------|--------|-----------|------|--------|------|
| 1 | **A** | 메인 히어로 시즐컷 | Zone 1 | Nano Banana | ★★★ | 첫인상 결정, 전체 톤 기준점 |
| 2 | **B, C, D, E** | 4종 부위 원물컷 | Zone 1 | Nano Banana | ★★★ | 상품 정체성, 여러 Zone에서 재사용 가능 |
| 3 | **J** | 뒤집는 시즐컷 | Zone 3 | Nano Banana | ★★★ | 욕구 자극 핵심 이미지 |
| 4 | **F, G, H, I** | 4종 구운 카드 이미지 | Zone 2 | Nano Banana | ★★☆ | 부위별 소개 핵심 |
| 5 | **K** | 마블링 클로즈업 | Zone 3 | Nano Banana | ★★☆ | 품질 증거 |
| 6 | **L, M, N** | 라이프스타일 3장 | Zone 3 | Nano Banana | ★★☆ | 감정 이입, 시나리오 연출 |
| 7 | **P** | 인증 뱃지 세트 | Zone 4 | Nano Banana Pro | ★☆☆ | 디자인 툴로도 대체 가능 |
| 8 | **Q** | 배송 인포그래픽 | Zone 4 | Nano Banana Pro | ★☆☆ | 디자인 툴 병행 권장 |
| 9 | **R** | 긴급 섹션 배경 | Zone 5 | Nano Banana | ★☆☆ | 단순 텍스처, 선택적 |
| 10 | **S** | 안심 아이콘 세트 | Zone 6 | Nano Banana Pro | ★☆☆ | 디자인 툴로도 대체 가능 |
| 11 | **T** | 주문 프로세스 | Zone 6 | Nano Banana Pro | ★☆☆ | 디자인 툴로도 대체 가능 |
| 12 | **O** | 조리 4단 스텝 | Zone 3 | Nano Banana Pro | ★☆☆ | 디자인 툴 병행 권장 |

---

## 생성 워크플로우 팁

### 1단계: 톤 세팅 (프롬프트 A)
- 메인 히어로를 먼저 생성하여 전체 색감, 조명, 무드의 기준점 확보
- 마음에 드는 결과가 나올 때까지 2~3회 반복 생성 후 베스트 선택
- 이 이미지의 색온도/분위기를 이후 모든 이미지의 레퍼런스로 활용

### 2단계: 원물컷 통일 (프롬프트 B~E)
- 4장 모두 동일 세션에서 연속 생성 -- 일관된 조명과 배경 유지
- "dark slate surface, overhead angle, left window light" 키워드를 4장 모두 동일하게 유지
- 한 장이라도 톤이 다르면 해당 장만 재생성

### 3단계: 조리 이미지 (프롬프트 F~I, J)
- 구운 상태 이미지도 4장 동일 스타일로 연속 생성
- 시즐컷(J)은 가장 역동적인 이미지이므로 여러 번 생성하여 베스트 선택

### 4단계: 분위기 이미지 (프롬프트 K~N)
- 라이프스타일 컷은 "사람"이 등장하므로 자연스러움이 핵심
- 부자연스러운 인물이 나오면 과감하게 재생성
- 인물 없이 "테이블 위 음식+소품" 구도로 대안 가능

### 5단계: 인포그래픽 (프롬프트 O, P, Q, R, S, T)
- Nano Banana Pro로 생성하되, 텍스트 품질이 불안정할 수 있음
- 그래픽 요소만 AI로 생성하고, 텍스트는 반드시 디자인 툴(Figma, Canva 등)에서 한글로 오버레이
- 인포그래픽은 디자인 툴 직접 제작이 더 효율적일 수 있음 -- AI 생성은 참고/초안용

---

## 최종 체크리스트

- [ ] 모든 이미지 720px 기준 해상도로 내보내기
- [ ] 4종 원물컷 색감/배경 통일 확인
- [ ] 4종 구운 이미지 플레이팅 스타일 통일 확인
- [ ] 시즐컷 이미지 식욕 자극 강도 확인 (연기, 육즙, 불꽃)
- [ ] 라이프스타일 이미지 인물 자연스러움 확인
- [ ] 인포그래픽 한글 텍스트 오버레이 완료
- [ ] 전체 이미지 컬러 팔레트 일관성 (숯불블랙/크림/레드/골드/그린)
- [ ] CTA 버튼 색상 레드(#E63312) 통일
- [ ] 폰트 최소 크기 13px 이상 확인
- [ ] 모바일에서 실제 스크롤 시 F/Z 시선 흐름 체크

---

*본 비주얼 가이드는 전략 브리프(01_strategy_brief.md)와 카피라이팅 가이드(02_copy_guide.md)를 기반으로 작성되었습니다. 상세페이지 제작 시 세 문서를 함께 참조하세요.*
