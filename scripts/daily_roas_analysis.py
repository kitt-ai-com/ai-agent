#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
메타광고 ROAS 분석 일일 리포트

매일 아침 9시 실행:
- 전체 활성 클라이언트의 광고 성과 수집
- 캠페인/광고 세트/소재별 ROAS OFF 대상 식별
- 노션 리포트 자동 생성

사용법:
  python3 scripts/daily_roas_analysis.py              # 실행 + Notion 업로드
  python3 scripts/daily_roas_analysis.py --dry-run    # 테스트
  python3 scripts/daily_roas_analysis.py --days 7     # 기간 설정 (기본: 7일)
"""

import json
import os
import sys
import subprocess
import argparse
import pandas as pd
from datetime import datetime
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
FETCH_SCRIPT = PROJECT_ROOT / "scripts" / "fetch_meta_ads.py"
CONFIG_FILE = PROJECT_ROOT / "config" / "clients.json"

# ROAS OFF 기준 (업계 벤치마크 대비)
ROAS_OFF_CRITERIA = {
    "KRW": {
        "CTR_MIN": 1.0,        # CTR 1% 미만
        "CPC_MAX": 2000,       # CPC 2000원 초과
        "CPM_MAX": 20000,      # CPM 20000원 초과
        "CPA_MAX": 50000,      # CPA 50000원 초과 (전환당 비용)
        "CVR_MIN": 1.0,        # CVR 1% 미만 (전환율)
        "MIN_SPEND": 10000,    # 최소 지출 10000원 (분석 대상)
    },
    "USD": {
        "CTR_MIN": 1.0,        # CTR 1% 미만
        "CPC_MAX": 2.0,        # CPC $2 초과
        "CPM_MAX": 20.0,       # CPM $20 초과
        "CPA_MAX": 50.0,       # CPA $50 초과 (전환당 비용)
        "CVR_MIN": 1.0,        # CVR 1% 미만 (전환율)
        "MIN_SPEND": 10.0,     # 최소 지출 $10 (분석 대상)
    }
}


def load_clients():
    """활성 클라이언트 목록 로드"""
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        clients = json.load(f)
    return [c for c in clients if c.get('enabled', False)]


def fetch_client_data(client, days, dry_run=False):
    """클라이언트 광고 데이터 수집"""
    date_str = datetime.now().strftime("%Y%m%d")
    csv_dir = PROJECT_ROOT / "input" / "meta-ad" / client['name']
    csv_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{client['name']}_roas_{date_str}.csv"

    cmd = [
        sys.executable, str(FETCH_SCRIPT),
        "--account", client['ad_account_id'],
        "--days", str(days),
        "--output", str(csv_dir),
        "--filename", filename,
        "--currency", client['currency'],
    ]

    if dry_run:
        print(f"    [DRY-RUN] {client['name']}")
        return None

    result = subprocess.run(cmd, capture_output=True, text=True, cwd=str(PROJECT_ROOT))

    if result.returncode != 0:
        print(f"    ❌ {client['name']} 수집 실패")
        return None

    csv_path = csv_dir / filename
    if not csv_path.exists():
        print(f"    ⚠️ {client['name']} CSV 없음")
        return None

    print(f"    ✅ {client['name']} 수집 완료")
    return csv_path


def analyze_roas_off(csv_path, client):
    """ROAS OFF 대상 광고 식별 + 캠페인별/소재별 성과 분석"""
    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        print(f"    ❌ CSV 읽기 실패: {e}")
        return [], {}, {}

    currency = client['currency']
    criteria = ROAS_OFF_CRITERIA[currency]

    # 통화별 컬럼명
    spend_col = f"지출 금액 ({currency})"
    cpc_col = f"CPC(링크 클릭당 비용) ({currency})"
    cpm_col = f"CPM(1,000회 노출당 비용) ({currency})"
    cpa_col = f"결과당 비용"  # Cost per result/action

    # 필수 컬럼 확인
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

    # 성과 지표 계산
    df['CTR'] = (df['링크 클릭'].fillna(0) / df['노출'].fillna(1) * 100)
    df['전환수'] = df['결과'].fillna(0)  # Results = Conversions
    df['전환율'] = (df['전환수'] / df['링크 클릭'].fillna(1) * 100)  # CVR = Conversions / Clicks
    df['CPA'] = df[spend_col] / df['전환수'].replace(0, 1)  # Cost per conversion

    # ===== 캠페인별 성과 집계 =====
    campaign_stats = {}
    if '캠페인 이름' in df.columns:
        grouped = df.groupby('캠페인 이름').agg({
            spend_col: 'sum',
            '노출': 'sum',
            '링크 클릭': 'sum',
            '전환수': 'sum',
        }).reset_index()

        grouped['CTR'] = (grouped['링크 클릭'] / grouped['노출'] * 100)
        grouped['CVR'] = (grouped['전환수'] / grouped['링크 클릭'].replace(0, 1) * 100)
        grouped['CPC'] = (grouped[spend_col] / grouped['링크 클릭'].replace(0, 1))
        grouped['CPA'] = (grouped[spend_col] / grouped['전환수'].replace(0, 1))

        for _, row in grouped.iterrows():
            campaign_stats[row['캠페인 이름']] = {
                'spend': row[spend_col],
                'impressions': row['노출'],
                'clicks': row['링크 클릭'],
                'conversions': row['전환수'],
                'ctr': row['CTR'],
                'cvr': row['CVR'],
                'cpc': row['CPC'],
                'cpa': row['CPA'] if row['전환수'] > 0 else 0,
                'currency': currency,
            }

    # ===== 소재(광고)별 성과 랭킹 =====
    creative_stats = {}
    if '광고 이름' in df.columns:
        # 모든 광고 성과 (지출 있는 것만)
        valid_ads = df[df[spend_col] > 0].copy()

        # Top 10 (CTR 기준)
        top_ctr = valid_ads.nlargest(10, 'CTR')
        # Bottom 10 (CTR 기준, 클릭 10회 이상만)
        bottom_ctr = valid_ads[valid_ads['링크 클릭'] > 10].nsmallest(10, 'CTR')

        creative_stats['top_ctr'] = []
        for _, row in top_ctr.iterrows():
            creative_stats['top_ctr'].append({
                'ad_name': row.get('광고 이름', '-'),
                'campaign': row.get('캠페인 이름', '-'),
                'spend': row[spend_col],
                'ctr': row['CTR'],
                'clicks': row['링크 클릭'],
                'conversions': row['전환수'],
                'currency': currency,
            })

        creative_stats['bottom_ctr'] = []
        for _, row in bottom_ctr.iterrows():
            creative_stats['bottom_ctr'].append({
                'ad_name': row.get('광고 이름', '-'),
                'campaign': row.get('캠페인 이름', '-'),
                'spend': row[spend_col],
                'ctr': row['CTR'],
                'clicks': row['링크 클릭'],
                'conversions': row['전환수'],
                'currency': currency,
            })

    # ROAS OFF 조건 (여러 기준 중 하나라도 해당하면)
    roas_off = df[
        (df[spend_col] >= criteria['MIN_SPEND']) &
        (
            (df['CTR'] < criteria['CTR_MIN']) |
            (df[cpc_col].fillna(999999) > criteria['CPC_MAX']) |
            (df[cpm_col].fillna(999999) > criteria['CPM_MAX']) |
            ((df['전환수'] > 0) & (df['CPA'] > criteria['CPA_MAX'])) |  # CPA 체크 (전환이 있을 때만)
            ((df['링크 클릭'] > 10) & (df['전환율'] < criteria['CVR_MIN']))  # CVR 체크 (클릭이 충분할 때)
        )
    ].copy()

    # 우선순위: 지출 큰 순
    roas_off = roas_off.sort_values(by=spend_col, ascending=False)

    results = []
    for _, row in roas_off.iterrows():
        issue_reasons = []
        if row['CTR'] < criteria['CTR_MIN']:
            issue_reasons.append(f"낮은 CTR ({row['CTR']:.2f}%)")
        if row.get(cpc_col, 0) > criteria['CPC_MAX']:
            issue_reasons.append(f"높은 CPC ({row[cpc_col]:.0f})" if currency == "KRW" else f"높은 CPC (${row[cpc_col]:.2f})")
        if row.get(cpm_col, 0) > criteria['CPM_MAX']:
            issue_reasons.append(f"높은 CPM ({row[cpm_col]:.0f})" if currency == "KRW" else f"높은 CPM (${row[cpm_col]:.2f})")
        if row['전환수'] > 0 and row['CPA'] > criteria['CPA_MAX']:
            issue_reasons.append(f"높은 CPA ({row['CPA']:.0f})" if currency == "KRW" else f"높은 CPA (${row['CPA']:.2f})")
        if row['링크 클릭'] > 10 and row['전환율'] < criteria['CVR_MIN']:
            issue_reasons.append(f"낮은 전환율 ({row['전환율']:.2f}%)")

        results.append({
            'client': client['name'],
            'campaign': row.get('캠페인 이름', '-'),
            'adset': row.get('광고 세트 이름', '-'),
            'ad_name': row.get('광고 이름', '-'),
            'spend': row[spend_col],
            'impressions': row['노출'],
            'clicks': row['링크 클릭'],
            'conversions': row['전환수'],
            'ctr': row['CTR'],
            'cvr': row['전환율'],
            'cpc': row.get(cpc_col, 0),
            'cpm': row.get(cpm_col, 0),
            'cpa': row['CPA'] if row['전환수'] > 0 else 0,
            'issues': ' | '.join(issue_reasons),
            'currency': currency,
        })

    return results, campaign_stats, creative_stats


def generate_markdown_report(all_results, campaign_data, creative_data, output_path, days, period='주간'):
    """마크다운 리포트 생성 (캠페인별/소재별 성과 포함)"""
    today = datetime.now().strftime("%Y-%m-%d")

    period_emoji = {
        '일일': '📅',
        '주간': '📊',
        '월간': '📈'
    }.get(period, '📊')

    md = f"""# {period_emoji} ROAS OFF 대상 광고 분석 - {period} 리포트
**생성일**: {today}
**분석 기간**: 최근 {days}일
**리포트 유형**: {period}
**총 문제 광고**: {len(all_results)}개

---

## 📊 업체별 요약

"""

    # 업체별 그룹화
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

    # ===== 캠페인별 성과 분석 =====
    if campaign_data:
        md += "\n---\n\n## 🎯 캠페인별 성과 분석\n\n"

        for client, campaigns in campaign_data.items():
            if not campaigns:
                continue

            md += f"### {client}\n\n"
            md += "| 캠페인 | 지출 | 노출 | 클릭 | 전환 | CTR | CVR | CPC | CPA |\n"
            md += "|--------|------|------|------|------|-----|-----|-----|-----|\n"

            # 지출 큰 순으로 정렬
            sorted_campaigns = sorted(campaigns.items(), key=lambda x: x[1]['spend'], reverse=True)

            for campaign_name, stats in sorted_campaigns[:10]:  # 상위 10개만
                currency = stats['currency']
                spend_str = f"₩{stats['spend']:,.0f}" if currency == "KRW" else f"${stats['spend']:,.2f}"
                cpc_str = f"₩{stats['cpc']:,.0f}" if currency == "KRW" else f"${stats['cpc']:.2f}"
                cpa_str = f"₩{stats['cpa']:,.0f}" if currency == "KRW" else f"${stats['cpa']:.2f}" if stats['cpa'] > 0 else "-"

                md += f"| {campaign_name[:30]}... | {spend_str} | {stats['impressions']:,} | {stats['clicks']:,} | {stats['conversions']:,} | {stats['ctr']:.2f}% | {stats['cvr']:.2f}% | {cpc_str} | {cpa_str} |\n"

            md += "\n"

    # ===== 소재별 성과 랭킹 =====
    if creative_data:
        md += "\n---\n\n## 🎨 소재별 성과 랭킹\n\n"

        for client, creatives in creative_data.items():
            if not creatives:
                continue

            md += f"### {client}\n\n"

            # Top 10 CTR
            if creatives.get('top_ctr'):
                md += "#### ✅ 상위 성과 소재 (CTR Top 10)\n\n"
                md += "| 순위 | 광고명 | 캠페인 | CTR | 클릭 | 전환 | 지출 |\n"
                md += "|------|--------|--------|-----|------|------|------|\n"

                for i, ad in enumerate(creatives['top_ctr'], 1):
                    currency = ad['currency']
                    spend_str = f"₩{ad['spend']:,.0f}" if currency == "KRW" else f"${ad['spend']:,.2f}"
                    md += f"| {i} | {ad['ad_name'][:40]}... | {ad['campaign'][:25]} | {ad['ctr']:.2f}% | {ad['clicks']:,} | {ad['conversions']:,} | {spend_str} |\n"

                md += "\n**💡 인사이트**: 이 소재들의 공통점을 분석하여 다른 광고에 적용하세요.\n\n"

            # Bottom 10 CTR
            if creatives.get('bottom_ctr'):
                md += "#### 🔴 하위 성과 소재 (CTR Bottom 10)\n\n"
                md += "| 순위 | 광고명 | 캠페인 | CTR | 클릭 | 전환 | 지출 |\n"
                md += "|------|--------|--------|-----|------|------|------|\n"

                for i, ad in enumerate(creatives['bottom_ctr'], 1):
                    currency = ad['currency']
                    spend_str = f"₩{ad['spend']:,.0f}" if currency == "KRW" else f"${ad['spend']:,.2f}"
                    md += f"| {i} | {ad['ad_name'][:40]}... | {ad['campaign'][:25]} | {ad['ctr']:.2f}% | {ad['clicks']:,} | {ad['conversions']:,} | {spend_str} |\n"

                md += "\n**⚠️ 권장**: 이 소재들은 즉시 중단하거나 소재/타겟팅 교체를 고려하세요.\n\n"

    md += "\n---\n\n## 🎯 개선 권장 광고 목록\n\n"

    for client, items in by_client.items():
        md += f"### {client}\n\n"

        for i, item in enumerate(items[:20], 1):  # 상위 20개
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

        if len(items) > 20:
            md += f"*({len(items) - 20}개 광고 더 있음)*\n\n"

    md += f"""
---

**🤖 자동 생성**: KITT Agent AI
**리포트 주기**: {period}
**다음 리포트**: {'내일 오전 9시' if period == '일일' else '다음 월요일 오전 9시' if period == '주간' else '다음달 1일 오전 9시'}
"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md)

    print(f"✅ 리포트 생성: {output_path}")


def main():
    parser = argparse.ArgumentParser(description='메타광고 ROAS OFF 분석')
    parser.add_argument('--dry-run', action='store_true', help='테스트 모드')
    parser.add_argument('--days', type=int, default=7, help='분석 기간 (기본: 7일)')
    parser.add_argument('--upload', action='store_true', help='Notion 업로드')
    parser.add_argument('--period', type=str, default='주간', help='리포트 주기 (일일/주간/월간)')
    args = parser.parse_args()

    print("=" * 80)
    print(f"  메타광고 ROAS OFF {args.period} 분석")
    print(f"  실행 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"  분석 기간: 최근 {args.days}일")
    print("=" * 80)

    # 클라이언트 로드
    clients = load_clients()
    print(f"\n대상 업체: {len(clients)}개")
    for c in clients:
        print(f"  - {c['name']}")

    # 데이터 수집
    print("\n\n📥 데이터 수집 중...\n")
    all_results = []
    all_campaign_data = {}
    all_creative_data = {}

    for client in clients:
        print(f"[{client['name']}]")
        csv_path = fetch_client_data(client, args.days, args.dry_run)

        if csv_path:
            results, campaign_stats, creative_stats = analyze_roas_off(csv_path, client)
            all_results.extend(results)
            all_campaign_data[client['name']] = campaign_stats
            all_creative_data[client['name']] = creative_stats
            print(f"    📊 ROAS OFF: {len(results)}개 광고")
            print(f"    📈 캠페인: {len(campaign_stats)}개")
            print(f"    🎨 소재 분석 완료")
        print()

    # 리포트 생성
    period_dir = {
        '일일': '_roas_daily',
        '주간': '_roas_weekly',
        '월간': '_roas_monthly'
    }.get(args.period, '_roas_daily')

    output_dir = PROJECT_ROOT / "output" / "meta-ad" / period_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    today = datetime.now().strftime("%Y%m%d")
    report_path = output_dir / f"ROAS_OFF_{args.period}_{today}.md"

    if args.dry_run:
        print(f"\n[DRY-RUN] 리포트 생성: {report_path}")
    else:
        generate_markdown_report(all_results, all_campaign_data, all_creative_data, report_path, args.days, args.period)

        # Notion 업로드 (업체별/일자별)
        if args.upload:
            print("\n📤 Notion 업로드 중...")
            upload_cmd = [
                "node",
                str(PROJECT_ROOT / "scripts" / "upload_notion_roas_by_client.js"),
                "--report", str(report_path),
            ]
            result = subprocess.run(upload_cmd, cwd=str(PROJECT_ROOT))
            if result.returncode == 0:
                print("✅ Notion 업로드 완료")
            else:
                print("❌ Notion 업로드 실패")

    print("\n" + "=" * 80)
    print(f"  총 ROAS OFF 광고: {len(all_results)}개")
    print(f"  리포트 위치: {report_path}")
    print("=" * 80)


if __name__ == '__main__':
    main()
