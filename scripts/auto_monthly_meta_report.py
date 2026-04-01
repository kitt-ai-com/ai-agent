#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
메타광고 월간 성과 분석 자동화
- 매월 1일 오전 9시 실행
- 이전 달 전체 기간 데이터 분석
- 자동 노션 업로드
"""

import json
import os
import sys
import subprocess
from datetime import datetime, timedelta
from pathlib import Path
import calendar

PROJECT_ROOT = Path(__file__).parent.parent
CONFIG_FILE = PROJECT_ROOT / "config" / "clients.json"
ANALYZE_SCRIPT = PROJECT_ROOT / "scripts" / "analyze_meta_ad_full.py"
UPLOAD_SCRIPT = PROJECT_ROOT / "scripts" / "upload_notion_report.js"


def get_monthly_period():
    """월간 리포트 기간 계산 (이전 달 1일~말일)"""
    today = datetime.now()

    # 이전 달 계산
    first_day_this_month = today.replace(day=1)
    last_day_prev_month = first_day_this_month - timedelta(days=1)
    first_day_prev_month = last_day_prev_month.replace(day=1)

    return first_day_prev_month, last_day_prev_month


def load_clients():
    """활성 클라이언트 목록 로드"""
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        clients = json.load(f)
    return [c for c in clients if c.get('enabled', False)]


def download_csv_data(client, start_date, end_date):
    """메타 API에서 월간 광고 데이터 다운로드 (실패시 기존 CSV 사용)"""
    csv_dir = PROJECT_ROOT / client['csv_dir']
    csv_dir.mkdir(parents=True, exist_ok=True)

    # 월간 데이터 파일명 (예: 리바스인테리어_monthly_202603.csv)
    month_label = start_date.strftime("%Y%m")
    csv_filename = f"{client['name']}_monthly_{month_label}.csv"
    csv_path = csv_dir / csv_filename

    # 이미 다운로드된 월간 파일이 있으면 재사용
    if csv_path.exists():
        print(f"  ✅ [{client['name']}] 기존 월간 CSV 사용: {csv_filename}")
        return csv_path

    print(f"  📥 [{client['name']}] 메타 API에서 데이터 다운로드 중...")

    # 메타 API에서 데이터 다운로드
    fetch_script = PROJECT_ROOT / "scripts" / "fetch_meta_ads.py"

    cmd = [
        sys.executable, str(fetch_script),
        "--account", client['ad_account_id'],
        "--date-start", start_date.strftime("%Y-%m-%d"),
        "--date-end", end_date.strftime("%Y-%m-%d"),
        "--output", str(csv_dir),
        "--filename", csv_filename,
        "--currency", client.get('currency', 'USD')
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, cwd=str(PROJECT_ROOT))

    # API 다운로드 실패시 fallback: 기존 CSV 파일 중 가장 최근 것 사용
    if result.returncode != 0:
        print(f"  ⚠️  [{client['name']}] API 다운로드 실패 (토큰 만료 가능성)")
        csv_files = list(csv_dir.glob("*.csv"))
        if csv_files:
            latest_csv = max(csv_files, key=lambda p: p.stat().st_mtime)
            print(f"  ⚠️  [{client['name']}] 기존 CSV로 대체: {latest_csv.name}")
            return latest_csv
        else:
            print(f"  ❌ [{client['name']}] 사용 가능한 CSV 파일 없음")
            return None

    if not csv_path.exists():
        print(f"  ⚠️  [{client['name']}] CSV 파일 생성 안됨")
        return None

    print(f"  ✅ [{client['name']}] 데이터 다운로드 완료: {csv_filename}")
    return csv_path


def analyze_client(client, start_date, end_date, csv_path):
    """클라이언트 광고 분석"""
    output_dir = PROJECT_ROOT / client['output_dir'] / "monthly"
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n  📊 [{client['name']}] 분석 중...")

    # analyze_meta_ad_full.py 실행
    cmd = [
        sys.executable, str(ANALYZE_SCRIPT),
        "--csv", str(csv_path),
        "--output", str(output_dir)
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, cwd=str(PROJECT_ROOT))

    if result.returncode != 0:
        print(f"  ❌ [{client['name']}] 분석 실패:")
        print(result.stderr)
        return False

    print(f"  ✅ [{client['name']}] 분석 완료")
    return True


def upload_to_notion(client, start_date, end_date):
    """노션에 리포트 업로드 (ROAS 페이지)"""
    output_dir = PROJECT_ROOT / client['output_dir'] / "monthly"

    print(f"\n  📤 [{client['name']}] 노션 업로드 중...")

    # "월간 3월 (03/01~03/31)" 형식
    period_label = f"월간 {start_date.month}월 ({start_date.strftime('%m/%d')}~{end_date.strftime('%m/%d')})"

    # upload_notion_report.js 실행
    cmd = [
        "node", str(UPLOAD_SCRIPT),
        "--client", client['name'],
        "--report-dir", str(output_dir),
        "--label", period_label
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, cwd=str(PROJECT_ROOT))

    if result.returncode != 0:
        print(f"  ❌ [{client['name']}] 노션 업로드 실패:")
        print(result.stderr)
        return False

    print(f"  ✅ [{client['name']}] 노션 업로드 완료")
    return True


def main():
    print("=" * 80)
    print("메타광고 월간 리포트 자동화")
    print("=" * 80)

    # 리포트 기간 계산
    start_date, end_date = get_monthly_period()

    print(f"\n📅 리포트 기간: {start_date.strftime('%Y-%m-%d')} ~ {end_date.strftime('%Y-%m-%d')} ({start_date.strftime('%Y년 %m월')})")

    # 클라이언트 로드
    clients = load_clients()
    print(f"\n📋 활성 클라이언트: {len(clients)}개")

    success_count = 0
    fail_count = 0

    for client in clients:
        try:
            print(f"\n{'─' * 80}")
            print(f"🔄 [{client['name']}] 처리 중...")

            # CSV 데이터 확인
            csv_path = download_csv_data(client, start_date, end_date)
            if not csv_path:
                fail_count += 1
                continue

            # 분석 실행
            if not analyze_client(client, start_date, end_date, csv_path):
                fail_count += 1
                continue

            # 노션 업로드
            if not upload_to_notion(client, start_date, end_date):
                fail_count += 1
                continue

            success_count += 1

        except Exception as e:
            print(f"  ❌ [{client['name']}] 오류 발생: {e}")
            fail_count += 1

    # 결과 요약
    print(f"\n{'=' * 80}")
    print(f"✨ 완료: 성공 {success_count}개 / 실패 {fail_count}개")
    print(f"{'=' * 80}")


if __name__ == "__main__":
    main()
