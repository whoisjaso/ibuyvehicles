"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deskStore, newToken, type DeskStore } from "@/lib/desk/store";
import { SESSION_COOKIE, passcodeMatches, readSession, sessionSecret, signSession } from "@/lib/desk/session";
import { billOfSaleFields, canFile, paymentCheck } from "@/lib/desk/bill-of-sale";
import { cleanName, normalizePhone, normalizeVin, rateLimited } from "@/lib/desk/lead-quality";
import { LOST_REASONS, type BuyEvent, type StepData } from "@/lib/desk/types";

/*
  Every write on the desk. Each action checks the session itself (not just
  the middleware), validates its input, and merges only the key it owns,
  against the version the screen was showing.
*/

export type ActionResult = { ok: true } | { ok: false; error: string };

async function who() {
  const s = await readSession((await cookies()).get(SESSION_COOKIE)?.value, sessionSecret());
  if (!s) redirect("/desk/login");
  return s.who;
}

function store(): DeskStore {
  const s = deskStore();
  if (!s) throw new Error("The desk has no database connected.");
  return s;
}

const done = (id?: string): ActionResult => {
  revalidatePath("/desk");
  if (id) revalidatePath(`/desk/buys/${id}`);
  return { ok: true };
};

const conflict: ActionResult = { ok: false, error: "Someone else just changed this buy. The screen has refreshed; check it and answer again." };

async function write(id: string, version: number, patch: Partial<StepData>, event?: Omit<BuyEvent, "at">): Promise<ActionResult> {
  const by = await who();
  const r = await store().merge(id, version, patch);
  if (!r.ok) {
    revalidatePath(`/desk/buys/${id}`);
    return r.error === "conflict" ? conflict : { ok: false, error: "That buy no longer exists." };
  }
  if (event) await store().addEvent(id, { ...event, by });
  return done(id);
}

/* ---------- sign in ---------- */

export async function signIn(_: unknown, form: FormData): Promise<ActionResult> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(`login:${ip}`, 8, 15 * 60_000)) return { ok: false, error: "Too many tries. Wait 15 minutes." };
  const secret = sessionSecret();
  if (!secret || !process.env.DESK_PASSCODE) return { ok: false, error: "The desk isn't set up yet: DESK_PASSCODE and DESK_SESSION_SECRET are missing." };
  if (!(await passcodeMatches(String(form.get("passcode") ?? ""), process.env.DESK_PASSCODE))) return { ok: false, error: "That passcode isn't right." };
  (await cookies()).set(SESSION_COOKIE, await signSession("mark", secret), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 30 * 86_400 });
  const next = String(form.get("next") ?? "");
  redirect(next.startsWith("/desk") ? next : "/desk");
}

export async function signOut() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/desk/login");
}

/* ---------- a buy from a phone call ---------- */

export async function createFromCall(_: unknown, form: FormData): Promise<ActionResult> {
  const by = await who();
  const name = cleanName(String(form.get("name") ?? ""));
  const phone = normalizePhone(String(form.get("phone") ?? ""));
  if (!name) return { ok: false, error: "Add the seller's name." };
  if (!phone) return { ok: false, error: "That phone number doesn't look right." };
  const s = store();
  const dup = await s.findOpenDuplicate(phone);
  if (dup) redirect(`/desk/buys/${dup.id}?dup=1`);
  const buy = await s.create({ channel: form.get("channel") === "text" ? "text" : "call", source: {}, stepData: { seller: { name, phone } } }, { kind: "created", text: "Entered from a call", by });
  redirect(`/desk/buys/${buy.id}`);
}

/* ---------- the corridor, one answer at a time ---------- */

const Id = z.object({ id: z.string().min(1), version: z.coerce.number().int().min(0) });
const read = <T extends z.ZodTypeAny>(schema: T, form: FormData) => schema.safeParse(Object.fromEntries(form)) as z.ZodSafeParseResult<z.infer<T>>;
const bad = (e: z.ZodError) => ({ ok: false as const, error: e.issues[0]?.message ?? "Check that answer." });

export async function answerReach(form: FormData): Promise<ActionResult> {
  const p = read(Id.extend({ how: z.enum(["call", "text", "in-person"]) }), form);
  if (!p.success) return bad(p.error);
  return write(p.data.id, p.data.version, { reached: { at: new Date().toISOString(), how: p.data.how } }, { kind: "reached", text: `Reached by ${p.data.how}` });
}

export async function answerCar(form: FormData): Promise<ActionResult> {
  const p = read(
    Id.extend({
      year: z.coerce.number().int().min(1950, "Check the year.").max(new Date().getFullYear() + 1, "Check the year."),
      make: z.string().trim().min(2, "Add the make."),
      model: z.string().trim().min(1, "Add the model."),
      vin: z.string().optional(),
      miles: z.union([z.literal(""), z.coerce.number().int().min(0).max(2_000_000)]).optional(),
      color: z.string().trim().max(30).optional(),
    }),
    form,
  );
  if (!p.success) return bad(p.error);
  const vin = normalizeVin(p.data.vin);
  if (p.data.vin?.trim() && !vin) return { ok: false, error: "A VIN is 17 characters, without I, O or Q." };
  const d = p.data;
  return write(d.id, d.version, { car: { year: d.year, make: d.make, model: d.model, ...(vin ? { vin } : {}), ...(typeof d.miles === "number" ? { miles: d.miles } : {}), ...(d.color ? { color: d.color } : {}) } });
}

export async function answerCondition(form: FormData): Promise<ActionResult> {
  const p = read(Id.extend({ drive: z.enum(["drives", "starts-only", "no-start"]), damage: z.enum(["none", "minor", "major", "flood", "fire"]), keys: z.enum(["yes", "no"]) }), form);
  if (!p.success) return bad({ issues: [{ message: "Answer all three." }] } as z.ZodError);
  const parts = form.getAll("parts").map(String).filter(Boolean).slice(0, 8);
  return write(p.data.id, p.data.version, { condition: { drive: p.data.drive, damage: p.data.damage, keys: p.data.keys, parts } });
}

export async function answerTitle(form: FormData): Promise<ActionResult> {
  const p = read(Id.extend({ route: z.enum(["in-hand", "not-in-name", "lost", "salvage", "dealer"]), lien: z.enum(["yes", "no"]), lienholder: z.string().trim().max(80).optional() }), form);
  if (!p.success) return bad({ issues: [{ message: "Answer both questions." }] } as z.ZodError);
  if (p.data.lien === "yes" && !p.data.lienholder) return { ok: false, error: "Who holds the loan?" };
  return write(p.data.id, p.data.version, { title: { route: p.data.route, lien: p.data.lien, ...(p.data.lien === "yes" ? { lienholder: p.data.lienholder } : {}) } });
}

export async function answerOffer(form: FormData): Promise<ActionResult> {
  const p = read(Id.extend({ amount: z.coerce.number().int("Whole dollars.").min(1, "Enter the offer.").max(500_000) }), form);
  if (!p.success) return bad(p.error);
  return write(p.data.id, p.data.version, { offer: { amount: p.data.amount, at: new Date().toISOString() }, answer: undefined }, { kind: "offer", text: `Offered $${p.data.amount.toLocaleString("en-US")}` });
}

export async function answerDecision(form: FormData): Promise<ActionResult> {
  const p = read(Id.extend({ decision: z.enum(["yes", "thinking", "no"]), reason: z.string().optional() }), form);
  if (!p.success) return bad(p.error);
  if (p.data.decision === "no") {
    await who();
    const reason = p.data.reason && p.data.reason in LOST_REASONS ? (p.data.reason as keyof typeof LOST_REASONS) : "price-too-low";
    await store().setLost(p.data.id, { reason, at: new Date().toISOString() });
    await store().addEvent(p.data.id, { kind: "lost", text: LOST_REASONS[reason] });
    return done(p.data.id);
  }
  return write(p.data.id, p.data.version, { answer: { decision: p.data.decision, at: new Date().toISOString() } }, { kind: "answer", text: p.data.decision === "yes" ? "Said yes" : "Thinking it over" });
}

export async function answerPickup(form: FormData): Promise<ActionResult> {
  const p = read(Id.extend({ at: z.string().min(10, "Pick a day and time."), address: z.string().trim().min(6, "Add the pickup address."), notes: z.string().trim().max(300).optional() }), form);
  if (!p.success) return bad(p.error);
  // datetime-local is Houston wall time; store it with Houston's offset.
  const when = houstonLocalToIso(p.data.at);
  if (!when) return { ok: false, error: "Pick a day and time." };
  return write(p.data.id, p.data.version, { pickup: { at: when, address: p.data.address, ...(p.data.notes ? { notes: p.data.notes } : {}) } }, { kind: "pickup-set", text: `Pickup ${p.data.at}` });
}

export async function answerSellerId(form: FormData): Promise<ActionResult> {
  const p = read(
    Id.extend({
      nameOnId: z.string().trim().min(3, "Type the name exactly as it is on the ID."),
      address: z.string().trim().min(6, "Type the seller's address."),
      idKind: z.enum(["dl", "state-id", "passport", "other"]),
      idLast4: z.string().trim().regex(/^[A-Za-z0-9]{0,4}$/, "Last four characters only.").optional(),
      matchesTitle: z.enum(["yes", "no", "no-title"]),
    }),
    form,
  );
  if (!p.success) return bad(p.error);
  const d = p.data;
  return write(d.id, d.version, { sellerId: { nameOnId: d.nameOnId, address: d.address, idKind: d.idKind, ...(d.idLast4 ? { idLast4: d.idLast4 } : {}), matchesTitle: d.matchesTitle, confirmedAt: new Date().toISOString() } }, { kind: "id-confirmed", text: d.matchesTitle === "no" ? "ID does NOT match the title" : "ID checked" });
}

export async function fileBillOfSale(form: FormData): Promise<ActionResult> {
  const by = await who();
  const id = String(form.get("id"));
  const b = await store().get(id);
  if (!b) return { ok: false, error: "That buy no longer exists." };
  const check = canFile(b);
  if (!check.ok) return { ok: false, error: check.reason };
  const { fields } = billOfSaleFields(b);
  await store().fileDocument(id, { type: "bill-of-sale", snapshot: fields, signToken: newToken() });
  await store().addEvent(id, { kind: "document-filed", text: "Bill of sale filed", by });
  return done(id);
}

export async function voidDocument(form: FormData): Promise<ActionResult> {
  const by = await who();
  const id = String(form.get("id"));
  const docId = String(form.get("docId"));
  const reason = String(form.get("reason") ?? "").trim();
  if (reason.length < 4) return { ok: false, error: "Say why it's being voided." };
  await store().voidDocument(id, docId, reason);
  await store().addEvent(id, { kind: "document-voided", text: `Bill of sale voided: ${reason}`, by });
  return done(id);
}

export async function answerPayment(form: FormData): Promise<ActionResult> {
  const p = read(Id.extend({ amount: z.coerce.number().int().min(1, "Enter the amount paid."), method: z.enum(["cash", "zelle", "cashapp", "other"]), reason: z.string().trim().max(200).optional() }), form);
  if (!p.success) return bad(p.error);
  const b = await store().get(p.data.id);
  if (!b) return { ok: false, error: "That buy no longer exists." };
  const check = paymentCheck(b, p.data.amount, p.data.reason);
  if (!check.ok) return { ok: false, error: check.reason };
  // A reason is kept only when the amount really differs from the offer.
  const reason = p.data.amount !== b.stepData.offer?.amount ? p.data.reason : undefined;
  return write(p.data.id, p.data.version, { payment: { amount: p.data.amount, method: p.data.method, at: new Date().toISOString(), ...(reason ? { differsReason: reason } : {}) } }, { kind: "paid", text: `Paid $${p.data.amount.toLocaleString("en-US")} by ${p.data.method}${reason ? ` (${reason})` : ""}` });
}

export async function answerPickedUp(form: FormData): Promise<ActionResult> {
  const p = read(Id, form);
  if (!p.success) return bad(p.error);
  return write(p.data.id, p.data.version, { pickedUp: { at: new Date().toISOString() } }, { kind: "picked-up", text: "On the truck" });
}

/* ---------- touches, lost, reopen ---------- */

export async function logTouch(form: FormData): Promise<ActionResult> {
  const by = await who();
  const id = String(form.get("id"));
  const kind = String(form.get("kind"));
  const allowed: Record<string, BuyEvent["kind"]> = { first: "texted", offer: "texted", "follow-up": "follow-up", pickup: "texted", sign: "texted", review: "review-asked", transfer: "transfer-reminded", call: "called" };
  if (!allowed[kind]) return { ok: false, error: "Unknown text." };
  await store().addEvent(id, { kind: allowed[kind], text: String(form.get("label") ?? kind), by });
  return done(id);
}

export async function markLost(form: FormData): Promise<ActionResult> {
  const by = await who();
  const id = String(form.get("id"));
  const reason = String(form.get("reason"));
  if (!(reason in LOST_REASONS)) return { ok: false, error: "Pick a reason." };
  await store().setLost(id, { reason: reason as keyof typeof LOST_REASONS, at: new Date().toISOString() });
  await store().addEvent(id, { kind: "lost", text: LOST_REASONS[reason as keyof typeof LOST_REASONS], by });
  return done(id);
}

export async function reopen(form: FormData): Promise<ActionResult> {
  const by = await who();
  const id = String(form.get("id"));
  await store().setLost(id, null);
  await store().addEvent(id, { kind: "reopened", by });
  return done(id);
}

export async function addNote(form: FormData): Promise<ActionResult> {
  const by = await who();
  const text = String(form.get("text") ?? "").trim().slice(0, 600);
  if (!text) return { ok: false, error: "Write the note first." };
  await store().addEvent(String(form.get("id")), { kind: "note", text, by });
  return done(String(form.get("id")));
}

/** "2026-10-16T14:30" in Houston wall time to an ISO instant, DST-correct. */
function houstonLocalToIso(local: string): string | null {
  const m = local.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const offset = (t: number) => {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(new Date(t));
    const g = (k: string) => Number(parts.find((p) => p.type === k)?.value);
    return Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute")) - t;
  };
  const t = guess - offset(guess);
  return new Date(guess - offset(t)).toISOString();
}
