/*
  The funnel's first gate: is this a real person with a real phone number?
  Pure checks only; the human check is the "reached" step on the desk.
*/

/** A US phone number a person could actually answer, as 10 digits, or null. */
export function normalizePhone(raw: string | undefined): string | null {
  let d = (raw ?? "").replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length !== 10) return null;
  // NANP: area code and exchange can't start with 0 or 1.
  if (/^[01]/.test(d) || /^[01]/.test(d.slice(3))) return null;
  // 555-01XX is reserved for fiction; N11 codes aren't area codes.
  if (d.slice(3, 6) === "555" && d.slice(6, 8) === "01") return null;
  if (/^\d11/.test(d)) return null;
  // All one digit, or a straight run, is a keyboard mash.
  if (/^(\d)\1{9}$/.test(d) || d === "1234567890" || d === "0123456789") return null;
  return d;
}

export const formatPhone = (d: string) => `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;

export function cleanName(raw: string | undefined): string | null {
  const n = (raw ?? "").replace(/\s+/g, " ").trim();
  if (n.length < 2 || n.length > 60) return null;
  if (!/[a-zA-ZÀ-ɏ]/.test(n)) return null;
  if (/https?:|www\.|@|<|>/.test(n)) return null;
  return n.replace(/\b\w/g, (c) => c.toUpperCase());
}

export const normalizeVin = (raw?: string) => {
  const v = (raw ?? "").toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "");
  return v.length === 17 ? v : undefined;
};

/** Signals that a submission came from a script, not a person on a phone. */
export function botSignals(input: { honeypot?: string; startedAt?: number; now?: number }): string[] {
  const out: string[] = [];
  if (input.honeypot) out.push("honeypot");
  if (input.startedAt && (input.now ?? Date.now()) - input.startedAt < 2500) out.push("too-fast");
  return out;
}

/** In-memory sliding window per key (IP). Enough for one server; Supabase adds a durable one later. */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60_000, now = Date.now()): boolean {
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > limit;
}
