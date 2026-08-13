"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { attachPhotos } from "./actions";

type Item = { file: File; url: string };

const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Uploader de galerie : glisser-déposer de plusieurs images, envoyées
 * directement du navigateur vers Vercel Blob (contourne la limite de taille
 * des Server Actions), puis enregistrées en base via `attachPhotos` avec une
 * légende et une catégorie communes au lot.
 */
export default function PhotoDropzone({
  concoursId,
  defaultCategory,
  cats,
}: {
  concoursId?: number;
  defaultCategory: string;
  cats: readonly string[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [drag, setDrag] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => items.forEach((i) => URL.revokeObjectURL(i.url)), [items]);

  function setFiles(next: Item[]) {
    const dt = new DataTransfer();
    next.forEach((i) => dt.items.add(i.file));
    if (inputRef.current) inputRef.current.files = dt.files;
    setItems(next);
  }

  function add(list: FileList | null) {
    if (!list) return;
    setError(null);
    const next = [...items];
    for (const file of Array.from(list)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > MAX_BYTES) { setError(`« ${file.name} » dépasse 8 Mo.`); continue; }
      if (next.some((i) => i.file.name === file.name && i.file.size === file.size)) continue;
      next.push({ file, url: URL.createObjectURL(file) });
    }
    setFiles(next);
  }

  function remove(idx: number) {
    URL.revokeObjectURL(items[idx].url);
    setFiles(items.filter((_, i) => i !== idx));
  }

  async function submit() {
    if (!items.length || busy) return;
    setBusy(true);
    setDone(0);
    setError(null);
    try {
      const urls: string[] = [];
      for (const it of items) {
        const res = await upload(it.file.name, it.file, {
          access: "public",
          handleUploadUrl: "/admin/blob-upload",
          contentType: it.file.type,
          multipart: it.file.size > 4 * 1024 * 1024,
        });
        urls.push(res.url);
        setDone((d) => d + 1);
      }
      const r = await attachPhotos(urls, caption, category, concoursId ?? null);
      if (!r.ok) throw new Error("Enregistrement impossible");
      items.forEach((i) => URL.revokeObjectURL(i.url));
      setItems([]);
      setCaption("");
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    } catch (e) {
      setError((e as Error).message || "Échec de l'envoi. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  const labelStyle = { display: "block", fontSize: 12, marginBottom: 5, color: "rgba(27,24,21,.7)" } as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        onClick={() => !busy && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!busy) setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); if (!busy) add(e.dataTransfer.files); }}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "34px 20px", textAlign: "center", cursor: busy ? "default" : "pointer",
          border: `2px dashed ${drag ? "var(--gold)" : "rgba(27,24,21,.25)"}`,
          borderRadius: "var(--radius-md)",
          background: drag ? "rgba(216,177,90,.10)" : "rgba(27,24,21,.02)",
          opacity: busy ? 0.6 : 1,
          transition: "border-color .15s, background .15s",
        }}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => add(e.target.files)} style={{ display: "none" }} />
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 17, color: "#14120f" }}>Glissez-déposez vos images ici</span>
        <span style={{ fontSize: 13, color: "rgba(27,24,21,.6)" }}>ou cliquez pour parcourir · plusieurs fichiers acceptés · JPG/PNG/WebP, 8&nbsp;Mo max</span>
      </div>

      {error && <p style={{ margin: 0, fontSize: 14, color: "#b42828" }}>{error}</p>}

      {items.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(27,24,21,.75)" }}>
              {items.length} image{items.length > 1 ? "s" : ""} prête{items.length > 1 ? "s" : ""} à l&apos;envoi
            </span>
            {!busy && (
              <button type="button" onClick={() => setFiles([])} style={{ background: "none", border: 0, color: "#b42828", fontSize: 13, cursor: "pointer", padding: 0 }}>Tout retirer</button>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 10 }}>
            {items.map((it, i) => (
              <figure key={it.url} style={{ position: "relative", margin: 0, aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(27,24,21,.1)", background: "rgba(27,24,21,.06)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.url} alt={it.file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {!busy && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); remove(i); }} aria-label={`Retirer ${it.file.name}`} style={{ position: "absolute", top: 4, right: 4, width: 24, height: 24, borderRadius: 999, border: 0, background: "rgba(20,18,15,.72)", color: "#fff", fontSize: 14, lineHeight: 1, cursor: "pointer" }}>×</button>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
        <div className="field">
          <label style={labelStyle}>Légende (appliquée à tout le lot)</label>
          <input className="input" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Podium du concours d'été" disabled={busy} />
        </div>
        <div className="field">
          <label style={labelStyle}>Catégorie (galerie)</label>
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)} disabled={busy}>
            {cats.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={submit}
          disabled={busy || items.length === 0}
          className="gold-btn"
          style={{ padding: "12px 24px", borderRadius: 999, border: 0, background: "var(--gold)", color: "#14120f", fontFamily: "var(--font-heading)", fontSize: 15, cursor: busy || !items.length ? "default" : "pointer", opacity: busy || !items.length ? 0.55 : 1 }}
        >
          {busy ? `Envoi… ${done}/${items.length}` : items.length > 1 ? `Ajouter les ${items.length} photos` : "Ajouter la photo"}
        </button>
      </div>
    </div>
  );
}
