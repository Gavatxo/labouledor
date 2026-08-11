import type { ReactNode } from "react";

const PATHS: Record<string, ReactNode> = {
  trophy: (
    <>
      <path d="M6 4h12v5a6 6 0 0 1-12 0z" />
      <path d="M18 5h3v2a3 3 0 0 1-3 3" />
      <path d="M6 5H3v2a3 3 0 0 0 3 3" />
      <path d="M9 20h6" />
      <path d="M12 15v5" />
    </>
  ),
  handshake: (
    <>
      <path d="M11 17 8.5 14.5a2 2 0 0 1 0-3l3-3 3.5 3H19" />
      <path d="M5 8h3l3-3 4 4" />
      <path d="m14 15 2 2" />
      <path d="m11 18 2 2" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v3" />
      <path d="M16 2v3" />
      <rect x="3" y="5" width="18" height="16" rx="4" />
      <path d="M3 10h18" />
    </>
  ),
  leaf: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-7 8-7 0 5-3 8-8 8z" />
      <path d="M12 15c0-3.5-2.5-6-6-6 0 4 2.5 6 6 6z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.4 3.4 0 0 1 0 5.6" />
      <path d="M18.5 20a6.5 6.5 0 0 0-3-5.4" />
    </>
  ),
};

export default function FeatureIcon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.trophy}
    </svg>
  );
}
