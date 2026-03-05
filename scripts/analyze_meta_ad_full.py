#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
메타광고 성과 분석 자동화 스크립트 (전체 버전)
- 상세 리포트, 요약, 체크리스트 자동 생성
"""

import pandas as pd
import numpy as np
import sys
import os
from datetime import datetime
import argparse

def analyze_meta_ads(csv_path, output_dir="output/meta-ad"):
    """메타광고 CSV 분석 및 리포트 생성"""

    # 출력 디렉토리 생성
    os.makedirs(output_dir, exist_ok=True)

    print("=" * 80)
    print("메타광고 성과 분석 시작")
    print("=" * 80)

    # CSV 읽기
    try:
        df = pd.read_csv(csv_path)
        print(f"\n✅ CSV 파일 로드 완료: {len(df)}개 광고")
    except Exception as e:
        print(f"\n❌ CSV 파일 읽기 실패: {e}")
        print("\n💡 해결 방법:")
        print("   1. 파일 경로가 올바른지 확인")
        print("   2. CSV 파일이 UTF-8 인코딩인지 확인")
        print("   3. Excel에서 '다른 이름으로 저장' → 'CSV UTF-8' 선택")
        sys.exit(1)

    # 기본 분석
    total_spend = df['지출 금액 (USD)'].sum()
    total_impressions = df['노출'].sum()
    total_clicks = df['링크 클릭'].fillna(0).sum()
    total_leads = df['결과'].fillna(0).sum()

    avg_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    avg_cpc = (total_spend / total_clicks) if total_clicks > 0 else 0
    avg_cpl = (total_spend / total_leads) if total_leads > 0 else 0

    print(f"\n📊 전체 성과 요약:")
    print(f"   총 지출: ${total_spend:.2f}")
    print(f"   총 노출: {total_impressions:,}회")
    print(f"   총 클릭: {total_clicks:.0f}회")
    print(f"   총 리드: {total_leads:.0f}건")
    print(f"   평균 CTR: {avg_ctr:.2f}%")
    print(f"   평균 CPC: ${avg_cpc:.2f}")
    print(f"   리드당 비용: ${avg_cpl:.2f}")

    # 1. 상세 리포트 생성
    print(f"\n📝 상세 리포트 생성 중...")
    report_path = os.path.join(output_dir, "분석_리포트.md")
    generate_detailed_report(df, report_path)
    print(f"   ✅ {report_path}")

    # 2. 1페이지 요약 생성
    print(f"\n📄 1페이지 요약 생성 중...")
    summary_path = os.path.join(output_dir, "1페이지_요약.md")
    generate_summary_report(df, summary_path)
    print(f"   ✅ {summary_path}")

    # 3. 실행 체크리스트 생성
    print(f"\n✅ 실행 체크리스트 생성 중...")
    checklist_path = os.path.join(output_dir, "실행_체크리스트.md")
    generate_checklist(df, checklist_path)
    print(f"   ✅ {checklist_path}")

    # 4. 상세 데이터 CSV 저장
    print(f"\n💾 상세 데이터 저장 중...")
    csv_output_path = os.path.join(output_dir, "상세_데이터.csv")
    df_export = df.copy()
    df_export['리드당_비용'] = df_export.apply(
        lambda row: row['지출 금액 (USD)'] / row['결과'] if pd.notna(row['결과']) and row['결과'] > 0 else np.nan,
        axis=1
    )
    df_export.to_csv(csv_output_path, index=False, encoding='utf-8-sig')
    print(f"   ✅ {csv_output_path}")

    print("\n" + "=" * 80)
    print("✨ 분석 완료!")
    print("=" * 80)
    print(f"\n📁 생성된 파일:")
    print(f"   1. {report_path}")
    print(f"   2. {summary_path}")
    print(f"   3. {checklist_path}")
    print(f"   4. {csv_output_path}")
    print(f"\n💡 다음 단계:")
    print(f"   1. '{summary_path}' 파일을 열어 핵심 인사이트 확인")
    print(f"   2. 즉시 실행 액션 3가지 메타광고 관리자에서 적용")
    print(f"   3. '{checklist_path}' 파일로 진행 상황 추적")

    return {
        'total_spend': total_spend,
        'total_leads': total_leads,
        'avg_cpl': avg_cpl,
        'avg_ctr': avg_ctr
    }


def generate_detailed_report(df, output_path):
    """상세 분석 리포트 생성 (간략 버전)"""

    # 기본 통계
    total_spend = df['지출 금액 (USD)'].sum()
    total_leads = df['결과'].fillna(0).sum()
    avg_cpl = total_spend / total_leads if total_leads > 0 else 0

    # 고성과/저성과 광고
    df_with_leads = df[df['결과'].fillna(0) > 0].copy()
    df_with_leads['리드당_비용'] = df_with_leads['지출 금액 (USD)'] / df_with_leads['결과']

    best_ads = df_with_leads.nsmallest(3, '리드당_비용')
    worst_ads = df_with_leads.nlargest(3, '리드당_비용')

    # 리포트 작성
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"""# 메타광고 성과 분석 리포트

**분석일**: {datetime.now().strftime('%Y-%m-%d')}
**총 지출**: ${total_spend:.2f}
**총 리드**: {total_leads:.0f}건
**리드당 평균 비용**: ${avg_cpl:.2f}

---

## 📊 핵심 인사이트

### 🏆 최고 성과 광고 TOP 3

""")

        for idx, (_, row) in enumerate(best_ads.iterrows(), 1):
            f.write(f"""
#### {idx}. {row['광고 이름']}
- **리드당 비용**: ${row['리드당_비용']:.2f}
- **리드 수**: {row['결과']:.0f}건
- **지출**: ${row['지출 금액 (USD)']:.2f}
- **상태**: {"✅ Active" if row['광고 게재'] == 'active' else "❌ Inactive"}

""")

        f.write(f"""
---

### ❌ 개선 필요 광고 TOP 3

""")

        for idx, (_, row) in enumerate(worst_ads.iterrows(), 1):
            f.write(f"""
#### {idx}. {row['광고 이름']}
- **리드당 비용**: ${row['리드당_비용']:.2f} (평균의 {row['리드당_비용']/avg_cpl:.1f}배)
- **리드 수**: {row['결과']:.0f}건
- **지출**: ${row['지출 금액 (USD)']:.2f}
- **상태**: {"✅ Active" if row['광고 게재'] == 'active' else "❌ Inactive"}
- **권장 조치**: {"즉시 중단" if row['광고 게재'] == 'active' else "이미 중단됨"}

""")

        f.write(f"""
---

## 💡 즉시 실행 액션

### 1. 저성과 광고 중단
""")

        for _, row in worst_ads[worst_ads['광고 게재'] == 'active'].iterrows():
            f.write(f"- ❌ '{row['광고 이름']}' 중단 → 월 ${row['지출 금액 (USD)']:.2f} 절감\n")

        f.write(f"""
### 2. 고성과 광고 예산 증액
""")

        for _, row in best_ads.head(2).iterrows():
            f.write(f"- ✅ '{row['광고 이름']}' 예산 +50% 증액\n")

        f.write(f"""
### 3. 신규 광고 제작
- 고성과 광고의 포맷과 메시지를 활용한 유사 광고 3-5개 제작

---

**다음 단계**: 1페이지_요약.md 파일 확인
""")


def generate_summary_report(df, output_path):
    """1페이지 요약 리포트"""

    total_spend = df['지출 금액 (USD)'].sum()
    total_leads = df['결과'].fillna(0).sum()
    avg_cpl = total_spend / total_leads if total_leads > 0 else 0

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"""# 메타광고 성과 분석 1페이지 요약

**분석일**: {datetime.now().strftime('%Y-%m-%d')}

## 📊 전체 성과

- **총 지출**: ${total_spend:.2f}
- **총 리드**: {total_leads:.0f}건
- **리드당 평균 비용**: ${avg_cpl:.2f}

---

## ⚡ 즉시 실행 액션 3가지

### 1. 저성과 광고 중단
- 리드당 비용이 평균의 1.5배 이상인 광고 즉시 중단
- 예상 절감: 월 $XXX

### 2. 고성과 광고 예산 증액
- 리드당 비용이 가장 낮은 광고 2개에 예산 +50% 증액
- 예상 효과: 리드 +30-40%

### 3. 신규 광고 제작
- 고성과 광고 포맷을 활용한 유사 광고 3-5개 제작
- 예상 효과: 전체 리드당 비용 20% 절감

---

## 📈 예상 개선 효과

| 지표 | 현재 | 목표 | 변화 |
|------|------|------|------|
| 리드당 비용 | ${avg_cpl:.2f} | ${avg_cpl * 0.7:.2f} | -30% |
| 월 리드 | {total_leads:.0f}건 | {total_leads * 1.4:.0f}건 | +40% |

---

**상세 내용**: 분석_리포트.md 참조
**실행 계획**: 실행_체크리스트.md 참조
""")


def generate_checklist(df, output_path):
    """실행 체크리스트 생성"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"""# 메타광고 최적화 실행 체크리스트

**작성일**: {datetime.now().strftime('%Y-%m-%d')}

---

## 🔴 즉시 실행 (오늘 ~ 3일)

### 광고 중단/활성화
- [ ] 저성과 광고 3개 중단 (분석_리포트.md 참조)
- [ ] 고성과 광고 예산 +50% 증액

### 전환 추적 확인
- [ ] 메타 픽셀 설치 확인
- [ ] 전환 이벤트 정상 작동 확인

---

## 🟡 단기 실행 (1-2주)

### 신규 크리에이티브 제작
- [ ] 고성과 광고 유사 소재 3개 제작
- [ ] A/B 테스트 시작 (각 $50 예산)

### 타겟팅 최적화
- [ ] Lookalike 오디언스 생성 (1%)
- [ ] 관심사 타겟팅 세분화

---

## 🟢 중기 실행 (1개월)

### 스케일업
- [ ] 고성과 광고 예산 2배 증액
- [ ] 리타게팅 캠페인 추가

### 자동화
- [ ] 자동화 규칙 설정 (ROAS 기준)
- [ ] 주간 성과 리포트 자동화

---

## 📊 성과 측정

### 1주일 후
- [ ] CTR, CPC, 리드당 비용 확인
- [ ] 저성과 광고 추가 중단

### 2주일 후
- [ ] A/B 테스트 결과 분석
- [ ] 승자 광고 예산 증액

### 1개월 후
- [ ] 전체 성과 재분석
- [ ] 다음 달 전략 수립

---

**참고**: 분석_리포트.md에서 구체적인 광고명 확인
""")


def main():
    parser = argparse.ArgumentParser(description='메타광고 성과 분석 자동화')
    parser.add_argument('--csv', type=str, help='CSV 파일 경로')
    parser.add_argument('--output', type=str, default='output/meta-ad', help='출력 디렉토리')

    args = parser.parse_args()

    # CSV 경로 입력
    if args.csv:
        csv_path = args.csv
    else:
        print("\n📁 CSV 파일 경로를 입력하세요:")
        print("   예: /Users/Downloads/광고데이터.csv")
        csv_path = input("\n> ").strip()

    # 파일 존재 확인
    if not os.path.exists(csv_path):
        print(f"\n❌ 파일을 찾을 수 없습니다: {csv_path}")
        sys.exit(1)

    # 분석 실행
    analyze_meta_ads(csv_path, args.output)


if __name__ == "__main__":
    main()
