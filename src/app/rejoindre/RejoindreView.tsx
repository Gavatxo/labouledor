"use client";

import { useState } from "react";
import { useModal } from "@/components/ModalContext";
import { STEPS, LEVELS } from "@/data/club";

export default function RejoindreView() {
  const { openModal } = useModal();
  const [level, setLevel] = useState<string>("Débutant");

  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(52px,7vw,92px) 24px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>Adhésion 2026</span>
          <h1 style={{ fontSize: "clamp(40px,6vw,78px)", color: "#f6ecd9", margin: "14px 0 16px", maxWidth: "16ch" }}>Viens lancer ta première boule.</h1>
          <p style={{ fontSize: 19, color: "rgba(246,236,217,.72)", maxWidth: "54ch", margin: 0 }}>Aucun niveau requis, aucun âge minimum, aucune tenue à acheter. Juste l&apos;envie de passer de bonnes soirées.</p>
        </div>
      </section>

      {/* ══ ÉTAPES + FORMULAIRE ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(44px,6vw,84px) 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,4vw,56px)" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px,3.4vw,44px)", margin: "0 0 22px" }}>Comment ça marche</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {STEPS.map((s) => (
                <div key={s.n} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <span style={{ flex: "0 0 auto", width: 44, height: 44, borderRadius: 999, background: "var(--gold)", color: "#14120f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontSize: 19 }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 21 }}>{s.title}</div>
                    <div style={{ fontSize: 16, color: "rgba(27,24,21,.72)" }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30, padding: 24, borderRadius: "var(--radius-lg)", background: "var(--ink)", color: "#f6ecd9", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,236,217,.6)" }}>Licence FFPJP + adhésion</div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 36, color: "var(--gold)" }}>38 € / an</div>
              </div>
              <div style={{ fontSize: 14, color: "rgba(246,236,217,.7)", maxWidth: "26ch" }}>Gratuit pour les moins de 16 ans. Entraînements du mardi ouverts à tous, sans licence.</div>
            </div>
          </div>

          <div style={{ padding: "clamp(26px,3vw,38px)", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", alignSelf: "start" }}>
            <h3 style={{ fontSize: 28, margin: "0 0 6px" }}>Je veux rejoindre La Boule d&apos;Or</h3>
            <p style={{ fontSize: 15, color: "rgba(27,24,21,.6)", margin: "0 0 22px" }}>On te rappelle dans la semaine.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="field"><label>Prénom</label><input className="input" placeholder="Léo" /></div>
              <div className="field"><label>Nom</label><input className="input" placeholder="Marceau" /></div>
            </div>
            <div className="field" style={{ marginTop: 14 }}><label>Email</label><input className="input" placeholder="leo@exemple.fr" /></div>
            <div className="field" style={{ marginTop: 14 }}><label>Téléphone</label><input className="input" placeholder="06 12 34 56 78" /></div>
            <div className="field" style={{ marginTop: 14 }}>
              <label>Ton niveau</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                {LEVELS.map((l) => {
                  const active = level === l;
                  return (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      style={{
                        padding: "10px 18px", borderRadius: 999,
                        border: `1px solid ${active ? "#a9761f" : "rgba(27,24,21,.18)"}`,
                        background: active ? "rgba(212,164,55,.24)" : "transparent",
                        color: active ? "#1b1815" : "rgba(27,24,21,.6)",
                        fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
                      }}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>
            <button onClick={openModal} className="gold-btn" style={{ width: "100%", marginTop: 24, padding: 17, borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 16, cursor: "pointer" }}>
              Envoyer ma demande
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
