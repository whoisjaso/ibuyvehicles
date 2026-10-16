import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Mark's Desk", template: "%s | Mark's Desk" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return children;
}
