"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { concours, type NewConcours } from "@/db/schema";
import { checkPassword, createSessionCookie, SESSION_COOKIE } from "@/lib/auth";

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
