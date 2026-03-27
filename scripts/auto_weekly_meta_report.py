#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
메타광고 주간 성과 분석 자동화
- 매주 월요일 오전 9시 실행
- 지난 7일간 데이터 분석
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


def get_weekly_period():
    """주간 리포트 기간 계산 (지난 7일)"""
    today = datetime.now()
    end_date = today - timedelta(days=1)  # 어제까지
    start_date = end_date - timedelta(days=6)  # 7일간
    return start_date, end_date


def load_clients():
    """활성 클라이언트 목록 로드"""
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        clients = json.load(f)
    return [c for c in clients if c.get('enabled', False)]


def download_csv_data(client, start_date, end_date):
    """메타 광고 데이터 다운로드"""
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
    output_dir = PROJECT_ROOT / client['output_dir'] / "weekly"
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
    """노션에 리포트 업로드"""
    output_dir = PROJECT_ROOT / client['output_dir'] / "weekly"

    print(f"\n  📤 [{client['name']}] 노션 업로드 중...")

    period_label = f"주간 {start_date.strftime('%m/%d')}~{end_date.strftime('%m/%d')}"

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
    print("메타광고 주간 리포트 자동화")
    print("=" * 80)

    # 리포트 기간 계산
    start_date, end_date = get_weekly_period()

    print(f"\n📅 리포트 기간: {start_date.strftime('%Y-%m-%d')} ~ {end_date.strftime('%Y-%m-%d')} (7일간)")

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
