import "server-only";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { photos, type PhotoRow } from "@/db/schema";

export type GalleryPhoto = { id: number; src: string; alt: string; cat: string };

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const rows = await getDb().select().from(photos).orderBy(desc(photos.createdAt));
  return rows.map((r) => ({ id: r.id, src: r.url, alt: r.caption, cat: r.category }));
}

export async function getConcoursPhotos(concoursId: number): Promise<PhotoRow[]> {
  return getDb().select().from(photos).where(eq(photos.concoursId, concoursId)).orderBy(desc(photos.createdAt));
}

/** Toutes les photos (gestion depuis la Galerie du back-office). */
export async function getAllPhotos(): Promise<PhotoRow[]> {
  return getDb().select().from(photos).orderBy(desc(photos.createdAt));
}
