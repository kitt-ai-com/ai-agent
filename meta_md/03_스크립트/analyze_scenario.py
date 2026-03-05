#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
시나리오 분석: "잠재고객_" 광고만 유지, 나머지 종료
"""

import pandas as pd
import numpy as np

# CSV 파일 읽기
csv_path = "/Users/jasonmac/Downloads/리바스인테리어-광고-2026.-2.-3.-~-2026.-3.-4..csv"
df = pd.read_csv(csv_path)

print("=" * 80)
print("시나리오 분석: '잠재고객_' 광고만 유지")
print("=" * 80)

# 광고 분류
df['캠페인_그룹'] = df['광고 이름'].apply(lambda x:
    '잠재고객_' if x.startswith('잠재고객_') else '260220_잠재고객_'
)

# 그룹별 성과
print("\n📊 현재 그룹별 성과:")
print("-" * 80)

group_performance = df.groupby('캠페인_그룹').agg({
    '지출 금액 (USD)': 'sum',
    '노출': 'sum',
    '링크 클릭': 'sum',
    '결과': lambda x: x.fillna(0).sum(),
    '광고 이름': 'count'
}).round(2)

group_performance.columns = ['지출', '노출', '클릭', '리드', '광고수']
group_performance['리드당_비용'] = group_performance.apply(
    lambda row: row['지출'] / row['리드'] if row['리드'] > 0 else 0, axis=1
).round(2)

print(group_performance)

# "잠재고객_" 그룹 상세
print("\n\n" + "=" * 80)
print("✅ 유지할 광고: '잠재고객_' 그룹 (5개)")
print("=" * 80)

keep_df = df[df['캠페인_그룹'] == '잠재고객_'].copy()
keep_df['리드'] = keep_df['결과'].fillna(0)
keep_df['리드당_비용'] = keep_df.apply(
    lambda row: row['지출 금액 (USD)'] / row['리드'] if row['리드'] > 0 else 0, axis=1
)

for idx, row in keep_df.iterrows():
    status = "✅" if row['광고 게재'] == 'active' else "❌"
    print(f"\n{status} {row['광고 이름']}")
    print(f"   상태: {row['광고 게재']}")
    print(f"   지출: ${row['지출 금액 (USD)']:.2f}")
    print(f"   리드: {row['리드']:.0f}건")
    if row['리드'] > 0:
        print(f"   리드당 비용: ${row['리드당_비용']:.2f}")
    print(f"   노출: {row['노출']:,}회")

# "260220_잠재고객_" 그룹 상세
print("\n\n" + "=" * 80)
print("❌ 종료할 광고: '260220_잠재고객_' 그룹 (7개)")
print("=" * 80)

stop_df = df[df['캠페인_그룹'] == '260220_잠재고객_'].copy()
stop_df['리드'] = stop_df['결과'].fillna(0)
stop_df['리드당_비용'] = stop_df.apply(
    lambda row: row['지출 금액 (USD)'] / row['리드'] if row['리드'] > 0 else 0, axis=1
)

for idx, row in stop_df.iterrows():
    status = "✅" if row['광고 게재'] == 'active' else "❌"
    print(f"\n{status} {row['광고 이름']}")
    print(f"   상태: {row['광고 게재']}")
    print(f"   지출: ${row['지출 금액 (USD)']:.2f}")
    print(f"   리드: {row['리드']:.0f}건")
    if row['리드'] > 0:
        print(f"   리드당 비용: ${row['리드당_비용']:.2f}")
    print(f"   노출: {row['노출']:,}회")

# 성과 비교
print("\n\n" + "=" * 80)
print("📈 시나리오 성과 비교")
print("=" * 80)

# 현재 전체
total_spend = df['지출 금액 (USD)'].sum()
total_leads = df['결과'].fillna(0).sum()
total_cpl = total_spend / total_leads if total_leads > 0 else 0

# 시나리오: 잠재고객_만 유지
keep_spend = keep_df['지출 금액 (USD)'].sum()
keep_leads = keep_df['리드'].sum()
keep_cpl = keep_spend / keep_leads if keep_leads > 0 else 0

# 손실: 260220_잠재고객_ 종료
lost_spend = stop_df['지출 금액 (USD)'].sum()
lost_leads = stop_df['리드'].sum()
lost_cpl = lost_spend / lost_leads if lost_leads > 0 else 0

print(f"\n현재 전체 성과:")
print(f"  지출: ${total_spend:.2f}")
print(f"  리드: {total_leads:.0f}건")
print(f"  리드당 비용: ${total_cpl:.2f}")

print(f"\n✅ 시나리오 실행 후 (잠재고객_만 유지):")
print(f"  지출: ${keep_spend:.2f}")
print(f"  리드: {keep_leads:.0f}건")
print(f"  리드당 비용: ${keep_cpl:.2f}" if keep_leads > 0 else "  리드당 비용: N/A (리드 없음)")

print(f"\n❌ 손실되는 성과 (260220_잠재고객_ 종료):")
print(f"  지출: ${lost_spend:.2f}")
print(f"  리드: {lost_leads:.0f}건")
print(f"  리드당 비용: ${lost_cpl:.2f}")

print(f"\n📊 변화:")
print(f"  지출 변화: ${total_spend:.2f} → ${keep_spend:.2f} ({(keep_spend - total_spend) / total_spend * 100:+.1f}%)")
print(f"  리드 변화: {total_leads:.0f}건 → {keep_leads:.0f}건 ({(keep_leads - total_leads) / total_leads * 100:+.1f}%)")
if keep_leads > 0:
    print(f"  리드당 비용 변화: ${total_cpl:.2f} → ${keep_cpl:.2f} ({(keep_cpl - total_cpl) / total_cpl * 100:+.1f}%)")

# 위험 분석
print("\n\n" + "=" * 80)
print("⚠️  위험 분석")
print("=" * 80)

# 종료할 광고 중 고성과 광고
high_performers = stop_df[stop_df['리드'] > 10].sort_values('리드당_비용')

print(f"\n🔴 종료 시 손실되는 고성과 광고:")
if len(high_performers) > 0:
    for idx, row in high_performers.iterrows():
        print(f"\n  • {row['광고 이름']}")
        print(f"    리드: {row['리드']:.0f}건 (전체의 {row['리드']/total_leads*100:.1f}%)")
        print(f"    리드당 비용: ${row['리드당_비용']:.2f}")
        if row['리드당_비용'] < total_cpl:
            print(f"    ⚠️  평균보다 {(total_cpl - row['리드당_비용']) / total_cpl * 100:.1f}% 더 효율적!")
else:
    print("  없음")

# 권장 사항
print("\n\n" + "=" * 80)
print("💡 권장 사항")
print("=" * 80)

print("""
❌ 이 시나리오는 권장하지 않습니다!

이유:
1. 가장 성과 좋은 광고들이 "260220_잠재고객_" 그룹에 있음
   - "구축아파트_영상": 65건 리드 (전체의 53.7%), 리드당 $4.08
   - "리모델링고민중_슬라이딩": 리드당 $0.24 (최저 비용)

2. "잠재고객_" 그룹은 대부분 성과가 낮거나 중단된 상태
   - KC인증: 리드당 $11.06 (최악의 효율)
   - 나머지는 지출이 없거나 극히 적음

3. 이 시나리오 실행 시:
""")

if keep_leads > 0:
    print(f"   - 리드가 {total_leads:.0f}건 → {keep_leads:.0f}건으로 {abs((keep_leads - total_leads) / total_leads * 100):.1f}% 감소")
    print(f"   - 리드당 비용이 ${total_cpl:.2f} → ${keep_cpl:.2f}로 {abs((keep_cpl - total_cpl) / total_cpl * 100):.1f}% 상승")
else:
    print(f"   - 리드가 {total_leads:.0f}건 → 0건으로 100% 감소 (치명적!)")

print("""
✅ 대안 제안:

대신 "성과 기반" 선택을 권장합니다:
1. 리드당 비용 기준으로 상위 50% 광고만 유지
2. 그룹명이 아닌 실제 성과로 판단
3. 고성과 광고 유지:
   - 260220_잠재고객_구축아파트_영상 (필수)
   - 260220_잠재고객_리모델링고민중_슬라이딩 (필수)
   - 잠재고객_단2일이면충분 (고려)
4. 저성과 광고 종료:
   - 잠재고객_KC인증 (즉시 종료)
   - 성과 없는 광고들
""")

print("\n" + "=" * 80)
print("분석 완료")
print("=" * 80)
