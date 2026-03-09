"use client";

import React from "react";
import {
  Truck,
  ArrowLeft,
  Download,
  CheckCircle2,
  BarChart3,
  FileText,
  Clock,
  Shield,
  TrendingUp,
  Loader2,
} from "lucide-react";
import {
  PHASE1_MODULES,
  PHASE2_MODULES,
  COMMON_MODULE,
  PAYMENT_TERMS,
  ROI,
  MAINTENANCE_TIERS,
  formatKRW,
  formatManWon,
  PHASE1_TOTAL,
  PHASE1_VAT_INCLUDED,
} from "./proposal-data";

export default function PricingPage() {
  const [isPdfLoading, setIsPdfLoading] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPdf = React.useCallback(async () => {
    setIsPdfLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const element = contentRef.current;
      if (!element) return;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1280,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      pdf.save("물류TMS_견적서.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsPdfLoading(false);
    }
  }, []);

  const VAT_AMOUNT = PHASE1_TOTAL * 0.1;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="proposal-nav sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/proposal"
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              제안서로 돌아가기
            </a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">견적서</span>
          </div>
          <button
            onClick={handleDownloadPdf}
            disabled={isPdfLoading}
            className="proposal-no-print bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isPdfLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">PDF 다운로드</span>
          </button>
        </div>
      </nav>

      <div ref={contentRef}>
        {/* Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold mb-4">
                  <FileText className="w-4 h-4 mr-2" /> 견적서
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-2">
                  물류 운송 관리 시스템 (TMS)
                </h1>
                <p className="text-slate-300">1차 사업 — 데이터 정립 & 핵심 프로세스 디지털화</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 mb-1">1차 사업 총 예산</div>
                <div className="text-4xl font-black">₩{formatKRW(PHASE1_TOTAL)}</div>
                <div className="text-sm text-blue-300 mt-1">VAT 별도</div>
              </div>
            </div>
          </div>
        </section>

        {/* 견적 상세 내역 */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              견적 내역 (1차 사업)
            </h2>

            {/* Module breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      항목
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      주요 기능
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      금액
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PHASE1_MODULES.map((mod, idx) => (
                    <tr key={mod.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-5 text-sm font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-sm">{mod.name}</div>
                      </td>
                      <td className="px-6 py-5">
                        <ul className="space-y-1">
                          {mod.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-1.5 text-xs text-slate-500"
                            >
                              <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-sm whitespace-nowrap">
                        {formatManWon(mod.price)}
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-5 text-sm font-bold text-slate-400">5</td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-sm">{COMMON_MODULE.name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <ul className="space-y-1">
                        {COMMON_MODULE.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-1.5 text-xs text-slate-500"
                          >
                            <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-sm whitespace-nowrap">
                      {formatManWon(COMMON_MODULE.price)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                    <td colSpan={3} className="px-6 py-4 text-right font-bold text-sm">
                      개발비 합계
                    </td>
                    <td className="px-6 py-4 text-right font-black text-lg">
                      ₩{formatKRW(PHASE1_TOTAL)}
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td colSpan={3} className="px-6 py-3 text-right text-sm text-slate-500">
                      부가가치세 (10%)
                    </td>
                    <td className="px-6 py-3 text-right text-sm text-slate-500">
                      ₩{formatKRW(VAT_AMOUNT)}
                    </td>
                  </tr>
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td colSpan={3} className="px-6 py-5 text-right font-black text-lg text-blue-900">
                      총 견적 금액 (VAT 포함)
                    </td>
                    <td className="px-6 py-5 text-right font-black text-2xl text-blue-600">
                      ₩{formatKRW(PHASE1_VAT_INCLUDED)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* 2차 사업 참고 */}
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mb-8">
              <h3 className="text-lg font-bold text-emerald-800 mb-4">2차 사업 (예정 — 별도 협의)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PHASE2_MODULES.map((mod) => (
                  <div key={mod.id} className="bg-white rounded-xl p-4">
                    <div className="font-bold text-sm mb-2">{mod.name}</div>
                    <ul className="space-y-1">
                      {mod.features.slice(0, 3).map((f) => (
                        <li key={f} className="text-xs text-slate-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-xs font-semibold text-emerald-600">별도 협의</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-emerald-700 mt-4">
                1차 사업 운영 안정화 이후 별도 제안 및 견적을 통해 진행됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* 대금 지불 조건 */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              대금 지불 조건 (1차 사업)
            </h2>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase">구분</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase">지불 시점</th>
                    <th className="text-center px-6 py-4 text-xs font-bold text-slate-400 uppercase">비율</th>
                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-400 uppercase">금액 (VAT 포함)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PAYMENT_TERMS.map((term) => (
                    <tr key={term.phase} className="hover:bg-slate-50/50">
                      <td className="px-6 py-5 font-bold text-sm">{term.phase}</td>
                      <td className="px-6 py-5 text-sm text-slate-600">{term.timing}</td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-black">
                          {term.ratio}%
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-sm">
                        ₩{formatKRW(term.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td className="px-6 py-5 font-black">합계</td>
                    <td className="px-6 py-5"></td>
                    <td className="px-6 py-5 text-center font-black">100%</td>
                    <td className="px-6 py-5 text-right font-black text-lg text-blue-600">
                      ₩{formatKRW(PHASE1_TOTAL)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Visual payment timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PAYMENT_TERMS.map((term, idx) => (
                <div key={term.phase} className="relative">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 text-center">
                    <div className="text-5xl font-black mb-2">{term.ratio}%</div>
                    <div className="font-bold text-sm mb-1">{term.phase}</div>
                    <div className="text-xs text-blue-200 mb-3">{term.timing}</div>
                    <div className="bg-white/20 rounded-lg px-3 py-2 text-sm font-bold">
                      ₩{formatKRW(term.amount)}
                    </div>
                  </div>
                  {idx < PAYMENT_TERMS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 text-slate-300 text-2xl">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              투자 대비 기대효과 (ROI)
            </h2>

            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-2xl p-8 md:p-12 text-white mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="text-6xl font-black text-blue-400 mb-2">
                    {ROI.threeYearROI}%
                  </div>
                  <div className="text-sm text-slate-300">3년 누적 ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-black text-emerald-400 mb-2">
                    ~{ROI.paybackMonths}개월
                  </div>
                  <div className="text-sm text-slate-300">투자 회수 기간</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-black text-amber-400 mb-2">
                    ₩{formatKRW(ROI.annualSaving)}만
                  </div>
                  <div className="text-sm text-slate-300">연간 비용 절감</div>
                </div>
              </div>

              <div className="space-y-5">
                {ROI.details.map((d) => (
                  <div key={d.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">{d.label}</span>
                      <span className="text-white font-bold">{d.value}</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${d.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 유지보수 */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              유지보수 서비스 (납품 후 3개월 무상)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {MAINTENANCE_TIERS.map((tier) => (
                <div
                  key={tier.tier}
                  className={`bg-white rounded-2xl p-8 shadow-sm border-2 hover:shadow-md transition-shadow ${
                    tier.recommended ? "border-blue-500 relative" : "border-slate-100"
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
        </section>

        {/* 포함/미포함 & 특기사항 */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* 포함 사항 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-blue-600">포함 사항</h3>
                <ul className="space-y-2">
                  {[
                    "소스코드 일체",
                    "운영 매뉴얼",
                    "API 문서",
                    "DB 스키마 문서",
                    "3개월 무상 유지보수",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 미포함 사항 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-slate-500">미포함 사항</h3>
                <ul className="space-y-3">
                  {[
                    { item: "클라우드 서버 월 이용료", note: "실비 정산 (예상 월 10~20만원)" },
                    { item: "도메인 / SSL 갱신료", note: "연 단위 실비" },
                    { item: "2차 사업 개발비", note: "별도 제안 및 견적" },
                    { item: "데이터 마이그레이션", note: "기존 시스템 데이터 이관 시 별도 협의" },
                  ].map((row) => (
                    <li key={row.item} className="text-sm">
                      <span className="font-semibold text-slate-700">{row.item}</span>
                      <span className="text-slate-400 ml-2">— {row.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 특기사항 */}
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
              <h3 className="text-lg font-bold mb-4 text-amber-800">특기사항</h3>
              <ol className="space-y-2 list-decimal list-inside text-sm text-amber-900">
                <li>본 견적서는 <strong>1차 사업 범위에 한정</strong>됩니다.</li>
                <li>2차 사업은 1차 운영 후 <strong>별도 제안 및 견적</strong> 진행합니다.</li>
                <li>클라우드 인프라 비용은 <strong>실비 정산</strong> (예상 월 10~20만원)으로 처리됩니다.</li>
                <li>본 견적서의 유효기간은 <strong>견적일로부터 30일</strong>입니다.</li>
                <li>상기 금액은 <strong>부가가치세 별도</strong> 기준이며, VAT 포함 총액은 ₩{formatKRW(PHASE1_VAT_INCLUDED)}입니다.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-slate-400 text-sm mb-4">
              본 견적서는 상기 내용을 기준으로 작성되었으며, 세부 요구사항 변경 시 금액이 조정될 수 있습니다.
            </p>
            <div className="text-xs text-slate-600">
              &copy; 2026 물류 운송 관리 시스템(TMS) 구축 견적서
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
