import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정동병원 재고관리 플랫폼 제안서",
  description: "병원 재고관리 & 세금계산서 자동화 플랫폼 - 재고 부족 사고 90% 예방, 세금계산서 발행 시간 75% 단축",
};

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
