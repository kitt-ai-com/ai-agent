#!/bin/bash
# ROAS OFF 월간 리포트 (최근 30일)
# 사용법:
#   ./run_roas_monthly.sh                # 분석만
#   ./run_roas_monthly.sh --upload       # 분석 + Notion 업로드
#   ./run_roas_monthly.sh --dry-run      # 테스트

cd "$(dirname "$0")/.."
python3 scripts/daily_roas_analysis.py --days 30 --period "월간" "$@"
