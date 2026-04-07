# ROAS OFF 분석 자동화 설정 가이드

매일 아침 9시, 전체 클라이언트의 메타광고 성과를 분석하여 ROAS OFF 대상 광고를 식별하고 노션에 자동으로 리포트를 생성합니다.

## 📋 개요

### 기능
- ✅ 전체 활성 클라이언트 광고 성과 자동 수집 (최근 7일)
- ✅ 캠페인/광고 세트/소재별 ROAS OFF 대상 식별
- ✅ 개선 권장사항 자동 생성
- ✅ 노션 페이지 자동 생성 및 업로드
- ✅ 매일 오전 9시 자동 실행 (GitHub Actions)

### ROAS OFF 판단 기준

| 지표 | KRW 기준 | USD 기준 | 설명 |
|------|----------|----------|------|
| CTR | < 1.0% | < 1.0% | 클릭률 낮음 |
| CPC | > ₩2,000 | > $2.0 | 클릭당 비용 높음 |
| CPM | > ₩20,000 | > $20.0 | 노출당 비용 높음 |
| 최소 지출 | ₩10,000 | $10.0 | 분석 대상 최소 금액 |

## 🚀 설정 방법

### 1. 환경 변수 설정

`.env` 파일에 다음 내용 추가:

```bash
# Notion API
NOTION_TOKEN="secret_xxxxxxxxxxxxx"
NOTION_PAGE_ID_ROAS="32d926438fe780c6b540f1d78d8d89c4"
```

#### Notion Token 발급 방법:
1. [Notion Integrations](https://www.notion.so/my-integrations) 접속
2. "New integration" 클릭
3. 이름 입력 (예: "KITT Meta Ad Analyzer")
4. "Submit" → Token 복사

#### Notion Page 연결:
1. 대상 페이지 열기: https://www.notion.so/_-_-32d926438fe780c6b540f1d78d8d89c4
2. 우측 상단 "..." → "Add connections"
3. 위에서 만든 Integration 선택

### 2. GitHub Secrets 설정 (자동화용)

GitHub Repository → Settings → Secrets and variables → Actions:

- `META_ACCESS_TOKEN`: Meta Marketing API 토큰
- `NOTION_TOKEN`: Notion API 토큰
- `NOTION_PAGE_ID_ROAS`: `32d926438fe780c6b540f1d78d8d89c4`

### 3. Node 패키지 설치

```bash
npm install
```

필요한 패키지:
- `@notionhq/client`
- `dotenv`

## 💻 사용 방법

### 로컬 실행

```bash
# 분석만 (Notion 업로드 없음)
./run_roas_analysis.sh

# 분석 + Notion 업로드
./run_roas_analysis.sh --upload

# 테스트 모드 (데이터 수집 없음)
./run_roas_analysis.sh --dry-run

# 기간 변경 (14일)
./run_roas_analysis.sh --days 14 --upload
```

### 자동 실행

GitHub Actions 워크플로우가 **매일 오전 9시 KST**에 자동 실행됩니다.

- 워크플로우 파일: `.github/workflows/daily-roas-report.yml`
- 수동 실행: GitHub → Actions → "Daily ROAS Analysis" → "Run workflow"

## 📊 생성되는 리포트

### 노션 페이지 구조

```
[노션 상위 업체 공용] - ROAS 일일 리포트
├── 2026-03-24 ROAS OFF 분석
├── 2026-03-25 ROAS OFF 분석
└── ...
```

### 리포트 내용

1. **업체별 요약**
   - 문제 광고 수
   - 총 지출 금액

2. **개선 권장 광고 목록** (상위 20개)
   - 캠페인/광고 세트/광고 이름
   - 성과 지표 (CTR, CPC, CPM)
   - 문제점 분석
   - 권장 조치사항 체크리스트

3. **실행 가이드**
   - 즉시 조치 필요 광고 (지출 상위 5개)
   - 분석 체크리스트
   - 주간 모니터링 가이드

### 로컬 파일

`output/meta-ad/_roas_daily/ROAS_OFF_YYYYMMDD.md`

## 🔧 트러블슈팅

### Notion 업로드 실패

```bash
# .env 파일 확인
cat .env | grep NOTION

# 수동으로 테스트
node scripts/upload_notion_roas.js --report output/meta-ad/_roas_daily/ROAS_OFF_20260324.md
```

### Meta API 토큰 만료

```bash
# 토큰 만료 확인
python3 scripts/check_token_expiry.py

# 토큰 재발급: https://developers.facebook.com/tools/explorer/
```

### GitHub Actions 실패

1. Actions 탭에서 로그 확인
2. Secrets 설정 확인
3. 토큰 유효성 확인

## 📁 관련 파일

```
ai-agent/
├── scripts/
│   ├── daily_roas_analysis.py       # ROAS 분석 메인 스크립트
│   ├── upload_notion_roas.js        # Notion 업로드 스크립트
│   └── fetch_meta_ads.py            # Meta API 데이터 수집
├── .github/workflows/
│   └── daily-roas-report.yml        # 일일 자동 실행 워크플로우
├── config/
│   └── clients.json                 # 클라이언트 설정 (enabled: true/false)
├── run_roas_analysis.sh             # 실행 스크립트
└── .env                             # 환경 변수 (gitignore)
```

## 🎯 다음 단계

1. ✅ 시스템 설정 완료
2. ⏳ 로컬 테스트: `./run_roas_analysis.sh --upload`
3. ⏳ GitHub Secrets 설정
4. ⏳ 첫 자동 실행 확인 (내일 오전 9시)

---

**문의**: jason@kitt.ai
**업데이트**: 2026-03-24
