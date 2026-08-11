"use client";

import { useState } from "react";
import { GALLERY, GALLERY_CATS, type GalleryCat } from "@/data/club";

const GOLD = "#d4a437", INK = "#14120f";

export default function VieView() {
  const [cat, setCat] = useState<GalleryCat>("Tout");
  const photos = GALLERY.filter((p) => (cat === "Tout" ? true : p.cat === cat));

  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(52px,7vw,92px) 24px 42px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>Album</span>
          <h1 style={{ fontSize: "clamp(40px,6vw,78px)", color: "#f6ecd9", margin: "14px 0 12px" }}>La vie du club</h1>
          <p style={{ fontSize: 18, color: "rgba(246,236,217,.7)", maxWidth: "52ch", margin: "0 0 32px" }}>Les concours, les entraînements, les repas, les soirées. Et le village autour.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {GALLERY_CATS.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  style={{
                    padding: "10px 20px", borderRadius: 999,
                    border: `1px solid ${active ? GOLD : "rgba(212,164,55,.35)"}`,
                    background: active ? GOLD : "transparent",
                    color: active ? INK : "rgba(246,236,217,.8)",
                    fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all .2s",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ GALERIE ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(40px,5vw,72px) 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {photos.map((p, i) => {
            const hasPhoto = Boolean(p.src);
            return (
              <figure
                key={i}
                className="zoom"
                style={{ position: "relative", margin: 0, borderRadius: "var(--radius-lg)", overflow: "hidden", background: "rgba(212,164,55,.14)", border: hasPhoto ? "0" : "1px dashed rgba(27,24,21,.22)", height: p.h, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {hasPhoto ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 34%" }} />
                    <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px 18px", fontSize: 13, fontWeight: 600, color: "#f6ecd9", background: "linear-gradient(180deg,transparent,rgba(20,18,15,.8))" }}>{p.alt}</figcaption>
                  </>
                ) : (
                  <span style={{ fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(27,24,21,.45)" }}>Vos photos ici</span>
                )}
              </figure>
            );
          })}
        </div>
      </section>
    </main>
  );
}
