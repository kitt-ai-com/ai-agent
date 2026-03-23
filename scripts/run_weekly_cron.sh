#!/bin/bash
# 매주 월요일 오전 9시 자동 실행용 스크립트
# launchd에서 호출됨

LOG_DIR="/Users/jasonmac/kitt_agent/ai-agent/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/weekly_report_$(date +%Y%m%d_%H%M%S).log"

cd /Users/jasonmac/kitt_agent/ai-agent

# venv 활성화 후 실행
source .venv/bin/activate

echo "=== 주간 리포트 배치 시작: $(date) ===" >> "$LOG_FILE" 2>&1
python3 scripts/weekly_report.py --fetch --email >> "$LOG_FILE" 2>&1
echo "=== 배치 종료: $(date) ===" >> "$LOG_FILE" 2>&1

# 30일 이상 된 로그 삭제
find "$LOG_DIR" -name "weekly_report_*.log" -mtime +30 -delete
