// ──────────────────────────────────────────────
// 정동병원 재고관리 플랫폼 제안서 - 데이터 상수 & 타입 정의
// ──────────────────────────────────────────────

export interface ProblemArea {
  area: string;
  issues: string[];
  severity: "critical" | "warning";
}

export interface SolutionIndicator {
  title: string;
  metric: string;
  benefits: string[];
}

export interface Feature {
  title: string;
  capabilities: string[];
  highlights: string[];
}

export interface Differentiation {
  title: string;
  points: string[];
}

export interface ProcessWeek {
  week: string;
  title: string;
  activities: string[];
  deliverables: string[];
}

export interface PricingPlan {
  name: string;
  target: string;
  setupCost: number;
  monthlyOpex: number;
  features: string[];
  isRecommended?: boolean;
}

export interface AddOnService {
  name: string;
  description: string[];
  price: string;
}

export interface QuantitativeBenefit {
  title: string;
  before: string;
  after: string;
  impact: string;
}

export interface QualitativeBenefit {
  title: string;
  benefits: string[];
}

export interface HospitalProfile {
  name: string;
  location: string;
  specialization: string;
  beds: string;
  departments: string;
  specialized: string;
  additionalServices: string;
}

// ─── Navigation Links ───
export const NAV_LINKS = [
  { id: "hero", label: "개요" },
  { id: "problems", label: "현황 분석" },
  { id: "solution", label: "솔루션" },
  { id: "features", label: "핵심 기능" },
  { id: "differentiation", label: "차별화" },
  { id: "process", label: "도입 프로세스" },
  { id: "pricing", label: "비용 안내" },
  { id: "results", label: "기대 효과" },
] as const;

// ─── Hero Stats ───
export const HERO_STATS = [
  { label: "재고 부족 사고", value: "90%", sub: "예방 효과" },
  { label: "세금계산서 발행", value: "75%", sub: "시간 단축" },
  { label: "운영 효율", value: "극대화", sub: "통합 플랫폼" },
] as const;

// ─── Problems ───
export const PROBLEMS: ProblemArea[] = [
  {
    area: "수작업 중심의 재고 관리",
    issues: [
      "엑셀 또는 수기 장부로 관리하여 실시간 재고 파악 어려움",
      "입출고 데이터 입력 시 휴먼 에러 빈번 발생",
      "재고 실사 시 많은 시간과 인력 소요",
    ],
    severity: "critical",
  },
  {
    area: "세금계산서 발행 업무 복잡성",
    issues: [
      "공급업체별 수기 작성 및 국세청 홈택스 개별 업로드",
      "월말/분기말 정산 시 야근 및 업무 과부하",
      "세금계산서 오류 발생 시 수정 및 재발행 번거로움",
    ],
    severity: "critical",
  },
  {
    area: "공급업체 커뮤니케이션 비효율",
    issues: [
      "전화/팩스/이메일로 발주서 전달 → 누락 및 지연 발생",
      "납품 일정 및 수량 확인 어려움",
      "가격 협상 이력 관리 미흡",
    ],
    severity: "warning",
  },
  {
    area: "데이터 기반 의사결정 부재",
    issues: [
      "과거 소비 패턴 분석 어려움",
      "적정 발주 시점 및 수량 판단 어려움",
      "재고 회전율, 비용 절감 기회 파악 불가",
    ],
    severity: "warning",
  },
];

// ─── Solution Indicators ───
export const SOLUTION_INDICATORS: SolutionIndicator[] = [
  {
    title: "실시간 재고 관리",
    metric: "90%",
    benefits: [
      "바코드/QR 스캔으로 즉시 입출고 등록",
      "모바일에서 언제 어디서나 재고 확인",
      "부서별/창고별 분산 재고 통합 관리",
    ],
  },
  {
    title: "세금계산서 자동화",
    metric: "75%",
    benefits: [
      "입고 데이터 기반 자동 생성",
      "홈택스 전자세금계산서 자동 발행",
      "월별/분기별 정산 리포트 자동 생성",
    ],
  },
  {
    title: "스마트 알림 시스템",
    metric: "AI 추천",
    benefits: [
      "품목별 최소/최대 재고 설정 및 자동 알림",
      "유통기한 관리 및 선입선출(FIFO) 자동화",
      "발주 적정 시점 AI 추천",
    ],
  },
  {
    title: "데이터 기반 의사결정",
    metric: "최적화",
    benefits: [
      "과거 소비 패턴 기반 발주량 추천",
      "계절별/요일별 소비 트렌드 분석",
      "재고 회전율 및 비용 절감 기회 제안",
    ],
  },
];

// ─── Features ───
export const FEATURES: Feature[] = [
  {
    title: "통합 재고 관리",
    capabilities: [
      "바코드/QR 스캔 입출고 자동 등록",
      "품목별 최소/최대 재고 설정 및 자동 알림",
      "유통기한 관리 및 선입선출(FIFO) 자동화",
      "부서별/창고별 재고 분산 관리",
      "모바일 앱 실시간 재고 확인",
    ],
    highlights: [
      "실시간 재고 현황 대시보드",
      "입출고 이력 완전 추적",
      "재고 실사 기능 (실제 재고와 시스템 재고 비교)",
      "재고 이동 관리 (부서 간 이동)",
    ],
  },
  {
    title: "세금계산서 자동화",
    capabilities: [
      "입고 데이터 기반 세금계산서 자동 생성",
      "국세청 홈택스 연동 전자세금계산서 발행",
      "공급업체-병원 간 승인 프로세스 자동화",
      "월별/분기별 정산 리포트 자동 생성",
      "회계 프로그램 연동 (더존, 더샵 등)",
    ],
    highlights: [
      "세금계산서 일괄 발행 기능",
      "수정/취소 세금계산서 처리",
      "매입/매출 통계 및 부가세 신고 자료 자동 생성",
      "거래명세서 자동 첨부",
    ],
  },
  {
    title: "공급업체 협업 포털",
    capabilities: [
      "발주서 자동 전송 및 공급업체 승인 시스템",
      "배송 상태 실시간 추적",
      "공급업체별 가격 비교 및 협상 이력 관리",
      "신규 공급업체 등록 및 평가 시스템",
      "공급업체 전용 모바일 앱 제공",
    ],
    highlights: [
      "공급업체 포털 로그인 (별도 권한)",
      "발주 알림 및 확인 기능",
      "납품 예정일 등록 및 알림",
      "공급업체 평가 및 등급 관리",
    ],
  },
  {
    title: "AI 분석 & 예측",
    capabilities: [
      "과거 소비 패턴 기반 최적 발주량 추천",
      "계절별/요일별 소비 트렌드 분석",
      "재고 회전율 및 비용 절감 기회 제안",
      "이상 거래 탐지 및 부정 사용 방지",
      "맞춤형 KPI 대시보드 및 알림 설정",
    ],
    highlights: [
      "머신러닝 기반 수요 예측",
      "재고 최적화 시뮬레이션",
      "비용 분석 및 절감 제안",
      "맞춤형 리포트 생성 (주간/월간/분기별)",
    ],
  },
];

// ─── Differentiation ───
export const DIFFERENTIATION: Differentiation[] = [
  {
    title: "클라우드 기반 SaaS 플랫폼",
    points: [
      "별도 서버 구축 없이 웹/모바일에서 즉시 접속 가능",
      "자동 백업으로 데이터 손실 걱정 없음",
      "24/7 시스템 모니터링 및 자동 업데이트",
    ],
  },
  {
    title: "ERP/HIS 시스템 연동",
    points: [
      "기존 병원 정보 시스템(HIS)과 API 연동",
      "회계 시스템 연동으로 데이터 이중 입력 방지",
      "표준 프로토콜 지원 (HL7, FHIR 등)",
    ],
  },
  {
    title: "금융권 수준의 보안",
    points: [
      "SSL 암호화 통신",
      "권한별 접근 제어 (관리자/담당자/조회자)",
      "접속 로그 관리 및 감사 추적",
      "개인정보보호법 및 의료법 준수",
    ],
  },
];

// ─── Implementation Process ───
export const IMPLEMENTATION_PROCESS: ProcessWeek[] = [
  {
    week: "WEEK 01",
    title: "현황 분석 & 요구사항 정의",
    activities: [
      "현재 재고관리 프로세스 및 문제점 분석",
      "품목 분류 체계 설계 (의약품/의료소모품/일반소모품 등)",
      "사용자 권한 구조 설계 (부서별/직급별)",
      "공급업체 목록 및 거래 조건 정리",
    ],
    deliverables: [
      "요구사항 정의서",
      "품목 분류 체계도",
      "사용자 권한 매트릭스",
    ],
  },
  {
    week: "WEEK 02",
    title: "시스템 구축 & 데이터 이관",
    activities: [
      "플랫폼 초기 설정 및 커스터마이징",
      "기존 재고 데이터 입력 (품목명/규격/단가/재고량)",
      "공급업체 정보 등록 및 계정 생성",
      "바코드 라벨 출력 및 부착",
      "기존 시스템 연동 (HIS/ERP)",
    ],
    deliverables: [
      "초기 재고 데이터베이스",
      "바코드 라벨",
      "공급업체 계정 정보",
    ],
  },
  {
    week: "WEEK 03",
    title: "사용자 교육 & 테스트",
    activities: [
      "재고 담당자: 입출고 등록, 재고 조회",
      "원무과: 세금계산서 발행 및 관리",
      "관리자: 대시보드 및 리포트 활용",
      "실제 업무 환경에서 시범 운영",
      "사용자 피드백 수집 및 반영",
    ],
    deliverables: [
      "사용자 매뉴얼",
      "교육 자료",
      "테스트 결과 보고서",
    ],
  },
  {
    week: "WEEK 04",
    title: "정식 오픈 & 안정화",
    activities: [
      "전체 시스템 정식 가동",
      "실시간 모니터링 및 이슈 대응",
      "최종 사용자 지원 및 Q&A",
      "시스템 최적화 및 성능 튜닝",
    ],
    deliverables: [
      "시스템 오픈 완료 보고서",
      "운영 매뉴얼",
      "지속 지원 계획서",
    ],
  },
];

// ─── Pricing Plans ───
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "스타터 (Starter)",
    target: "소규모 의원 및 개인 병원",
    setupCost: 4500000,
    monthlyOpex: 300000,
    features: [
      "기본 재고 관리 기능",
      "세금계산서 자동 발행",
      "모바일 앱 제공",
      "품목 수 제한: 최대 500개",
      "사용자 계정: 최대 5명",
      "기본 리포트 제공",
      "이메일 고객 지원",
    ],
  },
  {
    name: "프로페셔널 (Pro)",
    target: "중소 규모 병원 및 의료기관",
    setupCost: 8500000,
    monthlyOpex: 600000,
    features: [
      "스타터 플랜 모든 기능 포함",
      "공급업체 협업 포털",
      "AI 발주량 예측",
      "ERP/회계 시스템 연동",
      "품목 수 무제한",
      "사용자 계정: 최대 20명",
      "고급 분석 리포트",
      "전화 및 원격 지원",
    ],
    isRecommended: true,
  },
  {
    name: "엔터프라이즈 (Enterprise)",
    target: "대형 종합병원 및 다지점 운영",
    setupCost: 0, // 별도 협의
    monthlyOpex: 0, // 별도 협의
    features: [
      "프로 플랜 모든 기능 포함",
      "다지점 통합 관리",
      "맞춤형 워크플로우 설계",
      "HIS 시스템 완전 통합",
      "전담 계정 매니저 배정",
      "온프레미스 구축 옵션",
      "사용자 수 무제한",
      "24/7 전담 지원",
    ],
  },
];

// ─── Add-on Services ───
export const ADD_ON_SERVICES: AddOnService[] = [
  {
    name: "바코드 장비 패키지",
    description: [
      "바코드 스캐너 (무선/유선)",
      "바코드 라벨 프린터",
      "라벨 용지 (1,000매)",
    ],
    price: "1,500,000원~",
  },
  {
    name: "온사이트 교육",
    description: [
      "직접 방문하여 직원 교육 진행",
      "1일 8시간 기준",
      "최대 20명까지",
    ],
    price: "500,000원/1일",
  },
  {
    name: "맞춤형 기능 개발",
    description: [
      "병원 특성에 맞는 추가 기능",
      "특수 리포트 개발",
      "외부 시스템 연동",
    ],
    price: "별도 협의",
  },
];

// ─── Quantitative Benefits ───
export const QUANTITATIVE_BENEFITS: QuantitativeBenefit[] = [
  {
    title: "업무 효율 75% 향상",
    before: "재고 관리 및 정산 업무에 하루 3시간 소요",
    after: "자동화로 45분으로 단축",
    impact: "담당자 1명당 연간 약 900시간 절약",
  },
  {
    title: "재고 관련 비용 30% 절감",
    before: "과잉 재고 및 긴급 발주로 연간 1억원 낭비",
    after: "적정 재고 유지로 연간 3,000만원 절감",
    impact: "약 1년 만에 투자 비용 회수",
  },
  {
    title: "세금계산서 처리 속도 80% 개선",
    before: "월말 정산 시 2일 소요 (야근 포함)",
    after: "자동 발행으로 2시간 완료",
    impact: "정산 업무 부담 대폭 감소",
  },
];

// ─── Qualitative Benefits ───
export const QUALITATIVE_BENEFITS: QualitativeBenefit[] = [
  {
    title: "재고 부족 사고 예방",
    benefits: [
      "실시간 알림으로 필수 의료 물품 결품 방지",
      "환자 진료 차질 최소화",
      "병원 신뢰도 향상",
    ],
  },
  {
    title: "투명한 재무 관리",
    benefits: [
      "모든 거래 내역의 추적 및 감사 가능",
      "부정 사용 및 횡령 방지",
      "내부 통제 강화",
    ],
  },
  {
    title: "공급업체와의 협업 강화",
    benefits: [
      "실시간 정보 공유로 원활한 소통",
      "납품 지연 및 오류 감소",
      "장기 거래 파트너십 구축",
    ],
  },
  {
    title: "데이터 기반 경영 의사결정",
    benefits: [
      "재고 데이터를 활용한 전략적 의사결정",
      "예산 계획 수립의 정확성 향상",
      "병원 경영 효율화",
    ],
  },
];

// ─── Hospital Profile ───
export const HOSPITAL_PROFILE: HospitalProfile = {
  name: "정동병원",
  location: "서울 동작구 상도동",
  specialization: "보건복지부 인증 관절·척추 특화 종합병원",
  beds: "약 70~100병상",
  departments: "정형외과, 신경외과, 내과",
  specialized: "관절·척추 수술 전문",
  additionalServices: "검진센터, 재활치료센터 운영",
};

// ─── Hospital ROI ───
export const HOSPITAL_ROI = {
  setupCost: 8500000,
  annualOpex: 7200000,
  firstYearTotal: 15700000,
  annualSaving: 30000000,
  netBenefit: 14300000,
  roi: 91,
  details: [
    { label: "재고 관리 시간", before: "하루 3시간", after: "45분", percent: 75 },
    { label: "세금계산서 처리", before: "월말 2일", after: "2시간", percent: 80 },
    { label: "연간 비용 절감", amount: "약 3,000만원" },
  ],
};

// ─── Price Helpers ───
export function formatKRW(amount: number): string {
  if (amount === 0) return "별도 협의";
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}

export function formatMonthlyKRW(amount: number): string {
  if (amount === 0) return "별도 협의";
  return `월 ${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}
