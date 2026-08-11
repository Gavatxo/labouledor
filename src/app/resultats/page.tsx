import type { Metadata } from "next";
import { RESULTS } from "@/data/club";

export const metadata: Metadata = {
  title: "Les résultats",
  description: "Le palmarès des concours de La Boule d'Or Nibelloise : podiums et scores.",
};

export default function ResultatsPage() {
  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(52px,7vw,92px) 24px 46px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 34, alignItems: "end" }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>Palmarès</span>
            <h1 style={{ fontSize: "clamp(40px,6vw,78px)", color: "#f6ecd9", margin: "14px 0 0" }}>Les résultats</h1>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "16px 22px", borderRadius: "var(--radius-lg)", border: "1px solid rgba(212,164,55,.3)", background: "var(--ink-2)" }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--gold)", flex: "0 0 auto" }} />
            <span style={{ fontSize: 14, color: "rgba(246,236,217,.75)" }}>Bientôt : le suivi des parties en direct, partie par partie.</span>
          </div>
        </div>
      </section>

      {/* ══ RÉSULTATS ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(44px,6vw,80px) 24px", display: "flex", flexDirection: "column", gap: 26 }}>
          {RESULTS.map((r) => (
            <article key={r.name} className="result-grid" style={{ display: "grid", gap: "clamp(20px,3vw,38px)", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.photo} alt={`Podium — ${r.name}`} style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover", objectPosition: "50% 32%" }} />
              <div className="result-body" style={{ padding: "clamp(24px,3vw,34px) clamp(24px,3vw,34px) clamp(24px,3vw,34px) 0" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <span style={{ padding: "6px 13px", borderRadius: 999, background: "var(--ink)", color: "var(--gold-lt)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{r.date}</span>
                  <span style={{ padding: "6px 13px", borderRadius: 999, background: "rgba(122,138,94,.2)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{r.type}</span>
                </div>
                <h3 style={{ fontSize: "clamp(24px,2.6vw,34px)", margin: "0 0 20px" }}>{r.name}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {r.rows.map((row) => (
                    <div key={row.rank} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 18px", borderRadius: "var(--radius-md)", background: row.winner ? "rgba(212,164,55,.24)" : "rgba(27,24,21,.05)" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, width: 34, color: row.winner ? "#a9761f" : "rgba(27,24,21,.55)" }}>{row.rank}</span>
                      <span style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>{row.team}</span>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: 19 }}>{row.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
