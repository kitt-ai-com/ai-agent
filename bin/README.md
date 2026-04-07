# Shell Scripts - ROAS 리포트 실행 스크립트

이 폴더에는 ROAS OFF 분석 리포트를 생성하는 셸 스크립트가 있습니다.

## 📋 스크립트 목록

### 1. run_roas_daily.sh
**일일 리포트 생성** (전날 데이터)

```bash
./bin/run_roas_daily.sh                # 분석만
./bin/run_roas_daily.sh --upload       # 분석 + Notion 업로드
./bin/run_roas_daily.sh --dry-run      # 테스트
```

### 2. run_roas_weekly.sh
**주간 리포트 생성** (최근 7일)

```bash
./bin/run_roas_weekly.sh                # 분석만
./bin/run_roas_weekly.sh --upload       # 분석 + Notion 업로드
./bin/run_roas_weekly.sh --dry-run      # 테스트
```

### 3. run_roas_monthly.sh
**월간 리포트 생성** (최근 30일)

```bash
./bin/run_roas_monthly.sh                # 분석만
./bin/run_roas_monthly.sh --upload       # 분석 + Notion 업로드
./bin/run_roas_monthly.sh --dry-run      # 테스트
```

### 4. test_all_roas_reports.sh
**전체 리포트 테스트** (일일/주간/월간)

```bash
./bin/test_all_roas_reports.sh
```

기존 CSV 데이터로 세 가지 기간별 리포트를 모두 생성하여 테스트합니다.

## 🤖 자동화

이 스크립트들은 수동 실행용입니다. 자동 스케줄링은 GitHub Actions를 통해 이루어집니다:

- **일일**: 매일 오전 9시 (`.github/workflows/daily-roas-report.yml`)
- **주간**: 매주 월요일 오전 9시 (`.github/workflows/weekly-roas-report.yml`)
- **월간**: 매월 1일 오전 9시 (`.github/workflows/monthly-roas-report.yml`)

## 📂 출력 위치

- 일일 리포트: `output/meta-ad/_roas_daily/`
- 주간 리포트: `output/meta-ad/_roas_weekly/`
- 월간 리포트: `output/meta-ad/_roas_monthly/`

## 📌 참고

- 모든 스크립트는 프로젝트 루트에서 실행됩니다
- Python 스크립트는 `scripts/daily_roas_analysis.py`를 호출합니다
