# 💻 메타광고 자동화 스크립트

> **Python 스크립트로 메타광고 분석 자동화**

---

## 📁 스크립트 목록 (2개)

### 1. [analyze_meta_ad.py](analyze_meta_ad.py) - 메타광고 성과 분석 ⭐

**기능**: 메타광고 CSV 데이터를 분석하여 리포트 자동 생성

**입력**: 메타광고 CSV 파일
**출력**:
- 분석_리포트.md (상세 분석)
- 1페이지_요약.md (경영진용)
- 실행_체크리스트.md (실무자용)
- 상세_데이터.csv (분석용)

**실행 방법**:
```bash
python3 analyze_meta_ad.py --csv "광고데이터.csv"
```

**주요 분석 항목**:
- 전체 성과 요약 (지출, 노출, 클릭, 전환)
- 최고 성과 광고 TOP 3
- 개선 필요 광고 TOP 3
- 소재 타입별 성과 비교
- 즉시 실행 액션 제안

---

### 2. [analyze_scenario.py](analyze_scenario.py) - 시나리오 분석

**기능**: 다양한 광고 운영 시나리오를 시뮬레이션

**입력**: 메타광고 CSV 파일
**출력**: 시나리오별 예상 성과 비교

**실행 방법**:
```bash
python3 analyze_scenario.py
# 대화형으로 CSV 경로 입력
```

**주요 기능**:
- 광고 그룹별 성과 비교
- "잠재고객_" vs "260220_잠재고객_" 그룹 분석
- 시나리오별 성과 시뮬레이션
- 대안 전략 제안

**사용 예시**:
- 특정 광고 그룹만 유지하면 어떻게 될까?
- 저성과 광고를 중단하면 얼마나 절감될까?
- 고성과 광고에 예산을 집중하면?

---

## 🚀 빠른 시작

### 1단계: 환경 설정 (처음 한 번만)

```bash
# Python 설치 확인
python3 --version

# 필수 라이브러리 설치
pip3 install pandas numpy

# 스크립트 권한 설정
chmod +x analyze_meta_ad.py analyze_scenario.py
```

---

### 2단계: CSV 다운로드

1. [메타 광고 관리자](https://business.facebook.com/adsmanager) 접속
2. 우측 상단 `...` → **내보내기**
3. 날짜 범위: **최근 30일**
4. 포함 항목: ✅ 모든 지표 선택
5. 형식: **CSV** → **내보내기**

---

### 3단계: 스크립트 실행

```bash
# 분석 스크립트 실행
python3 analyze_meta_ad.py --csv "/Users/Downloads/광고데이터.csv"

# 결과 확인
ls -la output/meta-ad/
```

---

## 📊 실행 예시

### analyze_meta_ad.py 실행

```bash
$ python3 analyze_meta_ad.py --csv "리바스인테리어-광고.csv"

================================================================================
메타광고 성과 분석 시작
================================================================================

✅ CSV 파일 로드 완료: 12개 광고

📊 전체 성과 요약:
   총 지출: $750.06
   총 노출: 62,401회
   총 클릭: 1,571회
   총 리드: 121건
   평균 CTR: 2.52%
   평균 CPC: $0.48
   리드당 비용: $6.20

📝 상세 리포트 생성 중...
   ✅ output/meta-ad/분석_리포트.md

📄 1페이지 요약 생성 중...
   ✅ output/meta-ad/1페이지_요약.md

✅ 실행 체크리스트 생성 중...
   ✅ output/meta-ad/실행_체크리스트.md

💾 상세 데이터 저장 중...
   ✅ output/meta-ad/상세_데이터.csv

================================================================================
✨ 분석 완료!
================================================================================
```

---

### analyze_scenario.py 실행

```bash
$ python3 analyze_scenario.py

📁 CSV 파일 경로를 입력하세요:
> 리바스인테리어-광고.csv

================================================================================
시나리오 분석: '잠재고객_' 광고만 유지
================================================================================

📊 현재 그룹별 성과:
                  지출     노출      클릭    리드
260220_잠재고객_  303.43  20858   491.0  72.0
잠재고객_         446.63  41543  1080.0  49.0

✅ 시나리오 실행 후:
  지출: $446.63
  리드: 49건
  리드당 비용: $9.11

❌ 손실되는 성과:
  지출: $303.43
  리드: 72건 (전체의 59.5%)

💡 권장 사항: 이 시나리오는 권장하지 않습니다!
```

---

## 🛠️ 스크립트 상세 설명

### analyze_meta_ad.py

**주요 함수**:
```python
analyze_meta_ads(csv_path, output_dir="output/meta-ad")
    └─ CSV 파일을 읽고 분석하여 리포트 생성

generate_detailed_report(df, output_path)
    └─ 상세 분석 리포트 작성

generate_summary_report(df, output_path)
    └─ 1페이지 요약 리포트 작성

generate_checklist(df, output_path)
    └─ 실행 체크리스트 작성
```

**분석 로직**:
1. CSV 파일 로드 및 검증
2. 기본 통계 계산 (총 지출, 노출, 클릭, 리드 등)
3. 리드당 비용 계산
4. 고성과/저성과 광고 정렬
5. 마크다운 리포트 생성

---

### analyze_scenario.py

**주요 함수**:
```python
analyze_scenario(csv_path)
    └─ 시나리오별 성과 시뮬레이션

compare_groups(df, group_column)
    └─ 광고 그룹별 성과 비교

simulate_impact(keep_ads, remove_ads)
    └─ 광고 유지/제거 시 영향 계산
```

**분석 로직**:
1. 광고 그룹 분류 (이름 패턴 기반)
2. 각 그룹별 성과 집계
3. 시나리오별 시뮬레이션
4. 대안 전략 제안

---

## 💡 활용 팁

### Tip 1: 정기 실행 (주 1회 권장)

```bash
# 매주 월요일 아침 실행
# 1. CSV 다운로드
# 2. 스크립트 실행
python3 analyze_meta_ad.py --csv "weekly_ads.csv"
# 3. 리포트 확인 및 액션 적용
```

---

### Tip 2: 출력 디렉토리 변경

```bash
# 특정 업체별로 폴더 분리
python3 analyze_meta_ad.py \
  --csv "광고데이터.csv" \
  --output "output/meta-ad/업체명"
```

---

### Tip 3: 배치 처리

```bash
# 여러 업체 한 번에 분석
for file in *.csv; do
  python3 analyze_meta_ad.py --csv "$file"
done
```

---

## 🔧 커스터마이징

### 분석 지표 추가

`analyze_meta_ad.py` 파일 수정:

```python
# 추가 지표 계산
avg_frequency = total_impressions / total_reach if total_reach > 0 else 0
avg_engagement_rate = total_engagements / total_impressions * 100

# 리포트에 추가
f.write(f"평균 빈도: {avg_frequency:.2f}\n")
f.write(f"참여율: {avg_engagement_rate:.2f}%\n")
```

---

### 리포트 형식 변경

마크다운 대신 HTML 또는 PDF로 출력:

```python
# HTML 출력
import markdown
html = markdown.markdown(report_content)
with open('report.html', 'w') as f:
    f.write(html)

# PDF 출력 (추가 라이브러리 필요)
# pip install markdown pdfkit
```

---

## 🆘 문제 해결

### Q1. "pandas 모듈을 찾을 수 없습니다"

```bash
pip3 install pandas numpy
```

---

### Q2. "CSV 파일을 읽을 수 없습니다"

**원인**: CSV 인코딩 문제

**해결**:
1. Excel에서 CSV 열기
2. **다른 이름으로 저장**
3. 형식: **CSV UTF-8 (쉼표로 분리)** 선택
4. 저장 후 다시 실행

---

### Q3. "파일을 찾을 수 없습니다"

```bash
# 절대 경로 사용
python3 analyze_meta_ad.py --csv "/Users/Downloads/광고.csv"

# 또는 현재 디렉토리 확인
pwd
ls -la
```

---

### Q4. "Permission denied"

```bash
# 실행 권한 부여
chmod +x analyze_meta_ad.py analyze_scenario.py

# 또는 python3로 직접 실행
python3 analyze_meta_ad.py --csv "파일.csv"
```

---

## 📈 예상 결과

### 실행 시간
- **analyze_meta_ad.py**: 5-10초
- **analyze_scenario.py**: 10-20초

### 생성 파일
- 분석_리포트.md (2-3KB)
- 1페이지_요약.md (1KB)
- 실행_체크리스트.md (1KB)
- 상세_데이터.csv (원본 크기와 동일)

---

## 🔗 관련 파일

### 가이드 문서
- [../01_가이드_문서/메타광고_빠른시작.md](../01_가이드_문서/메타광고_빠른시작.md)

### 프롬프트
- [../02_프롬프트/meta-ad-analysis-prompt.md](../02_프롬프트/meta-ad-analysis-prompt.md)

---

## 📝 개발 정보

**언어**: Python 3
**필수 라이브러리**: pandas, numpy
**버전**: 1.0
**최종 수정**: 2026-03-05

---

**추천**: 먼저 `analyze_meta_ad.py`로 기본 분석을 하고, 필요시 `analyze_scenario.py`로 시나리오 시뮬레이션을 하세요!
