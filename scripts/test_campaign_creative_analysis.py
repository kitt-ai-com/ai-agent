#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
캠페인별/소재별 분석 기능 테스트
"""

import sys
from pathlib import Path

# 프로젝트 루트를 sys.path에 추가
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))

from daily_roas_analysis import analyze_roas_off

# 테스트 클라이언트
test_client = {
    'name': '미친특가_카이',
    'currency': 'KRW'
}

# CSV 파일 경로
csv_path = PROJECT_ROOT / "input/meta-ad/미친특가_카이/미친특가_카이_20260324.csv"

print("=" * 80)
print("  캠페인별/소재별 성과 분석 테스트")
print("=" * 80)
print(f"\n파일: {csv_path}")
print(f"업체: {test_client['name']}\n")

if not csv_path.exists():
    print(f"❌ 파일 없음: {csv_path}")
    sys.exit(1)

# 분석 실행
results, campaign_stats, creative_stats = analyze_roas_off(csv_path, test_client)

print(f"\n✅ 분석 완료!")
print(f"   ROAS OFF 광고: {len(results)}개")
print(f"   캠페인 수: {len(campaign_stats)}개")
print(f"   소재 분석: {'완료' if creative_stats else '없음'}")

# 캠페인별 성과
if campaign_stats:
    print("\n" + "=" * 80)
    print("  캠페인별 성과 Top 5")
    print("=" * 80)
    sorted_campaigns = sorted(campaign_stats.items(), key=lambda x: x[1]['spend'], reverse=True)
    for i, (campaign, stats) in enumerate(sorted_campaigns[:5], 1):
        print(f"\n{i}. {campaign[:50]}")
        print(f"   지출: ₩{stats['spend']:,.0f}")
        print(f"   CTR: {stats['ctr']:.2f}% | CVR: {stats['cvr']:.2f}%")
        print(f"   CPC: ₩{stats['cpc']:,.0f} | CPA: ₩{stats['cpa']:,.0f}")

# 소재별 성과
if creative_stats:
    print("\n" + "=" * 80)
    print("  소재별 성과 분석")
    print("=" * 80)

    if creative_stats.get('top_ctr'):
        print(f"\n✅ 상위 CTR 소재: {len(creative_stats['top_ctr'])}개")
        for i, ad in enumerate(creative_stats['top_ctr'][:3], 1):
            print(f"   {i}. {ad['ad_name'][:40]} - CTR {ad['ctr']:.2f}%")

    if creative_stats.get('bottom_ctr'):
        print(f"\n🔴 하위 CTR 소재: {len(creative_stats['bottom_ctr'])}개")
        for i, ad in enumerate(creative_stats['bottom_ctr'][:3], 1):
            print(f"   {i}. {ad['ad_name'][:40]} - CTR {ad['ctr']:.2f}%")

print("\n" + "=" * 80)
print("  테스트 완료!")
print("=" * 80)
