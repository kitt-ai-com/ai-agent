# 메타광고 컨텐츠 Output 폴더

이 폴더에는 AI 프롬프트를 실행한 결과물이 저장됩니다.

## 📁 파일 구조

```
output/meta-ad/
├── README.md                    # 이 파일
├── analysis-report.md           # 소구점 + 리뷰 + 경쟁사 종합 분석
├── ad-copy-v1.md                # 버전1: 짧은 문구 (30자 이상) × 10개
├── ad-copy-v2.md                # 버전2: 롱카피 (100자 이상) × 10개
├── roas-strategy.md             # ROAS 극대화 전략서
└── final-recommendation.md      # 최종 추천 소재 및 실행 계획
```

## 🔄 작업 순서

1. **input/meta-ad/** 폴더의 템플릿 파일 작성
   - `product-info-template.md` → 실제 제품 정보로 채우기
   - `smartstore-reviews-template.md` → 리뷰 데이터 입력
   - `competitor-ads-template.md` → 경쟁사 광고 분석 작성

2. **meta-contents.md**의 AI 프롬프트 순서대로 실행
   - 프롬프트 1 → `analysis-report.md` 생성
   - 프롬프트 2 → `analysis-report.md`에 경쟁사 분석 추가
   - 프롬프트 3 → `ad-copy-v1.md` 생성
   - 프롬프트 4 → `ad-copy-v2.md` 생성
   - 프롬프트 5 → `roas-strategy.md` 생성

3. **최종 정리**
   - 모든 결과를 바탕으로 `final-recommendation.md` 작성
   - 실제 메타광고 캠페인 진행

## 💡 사용 팁

- 각 파일은 독립적으로 사용 가능하지만, 순서대로 작성하는 것이 효율적입니다
- 프롬프트 실행 시 생성된 내용을 그대로 복사하여 해당 파일에 저장하세요
- 성과 데이터를 지속적으로 업데이트하여 최적화하세요

## 📊 성과 트래킹

작업 완료 후 아래 체크리스트를 확인하세요:

- [ ] 분석 리포트 완성 (`analysis-report.md`)
- [ ] 버전1 광고 소재 10개 완성 (`ad-copy-v1.md`)
- [ ] 버전2 광고 소재 10개 완성 (`ad-copy-v2.md`)
- [ ] ROAS 전략 수립 (`roas-strategy.md`)
- [ ] 최종 실행 계획 수립 (`final-recommendation.md`)
- [ ] 메타광고 캠페인 세팅 완료
- [ ] A/B 테스트 시작
- [ ] 성과 측정 및 최적화

---

**버전**: 1.0
**최종 수정일**: 2026-03-04
