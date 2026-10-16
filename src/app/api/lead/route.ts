import { NextResponse } from "next/server";
import { business } from "@/data/business";

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
  if (clean(b.company)) return NextResponse.json({ ok: true }); // honeypot

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

  if (!lead.name || !lead.phone) return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  if ((lead.phone.match(/\d/g) ?? []).length < 10) return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 422 });

  try {
    const hook = process.env.LEAD_WEBHOOK_URL;
    const key = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_TO_EMAIL;
    const car = [lead.vehicle.year, lead.vehicle.make, lead.vehicle.model].filter(Boolean).join(" ") || "vehicle";
    if (hook) {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
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
          text: `New ${business.name} lead\n\n${JSON.stringify(lead, null, 2)}`,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
    } else {
      console.log("[lead]", JSON.stringify(lead));
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead delivery failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
