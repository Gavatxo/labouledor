import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Back-office",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-body)" }}>
      {children}
    </div>
  );
}
