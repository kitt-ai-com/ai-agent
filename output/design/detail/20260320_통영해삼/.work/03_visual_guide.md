# 통영 해삼 상세페이지 비주얼 가이드

작성일: 2026-03-20
담당: 이커머스 디자인팀
기준: 모바일 퍼스트 (720px, 3:4 비율)

---

## 브랜드 컬러 팔레트

### 메인 컬러
- **딥 네이비 블루:** `#1a1f2e` - 메인 배경, 프리미엄 톤
- **매트 블랙:** `#0d0d0d` - 강조 배경, 극적 대비
- **차콜 그레이:** `#2b2b2b` - 서브 배경, 구분선

### 포인트 컬러
- **골드:** `#d4af37` - 프리미엄 강조, CTA 버튼
- **화이트:** `#ffffff` - 주요 텍스트
- **라이트 그레이:** `#e0e0e0` - 서브 텍스트, 설명
- **워닝 레드:** `#e63946` - 할인 가격, 긴급성 표현

### 자연 컬러 (해삼/바다)
- **딥 브라운:** `#3d2817` - 해삼 자연색
- **오션 블루:** `#0a3d62` - 바다 배경
- **실버 그레이:** `#8b9298` - 금속 질감, 조명 효과

---

## 타이포그래피 가이드

### 폰트 패밀리
- **메인:** Pretendard, Apple SD Gothic Neo, sans-serif
- **숫자/가격:** Roboto, Pretendard (숫자 가독성 우선)

### 폰트 사이즈 (모바일 기준)

#### 헤드라인
- **H1 (메인 캐치):** 32px / Bold (700) / 행간 140%
- **H2 (존 타이틀):** 26px / Bold (700) / 행간 140%
- **H3 (서브 타이틀):** 20px / SemiBold (600) / 행간 150%

#### 본문
- **본문 (일반):** 15px / Regular (400) / 행간 170%
- **본문 (강조):** 16px / Medium (500) / 행간 170%
- **캡션:** 13px / Regular (400) / 행간 160%

#### 특수
- **가격 (할인 전):** 18px / Regular (400) / 취소선
- **가격 (할인 후):** 36px / Bold (700) / 빨간색
- **CTA 버튼:** 18px / Bold (700) / 화이트

### 여백 원칙
- **존 간격:** 60px
- **섹션 간격:** 40px
- **요소 간격:** 20px
- **좌우 패딩:** 20px

---

## ZONE 1: 후킹 (0~3초)

### 이미지 컨셉

충격적 대조를 통해 스크롤을 멈추게 하는 첫 인상. 좌우 분할 화면으로 신선한 해삼과 죽은 해삼을 극명하게 대비시켜 고객의 불안을 자극하고 문제 인식을 유도합니다.

### 레이아웃 가이드

- **배치:**
  - 좌측 50%: 생동감 넘치는 신선한 해삼 (윤기, 촉감 강조)
  - 우측 50%: 죽은 해삼/터진 해삼 (탁한 색, 손상 부위)
  - 중앙 세로 분할선: 얇은 골드 라인 (1px)
  - 상단 헤드라인: 중앙 배치, 양쪽 이미지 걸침
  - 하단 서브카피: 중앙 하단, 반투명 블랙 배경

- **폰트:**
  - 헤드라인: 32px / Bold / 화이트
  - 키워드 강조: "죽은 해삼" → 빨간색 (#e63946)
  - 서브카피: 15px / Regular / 라이트 그레이 (#e0e0e0)

- **여백·강조:**
  - 상단 여백: 40px
  - 헤드라인 하단 여백: 20px
  - 이미지 좌우 패딩: 0 (풀블리드)
  - 좌측 이미지에 "FRESH" 워터마크 (골드, 투명도 30%)
  - 우측 이미지에 "X" 마크 (빨간색, 크게)

### 나노 바나나 이미지 프롬프트

**모델:** Nano Banana Pro

**프롬프트 (좌측 - 신선한 해삼):**
```
A premium fresh sea cucumber on a dark navy blue background (#1a1f2e), studio photography, top-down 45-degree angle, professional food photography, dramatic side lighting from top-left creating highlights on the glossy textured surface, the sea cucumber is dark brown with natural bumpy texture, glistening and alive, water droplets on surface showing ultimate freshness, shallow depth of field, high-end restaurant quality, cinematic lighting, shot on Phase One camera, 3:4 aspect ratio, moody and luxurious atmosphere
```

**프롬프트 (우측 - 죽은 해삼):**
```
A dead or damaged sea cucumber on a matte black background (#0d0d0d), dull and lifeless appearance, split or torn parts visible, discolored pale brown tone, dry surface without shine, top-down view, harsh flat lighting showing all the flaws, warning visual for food quality issue, 3:4 aspect ratio, desaturated color tone, disappointing food photography
```

**수정 팁:**
- 대조가 약하면: "increase contrast between left and right, make the fresh one more glossy, the dead one more dull"
- 분할선 추가: Figma/Photoshop에서 후작업으로 골드 라인 추가
- 텍스트 레이어: "당신이 먹은 해삼, 혹시 죽은 해삼 아니었나요?" 텍스트는 디자인 툴에서 오버레이

---

## ZONE 2: 문제 인식 (3~10초)

### 이미지 컨셉

고객의 과거 실패 경험을 시각화하여 공감을 유도합니다. 체크박스 형식의 인포그래픽과 함께 실제 불만족스러운 해삼 이미지를 배치하여 "나도 그랬어!" 반응을 이끌어냅니다.

### 레이아웃 가이드

- **배치:**
  - 배경: 딥 네이비 (#1a1f2e)
  - 상단: "이런 경험, 한 번쯤 있으시죠?" 타이틀
  - 중단: 3개 카드 세로 배열 (각 카드 높이 140px)
    - 카드 1: 냉동 해삼 문제
    - 카드 2: 터진 해삼 문제
    - 카드 3: 냄새 문제
  - 각 카드 좌측: 체크박스 아이콘 (빨간색 X 표시)
  - 각 카드 우측: 간략한 이미지 썸네일

- **폰트:**
  - 타이틀: 26px / Bold / 화이트
  - 카드 내 텍스트: 16px / Medium / 라이트 그레이
  - 강조 키워드: "물렁물렁", "터져있어서", "냄새" → 빨간색

- **여백·강조:**
  - 존 상단 여백: 60px
  - 타이틀 하단 여백: 30px
  - 카드 간 간격: 15px
  - 카드 내부 패딩: 20px
  - 카드 배경: 반투명 블랙 (#0d0d0d, 투명도 60%)

### 나노 바나나 이미지 프롬프트

**모델:** Nano Banana Pro

**프롬프트 (체크박스 인포그래픽):**
```
A modern dark-themed infographic showing 3 common sea cucumber quality problems, vertical layout, each problem in a card format with red X checkbox icon on the left, dark navy blue background (#1a1f2e), semi-transparent black cards (#0d0d0d), clean minimalist design, icons in red (#e63946) and white (#ffffff), professional UI design, flat design style, 3:4 aspect ratio, premium e-commerce visual
```

**프롬프트 (문제 상황 이미지 - 배경용):**
```
Disappointment concept with low-quality frozen sea cucumber, close-up shot, unappetizing appearance, muted colors, soft focus on defective parts, dark background, moody lighting, 3:4 aspect ratio, subtle composition for background use
```

**수정 팁:**
- 카드가 눈에 안 띄면: "make the cards more prominent with subtle border glow in gold"
- 체크박스 크기 조정: 디자인 툴에서 아이콘 크기 조정 후 배치
- 텍스트 추가: 각 카드에 해당하는 텍스트는 후작업으로 추가

---

## ZONE 3: 솔루션 (10~30초)

### 이미지 컨셉

USP 3가지를 카드 형식으로 명확하게 제시합니다. 해녀 채취 현장, 선별 과정 등 실제 프로세스를 담은 사진과 함께 신뢰와 차별성을 동시에 구축합니다.

### 레이아웃 가이드

- **배치:**
  - 배경: 매트 블랙 (#0d0d0d)
  - 상단: "이것이 진짜 신선한 해삼입니다" 타이틀 (골드 컬러)
  - 중단: 3개 USP 카드 (각 카드 높이 180px)
    - 카드 1: 당일 발송 시스템 (시계 아이콘)
    - 카드 2: A급 선별 (체크마크 아이콘)
    - 카드 3: 통영 자연산 (별 아이콘)
  - 하단: 해녀 채취 현장 대형 이미지 (풀블리드)

- **폰트:**
  - 타이틀: 26px / Bold / 골드 (#d4af37)
  - 카드 헤드라인: 20px / Bold / 화이트
  - 카드 설명: 14px / Regular / 라이트 그레이
  - 아이콘: 40px 크기

- **여백·강조:**
  - 존 상단 여백: 60px
  - 타이틀 하단 여백: 30px
  - 카드 간 간격: 20px
  - 카드 배경: 딥 네이비 (#1a1f2e)
  - 카드 테두리: 골드 라인 (1px)
  - 하단 이미지 상단 여백: 40px

### 나노 바나나 이미지 프롬프트

**모델:** Nano Banana

**프롬프트 (해녀 채취 현장):**
```
A professional haenyeo (Korean female diver) just surfaced from the ocean holding fresh sea cucumbers, early morning golden hour lighting, Tongyeong sea in background, authentic documentary style photography, the haenyeo wearing traditional wetsuit, water droplets glistening, basket full of fresh dark brown sea cucumbers, cinematic composition, natural colors, shallow depth of field focusing on the sea cucumbers, shot on Canon EOS R5, 3:4 aspect ratio, inspirational and trustworthy atmosphere
```

**프롬프트 (선별 과정):**
```
Close-up of experienced hands sorting premium grade sea cucumbers on a stainless steel table, professional seafood processing environment, clean and hygienic setup, bright overhead lighting, only the best A-grade sea cucumbers being selected, dark navy background, detailed texture of sea cucumber skin visible, professional food industry photography, 3:4 aspect ratio, trustworthy and meticulous atmosphere
```

**수정 팁:**
- 해녀 얼굴이 너무 강조되면: "focus more on the sea cucumbers in basket, make haenyeo slightly out of focus"
- 시간대 조정: "change to afternoon lighting" 또는 "make it more dramatic with sunset"
- 아이콘: Figma/디자인 툴에서 시계, 체크마크, 별 아이콘 별도 제작 후 오버레이

---

## ZONE 4: 신뢰 구축 (30~60초)

### 이미지 컨셉

실제 고객 후기와 함께 받은 해삼 사진, 해녀 인터뷰를 배치하여 사회적 증거를 제공합니다. 진짜 고객의 목소리를 담은 따뜻한 비주얼로 신뢰를 강화합니다.

### 레이아웃 가이드

- **배치:**
  - 배경: 딥 네이비 (#1a1f2e)
  - 상단: "고객님들의 생생한 후기" 타이틀
  - 중단: 3개 후기 카드 세로 배열 (각 높이 200px)
    - 좌측: 고객이 받은 해삼 실사진 (정사각형 썸네일)
    - 우측: 별점 5점 + 후기 텍스트
  - 하단: 해녀 인터뷰 박스 (배경 차콜 그레이)
    - 좌측: 해녀 프로필 사진 (원형)
    - 우측: 인터뷰 한 줄 인용문

- **폰트:**
  - 타이틀: 26px / Bold / 화이트
  - 후기 텍스트: 15px / Regular / 라이트 그레이
  - 강조 키워드: "신선", "쫄깃", "재주문" → 골드
  - 별점: 20px / 골드 색상
  - 인터뷰 인용문: 18px / Medium / 화이트

- **여백·강조:**
  - 존 상단 여백: 60px
  - 타이틀 하단 여백: 30px
  - 후기 카드 간격: 20px
  - 카드 내부 패딩: 15px
  - 카드 배경: 반투명 블랙 (#0d0d0d, 투명도 50%)
  - 해녀 인터뷰 박스 상단 여백: 40px
  - 인터뷰 박스 패딩: 20px

### 나노 바나나 이미지 프롬프트

**모델:** Nano Banana

**프롬프트 (고객이 받은 해삼 실사진):**
```
Unboxing photo of premium sea cucumbers delivered to customer's home, overhead flat lay shot, the sea cucumbers in a clean plastic container with ice packs, fresh and glistening appearance, natural home lighting, authentic customer photo style (not too perfect, realistic), smartphone photography quality, casual but clean composition, 1:1 aspect ratio for thumbnail use, trustworthy and relatable vibe
```

**프롬프트 (해녀 인터뷰 사진):**
```
Portrait of a kind-looking middle-aged Korean haenyeo (female diver) in her 50s, wearing traditional diving wetsuit, warm and trustworthy smile, natural outdoor lighting, Tongyeong coastal village background slightly blurred, close-up portrait, shot on 85mm lens, shallow depth of field, authentic documentary style, 1:1 aspect ratio for circular profile photo, professional yet approachable atmosphere
```

**수정 팁:**
- 고객 사진이 너무 프로페셔널하면: "make it look more like a real customer's smartphone photo, less professional"
- 해녀 표정: "make her smile more warm and friendly" 또는 "add wrinkles to show experience"
- 별점 그래픽: 디자인 툴에서 골드 별 아이콘 5개 배치

---

## ZONE 5: 전환 유도 (60초~)

### 이미지 컨셉

가격 앵커링과 긴급성을 시각적으로 극대화합니다. 취소선 가격과 할인가의 대비, 타이머 효과, 그리고 해삼 요리 완성 비주얼로 구매 욕구를 최고조로 끌어올립니다.

### 레이아웃 가이드

- **배치:**
  - 배경: 매트 블랙 (#0d0d0d)
  - 상단: 가격 앵커링 박스 (중앙 배치, 골드 테두리)
    - "백화점 가격: ~~98,000원~~" (작게, 취소선)
    - "일반 가격: ~~79,000원~~" (중간, 취소선)
    - "오늘만 특가: 49,000원" (크게, 빨간색)
  - 중단: 긴급성 메시지
    - "오늘 주문 시 내일 도착" + 시계 아이콘
    - "하루 한정 50세트" + 재고 바 그래픽
  - 하단: CTA 버튼 (초대형, 골드 배경)
    - "지금 바로 주문하기"
  - 최하단: 보너스 이미지 - 해삼 요리 3종 (탕/죽/초회)

- **폰트:**
  - 취소선 가격: 18px / Regular / 라이트 그레이
  - 할인가: 48px / Bold / 빨간색 (#e63946)
  - 긴급성 텍스트: 16px / Medium / 화이트
  - CTA 버튼: 20px / Bold / 블랙 (배경 골드)

- **여백·강조:**
  - 존 상단 여백: 60px
  - 가격 박스 패딩: 30px
  - 가격 박스 하단 여백: 30px
  - 긴급성 메시지 간격: 15px
  - CTA 버튼 상단 여백: 40px
  - CTA 버튼 크기: 전체 폭 (패딩 20px), 높이 60px
  - 버튼 하단 여백: 40px
  - 요리 이미지 상단 여백: 30px

### 나노 바나나 이미지 프롬프트

**모델:** Nano Banana

**프롬프트 (해삼탕):**
```
A premium sea cucumber soup (haesam-tang) in a traditional Korean earthenware pot (ttukbaegi), steaming hot with visible steam rising, clear broth with chunks of fresh sea cucumber, garnished with chopped green onions and sesame seeds, dark background (#1a1f2e), professional food photography, top-down 30-degree angle, dramatic side lighting from left, elegant presentation, restaurant-quality plating, shot on macro lens, 3:4 aspect ratio, luxurious and appetizing atmosphere
```

**프롬프트 (해삼죽):**
```
A bowl of premium sea cucumber porridge (haesam-juk), creamy white rice porridge with visible chunks of fresh sea cucumber, served in a white ceramic bowl on dark navy background, garnished with sesame oil drizzle and black sesame seeds, steam rising, professional food photography, 45-degree angle, soft diffused lighting, high-end Korean restaurant style, 3:4 aspect ratio, comforting and luxurious vibe
```

**프롬프트 (해삼초회):**
```
Fresh sea cucumber sashimi (haesam-chohoe) elegantly plated on a black slate plate, thinly sliced sea cucumber with beautiful translucent texture, accompanied by Korean vinegar chili sauce (chogochujang) in a small dish, garnished with julienned cucumber and sesame seeds, dark background, professional food photography, top-down view, dramatic lighting highlighting the glossy texture, high-end Japanese-Korean fusion cuisine style, 3:4 aspect ratio, premium and appetizing presentation
```

**수정 팁:**
- 스팀 효과 약하면: "increase steam effect, make it more dramatic and visible"
- 조명 조정: "add more rim light to emphasize the glossy texture"
- 3개 요리 배치: Figma에서 3분할 레이아웃으로 조합 (각 240px 폭)

---

## ZONE 6: 반론 처리 (마지막)

### 이미지 컨셉

마지막 의심을 해소하는 안심 존. 환불 보장 배지, FAQ 섹션, 신뢰 인증 마크 등으로 구매 전 불안을 제거하고 최종 전환을 유도합니다.

### 레이아웃 가이드

- **배치:**
  - 배경: 딥 네이비 (#1a1f2e)
  - 상단: 100% 환불 보장 박스 (중앙, 골드 테두리)
    - 큰 배지 아이콘 (방패 모양, 골드)
    - "100% 만족 못하시면 전액 환불"
    - "신선도에 확신이 있기에 가능한 약속"
  - 중단: FAQ 3개 아코디언 스타일
    - Q: "정말 당일 발송인가요?"
    - Q: "배송 중 상할 수 있나요?"
    - Q: "요리가 어려운데..."
  - 하단: 신뢰 마크 3개 가로 배열
    - "안전거래 인증"
    - "신선도 보증"
    - "고객만족 1위"

- **폰트:**
  - 환불 보장 타이틀: 24px / Bold / 골드
  - 환불 보장 설명: 15px / Regular / 라이트 그레이
  - FAQ 질문: 16px / SemiBold / 화이트
  - FAQ 답변: 14px / Regular / 라이트 그레이
  - 신뢰 마크 텍스트: 12px / Medium / 화이트

- **여백·강조:**
  - 존 상단 여백: 60px
  - 환불 보장 박스 패딩: 30px
  - 배지 아이콘 크기: 80px
  - 환불 박스 하단 여백: 40px
  - FAQ 간격: 15px
  - FAQ 내부 패딩: 20px
  - FAQ 하단 여백: 40px
  - 신뢰 마크 간격: 10px
  - 하단 패딩: 60px

### 나노 바나나 이미지 프롬프트

**모델:** Nano Banana Pro

**프롬프트 (100% 환불 보장 배지):**
```
A premium quality guarantee badge icon, shield shape in luxurious gold color (#d4af37), "100% SATISFACTION GUARANTEED" text in English and Korean, elegant and trustworthy design, dark navy background (#1a1f2e), professional badge design with subtle metallic gradient, certificate style, high-quality rendering, clean vector-like appearance, 3:4 aspect ratio, luxury brand identity style
```

**프롬프트 (신선도 보증 씬):**
```
A premium insulated shipping box with ice packs, showing the careful packaging process for fresh sea cucumbers, the box is open revealing sea cucumbers in a clean container surrounded by ice packs, temperature monitoring sticker visible, professional product photography, clean white and silver packaging with brand colors (navy and gold), studio lighting, 3:4 aspect ratio, trustworthy and professional presentation
```

**수정 팁:**
- 배지가 촌스러우면: "make it more minimalist and modern, less ornate"
- 포장 이미지가 복잡하면: "simplify the composition, focus on the key elements only"
- FAQ 아이콘: 디자인 툴에서 질문 마크 아이콘 추가 (골드 색상)

---

## 이미지 생성 순서 추천

### 우선순위 1 (핵심 전환 이미지)
1. **ZONE 1 - 신선한 vs 죽은 해삼 대비** (최우선)
2. **ZONE 5 - 해삼 요리 3종** (구매 욕구 직접 자극)
3. **ZONE 3 - 해녀 채취 현장** (신뢰 구축 핵심)

### 우선순위 2 (신뢰 강화)
4. **ZONE 4 - 고객 받은 해삼 실사진** (사회적 증거)
5. **ZONE 4 - 해녀 인터뷰 사진** (권위 구축)
6. **ZONE 6 - 포장/배송 사진** (안심 유도)

### 우선순위 3 (보조 그래픽)
7. **ZONE 2 - 문제 인포그래픽 배경**
8. **ZONE 3 - 선별 과정 사진**
9. **ZONE 6 - 환불 보장 배지**

### 제작 팁
- **1~3번 먼저 생성**: 이미지 톤/무드 일관성 확인 후 나머지 진행
- **조명 통일**: 모든 이미지에 "dramatic side lighting" 키워드 유지
- **배경 통일**: 딥 네이비/매트 블랙 2가지 배경으로 통일감 유지
- **후보 생성**: 중요 이미지는 2~3개 후보 생성 후 선택

---

## 제작 시 주의사항

### 모바일 최적화
- **가로 720px 고정**, 세로는 콘텐츠에 따라 유동적
- **텍스트 최소 크기**: 13px (가독성 보장)
- **터치 영역**: 버튼 최소 높이 44px
- **이미지 용량**: 각 이미지 최대 500KB (WebP 권장)

### 브랜드 일관성
- **컬러**: 브랜드 팔레트 외 색상 사용 금지
- **폰트**: Pretendard 단일 폰트 사용 (웹폰트 로딩 최적화)
- **톤앤매너**: 친근한 전문가 톤 유지 (반말 금지, 존댓말 사용)

### 접근성
- **대비율**: 텍스트-배경 대비 최소 4.5:1 (WCAG AA 기준)
- **핵심 정보**: 이미지 내 텍스트 최소화, HTML 텍스트 우선
- **대체 텍스트**: 모든 이미지에 alt 속성 필수

### 나노 바나나 생성 팁
- **첫 생성**: 프롬프트 그대로 입력
- **1차 수정**: "make it more [키워드]" 형식 추가
- **2차 수정**: 구체적 요소 지정 (예: "brighten the top-left corner")
- **최종 조정**: Figma/Photoshop에서 세밀한 조정

---

**작성 완료일:** 2026-03-20
**다음 단계:** Gemini Nano Banana로 이미지 생성 → Figma 조합 → HTML/CSS 코딩
