# 메타광고 컨텐츠 Input 폴더

이 폴더에는 광고 소재 제작을 위한 기초 자료가 저장됩니다.

## 📁 템플릿 파일

```
input/meta-ad/
├── README.md                          # 이 파일
├── product-info-template.md           # 제품 정보 템플릿
├── smartstore-reviews-template.md     # 리뷰 분석 템플릿
└── competitor-ads-template.md         # 경쟁사 광고 분석 템플릿
```

## 🚀 빠른 시작

### Step 1: 템플릿 파일 복사 및 작성

각 템플릿 파일을 복사하여 실제 프로젝트명으로 저장하세요:

```bash
# 예시: "프리미엄 가죽 지갑" 제품의 경우
cp product-info-template.md product-info-가죽지갑.md
cp smartstore-reviews-template.md smartstore-reviews-가죽지갑.md
cp competitor-ads-template.md competitor-ads-가죽지갑.md
```

### Step 2: 각 파일 작성

1. **product-info-[제품명].md**
   - 제품 기본 정보 (이름, 가격, 특징)
   - 타겟 고객
   - 경쟁 우위
   - 프로모션 정보

2. **smartstore-reviews-[제품명].md**
   - 스마트스토어/쿠팡 리뷰 수집 (최소 50개)
   - 긍정/부정 키워드 분석
   - 리뷰 인용 후보 선정

3. **competitor-ads-[제품명].md**
   - 메타광고 라이브러리에서 경쟁사 광고 수집 (최소 10개)
   - 광고 패턴 분석
   - 성공 전략 도출

### Step 3: AI 프롬프트 실행

[meta-contents.md](../../meta-contents.md) 파일의 프롬프트를 순서대로 실행하세요.

---

## 💡 작성 팁

### 제품 정보 작성 시
- 구체적인 숫자 활용 (예: "30% 할인", "5만원 이상 무료배송")
- 타겟 고객을 명확하게 정의
- 경쟁사 대비 차별점을 3가지 이상 작성

### 리뷰 수집 시
- 최신 리뷰 우선 (최근 3개월 이내)
- 긍정/부정 리뷰 골고루 수집
- 별점별로 고르게 분포 (5점, 4점, 3점 등)
- 사진/영상 포함 리뷰 우선

### 경쟁사 광고 분석 시
- 메타광고 라이브러리: https://www.facebook.com/ads/library/
- "모든 광고" 탭에서 검색
- 오래 게재 중인 광고 = 성과 좋은 광고
- 여러 버전 테스트 중인 광고주 = 참고 가치 높음

---

## ⚠️ 주의사항

1. **개인정보 보호**
   - 리뷰 작성자 실명은 익명 처리 (예: "홍길동" → "홍*동")
   - 전화번호, 이메일 등 개인정보 제거

2. **저작권**
   - 경쟁사 광고 이미지는 참고만 하고 직접 사용 금지
   - 리뷰 인용 시 출처 명시 권장

3. **데이터 정확성**
   - 판매량, 평점 등은 실제 데이터 사용
   - 거짓 정보는 법적 문제 발생 가능

---

**다음 단계**: 작성 완료 후 [meta-contents.md](../../meta-contents.md)의 AI 프롬프트를 실행하여 광고 소재를 생성하세요.
