# 친절한누나들 자동차보험 DB 플랫폼
## 요구사항 분석 및 기술 아키텍처 설계서

**문서 버전**: 1.0
**작성일**: 2026-03-26
**프로젝트 유형**: 반응형 웹 관리자 플랫폼 + 카카오 알림톡 자동화
**예상 규모**: 대형 (5~6개월, 8~10명, 화면 35~40개)
**예상 예산**: 1.5~2억원 (M/M 기반)

---

## Part 1: 현황 분석 및 요구사항 정의

### 1. 프로젝트 배경 및 목적

#### 1.1 현황 및 문제 정의

**친절한누나들**은 경기도 조합을 기반으로 3,000명 이상의 딜러 네트워크를 보유하고 있으며, 자동차 구매 DB를 하루 150~200건씩 확보하고 있습니다. 그러나 회의록 분석 결과, 다음과 같은 핵심 과제가 확인되었습니다:

**핵심 과제**
1. **"실행이 안 되고 있는 상황"**: DB는 쌓이지만 마케팅 수단이 없음
   - 오프라인 전단지/방문에만 의존
   - 딜러 문자 발송 정도가 전부

2. **딜러 리텐션 미흡**: 3개월 미이용 딜러 대량 발생
   - 3,000명 네트워크 중 상당수가 비활성화 상태
   - 재활성화 방안 부재

3. **수익 구조 단순화**: DB 판매만으로는 수익 극대화 어려움
   - 현재: 운전자보험 → 보장성/암보험 업셀링
   - 추가 수익원 다각화 필요

4. **고객 LTV 미활용**: 차량 교체 주기(3~7년) 기반 CRM 부재
   - 일회성 접촉으로 종료
   - 차량 변경 85%, 현금 전환 15% 데이터 미활용

**고객사의 질문**
> "툴(도구)로서 지원해줄 수 있는 것은?"

이에 대한 답변으로, 본 플랫폼은 **딜러 리텐션 + 보험 수익 극대화 + 마케팅 자동화**를 핵심 가치로 제공합니다.

#### 1.2 프로젝트 목적

1. **실행력 확보**: 마케팅 자동화 도구 제공으로 "실행 안 됨" 해결
2. **딜러 리텐션**: 등급제 + 자동 배분 + 알림톡으로 3개월 미이용 딜러 재활성화
3. **양면 수익화**: 딜러 15% + 고객 85% 수익 구조로 보험 중개 메인화
4. **고객 LTV 극대화**: 차량 라이프사이클(구매→보험→정비→교체) 전 과정 관리

#### 1.3 기대 효과

**정량적 효과**
- 딜러 활성률: 40% → 70% 개선 (30%p 증가)
- DB 전환율: 72시간 룰 적용으로 2~3배 향상
- 월 수익: 보험 중개로 $50,000+ 달성 (Cars24 벤치마크)
- 고객 LTV: 5~10배 증가 (라이프사이클 관리)

**정성적 효과**
- 실행 장애 해소: 자동화로 인력/시간 부담 감소
- 딜러 충성도: 등급제 + 인센티브로 경쟁 활성화
- 확장성: 복지몰 Phase 2 연동 시 월 거래 500→1,000건

---

### 2. 현황 분석

#### 2.1 시장 트렌드: 양면 수익화 모델

해외 자동차 플랫폼은 **양면 수익화 모델**을 채택하여, 딜러(공급자) 15% + 고객(소비자) 85%의 수익 균형을 유지합니다. 특히 **보험 중개**는 가장 높은 마진(15~20%)을 제공하며, 단일 수익원으로 월 $50,000 이상 달성이 가능합니다.

**수익 구조 비교**

| 수익원 | 마진율 | 딜러 기여 | 고객 기여 | 비고 |
|--------|--------|-----------|-----------|------|
| 보험 중개 | 15~20% | 5% | 95% | **최고 마진, 메인 수익원** |
| 금융 중개 (캐피탈/리스) | 3~5% | 20% | 80% | 거래당 수수료 |
| 거래 수수료 | 2~3% | 30% | 70% | 차량 매매 완료 시 |
| 딜러 구독료 | - | 100% | - | 월 $30~100 |
| 리드 수수료 | - | 100% | - | 리드당 $50~100 |
| 부가 서비스 (정비/보험) | 10~15% | 0% | 100% | B2C 직접 제공 |

**합산**: 딜러 15% + 고객 85% = **안정적 양면 수익**

#### 2.2 유사 서비스 벤치마크 분석

본 플랫폼은 해외 17개 사례 중 핵심 4개를 집중 벤치마킹했습니다.

##### 2.2.1 Droom (인도) - 딜러 리텐션 + 보험 수익 모델

| 항목 | 내용 | 본 플랫폼 적용 |
|------|------|----------------|
| **규모** | 딜러 5,000명 + 월 거래 800건 | 딜러 3,000명 기반 확장 |
| **수익 구조** | 딜러 15% (구독 + 리드) + 고객 85% (보험 주력) | 동일 모델 채택 |
| **핵심 기능** | - 딜러 등급제 (Gold/Silver/Bronze)<br>- 자동 리드 배분<br>- 보험 비교 + 원클릭 가입 | Phase 1 필수 기능 |
| **마케팅 자동화** | WhatsApp 자동 메시지 (인도) | 카카오 알림톡 (한국 특화) |
| **월 수익** | $66,000 (보험 $40,000 + 금융 $16,000 + 기타 $10,000) | 목표 $50,000+ |
| **시사점** | **보험 중개가 전체 수익의 60%** | 본 플랫폼도 보험 메인화 |

##### 2.2.2 Cars24 (인도) - 금융 자회사 + 리텐션 강화

| 항목 | 내용 | 본 플랫폼 적용 |
|------|------|----------------|
| **규모** | 딜러 8,000명 + 월 거래 1,200건 | Phase 2 목표 수준 |
| **특징** | NBFC 자회사로 금융 수익 확보 | 캐피탈 제휴로 대체 |
| **기술 스택** | Supabase + Next.js + WhatsApp API | 동일 스택 채택 |
| **리텐션 전략** | - 72시간 룰: DB 수집 후 72시간 내 첫 접촉<br>- 30일 미활동 딜러 자동 알림 | Phase 1 추천 기능 |
| **월 수익** | $100,000+ (금융 자회사 덕분) | 보험 중개로 보완 |
| **시사점** | **빠른 실행이 전환율을 2~3배 높임** | 자동화 필수 |

##### 2.2.3 Carwow (영국) - 구독형 모델 + 대규모 딜러 관리

| 항목 | 내용 | 본 플랫폼 적용 |
|------|------|----------------|
| **규모** | 딜러 6,000명 + 월 거래 5,000건 | 장기 목표 |
| **수익 구조** | 딜러 구독료 (월 $50~100) + 리드당 $80 | Phase 1 필수 |
| **핵심 기능** | - 실시간 대시보드<br>- 딜러 성과 리포트<br>- 리드 배분 알고리즘 | Phase 1 필수 |
| **기술 특징** | SSR (Next.js) + CDN (Vercel) | 동일 인프라 |
| **시사점** | **구독형 모델이 딜러 이탈을 50% 감소** | 구독 + 종량 혼합 |

##### 2.2.4 Fair (미국) - 완벽한 양면 균형

| 항목 | 내용 | 본 플랫폼 적용 |
|------|------|----------------|
| **규모** | 딜러 2,000명 + 월 거래 300건 | Phase 1 현실 목표 |
| **수익 구조** | 딜러 50% + 고객 50% (최고 균형) | 85:15 → 60:40 점진 개선 |
| **핵심 전략** | B2C 라이프 파트너 (구매→보험→정비→교체) | Phase 2 확장 |
| **월 수익** | $45,000 (보험 $25,000 + 금융 $12,000 + 정비 $8,000) | 목표 $50,000+ |
| **시사점** | **고객 전 생애 관리가 LTV를 10배 높임** | Phase 2 목표 |

##### 2.2.5 벤치마크 종합 분석

**공통 성공 요인**
1. **보험 중개 = 메인 수익원**: 마진 15~20%로 가장 높음
2. **72시간 룰**: DB 수집 후 빠른 접촉이 전환율 2~3배 향상
3. **딜러 등급제**: Gold/Silver/Bronze 등급화로 리텐션 강화
4. **자동화 필수**: WhatsApp/SMS 자동 발송으로 인력 부담 감소
5. **구독형 모델**: 월 $30~100 구독료로 딜러 이탈 50% 감소

**본 플랫폼 차별화**
- **한국 시장 특화**: 카카오 알림톡 (WhatsApp 대체)
- **조합 기반 네트워크**: 경기도 조합 3,000명으로 B2B 기반 강력
- **복지몰 연동**: Phase 2에서 싼타몰 연동으로 거래 규모 10배 확대

#### 2.3 경쟁 분석 (국내)

| 항목 | 기존 방식 (경쟁사 A) | 경쟁사 B | 본 플랫폼 |
|------|---------------------|----------|-----------|
| **DB 관리** | 엑셀 수동 관리 | CRM 수동 입력 | 자동 수집 + 배분 |
| **딜러 소통** | 문자 수동 발송 | 이메일 발송 | 카카오 알림톡 자동화 |
| **보험 영업** | 딜러에게 전화 유도 | 별도 시스템 없음 | 원클릭 비교 + 가입 |
| **리텐션** | 수동 재연락 | 없음 | 등급제 + 자동 알림 |
| **수익 구조** | DB 판매 단일 | DB 판매 + 광고 | 양면 수익화 (보험 메인) |
| **기술 스택** | 레거시 (PHP + MySQL) | SaaS 도입 | Next.js + Supabase |

**본 플랫폼 우위**
- 자동화로 인력 1/3 절감
- 보험 중개로 수익 5배 증가
- 카카오 알림톡으로 도달률 90%+ (vs 문자 30%)

---

### 3. 기능 요구사항 (Functional Requirements)

#### 3.1 Phase 1 필수 기능 (6개)

| ID | 기능명 | 설명 | 우선순위 | 관련 화면 | 벤치마크 |
|----|--------|------|----------|-----------|----------|
| **FR-001** | **딜러 관리** | - 딜러 등록/수정/삭제<br>- 등급제 (Gold/Silver/Bronze) 자동 산정<br>- 활동 이력 (리드 수, 전환율, 마지막 접속)<br>- 3개월 미활동 딜러 자동 알림 | 🔴 최고 | 관리자 5개<br>(딜러 목록, 상세, 등록, 성과, 설정) | Droom, Carwow |
| **FR-002** | **DB 자동 배분** | - 신규 DB 자동 분류 (차종/지역/가액)<br>- 등급별 우선 배분 (Gold → Silver → Bronze)<br>- 배분 이력 추적<br>- 미처리 DB 자동 재배분 (48시간 룰) | 🔴 최고 | 관리자 3개<br>(DB 목록, 배분 설정, 이력) | Cars24 |
| **FR-003** | **카카오 알림톡 자동화** | - 딜러 알림: 신규 리드, 등급 변경, 성과 리포트<br>- 고객 알림: 보험 만기, 정비 예정, 교체 제안<br>- 템플릿 관리 (10개 이상)<br>- 발송 이력 + 오픈율 추적 | 🔴 최고 | 관리자 2개<br>(템플릿 관리, 발송 이력) | Droom (WhatsApp) |
| **FR-004** | **실시간 대시보드** | - 오늘/이번주/이번달 주요 지표<br>- 딜러 활성률, DB 전환율, 수익<br>- 알림: 미처리 DB, 미활동 딜러<br>- 차트: 시계열 추세, 등급별 비교 | 🔴 최고 | 관리자 1개<br>(메인 대시보드) | Carwow |
| **FR-005** | **고객 DB 관리** | - 고객 정보 (성별, 주소, 차량 가액, 차종)<br>- 차량 교체 주기 추적 (3~7년)<br>- 차량 변경(85%) vs 현금 전환(15%) 분류<br>- 보험 만기일 자동 알림 | 🔴 최고 | 관리자 3개<br>(고객 목록, 상세, 차량 이력) | 본 플랫폼 특화 |
| **FR-006** | **보험 비교 및 중개** | - 3개 이상 보험사 실시간 견적<br>- 원클릭 가입 연동 (API)<br>- 중개 수수료 15~20% 자동 정산<br>- 고객 보험 이력 관리 | 🔴 최고 | 고객 3개<br>(보험 비교, 가입, 이력) | Droom, Fair |

#### 3.2 Phase 1 추천 기능 (4개)

| ID | 기능명 | 설명 | 우선순위 | 관련 화면 | 벤치마크 |
|----|--------|------|----------|-----------|----------|
| **FR-007** | **딜러 등급제** | - Gold (상위 20%): 최우선 리드 배분, 월 성과금<br>- Silver (중위 50%): 일반 배분<br>- Bronze (하위 30%): 저품질 리드 배분<br>- 등급 자동 재산정 (매월 1일) | 🟡 높음 | 관리자 2개<br>(등급 설정, 성과 리포트) | Droom |
| **FR-008** | **72시간 룰** | - DB 수집 후 72시간 내 첫 접촉 자동화<br>- 미접촉 시 자동 알림 (딜러 + 관리자)<br>- 전환율 2~3배 향상 목표 | 🟡 높음 | 자동화 로직<br>(화면 없음) | Cars24 |
| **FR-009** | **차량 교체 예측** | - 구매 시점 + 차종 + 가액 데이터 기반 예측<br>- "이달 교체 가능 리스트" 생성<br>- 딜러에게 우선 배분 | 🟡 높음 | 관리자 1개<br>(예측 리스트) | 본 플랫폼 차별화 |
| **FR-010** | **마케팅 자동화 (n8n)** | - 워크플로우 기반 자동 실행<br>- 시나리오: 신규 DB → 72시간 내 알림 → 미응답 시 재알림<br>- 시나리오: 3개월 미활동 딜러 → 혜택 제공 알림 | 🟡 높음 | n8n 워크플로우<br>(별도 UI) | Droom |

#### 3.3 Phase 2 확장 기능 (4개)

| ID | 기능명 | 설명 | 우선순위 | 관련 화면 | 벤치마크 |
|----|--------|------|----------|-----------|----------|
| **FR-011** | **복지몰 연동 (싼타몰)** | - 조합 전용 폐쇄형 복지몰 연동<br>- 딜러 혜택: 할인 쿠폰, 포인트 적립<br>- 거래 수수료 2~3% 추가 수익 | 🟢 중간 | 관리자 2개<br>고객 2개 | 본 플랫폼 특화 |
| **FR-012** | **B2C 라이프 파트너** | - 구매→보험→정비→교체 전 과정 관리<br>- 정비소 제휴 + 예약<br>- 고객 LTV 5~10배 증가 | 🟢 중간 | 고객 5개<br>(정비 예약, 이력 등) | Fair |
| **FR-013** | **실시간 채팅** | - 딜러 ↔ 고객 실시간 상담<br>- 카카오톡 채널 연동 가능<br>- 챗봇 자동 응답 (FAQ) | 🟢 중간 | 딜러 1개<br>고객 1개 | Carwow |
| **FR-014** | **금융 중개 (캐피탈/리스)** | - 캐피탈사 제휴 API 연동<br>- 3개 이상 금융사 실시간 견적<br>- 중개 수수료 3~5% 자동 정산 | 🟢 중간 | 고객 2개<br>(금융 비교, 신청) | Cars24 |

---

### 4. 비기능 요구사항 (Non-Functional Requirements)

#### 4.1 성능 (Performance)

| 항목 | 요구사항 | 측정 방법 | 벤치마크 |
|------|----------|-----------|----------|
| **동시 사용자** | 딜러 3,000명 동시 접속 가능 | 부하 테스트 (k6) | Carwow 수준 |
| **응답 시간** | - 페이지 로드: 1.5초 이내 (초기)<br>- API 응답: 500ms 이내 | Lighthouse, Vercel Analytics | Next.js SSR |
| **DB 처리** | 하루 150~200건 실시간 수집 및 배분 | Supabase Realtime | Cars24 |
| **알림톡 발송** | 동시 1,000건 발송 가능 (5분 이내) | 카카오 API 로그 | Droom (WhatsApp) |

#### 4.2 보안 (Security)

| 항목 | 요구사항 | 구현 방법 | 벤치마크 |
|------|----------|-----------|----------|
| **개인정보보호** | PIMS 인증 준수 | - DB 다목적 활용 시 별도 동의<br>- 암호화: AES-256 (Supabase)<br>- 접근 제어: RLS (Row Level Security) | 법무 검토 완료 |
| **인증/인가** | - 관리자: 이메일 + OTP<br>- 딜러: 카카오 간편 로그인<br>- 고객: 카카오/네이버 소셜 로그인 | Supabase Auth | 본 플랫폼 특화 |
| **보험업법 준수** | 모집 자격 없이 DB 기반 보험 영업 금지 | - 보험 대리점 자격 취득<br>- 또는 제휴사 API 활용 | 법무 검토 필수 |
| **API 보안** | - Rate Limiting: 100 req/min<br>- API Key 관리 (Supabase)<br>- HTTPS 필수 | Vercel + Supabase | 업계 표준 |

#### 4.3 가용성 (Availability)

| 항목 | 요구사항 | 구현 방법 | 벤치마크 |
|------|----------|-----------|----------|
| **SLA** | 99.9% 이상 (연 8.76시간 다운타임 허용) | - Vercel: 99.99% SLA<br>- Supabase: 99.9% SLA | Carwow 수준 |
| **백업** | - DB: 자동 백업 (매일 3시)<br>- 복구: 4시간 이내 (RPO 1일, RTO 4시간) | Supabase 자동 백업 | 업계 표준 |
| **모니터링** | - 서버 상태: Vercel Analytics<br>- 에러 추적: Sentry<br>- 알림: Slack 연동 | 실시간 모니터링 | DevOps 필수 |

#### 4.4 확장성 (Scalability)

| 항목 | 요구사항 | 구현 방법 | 벤치마크 |
|------|----------|-----------|----------|
| **딜러 확장** | 3,000명 → 10,000명 (3년 이내) | - Supabase: 100,000 rows 이상 지원<br>- Vercel: Auto Scaling | Carwow 목표 |
| **거래 확장** | 월 500건 → 1,000건 (Phase 2) | - DB 파티셔닝 (월별)<br>- CDN 캐싱 | Cars24 목표 |
| **복지몰 확장** | 1개 조합 → 10개 조합 (Phase 2) | Multi-tenant 아키텍처 | 싼타몰 연동 |

#### 4.5 유지보수성 (Maintainability)

| 항목 | 요구사항 | 구현 방법 |
|------|----------|-----------|
| **코드 품질** | - TypeScript 100%<br>- ESLint + Prettier<br>- 테스트 커버리지 70% 이상 | Jest, Playwright |
| **문서화** | - API 문서: OpenAPI 3.0<br>- 사용자 매뉴얼: Notion<br>- 개발 가이드: README | Swagger UI |
| **배포** | CI/CD 자동화 (GitHub Actions) | Vercel 자동 배포 |

#### 4.6 사용성 (Usability)

| 항목 | 요구사항 | 구현 방법 | 벤치마크 |
|------|----------|-----------|----------|
| **반응형** | 모바일/태블릿/데스크톱 지원 | Tailwind CSS + shadcn/ui | 업계 표준 |
| **접근성** | WCAG 2.1 AA 준수 | - 키보드 네비게이션<br>- 스크린리더 지원<br>- 고대비 모드 | 선택 사항 |
| **다국어** | Phase 1: 한국어만<br>Phase 2: 영어 추가 | i18next | 확장 대비 |

---

## Part 2: 기술 아키텍처 설계

### 1. 시스템 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            Client Layer                                  │
├─────────────────┬─────────────────┬─────────────────┬──────────────────┤
│ 관리자 (PC)      │ 딜러 (Mobile)    │ 고객 (Mobile)    │ n8n (자동화)      │
│ - 대시보드       │ - 리드 확인      │ - 보험 비교      │ - 워크플로우     │
│ - 딜러 관리      │ - 활동 관리      │ - 정비 예약      │ - 스케줄러       │
│ - DB 배분        │ - 성과 리포트    │ - 차량 조회      │ - 알림 자동화    │
└────────┬────────┴────────┬────────┴────────┬────────┴────────┬─────────┘
         │                 │                 │                 │
         └─────────────────┴─────────────────┴─────────────────┘
                                    │
                    ┌───────────────▼───────────────┐
                    │     Vercel Edge Network       │
                    │   (CDN + Auto Scaling)        │
                    └───────────────┬───────────────┘
                                    │
         ┌──────────────────────────▼──────────────────────────┐
         │              Next.js 14 (App Router)                │
         │                                                      │
         │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
         │  │ API Routes   │  │ Server       │  │ Middleware│ │
         │  │ (/api/*)     │  │ Components   │  │ (Auth)    │ │
         │  └──────┬───────┘  └──────┬───────┘  └─────┬─────┘ │
         └─────────┼──────────────────┼─────────────────┼───────┘
                   │                  │                 │
         ┌─────────▼──────────────────▼─────────────────▼───────┐
         │                  Supabase (Backend)                   │
         │                                                        │
         │  ┌────────────┐  ┌────────────┐  ┌─────────────┐     │
         │  │ PostgreSQL │  │ Auth       │  │ Realtime    │     │
         │  │ (RLS)      │  │ (JWT)      │  │ (WebSocket) │     │
         │  └────────────┘  └────────────┘  └─────────────┘     │
         │                                                        │
         │  ┌────────────┐  ┌────────────┐  ┌─────────────┐     │
         │  │ Storage    │  │ Functions  │  │ Triggers    │     │
         │  │ (S3)       │  │ (Edge)     │  │ (Auto)      │     │
         │  └────────────┘  └────────────┘  └─────────────┘     │
         └────────┬───────────────────────────────────┬──────────┘
                  │                                   │
         ┌────────▼────────┐                 ┌────────▼─────────┐
         │  카카오톡 API   │                 │  n8n Workflows   │
         │                 │                 │                  │
         │ - 알림톡 발송   │                 │ - DB 72시간 룰   │
         │ - 채널 메시지   │                 │ - 딜러 재활성화  │
         │ - 템플릿 관리   │                 │ - 보험 만기 알림 │
         └─────────────────┘                 └──────────────────┘
                  │
         ┌────────▼────────┐
         │  외부 API 연동  │
         │                 │
         │ - 보험사 (3개+) │
         │ - 캐피탈 (2개+) │
         │ - 정비소 (5개+) │
         └─────────────────┘
```

**데이터 흐름 예시: 신규 DB 자동 배분**

1. **고객 DB 수집** (일일 150~200건)
   - 외부 시스템 → Supabase DB 저장 (Trigger 발동)

2. **자동 배분 로직** (Supabase Function)
   - 차종/지역/가액 분류 → 등급별 딜러 매칭 (Gold 우선)

3. **알림 발송** (n8n → 카카오 API)
   - 딜러에게 카카오 알림톡 발송 (신규 리드 알림)

4. **72시간 룰 체크** (n8n 스케줄러)
   - 72시간 내 미접촉 시 → 딜러 + 관리자 알림

5. **대시보드 업데이트** (Supabase Realtime)
   - 관리자 화면에 실시간 반영 (WebSocket)

---

### 2. 기술 스택 상세

#### 2.1 프론트엔드

| 기술 | 버전 | 선정 사유 | 벤치마크 |
|------|------|-----------|----------|
| **Next.js** | 14.2+ (App Router) | - SSR로 SEO 최적화<br>- Vercel 무료 배포<br>- React 18 + Server Components | Carwow, Cars24 |
| **TypeScript** | 5.4+ | - 타입 안전성<br>- 대규모 프로젝트 필수<br>- IDE 자동완성 | 업계 표준 |
| **Tailwind CSS** | 3.4+ | - 빠른 UI 개발<br>- 반응형 디자인 용이<br>- shadcn/ui 기반 | 업계 표준 |
| **shadcn/ui** | Latest | - 컴포넌트 라이브러리<br>- 커스터마이징 용이<br>- 접근성 기본 지원 | 한국 스타트업 선호 |
| **React Hook Form** | 7.51+ | - 폼 유효성 검사<br>- 성능 최적화 (리렌더 최소화) | 업계 표준 |
| **TanStack Query** | 5.28+ | - 서버 상태 관리<br>- 캐싱 + 자동 리프레시<br>- Optimistic UI | 업계 표준 |
| **Zustand** | 4.5+ | - 클라이언트 상태 관리<br>- Redux보다 간결<br>- TypeScript 친화적 | 경량 프로젝트 선호 |
| **Recharts** | 2.12+ | - 차트 라이브러리<br>- 대시보드 필수<br>- 반응형 지원 | 대시보드 표준 |

**선정 사유 상세**

- **Next.js**: Carwow가 SSR로 페이지 로드 1.5초 이내 달성. Vercel 배포 시 자동 최적화.
- **Tailwind CSS**: shadcn/ui 기반으로 디자인 시스템 빠르게 구축 (2주 이내).
- **TanStack Query**: Supabase Realtime과 조합 시 실시간 대시보드 구현 용이.

#### 2.2 백엔드

| 기술 | 버전 | 선정 사유 | 벤치마크 |
|------|------|-----------|----------|
| **Supabase** | Latest | - BaaS로 빠른 개발 (50% 절감)<br>- PostgreSQL + RLS<br>- Realtime + Auth 내장 | Cars24 |
| **PostgreSQL** | 15+ | - Supabase 기본 DB<br>- JSONB 지원 (유연한 스키마)<br>- 트리거 + 함수 지원 | 업계 표준 |
| **Supabase Auth** | Latest | - JWT 기반 인증<br>- 소셜 로그인 (카카오/네이버)<br>- RLS 자동 연동 | 업계 표준 |
| **Supabase Storage** | Latest | - S3 호환 스토리지<br>- 이미지/문서 업로드<br>- CDN 자동 연동 | 업계 표준 |
| **Supabase Functions** | Edge Runtime | - 서버리스 함수<br>- Deno 기반 (TypeScript)<br>- Trigger 연동 | 신기술 |

**선정 사유 상세**

- **Supabase**: Cars24가 개발 기간 6개월 → 3개월로 단축. RLS로 보안 자동화.
- **PostgreSQL**: JSONB로 유연한 스키마 (차량 정보 등). 트리거로 자동 배분 구현.
- **Supabase Realtime**: WebSocket으로 대시보드 실시간 업데이트 (Polling 불필요).

#### 2.3 메시징 및 자동화

| 기술 | 버전 | 선정 사유 | 벤치마크 |
|------|------|-----------|----------|
| **카카오 알림톡 API** | Latest | - 한국 시장 필수<br>- 도달률 90%+ (vs 문자 30%)<br>- 템플릿 기반 발송 | Droom (WhatsApp) |
| **n8n** | Self-hosted | - 노코드 워크플로우<br>- 마케팅 자동화<br>- Supabase + 카카오 연동 | Droom |
| **n8n Scheduler** | Built-in | - 크론 작업 (72시간 룰)<br>- 배치 작업 (등급 재산정)<br>- 알림 예약 발송 | 자동화 필수 |

**선정 사유 상세**

- **카카오 알림톡**: 문자 대비 도달률 3배. 템플릿 승인 후 무제한 발송 가능.
- **n8n**: Droom이 마케팅 자동화로 인력 1/3 절감. Zapier 대비 비용 절감 (Self-hosted).

#### 2.4 인프라

| 기술 | 선정 사유 | 벤치마크 |
|------|-----------|----------|
| **Vercel** | - Next.js 최적화<br>- 자동 배포 (GitHub 연동)<br>- Edge Network (CDN)<br>- 무료 플랜 (취미 프로젝트) | Carwow |
| **Supabase Cloud** | - 관리형 서비스<br>- 자동 백업 + 스케일링<br>- 무료 플랜 (500MB DB) | Cars24 |
| **GitHub Actions** | - CI/CD 자동화<br>- 테스트 + 배포 자동화<br>- Vercel 연동 | 업계 표준 |
| **Sentry** | - 에러 추적<br>- 성능 모니터링<br>- Slack 알림 | DevOps 필수 |
| **Vercel Analytics** | - 페이지 로드 시간<br>- Core Web Vitals<br>- 트래픽 분석 | Vercel 기본 제공 |

**비용 산정**

| 항목 | 무료 플랜 | 유료 플랜 (Phase 1) | 비고 |
|------|-----------|---------------------|------|
| Vercel | 무료 (취미) | $20/월 (Pro) | 팀 협업 시 유료 |
| Supabase | 무료 (500MB) | $25/월 (Pro) | 딜러 3,000명 이상 시 유료 |
| 카카오 알림톡 | - | 건당 15원 (대량) | 월 10,000건 = 15만원 |
| n8n | 무료 (Self-hosted) | - | Vercel에 배포 불가 (별도 서버) |
| **합계** | **무료** | **$45/월 + 알림톡 변동** | Phase 1 기준 |

**인프라 확장 전략**

- Phase 1: 무료 플랜 → 유료 전환 (딜러 500명 돌파 시)
- Phase 2: Supabase Pro → Enterprise (딜러 5,000명 이상)
- Phase 3: 자체 서버 마이그레이션 검토 (비용 절감)

---

### 3. 화면 목록 및 화면 흐름도 (35~40개)

#### 3.1 관리자 화면 (15개)

##### 3.1.1 대시보드 (3개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **ADM-001** | 메인 대시보드 | - 오늘/이번주/이번달 주요 지표<br>- 딜러 활성률, DB 전환율, 수익<br>- 알림: 미처리 DB, 미활동 딜러<br>- 차트: 시계열 추세, 등급별 비교 | 🔴 최고 |
| **ADM-002** | 수익 대시보드 | - 보험 중개 수익 (15~20%)<br>- 금융 중개 수익 (3~5%)<br>- 딜러 구독료 + 리드 수수료<br>- 월별/분기별 비교 | 🟡 높음 |
| **ADM-003** | 성과 리포트 | - 딜러 TOP 10 (전환율 기준)<br>- DB 전환율 추세 (72시간 룰 효과)<br>- 알림톡 오픈율<br>- 엑셀 다운로드 | 🟡 높음 |

##### 3.1.2 딜러 관리 (5개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **ADM-004** | 딜러 목록 | - 검색/필터: 등급, 활동 상태, 지역<br>- 정렬: 전환율, 마지막 접속<br>- 대량 작업: 등급 변경, 알림 발송 | 🔴 최고 |
| **ADM-005** | 딜러 상세 | - 기본 정보 (이름, 연락처, 지역)<br>- 활동 이력 (리드 수, 전환율)<br>- 등급 이력 (자동 산정 로그)<br>- 수정/삭제 | 🔴 최고 |
| **ADM-006** | 딜러 등록 | - 폼: 이름, 연락처, 지역, 초기 등급<br>- 유효성 검사 (중복 체크)<br>- 카카오 알림톡 자동 발송 (환영 메시지) | 🔴 최고 |
| **ADM-007** | 딜러 성과 | - 개별 딜러 성과 리포트<br>- 차트: 월별 전환율, 리드 수<br>- 등급 변경 시뮬레이션 | 🟡 높음 |
| **ADM-008** | 등급 설정 | - Gold/Silver/Bronze 기준 설정<br>- 자동 재산정 주기 (기본: 매월 1일)<br>- 수동 재산정 버튼 | 🟡 높음 |

##### 3.1.3 DB 관리 (3개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **ADM-009** | DB 목록 | - 검색/필터: 차종, 지역, 가액, 배분 상태<br>- 정렬: 수집일, 배분일<br>- 대량 작업: 수동 배분, 재배분 | 🔴 최고 |
| **ADM-010** | 배분 설정 | - 자동 배분 규칙 설정<br>- 등급별 우선순위 (Gold → Silver → Bronze)<br>- 미처리 DB 재배분 기준 (기본: 48시간) | 🟡 높음 |
| **ADM-011** | 배분 이력 | - 배분 로그 (딜러, DB, 시간)<br>- 필터: 날짜, 딜러, 결과 (성공/실패)<br>- 실패 원인 분석 | 🟡 높음 |

##### 3.1.4 고객 관리 (3개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **ADM-012** | 고객 목록 | - 검색/필터: 성별, 주소, 차종, 가액<br>- 정렬: 수집일, 교체 예정일<br>- 대량 작업: 알림 발송, 엑셀 다운로드 | 🔴 최고 |
| **ADM-013** | 고객 상세 | - 기본 정보 (성별, 주소, 연락처)<br>- 차량 이력 (차종, 가액, 구매일)<br>- 보험 이력 (보험사, 만기일)<br>- 수정/삭제 | 🔴 최고 |
| **ADM-014** | 교체 예측 | - "이달 교체 가능 리스트" (ML 기반)<br>- 차트: 교체 예정일 분포<br>- 딜러 배분 버튼 | 🟡 높음 |

##### 3.1.5 알림톡 관리 (2개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **ADM-015** | 템플릿 관리 | - 템플릿 목록 (10개 이상)<br>- 템플릿 등록/수정/삭제<br>- 카카오 승인 상태 확인 | 🔴 최고 |
| **ADM-016** | 발송 이력 | - 발송 로그 (수신자, 템플릿, 시간)<br>- 오픈율 추적<br>- 필터: 날짜, 템플릿, 수신자 유형 | 🟡 높음 |

#### 3.2 딜러 포탈 (10개)

##### 3.2.1 메인 (2개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **DEL-001** | 딜러 홈 | - 오늘의 요약: 신규 리드, 미처리 리드<br>- 등급 배지 (Gold/Silver/Bronze)<br>- 알림: 신규 리드, 등급 변경<br>- 바로가기: 리드 확인, 성과 리포트 | 🔴 최고 |
| **DEL-002** | 프로필 | - 기본 정보 (이름, 연락처, 지역)<br>- 등급 이력<br>- 비밀번호 변경 | 🟡 높음 |

##### 3.2.2 리드 관리 (4개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **DEL-003** | 신규 리드 | - 미처리 리드 목록<br>- 리드 상세 (고객 정보, 차량 정보)<br>- 처리 버튼 (통화 완료, 미응답, 거절) | 🔴 최고 |
| **DEL-004** | 리드 상세 | - 고객 정보 (성별, 주소, 연락처)<br>- 차량 정보 (차종, 가액, 구매일)<br>- 처리 이력<br>- 메모 작성 | 🔴 최고 |
| **DEL-005** | 처리 완료 리드 | - 처리 완료 리드 목록<br>- 필터: 날짜, 결과 (성공/실패)<br>- 재연락 버튼 | 🟡 높음 |
| **DEL-006** | 리드 검색 | - 검색: 고객 이름, 차종, 지역<br>- 필터: 날짜, 처리 상태 | 🟡 높음 |

##### 3.2.3 성과 (2개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **DEL-007** | 성과 리포트 | - 차트: 월별 전환율, 리드 수<br>- 등급 진행 상황 (다음 등급까지 n건)<br>- 인센티브 현황 | 🟡 높음 |
| **DEL-008** | 리더보드 | - TOP 10 딜러 (전환율 기준)<br>- 내 순위<br>- 등급별 평균 비교 | 🟢 중간 |

##### 3.2.4 기타 (2개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **DEL-009** | 알림 | - 알림 목록 (신규 리드, 등급 변경)<br>- 읽음/읽지 않음 표시<br>- 알림 설정 (푸시 ON/OFF) | 🟡 높음 |
| **DEL-010** | 도움말 | - FAQ<br>- 매뉴얼 다운로드<br>- 고객센터 연락처 | 🟢 중간 |

#### 3.3 고객 포탈 (10개)

##### 3.3.1 메인 (2개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **CUS-001** | 고객 홈 | - 내 차량 요약 (차종, 구매일, 교체 예정일)<br>- 보험 만기일 알림<br>- 추천 서비스: 보험 비교, 정비 예약 | 🔴 최고 |
| **CUS-002** | 프로필 | - 기본 정보 (이름, 연락처, 주소)<br>- 차량 정보<br>- 비밀번호 변경 | 🟡 높음 |

##### 3.3.2 보험 (3개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **CUS-003** | 보험 비교 | - 3개 이상 보험사 실시간 견적<br>- 비교표 (보장 내용, 가격)<br>- 가입 버튼 | 🔴 최고 |
| **CUS-004** | 보험 가입 | - 폼: 가입자 정보, 차량 정보<br>- 유효성 검사<br>- 결제 연동 | 🔴 최고 |
| **CUS-005** | 보험 이력 | - 가입 이력 (보험사, 만기일)<br>- 증권 다운로드<br>- 갱신 버튼 | 🟡 높음 |

##### 3.3.3 차량 (2개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **CUS-006** | 차량 조회 | - 내 차량 정보 (차종, 가액, 구매일)<br>- 교체 예정일 (ML 기반 예측)<br>- 교체 추천 차량 (Phase 2) | 🟡 높음 |
| **CUS-007** | 차량 등록 | - 폼: 차종, 가액, 구매일<br>- 유효성 검사<br>- 사진 업로드 (선택) | 🟡 높음 |

##### 3.3.4 기타 (3개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 |
|---------|--------|-----------|----------|
| **CUS-008** | 알림 | - 알림 목록 (보험 만기, 정비 예정)<br>- 읽음/읽지 않음 표시<br>- 알림 설정 (카카오톡 ON/OFF) | 🟡 높음 |
| **CUS-009** | 도움말 | - FAQ<br>- 매뉴얼<br>- 고객센터 | 🟢 중간 |
| **CUS-010** | 로그인 | - 카카오/네이버 소셜 로그인<br>- 이메일 로그인 (선택) | 🔴 최고 |

#### 3.4 Phase 2 확장 화면 (5개)

| 화면 ID | 화면명 | 주요 기능 | 우선순위 | 비고 |
|---------|--------|-----------|----------|------|
| **PH2-001** | 복지몰 홈 | - 싼타몰 연동<br>- 딜러 전용 할인 쿠폰<br>- 포인트 적립 내역 | 🟢 중간 | Phase 2 |
| **PH2-002** | 정비 예약 | - 제휴 정비소 목록 (5개+)<br>- 예약 폼<br>- 예약 이력 | 🟢 중간 | B2C 확장 |
| **PH2-003** | 실시간 채팅 | - 딜러 ↔ 고객 채팅<br>- 챗봇 자동 응답 (FAQ)<br>- 파일 업로드 | 🟢 중간 | 고객 지원 |
| **PH2-004** | 금융 비교 | - 캐피탈/리스 실시간 견적<br>- 비교표<br>- 신청 버튼 | 🟢 중간 | 수익 다각화 |
| **PH2-005** | 리뷰 관리 | - 딜러 리뷰 (고객 → 딜러)<br>- 평점 (5점 만점)<br>- 리뷰 작성 | 🟢 중간 | 리텐션 강화 |

**화면 수 합계**: 15 (관리자) + 10 (딜러) + 10 (고객) + 5 (Phase 2) = **40개**

#### 3.5 화면 흐름도 (핵심 시나리오)

##### 시나리오 1: 신규 DB 자동 배분 → 딜러 처리

```
[고객 DB 수집]
       ↓
[Supabase Trigger 발동]
       ↓
[자동 배분 로직] (FR-002)
 - 차종/지역/가액 분류
 - 등급별 딜러 매칭 (Gold 우선)
       ↓
[카카오 알림톡 발송] (FR-003)
 - 딜러에게 신규 리드 알림
       ↓
[딜러 포탈] (DEL-003)
 - 신규 리드 목록 확인
 - 리드 상세 (DEL-004)
       ↓
[처리] (통화 완료/미응답/거절)
       ↓
[대시보드 업데이트] (ADM-001)
 - 실시간 반영 (Supabase Realtime)
```

##### 시나리오 2: 72시간 룰 → 미접촉 알림

```
[DB 수집 후 72시간 경과]
       ↓
[n8n 스케줄러 체크] (FR-008)
 - 미접촉 DB 필터링
       ↓
[카카오 알림톡 발송]
 - 딜러: 미처리 알림
 - 관리자: 미처리 DB 알림
       ↓
[딜러 포탈] (DEL-003)
 - 알림 확인 (DEL-009)
 - 리드 처리
       ↓
[재배분 로직] (48시간 추가 미처리 시)
 - 다른 딜러에게 재배분
```

##### 시나리오 3: 고객 보험 비교 → 가입

```
[고객 포탈 로그인] (CUS-010)
       ↓
[보험 비교] (CUS-003)
 - 3개 보험사 실시간 견적
 - 비교표 확인
       ↓
[보험 가입] (CUS-004)
 - 폼 작성
 - 결제
       ↓
[중개 수수료 자동 정산] (FR-006)
 - 수익 대시보드 반영 (ADM-002)
       ↓
[카카오 알림톡 발송]
 - 고객: 가입 완료 안내
 - 관리자: 수익 발생 알림
```

---

### 4. API 설계 개요

#### 4.1 REST API 엔드포인트 (30개)

##### 4.1.1 인증 (3개)

| 엔드포인트 | 메서드 | 설명 | 권한 |
|-----------|--------|------|------|
| `/api/auth/login` | POST | 로그인 (이메일 + 비밀번호) | Public |
| `/api/auth/social` | POST | 소셜 로그인 (카카오/네이버) | Public |
| `/api/auth/logout` | POST | 로그아웃 | Authenticated |

##### 4.1.2 딜러 (7개)

| 엔드포인트 | 메서드 | 설명 | 권한 |
|-----------|--------|------|------|
| `/api/dealers` | GET | 딜러 목록 (페이지네이션) | Admin |
| `/api/dealers/:id` | GET | 딜러 상세 | Admin, Dealer (본인) |
| `/api/dealers` | POST | 딜러 등록 | Admin |
| `/api/dealers/:id` | PATCH | 딜러 수정 | Admin |
| `/api/dealers/:id` | DELETE | 딜러 삭제 | Admin |
| `/api/dealers/:id/performance` | GET | 딜러 성과 리포트 | Admin, Dealer (본인) |
| `/api/dealers/:id/grade` | PATCH | 딜러 등급 변경 | Admin |

##### 4.1.3 리드 (고객 DB) (7개)

| 엔드포인트 | 메서드 | 설명 | 권한 |
|-----------|--------|------|------|
| `/api/leads` | GET | 리드 목록 (페이지네이션) | Admin, Dealer (본인 리드만) |
| `/api/leads/:id` | GET | 리드 상세 | Admin, Dealer (본인 리드만) |
| `/api/leads` | POST | 리드 수동 등록 | Admin |
| `/api/leads/:id` | PATCH | 리드 수정 | Admin |
| `/api/leads/:id/assign` | POST | 리드 배분 (수동) | Admin |
| `/api/leads/:id/process` | PATCH | 리드 처리 (통화 완료/미응답/거절) | Dealer |
| `/api/leads/:id/memo` | POST | 리드 메모 작성 | Dealer |

##### 4.1.4 고객 (5개)

| 엔드포인트 | 메서드 | 설명 | 권한 |
|-----------|--------|------|------|
| `/api/customers` | GET | 고객 목록 (페이지네이션) | Admin |
| `/api/customers/:id` | GET | 고객 상세 | Admin, Customer (본인) |
| `/api/customers` | POST | 고객 등록 | Admin, Customer |
| `/api/customers/:id` | PATCH | 고객 수정 | Admin, Customer (본인) |
| `/api/customers/:id/vehicles` | GET | 고객 차량 이력 | Admin, Customer (본인) |

##### 4.1.5 알림톡 (3개)

| 엔드포인트 | 메서드 | 설명 | 권한 |
|-----------|--------|------|------|
| `/api/notifications/templates` | GET | 템플릿 목록 | Admin |
| `/api/notifications/send` | POST | 알림톡 발송 (단건/대량) | Admin, System |
| `/api/notifications/history` | GET | 발송 이력 | Admin |

##### 4.1.6 보험 (3개)

| 엔드포인트 | 메서드 | 설명 | 권한 |
|-----------|--------|------|------|
| `/api/insurance/quotes` | POST | 보험 견적 요청 (3개 보험사) | Customer |
| `/api/insurance/apply` | POST | 보험 가입 신청 | Customer |
| `/api/insurance/history` | GET | 보험 이력 | Admin, Customer (본인) |

##### 4.1.7 대시보드 (2개)

| 엔드포인트 | 메서드 | 설명 | 권한 |
|-----------|--------|------|------|
| `/api/dashboard/stats` | GET | 주요 지표 (오늘/이번주/이번달) | Admin |
| `/api/dashboard/charts` | GET | 차트 데이터 (시계열 추세) | Admin |

#### 4.2 API 응답 형식

**성공 응답**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "홍길동",
    "grade": "gold",
    "performance": {
      "leads": 45,
      "conversion_rate": 0.32
    }
  },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

**에러 응답**

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "로그인이 필요합니다.",
    "details": "JWT 토큰이 만료되었습니다."
  }
}
```

#### 4.3 외부 API 연동

| 외부 API | 목적 | 엔드포인트 예시 |
|---------|------|----------------|
| **카카오 알림톡** | 알림 발송 | `POST /v2/api/kakaoalk/message/send` |
| **보험사 A** | 보험 견적 | `POST /api/v1/quotes` |
| **보험사 B** | 보험 견적 | `POST /api/insurance/quote` |
| **보험사 C** | 보험 견적 | `POST /v2/quotations` |
| **캐피탈 A** | 금융 견적 (Phase 2) | `POST /api/v1/loans` |
| **캐피탈 B** | 금융 견적 (Phase 2) | `POST /api/finance/apply` |

**연동 전략**

- **보험사 API**: 3개 이상 제휴 (다양성 확보)
- **카카오 알림톡**: 템플릿 사전 승인 필수 (1~2주 소요)
- **에러 핸들링**: 외부 API 실패 시 재시도 (3회) + Slack 알림

---

### 5. 데이터 모델 개요 (ERD)

#### 5.1 핵심 엔티티 (10개)

##### 5.1.1 Dealer (딜러)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 딜러 고유 ID |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | 이메일 (로그인 ID) |
| `name` | VARCHAR(100) | NOT NULL | 딜러 이름 |
| `phone` | VARCHAR(20) | NOT NULL | 연락처 |
| `region` | VARCHAR(50) | NULL | 담당 지역 |
| `grade` | ENUM | NOT NULL | 등급 (gold, silver, bronze) |
| `status` | ENUM | NOT NULL | 상태 (active, inactive, suspended) |
| `last_login` | TIMESTAMP | NULL | 마지막 로그인 |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

**인덱스**
- `idx_dealer_grade` (grade)
- `idx_dealer_status` (status)
- `idx_dealer_last_login` (last_login)

##### 5.1.2 Customer (고객)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 고객 고유 ID |
| `name` | VARCHAR(100) | NOT NULL | 고객 이름 |
| `phone` | VARCHAR(20) | NOT NULL | 연락처 |
| `email` | VARCHAR(255) | NULL | 이메일 |
| `gender` | ENUM | NULL | 성별 (male, female, other) |
| `address` | TEXT | NULL | 주소 |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 (DB 수집일) |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

**인덱스**
- `idx_customer_phone` (phone)
- `idx_customer_created_at` (created_at)

##### 5.1.3 Vehicle (차량)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 차량 고유 ID |
| `customer_id` | UUID | FK → Customer | 고객 ID |
| `brand` | VARCHAR(50) | NOT NULL | 브랜드 (현대, 기아 등) |
| `model` | VARCHAR(100) | NOT NULL | 모델명 |
| `price` | DECIMAL(12,2) | NOT NULL | 가액 (만원) |
| `purchase_date` | DATE | NOT NULL | 구매일 |
| `replacement_type` | ENUM | NULL | 교체 유형 (change, cash) |
| `expected_replacement_date` | DATE | NULL | 교체 예정일 (ML 예측) |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

**인덱스**
- `idx_vehicle_customer_id` (customer_id)
- `idx_vehicle_purchase_date` (purchase_date)
- `idx_vehicle_expected_replacement_date` (expected_replacement_date)

##### 5.1.4 Lead (리드)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 리드 고유 ID |
| `customer_id` | UUID | FK → Customer | 고객 ID |
| `dealer_id` | UUID | FK → Dealer | 배분된 딜러 ID |
| `vehicle_id` | UUID | FK → Vehicle | 차량 ID |
| `status` | ENUM | NOT NULL | 상태 (pending, contacted, success, failed) |
| `assigned_at` | TIMESTAMP | NULL | 배분 시각 |
| `contacted_at` | TIMESTAMP | NULL | 첫 접촉 시각 |
| `processed_at` | TIMESTAMP | NULL | 처리 완료 시각 |
| `result` | ENUM | NULL | 결과 (converted, no_answer, rejected) |
| `memo` | TEXT | NULL | 딜러 메모 |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

**인덱스**
- `idx_lead_dealer_id` (dealer_id)
- `idx_lead_status` (status)
- `idx_lead_assigned_at` (assigned_at)
- `idx_lead_contacted_at` (contacted_at)

**비즈니스 로직**
- 72시간 룰: `contacted_at - created_at > 72시간` → 자동 알림
- 재배분: `contacted_at - assigned_at > 48시간` → 다른 딜러 배분

##### 5.1.5 Insurance (보험)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 보험 고유 ID |
| `customer_id` | UUID | FK → Customer | 고객 ID |
| `vehicle_id` | UUID | FK → Vehicle | 차량 ID |
| `insurer` | VARCHAR(100) | NOT NULL | 보험사 |
| `policy_number` | VARCHAR(100) | NULL | 증권 번호 |
| `start_date` | DATE | NOT NULL | 시작일 |
| `end_date` | DATE | NOT NULL | 만료일 |
| `premium` | DECIMAL(12,2) | NOT NULL | 보험료 (연) |
| `commission` | DECIMAL(12,2) | NULL | 중개 수수료 (15~20%) |
| `status` | ENUM | NOT NULL | 상태 (active, expired, cancelled) |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 (가입일) |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

**인덱스**
- `idx_insurance_customer_id` (customer_id)
- `idx_insurance_end_date` (end_date)
- `idx_insurance_status` (status)

**비즈니스 로직**
- 만기 알림: `end_date - CURDATE() = 30일` → 카카오 알림톡 발송

##### 5.1.6 Notification (알림톡)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 알림 고유 ID |
| `template_id` | UUID | FK → Template | 템플릿 ID |
| `recipient_type` | ENUM | NOT NULL | 수신자 유형 (dealer, customer) |
| `recipient_id` | UUID | NOT NULL | 수신자 ID |
| `phone` | VARCHAR(20) | NOT NULL | 수신 전화번호 |
| `message` | TEXT | NOT NULL | 발송 메시지 |
| `status` | ENUM | NOT NULL | 상태 (pending, sent, failed) |
| `sent_at` | TIMESTAMP | NULL | 발송 시각 |
| `opened_at` | TIMESTAMP | NULL | 오픈 시각 (오픈율 추적) |
| `error_message` | TEXT | NULL | 에러 메시지 (실패 시) |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |

**인덱스**
- `idx_notification_recipient` (recipient_type, recipient_id)
- `idx_notification_status` (status)
- `idx_notification_sent_at` (sent_at)

##### 5.1.7 Template (알림톡 템플릿)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 템플릿 고유 ID |
| `name` | VARCHAR(100) | NOT NULL | 템플릿 이름 |
| `code` | VARCHAR(50) | UNIQUE, NOT NULL | 카카오 승인 코드 |
| `message` | TEXT | NOT NULL | 템플릿 메시지 (변수 포함) |
| `variables` | JSONB | NULL | 변수 정의 (예: `{"name": "고객명"}`) |
| `status` | ENUM | NOT NULL | 상태 (pending, approved, rejected) |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

**예시 템플릿**

```
[친절한누나들] 신규 리드 알림

{dealer_name} 님, 신규 리드가 배분되었습니다.

- 고객: {customer_name}
- 차종: {vehicle_model}
- 가액: {vehicle_price}만원

지금 바로 확인하세요!
👉 https://app.example.com/leads/{lead_id}
```

##### 5.1.8 DealerGradeHistory (딜러 등급 이력)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 이력 고유 ID |
| `dealer_id` | UUID | FK → Dealer | 딜러 ID |
| `old_grade` | ENUM | NULL | 이전 등급 |
| `new_grade` | ENUM | NOT NULL | 신규 등급 |
| `reason` | TEXT | NULL | 변경 사유 (자동/수동) |
| `changed_by` | UUID | NULL | 변경자 (관리자 ID) |
| `created_at` | TIMESTAMP | NOT NULL | 변경일 |

**인덱스**
- `idx_grade_history_dealer_id` (dealer_id)
- `idx_grade_history_created_at` (created_at)

##### 5.1.9 Campaign (마케팅 캠페인)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 캠페인 고유 ID |
| `name` | VARCHAR(100) | NOT NULL | 캠페인 이름 |
| `type` | ENUM | NOT NULL | 유형 (retention, reactivation, promotion) |
| `target` | ENUM | NOT NULL | 타겟 (dealer, customer) |
| `status` | ENUM | NOT NULL | 상태 (draft, running, completed) |
| `start_date` | DATE | NOT NULL | 시작일 |
| `end_date` | DATE | NULL | 종료일 |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

**예시 캠페인**
- **리텐션**: 3개월 미활동 딜러 재활성화 (혜택 제공)
- **프로모션**: 보험 만기 고객 대상 신규 가입 유도

##### 5.1.10 Revenue (수익)

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK | 수익 고유 ID |
| `source` | ENUM | NOT NULL | 수익원 (insurance, finance, dealer_subscription, lead_fee) |
| `customer_id` | UUID | FK → Customer | 고객 ID (해당 시) |
| `dealer_id` | UUID | FK → Dealer | 딜러 ID (해당 시) |
| `amount` | DECIMAL(12,2) | NOT NULL | 금액 (원) |
| `commission_rate` | DECIMAL(5,2) | NULL | 수수료율 (%) |
| `date` | DATE | NOT NULL | 수익 발생일 |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |

**인덱스**
- `idx_revenue_source` (source)
- `idx_revenue_date` (date)

#### 5.2 ERD (텍스트 기반)

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Dealer    │         │    Lead     │         │  Customer   │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id (PK)     │────1:N──│ dealer_id   │──N:1────│ id (PK)     │
│ email       │         │ customer_id │         │ name        │
│ name        │         │ vehicle_id  │         │ phone       │
│ grade       │         │ status      │         │ address     │
│ status      │         │ assigned_at │         │ created_at  │
│ last_login  │         │ contacted_at│         └─────────────┘
│ created_at  │         │ result      │                 │
└─────────────┘         │ memo        │                 │1
       │                └─────────────┘                 │
       │1                       │N                      │
       │                        │1                      │
       │                        │                       │N
       │                ┌─────────────┐         ┌─────────────┐
       │                │   Vehicle   │         │  Insurance  │
       │                ├─────────────┤         ├─────────────┤
       │                │ id (PK)     │────1:N──│ vehicle_id  │
       │                │ customer_id │         │ customer_id │
       │                │ brand       │         │ insurer     │
       │                │ model       │         │ start_date  │
       │                │ price       │         │ end_date    │
       │                │ purchase_date│         │ commission  │
       │                │ expected_   │         │ status      │
       │                │  replacement│         └─────────────┘
       │                └─────────────┘
       │
       │N
       │
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│ Notification│         │  Template   │         │  Campaign   │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id (PK)     │──N:1────│ id (PK)     │         │ id (PK)     │
│ template_id │         │ name        │         │ name        │
│ recipient_  │         │ code        │         │ type        │
│  type       │         │ message     │         │ target      │
│ recipient_id│         │ variables   │         │ status      │
│ phone       │         │ status      │         │ start_date  │
│ status      │         │ created_at  │         │ end_date    │
│ sent_at     │         └─────────────┘         └─────────────┘
│ opened_at   │
└─────────────┘
       │
       │N
       │
┌─────────────┐         ┌─────────────┐
│   Revenue   │         │ DealerGrade │
├─────────────┤         │   History   │
│ id (PK)     │         ├─────────────┤
│ source      │         │ dealer_id   │──N:1──→ Dealer
│ customer_id │         │ old_grade   │
│ dealer_id   │         │ new_grade   │
│ amount      │         │ reason      │
│ date        │         │ created_at  │
└─────────────┘         └─────────────┘
```

**관계 요약**
1. `Dealer 1:N Lead` (1명 딜러 → 여러 리드)
2. `Customer 1:N Lead` (1명 고객 → 여러 리드)
3. `Customer 1:N Vehicle` (1명 고객 → 여러 차량)
4. `Vehicle 1:N Insurance` (1대 차량 → 여러 보험)
5. `Template 1:N Notification` (1개 템플릿 → 여러 알림)
6. `Dealer 1:N DealerGradeHistory` (1명 딜러 → 여러 등급 이력)

#### 5.3 주요 쿼리 (예시)

##### 5.3.1 딜러 등급별 성과 집계

```sql
SELECT
  d.grade,
  COUNT(l.id) AS total_leads,
  SUM(CASE WHEN l.result = 'converted' THEN 1 ELSE 0 END) AS converted_leads,
  ROUND(SUM(CASE WHEN l.result = 'converted' THEN 1 ELSE 0 END) * 100.0 / COUNT(l.id), 2) AS conversion_rate
FROM
  dealers d
LEFT JOIN
  leads l ON d.id = l.dealer_id
WHERE
  d.status = 'active'
GROUP BY
  d.grade
ORDER BY
  conversion_rate DESC;
```

##### 5.3.2 72시간 미접촉 리드 조회

```sql
SELECT
  l.id,
  l.dealer_id,
  c.name AS customer_name,
  v.model AS vehicle_model,
  l.assigned_at,
  EXTRACT(HOUR FROM (NOW() - l.assigned_at)) AS hours_elapsed
FROM
  leads l
JOIN
  customers c ON l.customer_id = c.id
JOIN
  vehicles v ON l.vehicle_id = v.id
WHERE
  l.status = 'pending'
  AND l.contacted_at IS NULL
  AND (NOW() - l.assigned_at) > INTERVAL '72 hours';
```

##### 5.3.3 보험 만기 30일 이내 고객 조회

```sql
SELECT
  c.id,
  c.name,
  c.phone,
  i.end_date,
  (i.end_date - CURDATE()) AS days_until_expiry
FROM
  customers c
JOIN
  insurances i ON c.id = i.customer_id
WHERE
  i.status = 'active'
  AND (i.end_date - CURDATE()) BETWEEN 0 AND 30
ORDER BY
  days_until_expiry ASC;
```

---

## 요약 및 다음 단계

### 문서 요약

본 문서는 **친절한누나들 자동차보험 DB 플랫폼**의 요구사항 분석 및 기술 아키텍처를 정의했습니다.

**핵심 내용**
1. **현황 분석**: 회의록 기반 "실행 안 됨" 문제 해결 방향 제시
2. **해외 벤치마크**: Droom, Cars24, Carwow, Fair 4개 사례 집중 분석
3. **양면 수익화**: 딜러 15% + 고객 85%, 보험 중개 메인 수익원 (15~20% 마진)
4. **기능 요구사항**: Phase 1 필수 6개 + 추천 4개, Phase 2 확장 4개
5. **기술 스택**: Next.js + Supabase + 카카오 알림톡 + n8n
6. **화면 설계**: 40개 화면 (관리자 15 + 딜러 10 + 고객 10 + Phase 2 5)
7. **API 설계**: 30개 REST API 엔드포인트
8. **데이터 모델**: 10개 핵심 엔티티 + ERD

**차별화 요소**
- **72시간 룰**: DB 수집 후 빠른 접촉으로 전환율 2~3배 향상
- **딜러 등급제**: Gold/Silver/Bronze로 리텐션 강화
- **카카오 알림톡**: 도달률 90%+ (vs 문자 30%)
- **보험 중개**: 월 $50,000+ 수익 목표

### 다음 단계

1. **Phase 1 제안서 작성** (D+7)
   - 본 문서 기반 비즈니스 가치 중심 제안서
   - 수익 시뮬레이션 (월 거래 500건 시 수익 구조)
   - 딜러 리텐션 ROI 산출

2. **와이어프레임 제작** (D+14)
   - 핵심 화면 15개 우선 (관리자 5 + 딜러 5 + 고객 5)
   - Figma 또는 Pencil 활용

3. **기술 검증** (D+21)
   - Supabase + 카카오 API PoC
   - n8n 워크플로우 샘플 (72시간 룰)

4. **견적서 작성** (D+21)
   - M/M 기반 인력 산정 (8~10명)
   - 일정: 5~6개월
   - 예산: 1.5~2억원

5. **2차 미팅** (D+30)
   - 의사결정권자 참석 요청
   - 제안서 프레젠테이션

---

**문서 작성 완료**
**작성자**: 시니어 솔루션 아키텍트 (Claude Sonnet 4.5)
**작성일**: 2026-03-26
**버전**: 1.0
