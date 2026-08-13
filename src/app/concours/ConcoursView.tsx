"use client";

import { useState } from "react";
import { useModal } from "@/components/ModalContext";
import { CONCOURS_FILTERS, type ConcoursFilter } from "@/data/club";
import type { DisplayEvent } from "@/lib/events";

const GOLD = "#d4a437", GOLD_LT = "#efd08a", INK = "#14120f";

export default function ConcoursView({ events }: { events: DisplayEvent[] }) {
  const { openModal } = useModal();
  const [filter, setFilter] = useState<ConcoursFilter>("À venir");

  const filtered = events.filter((e) =>
    filter === "Tous" ? true : filter === "Passés" ? e.past : filter === "À venir" ? !e.past : e.type === filter
  );

  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(52px,7vw,92px) 24px 44px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>Calendrier 2026</span>
          <h1 style={{ fontSize: "clamp(40px,6vw,78px)", color: "#f6ecd9", margin: "14px 0 12px" }}>Les concours</h1>
          <p style={{ fontSize: 18, color: "rgba(246,236,217,.7)", maxWidth: "52ch", margin: 0 }}>Toutes les dates du club, à Nibelle et autour. Inscription en ligne, résultats en direct bientôt.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 34 }}>
            {CONCOURS_FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "11px 22px", borderRadius: 999,
                    border: `1px solid ${active ? GOLD : "rgba(212,164,55,.35)"}`,
                    background: active ? GOLD : "transparent",
                    color: active ? INK : "rgba(246,236,217,.8)",
                    fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all .2s",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ LISTE ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(44px,6vw,80px) 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {filtered.length === 0 && (
            <p style={{ fontSize: 17, color: "rgba(27,24,21,.6)", textAlign: "center", padding: "40px 0" }}>Aucun concours pour ce filtre.</p>
          )}
          {filtered.map((ev) => {
            const open = !ev.past;
            const tagBg = ev.past ? "rgba(27,24,21,.1)" : ev.tag === "Ouvert" ? "rgba(122,138,94,.25)" : "rgba(212,164,55,.28)";
            return (
              <article key={ev.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(20px,3vw,40px)", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)", padding: "clamp(22px,3vw,34px)", opacity: open ? 1 : 0.72 }}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 88, height: 88, borderRadius: 22, background: "var(--ink)", color: "var(--gold-lt)" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: 32, lineHeight: 1 }}>{ev.day}</span>
                    <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" }}>{ev.month}</span>
                  </div>
                  <div>
                    <span style={{ display: "inline-block", padding: "6px 13px", borderRadius: 999, background: tagBg, color: "#1b1815", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{ev.tag}</span>
                    <h3 style={{ fontSize: "clamp(24px,2.4vw,32px)", margin: "12px 0 6px" }}>{ev.name}</h3>
                    <p style={{ fontSize: 15, color: "rgba(27,24,21,.65)", margin: 0 }}>{ev.desc}</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 14, alignContent: "center" }}>
                  <Meta label="Heure" value={ev.time} />
                  <Meta label="Format" value={ev.type} />
                  <Meta label="Prix" value={ev.price} />
                  <Meta label="Dotation" value={ev.dotation} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
                  <div style={{ fontSize: 14, color: "rgba(27,24,21,.7)" }}><strong>{ev.left}</strong> · {ev.place}</div>
                  {open ? (
                    <button onClick={() => openModal(`${ev.name} — ${ev.dateLabel}`)} className="dark-btn" style={{ textAlign: "center", padding: "15px 24px", borderRadius: 999, border: 0, cursor: "pointer", background: GOLD, color: INK, fontFamily: "var(--font-heading)", fontSize: 15 }}>S&apos;inscrire</button>
                  ) : (
                    <span style={{ textAlign: "center", padding: "15px 24px", borderRadius: 999, background: INK, color: GOLD_LT, fontFamily: "var(--font-heading)", fontSize: 15, opacity: 0.8 }}>Concours terminé</span>
                  )}
                  <span style={{ fontSize: 12, textAlign: "center", color: "rgba(27,24,21,.45)" }}>Règlement FFPJP · licence non obligatoire</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(27,24,21,.5)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 19 }}>{value}</div>
    </div>
  );
}
