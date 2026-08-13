"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { concours, photos, type NewConcours } from "@/db/schema";
import { checkPassword, createSessionCookie, SESSION_COOKIE } from "@/lib/auth";
import { deleteImage } from "@/lib/storage";
import { GALLERY_CATS } from "@/data/club";

const isProd = process.env.NODE_ENV === "production";

// ── Auth ───────────────────────────────────────────────────────────────
export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin") || "/admin";

  if (!checkPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }
  const c = await createSessionCookie();
  (await cookies()).set(c.name, c.value, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: c.maxAge,
  });
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ── CRUD concours ──────────────────────────────────────────────────────
function parseForm(formData: FormData): NewConcours {
  const dateStr = String(formData.get("eventDate") ?? "");
  const [y, m, d] = dateStr.split("-").map(Number);
  const eventDate = y && m && d ? new Date(y, m - 1, d) : new Date();

  const pct = Number(formData.get("fillPct") ?? 0);
  const status = String(formData.get("status") ?? "ouvert") === "bientot" ? "bientot" : "ouvert";

  return {
    name: String(formData.get("name") ?? "").trim(),
    eventDate,
    type: String(formData.get("type") ?? "Doublette").trim() || "Doublette",
    time: String(formData.get("time") ?? "").trim(),
    place: String(formData.get("place") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    dotation: String(formData.get("dotation") ?? "").trim(),
    places: String(formData.get("places") ?? "").trim(),
    fillPct: Number.isFinite(pct) ? Math.min(100, Math.max(0, Math.round(pct))) : 0,
    status,
    description: String(formData.get("description") ?? "").trim(),
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/concours");
  revalidatePath("/vie");
  revalidatePath("/admin");
}

/** Crée (pas d'id) ou met à jour (id présent) un concours. */
export async function saveConcours(formData: FormData) {
  const values = parseForm(formData);
  if (!values.name) {
    redirect("/admin/concours/new?error=name");
  }
  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  if (id) {
    await getDb().update(concours).set(values).where(eq(concours.id, id));
  } else {
    await getDb().insert(concours).values(values);
  }
  revalidateAll();
  redirect("/admin");
}

export async function deleteConcours(formData: FormData) {
  const id = Number(formData.get("id"));
  if (id) {
    await getDb().delete(concours).where(eq(concours.id, id));
    revalidateAll();
  }
  redirect("/admin");
}

// ── Photos ─────────────────────────────────────────────────────────────

/** Redirection interne sûre (évite les open redirects). */
function safeBack(formData: FormData, fallback: string): string {
  const to = String(formData.get("redirectTo") ?? "");
  return to.startsWith("/admin") ? to : fallback;
}

/**
 * Enregistre en base les photos déjà uploadées côté client vers Vercel Blob.
 * Légende et catégorie communes à tout le lot. Appelé par le composant client
 * après que les fichiers ont été envoyés directement à Blob.
 */
export async function attachPhotos(
  urls: string[],
  captionInput: string,
  categoryInput: string,
  concoursId: number | null,
): Promise<{ ok: boolean; count: number }> {
  const clean = urls.filter((u) => typeof u === "string" && /^https:\/\//.test(u));
  if (clean.length === 0) return { ok: false, count: 0 };

  const category = (GALLERY_CATS as readonly string[]).includes(categoryInput) && categoryInput !== "Tout" ? categoryInput : "Concours";
  const caption = String(captionInput ?? "").trim();

  await getDb().insert(photos).values(
    clean.map((url) => ({ url, caption, category, concoursId: concoursId ?? null })),
  );
  revalidateAll();
  return { ok: true, count: clean.length };
}

export async function deletePhoto(formData: FormData) {
  const id = Number(formData.get("id"));
  const concoursId = Number(formData.get("concoursId")) || null;
  const back = safeBack(formData, concoursId ? `/admin/concours/${concoursId}` : "/admin/galerie");

  if (id) {
    const [row] = await getDb().select().from(photos).where(eq(photos.id, id));
    if (row) {
      await deleteImage(row.url);
      await getDb().delete(photos).where(eq(photos.id, id));
      revalidateAll();
    }
  }
  redirect(back);
}
