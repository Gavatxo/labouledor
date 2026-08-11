"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModalContext } from "./ModalContext";
import { CLUB, NAV, NAV_MOBILE, FOOTER_COLS, HIGHLIGHT } from "@/data/club";

const GOLD = "#d4a437";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);

  // Le back-office a sa propre coque : pas de header/footer public.
  if (pathname.startsWith("/admin")) return <>{children}</>;

  const openModal = () => {
    setModal(true);
    setMenu(false);
  };
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <ModalContext.Provider value={{ openModal }}>
      <div style={{ background: "var(--ink)", fontFamily: "var(--font-body)", color: "var(--color-text)", minHeight: "100vh" }}>
        {/* ══ HEADER ══ */}
        <header
          style={{
            position: "sticky", top: 0, zIndex: 40,
            background: "rgba(20,18,15,.94)", backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(212,164,55,.22)",
          }}
        >
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", height: 78, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo.svg" alt={CLUB.fullName} style={{ width: 50, height: 50, objectFit: "contain" }} />
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 17, color: "var(--gold-lt)", letterSpacing: ".01em" }}>{CLUB.name}</span>
                <span style={{ fontSize: 10, letterSpacing: ".34em", textTransform: "uppercase", color: "rgba(246,236,217,.5)" }}>{CLUB.place}</span>
              </span>
            </Link>

            <nav className="nav-desktop" style={{ alignItems: "center", gap: 4 }}>
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="navlink"
                    style={{
                      padding: "9px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                      letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap",
                      color: active ? GOLD : "rgba(246,236,217,.78)",
                      background: active ? "rgba(212,164,55,.16)" : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/rejoindre" className="gold-btn" style={{ marginLeft: 10, padding: "12px 22px", borderRadius: 999, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 14 }}>
                Rejoindre le club
              </Link>
            </nav>

            <button
              className="nav-mobile-btn"
              onClick={() => setMenu(true)}
              aria-label="Ouvrir le menu"
              style={{ width: 46, height: 46, alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid rgba(212,164,55,.35)", background: "transparent", color: "var(--gold-lt)", cursor: "pointer" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></svg>
            </button>
          </div>
        </header>

        {/* ══ MENU MOBILE ══ */}
        {menu && (
          <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "var(--ink)", padding: 24, display: "flex", flexDirection: "column", animation: "bdo-fade .18s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
              <span style={{ fontFamily: "var(--font-heading)", color: "var(--gold-lt)", fontSize: 18 }}>Menu</span>
              <button onClick={() => setMenu(false)} aria-label="Fermer le menu" style={{ width: 46, height: 46, borderRadius: 999, border: "1px solid rgba(212,164,55,.35)", background: "transparent", color: "var(--gold-lt)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 34 }}>
              {NAV_MOBILE.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  style={{ fontFamily: "var(--font-heading)", fontSize: 30, color: isActive(item.href) ? GOLD : "#f6ecd9", padding: "12px 0", borderBottom: "1px solid rgba(212,164,55,.14)", animation: "bdo-rise .32s ease both", animationDelay: `${i * 0.04}s` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/rejoindre" onClick={() => setMenu(false)} style={{ marginTop: "auto", textAlign: "center", padding: 18, borderRadius: 999, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 17 }}>
              Rejoindre le club
            </Link>
          </div>
        )}

        {children}

        {/* ══ FOOTER ══ */}
        <footer style={{ background: "var(--ink)", color: "rgba(246,236,217,.72)", borderTop: "1px solid rgba(212,164,55,.2)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px,6vw,80px) 24px 30px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 38 }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo.svg" alt={CLUB.fullName} style={{ width: 96, height: 96, objectFit: "contain", marginBottom: 16 }} />
              <p style={{ fontSize: 15, maxWidth: "30ch", margin: 0 }}>Club de pétanque de Nibelle, Loiret. Jeune, convivial, ouvert à tous.</p>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, color: "var(--gold)", marginBottom: 14 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.links.map((l, i) => (
                    <Link key={`${l.href}-${i}`} href={l.href} className="navlink" style={{ fontSize: 15, color: "rgba(246,236,217,.72)" }}>{l.label}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, color: "var(--gold)", marginBottom: 14 }}>Le terrain</div>
              <p style={{ fontSize: 15, margin: "0 0 14px" }}>Boulodrome de Nibelle<br />Rue du Stade, 45340 Nibelle</p>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="#" aria-label="Instagram" className="social-btn" style={{ width: 42, height: 42, borderRadius: 999, border: "1px solid rgba(212,164,55,.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-lt)" }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="6" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" /></svg>
                </a>
                <a href="#" aria-label="Facebook" className="social-btn" style={{ width: 42, height: 42, borderRadius: 999, border: "1px solid rgba(212,164,55,.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-lt)" }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 8h2.5V4.5H14c-2.2 0-3.6 1.5-3.6 3.7V10H8v3.5h2.4V21H14v-7.5h2.6L17 10h-3V8.4c0-.3.2-.4.4-.4z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "20px 24px 34px", borderTop: "1px solid rgba(212,164,55,.14)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", fontSize: 13, color: "rgba(246,236,217,.45)" }}>
            <span>© {CLUB.foundedYear} {CLUB.fullName} — Association loi 1901</span>
            <span style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "rgba(246,236,217,.45)" }}>Mentions légales</a>
              <Link href="/nous-trouver" style={{ color: "rgba(246,236,217,.45)" }}>Contact</Link>
            </span>
          </div>
        </footer>

        {/* ══ MODALE INSCRIPTION ══ */}
        {modal && (
          <div
            onClick={() => setModal(false)}
            style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(20,18,15,.72)", backdropFilter: "blur(4px)", animation: "bdo-fade .2s ease" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: "min(520px,100%)", maxHeight: "88vh", overflow: "auto", background: "var(--cream)", borderRadius: "var(--radius-lg)", padding: "clamp(26px,3.4vw,40px)", boxShadow: "var(--shadow-lg)", animation: "bdo-rise .28s ease both" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold-dp)" }}>Samedi 29 août · {HIGHLIGHT.place}</div>
                  <h3 style={{ fontSize: 30, margin: "8px 0 0" }}>Inscription au concours</h3>
                </div>
                <button onClick={() => setModal(false)} aria-label="Fermer" style={{ flex: "0 0 auto", width: 40, height: 40, borderRadius: 999, border: "1px solid rgba(27,24,21,.15)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24 }}>
                <div className="field"><label>Joueur 1</label><input className="input" placeholder="Prénom Nom" /></div>
                <div className="field"><label>Joueur 2</label><input className="input" placeholder="Prénom Nom" /></div>
              </div>
              <div className="field" style={{ marginTop: 14 }}><label>Email de contact</label><input className="input" placeholder="equipe@exemple.fr" /></div>
              <div className="field" style={{ marginTop: 14 }}><label>Téléphone</label><input className="input" placeholder="06 12 34 56 78" /></div>
              <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: "var(--radius-md)", background: "rgba(212,164,55,.16)", fontSize: 14 }}>
                Concours <strong>gratuit</strong> — doublette, 14h30. Buvette et restauration sur place.
              </div>
              <button onClick={() => setModal(false)} className="gold-btn" style={{ width: "100%", marginTop: 20, padding: 17, borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 16, cursor: "pointer" }}>
                Valider l'inscription
              </button>
              <button onClick={() => setModal(false)} style={{ width: "100%", marginTop: 8, padding: 13, borderRadius: 999, border: 0, background: "transparent", color: "rgba(27,24,21,.55)", fontSize: 14, cursor: "pointer" }}>Annuler</button>
            </div>
          </div>
        )}
      </div>
    </ModalContext.Provider>
  );
}
