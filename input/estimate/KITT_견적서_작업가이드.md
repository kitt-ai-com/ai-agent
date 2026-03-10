# KITT 견적서 작업 가이드

## 📁 VSCode 작업공간 설치

```bash
# 터미널에서 실행
unzip ~/Downloads/KITT_견적서_워크스페이스.zip -d /Users/jasonmac/kitt_agent/ai-agent/input/
```

---

## 📁 폴더 구조

```
kitt-workspace/
├── KITT_견적서.code-workspace   ← VSCode에서 이 파일로 열기
├── .vscode/
│   ├── settings.json
│   └── kitt-invoice.code-snippets
├── templates/
│   └── KITT_견적서_템플릿.html  ← 원본 (수정 금지 ★)
└── output/
    └── 고객사명_견적서.html      ← 완성된 견적서 저장
```

---

## ⚡ 새 견적서 작업 순서

```
1. templates/KITT_견적서_템플릿.html 우클릭 → Copy
2. output/ 폴더에 붙여넣기 → 파일명 변경 (예: 홍길동카페_견적서.html)
3. Ctrl+H 로 {{변수}} 찾아 교체
4. Alt+L, Alt+O → 브라우저 미리보기 (Live Server)
5. Ctrl+P → PDF 저장
```

---

## 🔧 {{변수}} 교체 목록

| 변수 | 내용 |
|------|------|
| `{{INVOICE_TO}}` | 고객사명 |
| `{{INVOICE_ID}}` | 견적 번호 (INV-2026-00X) |
| `{{DATE_ISSUE}}` | 발행일 |
| `{{DATE_DUE}}` | 지불기한 |
| `{{PROJECT_NAME}}` | 프로젝트명 |
| `{{SUBTOTAL}}` | 소계 |
| `{{TAX_NOTE}}` | 세금 표기 (별도 / ₩XXX) |
| `{{TOTAL}}` | 최종금액 |
| `{{DEPOSIT}}` | 계약금 |
| `{{BALANCE}}` | 잔금 |
| `{{TOTAL_NOTE}}` | 합계 표기 |
| `{{PAYMENT_TIMING}}` | 결제 시점 |
| `{{WORK_DAYS}}` | 작업 기간 (일수) |
| `{{DELIVERABLES}}` | 산출물 목록 |

---

## 🔒 고정값 (변경 불필요)

| 항목 | 값 |
|------|----|
| 발신사 | 카이앤컴퍼니 |
| 이메일 | kaiceo@naver.com |
| 주소 | 서초구 양재동 280, 301호 |
| 은행 | 신한은행 |
| 계좌 | 110 271 007035 |
| 예금주 | 유승범 |
| 서명 | 이미지 base64 내장 |
| 디자인 | A4 흑백 미니멀 (794×1123px) |

---

## 💬 Claude에게 요청할 때

```
KITT 템플릿으로 견적서 만들어줘.

- 고객사: [고객사명]
- 견적 번호: INV-2026-00X
- 발행일: 2026-XX-XX
- 지불기한: 2026-XX-XX
- 프로젝트: [프로젝트명]

서비스 항목:
1. [항목명] / [설명] / 수량 X / ₩XXX,000
2. [항목명] / [설명] / 수량 X / ₩XXX,000

총액: ₩X,XXX,000
계약금 50% / 잔금 50%
작업기간: X일
산출물: [납품 파일 목록]
```

---

## 💡 권장 VSCode 확장

- **Live Server** (`ritwickdey.liveserver`) — HTML 실시간 미리보기
