import type { Metadata } from "next";
import { VALUES, BUREAU, IMAGES } from "@/data/club";

export const metadata: Metadata = {
  title: "Le club",
  description: "L'histoire, les valeurs et le bureau de La Boule d'Or Nibelloise, club de pétanque né à Nibelle.",
  alternates: { canonical: "/club" },
};

export default function ClubPage() {
  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(52px,7vw,92px) 24px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>Le club</span>
          <h1 style={{ fontSize: "clamp(40px,6vw,78px)", color: "#f6ecd9", margin: "14px 0 16px", maxWidth: "18ch" }}>Né à Nibelle, par des Nibellois.</h1>
          <p style={{ fontSize: 19, color: "rgba(246,236,217,.72)", maxWidth: "60ch", margin: 0 }}>La Boule d&apos;Or Nibelloise, c&apos;est l&apos;idée d&apos;une bande de jeunes du village : remettre de l&apos;animation sur le terrain, et donner à la pétanque l&apos;image qu&apos;elle mérite.</p>
        </div>
      </section>

      {/* ══ HISTOIRE + STATS ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px,6vw,90px) 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(30px,4vw,60px)" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px,3.4vw,44px)", margin: "0 0 16px" }}>Notre histoire</h2>
            <p style={{ fontSize: 17, color: "rgba(27,24,21,.8)" }}>Tout a commencé par des parties improvisées les soirs d&apos;été, entre potes, sur le terrain du village. Une boule, un bouchon, une glacière — et l&apos;envie que ça devienne un vrai rendez-vous.</p>
            <p style={{ fontSize: 17, color: "rgba(27,24,21,.8)" }}>En 2026, on a franchi le pas : statuts déposés, licences, premier concours. Le club était né.</p>
            <h2 style={{ fontSize: "clamp(28px,3.4vw,44px)", margin: "34px 0 16px" }}>Pourquoi ce club ?</h2>
            <p style={{ fontSize: 17, color: "rgba(27,24,21,.8)" }}>Parce qu&apos;un village vit quand il se retrouve. Le club, c&apos;est le prétexte : on joue, on mange, on rigole, et tout le monde est invité — des ados aux anciens.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.equipe} alt="L'équipe de La Boule d'Or Nibelloise" className="washed" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "50% 42%", borderRadius: "var(--radius-lg)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ padding: 22, borderRadius: "var(--radius-lg)", background: "var(--gold)" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 38, color: "#14120f" }}>32</div>
                <div style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(20,18,15,.7)" }}>Licenciés</div>
              </div>
              <div style={{ padding: 22, borderRadius: "var(--radius-lg)", background: "var(--ink)", color: "#f6ecd9" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 38, color: "var(--gold)" }}>6</div>
                <div style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(246,236,217,.65)" }}>Concours / an</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALEURS ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(52px,7vw,96px) 24px" }}>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", color: "#f6ecd9", margin: "0 0 40px" }}>Nos valeurs</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
            {VALUES.map((v) => (
              <div key={v.n} style={{ padding: 26, borderRadius: "var(--radius-lg)", border: "1px solid rgba(212,164,55,.2)", background: "var(--ink-2)" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, color: "var(--gold)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{v.n}</div>
                <h3 style={{ fontSize: 22, color: "#f6ecd9", margin: "0 0 8px" }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(246,236,217,.66)", margin: 0 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUREAU ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px,6vw,90px) 24px" }}>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", margin: "0 0 8px" }}>Le bureau</h2>
          <p style={{ fontSize: 15, color: "rgba(27,24,21,.6)", margin: "0 0 32px" }}>L&apos;équipe de bénévoles qui fait tourner le club au quotidien.</p>
          <div className="bureau-grid" style={{ display: "grid", gap: 18 }}>
            {BUREAU.map((b, i) => (
              <div key={i} style={{ textAlign: "center", padding: "26px 18px", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)" }}>
                <div style={{ width: 96, height: 96, borderRadius: 999, margin: "0 auto 16px", background: "rgba(212,164,55,.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontSize: 28, color: "var(--gold-dp)" }}>{b.initials}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 19 }}>{b.name}</div>
                <div style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(27,24,21,.55)" }}>{b.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
