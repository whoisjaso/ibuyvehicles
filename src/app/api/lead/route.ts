import { NextResponse } from "next/server";
import { business } from "@/data/business";
import { deskStore } from "@/lib/desk/store";
import { botSignals, cleanName, formatPhone, normalizePhone, normalizeVin, rateLimited } from "@/lib/desk/lead-quality";
import type { Channel, Damage, Drive, StepData, TitleRoute } from "@/lib/desk/types";

/*
  Lead delivery, first match wins:
  1. LEAD_WEBHOOK_URL: POSTs the JSON (n8n, Zapier, Make, a CRM, the sale desk).
  2. RESEND_API_KEY + LEAD_TO_EMAIL: plain email through Resend.
  3. Neither: logs to the server console (development).
  Every lead carries a titleRoute code so the sale desk opens the right paperwork path.
*/

const MAX = 1200;
const ROUTES = new Set(["in-hand", "not-in-name", "lost", "salvage", "dealer"]);
const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : undefined);
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 20_000) return NextResponse.json({ ok: false }, { status: 413 });
    b = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Real people only: a filled honeypot or an instant submit is a script; it gets a quiet "ok" and goes nowhere.
  if (botSignals({ honeypot: clean(b.company), startedAt: num(b.startedAt) }).length) return NextResponse.json({ ok: true });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(`lead:${ip}`, 6, 30 * 60_000)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const v = (b.vehicle ?? {}) as Record<string, unknown>;
  const e = (b.estimate ?? {}) as Record<string, unknown>;
  const lead = {
    name: clean(b.name),
    phone: clean(b.phone),
    zip: clean(b.zip),
    preferredContact: clean(b.preferredContact),
    intent: clean(b.intent),
    titleRoute: ROUTES.has(String(b.titleRoute)) ? String(b.titleRoute) : undefined,
    vehicle: {
      vin: clean(v.vin),
      year: num(v.year),
      make: clean(v.make),
      model: clean(v.model),
      body: clean(v.body),
      miles: num(v.miles),
      drive: clean(v.drive),
      damage: clean(v.damage),
      keys: clean(v.keys),
      partsMissing: clean(v.parts),
    },
    estimate: { low: num(e.low), high: num(e.high), ai: e.ai === true },
    competingOffer: num(b.competingOffer),
    notes: clean(b.notes),
    page: clean(b.page),
    utm: Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]
        .map((k) => [k, clean(b[k])])
        .filter(([, x]) => x),
    ),
    receivedAt: new Date().toISOString(),
  };

  const name = cleanName(lead.name);
  const phone = normalizePhone(lead.phone);
  if (!name) return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  if (!phone) return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 422 });
  lead.name = name;
  lead.phone = formatPhone(phone);

  // Into Mark's desk: one buy per seller and car; a repeat lands on the open buy instead of a second one.
  let deskId: string | undefined;
  const store = deskStore();
  if (store) {
    try {
      const vin = normalizeVin(lead.vehicle.vin);
      const dup = await store.findOpenDuplicate(phone, vin);
      if (dup) {
        deskId = dup.id;
        await store.addEvent(dup.id, { kind: "duplicate-lead", text: `Came back through ${lead.intent ?? "the site"}${lead.notes ? `: ${lead.notes}` : ""}` });
      } else {
        const buy = await store.create({ channel: channelOf(lead.intent), source: { page: lead.page, utm: lead.utm as Record<string, string>, estimateAi: lead.estimate.ai }, stepData: stepDataOf(lead, phone, vin) }, { kind: "created", text: lead.notes ? `Note from seller: ${lead.notes}` : undefined });
        deskId = buy.id;
      }
    } catch (err) {
      console.error("desk write failed", err);
    }
  }

  try {
    const hook = process.env.LEAD_WEBHOOK_URL;
    const key = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_TO_EMAIL;
    const car = [lead.vehicle.year, lead.vehicle.make, lead.vehicle.model].filter(Boolean).join(" ") || "vehicle";
    if (hook) {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...lead, deskId }) });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } else if (key && to) {
      const range = lead.estimate.low ? `$${lead.estimate.low} to $${lead.estimate.high}` : "no range";
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev",
          to,
          subject: `New offer request: ${car} (${lead.titleRoute ?? "title ?"}, ${range})`,
          text: `New ${business.name} lead${deskId ? `\n\nOpen it on the desk: ${business.siteUrl}/desk/buys/${deskId}` : ""}\n\n${JSON.stringify(lead, null, 2)}`,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
    } else if (!deskId) {
      console.log("[lead]", JSON.stringify(lead));
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead delivery failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}

const DRIVES: Drive[] = ["drives", "starts-only", "no-start"];
const DAMAGES: Damage[] = ["none", "minor", "major", "flood", "fire"];
const TITLES: TitleRoute[] = ["in-hand", "not-in-name", "lost", "salvage", "dealer"];

function channelOf(intent?: string): Channel {
  if (intent === "chat") return "chat";
  if (intent === "dealer") return "dealer";
  return "estimate";
}

type Lead = { name?: string; zip?: string; preferredContact?: string; titleRoute?: string; vehicle: Record<string, unknown>; estimate: { low?: number; high?: number } };

function stepDataOf(lead: Lead, phone: string, vin?: string): StepData {
  const v = lead.vehicle;
  const pick = <T extends string>(x: unknown, list: T[]) => (list.includes(x as T) ? (x as T) : undefined);
  const car = { ...(vin ? { vin } : {}), ...(typeof v.year === "number" ? { year: v.year } : {}), ...(v.make ? { make: String(v.make) } : {}), ...(v.model ? { model: String(v.model) } : {}), ...(v.body ? { body: String(v.body) } : {}), ...(typeof v.miles === "number" ? { miles: v.miles } : {}) };
  const drive = pick(v.drive, DRIVES);
  const damage = pick(v.damage, DAMAGES);
  const keys = v.keys === "yes" || v.keys === "no" ? v.keys : undefined;
  const parts = typeof v.partsMissing === "string" && v.partsMissing ? v.partsMissing.split(/,\s*/) : undefined;
  const route = pick(lead.titleRoute, TITLES);
  return {
    seller: { name: lead.name, phone, ...(lead.zip ? { zip: lead.zip } : {}), ...(lead.preferredContact === "call" || lead.preferredContact === "text" ? { prefers: lead.preferredContact } : {}) },
    ...(Object.keys(car).length ? { car } : {}),
    ...(drive || damage || keys ? { condition: { drive, damage, keys, parts } } : {}),
    ...(route ? { title: { route } } : {}),
    ...(lead.estimate.low ? { estimate: { low: lead.estimate.low, high: lead.estimate.high } } : {}),
  };
}
