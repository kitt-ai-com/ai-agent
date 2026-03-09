import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "물류 TMS 구축 제안서 | 운송 관리 시스템",
  description:
    "물류 운송 관리 시스템(TMS) 구축 제안서 - 데이터 정립 및 핵심 프로세스 디지털화",
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
