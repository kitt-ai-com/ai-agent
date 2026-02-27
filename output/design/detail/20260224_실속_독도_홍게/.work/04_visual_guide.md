# 비주얼 가이드 & 나노 바나나 프롬프트: 가성비 폭발! 실속 독도 홍게

> 작성일: 2026-02-24
> 기반 문서: 01_strategy_brief.md, 02_psychology_map.md
> 문서 목적: 상세페이지 6개 ZONE별 비주얼 레이아웃 설계 및 AI 이미지 생성 프롬프트 제공
> 기준 해상도: 가로 720px / 가로세로 비율 3:4 (720 x 960px)
> 설계 원칙: 모바일 퍼스트 / F-패턴 & Z-패턴 시선 흐름 / 스크롤 유도 전환 극대화

---

## 0. 통합 디자인 시스템

### 0-1. 브랜드 컬러 팔레트

| 용도 | 컬러명 | HEX 코드 | RGB | 적용 영역 |
|------|--------|:---------:|-----|-----------|
| **주조색 (Primary)** | 딥 오션 블루 | `#1B3A5C` | 27, 58, 92 | 배경, 헤더, 신뢰 섹션, 배지 테두리 |
| **보조색 (Secondary)** | 홍게 레드 | `#D94032` | 217, 64, 50 | 가격 강조, CTA 버튼, 할인 배지, 핵심 수치 |
| **보조색 밝은톤** | 라이트 코랄 | `#F26B5E` | 242, 107, 94 | 호버 상태, 보조 강조, 그라데이션 끝 |
| **액센트 (Accent)** | 골드 옐로우 | `#F2A922` | 242, 169, 34 | 별점, BEST 배지, 포인트 강조, 시즌 한정 배지 |
| **배경 (Background)** | 크림 화이트 | `#FDF8F0` | 253, 248, 240 | 본문 배경, 카드 배경, 여백 |
| **배경 보조** | 소프트 블루그레이 | `#F0F4F8` | 240, 244, 248 | 섹션 교차 배경, 비교표 배경 |
| **텍스트 (Text)** | 차콜 그레이 | `#2D2D2D` | 45, 45, 45 | 본문 텍스트, 헤드라인 |
| **서브 텍스트** | 미디엄 그레이 | `#7A7A7A` | 122, 122, 122 | 부가 설명, 취소선 정가, 캡션 |
| **화이트** | 퓨어 화이트 | `#FFFFFF` | 255, 255, 255 | CTA 버튼 텍스트, 배지 내 텍스트, 히어로 오버레이 텍스트 |
| **바다색 (Sea)** | 청정 해역 블루 | `#2E86AB` | 46, 134, 171 | 원산지 관련 요소, 독도 배경, 신선도 강조 |

**컬러 사용 비율 가이드:**
- 주조색(딥 오션 블루) : 보조색(홍게 레드) : 액센트(골드) = 60 : 25 : 15
- 배경 영역은 크림 화이트와 소프트 블루그레이를 섹션별 교차 적용

### 0-2. 타이포그래피 통합 가이드

| 용도 | 폰트 | 크기 | 굵기 | 행간 | 자간 | 색상 |
|------|------|:----:|:----:|:----:|:----:|------|
| **히어로 헤드라인** | Pretendard | 32px | ExtraBold (800) | 140% | -0.5px | `#FFFFFF` (히어로 오버레이) |
| **섹션 타이틀** | Pretendard | 24px | Bold (700) | 150% | -0.3px | `#2D2D2D` |
| **서브 헤드라인** | Pretendard | 20px | SemiBold (600) | 160% | 0px | `#2D2D2D` |
| **본문** | Pretendard | 16px | Regular (400) | 170% | 0.2px | `#2D2D2D` |
| **보조 설명** | Pretendard | 14px | Regular (400) | 170% | 0.2px | `#7A7A7A` |
| **최소 텍스트** | Pretendard | 13px | Regular (400) | 160% | 0.3px | `#7A7A7A` |
| **가격 (할인가)** | Pretendard | 40px | ExtraBold (800) | 100% | -1px | `#D94032` |
| **가격 (정가)** | Pretendard | 18px | Regular (400) | 100% | 0px | `#7A7A7A` + 취소선 |
| **CTA 버튼 텍스트** | Pretendard | 20px | Bold (700) | 100% | 0.5px | `#FFFFFF` |
| **배지 텍스트** | Pretendard | 13px | Bold (700) | 100% | 0.5px | `#FFFFFF` |
| **강조 수치** | Pretendard | 28px | ExtraBold (800) | 100% | -0.5px | `#D94032` 또는 `#F2A922` |

**타이포그래피 원칙:**
- 한 화면(960px 높이) 내 폰트 크기는 최대 3종류까지만 사용
- 행간은 최소 160%, 본문은 170% 유지
- 강조는 색상 변경 > 볼드 > 크기 증가 순서로 우선 적용
- 밑줄 강조는 사용하지 않음 (링크와 혼동 방지)

### 0-3. 공통 레이아웃 규칙

| 규칙 | 수치 | 비고 |
|------|:----:|------|
| 캔버스 너비 | 720px | 모바일 상세페이지 기준 |
| 캔버스 높이 (1장) | 960px | 3:4 비율 |
| 좌우 패딩 | 32px | 텍스트 영역 양쪽 여백 |
| 콘텐츠 영역 너비 | 656px | 720 - 32*2 |
| 섹션 간 간격 | 48px | 주요 섹션 사이 |
| 요소 간 간격 (대) | 24px | 타이틀과 본문 사이 |
| 요소 간 간격 (소) | 12px | 본문과 본문 사이 |
| 카드 라운드 | 12px | 카드형 요소 모서리 |
| 버튼 라운드 | 8px | CTA, 선택 버튼 |
| 배지 라운드 | 20px | 원형에 가까운 캡슐형 |
| 그림자 (카드) | 0 2px 8px rgba(0,0,0,0.08) | 은은한 부유감 |
| 그림자 (CTA) | 0 4px 12px rgba(217,64,50,0.3) | 홍게 레드 기반 |

---

## ZONE 1: 시선 강탈 (0~10%) -- "3초 안에 스크롤을 멈춰라"

### 1-1. 이미지 컨셉 설명

**컨셉: "독도 바다에서 갓 올라온 붉은 보물"**

김이 모락모락 피어오르는 갓 찐 홍게가 나무 도마 위에 풍성하게 쌓여 있는 장면. 배경에는 은은하게 맥주잔과 레몬 슬라이스, 초장 종지가 배치되어 "먹고 싶다"는 본능적 반응을 자극한다. 따뜻한 텅스텐 조명이 홍게의 붉은 색감을 극대화하고, 김(스팀)이 신선도와 갓 조리한 느낌을 전달한다.

시선 흐름은 Z-패턴: 좌상단 "독도 홍게" 텍스트 -> 우상단 "16% OFF" 배지 -> 좌하단 홍게 이미지 중심부 -> 우하단 "15,900원" 가격으로 자연스럽게 이동하도록 설계한다.

**핵심 감정 유발:** 식욕 자극 + 인지적 불일치("이 가격이 진짜?")

### 1-2. 레이아웃 가이드

```
┌─────────────────────────────────────────────────────────────────┐
│                        720px x 960px                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  [Z-패턴 시선 흐름]                                        │  │
│  │                                                           │  │
│  │  ① 좌상단 ─────────────────────────── ② 우상단            │  │
│  │  "실속 독도 홍게"                       ┌──────────┐       │  │
│  │   Pretendard 20px SemiBold             │ 16% OFF  │       │  │
│  │   #FFFFFF                              │ 배지     │       │  │
│  │   text-shadow: 0 2px 4px               │ 48x28px  │       │  │
│  │   rgba(0,0,0,0.5)                      │ #D94032  │       │  │
│  │                                        │ 라운드20 │       │  │
│  │             ╲                          └──────────┘       │  │
│  │              ╲                          ╱                  │  │
│  │               ╲      [히어로 이미지]    ╱                   │  │
│  │                ╲     김이 나는 찐 홍게 ╱                    │  │
│  │                 ╲    나무 도마 위     ╱                     │  │
│  │                  ╲   풍성한 홍게    ╱                      │  │
│  │                   ╲              ╱                         │  │
│  │                    ╲            ╱                          │  │
│  │                     ╲          ╱                           │  │
│  │  ③ 좌하단 ─────────────────────────── ④ 우하단            │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │          [하단 그라데이션 오버레이 영역]               │  │  │
│  │  │          rgba(0,0,0,0) → rgba(0,0,0,0.7)            │  │  │
│  │  │          높이: 320px (이미지 하단 1/3)                │  │  │
│  │  │                                                     │  │  │
│  │  │  "독도 바다가 키운                                    │  │  │
│  │  │   꽉 찬 홍게살"              y: 720px                 │  │  │
│  │  │   Pretendard 32px ExtraBold                         │  │  │
│  │  │   #FFFFFF                                           │  │  │
│  │  │   text-shadow: 0 2px 8px rgba(0,0,0,0.6)           │  │  │
│  │  │                                                     │  │  │
│  │  │  정가 ~~19,000원~~           y: 780px                │  │  │
│  │  │  Pretendard 18px Regular #7A7A7A 취소선              │  │  │
│  │  │                                                     │  │  │
│  │  │  15,900원                    y: 810px                │  │  │
│  │  │  Pretendard 40px ExtraBold #FFFFFF                  │  │  │
│  │  │  (배경: 반투명 홍게레드 필 rgba(217,64,50,0.85))      │  │  │
│  │  │  패딩: 8px 20px / 라운드: 8px                        │  │  │
│  │  │                                                     │  │  │
│  │  │  ┌────────┐ ┌────────┐ ┌──────────┐  y: 880px      │  │  │
│  │  │  │무료배송 │ │평점 5.0│ │국내산100%│               │  │  │
│  │  │  │ 배지   │ │ 배지   │ │  배지    │               │  │  │
│  │  │  │120x32  │ │120x32  │ │ 130x32  │               │  │  │
│  │  │  └────────┘ └────────┘ └──────────┘               │  │  │
│  │  │  각 배지: #FFFFFF bg, rgba 반투명, 라운드20px         │  │  │
│  │  │  Pretendard 13px Bold #FFFFFF                       │  │  │
│  │  │  배지 간격: 8px                                      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 920px 하단 여백 40px                                         │
└─────────────────────────────────────────────────────────────────┘
```

**상세 명세:**
- 히어로 이미지: 720x960px 전체 영역 (배경 이미지로 사용)
- 하단 그라데이션 오버레이: 높이 320px, `linear-gradient(transparent, rgba(0,0,0,0.7))`
- 할인 배지("16% OFF"): 우상단 기준 right 32px, top 32px / 배경 `#D94032` / 패딩 6px 14px
- 핵심 카피: 좌측 정렬, left 32px 기준
- 가격 영역: 할인가는 반투명 레드 배경 칩으로 감싸 시인성 확보
- 하단 배지 3종: 가로 중앙 정렬, `rgba(255,255,255,0.2)` 배경 + `1px solid rgba(255,255,255,0.4)` 테두리

### 1-3. 나노 바나나 이미지 프롬프트

**추천 모델: Nano Banana Pro** (음식 사진의 질감, 스팀 효과, 색감 재현에 Pro 모델이 우수)

**프롬프트 (Gemini에 바로 붙여넣기):**

```
A top-down overhead shot of freshly steamed red snow crabs (Hong-ge) piled generously on a rustic wooden cutting board. 5-6 bright red crabs with visible steam rising from them. The crabs are vibrant crimson red with glistening moisture on their shells. Around the board: a glass of cold beer with condensation droplets, lemon wedges, a small ceramic dish of red dipping sauce (cho-jang), and scattered ice chips.

Lighting: warm tungsten key light from upper-left (45 degrees), soft fill light from right. The warm lighting enhances the red tones of the crabs and creates an inviting, appetizing atmosphere. Visible steam/vapor rising from the crabs adds freshness.

Background: dark wooden table surface, slightly out of focus. Shallow depth of field with the center crabs in sharp focus.

Style: professional food photography, editorial quality, high saturation on reds and oranges, slightly warm white balance (3800K). Hyper-realistic, appetizing food styling.

Aspect ratio: 3:4 portrait orientation.
No text, no watermarks, no people.
```

**생성 후 수정 팁:**
- 스팀이 부족하면 "more visible thick steam rising" 추가
- 홍게 색이 탁하면 "vivid crimson red, highly saturated red shells" 강조
- 배경이 너무 밝으면 "dark moody background, low-key lighting on background" 추가
- 구도가 마음에 안 들면 "flat lay composition, perfectly centered" 또는 "45-degree angle shot" 변경
- 생성 이미지 위에 텍스트/배지는 별도 그래픽 툴(Canva, Figma)에서 오버레이 처리

---

## ZONE 2: 공감 & 불안 해소 (10~25%) -- "당신의 고민을 알고 있다"

### 2-1. 이미지 컨셉 설명

**컨셉: "걱정에서 안심으로 -- 문제-해결 비주얼 트랜지션"**

상단에는 온라인 해산물 구매의 3대 불안("살이 없다", "비린내", "양이 적다")을 시각적으로 표현하고, 하단에서 각 불안을 해소하는 증거 이미지를 대비시킨다. F-패턴 시선 흐름을 활용하여 좌측 아이콘/텍스트 -> 우측 해소 이미지 순서로 시선이 이동한다.

배경은 크림 화이트(`#FDF8F0`)로 깨끗하게 처리하고, 각 문제-해결 쌍은 카드 형태로 구분한다. 전체적으로 "정보 중심의 깔끔한 인포그래픽" 느낌으로, 과도한 장식 없이 핵심 메시지를 전달한다.

**핵심 감정 유발:** 과거 실패 경험 공감 -> 해소 -> "여긴 다르구나" 인식 전환

### 2-2. 레이아웃 가이드

```
┌─────────────────────────────────────────────────────────────────┐
│                        720px x 960px                            │
│  배경: #FDF8F0 (크림 화이트)                                      │
│                                                                 │
│  y: 48px                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  "온라인 해산물 구매,                                       │  │
│  │   이런 경험 있으셨죠?"                                      │  │
│  │   Pretendard 24px Bold #2D2D2D                             │  │
│  │   가로 중앙 정렬                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 120px  구분선: 2px solid #D94032, 너비 60px, 가운데 정렬      │
│                                                                 │
│  y: 156px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [문제-해결 카드 1]  배경: #FFFFFF, 라운드 12px, 그림자       │  │
│  │  패딩: 24px                                                 │  │
│  │  ┌──────┐                                                  │  │
│  │  │ X    │  "살이 없으면 어쩌지?"                              │  │
│  │  │아이콘│  Pretendard 16px Regular #7A7A7A                  │  │
│  │  │48x48 │                                                  │  │
│  │  │#7A7A │  ─── 구분선 1px dashed #E0E0E0 ───               │  │
│  │  └──────┘                                                  │  │
│  │  ┌──────┐                                                  │  │
│  │  │ V    │  "정품 수율 90%                                    │  │
│  │  │체크  │   매 마리 살이 꽉 찬 것만 선별합니다"                 │  │
│  │  │아이콘│  Pretendard 16px SemiBold #1B3A5C                 │  │
│  │  │48x48 │  "90%" 부분: 20px ExtraBold #D94032              │  │
│  │  │#D9403│                                                  │  │
│  │  └──────┘                                                  │  │
│  │  우측: 살이 꽉 찬 홍게 다리 썸네일 이미지 (160x120px)          │  │
│  │  라운드 8px                                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 380px  간격 16px                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [문제-해결 카드 2]  동일 구조                                │  │
│  │                                                            │  │
│  │  X "비린내 나면?"  #7A7A7A                                   │  │
│  │  V "독도 청정 해역 당일 출하                                  │  │
│  │     바다 향만 남습니다"  #1B3A5C                              │  │
│  │  우측: 독도 바다 풍경 썸네일 (160x120px)                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 580px  간격 16px                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [문제-해결 카드 3]  동일 구조                                │  │
│  │                                                            │  │
│  │  X "양이 적으면?"  #7A7A7A                                   │  │
│  │  V "2kg 기준 5~8마리                                        │  │
│  │     3~4인 가족 한 끼 충분합니다"  #1B3A5C                     │  │
│  │  우측: 접시 위 홍게 여러 마리 썸네일 (160x120px)               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 780px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  "걱정은 내려놓으세요.                                       │  │
│  │   실속 독도 홍게가 다릅니다."                                 │  │
│  │   Pretendard 20px SemiBold #1B3A5C                         │  │
│  │   가로 중앙 정렬                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 860px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [스크롤 유도 화살표]                                        │  │
│  │  아래 방향 V 아이콘, #7A7A7A, 애니메이션 bounce              │  │
│  │  "더 알아보기" 13px Regular #7A7A7A                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**상세 명세:**
- 문제-해결 카드: 너비 656px(좌우 패딩 32px), 높이 약 200px
- 카드 내부: 좌측 아이콘(48x48) + 텍스트 영역 + 우측 썸네일(160x120)
- 문제 텍스트(X): 미디엄 그레이, 물음표 형태로 고객 언어 사용
- 해결 텍스트(V): 딥 오션 블루, 핵심 수치만 홍게 레드로 강조
- F-패턴: 좌측 아이콘 -> 중앙 텍스트 -> 우측 이미지 순서로 시선 이동

### 2-3. 나노 바나나 이미지 프롬프트

#### 프롬프트 A: 살이 꽉 찬 홍게 다리 클로즈업

**추천 모델: Nano Banana Pro** (매크로 질감 표현에 적합)

```
Extreme close-up macro shot of a freshly steamed red snow crab leg being broken open, revealing thick, juicy white crab meat packed tightly inside the shell. The meat is glistening with moisture, appearing plump and succulent. Visible steam wisps. The red shell contrasts beautifully with the white meat.

Lighting: bright, even lighting from above, slightly warm tone. Studio-quality food macro photography.

Background: clean, minimal, soft cream white (#FDF8F0), very shallow depth of field with only the meat in focus.

Style: ultra-high resolution food photography, focus on texture and juiciness. Magazine editorial quality.

Aspect ratio: 4:3 landscape orientation.
No text, no watermarks.
```

#### 프롬프트 B: 독도 인근 청정 해역 풍경

**추천 모델: Nano Banana** (풍경 사진은 기본 모델로 충분)

```
Aerial view of the crystal-clear blue ocean waters near Dokdo Island, South Korea. Deep blue sea with turquoise shallow areas near rocky volcanic islands. White sea foam where waves meet the dark volcanic rocks. Clear sky with a few white clouds. The water is pristine and transparent, showing the clean ocean environment.

Lighting: bright midday sunlight, vivid colors, high contrast between blue water and dark rocks.

Style: professional landscape photography, vivid saturated colors, crisp and clean.

Aspect ratio: 4:3 landscape orientation.
No text, no watermarks, no people, no boats.
```

#### 프롬프트 C: 접시 위 풍성한 홍게

**추천 모델: Nano Banana Pro**

```
Top-down flat lay of a large white ceramic plate filled with 6-7 whole steamed red snow crabs, neatly arranged in a circular pattern. The crabs are bright crimson red, freshly steamed with slight moisture on shells. The plate is placed on a clean light wooden table. A pair of wooden chopsticks beside the plate for scale reference.

Lighting: soft natural daylight from a window on the left side, creating gentle shadows. Warm and inviting tone.

Style: minimalist food photography, clean and bright, Instagram-worthy composition.

Aspect ratio: 4:3 landscape orientation.
No text, no watermarks.
```

**생성 후 수정 팁:**
- 카드 내 썸네일로 사용하므로 160x120px로 크롭할 것을 고려하여 중심부에 핵심 피사체 배치
- 살 클로즈업에서 살이 부족해 보이면 "overflowing, bursting with meat, extremely packed" 추가
- 독도 풍경이 너무 어두우면 "bright sunny day, vivid blue tones" 강조
- 접시 위 홍게 수가 적으면 "abundance, many crabs filling the entire plate" 추가

---

## ZONE 3: 가치 증명 (25~45%) -- "숫자가 말해주는 압도적 가성비"

### 3-1. 이미지 컨셉 설명

**컨셉: "한눈에 보이는 가격 혁명 -- 앵커링 인포그래픽"**

가격 앵커링 4단계 시퀀스를 시각적으로 구현한 인포그래픽 중심의 레이아웃. 상단에 경쟁 가격 비교표, 중단에 "하루 2,271원 = 커피 한 잔" 비주얼 비교, 하단에 수율 비교 인포그래픽을 배치한다.

딥 오션 블루(`#1B3A5C`) 배경을 부분적으로 사용하여 "신뢰감 있는 데이터" 느낌을 주고, 핵심 수치는 홍게 레드(`#D94032`)와 골드(`#F2A922`)로 강조한다.

F-패턴 시선 흐름: 상단 비교표 제목(가로 스캔) -> 각 행의 핵심 수치(세로 스캔) -> 중단 일일 비용 환산(시선 정지) -> 하단 수율 비교(결론 도달)

**핵심 감정 유발:** 이성적 확신 구축 + "이건 정말 좋은 딜이다" 납득

### 3-2. 레이아웃 가이드

```
┌─────────────────────────────────────────────────────────────────┐
│                        720px x 960px                            │
│  배경: #F0F4F8 (소프트 블루그레이)                                 │
│                                                                 │
│  y: 40px                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  "같은 돈, 다른 결과"                                       │  │
│  │   Pretendard 24px Bold #2D2D2D                             │  │
│  │   가로 중앙 정렬                                            │  │
│  │                                                            │  │
│  │  "왜 실속 독도 홍게가 최선의 선택인지,                        │  │
│  │   숫자로 보여드립니다"                                       │  │
│  │   Pretendard 14px Regular #7A7A7A                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 140px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [가격 비교표]  배경: #FFFFFF, 라운드 12px, 그림자            │  │
│  │  너비: 656px                                                │  │
│  │                                                            │  │
│  │  ┌────────┬────────┬────────┬────────┬────────┐           │  │
│  │  │  항목  │본 상품 │ 마트   │수산시장│비품대게│           │  │
│  │  │        │(강조열)│        │        │        │           │  │
│  │  │ 13px   │bg:     │ 13px   │ 13px   │ 13px   │           │  │
│  │  │ #7A7A  │#FFF5F4 │ #7A7A  │ #7A7A  │ #7A7A  │           │  │
│  │  ├────────┼────────┼────────┼────────┼────────┤           │  │
│  │  │ 가격   │15,900원│25,000~ │20,000~ │29,900원│           │  │
│  │  │ (2kg)  │#D94032 │35,000  │30,000  │        │           │  │
│  │  │        │Bold    │        │        │        │           │  │
│  │  ├────────┼────────┼────────┼────────┼────────┤           │  │
│  │  │ 수율   │ 90%    │70~85% │60~90% │50~70% │           │  │
│  │  │        │#D94032 │        │        │        │           │  │
│  │  ├────────┼────────┼────────┼────────┼────────┤           │  │
│  │  │ 원산지 │국내산  │ 혼재   │국내산  │러시아산│           │  │
│  │  │        │100%   │        │        │        │           │  │
│  │  ├────────┼────────┼────────┼────────┼────────┤           │  │
│  │  │ 배송비 │ 무료   │ 조건부 │교통비  │0~3,000│           │  │
│  │  │        │#D94032 │        │발생    │       │           │  │
│  │  ├────────┼────────┼────────┼────────┼────────┤           │  │
│  │  │ 평점   │ 5.0    │  -     │  -     │3.0~4.0│           │  │
│  │  │        │#F2A922 │        │        │        │           │  │
│  │  └────────┴────────┴────────┴────────┴────────┘           │  │
│  │                                                            │  │
│  │  본 상품 열: 배경 #FFF5F4, 좌측 3px 보더 #D94032            │  │
│  │  각 셀: 패딩 8px 12px, 13px Regular                         │  │
│  │  구분선: 1px solid #F0F0F0                                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 500px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [일일 비용 환산 영역]                                       │  │
│  │  배경: #1B3A5C (딥 오션 블루), 라운드 12px                    │  │
│  │  패딩: 32px                                                 │  │
│  │                                                            │  │
│  │     "하루에 단"                                              │  │
│  │     Pretendard 16px Regular #FFFFFF                         │  │
│  │                                                            │  │
│  │     "2,271원"                                               │  │
│  │     Pretendard 40px ExtraBold #F2A922                      │  │
│  │                                                            │  │
│  │  ┌──────────────┐    =    ┌──────────────┐                 │  │
│  │  │  [커피 아이콘] │         │ [홍게 아이콘] │                 │  │
│  │  │   64x64px    │         │   64x64px    │                 │  │
│  │  │  커피 한 잔   │         │ 온 가족 홍게 │                 │  │
│  │  │  가격        │         │  한 끼       │                 │  │
│  │  │  14px #FFF   │         │ 14px #FFF    │                 │  │
│  │  └──────────────┘         └──────────────┘                 │  │
│  │                                                            │  │
│  │  "커피 한 잔 가격으로 온 가족 홍게 파티"                       │  │
│  │  Pretendard 16px SemiBold #FFFFFF                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 720px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [수율 비교 바 차트]                                         │  │
│  │  배경: #FFFFFF, 라운드 12px                                  │  │
│  │                                                            │  │
│  │  "수율 비교: 같은 무게, 다른 살의 양"                         │  │
│  │  Pretendard 16px SemiBold #2D2D2D                          │  │
│  │                                                            │  │
│  │  실속 독도 홍게  ████████████████████ 90%  (#D94032)        │  │
│  │  일반 마트 홍게  █████████████░░░░░░░ 70~85%  (#7A7A7A)     │  │
│  │  비품 대게      ██████████░░░░░░░░░░ 50~70%  (#CCCCCC)     │  │
│  │                                                            │  │
│  │  바 높이: 28px, 간격: 12px, 라운드: 6px                      │  │
│  │  "비품 대게를 사면 지불한 금액의                               │  │
│  │   30~50%는 빈 껍데기값입니다"                                 │  │
│  │  Pretendard 14px Regular #D94032                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**상세 명세:**
- 비교표: 5열 구조, 본 상품 열은 연한 레드 배경(`#FFF5F4`) + 좌측 3px `#D94032` 보더로 강조
- 일일 비용 환산: 딥 오션 블루 배경에 골드 옐로우 가격 숫자로 시선 집중
- 수율 비교: 수평 바 차트, 본 상품은 홍게 레드, 경쟁사는 그레이 톤
- 각 영역 사이 간격: 24px

### 3-3. 나노 바나나 이미지 프롬프트

> **ZONE 3은 인포그래픽 중심이므로 AI 이미지 생성보다 그래픽 툴(Canva, Figma)로 직접 제작 추천.**
> 다만, 배경 텍스처나 보조 이미지가 필요할 경우 아래 프롬프트를 활용.

#### 프롬프트 A: 커피와 홍게 비교 아이콘용 이미지

**추천 모델: Nano Banana** (아이콘/일러스트에 기본 모델 적합)

```
A split comparison image. Left side: a single takeout coffee cup with a price tag showing money. Right side: a full plate of steamed red snow crabs with a family of 4 (silhouettes) enjoying the meal.

Style: flat design illustration, minimal, clean lines, pastel colors with red (#D94032) accent on the crab side and gray on the coffee side. Simple vector-style art.

Background: clean white.
Aspect ratio: 16:9 landscape.
No text, no watermarks.
```

#### 프롬프트 B: 수율 비교용 비주얼 (살 꽉 찬 vs 빈 홍게)

**추천 모델: Nano Banana Pro**

```
Side-by-side comparison of two opened crab legs on a white background. Left: a crab leg cracked open showing it is almost empty inside with very little meat (disappointing, sparse). Right: a crab leg cracked open showing it is completely packed full of thick, juicy white crab meat (satisfying, abundant).

Clear visual contrast between empty and full. Clean white studio background. Bright even lighting.

Style: product photography, clear comparison layout, sharp focus on both subjects.

Aspect ratio: 16:9 landscape.
No text, no watermarks, no people.
```

**생성 후 수정 팁:**
- 비교 이미지에서 차이가 뚜렷하지 않으면 "extreme contrast between empty and full" 추가
- 일러스트 스타일이 너무 복잡하면 "minimalist, simple shapes, icon-style" 추가
- 색감이 브랜드와 안 맞으면 "color palette: deep navy blue, crimson red, gold yellow" 명시

---

## ZONE 4: 욕구 증폭 (45~65%) -- "이미 당신의 식탁 위에 있는 것처럼"

### 4-1. 이미지 컨셉 설명

**컨셉: "이번 주말, 우리 집 식탁이 달라집니다"**

두 가지 라이프스타일 장면을 교차 배치하여 주요 페르소나(지현씨 - 가족 식사)와 보조 페르소나(성훈씨 - 혼술)를 동시에 공략한다.

상단에는 따뜻한 자연광 아래 4인 가족이 홍게를 까먹으며 행복해하는 장면, 하단에는 간단한 조리 과정 4단계 스텝샷을 배치한다. "소유 효과(Endowment Effect)"를 극대화하여 아직 구매하지 않았지만 이미 자신의 식탁에 홍게가 올려진 미래를 상상하게 만든다.

조명은 따뜻한 골든아워 느낌으로 통일하고, 전체적으로 "행복한 일상의 한 장면"을 연출한다.

**핵심 감정 유발:** "나도 이렇게 먹고 싶다" 소유 욕구 + "나도 할 수 있다" 자기 효능감

### 4-2. 레이아웃 가이드

```
┌─────────────────────────────────────────────────────────────────┐
│                        720px x 960px                            │
│  배경: #FDF8F0 (크림 화이트)                                      │
│                                                                 │
│  y: 0px                                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [라이프스타일 이미지 A: 가족 식사 장면]                       │  │
│  │  720px x 480px (전폭 이미지)                                │  │
│  │                                                            │  │
│  │  가족 4인이 식탁에 둘러앉아 홍게를 까먹는 장면                  │  │
│  │  따뜻한 자연광, 행복한 분위기                                 │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  이미지 하단 오버레이 (하단 120px)                     │  │  │
│  │  │  그라데이션: transparent → rgba(253,248,240,0.95)    │  │  │
│  │  │                                                     │  │  │
│  │  │  "이번 주말,                                         │  │  │
│  │  │   우리 집 식탁이 달라집니다"                           │  │  │
│  │  │   Pretendard 24px Bold #2D2D2D                      │  │  │
│  │  │   좌측 정렬, left: 32px                              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 510px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  "누구나 10분이면 완성!"                                     │  │
│  │  Pretendard 20px SemiBold #2D2D2D                          │  │
│  │  가로 중앙 정렬                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 560px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [조리 과정 4단계 스텝샷]                                     │  │
│  │  4열 그리드, 각 148x148px, 간격 12px                         │  │
│  │                                                            │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐          │  │
│  │  │  STEP  │  │  STEP  │  │  STEP  │  │  STEP  │          │  │
│  │  │   1    │  │   2    │  │   3    │  │   4    │          │  │
│  │  │[개봉   │  │[찜기에 │  │[완성!  │  │[상차림 │          │  │
│  │  │ 이미지]│  │ 올리기]│  │ 접시]  │  │ 장면] │          │  │
│  │  │        │  │        │  │        │  │        │          │  │
│  │  │148x148 │  │148x148 │  │148x148 │  │148x148 │          │  │
│  │  │라운드  │  │라운드  │  │라운드  │  │라운드  │          │  │
│  │  │ 12px   │  │ 12px   │  │ 12px   │  │ 12px   │          │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘          │  │
│  │                                                            │  │
│  │  ① 개봉       ② 찜기 15분   ③ 접시에 담기  ④ 맛있게!       │  │
│  │  13px Bold   13px Bold    13px Bold    13px Bold          │  │
│  │  #2D2D2D     #2D2D2D      #2D2D2D      #D94032           │  │
│  │                                                            │  │
│  │  각 스텝 사이 화살표(→) 아이콘: #7A7A7A, 16px              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 780px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [감각 자극 카피 영역]                                       │  │
│  │  배경: #FFFFFF, 라운드 12px, 패딩 24px                       │  │
│  │                                                            │  │
│  │  "한 입 베어물면 터지는 달콤한 홍게살,                        │  │
│  │   초장 한 점 찍어 입에 넣으면                                 │  │
│  │   '바로 이 맛이야!' 하실 겁니다"                              │  │
│  │                                                            │  │
│  │   Pretendard 16px Regular #2D2D2D                          │  │
│  │   "달콤한 홍게살": SemiBold #D94032                         │  │
│  │   행간: 180% (감각 카피는 여유로운 행간)                      │  │
│  │   가로 중앙 정렬                                            │  │
│  │                                                            │  │
│  │  [홍게살 초장 찍기 소형 이미지]                                │  │
│  │  280x180px, 라운드 12px, 가운데 정렬                         │  │
│  │  이미지 그림자: 0 4px 16px rgba(0,0,0,0.1)                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**상세 명세:**
- 라이프스타일 이미지: 720x480px, 이미지 하단 그라데이션으로 카피 영역 확보
- 조리 스텝: 4열 그리드, 각 148x148px 정사각형, 12px 간격
- 스텝 번호: 원형 배지(24x24px, `#D94032` 배경) 안에 흰색 숫자
- 감각 카피: 중앙 정렬, 넉넉한 행간(180%)으로 읽는 재미 제공

### 4-3. 나노 바나나 이미지 프롬프트

#### 프롬프트 A: 가족 식사 라이프스타일

**추천 모델: Nano Banana Pro** (인물 포함 장면, 분위기 연출에 Pro 필수)

```
A warm family dinner scene at home. A Korean family of four (parents in their 30s and two young children) sitting around a wooden dining table, happily eating steamed red snow crabs together. The table is filled with bright red crabs on large plates, small dishes of dipping sauce, rice bowls, and side dishes. The young boy is excitedly holding a crab leg. The mother is smiling warmly.

Lighting: warm golden hour natural light streaming through a window on the left side. Soft, cozy, inviting atmosphere. Warm color temperature (3500K).

Camera angle: slightly elevated 30-degree angle, capturing the full table spread and family interaction.

Style: lifestyle photography, candid and natural feel (not posed), warm and heartfelt. Korean home interior background with clean modern style.

Aspect ratio: 3:2 landscape orientation.
No text, no watermarks.
```

#### 프롬프트 B: 조리 과정 STEP 1 - 개봉

**추천 모델: Nano Banana**

```
Hands opening a styrofoam delivery box revealing fresh red snow crabs packed with ice packs inside. The crabs are bright red, neatly arranged in the box. Clean kitchen counter background. Bright overhead lighting.

Style: step-by-step cooking tutorial photography, clean and bright, instructional feel.

Aspect ratio: 1:1 square.
No text, no watermarks.
```

#### 프롬프트 C: 조리 과정 STEP 2 - 찜기에 올리기

**추천 모델: Nano Banana**

```
Red snow crabs being placed into a large stainless steel steamer pot on a gas stove. A hand placing the last crab into the pot. Steam beginning to rise. Clean modern Korean kitchen background.

Style: step-by-step cooking tutorial photography, clean and bright.

Aspect ratio: 1:1 square.
No text, no watermarks.
```

#### 프롬프트 D: 조리 과정 STEP 3 - 완성

**추천 모델: Nano Banana Pro**

```
Freshly steamed red snow crabs being transferred from steamer to a white serving plate. Thick steam billowing from the pot. The crabs are vivid bright red, glistening with moisture. A pair of tongs holding one crab. Kitchen background slightly blurred.

Style: appetizing food photography, vibrant colors, focus on the steam and vivid red color.

Aspect ratio: 1:1 square.
No text, no watermarks.
```

#### 프롬프트 E: 조리 과정 STEP 4 - 상차림 완성

**추천 모델: Nano Banana Pro**

```
A beautifully arranged dinner table setting with steamed red snow crabs as the main dish on a large white plate in the center. Around it: small ceramic bowls of dipping sauce, lemon wedges, a bowl of steamed rice, kimchi, and chopsticks. On a clean wooden table with a linen table runner. Warm ambient lighting.

Style: overhead flat lay food photography, magazine editorial quality, warm and inviting.

Aspect ratio: 1:1 square.
No text, no watermarks.
```

#### 프롬프트 F: 홍게살 초장 찍기 (감각 자극)

**추천 모델: Nano Banana Pro** (질감, 수분감 표현에 Pro 필수)

```
Extreme close-up of a piece of thick, juicy white crab meat being dipped into bright red cho-jang (Korean vinegar chili sauce) in a small ceramic dish. The crab meat is plump, glistening with moisture, held by wooden chopsticks. A few drops of sauce visible. Very shallow depth of field, only the crab meat and sauce in focus.

Lighting: warm soft light from the upper left, highlighting the moisture and texture of the meat.

Style: macro food photography, ultra-appetizing, focus on texture and juiciness. The image should make viewers salivate.

Aspect ratio: 14:9 landscape.
No text, no watermarks, no face visible.
```

**생성 후 수정 팁:**
- 가족 사진에서 인물이 어색하면 "candid, natural, unposed, genuine smiles" 추가
- 스텝샷 배경이 지저분하면 "clean minimal kitchen, white countertop" 강조
- 홍게 색이 주황빛으로 나오면 "deep crimson red, not orange, vivid red shells" 수정
- 초장 찍기 장면에서 살이 얇아 보이면 "thick chunk of crab meat, generous portion" 추가

---

## ZONE 5: 신뢰 확정 (65~80%) -- "25명의 고객이 증명합니다"

### 5-1. 이미지 컨셉 설명

**컨셉: "진짜 구매자들의 진짜 이야기"**

실제 고객 리뷰를 시각적으로 재구성한 섹션. 상단에 평점 5.0 대형 배지와 함께 별 5개 아이콘, 중단에 대표 리뷰 3개를 카드 형태로 배치, 하단에 원산지 인증 + 보장 배지 3종을 나열한다.

리뷰 카드는 고객 촬영 사진(또는 AI 생성 실사풍 이미지) + 별점 + 핵심 후기 발췌로 구성한다. 전체 배경은 크림 화이트로 깨끗하게 유지하되, 평점 영역만 딥 오션 블루 배경을 사용하여 "공식적/신뢰감" 있는 느낌을 준다.

F-패턴: 평점 배지(첫 번째 가로 스캔) -> 리뷰 카드 순차 탐색(세로 스캔) -> 보장 배지(마지막 가로 스캔)

**핵심 감정 유발:** "다른 사람들도 만족했다" 안심 + "사도 후회 없다" 확신

### 5-2. 레이아웃 가이드

```
┌─────────────────────────────────────────────────────────────────┐
│                        720px x 960px                            │
│                                                                 │
│  y: 0px                                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [평점 대형 배지 영역]                                       │  │
│  │  배경: #1B3A5C (딥 오션 블루), 높이: 200px                   │  │
│  │  가로 중앙 정렬                                              │  │
│  │                                                            │  │
│  │         "고객 만족도"                                        │  │
│  │          Pretendard 14px Regular #FFFFFF                    │  │
│  │                                                            │  │
│  │         "5.0"                                               │  │
│  │          Pretendard 56px ExtraBold #F2A922                 │  │
│  │                                                            │  │
│  │         ★ ★ ★ ★ ★                                         │  │
│  │         각 별: 24px, #F2A922                                │  │
│  │                                                            │  │
│  │         "25명의 고객이 모두 만족했습니다"                      │  │
│  │          Pretendard 16px Regular #FFFFFF                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 224px  배경: #FDF8F0                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [리뷰 카드 1: 가족 식사 후기]                                │  │
│  │  배경: #FFFFFF, 라운드 12px, 그림자, 패딩 20px               │  │
│  │  너비: 656px                                                │  │
│  │                                                            │  │
│  │  ┌────────────┐  ★★★★★ 5.0                               │  │
│  │  │ [고객 리뷰  │  "아이가 '엄마 또 시켜!'라고                 │  │
│  │  │  사진]      │   했어요. 살이 꽉 차있어서                   │  │
│  │  │ 180x140px  │   깜짝 놀랐습니다"                          │  │
│  │  │ 라운드 8px  │  Pretendard 15px Regular #2D2D2D           │  │
│  │  └────────────┘  행간 170%                                  │  │
│  │                                                            │  │
│  │                  "가족 식사용 / 3kg 구매"                     │  │
│  │                  13px Regular #7A7A7A                        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 420px  간격 16px                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [리뷰 카드 2: 혼술 안주 후기]  동일 구조                     │  │
│  │                                                            │  │
│  │  "퇴근 후 맥주 한 캔에 홍게...                               │  │
│  │   이게 15,900원이라니 사기급입니다"                           │  │
│  │                                                            │  │
│  │  "혼술 안주용 / 2kg 구매"                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 600px  간격 16px                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [리뷰 카드 3: 재구매 후기]  동일 구조                        │  │
│  │                                                            │  │
│  │  "벌써 세 번째 주문입니다.                                    │  │
│  │   이 가격에 이 품질은 여기뿐"                                 │  │
│  │                                                            │  │
│  │  "재구매 고객 / 4kg 구매"                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 780px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [보장 배지 3종]  가로 중앙, 3열 배치                         │  │
│  │                                                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │  │ [트럭    │  │ [순환    │  │ [국기    │               │  │
│  │  │  아이콘] │  │  아이콘] │  │  아이콘] │               │  │
│  │  │  40x40   │  │  40x40   │  │  40x40   │               │  │
│  │  │ #1B3A5C  │  │ #1B3A5C  │  │ #1B3A5C  │               │  │
│  │  │          │  │          │  │          │               │  │
│  │  │ 무료배송 │  │7일 이내  │  │ 국내산   │               │  │
│  │  │          │  │교환/반품 │  │  100%    │               │  │
│  │  │ 13px Bold│  │ 13px Bold│  │ 13px Bold│               │  │
│  │  │ #2D2D2D  │  │ #2D2D2D  │  │ #2D2D2D  │               │  │
│  │  └──────────┘  └──────────┘  └──────────┘               │  │
│  │  각 배지: 너비 200px, 높이 100px, 가운데 정렬               │  │
│  │  배치 간격: 12px                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**상세 명세:**
- 평점 영역: 딥 오션 블루 배경, 골드 옐로우 별점/수치로 고급 신뢰감
- 리뷰 카드: 좌측 이미지(180x140) + 우측 텍스트 구조
- 리뷰 이미지: 실제 고객 사진 느낌 (약간 아마추어한 조명, 집 식탁 배경)
- 보장 배지: 3열 균등 배치, 아이콘 + 텍스트 세로 구조

### 5-3. 나노 바나나 이미지 프롬프트

#### 프롬프트 A: 리뷰 이미지 - 가족 식사 (고객 촬영 느낌)

**추천 모델: Nano Banana** (의도적으로 "완벽하지 않은" 사진을 원하므로 기본 모델 적합)

```
An amateur-looking smartphone photo of steamed red snow crabs on a home dining table. A child's hand reaching for a crab leg. Slightly messy table with rice bowls, side dishes, and crab shells. Warm indoor lighting, slightly yellowish from ceiling light. The photo has a natural, candid, unpolished feel like a real customer review photo.

Style: casual smartphone photography, not professional, authentic and genuine feel. Slightly warm color cast, minor lens distortion as from a phone camera.

Aspect ratio: 4:3 landscape.
No text, no watermarks.
```

#### 프롬프트 B: 리뷰 이미지 - 혼술 안주 (고객 촬영 느낌)

**추천 모델: Nano Banana**

```
An amateur smartphone photo of a single person's meal setup: steamed red snow crabs on a plate, a can of Korean beer (generic, no brand visible), a small TV remote, and chopsticks on a low table in a small apartment room. Evening indoor lighting, cozy and casual atmosphere. The photo looks like a real customer took it with their phone to share online.

Style: casual smartphone photography, authentic review photo feel, slightly warm lighting.

Aspect ratio: 4:3 landscape.
No text, no watermarks, no recognizable brand logos.
```

#### 프롬프트 C: 리뷰 이미지 - 재구매 고객 (여러 번 주문한 느낌)

**추천 모델: Nano Banana**

```
A smartphone photo of an opened delivery box of red snow crabs on a kitchen counter. The box is freshly opened with ice packs visible. Multiple bright red crabs neatly packed. A hand giving a thumbs-up gesture in the corner of the frame. Clean, bright kitchen background. The photo looks like a happy repeat customer documenting their delivery.

Style: casual smartphone review photo, authentic and genuine, bright and cheerful.

Aspect ratio: 4:3 landscape.
No text, no watermarks.
```

**생성 후 수정 팁:**
- 리뷰 사진이 너무 전문적으로 보이면 "slightly blurry, phone camera quality, amateur photography" 추가
- 너무 어두우면 "bright indoor lighting, well-lit room" 추가
- 생활감이 부족하면 "messy table with everyday items, lived-in feel" 추가
- 맥주 브랜드가 보이면 "generic beer can, no visible brand logo" 명시

---

## ZONE 6: 행동 촉구 (80~100%) -- "지금이 아니면, 1년을 기다려야 합니다"

### 6-1. 이미지 컨셉 설명

**컨셉: "마지막 넛지 -- 제철의 시간이 흐르고 있다"**

상단에 제철 시즌 한정 긴급성 메시지와 옵션 3종 비교 카드, 중단에 배송 안내, 하단에 최종 CTA 버튼과 안심 요소를 배치한다. 배경은 딥 오션 블루에서 홍게 레드로의 그라데이션을 사용하여 "결정의 순간"이라는 긴장감과 에너지를 전달한다.

Z-패턴 시선 흐름: 좌상단 긴급 메시지 -> 우상단 시즌 배지 -> 중앙 옵션 비교 -> 하단 CTA 버튼으로 자연스럽게 결제 행동으로 유도한다.

**핵심 감정 유발:** FOMO(놓칠까 봐 불안) + "지금 사야 하는 이유" 확신 + 리스크 제로 안심

### 6-2. 레이아웃 가이드

```
┌─────────────────────────────────────────────────────────────────┐
│                        720px x 960px                            │
│  배경: 상단 #1B3A5C → 하단 #FDF8F0 그라데이션                     │
│        (상단 300px #1B3A5C, 하단 660px #FDF8F0)                  │
│                                                                 │
│  y: 32px                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [긴급성 띠 배너]                                            │  │
│  │  배경: #F2A922 (골드 옐로우), 높이: 44px, 라운드: 8px        │  │
│  │  너비: 656px, 가운데 정렬                                    │  │
│  │                                                            │  │
│  │  "홍게 제철 시즌 한정 | 물량 소진 시 조기 마감"                │  │
│  │  Pretendard 14px Bold #2D2D2D                               │  │
│  │  좌측에 타이머/시계 아이콘(16x16) 배치                        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 100px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  "어떤 양이 딱 맞으세요?"                                    │  │
│  │  Pretendard 24px Bold #FFFFFF                               │  │
│  │  가로 중앙 정렬                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 160px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [옵션 비교 카드 3종]  3열, 각 208px, 간격 12px              │  │
│  │                                                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │  │          │  │ ★ BEST  │  │          │               │  │
│  │  │   2kg    │  │   3kg    │  │   4kg    │               │  │
│  │  │  5-8미   │  │  7-10미  │  │  8-12미  │               │  │
│  │  │          │  │          │  │          │               │  │
│  │  │ 15,900원 │  │ ○○,○○○원│  │ ○○,○○○원│               │  │
│  │  │ 20px Bold│  │ 20px Bold│  │ 20px Bold│               │  │
│  │  │ #D94032  │  │ #D94032  │  │ #D94032  │               │  │
│  │  │          │  │          │  │          │               │  │
│  │  │1~2인     │  │3~4인 가족│  │모임/파티 │               │  │
│  │  │추천      │  │딱 좋은 양│  │가성비최고│               │  │
│  │  │13px      │  │13px      │  │13px      │               │  │
│  │  │#7A7A7A   │  │#1B3A5C   │  │#7A7A7A   │               │  │
│  │  │          │  │          │  │          │               │  │
│  │  │[선택하기]│  │[선택하기]│  │[선택하기]│               │  │
│  │  │btn 아웃  │  │btn 채움  │  │btn 아웃  │               │  │
│  │  │라인      │  │#D94032bg │  │라인      │               │  │
│  │  └──────────┘  └──────────┘  └──────────┘               │  │
│  │                                                            │  │
│  │  좌/우 카드: bg #FFFFFF, border 1px #E0E0E0, 라운드 12px    │  │
│  │  중간 카드: bg #FFFFFF, border 2px #D94032, 라운드 12px     │  │
│  │           상단 "BEST" 리본: bg #F2A922, 13px Bold #FFF     │  │
│  │  카드 높이: 280px, 패딩: 20px                               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 480px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [배송 안내 영역]                                            │  │
│  │  배경: #FFFFFF, 라운드 12px, 패딩 24px                       │  │
│  │                                                            │  │
│  │  [트럭 아이콘 32x32 #1B3A5C]                                │  │
│  │  "지금 주문하면"  14px Regular #7A7A7A                       │  │
│  │  "1~3일 내 신선 배송"  20px Bold #1B3A5C                    │  │
│  │  "전 옵션 무료배송"  14px Regular #D94032                    │  │
│  │  가로 중앙 정렬                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 620px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [마지막 손실 회피 카피]                                      │  │
│  │                                                            │  │
│  │  "제철이 끝나면 이 가격에 만날 수 없습니다"                    │  │
│  │  Pretendard 18px SemiBold #D94032                           │  │
│  │  가로 중앙 정렬                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 680px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [메인 CTA 버튼]                                             │  │
│  │  너비: 656px, 높이: 60px, 라운드: 8px                        │  │
│  │  배경: #D94032                                              │  │
│  │  그림자: 0 4px 16px rgba(217,64,50,0.4)                     │  │
│  │                                                            │  │
│  │  "15,900원에 주문하기"                                       │  │
│  │  Pretendard 20px Bold #FFFFFF                               │  │
│  │  가로세로 중앙 정렬                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 760px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [안심 요소 3종]  가로 1줄, 가운데 정렬                       │  │
│  │                                                            │  │
│  │  [트럭] 무료배송  |  [순환] 7일 교환반품  |  [깃발] 국내산100% │  │
│  │                                                            │  │
│  │  각 항목: 아이콘 16x16 + 텍스트 13px Regular #7A7A7A        │  │
│  │  구분자: | (1px #E0E0E0)                                    │  │
│  │  항목 간격: 16px                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 820px                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [최종 마무리 카피]                                          │  │
│  │                                                            │  │
│  │  "15,900원 — 커피 세 잔 가격으로                              │  │
│  │   온 가족 홍게 파티. 지금 시작하세요."                         │  │
│  │  Pretendard 16px Regular #2D2D2D                            │  │
│  │  "지금 시작하세요": SemiBold #D94032                         │  │
│  │  가로 중앙 정렬                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  y: 900px ~ 960px  하단 여백                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**상세 명세:**
- 긴급 띠 배너: 골드 옐로우 배경, 검정 텍스트, 시계 아이콘으로 시간 압박감
- 옵션 카드: 3열 균등(208px), 중간 옵션 강조(보더 두께/색상, BEST 리본)
- CTA 버튼: 전폭(656px), 높이 60px, 홍게 레드 배경, 레드 기반 그림자로 부유감
- 안심 요소: CTA 바로 아래 배치하여 "결제 직전 마지막 안심" 제공

### 6-3. 나노 바나나 이미지 프롬프트

> **ZONE 6은 UI/UX 요소(옵션 카드, CTA 버튼, 배지) 중심이므로 그래픽 툴 직접 제작 추천.**
> 배경 이미지가 필요할 경우 아래 프롬프트를 활용.

#### 프롬프트 A: 옵션 카드 배경 또는 헤더 배경 (바다 + 홍게 분위기)

**추천 모델: Nano Banana**

```
Abstract background image blending deep ocean blue (#1B3A5C) tones with subtle hints of warm red. Soft gradient from deep navy blue at the top to warm cream white at the bottom. Subtle texture of ocean waves or water ripples, very abstract and minimal. No specific objects, just atmospheric color and texture.

Style: abstract, minimal, suitable as a background for text overlay. Soft and not distracting.

Aspect ratio: 3:4 portrait.
No text, no watermarks, no objects, no people.
```

#### 프롬프트 B: 제철 시즌 느낌 (동해 바다 겨울 풍경)

**추천 모델: Nano Banana**

```
A dramatic winter scene of the East Sea (Sea of Japan) near Korea's coast. Cold blue ocean water with white-capped waves. A fishing boat in the distance pulling crab traps from the sea. Early morning light with golden sun breaking through clouds on the horizon. The scene conveys the limited winter crab season and the precious nature of the catch.

Lighting: dramatic golden hour with cold blue tones in shadows. High contrast, cinematic feel.

Style: cinematic landscape photography, dramatic and atmospheric, editorial quality.

Aspect ratio: 3:1 ultra-wide panoramic (for banner use).
No text, no watermarks.
```

**생성 후 수정 팁:**
- 추상 배경이 너무 강렬하면 "very subtle, low opacity texture, mainly solid gradient" 추가
- 어선 풍경이 너무 어두우면 "brighter exposure, more golden light" 추가
- 배너용으로 크롭 시 중요 요소가 잘리지 않도록 "subject centered, open composition" 추가

---

## 추가 산출물

### A. 이미지 생성 순서 추천 (Phase별)

이미지 생성은 전체 상세페이지 디자인 흐름과 연동하여 Phase별로 진행합니다.
핵심 이미지를 먼저 생성하고, 보조 이미지를 후순위로 배치합니다.

#### Phase 1: 핵심 히어로 & 제품 이미지 (최우선)

| 순서 | 이미지 | ZONE | 모델 | 우선도 | 비고 |
|:----:|--------|:----:|:----:|:------:|------|
| 1 | 히어로 이미지 (찐 홍게 오버헤드 샷) | ZONE 1 | Pro | ★★★ | 상세페이지의 첫인상, 가장 중요 |
| 2 | 살 클로즈업 (홍게 다리 발라먹기) | ZONE 2 | Pro | ★★★ | 수율 90% 증거 비주얼 |
| 3 | 초장 찍기 매크로 샷 | ZONE 4 | Pro | ★★★ | 감각 자극 핵심 이미지 |

#### Phase 2: 라이프스타일 & 조리 과정 이미지

| 순서 | 이미지 | ZONE | 모델 | 우선도 | 비고 |
|:----:|--------|:----:|:----:|:------:|------|
| 4 | 가족 식사 라이프스타일 | ZONE 4 | Pro | ★★☆ | 소유 효과 핵심 이미지 |
| 5 | 조리 STEP 3 (완성) | ZONE 4 | Pro | ★★☆ | 스텝샷 중 가장 매력적 장면 |
| 6 | 조리 STEP 4 (상차림) | ZONE 4 | Pro | ★★☆ | 식탁 비주얼 |
| 7 | 조리 STEP 1 (개봉) | ZONE 4 | 기본 | ★☆☆ | 과정 이미지 |
| 8 | 조리 STEP 2 (찜기) | ZONE 4 | 기본 | ★☆☆ | 과정 이미지 |

#### Phase 3: 신뢰 & 보조 이미지

| 순서 | 이미지 | ZONE | 모델 | 우선도 | 비고 |
|:----:|--------|:----:|:----:|:------:|------|
| 9 | 리뷰 이미지 - 가족 식사 | ZONE 5 | 기본 | ★★☆ | 아마추어 느낌으로 |
| 10 | 리뷰 이미지 - 혼술 안주 | ZONE 5 | 기본 | ★★☆ | 아마추어 느낌으로 |
| 11 | 리뷰 이미지 - 재구매 | ZONE 5 | 기본 | ★☆☆ | 아마추어 느낌으로 |
| 12 | 독도 청정 해역 풍경 | ZONE 2 | 기본 | ★☆☆ | 썸네일 용도 |
| 13 | 접시 위 풍성한 홍게 | ZONE 2 | Pro | ★☆☆ | 썸네일 용도 |

#### Phase 4: 배경 & 인포그래픽 보조 이미지

| 순서 | 이미지 | ZONE | 모델 | 우선도 | 비고 |
|:----:|--------|:----:|:----:|:------:|------|
| 14 | 수율 비교 비주얼 (꽉 찬 vs 빈) | ZONE 3 | Pro | ★☆☆ | 인포그래픽 보조 |
| 15 | 커피 vs 홍게 비교 일러스트 | ZONE 3 | 기본 | ★☆☆ | 인포그래픽 보조 |
| 16 | 추상 배경 (오션 블루 그라데이션) | ZONE 6 | 기본 | ★☆☆ | 배경 텍스처 |
| 17 | 동해 겨울 어선 풍경 | ZONE 6 | 기본 | ★☆☆ | 배너 배경 |

> **총 17장**: Nano Banana Pro 8장 / Nano Banana 기본 9장
> 예상 소요 시간: 3~4시간 (프롬프트 튜닝 포함)

---

### B. 나노 바나나 사용 주의사항 & 팁

#### B-1. 모델 선택 기준

| 기준 | Nano Banana (기본) | Nano Banana Pro |
|------|:------------------:|:---------------:|
| **적합한 이미지** | 풍경, 배경, 아이콘, 일러스트, 아마추어 느낌 사진 | 음식 클로즈업, 인물 포함 장면, 질감/수분감 표현 |
| **장점** | 빠른 생성 속도, 넓은 스타일 범위 | 사실적 질감, 조명 뉘앙스, 색감 정밀도 |
| **단점** | 음식 질감이 플라스틱처럼 보일 수 있음 | 생성 시간 더 소요, 크레딧 소모 많음 |
| **음식 사진** | 비추천 (보조용으로만) | 강력 추천 |
| **인물 사진** | 비추천 | 추천 (자연스러운 표정/포즈) |
| **풍경/배경** | 추천 | 오버스펙 (기본으로 충분) |
| **리뷰/아마추어 사진** | 추천 (의도적 비전문감) | 비추천 (너무 전문적) |

#### B-2. 프롬프트 작성 원칙

1. **구체적으로 서술하기**
   - 나쁜 예: "맛있는 홍게 사진"
   - 좋은 예: "Top-down overhead shot of 5-6 freshly steamed bright crimson red snow crabs on a rustic wooden cutting board with visible steam rising"

2. **영어 프롬프트 사용하기**
   - 나노 바나나는 영어 프롬프트에서 최적 성능
   - 한국 음식/문화 요소는 영어로 설명 (예: "Korean vinegar chili dipping sauce (cho-jang)")

3. **조명 명시하기**
   - 음식: "warm tungsten light, 3500-3800K"
   - 신선도: "bright natural daylight"
   - 분위기: "golden hour, soft ambient"

4. **비율 명시하기**
   - 히어로: 3:4 portrait
   - 스텝샷: 1:1 square
   - 배너: 3:1 panoramic
   - 썸네일: 4:3 landscape

5. **제외 요소 명시하기**
   - 반드시 "No text, no watermarks" 포함
   - 필요 시 "no people", "no brand logos" 추가
   - AI가 임의로 텍스트를 삽입하는 것 방지

#### B-3. 음식 사진 특화 팁

| 문제 | 해결 프롬프트 추가 |
|------|-------------------|
| 홍게 색이 주황빛 | "deep crimson red, not orange, vivid saturated red shells" |
| 스팀이 안 보임 | "thick visible steam wisps rising, dramatic steam effect" |
| 살이 부족해 보임 | "meat completely packed inside, overflowing, bursting with thick white meat" |
| 음식이 플라스틱 같음 | "hyper-realistic food photography, moisture, glistening, natural texture" |
| 조명이 차가움 | "warm tungsten lighting, warm white balance 3500K, inviting atmosphere" |
| 배경이 산만함 | "clean minimal background, shallow depth of field, bokeh background" |
| 비율이 안 맞음 | 비율을 명확히 지정: "Aspect ratio: 3:4 portrait orientation" |

#### B-4. 반복 생성 전략 (프롬프트 튜닝)

```
1차 생성: 기본 프롬프트로 전체 분위기 확인
  ↓
2차 생성: 색감/조명 조정 (warm/cool, bright/dark)
  ↓
3차 생성: 구도/앵글 변경 (overhead/45-degree/eye-level)
  ↓
4차 생성: 세부 요소 추가/제거 (소품, 배경, 인물)
  ↓
최종 선택: 가장 적합한 이미지 선정 → 후보정(밝기, 대비, 크롭)
```

- 한 프롬프트당 2~3회 생성하여 가장 좋은 결과물 선택
- 약간의 표현 변경으로 결과가 크게 달라질 수 있으므로 동의어 활용
  - "steamed" = "freshly cooked", "just boiled"
  - "bright red" = "vivid crimson", "deep scarlet"
  - "appetizing" = "mouthwatering", "delicious-looking"

---

### C. 전체 상세페이지 구조 요약 (한눈에 보기)

```
┌─══════════════════════════════════════════════════════════════─┐
║                                                                ║
║  ZONE 1: 시선 강탈 (720x960px)                                  ║
║  - 히어로 이미지 (찐 홍게 오버헤드 풀블리드)                       ║
║  - 핵심 카피 + 가격 + 배지 오버레이                               ║
║  - Z-패턴 시선 흐름                                              ║
║                                                                ║
╠─══════════════════════════════════════════════════════════════─╣
║                                                                ║
║  ZONE 2: 공감 & 불안 해소 (720x960px)                            ║
║  - 3대 불안 문제-해결 카드                                        ║
║  - F-패턴: 아이콘 → 텍스트 → 증거 썸네일                          ║
║  - 크림 화이트 배경, 카드 레이아웃                                 ║
║                                                                ║
╠─══════════════════════════════════════════════════════════════─╣
║                                                                ║
║  ZONE 3: 가치 증명 (720x960px)                                   ║
║  - 가격 비교표 (5열)                                             ║
║  - 일일 비용 환산 (커피 = 홍게)                                   ║
║  - 수율 비교 바 차트                                             ║
║  - 인포그래픽 중심, 그래픽 툴 제작 추천                            ║
║                                                                ║
╠─══════════════════════════════════════════════════════════════─╣
║                                                                ║
║  ZONE 4: 욕구 증폭 (720x960px)                                   ║
║  - 가족 식사 라이프스타일 이미지                                   ║
║  - 조리 과정 4단계 스텝샷                                        ║
║  - 감각 자극 카피 + 초장 찍기 매크로                               ║
║                                                                ║
╠─══════════════════════════════════════════════════════════════─╣
║                                                                ║
║  ZONE 5: 신뢰 확정 (720x960px)                                   ║
║  - 평점 5.0 대형 배지 (딥 오션 블루 배경)                          ║
║  - 리뷰 카드 3종 (가족/혼술/재구매)                                ║
║  - 보장 배지 3종 (배송/교환/원산지)                                ║
║                                                                ║
╠─══════════════════════════════════════════════════════════════─╣
║                                                                ║
║  ZONE 6: 행동 촉구 (720x960px)                                   ║
║  - 긴급성 띠 배너 (제철 한정)                                     ║
║  - 옵션 3종 비교 카드 (BEST 강조)                                 ║
║  - 배송 안내 + CTA 버튼 + 안심 요소                               ║
║                                                                ║
╠─══════════════════════════════════════════════════════════════─╣
║                                                                ║
║  [플로팅 CTA 바] - 항상 하단 고정 (ZONE 2 이후 노출)              ║
║  높이: 60px / "옵션 선택 + 구매하기" / #D94032 CTA                ║
║                                                                ║
└─══════════════════════════════════════════════════════════════─┘
```

**전체 상세페이지 높이:** 6장 x 960px = 약 5,760px (스크롤 약 6회)
**이미지:텍스트 비율:** 약 60:40 (시각 중심 설계)
**스크롤 리듬:** 이미지 -> 텍스트 -> 인포그래픽 -> 이미지 -> 리뷰 -> CTA

---

> **본 비주얼 가이드는 상세페이지 디자인 및 AI 이미지 생성의 기준 문서로 활용됩니다.**
> **모든 비주얼은 01_strategy_brief.md의 전략 방향 및 02_psychology_map.md의 심리 트리거에 부합하는지 검증 후 최종 확정합니다.**
> **나노 바나나 프롬프트는 Gemini에 바로 붙여넣어 사용 가능하며, 생성 결과에 따라 프롬프트 튜닝이 필요할 수 있습니다.**
