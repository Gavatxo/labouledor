import Link from "next/link";
import type { ConcoursRow } from "@/db/schema";
import { saveConcours } from "./actions";

const TYPES = ["Doublette", "Triplette", "Tête-à-tête", "Mêlée"];

function toDateInput(d: Date | null): string {
  if (!d) return "";
  const dt = d instanceof Date ? d : new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

const labelStyle = { display: "block", fontSize: 12, marginBottom: 5, color: "rgba(27,24,21,.7)" } as const;

export default function ConcoursForm({ row }: { row?: ConcoursRow }) {
  const editing = Boolean(row);

  return (
    <form action={saveConcours} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
      {row && <input type="hidden" name="id" value={row.id} />}

      <div className="field">
        <label style={labelStyle}>Nom du concours *</label>
        <input className="input" name="name" required defaultValue={row?.name ?? ""} placeholder="Concours du Camping" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <div className="field">
          <label style={labelStyle}>Date *</label>
          <input className="input" type="date" name="eventDate" required defaultValue={toDateInput(row?.eventDate ?? null)} />
        </div>
        <div className="field">
          <label style={labelStyle}>Heure</label>
          <input className="input" name="time" defaultValue={row?.time ?? "14h30"} placeholder="14h30" />
        </div>
        <div className="field">
          <label style={labelStyle}>Format</label>
          <select className="input" name="type" defaultValue={row?.type ?? "Doublette"}>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label style={labelStyle}>Lieu</label>
        <input className="input" name="place" defaultValue={row?.place ?? ""} placeholder="Boulodrome de Nibelle" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <div className="field">
          <label style={labelStyle}>Prix / inscription</label>
          <input className="input" name="price" defaultValue={row?.price ?? "Gratuit"} placeholder="8 € / équipe" />
        </div>
        <div className="field">
          <label style={labelStyle}>Dotation</label>
          <input className="input" name="dotation" defaultValue={row?.dotation ?? ""} placeholder="300 € + lots" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <div className="field">
          <label style={labelStyle}>Places (texte affiché)</label>
          <input className="input" name="places" defaultValue={row?.places ?? ""} placeholder="24 places restantes" />
        </div>
        <div className="field">
          <label style={labelStyle}>Remplissage (%)</label>
          <input className="input" type="number" name="fillPct" min={0} max={100} defaultValue={row?.fillPct ?? 0} />
        </div>
        <div className="field">
          <label style={labelStyle}>Statut</label>
          <select className="input" name="status" defaultValue={row?.status ?? "ouvert"}>
            <option value="ouvert">Ouvert</option>
            <option value="bientot">Bientôt</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label style={labelStyle}>Description</label>
        <textarea className="input" name="description" defaultValue={row?.description ?? ""} rows={4} style={{ minHeight: 90, resize: "vertical", borderRadius: "var(--radius-md)" }} placeholder="Doublettes formées sur place, buvette, barbecue…" />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button type="submit" className="gold-btn" style={{ padding: "14px 26px", borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 15, cursor: "pointer" }}>
          {editing ? "Enregistrer les modifications" : "Créer le concours"}
        </button>
        <Link href="/admin" style={{ padding: "14px 26px", borderRadius: 999, border: "1px solid rgba(27,24,21,.2)", color: "rgba(27,24,21,.7)", fontFamily: "var(--font-heading)", fontSize: 15 }}>Annuler</Link>
      </div>
    </form>
  );
}
