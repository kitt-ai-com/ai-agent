# 노션 업체별/일자별 리포트 설정 가이드

## 📋 개요

메타광고 ROAS 분석 리포트를 Notion에 **업체별 → 일자별** 구조로 자동 업로드합니다.

**메인 페이지**: https://www.notion.so/32c926438fe780788e41de04365c1ac5

## 🏗️ 페이지 구조

```
[메인 페이지]
├── 📁 독점마켓
│   ├── 📅 2026-03-24 일일 리포트
│   ├── 📅 2026-03-25 일일 리포트
│   ├── 📊 2026-03-31 주간 리포트
│   └── 📈 2026-04-01 월간 리포트
├── 📁 씨앤씨에어코리아
│   ├── 📅 2026-03-24 일일 리포트
│   └── ...
├── 📁 미친특가_카이
├── 📁 리바스인테리어
├── 📁 에어로웨이
└── 📁 하모아한돈삼겹살
```

**특징**:
- ✅ 업체별로 폴더 페이지 자동 생성
- ✅ 각 업체 폴더 내 일자별 리포트 생성
- ✅ 중복 방지 (같은 날짜에 여러 번 실행해도 안전)
- ✅ 업체별 성과 추적 용이

## 🔧 설정 방법

### 1. Notion Integration 연결

1. **메인 페이지 열기**
   ```
   https://www.notion.so/32c926438fe780788e41de04365c1ac5
   ```

2. **Integration 연결**
   - 페이지 우측 상단 **"..."** 클릭
   - **"Connections"** 선택
   - **"리포트"** Integration 체크
   - **"Confirm"** 클릭

### 2. 환경 변수 확인

`.env` 파일에 다음 설정이 있는지 확인:

```bash
NOTION_TOKEN=ntn_xxxxxxxxxxxxx
NOTION_PAGE_ID_ROAS=32c926438fe780788e41de04365c1ac5
```

### 3. 테스트 실행

```bash
# 일일 리포트 업로드
node scripts/upload_notion_roas_by_client.js --report output/meta-ad/_roas_daily/ROAS_OFF_일일_TEST_20260324.md
```

**성공 시 출력**:
```
📊 발견된 업체: 3개
   독점마켓, 씨앤씨에어코리아, 하모아한돈삼겹살

[독점마켓]
   ✅ 업체 페이지 ID: 32c92643...
   📄 리포트 생성: 2026-03-24 일일 리포트
   ✅ 페이지 생성 완료: https://notion.so/...

[씨앤씨에어코리아]
   ✅ 업체 페이지 ID: 32c92643...
   📄 리포트 생성: 2026-03-24 일일 리포트
   ✅ 페이지 생성 완료: https://notion.so/...

✅ 전체 업로드 완료!
```

## 📊 리포트 내용

### 각 업체 페이지에 포함되는 내용

**헤더**:
- 생성일
- 리포트 유형 (일일/주간/월간)

**성과 요약**:
- 문제 광고 수
- 총 지출 금액

**개선 권장 광고 목록**:
- 광고명, 캠페인, 광고 세트
- 지출, 노출, 클릭
- CTR, CPC, CPM
- 문제점 분석
- 권장 조치사항

**실행 가이드**:
- 즉시 조치 필요 광고
- 분석 체크리스트
- 모니터링 가이드

## 🤖 자동화

### GitHub Actions 설정

각 워크플로우가 자동으로 업체별/일자별 구조로 업로드합니다:

**일일 리포트** (매일 09:00):
```yaml
- name: Run Daily ROAS Analysis
  run: python3 scripts/daily_roas_analysis.py --days 1 --upload --period "일일"
```

**주간 리포트** (매주 월요일 09:00):
```yaml
- name: Run Weekly ROAS Analysis
  run: python3 scripts/daily_roas_analysis.py --days 7 --upload --period "주간"
```

**월간 리포트** (매월 1일 09:00):
```yaml
- name: Run Monthly ROAS Analysis
  run: python3 scripts/daily_roas_analysis.py --days 30 --upload --period "월간"
```

### GitHub Secrets

Repository → Settings → Secrets → Actions에 추가:

| Secret | Value |
|--------|-------|
| `NOTION_TOKEN` | Notion Integration Token |
| `NOTION_PAGE_ID_ROAS` | `32c926438fe780788e41de04365c1ac5` |
| `META_ACCESS_TOKEN` | Meta API Token |

## 🔄 업체 페이지 자동 생성

**동작 방식**:
1. 리포트에서 업체 목록 자동 추출
2. 각 업체별로 페이지 존재 여부 확인
3. 없으면 새로 생성, 있으면 재사용
4. 업체 페이지 내에 일자별 리포트 생성

**장점**:
- ✅ 수동으로 폴더 생성 불필요
- ✅ 업체 추가 시 자동 대응
- ✅ 일관된 구조 유지

## 📱 Notion 모바일 알림

Notion 앱 설정:
1. 워크스페이스 → Settings
2. Notifications → Pages
3. "리포트" Integration 알림 켜기

매일 아침 9시에 새 리포트 알림을 받을 수 있습니다.

## 🧪 로컬 테스트

```bash
# 일일 리포트 생성 + 업로드
./run_roas_daily.sh --upload

# 주간 리포트 생성 + 업로드
./run_roas_weekly.sh --upload

# 월간 리포트 생성 + 업로드
./run_roas_monthly.sh --upload
```

## 🔧 트러블슈팅

### "Could not find block" 에러

**원인**: Notion 페이지가 Integration에 연결되지 않음

**해결**:
1. https://www.notion.so/32c926438fe780788e41de04365c1ac5 열기
2. "..." → "Connections" → "리포트" 체크

### 업체 페이지 중복 생성

**원인**: 업체명 불일치 (띄어쓰기, 특수문자 등)

**해결**:
- `config/clients.json`의 업체명 확인
- 리포트의 업체명과 정확히 일치해야 함

### 리포트 누락

**원인**: 해당 업체에 ROAS OFF 광고가 없음

**확인**:
```bash
# 로컬에서 리포트 생성 후 확인
cat output/meta-ad/_roas_daily/ROAS_OFF_일일_TEST_20260324.md
```

## 📞 문의

- **GitHub Issues**: 버그 리포트 및 기능 요청
- **Email**: jason@kitt.ai

---

**마지막 업데이트**: 2026-03-24
**버전**: 1.0
