"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Download,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Package,
  FileText,
  BrainCircuit,
  Users,
  Shield,
  Cloud,
  Database,
  Building2,
  Smartphone,
  TrendingUp,
  Menu,
  X,
  Zap,
  Receipt,
  Bell,
  BarChart3,
  Clock,
  Mail,
  CheckSquare,
  ArrowRight,
  Phone,
} from "lucide-react";
import {
  NAV_LINKS,
  HERO_STATS,
  PROBLEMS,
  SOLUTION_INDICATORS,
  FEATURES,
  DIFFERENTIATION,
  IMPLEMENTATION_PROCESS,
  PRICING_PLANS,
  ADD_ON_SERVICES,
  QUANTITATIVE_BENEFITS,
  QUALITATIVE_BENEFITS,
  HOSPITAL_PROFILE,
  HOSPITAL_ROI,
  formatKRW,
  formatMonthlyKRW,
} from "./proposal-data";

// ─── Icon mapping for features ───
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "통합 재고 관리": <Package className="w-6 h-6" />,
  "세금계산서 자동화": <FileText className="w-6 h-6" />,
  "공급업체 협업 포털": <Users className="w-6 h-6" />,
  "AI 분석 & 예측": <BrainCircuit className="w-6 h-6" />,
};

export default function HospitalProposalPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedPlan, setSelectedPlan] = useState(1); // Pro plan by default

  // ─── Scroll Spy: Track active section on scroll ───
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      NAV_LINKS.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // ─── PDF Download ───
  const handleDownloadPdf = useCallback(() => {
    window.print();
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* ══════════════════════════════════════════════
          Section 1: Sticky Navigation
          ══════════════════════════════════════════════ */}
      <nav className="proposal-nav sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">병원 재고관리 제안서</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`transition-colors pb-1 ${
                  activeSection === link.id
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              className="proposal-no-print bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">PDF 다운로드</span>
            </button>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div>
        {/* ══════════════════════════════════════════════
            Section 2: Hero
            ══════════════════════════════════════════════ */}
        <section
          id="hero"
          className="proposal-section bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white"
        >
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center px-4 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-sm font-bold backdrop-blur-sm">
                <Zap className="w-4 h-4 mr-2" /> Hospital Inventory Management System
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                정동병원
                <br />
                <span className="text-teal-300">재고관리 & 세금계산서 자동화</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                실시간 재고 파악부터 세금계산서 자동 발행까지
                <br />
                병원 재고관리의 완전한 디지털 전환을 제안합니다.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={handleDownloadPdf}
                  className="proposal-no-print bg-teal-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-teal-900/30 hover:bg-teal-400 transition-all flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  제안서 PDF 다운로드
                </button>
                <button
                  onClick={() => scrollTo("pricing")}
                  className="proposal-no-print border border-blue-300 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center"
                >
                  상세 견적 보기 <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-teal-200">{stat.label}</div>
                  <div className="text-xs text-blue-200 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 3: Problems
            ══════════════════════════════════════════════ */}
        <section id="problems" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" /> 현황 분석
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                병원 재고관리의 주요 문제점
              </h2>
              <p className="text-slate-500 text-lg">
                수작업 중심의 프로세스로 인한 시간 낭비와 재고 사고가 발생하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROBLEMS.map((problem) => (
                <div
                  key={problem.area}
                  className={`bg-white p-6 rounded-2xl border-l-4 shadow-sm hover:shadow-md transition-shadow ${
                    problem.severity === "critical"
                      ? "border-l-red-500"
                      : "border-l-amber-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-slate-900">{problem.area}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        problem.severity === "critical"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {problem.severity === "critical" ? "긴급" : "주의"}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {problem.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-400" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 4: Solution
            ══════════════════════════════════════════════ */}
        <section id="solution" className="proposal-section py-20 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
                <CheckCircle2 className="w-4 h-4 mr-2" /> 솔루션 개요
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                kitt INVENTORY MEDICAL
              </h2>
              <p className="text-slate-600 text-lg">
                클라우드 기반 병원 전용 재고관리 & 세금계산서 자동화 플랫폼
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SOLUTION_INDICATORS.map((indicator, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-black text-blue-600">{indicator.metric}</div>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900">{indicator.title}</h3>
                  <ul className="space-y-2">
                    {indicator.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 5: Features
            ══════════════════════════════════════════════ */}
        <section id="features" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-bold mb-4">
                <Package className="w-4 h-4 mr-2" /> 핵심 기능
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                4가지 핵심 모듈
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                      {FEATURE_ICONS[feature.title] || <Package className="w-6 h-6" />}
                    </div>
                    <h3 className="font-bold text-xl text-slate-900">{feature.title}</h3>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-slate-500 mb-2">주요 기능</h4>
                    <ul className="space-y-2">
                      {feature.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start text-sm text-slate-700">
                          <CheckSquare className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-slate-500 mb-2">특징</h4>
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start text-sm text-slate-600">
                          <ChevronRight className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-teal-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 6: Differentiation
            ══════════════════════════════════════════════ */}
        <section id="differentiation" className="proposal-section py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
                <Shield className="w-4 h-4 mr-2" /> 차별화
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                차별화된 시스템 구조
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DIFFERENTIATION.map((diff, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                    {idx === 0 && <Cloud className="w-7 h-7 text-white" />}
                    {idx === 1 && <Database className="w-7 h-7 text-white" />}
                    {idx === 2 && <Shield className="w-7 h-7 text-white" />}
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-slate-900">{diff.title}</h3>
                  <ul className="space-y-3">
                    {diff.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 7: Process
            ══════════════════════════════════════════════ */}
        <section id="process" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-bold mb-4">
                <Clock className="w-4 h-4 mr-2" /> 도입 프로세스
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                4주 완성 프로세스
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {IMPLEMENTATION_PROCESS.map((week, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-2xl border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-blue-600">{week.week}</div>
                      <div className="font-bold text-slate-900">{week.title}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-500 mb-2">주요 활동</h4>
                    <ul className="space-y-1">
                      {week.activities.map((activity, aIdx) => (
                        <li key={aIdx} className="text-xs text-slate-600 flex items-start">
                          <span className="mr-1">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 mb-2">산출물</h4>
                    <ul className="space-y-1">
                      {week.deliverables.map((deliverable, dIdx) => (
                        <li key={dIdx} className="text-xs text-slate-600 flex items-start">
                          <CheckCircle2 className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0 text-green-500" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 8: Pricing
            ══════════════════════════════════════════════ */}
        <section id="pricing" className="proposal-section py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold mb-4">
                <Receipt className="w-4 h-4 mr-2" /> 비용 안내
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                가격 플랜
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {PRICING_PLANS.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-8 transition-all ${
                    plan.isRecommended
                      ? "bg-white text-slate-900 ring-4 ring-teal-400 scale-105"
                      : "bg-white/10 backdrop-blur-sm border border-white/20"
                  }`}
                >
                  {plan.isRecommended && (
                    <div className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full mb-4">
                      ⭐ 추천
                    </div>
                  )}
                  <h3 className={`text-2xl font-black mb-2 ${plan.isRecommended ? "text-slate-900" : "text-white"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.isRecommended ? "text-slate-600" : "text-blue-200"}`}>
                    {plan.target}
                  </p>

                  <div className="mb-6">
                    <div className={`text-3xl font-black mb-1 ${plan.isRecommended ? "text-blue-600" : "text-white"}`}>
                      {formatKRW(plan.setupCost)}
                    </div>
                    <div className={`text-sm ${plan.isRecommended ? "text-slate-500" : "text-blue-200"}`}>
                      구축비 (VAT 별도)
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className={`text-xl font-bold ${plan.isRecommended ? "text-slate-700" : "text-teal-300"}`}>
                      {formatMonthlyKRW(plan.monthlyOpex)}
                    </div>
                    <div className={`text-sm ${plan.isRecommended ? "text-slate-500" : "text-blue-200"}`}>
                      월 운영료 (VAT 별도)
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm">
                        <CheckCircle2 className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.isRecommended ? "text-green-600" : "text-teal-300"}`} />
                        <span className={plan.isRecommended ? "text-slate-700" : "text-blue-100"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Add-on Services */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">추가 옵션 서비스</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ADD_ON_SERVICES.map((service, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <h4 className="font-bold text-lg mb-3 text-white">{service.name}</h4>
                    <ul className="space-y-2 mb-4">
                      {service.description.map((desc, dIdx) => (
                        <li key={dIdx} className="text-sm text-blue-200 flex items-start">
                          <ChevronRight className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-teal-300 font-bold">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 9: Results
            ══════════════════════════════════════════════ */}
        <section id="results" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
                <TrendingUp className="w-4 h-4 mr-2" /> 기대 효과
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                도입 후 기대 효과
              </h2>
            </div>

            {/* Quantitative Benefits */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">정량적 효과</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {QUANTITATIVE_BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg mb-4 text-slate-900">{benefit.title}</h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">현재</div>
                        <div className="text-sm text-slate-700">{benefit.before}</div>
                      </div>
                      <div className="text-center">
                        <ArrowRight className="w-5 h-5 mx-auto text-blue-600" />
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">도입 후</div>
                        <div className="text-sm font-semibold text-green-600">{benefit.after}</div>
                      </div>
                      <div className="bg-blue-600 text-white rounded-lg p-3 text-center">
                        <div className="text-xs mb-1">효과</div>
                        <div className="text-sm font-bold">{benefit.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Benefits */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">정성적 효과</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {QUALITATIVE_BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg mb-3 text-slate-900">{benefit.title}</h4>
                    <ul className="space-y-2">
                      {benefit.benefits.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospital Profile & ROI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hospital Profile */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">{HOSPITAL_PROFILE.name}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-blue-200 mb-1">위치</div>
                    <div className="font-semibold">{HOSPITAL_PROFILE.location}</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 mb-1">특성</div>
                    <div className="font-semibold">{HOSPITAL_PROFILE.specialization}</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 mb-1">병상 수</div>
                    <div className="font-semibold">{HOSPITAL_PROFILE.beds}</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 mb-1">주요 진료과</div>
                    <div className="font-semibold">{HOSPITAL_PROFILE.departments}</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 mb-1">특화 분야</div>
                    <div className="font-semibold">{HOSPITAL_PROFILE.specialized}</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 mb-1">부가 서비스</div>
                    <div className="font-semibold">{HOSPITAL_PROFILE.additionalServices}</div>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">투자 수익 분석 (ROI)</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-xs text-green-200 mb-1">초기 투자</div>
                    <div className="text-2xl font-black">{formatKRW(HOSPITAL_ROI.setupCost)}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-xs text-green-200 mb-1">연간 운영료</div>
                    <div className="text-2xl font-black">{formatKRW(HOSPITAL_ROI.annualOpex)}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-xs text-green-200 mb-1">연간 절감 효과</div>
                    <div className="text-2xl font-black">{formatKRW(HOSPITAL_ROI.annualSaving)}</div>
                  </div>
                  <div className="bg-green-500 rounded-lg p-4 text-center">
                    <div className="text-xs mb-1">1년차 ROI</div>
                    <div className="text-4xl font-black">{HOSPITAL_ROI.roi}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Footer / Contact
            ══════════════════════════════════════════════ */}
        <footer className="proposal-section py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">문의하기</h3>
              <p className="text-slate-400">궁금하신 사항은 언제든지 연락주세요</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>inventory@kitt.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>02-1234-5678</span>
              </div>
            </div>
            <div className="text-center mt-8 text-xs text-slate-500">
              © 2026 kitt AI Intelligence. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
