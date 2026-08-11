/**
 * Authentification back-office — mot de passe partagé (V1).
 * Le cookie contient `<expiration>.<signature HMAC>` ; aucune donnée sensible.
 * Web Crypto → fonctionne aussi bien en middleware (edge) qu'en server action.
 */

export const SESSION_COOKIE = "bdo_session";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 h

const enc = new TextEncoder();

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET manquant — voir .env.example");
  return s;
}

function toBase64Url(bytes: ArrayBuffer): string {
  const b = Buffer.from(bytes).toString("base64");
  return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return toBase64Url(sig);
}

/** Compare le mot de passe fourni à ADMIN_PASSWORD (temps ~constant). */
export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD manquant — voir .env.example");
  if (password.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export type SessionCookie = { name: string; value: string; maxAge: number };

/** Valeur de cookie signée à poser après un login réussi. */
export async function createSessionCookie(): Promise<SessionCookie> {
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  const value = `${exp}.${await hmac(String(exp))}`;
  return { name: SESSION_COOKIE, value, maxAge: MAX_AGE_SECONDS };
}

/** Vérifie signature + expiration. */
export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return sig === (await hmac(expStr));
}
