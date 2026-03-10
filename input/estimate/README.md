# KITT 견적서 작업공간

## 📁 폴더 구조

```
kitt-workspace/
├── KITT_견적서.code-workspace   ← VSCode에서 이 파일로 열기
├── .vscode/
│   ├── settings.json            ← 작업공간 설정
│   └── kitt-invoice.code-snippets
├── templates/
│   └── KITT_견적서_템플릿.html  ← 원본 (수정 금지 ★)
└── output/
    ├── 이가네돈가스_로고_견적서.html
    ├── 홍길동카페_견적서.html
    └── ...                      ← 완성된 견적서 저장
```

---

## ✅ 새 견적서 만드는 방법

### 1단계 — 템플릿 복사
```
templates/KITT_견적서_템플릿.html
  → 우클릭 → Copy
  → output/ 폴더에 Paste
  → 파일명 변경: 고객사명_견적서.html
```

### 2단계 — 내용 교체
파일 열고 `Ctrl+H` (찾아 바꾸기)로 아래 변수 교체:

| 변수 | 교체할 내용 |
|------|------------|
| `{{INVOICE_TO}}` | 고객사명 |
| `{{INVOICE_ID}}` | 견적 번호 |
| `{{DATE_ISSUE}}` | 발행일 |
| `{{DATE_DUE}}` | 지불기한 |
| `{{PROJECT_NAME}}` | 프로젝트명 |
| `{{SUBTOTAL}}` | 소계 |
| `{{TAX_NOTE}}` | 세금 표기 |
| `{{TOTAL}}` | 최종금액 |
| `{{DEPOSIT}}` | 계약금 |
| `{{BALANCE}}` | 잔금 |
| `{{TOTAL_NOTE}}` | 합계 표기 |
| `{{PAYMENT_TIMING}}` | 결제 시점 |
| `{{WORK_DAYS}}` | 작업 기간 (일수) |
| `{{DELIVERABLES}}` | 산출물 목록 |

### 3단계 — 미리보기
`Alt+L → Alt+O` (Live Server 실행) → 브라우저에서 확인

### 4단계 — PDF 저장
브라우저에서 `Ctrl+P` → 대상: PDF로 저장 → A4

---

## 🔒 고정값 (변경 불필요)
- 발신사: 카이앤컴퍼니 / kaiceo@naver.com / 서초구 양재동 280, 301호
- 은행: 신한은행 110 271 007035 / 예금주: 유승범
- 서명: 이미지 내장 완료

---

## 💡 권장 VSCode 확장
- **Live Server** (`ritwickdey.liveserver`) — HTML 실시간 미리보기
