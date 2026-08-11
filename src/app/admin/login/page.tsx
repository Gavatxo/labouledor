import { login } from "../actions";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams;

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <form action={login} style={{ width: "min(400px,100%)", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)", padding: "clamp(28px,4vw,40px)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.svg" alt="" style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(.4)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 22 }}>Back-office</div>
            <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(27,24,21,.5)" }}>La Boule d&apos;Or</div>
          </div>
        </div>

        <input type="hidden" name="next" value={next ?? "/admin"} />
        <div className="field">
          <label style={{ display: "block", fontSize: 12, marginBottom: 5, color: "rgba(27,24,21,.7)" }}>Mot de passe</label>
          <input className="input" type="password" name="password" required autoFocus placeholder="••••••••" />
        </div>

        {error && (
          <p style={{ margin: "12px 0 0", fontSize: 13, color: "#b42828" }}>Mot de passe incorrect.</p>
        )}

        <button type="submit" className="gold-btn" style={{ width: "100%", marginTop: 20, padding: 15, borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 16, cursor: "pointer" }}>
          Se connecter
        </button>
      </form>
    </main>
  );
}
