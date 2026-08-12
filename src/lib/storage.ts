import "server-only";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Stockage des images.
 * - Prod (Vercel) : Vercel Blob si BLOB_READ_WRITE_TOKEN est défini.
 * - Local : écrit dans public/uploads/ (servi statiquement).
 */

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

function extFrom(name: string, type: string): string {
  const fromName = name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
  if (fromName && /^[a-z0-9]{1,5}$/.test(fromName)) return fromName;
  return (type.split("/")[1] || "jpg").toLowerCase();
}

/** Enregistre un fichier image et renvoie son URL publique. */
export async function saveImage(file: File): Promise<string> {
  const key = `${randomUUID()}.${extFrom(file.name, file.type)}`;

  if (useBlob()) {
    const { put } = await import("@vercel/blob");
    const { url } = await put(`photos/${key}`, file, { access: "public", addRandomSuffix: false });
    return url;
  }

  const dir = join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, key), buffer);
  return `/uploads/${key}`;
}

/** Supprime le fichier associé à une URL (best effort). */
export async function deleteImage(url: string): Promise<void> {
  try {
    if (/^https?:\/\//.test(url)) {
      const { del } = await import("@vercel/blob");
      await del(url);
    } else if (url.startsWith("/uploads/")) {
      await unlink(join(process.cwd(), "public", url));
    }
  } catch {
    /* fichier déjà absent : on ignore */
  }
}
