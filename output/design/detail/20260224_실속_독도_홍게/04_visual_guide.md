# 비주얼 가이드 & 나노 바나나 이미지 프롬프트: 글로우핏 하이드라 비타 세럼

> 작성일: 2026-02-24
> 작성: 비주얼 디자이너 (Visual Designer)
> 기반 문서: 01_strategy_brief.md, 02_psychology_map.md

---

## 0. 브랜드 컬러 팔레트 & 타이포그래피 통합 가이드

### 0-1. 컬러 팔레트

| 역할 | 컬러명 | HEX | 용도 |
|------|--------|-----|------|
| **Primary** | 비타민 오렌지 | `#FF8C42` | CTA 버튼, 가격 강조, 핵심 수치 |
| **Primary Light** | 글로우 옐로우 | `#FFD166` | 배경 하이라이트, 배지, 서브 강조 |
| **Secondary** | 딥 네이비 | `#1B2A4A` | 본문 텍스트, 헤드라인 |
| **Secondary Light** | 슬레이트 그레이 | `#6B7B8D` | 서브 텍스트, 캡션 |
| **Accent** | 세럼 골드 | `#E8B84B` | 프리미엄 느낌 포인트, 인증 마크 테두리 |
| **Background** | 클린 화이트 | `#FFFFFF` | 기본 배경 |
| **Background Alt** | 웜 아이보리 | `#FFF9F0` | 섹션 구분 배경, 카드 배경 |
| **Background Dark** | 소프트 크림 | `#F5EDE3` | 강조 섹션 배경 (가격, CTA) |
| **Success** | 민트 그린 | `#4ECDC4` | 체크마크, 인증 완료, 긍정 표시 |
| **Alert** | 소프트 레드 | `#E85D5D` | 할인율, 취소선 가격, 타이머 긴급성 |

**컬러 사용 비율:** 화이트/아이보리(70%) + 네이비(15%) + 오렌지/옐로우(10%) + 기타(5%)

**그라데이션:**
- 히어로 배경: `#FFF9F0` → `#FFFFFF` (상단에서 하단으로)
- CTA 버튼: `#FF8C42` → `#FF7528` (좌에서 우로)
- 성분 섹션 배경: `#FFFFFF` → `#FFF9F0` → `#FFFFFF`

### 0-2. 타이포그래피 가이드

| 용도 | 폰트 | 사이즈 (모바일 720px 기준) | 굵기 | 행간 | 자간 |
|------|------|--------------------------|------|------|------|
| **메인 헤드라인** | Pretendard | 32~36px | ExtraBold (800) | 140% | -0.02em |
| **서브 헤드라인** | Pretendard | 24~28px | Bold (700) | 140% | -0.01em |
| **섹션 타이틀** | Pretendard | 20~22px | SemiBold (600) | 145% | 0 |
| **본문** | Pretendard | 15~16px | Regular (400) | 170% | 0.01em |
| **강조 본문** | Pretendard | 15~16px | SemiBold (600) | 170% | 0.01em |
| **캡션/주석** | Pretendard | 12~13px | Regular (400) | 160% | 0.02em |
| **가격 (할인가)** | Pretendard | 40~48px | ExtraBold (800) | 110% | -0.03em |
| **가격 (정가/취소선)** | Pretendard | 18~20px | Regular (400) | 110% | 0 |
| **CTA 버튼 텍스트** | Pretendard | 18~20px | Bold (700) | 100% | 0.05em |
| **숫자 강조 (72시간 등)** | Montserrat | 48~60px | ExtraBold (800) | 100% | -0.02em |
| **배지/태그** | Pretendard | 11~12px | Bold (700) | 100% | 0.05em |

### 0-3. 모바일 레이아웃 기본 원칙

- **기준 해상도:** 720 x 960px (3:4 비율)
- **좌우 패딩:** 32px (양쪽)
- **콘텐츠 영역:** 656px
- **섹션 간 여백:** 64~80px
- **요소 간 여백:** 16~24px
- **카드 라운드:** 12~16px
- **그림자:** `0 4px 20px rgba(27, 42, 74, 0.08)`
- **시선 흐름:** F-패턴 (텍스트 중심 섹션) / Z-패턴 (비주얼 중심 섹션)

---

## ZONE 1: 히어로 영역 (시선 멈춤 + 공감)

### 1-1. 이미지 컨셉

**컨셉: "아침 거울 앞의 전환 순간"**

히어로 영역은 상세페이지의 첫인상으로, 3초 안에 타겟의 스크롤을 멈추게 해야 한다. 아침 자연광이 비치는 욕실 환경에서 세럼을 손에 올린 여성의 모습을 중심으로, 클린하면서도 감각적인 뷰티 비주얼을 구성한다. 핵심은 "이 제품을 쓰면 달라질 수 있다"는 기대감을 시각적으로 전달하는 것이다.

이미지는 제품 사용의 결과물(글로잉 피부)에 초점을 맞추되, 과장된 보정 없이 자연스럽고 건강한 피부 톤을 보여준다. 배경은 깔끔한 욕실/드레서 환경으로, 타겟 페르소나의 일상과 자연스럽게 연결되어야 한다.

### 1-2. 레이아웃 가이드

```
┌──────────────────────────────────┐  720 x 960px
│  [상단 여백 24px]                  │
│                                    │
│  ┌────────────────────────────┐   │  이미지 영역: 720 x 580px
│  │                            │   │  (전체 폭 사용, edge-to-edge)
│  │    모델 + 제품 이미지       │   │
│  │    (좌측 1/3에 모델,       │   │  Z-패턴: 좌상단 모델 얼굴 →
│  │     우측 하단에 제품)       │   │  우상단 헤드라인 오버레이 →
│  │                            │   │  좌하단 서브카피 →
│  │    ┌─────────────────┐    │   │  우하단 제품
│  │    │ 헤드라인 텍스트   │    │   │
│  │    │ (이미지 위 오버레이)│   │   │
│  │    └─────────────────┘    │   │
│  └────────────────────────────┘   │
│                                    │
│  [여백 24px]                       │
│                                    │
│  서브 카피 (2줄)                    │  폰트: 16px Regular, #6B7B8D
│  "72시간 촉촉함의 비밀..."         │
│                                    │
│  [여백 16px]                       │
│                                    │
│  ┌─[태그]──[태그]──[태그]─┐      │  인라인 배지 3개
│  │ 비타민C 15% │ 3중 히알루론산 │ 72H │  배경: #FFF9F0, 텍스트: #FF8C42
│  └─────────────────────────┘      │
│                                    │
│  [여백 24px]                       │
│  ↓ 스크롤 유도 아이콘              │  애니메이션 바운스
│  "왜 이 세럼이 다를까요?"          │  12px, #6B7B8D
└──────────────────────────────────┘
```

**헤드라인 오버레이 스타일:**
- 이미지 하단 1/3 영역에 반투명 그라데이션 오버레이 (`rgba(255,249,240,0.85)` → `transparent`)
- 텍스트: "아침마다 당기는 피부, 오후면 무너지는 메이크업" (28px, ExtraBold, #1B2A4A)
- 강조어 "당기는", "무너지는"에 `#FF8C42` 컬러 적용
- 두 번째 줄: "이제 그만." (32px, ExtraBold, #FF8C42)

### 1-3. 나노 바나나 이미지 프롬프트

**사용 모델: Nano Banana Pro** (인물 + 제품이 함께 등장하므로 고품질 모델 필요)

**프롬프트:**

```
A Korean woman in her late 20s with natural glowing skin, sitting at a modern minimalist bathroom vanity in soft morning sunlight. She is gently holding a sleek glass serum bottle with a gold dropper cap near her face, looking at the camera with a calm, confident expression. Her skin appears dewy, luminous, and healthy without heavy makeup. The bathroom has white marble surfaces, a round mirror with warm light, and a small green plant. The lighting is warm and golden from a window on the left side. Clean beauty aesthetic, editorial photography style, soft bokeh background. Shot from a slightly elevated angle. Aspect ratio 3:4, high resolution.
```

**생성 후 수정 팁:**
- 세럼 병 디자인이 원하는 브랜드 디자인과 다르면, 별도로 제품 이미지를 생성하여 합성
- 피부 톤이 과도하게 보정되어 보이면 "natural skin texture, no airbrushing" 추가
- 배경이 너무 복잡하면 "minimalist background, negative space" 강조
- 조명이 차가우면 "warm golden hour lighting, color temperature 3500K" 지정

---

## ZONE 2: 문제 증폭 (공감 심화 + 관심 유도)

### 2-1. 이미지 컨셉

**컨셉: "매일 반복되는 피부 고민의 시각화"**

타겟 페르소나가 매일 겪는 피부 고민 3가지(아침 당김, 오후 무너짐, 비싼 세럼 실패)를 아이콘 일러스트레이션으로 시각화한다. 사실적 사진보다는 감성적 플랫 일러스트 스타일을 사용하여 부정적 감정을 부드럽게 전달하되, 공감은 깊이 유발한다.

또한 "왜 지금까지의 세럼은 안 통했나"를 설명하는 간단한 비교 다이어그램(단일 히알루론산 vs 3중 히알루론산)을 포함하여, 기존 제품의 한계를 시각적으로 인식시킨다.

### 2-2. 레이아웃 가이드

```
┌──────────────────────────────────┐  720 x 960px
│  [상단 여백 48px]                  │
│                                    │
│  "혹시, 이런 고민 있으신가요?"      │  섹션 타이틀: 22px SemiBold #1B2A4A
│                                    │
│  [여백 32px]                       │
│                                    │
│  ┌────────────────────────────┐   │  페인포인트 카드 1
│  │ [아이콘]  아침마다 당기고    │   │  카드 배경: #FFF9F0
│  │          각질이 일어나는 볼  │   │  라운드: 16px
│  └────────────────────────────┘   │  아이콘: 40x40px, 좌측 배치
│  [여백 12px]                       │
│  ┌────────────────────────────┐   │  페인포인트 카드 2
│  │ [아이콘]  오후만 되면        │   │
│  │          무너지는 메이크업   │   │
│  └────────────────────────────┘   │
│  [여백 12px]                       │
│  ┌────────────────────────────┐   │  페인포인트 카드 3
│  │ [아이콘]  비싼 세럼을 써봐도 │   │
│  │          달라지지 않는 피부  │   │
│  └────────────────────────────┘   │
│                                    │
│  [여백 40px]                       │
│  ──────────── 구분선 ────────────  │  1px, #F5EDE3
│  [여백 40px]                       │
│                                    │
│  "지금까지의 세럼이                 │  22px SemiBold #1B2A4A
│   안 통한 이유"                     │  "안 통한 이유" → #FF8C42 강조
│                                    │
│  [여백 24px]                       │
│                                    │
│  ┌────────────────────────────┐   │  비교 다이어그램
│  │  일반 세럼    vs    글로우핏 │   │  좌: 회색 톤 (한계)
│  │  [단일 분자]      [3중 분자] │   │  우: 오렌지 톤 (차별성)
│  │  표피만 침투     3개 층 침투  │   │  피부 단면 일러스트
│  └────────────────────────────┘   │
│                                    │
│  [여백 32px]                       │
│  "그래서 우리는 다르게              │  16px SemiBold #1B2A4A
│   만들었습니다."                    │  전환 브릿지 카피
│  [하단 여백 48px]                  │
└──────────────────────────────────┘
```

**F-패턴 적용:** 카드형 레이아웃으로 좌측 아이콘 → 우측 텍스트 흐름. 사용자의 시선이 자연스럽게 위에서 아래로 이동.

### 2-3. 나노 바나나 이미지 프롬프트

**이미지 A: 페인포인트 아이콘 세트 (3개)**

**사용 모델: Nano Banana** (심플 일러스트이므로 기본 모델로 충분)

**프롬프트:**

```
A set of three minimalist flat illustration icons on a warm ivory background (#FFF9F0), clean vector style. Icon 1: A woman touching her dry, flaky cheek in the morning with small particles around the skin area, expressing dryness. Icon 2: A woman looking at a mirror with a melting makeup expression, showing disappointed face in the afternoon. Icon 3: A woman holding an expensive serum bottle with a confused and frustrated expression, with a money symbol fading away. Soft warm color palette with muted coral and gray tones. Simple line art with minimal shading. Each icon in a circle frame. Aspect ratio 3:1 (horizontal strip).
```

**이미지 B: 히알루론산 비교 다이어그램**

**사용 모델: Nano Banana** (다이어그램/인포그래픽 스타일)

**프롬프트:**

```
A clean scientific infographic comparing two skin cross-section diagrams side by side. Left side labeled "일반 세럼" shows a single molecule only penetrating the top layer of skin (epidermis), with gray and muted tones indicating limitation. Right side labeled "글로우핏" shows three different sized molecules (small, medium, large) penetrating three layers of skin (epidermis, middle layer, dermis) with warm orange and gold gradient colors indicating effectiveness. Arrows showing penetration depth. Clean white background, modern medical illustration style, minimal and elegant. Korean text labels. Aspect ratio 16:9.
```

**생성 후 수정 팁:**
- 아이콘이 너무 복잡하면 "flat design, no gradients, 2-3 colors only" 추가
- 한국어 텍스트가 깨지면 텍스트 없이 생성 후 별도 타이포 레이어 추가
- 다이어그램의 피부 단면이 부정확하면 "simplified anatomical cross-section" 지정
- 좌우 비교가 불균형하면 "symmetrical layout, equal sizing" 강조

---

## ZONE 3: 솔루션 + 증거 (관심 확대 + 의심 해소)

### 3-1. 이미지 컨셉

**컨셉: "과학적 신뢰와 실제 증거의 시각화"**

이 존은 가장 많은 시각 요소가 필요한 핵심 구간이다. 크게 4가지 비주얼이 필요하다:

1. **제품 히어로 숏** -- 세럼 병의 프리미엄 제품 사진 (클린 배경, 세럼 텍스처 강조)
2. **성분 인포그래픽** -- 핵심 성분 3종 (비타민C 15%, 3중 히알루론산, 72시간 보습)을 시각화
3. **인증/전문가 영역** -- 피부과 전문의 코멘트 영역 + 인증 마크
4. **후기 영역** -- 체험단 후기 카드 + 비포/애프터 + 통계 배너

전체적으로 "감성"에서 "논리"로 전환되는 구간이므로, 비주얼 톤도 감성적 사진에서 깔끔한 인포그래픽/데이터 시각화로 변화한다.

### 3-2. 레이아웃 가이드

```
┌──────────────────────────────────┐  720px 폭 (높이: 스크롤)
│  [상단 여백 48px]                  │
│                                    │
│  "글로우핏이 다른 3가지 이유"       │  섹션 타이틀: 24px Bold #1B2A4A
│                                    │  "3가지" → #FF8C42
│  [여백 32px]                       │
│                                    │
│  ┌────────────────────────────┐   │  제품 히어로 이미지
│  │                            │   │  720 x 540px (3:4 중 상단)
│  │    세럼 병 클로즈업         │   │  세럼 방울이 떨어지는 순간 캡처
│  │    + 텍스처 디테일          │   │  배경: 웜 아이보리 그라데이션
│  │                            │   │
│  └────────────────────────────┘   │
│                                    │
│  [여백 40px]                       │
│                                    │
│  ── 성분 1: 순수 비타민C 15% ────  │
│  ┌────────────────────────────┐   │  성분 카드
│  │  [아이콘]                   │   │  좌측: 비타민C 분자 아이콘 (60px)
│  │  순수 비타민C 15%           │   │  20px Bold #1B2A4A
│  │  유도체가 아닌 순수 형태로   │   │  14px Regular #6B7B8D
│  │  피부에 직접 작용합니다      │   │
│  │  ─────────────────────     │   │  구분선
│  │  [수치 강조]               │   │  "15%" → 48px Montserrat ExtraBold
│  │  15%                       │   │  #FF8C42
│  │  효능과 안전의 최적 농도     │   │
│  └────────────────────────────┘   │  카드 배경: #FFF9F0
│                                    │
│  [여백 16px]                       │
│                                    │
│  ── 성분 2: 3중 히알루론산 ────    │
│  ┌────────────────────────────┐   │  동일 카드 구조
│  │  [피부 단면 인포그래픽]      │   │  저분자/중분자/고분자
│  │  세 가지 크기의 히알루론산이  │   │  각각 피부층에 침투하는 도식
│  │  피부 3개 층을 동시에 채움   │   │  인포그래픽 높이: 200px
│  └────────────────────────────┘   │
│                                    │
│  [여백 16px]                       │
│                                    │
│  ── 성분 3: 72시간 보습 ────      │
│  ┌────────────────────────────┐   │
│  │  [타임라인 그래픽]           │   │  가로 막대 타임라인
│  │  일반 24h ────              │   │  회색 짧은 막대
│  │  경쟁 48h ──────────       │   │  회색 중간 막대
│  │  글로우핏 72h ──────────── │   │  오렌지 긴 막대 + 별표
│  └────────────────────────────┘   │
│                                    │
│  [여백 48px]                       │
│  ── 구분선 ──                      │
│  [여백 48px]                       │
│                                    │
│  "12,847명이 먼저 경험했습니다"     │  24px Bold #1B2A4A
│                                    │
│  [여백 24px]                       │
│                                    │
│  ┌──────┬──────┬──────┐         │  통계 배너 (3열 그리드)
│  │ 94%  │ 4.8  │12,847│         │  숫자: 36px Montserrat ExtraBold
│  │재구매 │ 별점  │ 판매  │         │  #FF8C42
│  │ 의사  │      │      │         │  라벨: 12px Regular #6B7B8D
│  └──────┴──────┴──────┘         │  배경: #FFF9F0, 라운드 16px
│                                    │
│  [여백 32px]                       │
│                                    │
│  ┌────────────────────────────┐   │  후기 카드 (가로 스와이프)
│  │ "3일째 아침에도 촉촉..."    │   │  카드 너비: 280px
│  │ ★★★★★  김○은, 29세        │   │  배경: 흰색, 테두리: #F5EDE3
│  │ 건성 피부 / 사용 2주차      │   │  라운드: 12px
│  └────────────────────────────┘   │  3~5개 카드 가로 스크롤
│                                    │
│  [여백 48px]                       │
│                                    │
│  ┌────────────────────────────┐   │  전문가 코멘트 카드
│  │ [의사 사진]  피부과 전문의    │   │  사진: 80x80px 원형
│  │             ○○○ 원장        │   │  배경: #FFF9F0
│  │ "순수 비타민C 15% 농도는     │   │  이탤릭 16px #1B2A4A
│  │  효능과 안전성의 최적..."    │   │
│  └────────────────────────────┘   │
│                                    │
│  [여백 24px]                       │
│                                    │
│  ┌──[인증마크]──[인증마크]──┐     │  인증 마크 가로 나열
│  │ 자극테스트  │ 무향료 │ 무색소 │  │  아이콘: 48x48px + 라벨
│  └────────────────────────────┘   │  #4ECDC4 (민트) 아이콘
│                                    │
│  [여백 24px]                       │
│                                    │
│  Q&A 아코디언                      │  접이식 FAQ 2~3개
│  "비타민C는 자극적이지 않나요?"    │  질문: 16px SemiBold
│  "민감성 피부도 사용 가능한가요?"  │  답변: 15px Regular (토글)
│                                    │
│  [하단 여백 48px]                  │
└──────────────────────────────────┘
```

### 3-3. 나노 바나나 이미지 프롬프트

**이미지 A: 제품 히어로 숏 (세럼 병 + 텍스처)**

**사용 모델: Nano Banana Pro** (제품 사진 품질이 전환율에 직접 영향)

**프롬프트:**

```
A premium skincare serum product photo. A sleek frosted glass bottle with a gold dropper cap, filled with a transparent golden-orange serum. A single drop of serum is falling from the dropper, catching the light. The bottle is placed on a white marble surface with soft reflections. Behind the bottle, there are thin slices of fresh orange and small hyaluronic acid-inspired water droplets scattered artistically. Warm studio lighting from the upper left with soft shadows. Background is a warm cream-to-white gradient. Clean, luxurious, editorial beauty product photography. Shot at eye level, slightly angled. Aspect ratio 4:3.
```

**이미지 B: 성분 인포그래픽 (3종)**

**사용 모델: Nano Banana** (다이어그램 스타일로 기본 모델 적합)

**프롬프트:**

```
A clean modern infographic showing three key skincare ingredients in a horizontal layout. Left section: A bright orange vitamin C molecule icon with "15%" text, glowing with energy. Center section: Three concentric circles in different sizes (small, medium, large) representing triple hyaluronic acid molecules, in blue-to-orange gradient. Right section: A clock/timer icon showing "72H" with water droplets around it representing long-lasting hydration. White background, flat design with subtle shadows, modern pharmaceutical/beauty brand aesthetic. Warm orange and gold accent colors. Aspect ratio 16:9.
```

**이미지 C: 전문가 영역 배경**

**사용 모델: Nano Banana** (배경 텍스처 이미지)

**프롬프트:**

```
A subtle abstract background texture for a skincare product page. Soft watercolor-like blend of warm ivory, light peach, and pale gold colors. Very minimal, almost white with the faintest warm color variations. A thin gold line or subtle molecular structure pattern barely visible. Clean, clinical yet warm aesthetic suitable for a dermatologist recommendation section. No text, no objects. Aspect ratio 16:9.
```

**생성 후 수정 팁:**
- 제품 숏에서 세럼 색상이 너무 진하면 "pale golden, almost transparent with slight yellow tint" 지정
- 세럼 병의 형태를 특정하고 싶으면 "cylindrical bottle, 30ml, minimalist sans-serif label" 추가
- 인포그래픽 내 텍스트가 정확하지 않으면 텍스트 없이 생성 후 별도 레이어로 추가
- 후기 영역은 이미지 생성보다 실제 후기 캡처 + 디자인 템플릿 활용을 권장

---

## ZONE 4: 가격 + 비교 (욕구 점화)

### 4-1. 이미지 컨셉

**컨셉: "시각적 가격 앵커링과 가치 비교"**

이 존은 비주얼보다 데이터 시각화(차트, 비교표)가 중심이다. 경쟁 제품과의 비교를 시각적으로 명확하게 보여주고, 3단 가격 앵커링이 자연스럽게 눈에 들어오도록 설계한다. "이 가격에 이 성분은 기회"라는 결론을 시각적으로 유도하는 것이 핵심이다.

감성적 전환을 위해 "사용 시나리오 타임라인" (월~목 보습 유지 시각화)도 포함하여, 소유 효과를 자극한다.

### 4-2. 레이아웃 가이드

```
┌──────────────────────────────────┐  720px 폭
│  [상단 여백 48px]                  │
│                                    │
│  "같은 성분, 반값의 가격"           │  24px Bold #1B2A4A
│                                    │  "반값" → #FF8C42
│  [여백 32px]                       │
│                                    │
│  ┌────────────────────────────┐   │  경쟁 비교 차트
│  │                            │   │  3열 비교 테이블
│  │  경쟁A    글로우핏    경쟁B  │   │  글로우핏 열: 오렌지 배경 강조
│  │  (고가)   ★BEST★   (저가) │   │  BEST 배지: #FF8C42
│  │                            │   │
│  │  비타민C  비타민C   비타민C  │   │  글로우핏 셀만 볼드+컬러
│  │  10%     15% ★    유도체   │   │
│  │                            │   │
│  │  단일HA   3중HA ★  단일HA  │   │
│  │                            │   │
│  │  48시간   72시간 ★  24시간  │   │
│  │                            │   │
│  │  67,000   39,800   28,000  │   │  가격 행: 글로우핏 가격을
│  │   원       원 ★     원     │   │  가장 크게 (24px Bold #FF8C42)
│  └────────────────────────────┘   │  배경: #FFF9F0, 라운드 16px
│                                    │
│  [여백 48px]                       │
│                                    │
│  ┌────────────────────────────┐   │  가격 앵커링 블록
│  │  백화점 비타민C 세럼 평균    │   │  15px Regular #6B7B8D
│  │       67,000원              │   │  20px Regular #6B7B8D
│  │                            │   │
│  │  정가  ̶5̶8̶,̶0̶0̶0̶원̶          │   │  20px Regular 취소선 #6B7B8D
│  │                            │   │
│  │  런칭 특가                   │   │  14px SemiBold #FF8C42
│  │  39,800원                   │   │  48px ExtraBold #FF8C42
│  │                            │   │
│  │  ▼ 31% OFF                 │   │  배지: #E85D5D 배경
│  │                            │   │
│  │  하루 663원                  │   │  16px SemiBold #1B2A4A
│  │  커피 한 잔 값으로            │   │  14px Regular #6B7B8D
│  │  3일의 촉촉함                │   │
│  └────────────────────────────┘   │  배경: 흰색, 테두리: #FFD166
│                                    │  테두리 2px, 라운드 16px
│  [여백 48px]                       │
│                                    │
│  ── 사용 시나리오 타임라인 ──       │
│  ┌────────────────────────────┐   │  가로 타임라인 그래픽
│  │ 월(저녁) → 화(아침) →       │   │  아이콘 + 짧은 텍스트
│  │ 수(아침) → 목(아침)          │   │  각 날: 물방울 아이콘
│  │ "바른다" "촉촉" "여전히" "다시"│  │  보습 유지 바: 오렌지 그라데이션
│  └────────────────────────────┘   │
│                                    │
│  [여백 40px]                       │
│                                    │
│  옵션 선택                          │
│  ┌──────────────────────────┐     │  옵션 카드 (세로 나열)
│  │ ○ 1개  39,800원           │     │  기본 카드
│  └──────────────────────────┘     │
│  ┌══════════════════════════┐     │  추천 카드 (두꺼운 테두리)
│  ║ ◉ 2+1 세트  79,600원     ║     │  테두리: 2px #FF8C42
│  ║   [BEST] 1개 무료!       ║     │  BEST 배지: #FF8C42 배경
│  └══════════════════════════┘     │  약간 더 큰 카드
│  ┌──────────────────────────┐     │
│  │ ○ 정기배송  35,800원/월   │     │  기본 카드
│  └──────────────────────────┘     │
│                                    │
│  [하단 여백 48px]                  │
└──────────────────────────────────┘
```

### 4-3. 나노 바나나 이미지 프롬프트

**이미지 A: 사용 시나리오 타임라인 일러스트**

**사용 모델: Nano Banana** (심플 일러스트로 기본 모델 적합)

**프롬프트:**

```
A horizontal timeline infographic illustration showing 4 days of skincare routine. Day 1 (Monday evening): A woman applying serum drops to her face, warm orange glow. Day 2 (Tuesday morning): The same woman waking up with dewy glowing skin, small water droplets around her face. Day 3 (Wednesday morning): She looks in the mirror happily, skin still looking hydrated and fresh. Day 4 (Thursday morning): She applies serum again with a satisfied smile. Connected by a dotted line with small water drop icons between each day. Flat illustration style, warm color palette with orange, gold, and cream tones. Minimal and charming. White background. Aspect ratio 2:1 (wide horizontal).
```

**이미지 B: 가격 비교 비주얼 배경**

**사용 모델: Nano Banana** (심플 배경 이미지)

**프롬프트:**

```
An abstract minimal background for a pricing section of a beauty product page. Soft gradient from warm cream (#FFF9F0) to white, with very subtle golden sparkle particles scattered lightly. A thin elegant gold border frame suggestion at the edges. Premium, luxurious, yet clean feel. No text, no objects, just texture and color. Aspect ratio 3:4.
```

**생성 후 수정 팁:**
- 타임라인 일러스트에서 인물 표현이 일관되지 않으면 "same character design across all 4 frames" 강조
- 가격 비교 차트는 이미지 생성보다 직접 디자인 툴로 제작 권장 (정확한 수치 표현 필요)
- 타임라인이 너무 복잡하면 "4 simple circular icons connected by a line" 으로 단순화
- 일러스트 캐릭터가 동양인으로 보이지 않으면 "East Asian woman, Korean style illustration" 추가

---

## ZONE 5: CTA + 긴급성 (망설임 타파)

### 5-1. 이미지 컨셉

**컨셉: "지금이 아니면 놓치는 기회"**

이 존은 이미지보다 UI/UX 디자인 요소가 핵심이다. 카운트다운 타이머, 잔여 수량 바, CTA 버튼 등의 인터랙티브 요소가 중심이며, 배경 비주얼은 긴박감과 프리미엄 느낌을 동시에 전달해야 한다.

제품 이미지를 작게 다시 한번 보여주어 "내가 사려는 것"을 시각적으로 확인시키고, CTA 버튼은 화면 내에서 가장 눈에 띄는 요소로 설계한다.

### 5-2. 레이아웃 가이드

```
┌──────────────────────────────────┐  720px 폭
│  배경: #1B2A4A (딥 네이비)         │  이 섹션만 다크 배경으로
│  [상단 여백 48px]                  │  전환 — 시각적 "이벤트"감 연출
│                                    │
│  ┌────────────────────────────┐   │
│  │  "런칭 특가가 곧 끝납니다"   │   │  24px Bold #FFFFFF
│  │                            │   │
│  │  ┌──────────────────────┐ │   │  카운트다운 타이머
│  │  │  23 : 59 : 59        │ │   │  각 숫자: 40px Montserrat
│  │  │  시간   분    초      │ │   │  ExtraBold #FFD166
│  │  └──────────────────────┘ │   │  배경: rgba(255,255,255,0.1)
│  │                            │   │  라운드: 12px
│  └────────────────────────────┘   │
│                                    │
│  [여백 24px]                       │
│                                    │
│  ┌────────────────────────────┐   │  잔여 수량 프로그레스 바
│  │  한정 3,000개               │   │  14px SemiBold #FFFFFF
│  │  ████████████░░░░ 847개 남음│   │  바: #FF8C42 → #FFD166 그라데이션
│  │                            │   │  남은 부분: rgba(255,255,255,0.2)
│  └────────────────────────────┘   │
│                                    │
│  [여백 32px]                       │
│                                    │
│  ┌────────────────────────────┐   │  제품 미니 카드
│  │ [제품 이미지  │  글로우핏    │   │  제품 이미지: 120x120px
│  │  120x120]    │  하이드라    │   │  흰색 배경 원형 프레임
│  │              │  비타 세럼   │   │  제품명: 16px Bold #FFFFFF
│  │              │             │   │
│  │              │  ̶5̶8̶,̶0̶0̶0̶원̶  │   │  취소선 가격: 14px #6B7B8D
│  │              │  39,800원   │   │  할인가: 28px ExtraBold #FFD166
│  └────────────────────────────┘   │  배경: rgba(255,255,255,0.05)
│                                    │
│  [여백 24px]                       │
│                                    │
│  "지금 놓치면 정가 58,000원에      │  14px Regular #E85D5D
│   구매하셔야 합니다"               │  손실 회피 카피
│                                    │
│  [여백 24px]                       │
│                                    │
│  ┌════════════════════════════┐   │  CTA 버튼
│  ║                            ║   │  높이: 60px
│  ║   런칭 특가로 시작하기       ║   │  20px Bold #FFFFFF
│  ║                            ║   │  배경: #FF8C42 → #FF7528
│  └════════════════════════════┘   │  그라데이션, 라운드: 30px
│                                    │  그림자: 0 4px 16px rgba(255,140,66,0.4)
│  [여백 12px]                       │
│                                    │
│  "지금 주문하면 내일 도착 |         │  12px Regular #6B7B8D
│   선착순 미니 사이즈 증정"         │
│                                    │
│  [하단 여백 48px]                  │
└──────────────────────────────────┘
```

**디자인 포인트:**
- 이 섹션만 다크 네이비 배경을 사용하여 상세페이지 스크롤 중 **시각적 전환**을 만든다
- CTA 버튼에 미세한 펄스 애니메이션 (scale 1.0 → 1.02 반복) 적용
- 카운트다운 숫자에 플립 애니메이션 적용 권장

### 5-3. 나노 바나나 이미지 프롬프트

**이미지 A: CTA 섹션 배경 텍스처**

**사용 모델: Nano Banana** (배경 텍스처이므로 기본 모델 충분)

**프롬프트:**

```
A dark navy blue (#1B2A4A) abstract luxury background texture. Subtle golden light particles and bokeh floating in the dark background, creating a premium and exclusive atmosphere. Very subtle warm orange light gradients at the edges. Think luxury cosmetics brand campaign aesthetic. Elegant, sophisticated, minimal. No objects, no text. Dark moody lighting. Aspect ratio 3:4.
```

**이미지 B: 제품 미니 카드용 제품 컷아웃**

**사용 모델: Nano Banana Pro** (제품 사진 품질 중요)

**프롬프트:**

```
A single premium skincare serum bottle product shot on a pure white background. Frosted glass bottle with gold dropper cap, filled with transparent golden-orange serum liquid. Clean product photography, centered, studio lighting with soft diffused light from all sides for minimal shadows. The bottle has a minimalist label with elegant typography. Photorealistic, high resolution, perfect for e-commerce product cutout. Aspect ratio 1:1 (square).
```

**생성 후 수정 팁:**
- 다크 배경 텍스처가 너무 어두우면 "slightly lighter navy, visible subtle texture" 조정
- 골드 파티클이 과하면 "very sparse, 10-15 small bokeh dots only" 지정
- 제품 컷아웃에서 배경 제거가 필요하면 Gemini의 배경 제거 기능 또는 별도 툴 활용
- CTA 버튼과 타이머 등은 이미지가 아닌 실제 HTML/CSS로 구현해야 함 (인터랙티브 요소)

---

## ZONE 6: 안심 + 보증 (불안 해소)

### 6-1. 이미지 컨셉

**컨셉: "안심하고 시작하세요"**

결제 직전의 마지막 불안을 제거하는 구간이다. 비주얼 톤은 다시 밝고 따뜻한 톤으로 돌아오며, 신뢰감을 주는 아이콘과 배지 중심으로 구성한다. 과도한 이미지보다 명확한 정보 전달이 핵심이다.

환불 보증 배지는 가장 중요한 비주얼 요소로, "방패/실드" 모양 안에 환불 보증 내용을 담아 시각적 안심감을 준다.

### 6-2. 레이아웃 가이드

```
┌──────────────────────────────────┐  720px 폭
│  배경: #FFFFFF (화이트 복귀)        │  다크에서 다시 밝은 톤으로
│  [상단 여백 48px]                  │
│                                    │
│  ┌────────────────────────────┐   │  환불 보증 카드 (가장 중요)
│  │                            │   │  배경: #FFF9F0
│  │     [방패 아이콘 80px]      │   │  방패 아이콘: #4ECDC4
│  │                            │   │
│  │  14일 100% 환불 보장        │   │  22px Bold #1B2A4A
│  │                            │   │
│  │  사용 후 만족하지 않으시면    │   │  15px Regular #6B7B8D
│  │  100% 환불해 드립니다.      │   │
│  │  반송비도 저희가 부담합니다.  │   │
│  │                            │   │
│  │  환불 요청률 0.8%           │   │  14px SemiBold #FF8C42
│  │  (대부분의 고객이 만족)      │   │  12px Regular #6B7B8D
│  └────────────────────────────┘   │  테두리: 2px #4ECDC4
│                                    │  라운드: 16px
│  [여백 32px]                       │
│                                    │
│  ┌────────────────────────────┐   │  안심 체크리스트
│  │  [v] 무료 배송              │   │  각 행: 48px 높이
│  │  ────────────────────      │   │  체크 아이콘: #4ECDC4, 24px
│  │  [v] 14일 환불 보장          │   │  텍스트: 16px Regular #1B2A4A
│  │  ────────────────────      │   │  구분선: 1px #F5EDE3
│  │  [v] 당일 발송              │   │
│  │  ────────────────────      │   │
│  │  [v] 안전 포장              │   │
│  │  ────────────────────      │   │
│  │  [v] 개인정보 암호화 결제    │   │
│  └────────────────────────────┘   │  배경: 흰색, 라운드: 16px
│                                    │
│  [여백 32px]                       │
│                                    │
│  ┌────────────────────────────┐   │  결제 수단 로고
│  │  [카카오] [네이버] [신용카드] │   │  각 로고: 48x30px
│  │  [무통장] [토스]             │   │  회색 톤 (과도한 색상 방지)
│  └────────────────────────────┘   │  가운데 정렬
│                                    │
│  [여백 40px]                       │
│                                    │
│  "마음에 안 들면 돌려보내세요.      │  16px SemiBold #1B2A4A
│   비용은 저희가 부담합니다."       │  가운데 정렬
│                                    │
│  [여백 24px]                       │
│                                    │
│  ┌════════════════════════════┐   │  최종 CTA 버튼 (반복)
│  ║                            ║   │  ZONE 5와 동일한 디자인
│  ║   런칭 특가로 시작하기       ║   │  다만 배경이 밝으므로
│  ║                            ║   │  버튼이 더 돋보임
│  └════════════════════════════┘   │
│                                    │
│  [여백 12px]                       │
│                                    │
│  "지금 주문하면 내일 도착"          │  12px Regular #6B7B8D
│                                    │
│  [하단 여백 80px]                  │  하단 충분한 여백
└──────────────────────────────────┘
```

### 6-3. 나노 바나나 이미지 프롬프트

**이미지 A: 환불 보증 방패 아이콘**

**사용 모델: Nano Banana** (아이콘이므로 기본 모델 충분)

**프롬프트:**

```
A single shield icon design for a money-back guarantee badge. The shield shape is modern and rounded, filled with a mint green (#4ECDC4) gradient. Inside the shield, a simple checkmark symbol in white. A small circular "100%" text element overlapping the bottom right of the shield in warm gold (#E8B84B). Clean flat design style with a very subtle long shadow. Centered on a pure white background. No other elements. Aspect ratio 1:1 (square).
```

**이미지 B: 안심 아이콘 세트 (5개)**

**사용 모델: Nano Banana** (심플 아이콘 세트)

**프롬프트:**

```
A set of five minimalist line icons in a horizontal row on a white background, each in a light mint green (#4ECDC4) color. From left to right: 1) A delivery truck icon for free shipping. 2) A shield with checkmark for refund guarantee. 3) A clock with arrow for same-day dispatch. 4) A package box with heart for safe packaging. 5) A lock icon for secure payment. Consistent line weight (2px), modern rounded style, same size. Simple and trustworthy. Aspect ratio 5:1 (wide horizontal strip).
```

**생성 후 수정 팁:**
- 방패 아이콘이 너무 3D적이면 "completely flat design, no perspective, no 3D effects" 추가
- 아이콘 스타일 통일이 안 되면 "consistent stroke width, same corner radius, unified design language" 강조
- 결제 수단 로고는 각 플랫폼의 공식 로고를 사용해야 하므로 생성하지 말고 공식 리소스 활용
- 한국어 텍스트는 이미지에 포함시키지 말고 별도 텍스트 레이어로 처리

---

## 이미지 생성 순서 추천

효율적인 작업 흐름을 위해 아래 순서로 이미지를 생성하는 것을 권장한다.

### Phase 1: 핵심 제품 이미지 (먼저 생성하여 전체 톤 앵커 확보)

| 순서 | 이미지 | ZONE | 모델 | 이유 |
|------|--------|------|------|------|
| 1 | 제품 히어로 숏 (세럼 병 + 텍스처) | ZONE 3 | Pro | 제품의 비주얼 톤을 결정하는 앵커 이미지. 이 이미지의 색감과 스타일이 나머지 모든 이미지의 기준이 된다. |
| 2 | 제품 컷아웃 (1:1 정방형) | ZONE 5 | Pro | 히어로 숏과 동일한 세럼 병을 다른 앵글로. Phase 1에서 제품 디자인을 확정한다. |

### Phase 2: 인물 이미지

| 순서 | 이미지 | ZONE | 모델 | 이유 |
|------|--------|------|------|------|
| 3 | 히어로 메인 비주얼 (모델 + 제품) | ZONE 1 | Pro | 제품 이미지 톤이 확정된 후, 인물과 함께 촬영한 느낌으로 생성. |

### Phase 3: 일러스트 & 인포그래픽

| 순서 | 이미지 | ZONE | 모델 | 이유 |
|------|--------|------|------|------|
| 4 | 페인포인트 아이콘 세트 (3개) | ZONE 2 | 기본 | 일러스트 스타일 확정. |
| 5 | 히알루론산 비교 다이어그램 | ZONE 2 | 기본 | 인포그래픽 스타일 확정. |
| 6 | 성분 인포그래픽 (3종) | ZONE 3 | 기본 | 동일 인포그래픽 스타일로 통일. |
| 7 | 사용 시나리오 타임라인 | ZONE 4 | 기본 | 일러스트 스타일을 Phase 3에서 통일. |

### Phase 4: 배경 & 아이콘

| 순서 | 이미지 | ZONE | 모델 | 이유 |
|------|--------|------|------|------|
| 8 | CTA 다크 배경 텍스처 | ZONE 5 | 기본 | 배경이므로 마지막에 생성해도 무방. |
| 9 | 전문가 영역 배경 | ZONE 3 | 기본 | 배경 텍스처. |
| 10 | 환불 보증 방패 아이콘 | ZONE 6 | 기본 | 아이콘. |
| 11 | 안심 아이콘 세트 (5개) | ZONE 6 | 기본 | 아이콘 세트. |
| 12 | 가격 섹션 배경 | ZONE 4 | 기본 | 배경 텍스처. |

---

## 나노 바나나 사용 주의사항

### 모델 선택 기준

| 기준 | Nano Banana (기본) | Nano Banana Pro |
|------|-------------------|-----------------|
| **적합한 용도** | 일러스트, 아이콘, 인포그래픽, 배경 텍스처, 패턴 | 제품 사진, 인물 사진, 사실적 이미지 |
| **강점** | 빠른 생성, 일관된 스타일, 단순한 구성 | 높은 디테일, 사실적 질감, 조명 표현 |
| **약점** | 사실적 표현 한계, 디테일 부족 | 생성 시간 길음, 프롬프트 민감도 높음 |
| **이 프로젝트 사용** | ZONE 2, 3(인포그래픽), 4, 5(배경), 6 | ZONE 1(메인), 3(제품 숏), 5(제품 컷) |

### 프롬프트 작성 팁

1. **구체적 수치 사용**: "warm lighting"보다 "warm lighting from upper left at 45 degrees, color temperature 3500K"
2. **비율 명시**: 항상 "Aspect ratio X:Y" 포함. 이 프로젝트는 주로 3:4 (세로), 16:9 (가로 배너), 1:1 (정방형)
3. **색상 코드 포함**: 브랜드 컬러를 HEX 코드로 직접 지정 (예: "#FF8C42 warm orange accent")
4. **네거티브 프롬프트 활용**: 원치 않는 요소를 명시적으로 배제 ("no text, no watermark, no border")
5. **스타일 레퍼런스**: "editorial beauty photography", "flat vector illustration", "modern infographic design" 등 명확한 스타일 키워드
6. **배경 단순화**: 제품/인물 이미지는 "clean background", "negative space" 강조하여 텍스트 배치 공간 확보

### 한국어 텍스트 처리

- **절대 이미지 안에 한국어 텍스트를 생성하지 말 것** -- AI 이미지 생성 모델은 한국어 텍스트를 정확히 렌더링하지 못함
- 모든 텍스트는 이미지 생성 후 별도 레이어(Figma, Photoshop, Canva 등)로 추가
- 영문 텍스트(숫자 포함)도 가급적 별도 레이어로 추가하는 것이 정확도 높음
- 프롬프트에서 텍스트 위치가 들어갈 자리는 "blank space for text overlay" 등으로 표현

### 생성 품질 관리

1. **일관성 유지**: 동일 카테고리(예: 아이콘 세트) 이미지는 한 번에 요청하여 스타일 통일
2. **반복 생성**: 1개 프롬프트당 최소 3~4회 생성 후 가장 적합한 이미지 선택
3. **시드 고정**: 마음에 드는 이미지가 나왔으면 해당 시드를 기록하여 유사 이미지 추가 생성 시 활용
4. **후보정 필수**: AI 생성 이미지는 그대로 사용하지 말고, 밝기/대비/색상 보정 + 브랜드 컬러 매칭 진행
5. **해상도 확인**: 최소 1440px(720px의 2배, 레티나 대응) 이상으로 생성. 부족 시 업스케일링 도구 활용

### 자주 발생하는 문제와 해결법

| 문제 | 원인 | 해결법 |
|------|------|--------|
| 세럼 병 디자인이 매번 다름 | AI가 매 생성마다 다른 디자인 | 한 번 확정된 이미지를 참조 이미지로 활용, 또는 상세한 병 형태 묘사 추가 |
| 인물 피부가 과도하게 보정됨 | AI의 뷰티 사진 학습 편향 | "natural skin texture, visible pores, no excessive retouching" 추가 |
| 인포그래픽 내용이 부정확 | AI가 데이터 시각화에 약함 | 텍스트/수치 없이 레이아웃만 생성 후 직접 텍스트 추가 |
| 배경이 너무 복잡 | 프롬프트 내 요소가 많음 | 배경 프롬프트를 분리하여 "minimal, clean, mostly white" 강조 |
| 동양인 인물이 서양인처럼 보임 | AI의 학습 데이터 편향 | "Korean woman", "East Asian features", "K-beauty aesthetic" 명시 |
| 색상이 브랜드 컬러와 안 맞음 | AI가 HEX 코드를 정확히 반영 못 함 | 생성 후 Photoshop/Figma에서 색상 보정. 또는 "orange similar to tangerine" 등 자연어 보완 |

---

## 전체 페이지 흐름 요약

```
ZONE 1: 히어로          → 감성적 첫인상 (사진 중심)
   ↓ [시선 멈춤 3초]
ZONE 2: 문제 증폭       → 공감 유발 (일러스트 + 텍스트)
   ↓ [스크롤 유도]
ZONE 3: 솔루션 + 증거   → 논리적 확신 (인포그래픽 + 제품 사진 + 후기)
   ↓ [관심 → 신뢰]
ZONE 4: 가격 + 비교     → 가치 인식 (데이터 시각화 + 타임라인)
   ↓ [욕구 점화]
ZONE 5: CTA + 긴급성    → 행동 촉발 (다크 UI + 카운트다운)
   ↓ [구매 결정]
ZONE 6: 안심 + 보증     → 불안 제거 (아이콘 + 보증 배지)
   ↓ [최종 전환]
```

**비주얼 톤 변화:**
- ZONE 1~2: 따뜻하고 감성적 (사진 + 일러스트, 웜 아이보리 배경)
- ZONE 3: 깔끔하고 과학적 (인포그래픽, 화이트 배경)
- ZONE 4: 데이터 중심 + 감성 회복 (차트 + 타임라인)
- ZONE 5: 다크/프리미엄/긴급 (다크 네이비 배경, 골드 강조)
- ZONE 6: 다시 밝고 안심 (화이트 배경, 민트 그린 포인트)

---

*본 비주얼 가이드는 전략 브리프(01_strategy_brief.md)와 심리 트리거 맵(02_psychology_map.md)을 기반으로 설계되었으며, 이후 상세페이지 제작 시 디자인 실행 가이드로 활용됩니다.*
