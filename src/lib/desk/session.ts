/*
  Desk sign-in. A passcode Mark sets (DESK_PASSCODE) exchanges for a signed,
  httpOnly session cookie (HMAC-SHA256 with DESK_SESSION_SECRET), good for
  30 days. Web Crypto only, so the same code runs in middleware and on the
  server. When Mark's Supabase project exists this can move to Supabase
  Auth email codes without touching any screen.
*/
export const SESSION_COOKIE = "ibv_desk";
const DAYS = 30;

const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function key(secret: string) {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

export function sessionSecret(): string | null {
  const s = process.env.DESK_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

export async function signSession(who: string, secret: string, now = Date.now()) {
  const payload = `${who}.${now + DAYS * 86_400_000}`;
  const sig = b64url(await crypto.subtle.sign("HMAC", await key(secret), enc.encode(payload)));
  return `${payload}.${sig}`;
}

export async function readSession(token: string | undefined, secret: string | null, now = Date.now()): Promise<{ who: string } | null> {
  if (!token || !secret) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const payload = token.slice(0, i);
  const expected = b64url(await crypto.subtle.sign("HMAC", await key(secret), enc.encode(payload)));
  // Constant-time compare.
  const got = token.slice(i + 1);
  if (got.length !== expected.length) return null;
  let diff = 0;
  for (let k = 0; k < got.length; k++) diff |= got.charCodeAt(k) ^ expected.charCodeAt(k);
  if (diff) return null;
  const [who, exp] = [payload.slice(0, payload.lastIndexOf(".")), Number(payload.slice(payload.lastIndexOf(".") + 1))];
  if (!who || !Number.isFinite(exp) || exp < now) return null;
  return { who };
}

export async function passcodeMatches(given: string, expected: string | undefined) {
  if (!expected || expected.length < 6) return false;
  const [a, b] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(given)), crypto.subtle.digest("SHA-256", enc.encode(expected))]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let k = 0; k < x.length; k++) diff |= x[k] ^ y[k];
  return diff === 0;
}
