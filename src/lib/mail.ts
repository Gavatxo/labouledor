import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Envoi d'email via le SMTP de la boîte du club (o2switch).
 * Config par variables d'environnement :
 *   SMTP_HOST   ex. mail.labouledornibelloise.fr
 *   SMTP_PORT   465 (SSL) ou 587 (STARTTLS) — défaut 465
 *   SMTP_USER   contact@labouledornibelloise.fr
 *   SMTP_PASS   mot de passe de la boîte
 *   CONTACT_TO  destinataire (défaut : SMTP_USER)
 */
let cached: Transporter | null = null;

function getTransport(): Transporter {
  if (cached) return cached;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 465);
  if (!host || !user || !pass) {
    throw new Error("SMTP non configuré (SMTP_HOST / SMTP_USER / SMTP_PASS manquants).");
  }
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 → SSL direct ; 587 → STARTTLS
    auth: { user, pass },
  });
  return cached;
}

export async function sendMail(opts: { subject: string; text: string; replyTo?: string }): Promise<void> {
  const transport = getTransport();
  const from = process.env.SMTP_USER!; // doit correspondre à l'authentification o2switch
  const to = process.env.CONTACT_TO || from;
  await transport.sendMail({
    from: `La Boule d'Or Nibelloise <${from}>`,
    to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
}
