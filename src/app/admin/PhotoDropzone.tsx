"use client";

import { useEffect, useRef, useState } from "react";

type Item = { file: File; url: string };

/**
 * Zone de glisser-déposer multi-images.
 * Alimente un vrai <input type="file" multiple name="file"> (via DataTransfer),
 * donc la soumission passe par le server action `uploadPhoto` sans fetch manuel.
 * Sans JS, l'input reste utilisable normalement (amélioration progressive).
 */
export default function PhotoDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [drag, setDrag] = useState(false);

  // Révoque les object URLs restants au démontage.
  useEffect(() => () => items.forEach((i) => URL.revokeObjectURL(i.url)), [items]);

  function sync(next: Item[]) {
    const dt = new DataTransfer();
    next.forEach((i) => dt.items.add(i.file));
    if (inputRef.current) inputRef.current.files = dt.files;
    setItems(next);
  }

  function add(list: FileList | null) {
    if (!list) return;
    const next = [...items];
    for (const file of Array.from(list)) {
      if (!file.type.startsWith("image/")) continue;
      if (next.some((i) => i.file.name === file.name && i.file.size === file.size)) continue;
      next.push({ file, url: URL.createObjectURL(file) });
    }
    sync(next);
  }

  function remove(idx: number) {
    URL.revokeObjectURL(items[idx].url);
    sync(items.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "34px 20px", textAlign: "center", cursor: "pointer",
          border: `2px dashed ${drag ? "var(--gold)" : "rgba(27,24,21,.25)"}`,
          borderRadius: "var(--radius-md)",
          background: drag ? "rgba(216,177,90,.10)" : "rgba(27,24,21,.02)",
          transition: "border-color .15s, background .15s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          name="file"
          accept="image/*"
          multiple
          onChange={(e) => add(e.target.files)}
          style={{ display: "none" }}
        />
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 17, color: "#14120f" }}>
          Glissez-déposez vos images ici
        </span>
        <span style={{ fontSize: 13, color: "rgba(27,24,21,.6)" }}>
          ou cliquez pour parcourir · plusieurs fichiers acceptés · JPG/PNG/WebP, 8&nbsp;Mo max
        </span>
      </div>

      {items.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "14px 0 8px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(27,24,21,.75)" }}>
              {items.length} image{items.length > 1 ? "s" : ""} prête{items.length > 1 ? "s" : ""} à l&apos;envoi
            </span>
            <button type="button" onClick={() => sync([])} style={{ background: "none", border: 0, color: "#b42828", fontSize: 13, cursor: "pointer", padding: 0 }}>
              Tout retirer
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 10 }}>
            {items.map((it, i) => (
              <figure key={it.url} style={{ position: "relative", margin: 0, aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(27,24,21,.1)", background: "rgba(27,24,21,.06)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.url} alt={it.file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(i); }}
                  aria-label={`Retirer ${it.file.name}`}
                  style={{ position: "absolute", top: 4, right: 4, width: 24, height: 24, borderRadius: 999, border: 0, background: "rgba(20,18,15,.72)", color: "#fff", fontSize: 14, lineHeight: 1, cursor: "pointer" }}
                >
                  ×
                </button>
              </figure>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
