#!/bin/bash
# ROAS OFF 주간 리포트 (최근 7일)
# 사용법:
#   ./run_roas_weekly.sh                # 분석만
#   ./run_roas_weekly.sh --upload       # 분석 + Notion 업로드
#   ./run_roas_weekly.sh --dry-run      # 테스트

cd "$(dirname "$0")/.."
python3 scripts/daily_roas_analysis.py --days 7 --period "주간" "$@"
