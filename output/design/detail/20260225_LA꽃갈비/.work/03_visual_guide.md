# 비주얼 기획 & 나노 바나나 이미지 프롬프트
## 가성비 갑! 멕시코산 생LA 꽃갈비 2kg

---

# PART 1: 브랜드 디자인 시스템

---

## 1. 컬러 팔레트

| 용도 | 컬러명 | HEX | RGB | 사용처 |
|------|--------|-----|-----|--------|
| **주조색** | 딥 와인 레드 | `#8B1A1A` | 139, 26, 26 | 배경, 섹션 구분, 타이틀 강조 |
| **주조색 라이트** | 로즈 레드 | `#C0392B` | 192, 57, 43 | 서브타이틀, 포인트 텍스트 |
| **보조색** | 크래프트 베이지 | `#D4A574` | 212, 165, 116 | 배경 패턴, 구분선, 라벨 |
| **보조색 라이트** | 아이보리 | `#FAF3E8` | 250, 243, 232 | 카드 배경, 텍스트 영역 배경 |
| **강조색** | 퓨어 화이트 | `#FFFFFF` | 255, 255, 255 | 본문 텍스트(어두운 배경), 여백 |
| **액센트** | 골드 옐로우 | `#FFD700` | 255, 215, 0 | 할인 배지, 가격 강조, 별점 |
| **CTA** | 시그널 레드 | `#E63946` | 230, 57, 70 | CTA 버튼, 긴급 배지, 할인율 |
| **텍스트 다크** | 차콜 블랙 | `#2D2D2D` | 45, 45, 45 | 본문 텍스트, 설명문 |
| **텍스트 서브** | 웜 그레이 | `#6B6B6B` | 107, 107, 107 | 보조 설명, 캡션 |

### 컬러 사용 비율
- 주조색 계열(딥 와인 레드 + 로즈 레드): 35%
- 보조색 계열(크래프트 베이지 + 아이보리): 25%
- 화이트/텍스트: 30%
- 액센트(골드 + CTA 레드): 10%

### 그라데이션
- **히어로 오버레이**: `#8B1A1A` (opacity 0%) → `#8B1A1A` (opacity 85%) - 하단 텍스트 가독성용
- **CTA 버튼**: `#E63946` → `#C0392B` (좌→우 그라데이션)
- **가격 배경**: `#FFD700` (opacity 15%) → 투명 - 가격 영역 하이라이트

---

## 2. 타이포그래피 가이드

### 폰트 스택 (모바일 기준 720px)

| 용도 | 폰트 | 굵기 | 크기 | 행간 | 자간 | 비고 |
|------|------|------|------|------|------|------|
| **메인 타이틀** | Pretendard / Noto Sans KR | ExtraBold (800) | 36~40px | 130% | -1.5% | 최대 2줄, 강렬한 임팩트 |
| **서브 타이틀** | Pretendard / Noto Sans KR | Bold (700) | 24~28px | 140% | -1% | 섹션 제목, 핵심 문구 |
| **강조 카피** | Pretendard / Noto Sans KR | SemiBold (600) | 20~22px | 150% | -0.5% | 부제, 설명 헤드 |
| **본문** | Pretendard / Noto Sans KR | Regular (400) | 15~16px | 170% | 0% | 상세 설명, FAQ 본문 |
| **캡션/보조** | Pretendard / Noto Sans KR | Regular (400) | 13~14px | 160% | 0% | 법적 고지, 부가 정보 |
| **가격(할인가)** | Pretendard / Noto Sans KR | Black (900) | 44~48px | 100% | -2% | 숫자 강조, 시선 집중 |
| **가격(정가 취소선)** | Pretendard / Noto Sans KR | Regular (400) | 18~20px | 100% | 0% | 취소선 + 회색 처리 |
| **CTA 버튼 텍스트** | Pretendard / Noto Sans KR | Bold (700) | 18~20px | 100% | 0.5% | 가운데 정렬, 화이트 |

### 가격 표기 특수 처리
- 정가: `#6B6B6B` + 취소선(text-decoration: line-through) + 16~18px
- 할인가: `#E63946` + Black(900) + 44~48px
- 할인율: `#FFFFFF` on `#E63946` 배지 + Bold + 16px
- "원" 단위: 할인가의 60% 크기로 축소 표기

---

## 3. 공통 레이아웃 원칙

### 모바일 퍼스트 규격
- **가로**: 720px 고정
- **세로**: 3:4 비율 기준 = 960px (ZONE별 조정 가능)
- **안전 영역(Safe Zone)**: 좌우 40px, 상하 48px 패딩
- **콘텐츠 영역**: 640px (720 - 40*2)

### 시선 흐름
- ZONE 1~2: **Z패턴** (좌상→우상→좌하→우하) - 빠른 정보 스캔
- ZONE 3~5: **F패턴** (좌측 상단에서 시작, 수평 스캔 반복) - 정보 탐색
- ZONE 6: **역삼각형** (중앙 집중) - CTA로 수렴

### 그리드
- 2단 그리드: 좌 340px / 우 280px (비대칭, 이미지 우선)
- 카드형: 패딩 24px, border-radius 12px, box-shadow: 0 2px 12px rgba(0,0,0,0.08)

---

---

# PART 2: ZONE별 비주얼 가이드 & 나노 바나나 프롬프트

---

## ZONE 1: STOP (시선 정지) - 히어로 섹션

### 이미지 컨셉
**"정육점 쇼케이스"** - 갓 손질한 LA꽃갈비가 도마 위에 풍성하게 펼쳐진 클로즈업. 생고기의 선홍빛 살코기와 하얀 뼈의 강렬한 대비. 마치 정육점에서 바로 꺼낸 듯한 생생함.

### 레이아웃 가이드
```
+----------------------------------+ (720 x 960px)
|                                  |
|    [풀블리드 히어로 이미지]         |
|    LA꽃갈비 클로즈업               |
|    (720 x 640px, 화면의 67%)      |
|                                  |
|    ---- 하단 그라데이션 오버레이 ---|
|                                  |
+----------------------------------+
|  [할인 배지]          [원산지 태그]|
|  15% OFF              멕시코산    |
|                                  |
|  비계 빼고 진짜 살코기만           |
|  2kg / 55,000원                  |
|  ~~65,000원~~                    |
|                                  |
|  (하단 여백 24px)                 |
+----------------------------------+
```

**세부 사항:**
- 히어로 이미지: 풀블리드(좌우 여백 없이 꽉 참), 상단 2/3 차지
- 이미지 하단에 `#8B1A1A` → 투명 그라데이션 오버레이 (높이 200px)
- 텍스트 영역: 하단 1/3, 배경 `#FFFFFF`
- 할인 배지: 좌상단, `#E63946` 배경, 화이트 텍스트, 원형 또는 라운드 사각형
- 메인 타이틀: 36~40px ExtraBold, `#2D2D2D`
- 가격: 44px Black `#E63946`, 정가는 18px 취소선 `#6B6B6B`

### 나노 바나나 이미지 프롬프트

**모델: Nano Banana (제품 사진 특화)**

```
Prompt:
A stunning overhead 45-degree angle food photography shot of raw LA-style
beef short ribs (cross-cut galbi) arranged beautifully on a dark wooden
cutting board. The meat shows vibrant deep red color with clean white bones
visible. No visible fat trimmings - only lean meat attached to bones.
The ribs are spread out generously to show abundance (2kg worth).
Small sprigs of fresh rosemary and whole black peppercorns scattered
around as minimal garnish. Dark moody background with a piece of brown
kraft paper underneath. Natural side lighting from the left creating
dramatic shadows and highlighting the meat's fresh texture and moisture.
Shot with a macro lens showing fine meat grain detail.
Professional food photography style, editorial quality.

Aspect Ratio: 3:4 (720x960)
Style: Professional food photography, dark moody, editorial
Lighting: Natural side light from left, dramatic shadows
```

**생성 후 수정 팁:**
- 뼈의 흰색이 너무 밝으면 "slightly off-white, natural bone color" 추가
- 고기 색이 너무 붉으면 "natural fresh beef color, not overly saturated" 조정
- 배경이 너무 어두우면 "medium-dark wooden surface" 로 변경
- 양이 부족해 보이면 "abundant quantity, filling the entire cutting board" 강조

---

## ZONE 2: EMPATHY (공감 진입)

### 이미지 컨셉
**"비계의 배신 vs 실속의 진실"** - 좌측에 비계가 많은 실망스러운 갈비, 우측에 살코기가 가득한 우리 갈비를 나란히 비교. 좌측에는 붉은 X 표시, 우측에는 체크 표시. 감정적 공감을 시각화.

### 레이아웃 가이드
```
+----------------------------------+ (720 x 960px)
|  (상단 여백 48px)                 |
|                                  |
|  "갈비 샀는데                     |
|   반이 비계였던 적,               |
|   있으시죠?"                     |
|                                  |
|  (메인 카피: 28px Bold, #2D2D2D) |
|  (여백 32px)                     |
|                                  |
+--[비교 이미지 영역]--+------------+
|                     |            |
|  [비계 많은 갈비]    | [우리 갈비] |
|  (320 x 320px)     | (320x320px)|
|  회색빛/지방 많음    | 선홍빛살코기|
|                     |            |
|  ❌ 비계 포함 2kg    | ✅ 순살 2kg|
|  실제 살코기 1.4kg   | 먹을 수 있는|
|                     | 살코기 2kg  |
+---------------------+------------+
|  (여백 24px)                     |
|                                  |
|  "저희는 비계에 돈 받지 않습니다"  |
|  (서브 카피: 20px SemiBold)       |
|  (하단 여백 48px)                 |
+----------------------------------+
```

**세부 사항:**
- 배경: `#FAF3E8` (아이보리) - 부드러운 공감 톤
- 비교 이미지는 좌우 대칭 배치, 중앙에 "VS" 또는 세로 구분선
- 좌측(비계 갈비): 약간 탈색된 톤, 빨간 X 오버레이
- 우측(우리 갈비): 선명한 색감, 초록 체크 오버레이
- 하단 전환 카피: `#8B1A1A` 딥 와인 레드

### 나노 바나나 이미지 프롬프트

**이미지 A: 비계 많은 갈비 (비교용 - 부정적 이미지)**

**모델: Nano Banana**

```
Prompt:
A disappointing photo of raw beef short ribs with excessive white fat
and gristle covering most of the meat surface. The fat-to-meat ratio
is roughly 40-50% fat. The meat color is dull pinkish-gray, looking
unappetizing. Placed on a plain white styrofoam tray like cheap
supermarket packaging. Overhead shot, flat fluorescent lighting
giving it a cold, unappealing look. The overall feeling should be
"this is what you usually get" - disappointing and wasteful.

Aspect Ratio: 1:1 (640x640)
Style: Unflattering supermarket photo, cold lighting
Lighting: Flat overhead fluorescent, no shadows
```

**이미지 B: 우리 갈비 (비교용 - 긍정적 이미지)**

**모델: Nano Banana**

```
Prompt:
An appetizing close-up photo of premium raw LA-style beef short ribs
with minimal fat. The cross-cut bones are clearly visible with deep red,
lean meat tightly attached. Almost no white fat visible - just pure
meat and bone. Placed on dark slate board with warm natural lighting
from the side. The meat glistens with natural moisture, looking
incredibly fresh. Rich, vibrant red color that screams freshness.
Clean, professional food photography style.

Aspect Ratio: 1:1 (640x640)
Style: Premium food photography, warm tones
Lighting: Warm natural side light, soft shadows
```

**생성 후 수정 팁:**
- 이미지 A: 비계가 부족하면 "thick layers of white fat covering the surface" 추가
- 이미지 B: 살코기가 너무 기름져 보이면 "extremely lean, fat-trimmed" 강조
- 두 이미지의 크기와 앵글을 최대한 동일하게 맞출 것 (비교 효과 극대화)
- 이미지 위에 텍스트/배지는 별도 디자인 툴 또는 Nano Banana Pro로 합성

---

## ZONE 3: PROOF (증거 제시)

### 이미지 컨셉
**"숫자가 말하는 진실"** - 인포그래픽 중심의 증거 제시. 가격 비교표, 실중량 인증 사진, 리뷰 하이라이트. 이성적 판단을 위한 정보 집약 섹션.

### 레이아웃 가이드
```
+----------------------------------+ (720 x 1280px, 세로 확장)
|  (상단 여백 48px)                 |
|                                  |
|  "왜 이 가격이 가능할까요?"        |
|  (서브타이틀: 28px Bold, #8B1A1A) |
|                                  |
|  (여백 24px)                     |
+--[가격 비교 인포그래픽]-----------+
|                                  |
|  마트     정가     할인가         |
|  40,000  65,000   55,000원/2kg   |
|  /kg     (취소선)  = 27,500/kg   |
|                                  |
|  "마트 1kg 값으로 2kg 삽니다"     |
|                                  |
+----------------------------------+
|  (여백 32px)                     |
+--[실중량 인증 사진]---------------+
|                                  |
|  [저울 위 갈비 사진]              |
|  (640 x 360px)                  |
|  디지털 저울에 2.0kg 표시          |
|                                  |
|  "비계 제거 후 순살+뼈            |
|   정직한 2kg"                    |
|                                  |
+----------------------------------+
|  (여백 32px)                     |
+--[리뷰 하이라이트]----------------+
|                                  |
|  ★★★★★ 5.0/5 (전체 리뷰 만점)   |
|                                  |
|  [포토리뷰1]  [포토리뷰2]         |
|  "비계 진짜   "생물이라           |
|   없어서      육즙이              |
|   놀랐어요"   살아있어요"         |
|                                  |
|  [신뢰 배지 4종 가로 배치]        |
|  HACCP | 당일발송 | 무료배송 | 원산지|
|                                  |
|  (하단 여백 48px)                 |
+----------------------------------+
```

**세부 사항:**
- 배경: `#FFFFFF` - 깔끔하고 신뢰감 있는 배경
- 가격 비교 영역: 카드형 (`#FAF3E8` 배경), 바 차트 또는 원형 비교
- 마트 가격은 `#6B6B6B`, 할인가는 `#E63946` + Bold
- 리뷰 별점: `#FFD700` 골드 옐로우
- 신뢰 배지: 각 60x60px 아이콘 + 하단 캡션, `#D4A574` 테두리

### 나노 바나나 이미지 프롬프트

**이미지 A: 저울 위 실중량 인증 사진**

**모델: Nano Banana**

```
Prompt:
A clear, well-lit photo of raw LA-style beef short ribs placed on a
modern digital kitchen scale. The scale display clearly shows "2.00 kg"
in bright digits. The meat is neatly stacked showing lean red meat with
visible bone cross-sections and minimal fat. The scale is placed on a
clean white marble countertop. Bright, even lighting with soft shadows.
The composition focuses on the scale reading and the generous amount
of meat. Shot from a slightly elevated front angle (about 30 degrees)
to show both the scale display and the meat clearly. Clean, trustworthy
product photography style.

Aspect Ratio: 16:9 (640x360)
Style: Clean product photography, trustworthy, evidence-style
Lighting: Bright even lighting, minimal shadows
```

**이미지 B: 가격 비교 인포그래픽 (텍스트 포함)**

**모델: Nano Banana Pro (텍스트/인포그래픽 특화)**

```
Prompt:
A clean, modern infographic comparing meat prices. Design style is
minimalist with a warm ivory (#FAF3E8) background. Three vertical
bars in a simple bar chart format:
- Left bar (tall, gray #6B6B6B): labeled "마트 LA갈비" with "40,000원/kg"
- Middle bar (medium, light red #C0392B): labeled "정가" with
  strikethrough "65,000원"
- Right bar (shortest, bold red #E63946): labeled "할인가" with
  "27,500원/kg" in large bold text
A gold (#FFD700) savings badge showing "15% OFF" in the corner.
Korean text, clean sans-serif font (Pretendard style).
Bottom text: "마트 1kg 값으로 여기선 2kg"

Aspect Ratio: 4:3 (640x480)
Style: Clean infographic, Korean text, data visualization
```

**생성 후 수정 팁:**
- 저울 사진: 숫자가 잘 안 보이면 "large, clearly visible digital display reading 2.00" 강조
- 인포그래픽: 한글 텍스트 렌더링이 부정확할 수 있으므로 막대 그래프 부분만 생성하고 텍스트는 디자인 툴에서 오버레이 추천
- 인포그래픽 대신 실제 저울 사진 + 텍스트 오버레이 조합이 더 신뢰감 있을 수 있음

---

## ZONE 4: DESIRE (욕구 폭발)

### 이미지 컨셉
**"지글지글, 침 고이는 순간"** - 숯불 그릴 위에서 구워지는 LA꽃갈비의 클로즈업. 육즙이 터지고, 연기가 피어오르며, 갈비 표면에 아름다운 그릴 마크. 오감을 자극하는 최고의 욕구 유발 이미지.

### 레이아웃 가이드
```
+----------------------------------+ (720 x 1200px)
|                                  |
|  [그릴 위 갈비 풀블리드 이미지]    |
|  (720 x 540px)                  |
|  숯불 위 지글지글 굽히는 장면     |
|  연기 + 육즙 + 불꽃               |
|                                  |
+----------------------------------+
|  (여백 32px)                     |
|                                  |
|  "주말 저녁, 온 가족이            |
|   기다리던 그 맛"                 |
|  (28px Bold, #2D2D2D)           |
|                                  |
|  (여백 24px)                     |
+--[시나리오 카드 2종]---------------+
|                                  |
| +----------+    +----------+     |
| |[가족식탁] |    |[캠핑장]  |     |
| | 280x280  |    | 280x280  |     |
| |          |    |          |     |
| |가족 4인이 |    |캠핑장에서 |     |
| |갈비를 구워|    |친구들과   |     |
| |먹는 따뜻한|    |갈비파티   |     |
| |저녁 식탁  |    |          |     |
| +----------+    +----------+     |
|                                  |
+----------------------------------+
|  (여백 32px)                     |
+--[레시피 카드]--------------------+
|                                  |
|  "간단 레시피 2가지"              |
|                                  |
|  [양념갈비]     |  [소금구이]     |
|  간장 3T       |  천일염만       |
|  배즙 2T       |  뿌려서        |
|  설탕 1T       |  굽기          |
|  ...           |                |
|                                  |
|  (하단 여백 48px)                 |
+----------------------------------+
```

**세부 사항:**
- 히어로 그릴 이미지: 풀블리드, 화면 상단 45% 차지
- 시나리오 카드: 2단 병렬 배치, border-radius 16px, 그림자 효과
- 레시피 카드: `#FAF3E8` 배경, `#D4A574` 테두리, 수제 감성
- 전체 섹션에서 가장 감성적 톤 - 따뜻한 조명, 풍성한 음식 비주얼

### 나노 바나나 이미지 프롬프트

**이미지 A: 그릴 위 갈비 (메인 욕구 자극)**

**모델: Nano Banana**

```
Prompt:
A mouth-watering close-up photograph of LA-style beef short ribs
(galbi) being grilled on a charcoal barbecue grill. The meat is
perfectly seared with beautiful grill marks in a crosshatch pattern.
Juices are visibly bubbling on the surface of the meat. Wisps of
aromatic smoke rising from the grill. The charcoal underneath glows
orange-red. The meat has a gorgeous caramelized golden-brown exterior
while still showing hints of pink juiciness. Some ribs are still raw
showing the deep red color, others are being flipped mid-cook.
Shallow depth of field focusing on the closest rib piece.
Warm dramatic lighting from the glowing charcoal below and ambient
golden hour light. Makes your mouth water instantly.
Professional food photography, cinematic quality.

Aspect Ratio: 4:3 (720x540)
Style: Cinematic food photography, warm and smoky
Lighting: Warm glow from charcoal + golden hour ambient
```

**이미지 B: 가족 식탁 시나리오**

**모델: Nano Banana**

```
Prompt:
A warm, inviting photograph of a Korean family dinner scene. A round
wooden dining table with a portable gas grill in the center, grilling
LA-style short ribs. The table is set with banchan (small side dishes),
white rice bowls, lettuce wraps, ssamjang sauce, and sliced garlic.
Steam and light smoke rising from the grill. Warm overhead pendant
lighting creating a cozy atmosphere. The scene should feel homey and
abundant - lots of food on the table. Shot from an elevated 45-degree
angle showing the full table spread. Soft warm color temperature.
No people visible - just the beautifully set table waiting for the
family. Lifestyle food photography style.

Aspect Ratio: 1:1 (640x640)
Style: Lifestyle food photography, warm and cozy Korean dinner
Lighting: Warm pendant light overhead, soft ambient
```

**이미지 C: 캠핑장 시나리오**

**모델: Nano Banana**

```
Prompt:
An outdoor camping barbecue scene at golden hour. A portable camping
grill with LA-style beef short ribs sizzling on top, set on a wooden
camping table. Camping chairs and a tent visible in the soft-focus
background. Pine trees and warm sunset light filtering through.
A few bottles of beer and paper plates on the table. Charcoal smoke
mixing with the golden evening light creating a magical atmosphere.
The ribs look perfectly grilled with charred edges and juicy center.
Nature and outdoor leisure vibes. Shot from a low angle to make the
food look heroic against the sunset sky.
Outdoor lifestyle photography, aspirational camping aesthetic.

Aspect Ratio: 1:1 (640x640)
Style: Outdoor lifestyle, camping aesthetic, golden hour
Lighting: Golden hour sunset, warm backlighting with campfire glow
```

**생성 후 수정 팁:**
- 그릴 이미지: 연기가 과하면 "subtle thin wisps of smoke" 로 줄이기
- 가족 식탁: 한식 반찬이 부정확하면 "Korean-style side dishes in small white ceramic bowls" 구체화
- 캠핑: 너무 화려한 글램핑으로 나오면 "simple casual camping setup, not glamping" 추가
- 고기 색이 과하게 익어 보이면 "medium-rare to medium doneness" 지정

---

## ZONE 5: OVERCOME (불안 해소)

### 이미지 컨셉
**"걱정은 내려놓으세요"** - 깔끔한 FAQ 카드 + 보증 아이콘 + 포장/배송 과정 사진. 신뢰와 안심을 주는 정돈된 비주얼. 정보 중심의 미니멀한 디자인.

### 레이아웃 가이드
```
+----------------------------------+ (720 x 1100px)
|  (상단 여백 48px)                 |
|                                  |
|  "자주 묻는 질문"                 |
|  (서브타이틀: 28px Bold, #8B1A1A) |
|                                  |
|  (여백 24px)                     |
+--[FAQ 아코디언 카드]---------------+
|                                  |
|  Q. 멕시코산 품질 괜찮나요?        |
|  A. 미국과 동일 환경 사육,        |
|     USDA 품질 기준 충족           |
|                                  |
|  Q. 2kg 다 못 먹으면?             |
|  A. 1kg 단위 소분 포장,           |
|     남는 건 냉동 보관 OK          |
|                                  |
|  Q. 배송 중 상하지 않나요?         |
|  A. 아이스박스+아이스팩 냉장 포장   |
|                                  |
|  Q. 마음에 안 들면?               |
|  A. 7일 내 교환/반품,             |
|     불량 시 배송비 무료            |
|                                  |
+----------------------------------+
|  (여백 32px)                     |
+--[보증 배지 4종 가로 배치]---------+
|                                  |
|  [무료배송]  [당일발송]           |
|  [7일반품]  [신선도보장]          |
|  (각 아이콘 80x80px + 캡션)       |
|                                  |
+----------------------------------+
|  (여백 24px)                     |
+--[포장 사진]----------------------+
|                                  |
|  [아이스박스 포장 사진]            |
|  (640 x 320px)                  |
|  냉장 특수 포장 실물 사진          |
|                                  |
|  (하단 여백 48px)                 |
+----------------------------------+
```

**세부 사항:**
- 배경: `#FFFFFF` - 깔끔하고 정돈된 느낌
- FAQ 카드: `#FAF3E8` 배경, 좌측에 Q/A 컬러 구분 (Q: `#8B1A1A`, A: `#2D2D2D`)
- 보증 배지: 미니멀 라인 아이콘 스타일, `#8B1A1A` 단색
- 포장 사진: 실제 배송 포장 모습 (아이스박스 + 아이스팩 + 갈비 밀봉 패키지)

### 나노 바나나 이미지 프롬프트

**이미지 A: 배송 포장 사진**

**모델: Nano Banana**

```
Prompt:
A clean, well-organized product packaging photo showing a premium
insulated shipping box (styrofoam cooler box) opened to reveal
vacuum-sealed packages of raw beef short ribs inside. Ice packs
are visible around the sealed meat packages. The vacuum-sealed
meat shows deep red color through the clear packaging. The box
sits on a clean white kitchen counter. One sealed package is
placed next to the box showing the label clearly. Everything looks
hygienic, professional, and well-packed. Bright, clean studio
lighting with soft shadows. The image conveys trust, freshness,
and careful handling. Product packaging photography style.

Aspect Ratio: 2:1 (640x320)
Style: Clean product/packaging photography, trustworthy
Lighting: Bright studio light, clean and even
```

**이미지 B: 보증 아이콘 세트 (4종)**

**모델: Nano Banana Pro (아이콘/인포그래픽 특화)**

```
Prompt:
A set of four minimalist line-art icons arranged in a horizontal row
on a white background. Each icon is drawn in a deep wine red color
(#8B1A1A) with thin consistent line weight. The icons represent:
1. A delivery truck with a checkmark - "Free Shipping"
2. A clock with an arrow showing speed - "Same Day Dispatch"
3. A return/exchange arrow forming a circle - "7-Day Returns"
4. A snowflake inside a shield - "Freshness Guaranteed"
Each icon is enclosed in a subtle light circle background.
Minimal, modern, consistent icon design style.
Clean vector illustration look.

Aspect Ratio: 4:1 (640x160)
Style: Minimalist line icons, consistent style, wine red monochrome
```

**생성 후 수정 팁:**
- 포장 사진: 진공포장이 부자연스러우면 "clear vacuum-sealed plastic showing meat inside" 구체화
- 아이콘: AI가 생성한 아이콘은 일관성이 떨어질 수 있음 → 각 아이콘을 개별 생성 후 조합하거나, Figma/Canva에서 직접 제작 권장
- 포장 사진 대신 실제 배송 사진(언박싱)을 사용하면 더 신뢰감 높음

---

## ZONE 6: ACTION (긴급 행동 유도)

### 이미지 컨셉
**"지금이 아니면 이 가격은 없습니다"** - 최종 가격 정리 + 긴급성 배지 + 대형 CTA 버튼. 모든 혜택을 한눈에 정리하고 즉시 행동을 유도하는 마감 섹션.

### 레이아웃 가이드
```
+----------------------------------+ (720 x 960px)
|  (배경: #8B1A1A 딥 와인 레드)     |
|  (상단 여백 48px)                 |
|                                  |
|  "오늘 주문 마감까지"             |
|  N시간 N분                       |
|  (카운트다운 스타일, 골드 #FFD700)|
|                                  |
|  (여백 24px)                     |
+--[가격 최종 정리 카드]-------------+
|  (카드 배경: #FFFFFF,            |
|   border-radius: 16px)          |
|                                  |
|  멕시코산 생LA 꽃갈비 2kg         |
|                                  |
|  마트 평균    ~~80,000원~~       |
|  정가         ~~65,000원~~       |
|               ↓ 15% OFF          |
|  오늘 특가    55,000원            |
|  (55,000 → 48px, #E63946)       |
|                                  |
|  + 무료배송 (3,000원 절약)        |
|  + 후기 작성 시 최대 500P         |
|                                  |
|  실질 혜택가 ≈ 51,500원!         |
|                                  |
+----------------------------------+
|  (여백 24px)                     |
|                                  |
|  "지금 N명이 이 상품을            |
|   보고 있습니다"                  |
|  (16px, #FFD700)                |
|                                  |
|  (여백 16px)                     |
+--[CTA 버튼]----------------------+
|                                  |
|  +----------------------------+  |
|  |                            |  |
|  |  55,000원에 2kg 받아보기    |  |
|  |                            |  |
|  +----------------------------+  |
|  (CTA: 640x64px, #E63946,       |
|   border-radius: 32px,          |
|   그림자, 18px Bold White)       |
|                                  |
|  (여백 12px)                     |
|  "한정 수량 소진 시 가격 변동"    |
|  (캡션: 13px, #FAF3E8)          |
|                                  |
|  (하단 여백 48px)                 |
+----------------------------------+
```

**세부 사항:**
- 전체 배경: `#8B1A1A` 딥 와인 레드 - 긴급성과 프리미엄 동시 전달
- 카운트다운: `#FFD700` 골드 + Bold, 디지털 시계 스타일
- 가격 카드: 화이트 배경으로 대비 효과, 중앙 정렬
- CTA 버튼: `#E63946` → `#C0392B` 그라데이션, 라운드 풀 너비
- "N명이 보고 있습니다": `#FFD700` + 약간의 깜빡임 효과 암시
- 스티키 CTA: 페이지 하단 고정 바 (별도 레이어), 높이 72px

### 나노 바나나 이미지 프롬프트

**이미지: CTA 섹션 배경 (분위기 이미지)**

**모델: Nano Banana**

```
Prompt:
A dramatic dark food photography background showing the edge of a
charcoal grill with glowing embers and subtle smoke. Deep wine red
and black tones dominate. The image is intentionally dark and
atmospheric to serve as a background for text overlay. Warm red
and orange glow from the charcoal creates mood lighting. Very shallow
depth of field with most of the image softly blurred. The focus area
shows just a hint of grilled meat edge with beautiful char marks.
Cinematic color grading with deep reds and warm blacks.
This is a mood/atmosphere image, not a product shot.

Aspect Ratio: 3:4 (720x960)
Style: Dark moody atmospheric, cinematic background
Lighting: Low-key, warm charcoal glow, predominantly dark
```

**생성 후 수정 팁:**
- 배경이 너무 밝으면 "very dark, low-key lighting, 80% of image in shadow" 추가
- 숯불 색이 너무 강하면 "subtle ember glow" 로 줄이기
- 텍스트 오버레이 영역을 확보하기 위해 "large empty dark area in center for text" 추가
- 이 이미지 위에 반투명 오버레이(`#8B1A1A`, opacity 70%) 적용 후 텍스트 배치

---

---

# PART 3: 이미지 생성 실행 가이드

---

## 1. 이미지 생성 우선순위 (추천 순서)

| 순위 | ZONE | 이미지 | 모델 | 중요도 | 이유 |
|------|------|--------|------|--------|------|
| **1** | ZONE 1 | 히어로 - 도마 위 LA꽃갈비 | Nano Banana | 최상 | 첫인상, 전체 이미지 톤 기준 |
| **2** | ZONE 4-A | 그릴 위 갈비 클로즈업 | Nano Banana | 최상 | 욕구 자극의 핵심, 가장 감성적 |
| **3** | ZONE 2-B | 우리 갈비 (비교 긍정) | Nano Banana | 상 | 히어로와 톤 매칭 필요 |
| **4** | ZONE 2-A | 비계 갈비 (비교 부정) | Nano Banana | 상 | ZONE 2-B와 페어로 사용 |
| **5** | ZONE 3-A | 저울 위 실중량 인증 | Nano Banana | 상 | 핵심 USP 증거 |
| **6** | ZONE 4-B | 가족 식탁 시나리오 | Nano Banana | 중 | 주 페르소나 시나리오 |
| **7** | ZONE 4-C | 캠핑장 시나리오 | Nano Banana | 중 | 보조 페르소나 시나리오 |
| **8** | ZONE 5-A | 배송 포장 사진 | Nano Banana | 중 | 신뢰 보강 |
| **9** | ZONE 6 | CTA 배경 (숯불 무드) | Nano Banana | 중하 | 배경용, 단색 대체 가능 |
| **10** | ZONE 3-B | 가격 비교 인포그래픽 | Nano Banana Pro | 중하 | 텍스트 포함, 직접 제작 권장 |
| **11** | ZONE 5-B | 보증 아이콘 세트 | Nano Banana Pro | 하 | 아이콘은 직접 제작이 더 정확 |

---

## 2. 프롬프트 공통 팁

### Nano Banana 최적화
- **구체적 각도 명시**: "overhead 45-degree", "eye-level", "low angle" 등 반드시 지정
- **조명 조건 명시**: "natural side light from left", "warm golden hour", "flat studio light" 등
- **재질/질감 키워드**: "glistening moisture", "caramelized surface", "visible meat grain"
- **분위기 키워드**: "professional food photography", "editorial quality", "lifestyle"

### Nano Banana Pro 최적화 (텍스트/인포그래픽)
- 한글 텍스트 렌더링은 불완전할 수 있으므로, 레이아웃 + 비주얼만 생성하고 텍스트는 후처리로 추가하는 것이 가장 안정적
- 인포그래픽의 데이터 시각화(바 차트, 비교표)는 Nano Banana Pro로 생성 후 정확한 수치는 텍스트 오버레이
- 아이콘은 "consistent line weight", "monochrome", "minimal" 키워드 필수

### 공통 품질 팁
- 비율(Aspect Ratio)을 반드시 명시해야 원하는 구도가 나옴
- "photorealistic" 보다 "professional photography" 가 더 자연스러운 결과
- 음식 사진은 "shot with 85mm lens, f/2.8 aperture" 같은 카메라 설정을 추가하면 보케 효과 자연스러움
- 색온도: 생고기는 "neutral to cool white balance", 구운 고기는 "warm color temperature"

---

## 3. 생성 후 후처리 권장 사항

| 항목 | 도구 | 작업 내용 |
|------|------|-----------|
| 텍스트 오버레이 | Canva / Figma | 모든 한글 텍스트, 가격, 배지 |
| 색보정 | Lightroom / Snapseed | 일관된 색온도, 채도 통일 |
| 이미지 리사이징 | Squoosh / TinyPNG | 720px 기준 리사이즈 + 웹 최적화 |
| 레이아웃 조합 | Figma / Canva | ZONE별 이미지 + 텍스트 조합 |
| 배경 제거 | Remove.bg | 필요시 갈비 누끼 (배경 교체용) |

---

## 4. 전체 비주얼 톤 체크리스트

- [ ] 모든 이미지의 색온도가 통일되어 있는가? (생고기: 뉴트럴, 구운고기: 따뜻함)
- [ ] 주조색(`#8B1A1A`)이 각 ZONE에 일관되게 반영되어 있는가?
- [ ] 모바일 720px에서 텍스트가 13px 이상이며 가독성이 확보되는가?
- [ ] F/Z 패턴 시선 흐름에 맞게 핵심 요소가 배치되어 있는가?
- [ ] CTA 버튼이 충분히 크고(높이 64px 이상) 눈에 띄는가?
- [ ] 이미지 파일 크기가 모바일 로딩에 적합한가? (각 200KB 이하 목표)
- [ ] 히어로 이미지(ZONE 1)와 욕구 이미지(ZONE 4)의 품질이 최상인가?
- [ ] 비교 이미지(ZONE 2)의 좌우 대비가 명확한가?

---

*본 비주얼 가이드는 01_strategy_brief.md의 6-ZONE 퍼널 모델 및 심리 트리거를 기반으로 설계되었습니다.*
*카피라이터 산출물(02_copy_draft.md)과 결합하여 최종 통합 기획서(04_final_plan.md)로 합산됩니다.*
