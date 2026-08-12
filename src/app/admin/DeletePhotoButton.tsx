"use client";

import { deletePhoto } from "./actions";

export default function DeletePhotoButton({ id, concoursId }: { id: number; concoursId?: number }) {
  return (
    <form
      action={deletePhoto}
      onSubmit={(e) => {
        if (!confirm("Supprimer cette photo ?")) e.preventDefault();
      }}
      style={{ position: "absolute", top: 8, right: 8 }}
    >
      <input type="hidden" name="id" value={id} />
      {concoursId ? <input type="hidden" name="concoursId" value={concoursId} /> : null}
      <button
        type="submit"
        aria-label="Supprimer la photo"
        style={{ width: 30, height: 30, borderRadius: 999, border: 0, background: "rgba(20,18,15,.72)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, lineHeight: 1 }}
      >
        ×
      </button>
    </form>
  );
}
