#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
일일 ROAS 리포트 테스트 (기존 CSV 사용)
"""

import json
import os
import sys
import pandas as pd
from datetime import datetime
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
CONFIG_FILE = PROJECT_ROOT / "config" / "clients.json"

# ROAS OFF 기준
ROAS_OFF_CRITERIA = {
    "KRW": {
        "CTR_MIN": 1.0,
        "CPC_MAX": 2000,
        "CPM_MAX": 20000,
        "CPA_MAX": 50000,
        "CVR_MIN": 1.0,
        "MIN_SPEND": 10000,
    },
    "USD": {
        "CTR_MIN": 1.0,
        "CPC_MAX": 2.0,
        "CPM_MAX": 20.0,
        "CPA_MAX": 50.0,
        "CVR_MIN": 1.0,
        "MIN_SPEND": 10.0,
    }
}


def load_clients():
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        clients = json.load(f)
    return [c for c in clients if c.get('enabled', False)]


def find_latest_csv(client):
    csv_dir = PROJECT_ROOT / "input" / "meta-ad" / client['name']
    if not csv_dir.exists():
        return None
    csv_files = list(csv_dir.glob("*.csv"))
    if not csv_files:
        return None
    return max(csv_files, key=lambda p: p.stat().st_mtime)


def analyze_roas_off(csv_path, client):
    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        return []

    currency = client['currency']
    criteria = ROAS_OFF_CRITERIA[currency]

    spend_col = f"지출 금액 ({currency})"
    cpc_col = f"CPC(링크 클릭당 비용) ({currency})"
    cpm_col = f"CPM(1,000회 노출당 비용) ({currency})"

    if spend_col not in df.columns:
        for col in df.columns:
            if '지출 금액' in col:
                spend_col = col
                break

    if cpc_col not in df.columns:
        for col in df.columns:
            if 'CPC' in col and '링크' in col:
                cpc_col = col
                break

    if cpm_col not in df.columns:
        for col in df.columns:
            if 'CPM' in col:
                cpm_col = col
                break

    df['CTR'] = (df['링크 클릭'].fillna(0) / df['노출'].fillna(1) * 100)
    df['전환수'] = df['결과'].fillna(0)
    df['전환율'] = (df['전환수'] / df['링크 클릭'].fillna(1) * 100)
    df['CPA'] = df[spend_col] / df['전환수'].replace(0, 1)

    roas_off = df[
        (df[spend_col] >= criteria['MIN_SPEND']) &
        (
            (df['CTR'] < criteria['CTR_MIN']) |
            (df[cpc_col].fillna(999999) > criteria['CPC_MAX']) |
            (df[cpm_col].fillna(999999) > criteria['CPM_MAX']) |
            ((df['전환수'] > 0) & (df['CPA'] > criteria['CPA_MAX'])) |
            ((df['링크 클릭'] > 10) & (df['전환율'] < criteria['CVR_MIN']))
        )
    ].copy()

    roas_off = roas_off.sort_values(by=spend_col, ascending=False)

    results = []
    for _, row in roas_off.iterrows():
        issue_reasons = []
        if row['CTR'] < criteria['CTR_MIN']:
            issue_reasons.append(f"낮은 CTR ({row['CTR']:.2f}%)")
        if row.get(cpc_col, 0) > criteria['CPC_MAX']:
            val = row[cpc_col]
            issue_reasons.append(f"높은 CPC ({val:,.0f})" if currency == "KRW" else f"높은 CPC (${val:.2f})")
        if row.get(cpm_col, 0) > criteria['CPM_MAX']:
            val = row[cpm_col]
            issue_reasons.append(f"높은 CPM ({val:,.0f})" if currency == "KRW" else f"높은 CPM (${val:.2f})")
        if row['전환수'] > 0 and row['CPA'] > criteria['CPA_MAX']:
            issue_reasons.append(f"높은 CPA ({row['CPA']:,.0f})" if currency == "KRW" else f"높은 CPA (${row['CPA']:.2f})")
        if row['링크 클릭'] > 10 and row['전환율'] < criteria['CVR_MIN']:
            issue_reasons.append(f"낮은 전환율 ({row['전환율']:.2f}%)")

        results.append({
            'client': client['name'],
            'campaign': row.get('캠페인 이름', '-'),
            'adset': row.get('광고 세트 이름', '-'),
            'ad_name': row.get('광고 이름', '-'),
            'spend': row[spend_col],
            'impressions': row.get('노출', 0),
            'clicks': row.get('링크 클릭', 0),
            'conversions': row['전환수'],
            'ctr': row['CTR'],
            'cvr': row['전환율'],
            'cpc': row.get(cpc_col, 0),
            'cpm': row.get(cpm_col, 0),
            'cpa': row['CPA'] if row['전환수'] > 0 else 0,
            'issues': ' | '.join(issue_reasons),
            'currency': currency,
        })

    return results


def generate_markdown_report(all_results, output_path):
    today = datetime.now().strftime("%Y-%m-%d")

    md = f"""# 📅 ROAS OFF 대상 광고 분석 - 일일 리포트
**생성일**: {today}
**분석 기간**: 전날 (1일)
**리포트 유형**: 일일
**총 문제 광고**: {len(all_results)}개

---

## 📊 업체별 요약

"""

    by_client = {}
    for item in all_results:
        client = item['client']
        if client not in by_client:
            by_client[client] = []
        by_client[client].append(item)

    for client, items in by_client.items():
        total_spend = sum(item['spend'] for item in items)
        currency = items[0]['currency']
        spend_str = f"₩{total_spend:,.0f}" if currency == "KRW" else f"${total_spend:,.2f}"

        md += f"### {client}\n"
        md += f"- 문제 광고: {len(items)}개\n"
        md += f"- 총 지출: {spend_str}\n\n"

    md += "\n---\n\n## 🎯 개선 권장 광고 목록\n\n"

    for client, items in by_client.items():
        md += f"### {client}\n\n"

        for i, item in enumerate(items[:20], 1):
            currency = item['currency']
            spend_str = f"₩{item['spend']:,.0f}" if currency == "KRW" else f"${item['spend']:,.2f}"
            cpc_str = f"₩{item['cpc']:,.0f}" if currency == "KRW" else f"${item['cpc']:.2f}"
            cpm_str = f"₩{item['cpm']:,.0f}" if currency == "KRW" else f"${item['cpm']:.2f}"
            cpa_str = f"₩{item['cpa']:,.0f}" if currency == "KRW" else f"${item['cpa']:.2f}" if item['cpa'] > 0 else "-"

            md += f"""#### {i}. {item['ad_name']}

- **캠페인**: {item['campaign']}
- **광고 세트**: {item['adset']}
- **지출**: {spend_str}
- **노출**: {item['impressions']:,}회
- **클릭**: {item['clicks']:,}회
- **전환**: {item['conversions']:,}건
- **CTR**: {item['ctr']:.2f}%
- **CVR**: {item['cvr']:.2f}%
- **CPC**: {cpc_str}
- **CPM**: {cpm_str}
- **CPA**: {cpa_str}
- **문제**: {item['issues']}

**💡 권장 조치**:
- [ ] 타겟팅 재검토 (관심사/지역/연령 최적화)
- [ ] 소재 교체 (이미지/카피 개선)
- [ ] 입찰 전략 조정
- [ ] 성과 미달 시 광고 중단 고려

---

"""

    md += f"""
---

## 📋 실행 가이드

### 1. 즉시 조치 필요 (지출 상위 5개)
"""

    top5 = sorted(all_results, key=lambda x: x['spend'], reverse=True)[:5]
    for i, item in enumerate(top5, 1):
        currency = item['currency']
        spend_str = f"₩{item['spend']:,.0f}" if currency == "KRW" else f"${item['spend']:,.2f}"
        md += f"{i}. **{item['client']}** - {item['ad_name']} ({spend_str})\n"

    md += """

### 2. 분석 체크리스트

- [ ] **타겟팅 검토**: 오디언스가 너무 넓거나 부적합한가?
- [ ] **소재 품질**: 이미지/동영상이 매력적인가?
- [ ] **메시지 일치**: 광고 카피와 랜딩페이지가 일치하는가?
- [ ] **입찰 전략**: 자동 입찰 vs 수동 입찰 재검토
- [ ] **게재 위치**: 성과 낮은 게재 위치 제외

### 3. 일일 모니터링

- 당일 성과 즉시 확인
- CTR 1% 이상, CPC/CPM 업계 평균 이하 목표
- 2-3일 연속 미달 시 광고 중단

---

**🤖 자동 생성**: KITT Agent AI
**리포트 주기**: 일일
**다음 리포트**: 내일 오전 9시
"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md)

    print(f"\n✅ 리포트 생성: {output_path}")


def main():
    print("=" * 80)
    print("  메타광고 ROAS OFF 일일 리포트 테스트")
    print(f"  실행 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("  데이터: 기존 CSV 파일 사용")
    print("=" * 80)

    clients = load_clients()
    print(f"\n대상 업체: {len(clients)}개")

    print("\n\n📊 일일 분석 중...\n")
    all_results = []

    for client in clients:
        print(f"[{client['name']}]")
        csv_path = find_latest_csv(client)

        if not csv_path:
            print(f"    ⚠️ CSV 파일 없음")
            print()
            continue

        print(f"    📂 {csv_path.name}")
        results = analyze_roas_off(csv_path, client)
        all_results.extend(results)
        print(f"    🔴 ROAS OFF: {len(results)}개 광고")

        if results:
            for i, r in enumerate(results[:3], 1):
                currency = r['currency']
                spend_str = f"₩{r['spend']:,.0f}" if currency == "KRW" else f"${r['spend']:,.2f}"
                print(f"       {i}. {r['ad_name'][:40]}... ({spend_str})")
        print()

    output_dir = PROJECT_ROOT / "output" / "meta-ad" / "_roas_daily"
    output_dir.mkdir(parents=True, exist_ok=True)

    today = datetime.now().strftime("%Y%m%d")
    report_path = output_dir / f"ROAS_OFF_일일_TEST_{today}.md"

    generate_markdown_report(all_results, report_path)

    print("\n" + "=" * 80)
    print(f"  총 ROAS OFF 광고: {len(all_results)}개")
    print(f"  리포트 위치: {report_path}")
    print("=" * 80)

    return report_path


if __name__ == '__main__':
    main()
