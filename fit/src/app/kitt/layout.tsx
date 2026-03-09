import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitt Medi AI Solutions",
  description: "AI 기반 병원 소모품 통합 관리 플랫폼",
};

export default function KittLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
