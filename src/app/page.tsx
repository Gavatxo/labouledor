import Link from "next/link";
import ModalTrigger from "@/components/ModalTrigger";
import FeatureIcon from "@/components/FeatureIcon";
import { FEATURES, PARTNERS, IMAGES } from "@/data/club";
import { getEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const upcoming = (await getEvents()).filter((e) => !e.past);
  const next = upcoming[0];
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "82vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "var(--ink)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.equipe} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 45%", filter: "saturate(.72) contrast(1.02) brightness(.72)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(20,18,15,.55) 0%,rgba(20,18,15,.25) 35%,rgba(20,18,15,.92) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "0 24px 74px", width: "100%" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(212,164,55,.5)", color: "var(--gold-lt)", fontSize: 12, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", animation: "bdo-rise .5s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--gold)" }} />Club de pétanque · Nibelle (45)
          </span>
          <h1 style={{ fontSize: "clamp(46px,8.4vw,108px)", lineHeight: ".94", color: "#f6ecd9", margin: "22px 0 0", maxWidth: "15ch", textWrap: "balance", animation: "bdo-rise .6s ease both", animationDelay: ".06s" }}>
            La pétanque,<br /><span style={{ color: "var(--gold)" }}>à notre façon.</span>
          </h1>
          <p style={{ fontSize: "clamp(17px,1.5vw,21px)", color: "rgba(246,236,217,.82)", maxWidth: "52ch", margin: "26px 0 34px", animation: "bdo-rise .6s ease both", animationDelay: ".14s" }}>
            Une bande de jeunes Nibellois passionnés de pétanque, avec une seule envie : faire vivre notre village.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, animation: "bdo-rise .6s ease both", animationDelay: ".2s" }}>
            <Link href="/concours" className="gold-btn" style={{ padding: "17px 30px", borderRadius: 999, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 16 }}>Voir les prochains concours</Link>
            <Link href="/rejoindre" className="outline-btn" style={{ padding: "17px 30px", borderRadius: 999, border: "1px solid rgba(246,236,217,.4)", color: "#f6ecd9", fontFamily: "var(--font-heading)", fontSize: 16 }}>Rejoindre le club</Link>
          </div>
        </div>
      </section>

      {/* ══ BANDEAU PROCHAIN CONCOURS ══ */}
      {next && (
        <section style={{ background: "var(--gold)", color: "#14120f" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "22px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "18px 34px", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 19 }}>Prochain concours · {cap(next.dateLabel)}{next.place ? ` — ${next.place}` : ""}</span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <span style={{ padding: "6px 14px", borderRadius: 999, background: "rgba(20,18,15,.12)", fontSize: 13, fontWeight: 700 }}>{next.type}</span>
              {next.price && <span style={{ padding: "6px 14px", borderRadius: 999, background: "rgba(20,18,15,.12)", fontSize: 13, fontWeight: 700 }}>{next.price}</span>}
              <ModalTrigger style={{ padding: "6px 16px", borderRadius: 999, background: "#14120f", color: "var(--gold-lt)", fontSize: 13, fontWeight: 700 }}>S&apos;inscrire →</ModalTrigger>
            </span>
          </div>
        </section>
      )}

      {/* ══ QUI SOMMES-NOUS ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(64px,8vw,112px) 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(34px,5vw,72px)", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold-dp)" }}>Qui sommes-nous ?</span>
            <h2 style={{ fontSize: "clamp(34px,4.2vw,58px)", lineHeight: 1.02, margin: "16px 0 22px", maxWidth: "16ch" }}>Une bande de potes. Un village. Une passion.</h2>
            <p style={{ fontSize: 18, maxWidth: "56ch", color: "rgba(27,24,21,.82)" }}>On est une bande de jeunes de Nibelle passionnés de pétanque. On a décidé de créer un club à notre image : convivial, dynamique et ouvert à tous.</p>
            <p style={{ fontSize: 18, maxWidth: "56ch", color: "rgba(27,24,21,.82)" }}>L&apos;objectif ? Faire vivre notre village, créer du lien, et montrer que la pétanque mérite d&apos;être découverte par toutes les générations.</p>
            <Link href="/club" className="dark-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 14, padding: "15px 26px", borderRadius: 999, background: "var(--ink)", color: "var(--gold-lt)", fontFamily: "var(--font-heading)", fontSize: 15 }}>Découvrir le club →</Link>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", width: "58%", aspectRatio: "1", borderRadius: 999, background: "var(--gold)", opacity: .28, right: -14, top: -26 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.equipe} alt="Les membres du club" className="washed" style={{ position: "relative", width: "100%", aspectRatio: "4/3.2", objectFit: "cover", objectPosition: "50% 42%", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)" }} />
            <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", marginTop: -46, marginLeft: 22, padding: "16px 24px", borderRadius: "var(--radius-md)", background: "var(--ink)", color: "#f6ecd9", boxShadow: "var(--shadow-lg)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 30, color: "var(--gold)" }}>2026</span>
              <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,236,217,.62)" }}>Naissance du club</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCHAINS CONCOURS ══ */}
      <section style={{ background: "var(--color-bg)", paddingBottom: "clamp(64px,8vw,110px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 38 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold-dp)" }}>Le calendrier</span>
              <h2 style={{ fontSize: "clamp(32px,4vw,52px)", margin: "14px 0 0" }}>Les prochains concours</h2>
            </div>
            <Link href="/concours" style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", borderBottom: "2px solid var(--gold)", paddingBottom: 4 }}>Voir tous les concours</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
            {upcoming.map((ev) => {
              const tagBg = ev.tag === "Ouvert" ? "rgba(122,138,94,.25)" : "rgba(212,164,55,.28)";
              return (
                <article key={ev.id} className="lift" style={{ display: "flex", flexDirection: "column", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)", padding: 26 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 74, height: 74, borderRadius: 20, background: "var(--ink)", color: "var(--gold-lt)" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: 27, lineHeight: 1 }}>{ev.day}</span>
                      <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" }}>{ev.month}</span>
                    </div>
                    <span style={{ padding: "7px 14px", borderRadius: 999, background: tagBg, color: "#1b1815", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{ev.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 26, margin: "20px 0 6px" }}>{ev.name}</h3>
                  <span style={{ fontSize: 14, color: "rgba(27,24,21,.6)" }}>{ev.type} · {ev.time} · {ev.place}</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "20px 0 18px" }}>
                    <div style={{ padding: "12px 14px", borderRadius: "var(--radius-md)", background: "rgba(212,164,55,.16)" }}>
                      <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(27,24,21,.55)" }}>Inscription</div>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 20 }}>{ev.price}</div>
                    </div>
                    <div style={{ padding: "12px 14px", borderRadius: "var(--radius-md)", background: "rgba(122,138,94,.18)" }}>
                      <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(27,24,21,.55)" }}>Places</div>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: 20 }}>{ev.left}</div>
                    </div>
                  </div>
                  <div style={{ height: 7, borderRadius: 999, background: "rgba(27,24,21,.1)", overflow: "hidden", marginBottom: 20 }}>
                    <div style={{ height: "100%", borderRadius: 999, background: "var(--gold)", width: ev.pct }} />
                  </div>
                  <ModalTrigger style={{ marginTop: "auto", textAlign: "center", padding: 14, borderRadius: 999, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 15, display: "block" }}>S&apos;inscrire</ModalTrigger>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PAS COMME AVANT ══ */}
      <section style={{ background: "var(--ink)", color: "#f6ecd9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>La pétanque, mais pas comme avant</span>
          <h2 style={{ fontSize: "clamp(34px,4.6vw,64px)", color: "#f6ecd9", margin: "16px 0 46px", maxWidth: "20ch" }}>Plus qu&apos;un sport, un prétexte pour se retrouver.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 18 }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="feature" style={{ padding: "28px 24px", borderRadius: "var(--radius-lg)", background: "var(--ink-2)", border: "1px solid rgba(212,164,55,.18)" }}>
                <div style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(212,164,55,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", marginBottom: 18 }}>
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 style={{ fontSize: 22, color: "#f6ecd9", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(246,236,217,.66)", margin: 0 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LA VIE DU CLUB ══ */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 34 }}>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", margin: 0 }}>La vie du club</h2>
            <Link href="/vie" style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", borderBottom: "2px solid var(--gold)", paddingBottom: 4 }}>Voir la galerie</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.equipe} alt="Soirée du club" style={{ gridColumn: "span 2", width: "100%", height: 340, objectFit: "cover", objectPosition: "50% 40%", borderRadius: "var(--radius-lg)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.podium1} alt="Podium" style={{ width: "100%", height: 340, objectFit: "cover", objectPosition: "50% 30%", borderRadius: "var(--radius-lg)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.podium2} alt="Remise des prix" style={{ width: "100%", height: 340, objectFit: "cover", objectPosition: "50% 35%", borderRadius: "var(--radius-lg)" }} />
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: "var(--color-bg)", paddingBottom: "clamp(64px,8vw,110px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)", background: "var(--gold)", padding: "clamp(44px,6vw,80px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 34, alignItems: "center" }}>
            <div style={{ position: "absolute", width: 340, height: 340, borderRadius: 999, background: "rgba(20,18,15,.09)", right: -90, top: -120 }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontSize: "clamp(34px,4.6vw,60px)", color: "#14120f", margin: "0 0 16px", maxWidth: "16ch" }}>Et si tu venais jouer avec nous ?</h2>
              <p style={{ fontSize: 19, color: "rgba(20,18,15,.78)", maxWidth: "46ch", margin: 0 }}>Que tu sois licencié depuis 20 ans ou que tu n&apos;aies jamais lancé une boule, tu es le bienvenu.</p>
            </div>
            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "flex-end" }}>
              <Link href="/rejoindre" className="dark-btn" style={{ padding: "18px 32px", borderRadius: 999, background: "#14120f", color: "var(--gold-lt)", fontFamily: "var(--font-heading)", fontSize: 17 }}>Rejoindre le club</Link>
              <Link href="/nous-trouver" style={{ padding: "18px 32px", borderRadius: 999, border: "1px solid rgba(20,18,15,.4)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 17 }}>Venir au terrain</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PARTENAIRES ══ */}
      <section style={{ background: "var(--color-bg)", paddingBottom: "clamp(56px,7vw,96px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", margin: "0 0 10px" }}>Ils font vivre le club avec nous</h2>
          <p style={{ fontSize: 15, color: "rgba(27,24,21,.6)", margin: "0 0 32px" }}>Commerces et entreprises de Nibelle et des environs.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 16 }}>
            {PARTNERS.map((pa, i) => (
              <div key={i} style={{ height: 104, borderRadius: "var(--radius-md)", border: "1px dashed rgba(27,24,21,.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(27,24,21,.42)" }}>{pa.label}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
