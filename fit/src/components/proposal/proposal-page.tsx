"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Truck,
  Download,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Database,
  Server,
  Cloud,
  Monitor,
  Package,
  ClipboardList,
  FileText,
  Calculator,
  MapPin,
  BrainCircuit,
  Smartphone,
  Receipt,
  Users,
  Shield,
  Clock,
  TrendingUp,
  ArrowRight,
  Menu,
  X,
  Layers,
  Zap,
  Target,
  BarChart3,
  CircleDot,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import {
  NAV_LINKS,
  HERO_STATS,
  PAIN_POINTS,
  MONTHLY_LOSS,
  TECH_STACK,
  PHASE1_MODULES,
  PHASE2_MODULES,
  COMMON_MODULE,
  MILESTONES,
  ROI,
  PAYMENT_TERMS,
  TEAM,
  TEAM_ADVANTAGES,
  MAINTENANCE_FREE_PERIOD,
  MAINTENANCE_TIERS,
  ADDITIONAL_COSTS,
  formatKRW,
  formatManWon,
  PHASE1_TOTAL,
  PHASE1_VAT_INCLUDED,
} from "./proposal-data";

// ─── Icon mapping for tech categories ───
const TECH_ICONS: Record<string, React.ReactNode> = {
  Frontend: <Monitor className="w-5 h-5" />,
  Backend: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Infrastructure: <Cloud className="w-5 h-5" />,
};

// ─── Icon mapping for modules ───
const MODULE_ICONS: Record<string, React.ReactNode> = {
  "user-crm": <Users className="w-6 h-6" />,
  "file-upload": <Package className="w-6 h-6" />,
  "ai-chatbot": <BrainCircuit className="w-6 h-6" />,
  "platform-integration": <Layers className="w-6 h-6" />,
  dashboard: <BarChart3 className="w-6 h-6" />,
  "auto-quotation": <FileText className="w-6 h-6" />,
  "product-sales": <ClipboardList className="w-6 h-6" />,
  "ai-navigation": <MapPin className="w-6 h-6" />,
  "vehicle-db": <Truck className="w-6 h-6" />,
  "mobile-app": <Smartphone className="w-6 h-6" />,
};

export default function ProposalPage() {
  const [activePhase, setActivePhase] = useState<1 | 2>(1);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // ─── Scroll Spy: Track active section on scroll ───
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Activate when section is 20% from top
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

    // Observe all sections
    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      NAV_LINKS.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // ─── PDF Download (브라우저 Print → PDF 저장) ───
  const handleDownloadPdf = useCallback(() => {
    window.print();
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const currentModules = activePhase === 1 ? PHASE1_MODULES : PHASE2_MODULES;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* ══════════════════════════════════════════════
          Section 1: Sticky Navigation
          ══════════════════════════════════════════════ */}
      <nav className="proposal-nav sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">대건종합특송 제안서</span>
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

            {/* Mobile menu button */}
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
          className="proposal-section bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white"
        >
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold backdrop-blur-sm">
                <Zap className="w-4 h-4 mr-2" /> Transportation Management System
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                대건종합특송
                <br />
                <span className="text-blue-400">스마트 배차 관리 시스템</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                4개 화물 플랫폼을 하나로 통합하고, AI 챗봇과 자동 견적서 발행으로
                <br />
                대형차 배차 업무를 완전 자동화합니다.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={handleDownloadPdf}
                  className="proposal-no-print bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/30 hover:bg-blue-500 transition-all flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  제안서 PDF 다운로드
                </button>
                <button
                  onClick={() => scrollTo("pricing")}
                  className="proposal-no-print border border-slate-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center"
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
                  <div className="text-sm font-semibold text-blue-300">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 3: 현황 분석 (Business Analysis)
            ══════════════════════════════════════════════ */}
        <section id="analysis" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" /> 현황 분석
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                현재 업무 환경의 구조적 문제
              </h2>
              <p className="text-slate-500 text-lg">
                데이터 파편화와 수기 프로세스로 인한 월 750~1,600만 원의 손실이 발생하고 있습니다.
              </p>
            </div>

            {/* Pain Point Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {PAIN_POINTS.map((point) => (
                <div
                  key={point.area}
                  className={`bg-white p-6 rounded-2xl border-l-4 shadow-sm hover:shadow-md transition-shadow ${
                    point.severity === "critical"
                      ? "border-l-red-500"
                      : "border-l-amber-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-slate-900">{point.area}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        point.severity === "critical"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {point.severity === "critical" ? "심각" : "주의"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">현재: {point.current}</p>
                  <p className="text-sm text-slate-600 mb-3">{point.problem}</p>
                  <div className="text-sm font-semibold text-red-600">
                    손실: {point.loss}
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Loss Summary */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-xl font-bold text-red-800 mb-4">
                월간 추정 손실 요약
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {MONTHLY_LOSS.items.map((item) => (
                  <div key={item.label} className="bg-white/80 rounded-xl p-4">
                    <div className="text-sm text-slate-600 mb-1">{item.label}</div>
                    <div className="font-bold text-red-700">{item.amount}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 text-2xl font-black text-red-700">
                <Target className="w-6 h-6" />
                월 합계: {MONTHLY_LOSS.min}~{MONTHLY_LOSS.max}
                {MONTHLY_LOSS.unit}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 4: 기술 스택 & 아키텍처
            ══════════════════════════════════════════════ */}
        <section id="tech" className="proposal-section py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                <Layers className="w-4 h-4 mr-2" /> Technology Stack
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                검증된 기술 스택
              </h2>
              <p className="text-slate-500 text-lg">
                확장 가능하고 유지보수성 높은 모던 웹 기술로 구축합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TECH_STACK.map((cat) => (
                <div
                  key={cat.category}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    {TECH_ICONS[cat.category]}
                  </div>
                  <h3 className="text-lg font-bold mb-4">{cat.category}</h3>
                  <div className="space-y-3">
                    {cat.items.map((item) => (
                      <div key={item.name}>
                        <div className="font-semibold text-sm text-slate-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 5: Phase 로드맵 (1차 / 2차 비교)
            ══════════════════════════════════════════════ */}
        <section id="roadmap" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                2단계 접근 전략
              </h2>
              <p className="text-slate-500 text-lg">
                리스크를 최소화하면서 확실한 ROI를 보장하는 단계별 구축 전략
              </p>
            </div>

            {/* Phase Toggle */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setActivePhase(1)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                    activePhase === 1
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  1차 사업 — 데이터 정립 & 디지털화
                </button>
                <button
                  onClick={() => setActivePhase(2)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                    activePhase === 2
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  2차 사업 — AI 배차 & 관제 고도화
                </button>
              </div>
            </div>

            {/* Phase Summary */}
            <div
              className={`rounded-2xl p-8 mb-8 ${
                activePhase === 1
                  ? "bg-blue-50 border border-blue-100"
                  : "bg-emerald-50 border border-emerald-100"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {activePhase === 1
                      ? "1차 사업: 데이터 정립 & 핵심 프로세스 디지털화"
                      : "2차 사업: AI 배차 & 지능형 관제 고도화"}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {activePhase === 1
                      ? "표준화 · 자동화 · 신뢰성 — DX를 위한 Stable Base 구축"
                      : "지능화 · 가시성 · 최적화 — 데이터 기반 Smart 물류 플랫폼 완성"}
                  </p>
                </div>
              </div>
            </div>

            {/* Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentModules.map((mod) => (
                <div
                  key={mod.id}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activePhase === 1
                          ? "bg-blue-50 text-blue-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {MODULE_ICONS[mod.id]}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{mod.name}</h3>
                  <ul className="space-y-2">
                    {mod.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            activePhase === 1 ? "text-blue-500" : "text-emerald-500"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Common Module (Phase 1 only) */}
            {activePhase === 1 && (
              <div className="mt-6 bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">{COMMON_MODULE.name}</h3>
                  <span className="text-lg font-black text-slate-600">
                    {formatManWon(COMMON_MODULE.price)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {COMMON_MODULE.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 6: 기능 상세 (Feature Details)
            ══════════════════════════════════════════════ */}
        <section id="features" className="proposal-section py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                <Package className="w-4 h-4 mr-2" /> Feature Details
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                핵심 기능 상세
              </h2>
              <p className="text-slate-500 text-lg">
                1차 사업 4개 모듈 + 2차 사업 4개 모듈의 주요 기능을 확인하세요.
              </p>
            </div>

            {/* Phase 1 Features */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                1차 사업 모듈
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PHASE1_MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        {MODULE_ICONS[mod.id]}
                      </div>
                      <h4 className="font-bold">{mod.name}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {mod.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <ChevronRight className="w-3 h-3 text-blue-400 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2 Features */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                2차 사업 모듈
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PHASE2_MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        {MODULE_ICONS[mod.id]}
                      </div>
                      <h4 className="font-bold">{mod.name}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {mod.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <ChevronRight className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 7: 프로젝트 타임라인 (Interactive Stepper)
            ══════════════════════════════════════════════ */}
        <section id="timeline" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                <Clock className="w-4 h-4 mr-2" /> Project Timeline
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                3개월 프로젝트 타임라인
              </h2>
              <p className="text-slate-500 text-lg">
                8개 마일스톤으로 구성된 체계적인 프로젝트 수행 계획
              </p>
            </div>

            {/* Horizontal Stepper */}
            <div className="mb-12 overflow-x-auto pb-4">
              <div className="flex items-center min-w-[800px] px-4">
                {MILESTONES.map((ms, idx) => (
                  <React.Fragment key={ms.id}>
                    <button
                      onClick={() => setActiveMilestone(idx)}
                      className={`flex-shrink-0 flex flex-col items-center group cursor-pointer`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          idx === activeMilestone
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110"
                            : idx < activeMilestone
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                        }`}
                      >
                        {ms.id}
                      </div>
                      <span
                        className={`mt-2 text-xs font-semibold whitespace-nowrap ${
                          idx === activeMilestone ? "text-blue-600" : "text-slate-400"
                        }`}
                      >
                        {ms.week}
                      </span>
                    </button>
                    {idx < MILESTONES.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          idx < activeMilestone ? "bg-blue-300" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Active Milestone Detail */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {MILESTONES[activeMilestone].id}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {MILESTONES[activeMilestone].title}
                  </h3>
                  <span className="text-sm text-blue-600 font-semibold">
                    {MILESTONES[activeMilestone].week}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MILESTONES[activeMilestone].tasks.map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gantt-like Bar */}
            <div className="mt-8 space-y-2">
              <div className="text-sm font-bold text-slate-500 mb-3">
                12주 간트차트 개요
              </div>
              {MILESTONES.map((ms, idx) => {
                const TOTAL_WEEKS = 12;
                const starts = [0, 1, 2, 4, 5, 7, 8, 10];
                const ends = [2, 3, 5, 6, 8, 9, 11, 12];
                const weekStart = starts[idx] ?? idx;
                const weekEnd = ends[idx] ?? Math.min(idx + 2, TOTAL_WEEKS);
                const left = (weekStart / TOTAL_WEEKS) * 100;
                const width = ((weekEnd - weekStart) / TOTAL_WEEKS) * 100;
                return (
                  <div key={ms.id} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 w-8">
                      {ms.id}
                    </span>
                    <div className="flex-1 h-6 bg-slate-100 rounded-full relative overflow-hidden">
                      <div
                        className={`absolute top-0 h-full rounded-full transition-all cursor-pointer ${
                          idx === activeMilestone
                            ? "bg-blue-600"
                            : "bg-blue-200 hover:bg-blue-300"
                        }`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        onClick={() => setActiveMilestone(idx)}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white truncate px-1">
                          {ms.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 pl-11">
                {Array.from({ length: 13 }, (_, i) => (
                  <span key={i}>{i}W</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 8: 견적 (Pricing)
            ══════════════════════════════════════════════ */}
        <section id="pricing" className="proposal-section py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                <BarChart3 className="w-4 h-4 mr-2" /> Pricing & ROI
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                투자 견적 & 기대 효과
              </h2>
              <p className="text-slate-500 text-lg">
                명확한 견적과 검증된 ROI로 투자 가치를 확인하세요.
              </p>
            </div>

            {/* 견적 테이블 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">No.</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">항목</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">주요 기능</th>
                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">금액</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PHASE1_MODULES.map((mod, idx) => (
                    <tr key={mod.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-5 text-sm font-bold text-slate-400">{idx + 1}</td>
                      <td className="px-6 py-5 font-bold text-sm">{mod.name}</td>
                      <td className="px-6 py-5 hidden md:table-cell">
                        <ul className="space-y-1">
                          {mod.features.map((f) => (
                            <li key={f} className="flex items-center gap-1.5 text-xs text-slate-500">
                              <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-sm whitespace-nowrap">{formatManWon(mod.price)}</td>
                    </tr>
                  ))}
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-5 text-sm font-bold text-slate-400">5</td>
                    <td className="px-6 py-5 font-bold text-sm">{COMMON_MODULE.name}</td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <ul className="space-y-1">
                        {COMMON_MODULE.items.map((item) => (
                          <li key={item} className="flex items-center gap-1.5 text-xs text-slate-500">
                            <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-sm whitespace-nowrap">{formatManWon(COMMON_MODULE.price)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                    <td colSpan={3} className="px-6 py-4 text-right font-bold text-sm">개발비 합계</td>
                    <td className="px-6 py-4 text-right font-black text-lg">₩{formatKRW(PHASE1_TOTAL)}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td colSpan={3} className="px-6 py-3 text-right text-sm text-slate-500">부가가치세 (10%)</td>
                    <td className="px-6 py-3 text-right text-sm text-slate-500">₩{formatKRW(PHASE1_TOTAL * 0.1)}</td>
                  </tr>
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td colSpan={3} className="px-6 py-5 text-right font-black text-lg text-blue-900">총 견적 금액 (VAT 포함)</td>
                    <td className="px-6 py-5 text-right font-black text-2xl text-blue-600">₩{formatKRW(PHASE1_VAT_INCLUDED)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* 대금 지불 조건 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
              <h3 className="text-xl font-bold mb-6">대금 지불 조건</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PAYMENT_TERMS.map((term) => (
                  <div key={term.phase} className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 text-center">
                    <div className="text-4xl font-black mb-2">{term.ratio}%</div>
                    <div className="font-bold text-sm mb-1">{term.phase}</div>
                    <div className="text-xs text-blue-200 mb-3">{term.timing}</div>
                    <div className="bg-white/20 rounded-lg px-3 py-2 text-sm font-bold">
                      ₩{formatKRW(term.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl font-black mb-8 text-center">투자 대비 기대효과 (ROI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="text-center">
                  <div className="text-5xl font-black text-blue-400 mb-2">{ROI.threeYearROI}%</div>
                  <div className="text-sm text-slate-300">3년 누적 ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-emerald-400 mb-2">~{ROI.paybackMonths}개월</div>
                  <div className="text-sm text-slate-300">투자 회수 기간</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-amber-400 mb-2">₩{formatKRW(ROI.annualSaving)}만</div>
                  <div className="text-sm text-slate-300">연간 비용 절감</div>
                </div>
              </div>
              <div className="space-y-4">
                {ROI.details.map((d) => (
                  <div key={d.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{d.label}</span>
                      <span className="text-white font-semibold">{d.value}</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${d.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 9: 팀 구성 & 유지보수
            ══════════════════════════════════════════════ */}
        <section id="team" className="proposal-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                <Users className="w-4 h-4 mr-2" /> Team & Support
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                소수정예 전담팀 & 유지보수 계획
              </h2>
              <p className="text-slate-500 text-lg">
                멀티 역할 전문가로 구성된 전담팀이 기획부터 운영까지 책임집니다.
              </p>
            </div>

            {/* Team Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {TEAM.map((member, idx) => {
                const colors = [
                  { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
                  { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
                  { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
                ];
                const c = colors[idx] ?? colors[0];
                return (
                  <div
                    key={member.role}
                    className={`bg-white p-8 rounded-2xl shadow-sm border ${c.border} hover:shadow-md transition-shadow`}
                  >
                    <div className={`w-12 h-12 ${c.bg} ${c.text} rounded-xl flex items-center justify-center mb-5`}>
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">{member.role}</h4>
                    <p className="text-sm text-slate-500 mb-5">{member.description}</p>
                    <ul className="space-y-2">
                      {member.expertise.map((e) => (
                        <li key={e} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.text}`} />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Team Advantages */}
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100 mb-16">
              <h3 className="text-lg font-bold mb-1">전담팀 운영 방식의 강점</h3>
              <p className="text-sm text-slate-500 mb-6">각 멤버가 복수 도메인을 커버하는 크로스펑셔널 구조로, 대형 팀 대비 높은 효율을 발휘합니다.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TEAM_ADVANTAGES.map((adv) => (
                  <div key={adv.title} className="bg-white rounded-xl p-5">
                    <h4 className="font-bold text-sm mb-2 text-blue-700">{adv.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Agile Methodology */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-16">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-blue-600" />
                애자일(Agile) 개발 방법론
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    title: "2주 스프린트",
                    desc: "격주 단위로 기능을 계획하고 개발·검증합니다.",
                  },
                  {
                    title: "월간 진행 보고",
                    desc: "매월 진행 현황과 이슈를 정리하여 고객에게 공유합니다.",
                  },
                  {
                    title: "스프린트 리뷰",
                    desc: "매 스프린트 종료 시 고객에게 결과물을 시연합니다.",
                  },
                  {
                    title: "회고 & 개선",
                    desc: "프로세스를 지속적으로 개선하여 품질을 높입니다.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-xl p-5">
                    <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Tiers */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                유지보수 서비스
              </h3>
              <p className="text-sm text-slate-600 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                {MAINTENANCE_FREE_PERIOD}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {MAINTENANCE_TIERS.map((tier) => (
                  <div
                    key={tier.tier}
                    className={`bg-white rounded-2xl p-8 shadow-sm border-2 transition-shadow hover:shadow-md ${
                      tier.recommended
                        ? "border-blue-500 relative"
                        : "border-slate-100"
                    }`}
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        추천
                      </div>
                    )}
                    <h4 className="text-xl font-bold mb-2">{tier.tier}</h4>
                    <div className="text-2xl font-black text-blue-600 mb-6">
                      {tier.price}
                    </div>
                    <ul className="space-y-2">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Costs Notice */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-3xl mx-auto">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  별도 비용 안내
                </h4>
                <div className="space-y-3">
                  {ADDITIONAL_COSTS.map((cost) => (
                    <div key={cost.item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="font-semibold text-slate-900">{cost.item}</span>
                        <span className="text-slate-600"> - {cost.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            Section 10: Footer / CTA
            ══════════════════════════════════════════════ */}
        <footer className="proposal-section bg-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black">
                디지털 전환, 지금 시작하세요
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto text-lg">
                데이터 기반의 스마트 물류 시스템으로 운영 효율을 극대화하고
                <br />
                매월 750~1,600만 원의 비용 절감을 실현하세요.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={handleDownloadPdf}
                className="proposal-no-print bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                제안서 PDF 다운로드
              </button>
              <button
                onClick={() => scrollTo("hero")}
                className="proposal-no-print border border-slate-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                맨 위로 이동
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-sm pt-12 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                contact@kitt.ai.kr
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ExternalLink className="w-4 h-4" />
                www.kitt.ai.kr
              </div>
            </div>

            <div className="pt-8 text-xs text-slate-600">
              &copy; 2026 kitt | Always On. Always Thinking. All rights reserved. 물류운송관리시스템(TMS)구축 제안서
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
