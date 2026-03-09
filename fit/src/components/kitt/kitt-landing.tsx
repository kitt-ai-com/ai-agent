"use client";

import React, { useState } from "react";
import {
  Search,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Layers,
  AlertCircle,
  TrendingDown,
  Clock,
  ExternalLink,
  Activity,
  PieChart,
  FileText,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "감지",
    subtitle: "Detection",
    description: "실시간 재고 부족 모니터링",
    detail:
      "병동 및 창고의 소모품 수준을 24시간 실시간으로 감시하여 재고 부족 징후를 즉각 포착합니다.",
    icon: <Search className="w-8 h-8 text-blue-500" />,
    color: "border-blue-500",
  },
  {
    id: "02",
    title: "분석",
    subtitle: "Analysis",
    description: "AI 최적 발주량 자동 산출",
    detail:
      "과거 소모 패턴과 수술 일정을 결합하여 과잉 재고 없는 '최적의 주문량'을 AI가 계산합니다.",
    icon: <BrainCircuit className="w-8 h-8 text-indigo-500" />,
    color: "border-indigo-500",
  },
  {
    id: "03",
    title: "승인",
    subtitle: "Approval",
    description: "스마트 거버넌스 승인 절차",
    detail:
      "설정된 예산과 규정에 따라 불필요한 절차를 생략하고 자동 또는 원클릭 승인 프로세스를 진행합니다.",
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    color: "border-emerald-500",
  },
  {
    id: "04",
    title: "완료",
    subtitle: "Completion",
    description: "자동 입고 및 정산 자동화",
    detail:
      "물류 도착 시 시스템에 자동 반영되며, 복잡한 증빙 서류 없이 ERP와 연동되어 정산이 마무리됩니다.",
    icon: <CheckCircle2 className="w-8 h-8 text-slate-700" />,
    color: "border-slate-700",
  },
];

export default function KittLanding() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Kitt Medi AI Solutions{" "}
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            {["Overview", "Challenges", "Workflow", "Performance"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`hover:text-blue-600 transition-colors ${activeTab === tab.toLowerCase() ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all">
            Contact Sales
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === "overview" && (
          <div className="space-y-20 animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
                  Next-Gen GPO SaaS
                </div>
                <h1 className="text-5xl font-black leading-tight text-slate-900">
                  AI 기반 병원 소모품
                  <br />
                  <span className="text-blue-600">통합 관리 플랫폼</span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                  데이터와 자동화로 연결되는 스마트 의료 물류의 미래.
                  <br />
                  불투명한 유통 구조를 혁신하고 병원의 운영 효율성을
                  극대화합니다.
                </p>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab("workflow")}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center"
                  >
                    플랫폼 시작하기{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-[2rem] -z-10 blur-2xl opacity-60"></div>
                <img
                  src="https://multipurposethemes.com/wp-content/uploads/2021/07/Screen-Shot-2021-07-03-at-13.10.22.png"
                  alt="Dashboard Preview"
                  className="rounded-2xl shadow-2xl border border-slate-200 w-full object-cover h-[400px]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/800x600?text=Rhythm+Admin+Dashboard";
                  }}
                />
              </div>
            </section>

            {/* Core Features */}
            <section className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "수요 예측",
                  icon: <BrainCircuit />,
                  desc: "AI 기반 과거 소모 패턴 분석 및 수술 일정 연동 최적 발주량 산출",
                },
                {
                  title: "스마트 승인",
                  icon: <ShieldCheck />,
                  desc: "품목/금액별 자동 승인 워크플로우로 구매 통제력 및 속도 강화",
                },
                {
                  title: "통합 트래킹",
                  icon: <Layers />,
                  desc: "발주부터 입고까지 전 과정을 실시간 알림톡으로 확인하는 물류 투명성",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}

        {activeTab === "challenges" && (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            {/* Market Challenges */}
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Current Market Challenges
              </h2>
              <p className="text-slate-500">
                기존 간납사(GPO) 모델의 고질적인 불투명성과 비효율성을
                해결합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3 mb-4 text-red-600 font-bold">
                  <AlertCircle /> 관리의 비효율성
                </div>
                <p className="text-slate-700">
                  수기 데이터 입력과 아날로그 방식의 재고 관리로 인해 발생하는
                  인적 오류 및 행정력 낭비가 심각합니다.
                </p>
              </div>
              <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3 mb-4 text-red-600 font-bold">
                  <AlertCircle /> 불투명한 유통 구조
                </div>
                <p className="text-slate-700">
                  특수관계자 거래 논란 및 폐쇄적인 단가 결정 과정으로 인한
                  신뢰도 저하와 비용 증가를 야기합니다.
                </p>
              </div>
            </div>

            {/* Legacy vs AI Comparison */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-bold text-slate-400 text-xs uppercase tracking-wider">
                      구분
                    </th>
                    <th className="p-4 font-bold text-slate-900">
                      전통적 간납사 모델
                    </th>
                    <th className="p-4 font-bold text-blue-600 bg-blue-50/50 text-center">
                      AI 통합 관리 플랫폼
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr>
                    <td className="p-4 font-semibold bg-slate-50/30 text-slate-500">
                      데이터 관리
                    </td>
                    <td className="p-4">수기 및 엑셀 (오류 발생 높음)</td>
                    <td className="p-4 text-center font-medium">
                      실시간 클라우드 자동 동기화
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold bg-slate-50/30 text-slate-500">
                      발주 방식
                    </td>
                    <td className="p-4">전화/팩스 등 수동 발주</td>
                    <td className="p-4 text-center font-medium">
                      AI 수요 예측 기반 자동 발주
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold bg-slate-50/30 text-slate-500">
                      정산/증빙
                    </td>
                    <td className="p-4">수동 대조 및 종이 명세서</td>
                    <td className="p-4 text-center font-medium">
                      ERP 연동 자동 세금계산서 발행
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "workflow" && (
          <div className="animate-in fade-in duration-500">
            {/* Workflow Section */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
                <Zap className="w-4 h-4 mr-2" /> NEXT-GEN AUTOMATION
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                5단계 자동화 워크플로우
              </h1>
              <p className="text-slate-500 text-lg">
                데이터 수집부터 정산까지, 모든 과정이 단절 없이 연결됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-12"></div>
              {steps.map((step, index) => (
                <div key={step.id} className="group">
                  <div
                    className={`bg-white h-full rounded-2xl p-6 shadow-sm border-t-4 ${step.color} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative`}
                  >
                    <div className="absolute -top-4 left-6 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg">
                      STEP {step.id}
                    </div>
                    <div className="mb-6 mt-2 flex items-center justify-center w-16 h-16 rounded-xl bg-slate-50 group-hover:bg-white transition-colors duration-300">
                      {step.icon}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-800">
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {step.subtitle}
                        </span>
                      </div>
                      <p className="text-blue-600 font-semibold text-sm leading-snug">
                        {step.description}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed pt-2 border-t border-slate-100">
                        {step.detail}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md border border-slate-100">
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Workflow detail */}
            <div className="mt-16 bg-white rounded-2xl p-10 border border-slate-100 flex flex-col md:flex-row items-center gap-10 shadow-sm">
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  데이터 기반의 수요 예측 엔진
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  병원의 수술 일정과 과거 소모 데이터를 결합하여 AI가 스스로
                  &apos;적정 재고&apos;를 학습합니다.
                  <br />
                  과잉 재고로 인한 비용을 줄이고, 긴급 상황에서도 소모품이
                  바닥나지 않도록 365일 실시간 감시합니다.
                </p>
                <div className="flex gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <CheckCircle2 className="w-4 h-4" /> 365일 실시간 감시
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> 과잉 재고 0%
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full overflow-hidden rounded-xl border border-slate-100 shadow-inner">
                <img
                  src="https://cambridge-intelligence.com/wp-content/uploads/2024/05/Olive_Chain_700x350-scaled.jpg"
                  alt="Network analysis"
                  className="w-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/600x300?text=AI+Supply+Chain+Analysis";
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            {/* Performance Analysis */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">비즈니스 성과 분석</h2>
              <p className="text-slate-500">
                운영 탁월성 극대화 및 직접적인 수익성 개선 결과를 확인하세요.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Efficiency Comparison */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-lg font-bold mb-8 flex items-center gap-2 text-slate-500 uppercase tracking-tighter">
                  <Clock className="w-4 h-4" /> 주간 행정 업무 소요 시간
                </h4>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Legacy GPO (수기)</span>
                      <span className="text-red-500">40 Hours</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 w-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>MediSolve AI Platform</span>
                      <span className="text-blue-600">4 Hours</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[10%] animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 p-4 bg-blue-50 rounded-xl text-blue-700 text-center font-bold">
                  행정 업무 시간 약 90% 절감 가능
                </div>
              </div>

              {/* Economic Outcome */}
              <div className="flex flex-col gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white">
                  <TrendingDown className="w-12 h-12 mb-4 opacity-50" />
                  <div className="text-5xl font-black mb-2">20%</div>
                  <div className="text-xl font-bold mb-2">
                    재고 유지비용 절감
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    정확한 수요 예측을 통해 불필요한 과잉 재고를 없애고 폐기
                    소모품을 최소화하여 병원의 이익률을 높입니다.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">
                      Error Rate
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      0.0%
                    </div>
                    <div className="text-emerald-500 text-xs font-medium">
                      인적 오류 완전 차단
                    </div>
                  </div>
                  <PieChart className="w-12 h-12 text-slate-100" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">The Future of Logistics</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              환자의 건강을 위한 스마트한 뒷받침, 그 시작은 투명한
              데이터입니다.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-sm pt-8 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />{" "}
              contact@kitt.ai.kr
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-slate-500" />{" "}
              www.kitt.ai.kr
            </div>
          </div>
          <div className="pt-8 text-xs text-slate-600">
            &copy; 2026 kitt AI Solutions. AI 기반 병원 소모품 통합 관리 플랫폼.
            kitt All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
