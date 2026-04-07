#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
개선된 ROAS 리포트 생성기
meta-ad-analysis-prompt.md 기반
"""

# 업종별 벤치마크 (meta-ad-analysis-prompt.md 기준)
INDUSTRY_BENCHMARKS = {
    "이커머스": {
        "CTR": {"min": 1.0, "max": 1.5},
        "CPC_KRW": {"min": 500, "max": 1000},
        "ROAS": {"min": 250, "max": 400},
    },
    "패션": {
        "CTR": {"min": 1.2, "max": 2.0},
        "CPC_KRW": {"min": 600, "max": 1200},
        "ROAS": {"min": 300, "max": 500},
    },
    "식품": {
        "CTR": {"min": 0.8, "max": 1.3},
        "CPC_KRW": {"min": 400, "max": 800},
        "ROAS": {"min": 200, "max": 350},
    },
    "뷰티": {
        "CTR": {"min": 1.5, "max": 2.5},
        "CPC_KRW": {"min": 700, "max": 1500},
        "ROAS": {"min": 350, "max": 600},
    },
    "건강기능식품": {
        "CTR": {"min": 0.7, "max": 1.0},
        "CPC_KRW": {"min": 800, "max": 2000},
        "ROAS": {"min": 200, "max": 300},
    },
}

# 기본 벤치마크 (업종 미지정 시)
DEFAULT_BENCHMARK = {
    "CTR": {"min": 1.0, "max": 2.0},
    "CPC_KRW": {"min": 500, "max": 1500},
    "CPM_KRW": {"min": 5000, "max": 10000},
    "CVR": {"min": 1.0, "max": 3.0},
    "ROAS": {"min": 200, "max": 400},
}


def evaluate_metric(value, benchmark_min, benchmark_max, lower_is_better=False):
    """
    지표를 벤치마크와 비교하여 평가

    Returns:
        tuple: (emoji, label, description)
    """
    if lower_is_better:
        if value <= benchmark_min:
            return "🟢", "우수", f"업계 평균 이하로 매우 효율적"
        elif value <= benchmark_max:
            return "🟡", "보통", f"업계 평균 수준"
        else:
            return "🔴", "개선 필요", f"업계 평균 초과, 최적화 필요"
    else:
        if value >= benchmark_max:
            return "🟢", "우수", f"업계 평균 이상"
        elif value >= benchmark_min:
            return "🟡", "보통", f"업계 평균 수준"
        else:
            return "🔴", "개선 필요", f"업계 평균 미만, 개선 필요"


def generate_executive_summary(client_data, period="일일"):
    """
    경영진용 요약 리포트 생성 (1페이지)
    """
    total_spend = sum(ad['spend'] for ad in client_data['ads'])
    total_impressions = sum(ad['impressions'] for ad in client_data['ads'])
    total_clicks = sum(ad['clicks'] for ad in client_data['ads'])
    total_conversions = sum(ad['conversions'] for ad in client_data['ads'])

    avg_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    avg_cpc = (total_spend / total_clicks) if total_clicks > 0 else 0
    avg_cvr = (total_conversions / total_clicks * 100) if total_clicks > 0 else 0

    currency = client_data['currency']
    spend_str = f"₩{total_spend:,.0f}" if currency == "KRW" else f"${total_spend:,.2f}"

    # 벤치마크 평가
    ctr_eval = evaluate_metric(avg_ctr, 1.0, 2.0, lower_is_better=False)
    cpc_eval = evaluate_metric(avg_cpc, 500, 1500, lower_is_better=True) if currency == "KRW" else evaluate_metric(avg_cpc, 0.5, 1.5, lower_is_better=True)

    summary = f"""# 📊 메타광고 성과 분석 - {period} 리포트

**분석 대상**: {client_data['name']}
**분석 기간**: {period}
**총 지출**: {spend_str}
**총 광고**: {len(client_data['ads'])}개

## 전체 성과 평가

| 지표 | 실적 | 업계 평균 | 평가 |
|------|------|----------|------|
| CTR | {avg_ctr:.2f}% | 1.0-2.0% | {ctr_eval[0]} {ctr_eval[1]} |
| CPC | {spend_str if currency == "KRW" else f"${avg_cpc:.2f}"} | {"₩500-1,500" if currency == "KRW" else "$0.5-1.5"} | {cpc_eval[0]} {cpc_eval[1]} |
| 전환수 | {total_conversions:,.0f}건 | - | - |
| 전환율 | {avg_cvr:.2f}% | 1.0-3.0% | - |

## 핵심 인사이트 3가지

"""

    return summary


def generate_actionable_insights(roas_off_ads):
    """
    실행 가능한 인사이트 생성
    """
    insights = """
## 💡 핵심 인사이트

### 긍정적 인사이트 (강점)

"""

    # 강점 찾기 (전환율이 높은 광고들)
    good_cvr_ads = [ad for ad in roas_off_ads if ad.get('cvr', 0) > 2.0]
    if good_cvr_ads:
        best_ad = max(good_cvr_ads, key=lambda x: x['cvr'])
        insights += f"""✅ 강점 1: "{best_ad['ad_name'][:30]}..." 광고의 전환율이 {best_ad['cvr']:.2f}%로 우수
   → 이유: 타겟팅이 정확하고 소재 품질이 높음
   → 활용: 이 광고의 타겟팅과 소재를 다른 광고에도 적용

"""

    insights += """
### 🔴 개선 필요 영역 (약점)

"""

    # 약점 찾기 (전환율이 0%인 광고들)
    zero_cvr_ads = [ad for ad in roas_off_ads if ad.get('cvr', 0) == 0 and ad['clicks'] > 10]
    if zero_cvr_ads:
        total_waste = sum(ad['spend'] for ad in zero_cvr_ads)
        currency = zero_cvr_ads[0]['currency']
        waste_str = f"₩{total_waste:,.0f}" if currency == "KRW" else f"${total_waste:,.2f}"

        insights += f"""🔴 문제점 1: 전환율 0% 광고가 {len(zero_cvr_ads)}개로 총 {waste_str} 지출
   → 원인: 랜딩 페이지 문제 또는 타겟팅 미스매치
   → 해결:
      1. 랜딩 페이지 로딩 속도 및 UX 점검
      2. 타겟팅 오디언스 재검토
      3. 7일 이내 개선 안 되면 중단
   → 우선순위: 높음

"""

    # 높은 CPM 광고
    high_cpm_ads = [ad for ad in roas_off_ads if ad.get('cpm', 0) > 20000]
    if high_cpm_ads:
        insights += f"""🔴 문제점 2: 높은 CPM (₩20,000 초과) 광고 {len(high_cpm_ads)}개
   → 원인: 타겟 오디언스 경쟁 과다 또는 광고 피로도
   → 해결:
      1. 타겟팅 범위 조정 (경쟁 낮은 세그먼트 발굴)
      2. 소재 교체 (신선도 개선)
      3. 입찰 전략 변경 (타겟 ROAS → 최소 ROAS)
   → 우선순위: 중간

"""

    return insights


def generate_action_plan(roas_off_ads):
    """
    실행 가능한 액션 플랜 생성
    """
    plan = """
## ⚡ 액션 플랜

### 즉시 실행 (1-3일 내)

**우선순위 높음, 빠른 효과**

| 액션 | 목표 | 예상 효과 | 담당 |
|------|------|----------|------|
"""

    # 중단할 광고 (전환 0%, 지출 큰 순)
    stop_ads = sorted(
        [ad for ad in roas_off_ads if ad.get('cvr', 0) == 0 and ad['spend'] > 50000],
        key=lambda x: x['spend'],
        reverse=True
    )[:3]

    if stop_ads:
        total_waste = sum(ad['spend'] for ad in stop_ads)
        plan += f"| 저성과 광고 {len(stop_ads)}개 중단 | 예산 낭비 방지 | 월 약 ₩{total_waste * 4:,.0f} 절감 | 마케터 |\n"

    plan += """| 고성과 광고에 예산 +30% | ROAS 개선 | ROAS +15%p | 마케터 |
| 랜딩페이지 A/B 테스트 시작 | 전환율 개선 | 전환율 +0.5%p | 개발팀 |

### 단기 실행 (1-2주 내)

**중요하지만 준비 필요**

- [ ] 새 타겟 오디언스 3개 테스트 (예산: 각 10만원)
- [ ] 동영상 소재 5개 제작 및 테스트
- [ ] 리타게팅 캠페인 세팅 (웹사이트 방문자 대상)
- [ ] 경쟁사 분석 및 벤치마크

### 중기 실행 (1개월 내)

**구조적 개선**

- [ ] 퍼널 전체 최적화 (인지 → 고려 → 전환)
- [ ] 크리에이티브 A/B 테스트 프로세스 구축
- [ ] 자동화 규칙 설정 (예: CVR 0% 광고 자동 중단)
- [ ] 월간 리포트 자동화 대시보드 구축

"""

    return plan


def generate_checklist():
    """
    실행 체크리스트 생성
    """
    return """
## ✅ 실행 체크리스트

### 즉시 실행 (1-3일)
- [ ] 저성과 광고 중단
- [ ] 고성과 광고 예산 증액
- [ ] 랜딩페이지 로딩 속도 체크
- [ ] 픽셀 추적 정상 작동 확인

### 단기 실행 (1-2주)
- [ ] 새 타겟 오디언스 테스트
- [ ] 동영상 소재 제작
- [ ] 리타게팅 캠페인 세팅
- [ ] 경쟁사 CPM/CPC 벤치마크

### 중기 실행 (1개월)
- [ ] 퍼널 최적화
- [ ] A/B 테스트 프로세스 구축
- [ ] 자동화 규칙 설정
- [ ] 월간 분석 리포트 자동화

### 지속적 모니터링
- [ ] 주간 성과 리뷰 (매주 월요일)
- [ ] 월간 전략 회의 (매월 1일)
- [ ] 분기별 업계 벤치마크 업데이트

---

**📌 다음 분석 시점**
- 1주일 후: 즉시 액션 효과 체크
- 2주일 후: 단기 개선 제안 결과 분석
- 1개월 후: 전체 최적화 효과 종합 분석

---

**🤖 자동 생성**: KITT Agent AI (meta-ad-analysis-prompt.md 기반)
**리포트 주기**: 자동 (일일/주간/월간)
**다음 리포트**: 자동 생성 예정
"""


# 이 모듈은 main 분석 스크립트에서 import하여 사용
if __name__ == "__main__":
    print("이 스크립트는 라이브러리로 사용됩니다.")
    print("scripts/daily_roas_analysis.py에서 import하여 사용하세요.")
