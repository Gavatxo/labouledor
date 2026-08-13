"use server";

import { sendMail } from "@/lib/mail";

export type FormState = { ok: boolean; error?: string } | null;

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

const GENERIC_ERROR = "Envoi impossible pour le moment. Réessayez, ou écrivez-nous à contact@labouledornibelloise.fr.";

/** Demande d'adhésion (page « Rejoindre »). */
export async function sendJoinRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  const firstName = s(formData, "firstName");
  const lastName = s(formData, "lastName");
  const email = s(formData, "email");
  const phone = s(formData, "phone");
  const level = s(formData, "level");

  if (!firstName || !lastName) return { ok: false, error: "Merci d'indiquer votre prénom et votre nom." };
  if (!email && !phone) return { ok: false, error: "Laissez au moins un email ou un téléphone pour vous recontacter." };

  const text = [
    "Nouvelle demande d'adhésion depuis le site.",
    "",
    `Prénom : ${firstName}`,
    `Nom : ${lastName}`,
    `Email : ${email || "—"}`,
    `Téléphone : ${phone || "—"}`,
    `Niveau : ${level || "—"}`,
  ].join("\n");

  try {
    await sendMail({ subject: `Adhésion — ${firstName} ${lastName}`, text, replyTo: email || undefined });
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
  return { ok: true };
}

/** Inscription à un concours (modale du site). */
export async function sendConcoursInscription(_prev: FormState, formData: FormData): Promise<FormState> {
  const player1 = s(formData, "player1");
  const player2 = s(formData, "player2");
  const email = s(formData, "email");
  const phone = s(formData, "phone");
  const concours = s(formData, "concours");

  if (!player1) return { ok: false, error: "Merci d'indiquer au moins le premier joueur." };
  if (!email && !phone) return { ok: false, error: "Laissez au moins un email ou un téléphone pour vous recontacter." };

  const text = [
    "Nouvelle inscription à un concours depuis le site.",
    "",
    concours ? `Concours : ${concours}` : "Concours : (non précisé)",
    `Joueur 1 : ${player1}`,
    `Joueur 2 : ${player2 || "—"}`,
    `Email : ${email || "—"}`,
    `Téléphone : ${phone || "—"}`,
  ].join("\n");

  try {
    await sendMail({ subject: `Inscription concours — ${player1}${player2 ? ` & ${player2}` : ""}`, text, replyTo: email || undefined });
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
  return { ok: true };
}
