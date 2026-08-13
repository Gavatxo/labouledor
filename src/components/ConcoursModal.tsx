"use client";

import { useActionState } from "react";
import { sendConcoursInscription } from "@/app/contact-actions";

export default function ConcoursModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(sendConcoursInscription, null);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(20,18,15,.72)", backdropFilter: "blur(4px)", animation: "bdo-fade .2s ease" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(520px,100%)", maxHeight: "88vh", overflow: "auto", background: "var(--cream)", borderRadius: "var(--radius-lg)", padding: "clamp(26px,3.4vw,40px)", boxShadow: "var(--shadow-lg)", animation: "bdo-rise .28s ease both" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold-dp)" }}>La Boule d&apos;Or · Nibelle</div>
            <h3 style={{ fontSize: 30, margin: "8px 0 0" }}>Inscription au concours</h3>
          </div>
          <button onClick={onClose} aria-label="Fermer" style={{ flex: "0 0 auto", width: 40, height: 40, borderRadius: 999, border: "1px solid rgba(27,24,21,.15)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
          </button>
        </div>

        {state?.ok ? (
          <div style={{ textAlign: "center", padding: "28px 0 8px" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 24, marginBottom: 8 }}>Inscription envoyée !</div>
            <p style={{ fontSize: 15, color: "rgba(27,24,21,.7)", margin: "0 0 22px" }}>On te recontacte pour valider ton équipe. À très vite sur le terrain.</p>
            <button onClick={onClose} className="gold-btn" style={{ padding: "14px 28px", borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 15, cursor: "pointer" }}>Fermer</button>
          </div>
        ) : (
          <form action={formAction}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24 }}>
              <div className="field"><label>Joueur 1</label><input className="input" name="player1" placeholder="Prénom Nom" required /></div>
              <div className="field"><label>Joueur 2</label><input className="input" name="player2" placeholder="Prénom Nom" /></div>
            </div>
            <div className="field" style={{ marginTop: 14 }}><label>Email de contact</label><input className="input" type="email" name="email" placeholder="equipe@exemple.fr" /></div>
            <div className="field" style={{ marginTop: 14 }}><label>Téléphone</label><input className="input" type="tel" name="phone" placeholder="06 12 34 56 78" /></div>
            <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: "var(--radius-md)", background: "rgba(212,164,55,.16)", fontSize: 14 }}>
              On te recontacte pour valider ton équipe. Buvette et restauration sur place le jour du concours.
            </div>
            {state?.error && <p style={{ margin: "16px 0 0", fontSize: 14, color: "#b42828" }}>{state.error}</p>}
            <button type="submit" disabled={pending} className="gold-btn" style={{ width: "100%", marginTop: 20, padding: 17, borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 16, cursor: pending ? "default" : "pointer", opacity: pending ? 0.6 : 1 }}>
              {pending ? "Envoi…" : "Valider l'inscription"}
            </button>
            <button type="button" onClick={onClose} style={{ width: "100%", marginTop: 8, padding: 13, borderRadius: 999, border: 0, background: "transparent", color: "rgba(27,24,21,.55)", fontSize: 14, cursor: "pointer" }}>Annuler</button>
          </form>
        )}
      </div>
    </div>
  );
}
