#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
기존 수집된 데이터로 리포트 생성 테스트
"""

import json
from pathlib import Path
from datetime import datetime
from daily_roas_analysis import analyze_roas_off, generate_markdown_report, load_clients

PROJECT_ROOT = Path(__file__).parent.parent

# 2024-03-24 데이터 사용
test_date = "20260324"

print("=" * 80)
print("  기존 데이터로 캠페인별/소재별 분석 리포트 생성")
print("=" * 80)
print(f"데이터: {test_date}\n")

clients = load_clients()
all_results = []
all_campaign_data = {}
all_creative_data = {}

for client in clients:
    csv_path = PROJECT_ROOT / "input" / "meta-ad" / client['name'] / f"{client['name']}_{test_date}.csv"

    if not csv_path.exists():
        print(f"⏭️  {client['name']}: CSV 없음")
        continue

    print(f"📊 {client['name']}")
    results, campaign_stats, creative_stats = analyze_roas_off(csv_path, client)
    all_results.extend(results)
    all_campaign_data[client['name']] = campaign_stats
    all_creative_data[client['name']] = creative_stats

    print(f"   ROAS OFF: {len(results)}개")
    print(f"   캠페인: {len(campaign_stats)}개")
    print(f"   소재 TOP: {len(creative_stats.get('top_ctr', []))}개")
    print()

# 리포트 생성
output_dir = PROJECT_ROOT / "output" / "meta-ad" / "_roas_daily"
output_dir.mkdir(parents=True, exist_ok=True)

report_path = output_dir / f"ROAS_OFF_일일_TEST_{test_date}.md"

generate_markdown_report(all_results, all_campaign_data, all_creative_data, report_path, 1, '일일')

print("=" * 80)
print(f"✅ 리포트 생성 완료!")
print(f"📄 {report_path}")
print(f"📊 총 ROAS OFF 광고: {len(all_results)}개")
print("=" * 80)
