#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
메타광고 성과 분석 자동화 스크립트 (전체 버전)
- 업계 벤치마크 비교 (🔴/🟡/🟢 평가)
- 상세 리포트, 1페이지 요약, 실행 체크리스트 자동 생성
- KRW/USD 통화 자동 감지
- 참고: meta_md/02_프롬프트/meta-ad-analysis-prompt.md
"""

import pandas as pd
import numpy as np
import sys
import os
from datetime import datetime
import argparse


# ── 업계 벤치마크 (KRW 기준) ──
BENCHMARKS_KRW = {
    "CTR":  {"good": 1.5, "avg": 1.0, "unit": "%"},
    "CPC":  {"good": 500, "avg": 1000, "unit": "원", "lower_is_better": True},
    "CPM":  {"good": 5000, "avg": 10000, "unit": "원", "lower_is_better": True},
    "CPA":  {"good": 10000, "avg": 20000, "unit": "원", "lower_is_better": True},
}
BENCHMARKS_USD = {
    "CTR":  {"good": 1.5, "avg": 1.0, "unit": "%"},
    "CPC":  {"good": 0.5, "avg": 1.0, "unit": "$", "lower_is_better": True},
    "CPM":  {"good": 5.0, "avg": 10.0, "unit": "$", "lower_is_better": True},
    "CPA":  {"good": 10.0, "avg": 20.0, "unit": "$", "lower_is_better": True},
}


def detect_currency(df):
    if '통화' in df.columns:
        cur = str(df['통화'].dropna().iloc[0]).upper() if len(df['통화'].dropna()) > 0 else "USD"
        return cur
    for col in df.columns:
        if '지출 금액' in col:
            if 'KRW' in col: return "KRW"
            if 'USD' in col: return "USD"
    return "USD"


def get_spend_col(df, currency):
    target = f"지출 금액 ({currency})"
    if target in df.columns:
        return target
    for col in df.columns:
        if '지출 금액' in col:
            return col
    return "지출 금액 (USD)"


def get_cpm_col(df, currency):
    target = f"CPM(1,000회 노출당 비용) ({currency})"
    if target in df.columns:
        return target
    for col in df.columns:
        if 'CPM' in col:
            return col
    return None


def get_cpc_col(df, currency):
    target = f"CPC(링크 클릭당 비용) ({currency})"
    if target in df.columns:
        return target
    for col in df.columns:
        if 'CPC' in col and '링크' in col:
            return col
    return None


def fmt_money(value, currency):
    if pd.isna(value) or value == 0:
        return "-"
    if currency == "KRW":
        return f"₩{value:,.0f}"
    else:
        return f"${value:,.2f}"


def evaluate(metric_name, value, currency):
    """벤치마크 대비 평가 → 🟢/🟡/🔴"""
    benchmarks = BENCHMARKS_KRW if currency == "KRW" else BENCHMARKS_USD
    if metric_name not in benchmarks or pd.isna(value) or value == 0:
        return "➖", "데이터 없음"

    b = benchmarks[metric_name]
    lower_better = b.get("lower_is_better", False)

    if lower_better:
        if value <= b["good"]:
            return "🟢", "우수"
        elif value <= b["avg"]:
            return "🟡", "보통"
        else:
            return "🔴", "개선 필요"
    else:
        if value >= b["good"]:
            return "🟢", "우수"
        elif value >= b["avg"]:
            return "🟡", "보통"
        else:
            return "🔴", "개선 필요"


def analyze_meta_ads(csv_path, output_dir="output/meta-ad"):
    os.makedirs(output_dir, exist_ok=True)

    print("=" * 80)
    print("메타광고 성과 분석 시작")
    print("=" * 80)

    try:
        df = pd.read_csv(csv_path)
        print(f"\n✅ CSV 파일 로드 완료: {len(df)}개 광고")
    except Exception as e:
        print(f"\n❌ CSV 파일 읽기 실패: {e}")
        sys.exit(1)

    currency = detect_currency(df)
    spend_col = get_spend_col(df, currency)
    cpm_col = get_cpm_col(df, currency)
    cpc_col = get_cpc_col(df, currency)
    print(f"   통화: {currency}")

    # 기본 분석
    total_spend = df[spend_col].sum()
    total_impressions = df['노출'].sum()
    total_clicks = df['링크 클릭'].fillna(0).sum()
    total_leads = df['결과'].fillna(0).sum()
    total_all_clicks = df['클릭(전체)'].fillna(0).sum() if '클릭(전체)' in df.columns else total_clicks

    avg_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    avg_cpc = (total_spend / total_clicks) if total_clicks > 0 else 0
    avg_cpm = (total_spend / total_impressions * 1000) if total_impressions > 0 else 0
    avg_cpl = (total_spend / total_leads) if total_leads > 0 else 0

    # 보고 기간
    period_start = df['보고 시작'].min() if '보고 시작' in df.columns else "-"
    period_end = df['보고 종료'].max() if '보고 종료' in df.columns else "-"

    # 활성/비활성 광고 수 (광고 또는 캠페인 레벨 자동 감지)
    status_col = None
    if '광고 게재' in df.columns:
        status_col = '광고 게재'
    elif '캠페인 게재' in df.columns:
        status_col = '캠페인 게재'

    active_count = len(df[df[status_col] == 'active']) if status_col else 0
    inactive_count = len(df[df[status_col] != 'active']) if status_col else 0

    print(f"\n📊 전체 성과 요약:")
    print(f"   기간: {period_start} ~ {period_end}")
    print(f"   총 지출: {fmt_money(total_spend, currency)}")
    print(f"   총 노출: {total_impressions:,}회")
    print(f"   총 클릭: {total_clicks:.0f}회")
    print(f"   총 리드: {total_leads:.0f}건")
    print(f"   평균 CTR: {avg_ctr:.2f}%  {evaluate('CTR', avg_ctr, currency)[0]}")
    print(f"   평균 CPC: {fmt_money(avg_cpc, currency)}  {evaluate('CPC', avg_cpc, currency)[0]}")
    print(f"   평균 CPM: {fmt_money(avg_cpm, currency)}  {evaluate('CPM', avg_cpm, currency)[0]}")
    if total_leads > 0:
        print(f"   리드당 비용(CPA): {fmt_money(avg_cpl, currency)}  {evaluate('CPA', avg_cpl, currency)[0]}")

    stats = {
        "total_spend": total_spend, "total_impressions": total_impressions,
        "total_clicks": total_clicks, "total_leads": total_leads,
        "avg_ctr": avg_ctr, "avg_cpc": avg_cpc, "avg_cpm": avg_cpm, "avg_cpl": avg_cpl,
        "period_start": period_start, "period_end": period_end,
        "active_count": active_count, "inactive_count": inactive_count,
        "status_col": status_col,
    }

    # 리포트 생성
    print(f"\n📝 상세 리포트 생성 중...")
    report_path = os.path.join(output_dir, "분석_리포트.md")
    generate_detailed_report(df, report_path, currency, spend_col, stats)
    print(f"   ✅ {report_path}")

    print(f"\n📄 1페이지 요약 생성 중...")
    summary_path = os.path.join(output_dir, "1페이지_요약.md")
    generate_summary_report(df, summary_path, currency, spend_col, stats)
    print(f"   ✅ {summary_path}")

    print(f"\n✅ 실행 체크리스트 생성 중...")
    checklist_path = os.path.join(output_dir, "실행_체크리스트.md")
    generate_checklist(df, checklist_path, currency, spend_col, stats)
    print(f"   ✅ {checklist_path}")

    print(f"\n💾 상세 데이터 저장 중...")
    csv_output_path = os.path.join(output_dir, "상세_데이터.csv")
    df_export = df.copy()
    df_export['리드당_비용'] = df_export.apply(
        lambda row: row[spend_col] / row['결과'] if pd.notna(row['결과']) and row['결과'] > 0 else np.nan, axis=1)
    df_export.to_csv(csv_output_path, index=False, encoding='utf-8-sig')
    print(f"   ✅ {csv_output_path}")

    print("\n" + "=" * 80)
    print("✨ 분석 완료!")
    print("=" * 80)

    return stats


def generate_detailed_report(df, output_path, currency, spend_col, stats):
    """상세 분석 리포트 생성 (가이드 프레임워크 반영)"""

    total_spend = stats["total_spend"]
    total_leads = stats["total_leads"]
    avg_cpl = stats["avg_cpl"]
    avg_ctr = stats["avg_ctr"]
    avg_cpc = stats["avg_cpc"]
    avg_cpm = stats["avg_cpm"]
    status_col = stats.get("status_col", "광고 게재")

    # 광고별 성과 분석
    df_active = df.copy()
    df_active['지출'] = df_active[spend_col].fillna(0)
    df_active['클릭'] = df_active['링크 클릭'].fillna(0)
    df_active['리드'] = df_active['결과'].fillna(0)
    df_active['노출수'] = df_active['노출'].fillna(0)
    df_active['CTR'] = np.where(df_active['노출수'] > 0, df_active['클릭'] / df_active['노출수'] * 100, 0)
    df_active['CPC'] = np.where(df_active['클릭'] > 0, df_active['지출'] / df_active['클릭'], 0)

    # 고성과/저성과 (리드 기반)
    df_with_leads = df_active[df_active['리드'] > 0].copy()
    df_with_leads['리드당_비용'] = df_with_leads['지출'] / df_with_leads['리드']
    best_ads = df_with_leads.nsmallest(3, '리드당_비용') if len(df_with_leads) > 0 else pd.DataFrame()
    worst_ads = df_with_leads.nlargest(3, '리드당_비용') if len(df_with_leads) > 0 else pd.DataFrame()

    # 지출 기준 TOP 광고 (리드 없는 경우 대안)
    top_spend = df_active.nlargest(5, '지출')
    top_ctr = df_active[df_active['노출수'] >= 100].nlargest(3, 'CTR') if len(df_active[df_active['노출수'] >= 100]) > 0 else pd.DataFrame()

    # 절감 가능 금액 계산
    waste_spend = 0
    if len(worst_ads) > 0 and status_col:
        for _, row in worst_ads[worst_ads[status_col] == 'active'].iterrows():
            waste_spend += row['지출']

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"""# 메타광고 성과 분석 리포트

**분석 기간**: {stats['period_start']} ~ {stats['period_end']}
**분석일**: {datetime.now().strftime('%Y-%m-%d')}
**통화**: {currency}

---

## 1. 전체 성과 요약

| 지표 | 실적 | 업계 평균 대비 | 평가 |
|------|------|---------------|------|
| **총 지출** | {fmt_money(total_spend, currency)} | - | - |
| **총 노출** | {stats['total_impressions']:,}회 | - | - |
| **총 클릭** | {stats['total_clicks']:.0f}회 | - | - |
| **CTR** | {avg_ctr:.2f}% | 1.0~1.5% | {evaluate('CTR', avg_ctr, currency)[0]} {evaluate('CTR', avg_ctr, currency)[1]} |
| **CPC** | {fmt_money(avg_cpc, currency)} | - | {evaluate('CPC', avg_cpc, currency)[0]} {evaluate('CPC', avg_cpc, currency)[1]} |
| **CPM** | {fmt_money(avg_cpm, currency)} | - | {evaluate('CPM', avg_cpm, currency)[0]} {evaluate('CPM', avg_cpm, currency)[1]} |
""")
        if total_leads > 0:
            f.write(f"""| **총 리드** | {total_leads:.0f}건 | - | - |
| **리드당 비용 (CPA)** | {fmt_money(avg_cpl, currency)} | - | {evaluate('CPA', avg_cpl, currency)[0]} {evaluate('CPA', avg_cpl, currency)[1]} |
""")

        f.write(f"""
**광고 현황**: 활성 {stats['active_count']}개 / 비활성 {stats['inactive_count']}개 / 총 {len(df)}개

---

## 2. 핵심 인사이트 3가지

""")
        # 인사이트 자동 도출
        insights = []

        # CTR 인사이트
        ctr_icon, ctr_eval = evaluate('CTR', avg_ctr, currency)
        if ctr_eval == "우수":
            insights.append(f"💡 **CTR {avg_ctr:.2f}%로 업계 평균 대비 우수** — 타겟팅과 소재 퀄리티가 높음. 이 소재 패턴을 다른 캠페인에도 적용 권장")
        elif ctr_eval == "개선 필요":
            insights.append(f"🔴 **CTR {avg_ctr:.2f}%로 개선 필요** — 소재 교체 또는 타겟팅 재설정 필요. 동영상 소재 테스트로 CTR 30% 향상 가능")
        else:
            insights.append(f"💡 **CTR {avg_ctr:.2f}%로 보통 수준** — A/B 테스트를 통해 소재 최적화 시 1.5% 이상 달성 가능")

        # CPC 인사이트
        cpc_icon, cpc_eval = evaluate('CPC', avg_cpc, currency)
        if cpc_eval == "우수":
            insights.append(f"💡 **CPC {fmt_money(avg_cpc, currency)}로 매우 효율적** — 저비용 트래픽 확보 성공. 예산 증액으로 볼륨 확대 가능")
        elif cpc_eval == "개선 필요":
            insights.append(f"🔴 **CPC {fmt_money(avg_cpc, currency)}로 높은 편** — 타겟 범위 확대 또는 소재 개선으로 비용 절감 필요")
        else:
            insights.append(f"💡 **CPC {fmt_money(avg_cpc, currency)}로 보통 수준** — 경쟁 입찰 최적화로 20% 절감 가능")

        # 리드 또는 지출 효율 인사이트
        if total_leads > 0:
            insights.append(f"💡 **리드 {total_leads:.0f}건 확보, 리드당 비용 {fmt_money(avg_cpl, currency)}** — 고성과 광고에 예산 집중 시 CPA 30% 절감 가능")
        elif len(top_ctr) > 0:
            best_ctr_ad = top_ctr.iloc[0]
            ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'
            insights.append(f"💡 **최고 CTR 광고: '{best_ctr_ad[ad_name_col][:30]}' ({best_ctr_ad['CTR']:.2f}%)** — 이 소재의 메시지 패턴을 활용한 신규 광고 제작 권장")

        for i, insight in enumerate(insights[:3], 1):
            f.write(f"{i}. {insight}\n\n")

        # 3. 광고별 성과
        f.write(f"""---

## 3. 광고별 성과 분석

### 지출 TOP 5 광고

| 순위 | 광고명 | 지출 | 노출 | 클릭 | CTR | 상태 |
|------|--------|------|------|------|-----|------|
""")
        for idx, (_, row) in enumerate(top_spend.iterrows(), 1):
            status = "✅" if status_col and row.get(status_col) == 'active' else "❌"
            ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'
            name = str(row[ad_name_col])[:25]
            f.write(f"| {idx} | {name} | {fmt_money(row['지출'], currency)} | {row['노출수']:,.0f} | {row['클릭']:.0f} | {row['CTR']:.2f}% | {status} |\n")

        if len(best_ads) > 0:
            f.write(f"""
### 🏆 최고 성과 광고 TOP 3 (리드 기준)

""")
            for idx, (_, row) in enumerate(best_ads.iterrows(), 1):
                status = "✅ Active" if status_col and row[status_col] == 'active' else "❌ Inactive"
                ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'
                f.write(f"""#### {idx}. {row[ad_name_col]}
- **리드당 비용**: {fmt_money(row['리드당_비용'], currency)}
- **리드 수**: {row['리드']:.0f}건 | **지출**: {fmt_money(row['지출'], currency)}
- **CTR**: {row['CTR']:.2f}% | **상태**: {status}
- **활용**: 이 광고의 소재/메시지를 복제하여 유사 광고 3-5개 제작

""")

        if len(worst_ads) > 0:
            f.write(f"""### ❌ 개선 필요 광고 TOP 3

""")
            for idx, (_, row) in enumerate(worst_ads.iterrows(), 1):
                ratio = f" (평균의 {row['리드당_비용']/avg_cpl:.1f}배)" if avg_cpl > 0 else ""
                action = "**즉시 중단 권장**" if status_col and row[status_col] == 'active' else "이미 중단됨"
                ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'
                f.write(f"""#### {idx}. {row[ad_name_col]}
- **리드당 비용**: {fmt_money(row['리드당_비용'], currency)}{ratio}
- **리드 수**: {row['리드']:.0f}건 | **지출**: {fmt_money(row['지출'], currency)}
- **권장 조치**: {action}

""")

        # 4. 즉시 실행 액션
        f.write(f"""---

## 4. 즉시 실행 액션 3가지

### ⚡ 액션 1: 저성과 광고 중단
""")
        if len(worst_ads) > 0 and status_col:
            ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'
            for _, row in worst_ads[worst_ads[status_col] == 'active'].iterrows():
                f.write(f"- ❌ '{row[ad_name_col][:30]}' 중단\n")
            if waste_spend > 0:
                f.write(f"- **예상 절감**: {fmt_money(waste_spend, currency)}\n")
        else:
            f.write(f"- 리드 데이터 기준 저성과 광고 식별 후 중단\n")

        f.write(f"""
### ⚡ 액션 2: 고성과 광고 예산 증액
""")
        if len(best_ads) > 0:
            ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'
            for _, row in best_ads.head(2).iterrows():
                f.write(f"- ✅ '{row[ad_name_col][:30]}' 예산 +50% 증액\n")
            f.write(f"- **예상 효과**: 리드 +30~40% 증가\n")
        else:
            ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'
            for _, row in top_ctr.head(2).iterrows() if len(top_ctr) > 0 else []:
                f.write(f"- ✅ '{row[ad_name_col][:30]}' (CTR {row['CTR']:.2f}%) 예산 증액\n")

        f.write(f"""
### ⚡ 액션 3: 신규 크리에이티브 제작
- 고성과 광고의 포맷과 메시지를 활용한 유사 광고 3-5개 제작
- 동영상 소재 테스트 (평균 CTR 30% 향상 기대)
- A/B 테스트로 최적 소재 검증

---

## 5. 예상 개선 효과

| 지표 | 현재 | 목표 (1개월 후) | 변화 |
|------|------|----------------|------|
| CTR | {avg_ctr:.2f}% | {avg_ctr * 1.3:.2f}% | +30% |
| CPC | {fmt_money(avg_cpc, currency)} | {fmt_money(avg_cpc * 0.8, currency)} | -20% |
""")
        if total_leads > 0:
            f.write(f"""| 리드당 비용 | {fmt_money(avg_cpl, currency)} | {fmt_money(avg_cpl * 0.7, currency)} | -30% |
| 월 리드 | {total_leads:.0f}건 | {total_leads * 1.4:.0f}건 | +40% |
""")
        if waste_spend > 0:
            f.write(f"""| 예산 절감 | - | {fmt_money(waste_spend, currency)} | 저성과 광고 중단 |
""")

        f.write(f"""
---

## 6. 다음 분석 시점

- **1주일 후**: 즉시 액션 효과 체크 (CTR, CPC 변화)
- **2주일 후**: A/B 테스트 결과 분석, 승자 광고 예산 증액
- **1개월 후**: 전체 최적화 효과 종합 분석

---

**다음 단계**: 1페이지_요약.md 파일로 핵심 내용 확인
**실행 계획**: 실행_체크리스트.md 파일로 진행 상황 추적
""")


def generate_summary_report(df, output_path, currency, spend_col, stats):
    """1페이지 요약 리포트 (경영진 보고용)"""

    total_spend = stats["total_spend"]
    total_leads = stats["total_leads"]
    avg_cpl = stats["avg_cpl"]
    avg_ctr = stats["avg_ctr"]
    avg_cpc = stats["avg_cpc"]
    avg_cpm = stats["avg_cpm"]

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"""# 메타광고 성과 분석 1페이지 요약

**분석 기간**: {stats['period_start']} ~ {stats['period_end']}
**분석일**: {datetime.now().strftime('%Y-%m-%d')}
**통화**: {currency}

---

## 📊 전체 성과

| 지표 | 실적 | 평가 |
|------|------|------|
| 총 지출 | {fmt_money(total_spend, currency)} | - |
| 총 노출 | {stats['total_impressions']:,}회 | - |
| 총 클릭 | {stats['total_clicks']:.0f}회 | - |
| CTR | {avg_ctr:.2f}% | {evaluate('CTR', avg_ctr, currency)[0]} {evaluate('CTR', avg_ctr, currency)[1]} |
| CPC | {fmt_money(avg_cpc, currency)} | {evaluate('CPC', avg_cpc, currency)[0]} {evaluate('CPC', avg_cpc, currency)[1]} |
| CPM | {fmt_money(avg_cpm, currency)} | {evaluate('CPM', avg_cpm, currency)[0]} {evaluate('CPM', avg_cpm, currency)[1]} |
""")
        if total_leads > 0:
            f.write(f"""| 총 리드 | {total_leads:.0f}건 | - |
| 리드당 비용 | {fmt_money(avg_cpl, currency)} | {evaluate('CPA', avg_cpl, currency)[0]} {evaluate('CPA', avg_cpl, currency)[1]} |
""")

        f.write(f"""
**광고 현황**: 활성 {stats['active_count']}개 / 비활성 {stats['inactive_count']}개

---

## ⚡ 즉시 실행 액션 3가지

### 1. 저성과 광고 중단
- 리드당 비용이 평균의 1.5배 이상인 광고 즉시 중단

### 2. 고성과 광고 예산 증액
- 리드당 비용이 가장 낮은 광고 2개에 예산 +50% 증액
- 예상 효과: 리드 +30~40%

### 3. 신규 광고 제작
- 고성과 광고 포맷 활용 유사 광고 3-5개 제작
- 동영상 소재 테스트 추가

---

## 📈 예상 개선 효과 (1개월 후)

| 지표 | 현재 | 목표 | 변화 |
|------|------|------|------|
| CTR | {avg_ctr:.2f}% | {avg_ctr * 1.3:.2f}% | ↑30% |
| CPC | {fmt_money(avg_cpc, currency)} | {fmt_money(avg_cpc * 0.8, currency)} | ↓20% |
""")
        if total_leads > 0:
            f.write(f"""| 리드당 비용 | {fmt_money(avg_cpl, currency)} | {fmt_money(avg_cpl * 0.7, currency)} | ↓30% |
| 월 리드 | {total_leads:.0f}건 | {total_leads * 1.4:.0f}건 | ↑40% |
""")

        f.write(f"""
---

**상세 내용**: 분석_리포트.md 참조
**실행 계획**: 실행_체크리스트.md 참조
""")


def generate_checklist(df, output_path, currency, spend_col, stats):
    """실행 체크리스트 (실무자용)"""

    budget_example = "₩50,000" if currency == "KRW" else "$50"
    status_col = stats.get("status_col", "광고 게재")
    ad_name_col = '광고 이름' if '광고 이름' in df.columns else '캠페인 이름'

    # 저성과 광고 목록
    df_active = df.copy()
    df_active['리드'] = df_active['결과'].fillna(0)
    df_active['지출'] = df_active[spend_col].fillna(0)
    df_with_leads = df_active[df_active['리드'] > 0].copy()

    stop_ads = []
    boost_ads = []
    if len(df_with_leads) > 0:
        df_with_leads['리드당_비용'] = df_with_leads['지출'] / df_with_leads['리드']
        worst = df_with_leads.nlargest(3, '리드당_비용')
        best = df_with_leads.nsmallest(2, '리드당_비용')
        if status_col:
            for _, row in worst[worst[status_col] == 'active'].iterrows():
                stop_ads.append(row[ad_name_col][:30])
        for _, row in best.iterrows():
            boost_ads.append(row[ad_name_col][:30])

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"""# 메타광고 최적화 실행 체크리스트

**작성일**: {datetime.now().strftime('%Y-%m-%d')}
**분석 기간**: {stats['period_start']} ~ {stats['period_end']}
**통화**: {currency}

---

## 🔴 즉시 실행 (오늘 ~ 3일)

### 저성과 광고 중단
""")
        if stop_ads:
            for ad in stop_ads:
                f.write(f"- [ ] ❌ '{ad}' 중단\n")
        else:
            f.write(f"- [ ] 저성과 광고 식별 후 중단 (분석_리포트.md 참조)\n")

        f.write(f"""
### 고성과 광고 예산 증액
""")
        if boost_ads:
            for ad in boost_ads:
                f.write(f"- [ ] ✅ '{ad}' 예산 +50% 증액\n")
        else:
            f.write(f"- [ ] 고성과 광고 예산 +50% 증액\n")

        f.write(f"""
### 전환 추적 확인
- [ ] 메타 픽셀 설치 및 정상 작동 확인
- [ ] 전환 이벤트 정상 기록 확인
- [ ] 어트리뷰션 설정 확인 (클릭 7일 / 조회 1일)

---

## 🟡 단기 실행 (1~2주)

### 신규 크리에이티브 제작
- [ ] 고성과 광고 유사 소재 3개 제작
- [ ] 동영상 소재 1-2개 제작 (CTR 30% 향상 기대)
- [ ] A/B 테스트 시작 (각 {budget_example} 예산)

### 타겟팅 최적화
- [ ] Lookalike 오디언스 생성 (1%)
- [ ] 관심사 타겟팅 세분화
- [ ] 리타게팅 캠페인 세팅 (웹사이트 방문자 대상)

---

## 🟢 중기 실행 (1개월)

### 스케일업
- [ ] 고성과 광고 예산 2배 증액
- [ ] 신규 타겟 오디언스 3개 테스트

### 자동화 & 프로세스
- [ ] 자동화 규칙 설정 (CPA 기준 자동 중단)
- [ ] 주간 성과 리포트 정기 확인

---

## 📊 성과 측정 체크포인트

### 1주일 후
- [ ] CTR, CPC, CPA 변화 확인
- [ ] 중단한 광고의 예산 재분배 효과 확인
- [ ] 저성과 광고 추가 중단

### 2주일 후
- [ ] A/B 테스트 결과 분석
- [ ] 승자 광고 예산 증액
- [ ] 동영상 소재 성과 확인

### 1개월 후
- [ ] 전체 성과 재분석
- [ ] 다음 달 전략 수립
- [ ] 벤치마크 대비 개선율 확인

---

**참고**: 분석_리포트.md에서 구체적인 광고명 및 수치 확인
""")


def main():
    parser = argparse.ArgumentParser(description='메타광고 성과 분석 자동화')
    parser.add_argument('--csv', type=str, help='CSV 파일 경로')
    parser.add_argument('--output', type=str, default='output/meta-ad', help='출력 디렉토리')

    args = parser.parse_args()

    if args.csv:
        csv_path = args.csv
    else:
        print("\n📁 CSV 파일 경로를 입력하세요:")
        print("   예: /Users/Downloads/광고데이터.csv")
        csv_path = input("\n> ").strip()

    if not os.path.exists(csv_path):
        print(f"\n❌ 파일을 찾을 수 없습니다: {csv_path}")
        sys.exit(1)

    analyze_meta_ads(csv_path, args.output)


if __name__ == "__main__":
    main()
