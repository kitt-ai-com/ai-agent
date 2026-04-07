# 개선된 ROAS 리포트 가이드

## 📋 개요

`meta-ad-analysis-prompt.md`의 프레임워크를 적용하여 더 상세하고 실행 가능한 리포트를 생성합니다.

## 🎯 주요 개선사항

### 1. 업종별 벤치마크 적용

**이전**:
```
CTR: 4.53%
CPC: ₩385
```

**개선 후**:
```
| 지표 | 실적 | 업계 평균 | 평가 |
|------|------|----------|------|
| CTR | 4.53% | 1.0-2.0% | 🟢 우수 |
| CPC | ₩385 | ₩500-1,500 | 🟢 우수 (저비용) |
```

### 2. 3단계 평가 시스템

- 🟢 **우수** - 업계 상위 25%
- 🟡 **보통** - 업계 평균 수준
- 🔴 **개선 필요** - 업계 하위 25%, 즉시 조치 필요

### 3. 핵심 인사이트 자동 생성

**강점 (긍정적 인사이트)**:
```
✅ 강점 1: "260220_가격_영상" 광고의 전환율이 2.34%로 우수
   → 이유: 타겟팅이 정확하고 소재 품질이 높음
   → 활용: 이 광고의 타겟팅과 소재를 다른 광고에도 적용
```

**약점 (개선 필요)**:
```
🔴 문제점 1: 전환율 0% 광고가 14개로 총 ₩1,832,202 지출
   → 원인: 랜딩 페이지 문제 또는 타겟팅 미스매치
   → 해결:
      1. 랜딩 페이지 로딩 속도 및 UX 점검
      2. 타겟팅 오디언스 재검토
      3. 7일 이내 개선 안 되면 중단
   → 우선순위: 높음
```

### 4. 실행 가능한 액션 플랜

**3단계 타임라인**:

1. **즉시 실행 (1-3일)** - 우선순위 높음, 빠른 효과
2. **단기 실행 (1-2주)** - 중요하지만 준비 필요
3. **중기 실행 (1개월)** - 구조적 개선

**테이블 형식**:
```
| 액션 | 목표 | 예상 효과 | 담당 |
|------|------|----------|------|
| 저성과 광고 3개 중단 | 예산 낭비 방지 | 월 ₩730만원 절감 | 마케터 |
| 고성과 광고 예산 +30% | ROAS 개선 | ROAS +15%p | 마케터 |
```

### 5. 실행 체크리스트

**4단계 체크리스트**:
- ☑️ 즉시 실행 (1-3일)
- ☑️ 단기 실행 (1-2주)
- ☑️ 중기 실행 (1개월)
- ☑️ 지속적 모니터링

## 📊 업종별 벤치마크

### 이커머스
| 지표 | 범위 |
|------|------|
| CTR | 1.0-1.5% |
| CPC | ₩500-1,000 |
| ROAS | 250-400% |

### 패션
| 지표 | 범위 |
|------|------|
| CTR | 1.2-2.0% |
| CPC | ₩600-1,200 |
| ROAS | 300-500% |

### 식품
| 지표 | 범위 |
|------|------|
| CTR | 0.8-1.3% |
| CPC | ₩400-800 |
| ROAS | 200-350% |

### 뷰티
| 지표 | 범위 |
|------|------|
| CTR | 1.5-2.5% |
| CPC | ₩700-1,500 |
| ROAS | 350-600% |

### 건강기능식품
| 지표 | 범위 |
|------|------|
| CTR | 0.7-1.0% |
| CPC | ₩800-2,000 |
| ROAS | 200-300% |

> ⚠️ 업종, 제품 가격대, 타겟에 따라 크게 달라질 수 있음

## 🔄 리포트 구조

### 기존 리포트
```
1. 제목
2. 업체별 요약
3. 개선 권장 광고 목록
4. 실행 가이드
```

### 개선된 리포트
```
1. 📊 Executive Summary (경영진용 요약)
   - 전체 성과 평가 (벤치마크 비교)
   - 핵심 인사이트 3가지

2. 💡 인사이트
   - 긍정적 인사이트 (강점)
   - 개선 필요 영역 (약점)

3. 📊 업체별 상세 분석
   - 문제 광고 목록
   - 각 광고별 상세 지표

4. ⚡ 액션 플랜
   - 즉시 실행 (1-3일)
   - 단기 실행 (1-2주)
   - 중기 실행 (1개월)

5. ✅ 실행 체크리스트
   - 단계별 체크리스트
   - 다음 분석 시점
```

## 💻 사용 방법

### 1. 라이브러리로 사용

```python
from enhanced_roas_report import (
    evaluate_metric,
    generate_executive_summary,
    generate_actionable_insights,
    generate_action_plan,
    generate_checklist
)

# 지표 평가
emoji, label, desc = evaluate_metric(
    value=4.53,           # CTR
    benchmark_min=1.0,
    benchmark_max=2.0,
    lower_is_better=False
)
# 결과: ("🟢", "우수", "업계 평균 이상")

# Executive Summary 생성
summary = generate_executive_summary(client_data, period="일일")

# 인사이트 생성
insights = generate_actionable_insights(roas_off_ads)

# 액션 플랜 생성
action_plan = generate_action_plan(roas_off_ads)

# 체크리스트 생성
checklist = generate_checklist()
```

### 2. 기존 스크립트에 통합

`scripts/daily_roas_analysis.py`에서 import:

```python
import sys
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))
from enhanced_roas_report import *

# 리포트 생성 시 사용
md = generate_executive_summary(client_data)
md += generate_actionable_insights(all_results)
md += generate_action_plan(all_results)
md += generate_checklist()
```

## 📈 예상 효과

### 의사결정 속도 향상
- **이전**: 데이터 확인 → 분석 → 판단 → 실행 (1-2일)
- **개선**: 리포트 확인 → 즉시 실행 (1-2시간)

### 실행률 향상
- **이전**: 리포트 작성 후 실행률 30-40%
- **개선**: 체크리스트 제공으로 실행률 70-80%

### ROAS 개선
- **단기 (1주)**: +5-10%p (즉시 실행 액션)
- **중기 (1개월)**: +15-25%p (구조적 개선)
- **장기 (3개월)**: +30-50%p (지속적 최적화)

## 🎯 다음 단계

### Phase 1: 기본 통합 (완료)
- [x] 전환 지표 추가
- [x] 벤치마크 기준 설정
- [x] 업체별 리포트 구조

### Phase 2: 고급 분석 (진행 중)
- [x] Enhanced report module 생성
- [ ] Executive summary 자동 생성
- [ ] 인사이트 자동 도출
- [ ] 액션 플랜 자동 생성

### Phase 3: AI 인사이트 (예정)
- [ ] GPT-4 기반 인사이트 생성
- [ ] 업종별 맞춤 권장사항
- [ ] 예측 분석 (30일 성과 예측)
- [ ] 자동 A/B 테스트 제안

## 📚 참고 문서

- [meta_md/02_프롬프트/meta-ad-analysis-prompt.md](../meta_md/02_프롬프트/meta-ad-analysis-prompt.md) - 원본 분석 프레임워크
- [CONVERSION_METRICS.md](CONVERSION_METRICS.md) - 전환 지표 가이드
- [ROAS_SCHEDULE.md](ROAS_SCHEDULE.md) - 자동화 스케줄
- [NOTION_CLIENT_SETUP.md](NOTION_CLIENT_SETUP.md) - Notion 설정

---

**마지막 업데이트**: 2026-03-24
**버전**: 3.0 (Enhanced Report)
