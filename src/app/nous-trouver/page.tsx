import type { Metadata } from "next";
import { INFOS, MAP } from "@/data/club";

export const metadata: Metadata = {
  title: "Nous trouver",
  description: "Le boulodrome de La Boule d'Or Nibelloise, au cœur de Nibelle (45). Adresse, accès, horaires et contact.",
  alternates: { canonical: "/nous-trouver" },
};

export default function NousTrouverPage() {
  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(52px,7vw,92px) 24px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>Nibelle · Loiret</span>
          <h1 style={{ fontSize: "clamp(40px,6vw,78px)", color: "#f6ecd9", margin: "14px 0 16px" }}>Nous trouver</h1>
          <p style={{ fontSize: 19, color: "rgba(246,236,217,.72)", maxWidth: "52ch", margin: 0 }}>Le terrain est au cœur du village, à deux pas du camping. Entrée libre, boules bienvenues.</p>
        </div>
      </section>

      {/* ══ CARTE + INFOS ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(44px,6vw,80px) 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(26px,3vw,44px)" }}>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgba(27,24,21,.1)", minHeight: 420 }}>
            <iframe title="Carte de Nibelle" src={MAP.embed} style={{ width: "100%", height: "100%", minHeight: 420, border: 0, filter: "saturate(.75) sepia(.14)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {INFOS.map((i) => (
              <div key={i.label} style={{ padding: "22px 24px", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)" }}>
                <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-dp)", marginBottom: 6 }}>{i.label}</div>
                <div style={{ fontSize: 17, color: "rgba(27,24,21,.85)" }}>{i.value}</div>
              </div>
            ))}
            <a href={MAP.link} target="_blank" rel="noopener" className="dark-btn" style={{ textAlign: "center", padding: 17, borderRadius: 999, background: "var(--ink)", color: "var(--gold-lt)", fontFamily: "var(--font-heading)", fontSize: 16 }}>Ouvrir l&apos;itinéraire</a>
          </div>
        </div>
      </section>
    </main>
  );
}
