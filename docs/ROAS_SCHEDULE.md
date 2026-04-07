# ROAS 리포트 자동화 스케줄

## 📅 실행 스케줄

### 1. 일일 리포트 (매일 오전 9시)
- **실행 시간**: 매일 오전 9시 KST
- **분석 기간**: 전날 (1일)
- **워크플로우**: `.github/workflows/daily-roas-report.yml`
- **Cron**: `0 0 * * *` (UTC 0시 = KST 9시)
- **출력 위치**: `output/meta-ad/_roas_daily/`

```bash
# 로컬 실행
./run_roas_daily.sh --upload
```

### 2. 주간 리포트 (매주 월요일 오전 9시)
- **실행 시간**: 매주 월요일 오전 9시 KST
- **분석 기간**: 최근 7일
- **워크플로우**: `.github/workflows/weekly-roas-report.yml`
- **Cron**: `0 0 * * 1` (UTC 0시 월요일 = KST 9시 월요일)
- **출력 위치**: `output/meta-ad/_roas_weekly/`

```bash
# 로컬 실행
./run_roas_weekly.sh --upload
```

### 3. 월간 리포트 (매월 1일 오전 9시)
- **실행 시간**: 매월 1일 오전 9시 KST
- **분석 기간**: 이전 한 달 (30일)
- **워크플로우**: `.github/workflows/monthly-roas-report.yml`
- **Cron**: `0 0 1 * *` (UTC 0시 1일 = KST 9시 1일)
- **출력 위치**: `output/meta-ad/_roas_monthly/`

```bash
# 로컬 실행
./run_roas_monthly.sh --upload
```

---

## 📊 리포트 내용

각 리포트는 다음 내용을 포함합니다:

### 공통 항목
- 📊 업체별 요약 (문제 광고 수, 총 지출)
- 🎯 개선 권장 광고 목록 (상위 20개)
- 📋 실행 가이드
  - 즉시 조치 필요 광고 (지출 상위 5개)
  - 분석 체크리스트
  - 모니터링 가이드

### ROAS OFF 판단 기준

| 지표 | KRW 기준 | USD 기준 |
|------|----------|----------|
| CTR | < 1.0% | < 1.0% |
| CPC | > ₩2,000 | > $2.0 |
| CPM | > ₩20,000 | > $20.0 |
| 최소 지출 | ₩10,000 | $10.0 |

---

## 🔔 노션 알림

각 리포트는 자동으로 Notion 페이지로 생성됩니다:

**부모 페이지**: https://www.notion.so/_-_-32d926438fe780c6b540f1d78d8d89c4

**페이지 구조**:
```
[노션 상위 업체 공용] - ROAS 일일 리포트
├── 📅 2026-03-24 ROAS OFF 일일 리포트
├── 📅 2026-03-25 ROAS OFF 일일 리포트
├── 📊 2026-03-24 ROAS OFF 주간 리포트
├── 📊 2026-03-31 ROAS OFF 주간 리포트
├── 📈 2026-04-01 ROAS OFF 월간 리포트
└── ...
```

**아이콘**:
- 📅 일일 리포트
- 📊 주간 리포트
- 📈 월간 리포트

---

## ⚙️ GitHub Actions 설정

### 필수 Secrets

Repository → Settings → Secrets and variables → Actions:

| Secret | 설명 | 예시 |
|--------|------|------|
| `META_ACCESS_TOKEN` | Meta Marketing API 토큰 | `EAAxxxxx` |
| `NOTION_TOKEN` | Notion Integration Token | `secret_xxxxx` |
| `NOTION_PAGE_ID_ROAS` | ROAS 리포트 부모 페이지 ID | `32d926438fe780c6b540f1d78d8d89c4` |

### 워크플로우 상태 확인

GitHub → Actions → 워크플로우 선택:
- ✅ Daily ROAS Report
- ✅ Weekly ROAS Report
- ✅ Monthly ROAS Report

### 수동 실행

각 워크플로우는 수동으로도 실행 가능:
1. GitHub → Actions
2. 원하는 워크플로우 선택
3. "Run workflow" 클릭

---

## 🧪 로컬 테스트

### 일일 리포트 테스트
```bash
# 분석만
./run_roas_daily.sh

# Notion 업로드 포함
./run_roas_daily.sh --upload

# 드라이런 (API 호출 없음)
./run_roas_daily.sh --dry-run
```

### 주간 리포트 테스트
```bash
./run_roas_weekly.sh --upload
```

### 월간 리포트 테스트
```bash
./run_roas_monthly.sh --upload
```

---

## 📈 리포트 히스토리

### 보관 기간

| 리포트 유형 | GitHub Actions Artifact | 로컬 파일 |
|-------------|------------------------|----------|
| 일일 | 30일 | 영구 |
| 주간 | 90일 | 영구 |
| 월간 | 365일 | 영구 |

### 다운로드

GitHub → Actions → 워크플로우 실행 → Artifacts

---

## 🔧 커스터마이징

### 분석 기간 변경

워크플로우 파일 수정:
```yaml
# 일일: 2일로 변경
- name: Run Daily ROAS Analysis
  run: python3 scripts/daily_roas_analysis.py --days 2 --upload --period "일일"

# 주간: 14일로 변경
- name: Run Weekly ROAS Analysis
  run: python3 scripts/daily_roas_analysis.py --days 14 --upload --period "주간"
```

### 실행 시간 변경

Cron 표현식 수정 (UTC 기준):
```yaml
# 오후 6시 KST (UTC 9시) 실행
- cron: '0 9 * * *'

# 오후 11시 KST (UTC 14시) 실행
- cron: '0 14 * * *'
```

### ROAS OFF 기준 변경

`scripts/daily_roas_analysis.py` 파일의 `ROAS_OFF_CRITERIA` 수정:
```python
ROAS_OFF_CRITERIA = {
    "KRW": {
        "CTR_MIN": 1.5,      # CTR 1.5% 미만
        "CPC_MAX": 1500,     # CPC 1500원 초과
        "CPM_MAX": 15000,    # CPM 15000원 초과
        "MIN_SPEND": 20000,  # 최소 지출 20000원
    },
    # ...
}
```

---

## 📞 문의

- **이슈**: GitHub Issues
- **이메일**: jason@kitt.ai

**마지막 업데이트**: 2026-03-24
