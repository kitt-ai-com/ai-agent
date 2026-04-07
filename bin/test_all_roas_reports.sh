#!/bin/bash
# 일일/주간/월간 ROAS 리포트 전체 테스트
# 기존 CSV 데이터로 각 기간별 리포트 생성

cd "$(dirname "$0")/.."

echo "════════════════════════════════════════════════════════════════"
echo "  ROAS OFF 리포트 통합 테스트"
echo "  실행 시간: $(date '+%Y-%m-%d %H:%M:%S')"
echo "════════════════════════════════════════════════════════════════"
echo ""

# 테스트용 임시 스크립트 실행
echo "📅 [1/3] 일일 리포트 생성 중..."
python3 scripts/test_roas_analysis.py > /dev/null 2>&1
if [ -f "output/meta-ad/_roas_daily/ROAS_OFF_TEST_20260324.md" ]; then
    size=$(ls -lh output/meta-ad/_roas_daily/ROAS_OFF_TEST_20260324.md | awk '{print $5}')
    echo "     ✅ 생성 완료: output/meta-ad/_roas_daily/ROAS_OFF_TEST_20260324.md ($size)"
else
    echo "     ❌ 생성 실패"
fi
echo ""

echo "📊 [2/3] 주간 리포트 생성 중..."
# 주간 리포트용 수정된 스크립트로 생성
python3 -c "
import sys
sys.path.insert(0, 'scripts')
from test_roas_analysis import *

# 주간용으로 수정
output_dir = PROJECT_ROOT / 'output' / 'meta-ad' / '_roas_weekly'
output_dir.mkdir(parents=True, exist_ok=True)

clients = load_clients()
all_results = []

for client in clients:
    csv_path = find_latest_csv(client)
    if csv_path:
        results = analyze_roas_off(csv_path, client)
        all_results.extend(results)

today = datetime.now().strftime('%Y%m%d')
report_path = output_dir / f'ROAS_OFF_주간_TEST_{today}.md'
generate_markdown_report(all_results, report_path, test_mode=True)
" > /dev/null 2>&1

if [ -f "output/meta-ad/_roas_weekly/ROAS_OFF_주간_TEST_20260324.md" ]; then
    size=$(ls -lh output/meta-ad/_roas_weekly/ROAS_OFF_주간_TEST_20260324.md | awk '{print $5}')
    echo "     ✅ 생성 완료: output/meta-ad/_roas_weekly/ROAS_OFF_주간_TEST_20260324.md ($size)"
else
    echo "     ❌ 생성 실패"
fi
echo ""

echo "📈 [3/3] 월간 리포트 생성 중..."
# 월간 리포트용 수정된 스크립트로 생성
python3 -c "
import sys
sys.path.insert(0, 'scripts')
from test_roas_analysis import *

# 월간용으로 수정
output_dir = PROJECT_ROOT / 'output' / 'meta-ad' / '_roas_monthly'
output_dir.mkdir(parents=True, exist_ok=True)

clients = load_clients()
all_results = []

for client in clients:
    csv_path = find_latest_csv(client)
    if csv_path:
        results = analyze_roas_off(csv_path, client)
        all_results.extend(results)

today = datetime.now().strftime('%Y%m%d')
report_path = output_dir / f'ROAS_OFF_월간_TEST_{today}.md'
generate_markdown_report(all_results, report_path, test_mode=True)
" > /dev/null 2>&1

if [ -f "output/meta-ad/_roas_monthly/ROAS_OFF_월간_TEST_20260324.md" ]; then
    size=$(ls -lh output/meta-ad/_roas_monthly/ROAS_OFF_월간_TEST_20260324.md | awk '{print $5}')
    echo "     ✅ 생성 완료: output/meta-ad/_roas_monthly/ROAS_OFF_월간_TEST_20260324.md ($size)"
else
    echo "     ❌ 생성 실패"
fi
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "  📊 생성된 리포트 요약"
echo "════════════════════════════════════════════════════════════════"
echo ""

# 각 리포트에서 요약 추출
echo "📅 일일 리포트:"
if [ -f "output/meta-ad/_roas_daily/ROAS_OFF_TEST_20260324.md" ]; then
    grep "총 문제 광고" output/meta-ad/_roas_daily/ROAS_OFF_TEST_20260324.md | head -1
    echo ""
fi

echo "📊 주간 리포트:"
if [ -f "output/meta-ad/_roas_weekly/ROAS_OFF_주간_TEST_20260324.md" ]; then
    grep "총 문제 광고" output/meta-ad/_roas_weekly/ROAS_OFF_주간_TEST_20260324.md | head -1
    echo ""
fi

echo "📈 월간 리포트:"
if [ -f "output/meta-ad/_roas_monthly/ROAS_OFF_월간_TEST_20260324.md" ]; then
    grep "총 문제 광고" output/meta-ad/_roas_monthly/ROAS_OFF_월간_TEST_20260324.md | head -1
    echo ""
fi

echo "════════════════════════════════════════════════════════════════"
echo "  ✅ 테스트 완료!"
echo "════════════════════════════════════════════════════════════════"
