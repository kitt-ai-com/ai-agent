#!/bin/bash
# 매주 월요일 업체별 메타광고 리포트 생성
# 사용법:
#   ./run_weekly_report.sh                          # 전체 업체 분석
#   ./run_weekly_report.sh --upload                  # 분석 + Notion 업로드
#   ./run_weekly_report.sh --client "리바스인테리어"   # 특정 업체만
#   ./run_weekly_report.sh --dry-run                 # 테스트

cd "$(dirname "$0")"
python3 scripts/weekly_report.py "$@"
