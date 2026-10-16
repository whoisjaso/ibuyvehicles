import type { Buy } from "./types";
import { isComplete } from "./guide";

/*
  Where a buy stands and what it needs from Mark next, derived from the
  record. The Today list is just every buy's next action, sorted by urgency.
  Speed is the point: sellers send the same car to several buyers, and the
  first straight number usually wins it.
*/
export type Stage = "new" | "reached" | "offered" | "scheduled" | "bought" | "lost";

export const STAGE_LABEL: Record<Stage, string> = {
  new: "New",
  reached: "Talking",
  offered: "Offered",
  scheduled: "Pickup set",
  bought: "Bought",
  lost: "Lost",
};

export function stageOf(b: Buy): Stage {
  if (b.lost) return "lost";
  if (isComplete(b)) return "bought";
  const s = b.stepData;
  if (s.pickup) return "scheduled";
  if (s.offer) return "offered";
  if (s.reached) return "reached";
  return "new";
}

const MIN = 60_000;
const HOUR = 60 * MIN;

export type Action = { buyId: string; urgency: number; label: string; detail: string; due?: string; tone: "hot" | "today" | "soon" | "later" };

const lastTouch = (b: Buy) => b.events.filter((e) => ["texted", "called", "offer", "follow-up", "reached"].includes(e.kind)).at(-1)?.at ?? b.createdAt;
const has = (b: Buy, kind: string) => b.events.some((e) => e.kind === kind);

export function nextAction(b: Buy, now = new Date()): Action | null {
  const t = now.getTime();
  const s = b.stepData;
  const name = s.seller?.name?.split(" ")[0] || "New seller";
  const car = [s.car?.year, s.car?.make, s.car?.model].filter(Boolean).join(" ") || "Car not set yet";
  const stage = stageOf(b);
  if (stage === "lost") return null;

  if (stage === "new") {
    const waited = Math.max(0, Math.round((t - Date.parse(b.createdAt)) / MIN));
    return { buyId: b.id, urgency: 1000 + waited, label: `Call ${name}`, detail: `${car}. Waiting ${waited < 60 ? `${waited} min` : `${Math.round(waited / 60)} h`}.`, tone: waited >= 5 ? "hot" : "today" };
  }
  if (stage === "bought") {
    const at = Date.parse(s.pickedUp!.at);
    if (!has(b, "review-asked") && t - at >= 2 * HOUR) return { buyId: b.id, urgency: 300, label: `Ask ${name} for a review`, detail: `${car}, bought.`, tone: "soon" };
    if (!has(b, "transfer-reminded") && t - at >= 48 * HOUR) return { buyId: b.id, urgency: 280, label: `Remind ${name} about the transfer notice`, detail: "Plates, toll tag, VTR-346 within 30 days.", tone: "soon" };
    return null;
  }
  if (stage === "scheduled") {
    const at = Date.parse(s.pickup!.at);
    const today = new Date(now).toDateString() === new Date(at).toDateString();
    return { buyId: b.id, urgency: today ? 800 - Math.max(0, (at - t) / MIN) / 10 : 200, label: `Pickup: ${name}`, detail: `${car}. ${s.pickup!.address}`, due: s.pickup!.at, tone: today ? "today" : "later" };
  }
  if (stage === "offered") {
    const since = t - Date.parse(lastTouch(b));
    if (s.answer?.decision === "thinking" || since >= 20 * HOUR) {
      return { buyId: b.id, urgency: since >= 20 * HOUR ? 600 : 150, label: `Follow up with ${name}`, detail: `${car}. Offer $${s.offer!.amount.toLocaleString("en-US")}.`, tone: since >= 20 * HOUR ? "today" : "later" };
    }
    return { buyId: b.id, urgency: 140, label: `Waiting on ${name}`, detail: `${car}. Offer $${s.offer!.amount.toLocaleString("en-US")}.`, tone: "later" };
  }
  return { buyId: b.id, urgency: 700, label: `Make ${name} an offer`, detail: car, tone: "today" };
}

export function todayList(buys: Buy[], now = new Date()) {
  return buys
    .map((b) => nextAction(b, now))
    .filter((a): a is Action => Boolean(a))
    .sort((a, b) => b.urgency - a.urgency);
}
