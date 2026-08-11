"use client";

import { deleteConcours } from "./actions";

export default function DeleteConcoursButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={deleteConcours}
      onSubmit={(e) => {
        if (!confirm(`Supprimer le concours « ${name} » ? Cette action est définitive.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        style={{ fontSize: 13, padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(180,40,40,.35)", background: "transparent", color: "#b42828", cursor: "pointer" }}
      >
        Supprimer
      </button>
    </form>
  );
}
