#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
메타광고 일일 성과 분석 자동화
- 평일만 실행 (토/일/공휴일 제외)
- 주말/공휴일 다음날은 해당 기간만큼 리포트
- 매일 오전 9시 실행
- 자동 노션 업로드
"""

import json
import os
import sys
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
CONFIG_FILE = PROJECT_ROOT / "config" / "clients.json"
ANALYZE_SCRIPT = PROJECT_ROOT / "scripts" / "analyze_meta_ad_full.py"
UPLOAD_SCRIPT = PROJECT_ROOT / "scripts" / "upload_notion_report.js"


def is_korean_holiday(date):
    """한국 공휴일 체크 (간단 버전)"""
    # 2026년 공휴일 목록
    holidays_2026 = [
        (1, 1),   # 신정
        (3, 1),   # 삼일절
        (5, 5),   # 어린이날
        (6, 6),   # 현충일
        (8, 15),  # 광복절
        (10, 3),  # 개천절
        (10, 9),  # 한글날
        (12, 25), # 크리스마스
    ]
    return (date.month, date.day) in holidays_2026


def is_weekend(date):
    """주말 체크 (토요일=5, 일요일=6)"""
    return date.weekday() >= 5


def get_report_period():
    """리포트 기간 계산 (평일만, 주말/공휴일 건너뛰기)"""
    today = datetime.now()

    # 오늘이 주말이나 공휴일이면 실행하지 않음
    if is_weekend(today) or is_korean_holiday(today):
        print(f"⏸️  오늘은 주말 또는 공휴일입니다. 리포트 생성하지 않음.")
        return None, None

    # 어제부터 역순으로 평일 찾기
    end_date = today - timedelta(days=1)

    # 주말/공휴일 건너뛰기
    while is_weekend(end_date) or is_korean_holiday(end_date):
        end_date -= timedelta(days=1)

    # 시작일: 마지막 리포트 다음날
    start_date = end_date
    check_date = end_date - timedelta(days=1)

    # 연속된 주말/공휴일이 있었는지 확인
    consecutive_skip_days = 0
    while is_weekend(check_date) or is_korean_holiday(check_date):
        consecutive_skip_days += 1
        check_date -= timedelta(days=1)

    # 연속된 건너뛴 날이 있으면 그만큼 기간 확장
    if consecutive_skip_days > 0:
        start_date = check_date

    return start_date, end_date


def load_clients():
    """활성 클라이언트 목록 로드"""
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        clients = json.load(f)
    return [c for c in clients if c.get('enabled', False)]


def download_csv_data(client, start_date, end_date):
    """메타 광고 데이터 다운로드 (수동으로 진행, 자동화 시 Meta API 사용)"""
    # 실제로는 Meta Marketing API를 사용하여 자동 다운로드
    # 여기서는 CSV 파일이 이미 input 폴더에 있다고 가정
    csv_dir = PROJECT_ROOT / client['csv_dir']
    csv_files = list(csv_dir.glob("*.csv"))

    if not csv_files:
        print(f"  ⚠️  [{client['name']}] CSV 파일 없음")
        return None

    # 가장 최근 파일 사용
    latest_csv = max(csv_files, key=lambda p: p.stat().st_mtime)
    return latest_csv


def analyze_client(client, start_date, end_date, csv_path):
    """클라이언트 광고 분석"""
    output_dir = PROJECT_ROOT / client['output_dir'] / "daily"
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
    output_dir = PROJECT_ROOT / client['output_dir'] / "daily"

    print(f"\n  📤 [{client['name']}] 노션 업로드 중...")

    period_label = f"{start_date.strftime('%Y-%m-%d')}"
    if start_date != end_date:
        period_label = f"{start_date.strftime('%m/%d')}~{end_date.strftime('%m/%d')}"

    # upload_notion_report.js 실행
    cmd = [
        "node", str(UPLOAD_SCRIPT),
        "--client", client['name'],
        "--report-dir", str(output_dir),
        "--label", f"일일 {period_label}"
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
    print("메타광고 일일 리포트 자동화")
    print("=" * 80)

    # 리포트 기간 계산
    start_date, end_date = get_report_period()

    if start_date is None:
        return

    print(f"\n📅 리포트 기간: {start_date.strftime('%Y-%m-%d')} ~ {end_date.strftime('%Y-%m-%d')}")

    if start_date != end_date:
        days_diff = (end_date - start_date).days + 1
        print(f"   (주말/공휴일 포함 {days_diff}일간 데이터)")

    # 클라이언트 로드
    clients = load_clients()
    print(f"\n📋 활성 클라이언트: {len(clients)}개")

    success_count = 0
    fail_count = 0

    for client in clients:
        try:
            print(f"\n{'─' * 80}")
            print(f"🔄 [{client['name']}] 처리 중...")

            # CSV 데이터 확인 (실제로는 Meta API로 다운로드)
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
