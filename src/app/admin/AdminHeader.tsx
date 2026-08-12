import Link from "next/link";
import { logout } from "./actions";

export default function AdminHeader() {
  return (
    <header style={{ background: "var(--ink)", borderBottom: "1px solid rgba(212,164,55,.22)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.svg" alt="" style={{ width: 34, height: 34, objectFit: "contain" }} />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 16, color: "var(--gold-lt)" }}>Back-office</span>
            <span style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(246,236,217,.5)" }}>La Boule d&apos;Or</span>
          </span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", marginRight: 6 }}>
          <Link href="/admin" className="navlink" style={{ fontSize: 13, color: "rgba(246,236,217,.8)", padding: "8px 14px", borderRadius: 999 }}>Concours</Link>
          <Link href="/admin/galerie" className="navlink" style={{ fontSize: 13, color: "rgba(246,236,217,.8)", padding: "8px 14px", borderRadius: 999 }}>Galerie</Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/concours" target="_blank" style={{ fontSize: 13, color: "rgba(246,236,217,.7)", padding: "8px 14px" }}>Voir le site ↗</Link>
          <form action={logout}>
            <button type="submit" style={{ fontSize: 13, padding: "9px 16px", borderRadius: 999, border: "1px solid rgba(212,164,55,.35)", background: "transparent", color: "var(--gold-lt)", cursor: "pointer" }}>Déconnexion</button>
          </form>
        </div>
      </div>
    </header>
  );
}
