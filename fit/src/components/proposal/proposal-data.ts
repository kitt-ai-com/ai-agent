// ──────────────────────────────────────────────
// 대건종합특송 배차 관리 플랫폼 제안서 - 데이터 상수 & 타입 정의
// ──────────────────────────────────────────────

export interface PainPoint {
  area: string;
  current: string;
  problem: string;
  loss: string;
  severity: "critical" | "warning";
}

export interface TechItem {
  category: string;
  items: { name: string; desc: string }[];
}

export interface Module {
  id: string;
  name: string;
  price: number;
  features: string[];
  phase: 1 | 2;
}

export interface Milestone {
  id: string;
  week: string;
  title: string;
  tasks: string[];
  phase: 1 | 2;
}

export interface TeamMember {
  role: string;
  expertise: string[];
  description: string;
}

export interface TeamAdvantage {
  title: string;
  desc: string;
}

export interface MaintenanceTier {
  tier: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

// ─── Navigation Links ───
export const NAV_LINKS = [
  { id: "hero", label: "개요" },
  { id: "analysis", label: "현황 분석" },
  { id: "tech", label: "기술 스택" },
  { id: "roadmap", label: "로드맵" },
  { id: "features", label: "기능 상세" },
  { id: "timeline", label: "타임라인" },
  { id: "pricing", label: "견적" },
  { id: "team", label: "팀 구성" },
] as const;

// ─── Hero Stats ───
export const HERO_STATS = [
  { label: "프로젝트 기간", value: "3개월", sub: "12주 완성형 시스템" },
  { label: "업무 시간 절감", value: "70%", sub: "플랫폼 통합 효과" },
  { label: "견적서 작성", value: "87% ↓", sub: "자동화로 15분→2분" },
] as const;

// ─── Pain Points ───
export const PAIN_POINTS: PainPoint[] = [
  {
    area: "권한 관리",
    current: "체계적 관리 부재",
    problem: "직원별 역할과 권한이 관리되지 않음",
    loss: "보안 위험",
    severity: "critical",
  },
  {
    area: "고객사 정보",
    current: "엑셀, 수첩 분산",
    problem: "고객사 정보가 여러 곳에 흩어져 관리 어려움",
    loss: "정보 접근 시간",
    severity: "critical",
  },
  {
    area: "4개 플랫폼 조회",
    current: "개별 사이트 접속",
    problem: "동일 정보를 4번 입력, 비교 시간 소모",
    loss: "20분/건 소요",
    severity: "critical",
  },
  {
    area: "업무 메뉴얼",
    current: "문서 찾아보기",
    problem: "부서별 메뉴얼 확인에 시간 지연",
    loss: "10분/회",
    severity: "warning",
  },
  {
    area: "견적서 작성",
    current: "수동 작성",
    problem: "고객사별 견적서를 일일이 작성",
    loss: "15분/건",
    severity: "critical",
  },
  {
    area: "견적 요청 접수",
    current: "카카오톡 파일",
    problem: "견적 요청 파일이 분산되어 관리 불가",
    loss: "업무 효율 저하",
    severity: "warning",
  },
];

// ─── Monthly Loss Summary ───
export const MONTHLY_LOSS = {
  min: 600,
  max: 1200,
  unit: "만 원",
  items: [
    { label: "플랫폼 조회 시간 낭비", amount: "20분/건 × 일 10건" },
    { label: "견적서 수동 작성 시간", amount: "15분/건 × 일 5건" },
    { label: "고객사 정보 검색 시간", amount: "5분/건 × 일 20건" },
    { label: "메뉴얼 확인 시간", amount: "10분/회 × 일 5회" },
  ],
};

// ─── Tech Stack ───
export const TECH_STACK: TechItem[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js / React", desc: "서버 사이드 렌더링 + SPA" },
      { name: "TypeScript", desc: "타입 안정성 보장" },
      { name: "Tailwind CSS", desc: "유틸리티 기반 스타일링" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / NestJS", desc: "모듈형 API 서버" },
      { name: "REST API", desc: "표준 HTTP 인터페이스" },
      { name: "JWT Auth", desc: "역할 기반 인증/인가" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", desc: "관계형 데이터 저장소" },
      { name: "Redis", desc: "캐싱 및 세션 관리" },
      { name: "Prisma ORM", desc: "타입 안전 DB 쿼리" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "AWS / NCP", desc: "클라우드 인프라" },
      { name: "Docker", desc: "컨테이너 배포 환경" },
      { name: "GitHub Actions", desc: "CI/CD 자동화" },
    ],
  },
];

// ─── Phase 1 Modules ───
export const PHASE1_MODULES: Module[] = [
  {
    id: "user-crm",
    name: "사용자 & 고객사 관리",
    price: 8000000,
    features: [
      "계정/권한 관리 (RBAC)",
      "고객사 통합 CRM",
      "부서별 메뉴 접근 제어",
      "감사 로그 시스템",
    ],
    phase: 1,
  },
  {
    id: "file-upload",
    name: "파일 업로드 시스템",
    price: 5000000,
    features: [
      "카카오톡 견적 파일 업로드",
      "자동 분류 및 저장",
      "파일 검색 및 이력 관리",
      "처리 상태 관리",
    ],
    phase: 1,
  },
  {
    id: "ai-chatbot",
    name: "AI 챗봇 메뉴얼 시스템",
    price: 7000000,
    features: [
      "ChatGPT/Gemini API 연동",
      "부서별 메뉴얼 RAG 구축",
      "실시간 질의응답",
      "답변 유용성 평가",
    ],
    phase: 1,
  },
  {
    id: "platform-integration",
    name: "4개 플랫폼 API 통합",
    price: 8000000,
    features: [
      "전국24시콜화물·화물맨·원콜·인성데이타",
      "통합 입력 인터페이스",
      "실시간 견적 비교",
      "최적 견적 자동 추천",
    ],
    phase: 1,
  },
];

// ─── Phase 2 Modules (향후 확장 옵션) ───
export const PHASE2_MODULES: Module[] = [
  {
    id: "auto-quotation",
    name: "표준 견적서 자동 작성",
    price: 2000000,
    features: [
      "템플릿 기반 자동 생성",
      "고객사 정보 자동 연동",
      "PDF 생성 및 이메일 발송",
      "견적서 이력 관리",
    ],
    phase: 2,
  },
  {
    id: "product-sales",
    name: "제품/판매 관리 시스템",
    price: 12000000,
    features: [
      "멀티 LLM API 통합 (ChatGPT, Gemini, Claude)",
      "제품 카탈로그 및 재고 관리",
      "판매 주문 처리 자동화",
      "고객사별 제품 가격 관리",
      "품질 검증 및 승인 워크플로우",
      "매출 분석 및 리포팅",
      "AI 기반 판매 예측",
    ],
    phase: 2,
  },
  {
    id: "ai-navigation",
    name: "AI 차량 전용 내비게이션",
    price: 15000000,
    features: [
      "대형차량 특화 경로 최적화",
      "실시간 교통 상황 반영",
      "AI 기반 최적 경로 추천",
      "차량 제원(높이, 중량) 고려",
      "실시간 우회 경로 제안",
      "배차 시간 예측 및 알림",
      "주유소/휴게소 정보 연동",
    ],
    phase: 2,
  },
  {
    id: "vehicle-db",
    name: "차량 제원 및 정보 관리",
    price: 8000000,
    features: [
      "차량별 제원 데이터베이스",
      "차량 가용성 실시간 관리",
      "정비 이력 추적",
      "차량 상태 모니터링",
      "보험 및 등록증 관리",
      "운행 일지 자동 기록",
    ],
    phase: 2,
  },
  {
    id: "mobile-app",
    name: "모바일 앱 개발",
    price: 10000000,
    features: [
      "iOS/Android 네이티브 앱",
      "외부 견적 조회 및 승인",
      "실시간 푸시 알림",
      "모바일 견적서 발행",
      "배차 현황 모니터링",
      "드라이버 앱 연동",
    ],
    phase: 2,
  },
];

// ─── Common Module ───
export const COMMON_MODULE = {
  name: "공통 기능 및 인프라",
  price: 5000000,
  items: [
    "요구사항 분석 및 DB 설계",
    "UI/UX 화면 설계 (Figma)",
    "서버 인프라 세팅",
    "CI/CD 파이프라인 구축",
    "사용자 교육 및 안정화",
    "운영 매뉴얼 제작",
  ],
};

// ─── Timeline Milestones ───
export const MILESTONES: Milestone[] = [
  {
    id: "M1",
    week: "1~2주차",
    title: "킥오프 & 요구사항",
    tasks: [
      "프로젝트 킥오프 미팅",
      "업무 프로세스 분석",
      "요구사항 확정",
      "WBS 수립",
    ],
    phase: 1,
  },
  {
    id: "M2",
    week: "2~3주차",
    title: "설계 완료",
    tasks: [
      "ERD / DB 스키마 설계",
      "API 명세서 작성",
      "UI/UX 화면 설계 (Figma)",
      "개발 환경 구축",
    ],
    phase: 1,
  },
  {
    id: "M3",
    week: "3~5주차",
    title: "마스터 데이터 개발",
    tasks: [
      "거래처 관리 CRUD",
      "기사/차량 DB 구현",
      "상하차지 거점 관리",
      "통합 검색 필터링",
    ],
    phase: 1,
  },
  {
    id: "M4",
    week: "5~6주차",
    title: "오더 관리 개발",
    tasks: [
      "오더 등록 폼 구현",
      "엑셀 업로드 파싱/검증",
      "오더 목록 & 필터링",
      "대시보드 KPI 위젯",
    ],
    phase: 1,
  },
  {
    id: "M5",
    week: "6~8주차",
    title: "배차/운송장 개발",
    tasks: [
      "배차 등록/수정 기능",
      "기사 배정 매칭 로직",
      "디지털 운송장 자동 발행",
      "PDF 출력 기능",
    ],
    phase: 1,
  },
  {
    id: "M6",
    week: "8~9주차",
    title: "정산 개발",
    tasks: [
      "매출/매입 리스트 자동 생성",
      "정산 마감 로직 구현",
      "보고서 출력 (PDF/Excel)",
      "정산 이력 관리",
    ],
    phase: 1,
  },
  {
    id: "M7",
    week: "9~11주차",
    title: "통합 테스트",
    tasks: [
      "전체 기능 통합 테스트",
      "성능 최적화",
      "버그 수정 & QA",
      "UAT (사용자 인수 테스트)",
    ],
    phase: 1,
  },
  {
    id: "M8",
    week: "11~12주차",
    title: "납품 & 교육",
    tasks: [
      "운영 서버 배포",
      "사용자 교육 실시",
      "운영 매뉴얼 전달",
      "안정화 지원 시작",
    ],
    phase: 1,
  },
];

// ─── ROI Data ───
export const ROI = {
  threeYearROI: 274,
  paybackMonths: 4,
  annualSaving: 12000,
  savingUnit: "만 원",
  details: [
    { label: "업무 시간 70% 절감", value: "연 3,500만 원", percent: 29 },
    { label: "처리량 200% 증가 매출", value: "연 8,000만 원", percent: 67 },
    { label: "견적서 외주 비용 절감", value: "연 500만 원", percent: 4 },
  ],
};

// ─── Payment Terms ───
export const PAYMENT_TERMS = [
  { phase: "1차 (계약금)", timing: "계약 체결 시", ratio: 40, amount: 13200000 },
  { phase: "2차 (중도금)", timing: "개발 50% 완료", ratio: 40, amount: 13200000 },
  { phase: "3차 (잔금)", timing: "최종 납품 완료", ratio: 20, amount: 6600000 },
];

// ─── Team Composition (소수정예 전담팀) ───
export const TEAM: TeamMember[] = [
  {
    role: "PM & 풀스택 리드",
    description: "프로젝트 기획부터 개발 총괄까지 전 과정을 책임지는 핵심 리더",
    expertise: [
      "프로젝트 총괄 관리 & 일정 운영",
      "시스템 아키텍처 설계",
      "고객 커뮤니케이션 & 요구사항 관리",
      "풀스택 개발 리드 & 코드 리뷰",
    ],
  },
  {
    role: "Frontend & UI/UX 엔지니어",
    description: "사용자 경험 설계부터 프론트엔드 구현까지 인터페이스 전문가",
    expertise: [
      "React / Next.js 화면 개발",
      "반응형 웹 UI & 디자인 시스템 구축",
      "UI/UX 설계 (Figma)",
      "API 연동 & 상태 관리",
    ],
  },
  {
    role: "Backend & Infrastructure 엔지니어",
    description: "서버 아키텍처부터 인프라 운영까지 시스템 전반을 관리하는 기술 전문가",
    expertise: [
      "API 서버 개발 & DB 설계",
      "인증/인가 & 보안 시스템",
      "클라우드 인프라 & CI/CD 구축",
      "QA 자동화 & 성능 최적화",
    ],
  },
];

export const TEAM_ADVANTAGES: TeamAdvantage[] = [
  {
    title: "직접 소통",
    desc: "중간 전달 과정 없이 고객과 개발자가 직접 소통하여 요구사항을 정확히 반영합니다.",
  },
  {
    title: "높은 몰입도",
    desc: "전담 인력이 프로젝트에 100% 집중하여 품질과 속도를 동시에 보장합니다.",
  },
  {
    title: "빠른 의사결정",
    desc: "의사결정 단계를 최소화하여 변경 요청에 당일 내 즉각 대응합니다.",
  },
  {
    title: "일관된 품질",
    desc: "소수 전문가가 전체 코드를 직접 작성하여 아키텍처 일관성과 완성도를 유지합니다.",
  },
];

// ─── Maintenance Tiers ───
export const MAINTENANCE_FREE_PERIOD = "납품 후 3개월 무상 유지보수";

export const MAINTENANCE_TIERS: MaintenanceTier[] = [
  {
    tier: "Basic",
    price: "월 30만 원",
    features: [
      "긴급 버그 패치",
      "이메일 기술 지원",
    ],
  },
  {
    tier: "Standard",
    price: "월 50만 원",
    features: [
      "Basic 전체 포함",
      "기능 소규모 개선 (월 8h)",
      "전화/메신저 기술 지원",
      "성능 최적화 및 보안 점검 (패치 등)",
    ],
    recommended: true,
  },
];

// ─── Additional Costs (별도 비용) ───
export const ADDITIONAL_COSTS = [
  { item: "서버 호스팅 비용", note: "실사용량 기준 월 청구 (AWS/GCP 등)" },
  { item: "AI API 사용 비용", note: "ChatGPT, Gemini, Claude API 실사용량 기준 청구" },
];

// ─── Price Helpers ───
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(amount);
}

export function formatManWon(amount: number): string {
  const man = amount / 10000;
  return `${new Intl.NumberFormat("ko-KR").format(man)}만 원`;
}

// ─── Totals ───
export const PHASE1_TOTAL = 33000000;
export const PHASE1_VAT_INCLUDED = 36300000;
