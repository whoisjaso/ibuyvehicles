"use server";

import { headers } from "next/headers";
import { deskStore } from "@/lib/desk/store";
import { cleanName, rateLimited } from "@/lib/desk/lead-quality";

/* The seller's signature. Public by design: the unguessable link is the key, and it works once. */
export async function signDocument(token: string, name: string, image: string, scrolledToEnd: boolean): Promise<{ ok: true } | { ok: false; error: string }> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(`sign:${ip}`, 10, 10 * 60_000)) return { ok: false, error: "Too many tries. Wait a few minutes." };
  if (!scrolledToEnd) return { ok: false, error: "Read it through to the end first." };
  const clean = cleanName(name);
  if (!clean) return { ok: false, error: "Type your full name." };
  if (!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(image) || image.length > 250_000 || image.length < 800) return { ok: false, error: "Sign in the box first." };
  const store = deskStore();
  if (!store || !/^[A-Za-z0-9_-]{20,64}$/.test(token)) return { ok: false, error: "This link isn't valid." };
  const hit = await store.findBySignToken(token);
  if (!hit) return { ok: false, error: "This link isn't valid any more. Ask Mark for a new one." };
  if (hit.doc.signature) return { ok: false, error: "This was already signed." };
  const ok = await store.sign(hit.doc.id, { name: clean, image, at: new Date().toISOString(), scrolledToEnd: true, ip });
  if (!ok) return { ok: false, error: "This was already signed." };
  await store.addEvent(hit.buy.id, { kind: "document-signed", text: `Bill of sale signed by ${clean}`, by: "seller" });
  return { ok: true };
}
