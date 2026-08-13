"use client";

import type { CSSProperties, ReactNode } from "react";
import { useModal } from "./ModalContext";

/** Bouton/lien qui ouvre la modale d'inscription au concours. */
export default function ModalTrigger({
  children,
  style,
  className,
  as = "a",
  concours,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  as?: "a" | "button";
  concours?: string;
}) {
  const { openModal } = useModal();

  if (as === "button") {
    return (
      <button type="button" className={className} style={style} onClick={() => openModal(concours)}>
        {children}
      </button>
    );
  }
  return (
    <a
      href="#inscription"
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        openModal(concours);
      }}
    >
      {children}
    </a>
  );
}
