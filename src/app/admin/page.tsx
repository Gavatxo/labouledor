import Link from "next/link";
import AdminHeader from "./AdminHeader";
import DeleteConcoursButton from "./DeleteConcoursButton";
import { getAllRows, toDisplay } from "@/lib/events";

export const dynamic = "force-dynamic";

const TAG_BG: Record<string, string> = {
  Ouvert: "rgba(122,138,94,.22)",
  Bientôt: "rgba(212,164,55,.28)",
  Terminé: "rgba(27,24,21,.1)",
};

export default async function AdminHome() {
  const rows = await getAllRows();

  return (
    <>
      <AdminHeader />
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(28px,4vw,48px) 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", margin: 0 }}>Les concours</h1>
            <p style={{ fontSize: 15, color: "rgba(27,24,21,.6)", margin: "6px 0 0" }}>{rows.length} concours · créez, modifiez ou supprimez — les changements apparaissent aussitôt sur le site.</p>
          </div>
          <Link href="/admin/concours/new" className="gold-btn" style={{ padding: "13px 22px", borderRadius: 999, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 15 }}>+ Nouveau concours</Link>
        </div>

        {rows.length === 0 ? (
          <div style={{ padding: "60px 24px", textAlign: "center", background: "var(--cream)", border: "1px dashed rgba(27,24,21,.2)", borderRadius: "var(--radius-lg)", color: "rgba(27,24,21,.6)" }}>
            Aucun concours pour l&apos;instant. Cliquez sur « Nouveau concours » pour en ajouter un.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rows.map((row) => {
              const ev = toDisplay(row);
              return (
                <div key={row.id} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, padding: "16px 20px", background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: 14, background: "var(--ink)", color: "var(--gold-lt)" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, lineHeight: 1 }}>{ev.day}</span>
                    <span style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>{ev.month}</span>
                  </div>
                  <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 19 }}>{ev.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(27,24,21,.6)" }}>{ev.type} · {ev.time || "—"} · {ev.place || "lieu à préciser"}</div>
                  </div>
                  <span style={{ padding: "5px 12px", borderRadius: 999, background: TAG_BG[ev.tag] ?? "rgba(27,24,21,.1)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{ev.tag}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link href={`/admin/concours/${row.id}`} style={{ fontSize: 13, padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(27,24,21,.2)", color: "rgba(27,24,21,.8)" }}>Modifier</Link>
                    <DeleteConcoursButton id={row.id} name={ev.name} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
