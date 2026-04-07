#!/bin/bash
# ROAS OFF 일일 리포트 (전날 데이터)
# 사용법:
#   ./run_roas_daily.sh                # 분석만
#   ./run_roas_daily.sh --upload       # 분석 + Notion 업로드
#   ./run_roas_daily.sh --dry-run      # 테스트

cd "$(dirname "$0")/.."
python3 scripts/daily_roas_analysis.py --days 1 --period "일일" "$@"
