import type { PhotoRow } from "@/db/schema";
import { GALLERY_CATS } from "@/data/club";
import { uploadPhoto } from "./actions";
import DeletePhotoButton from "./DeletePhotoButton";
import PhotoDropzone from "./PhotoDropzone";

const CATS = GALLERY_CATS.filter((c) => c !== "Tout");
const labelStyle = { display: "block", fontSize: 12, marginBottom: 5, color: "rgba(27,24,21,.7)" } as const;

const ERRORS: Record<string, string> = {
  empty: "Aucun fichier sélectionné.",
  type: "Le fichier n'est pas une image.",
  size: "Image trop lourde (8 Mo maximum).",
  save: "Échec de l'enregistrement de l'image.",
};

export default function PhotoManager({
  photos,
  redirectTo,
  concoursId,
  defaultCategory = "Concours",
  title = "Photos",
  subtitle = "Ajoutez des photos : elles apparaissent dans la galerie « La vie du club ».",
  error,
}: {
  photos: PhotoRow[];
  redirectTo: string;
  concoursId?: number;
  defaultCategory?: string;
  title?: string;
  subtitle?: string;
  error?: string;
}) {
  return (
    <section style={{ marginTop: 40, maxWidth: 760 }}>
      <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)", margin: "0 0 6px" }}>{title}</h2>
      <p style={{ fontSize: 14, color: "rgba(27,24,21,.6)", margin: "0 0 20px" }}>{subtitle}</p>

      {error && ERRORS[error] && (
        <p style={{ margin: "0 0 16px", fontSize: 14, color: "#b42828" }}>{ERRORS[error]}</p>
      )}

      {photos.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12, marginBottom: 24 }}>
          {photos.map((p) => (
            <figure key={p.id} style={{ position: "relative", margin: 0, borderRadius: "var(--radius-md)", overflow: "hidden", background: "rgba(27,24,21,.06)", aspectRatio: "1", border: "1px solid rgba(27,24,21,.08)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span style={{ position: "absolute", left: 6, bottom: 6, padding: "3px 8px", borderRadius: 999, background: "rgba(20,18,15,.7)", color: "#f6ecd9", fontSize: 10, letterSpacing: ".04em" }}>{p.category}</span>
              <DeletePhotoButton id={p.id} concoursId={concoursId} redirectTo={redirectTo} />
            </figure>
          ))}
        </div>
      )}

      <form action={uploadPhoto} style={{ display: "flex", flexDirection: "column", gap: 14, padding: 20, background: "var(--cream)", border: "1px solid rgba(27,24,21,.08)", borderRadius: "var(--radius-lg)" }}>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        {concoursId ? <input type="hidden" name="concoursId" value={concoursId} /> : null}
        <div className="field">
          <label style={labelStyle}>Images</label>
          <PhotoDropzone />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
          <div className="field">
            <label style={labelStyle}>Légende (appliquée à tout le lot)</label>
            <input className="input" name="caption" placeholder="Podium du concours d'été" />
          </div>
          <div className="field">
            <label style={labelStyle}>Catégorie (galerie)</label>
            <select className="input" name="category" defaultValue={defaultCategory}>
              {CATS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button type="submit" className="gold-btn" style={{ padding: "12px 24px", borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 15, cursor: "pointer" }}>
            Ajouter les photos
          </button>
        </div>
      </form>
    </section>
  );
}
