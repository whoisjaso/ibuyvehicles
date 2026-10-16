import type { Buy } from "./types";
import { business } from "@/data/business";

/*
  Every text Mark sends, pre-written from the record and opened in his own
  Messages app with one tap (sms: link), from his real number. Nothing is
  ever sent on his behalf without that tap. No price guarantee in writing:
  the offer text states the number and asks about anything that changes it
  before pickup, never "guaranteed".
*/
export type TextKey = "first" | "offer" | "follow-up" | "pickup" | "sign" | "review" | "transfer";

export type Text = { key: TextKey; label: string; body: string };

const first = (b: Buy) => b.stepData.seller?.name?.split(" ")[0] ?? "there";
const carName = (b: Buy) => [b.stepData.car?.year, b.stepData.car?.make, b.stepData.car?.model].filter(Boolean).join(" ") || "car";
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const when = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { weekday: "long", hour: "numeric", minute: "2-digit", timeZone: business.timeZone });

export function textsFor(b: Buy, opts: { signUrl?: string; reviewUrl?: string } = {}): Text[] {
  const s = b.stepData;
  const out: Text[] = [
    { key: "first", label: "First text", body: `Hi ${first(b)}, this is ${business.owner} with ${business.name}. Got your info about the ${carName(b)}. Is now a good time for a quick call?` },
  ];
  if (s.offer) {
    out.push({
      key: "offer",
      label: "The offer",
      body: `Hi ${first(b)}, ${business.owner} here. For the ${carName(b)} I can do ${money(s.offer.amount)}, paid on the spot before it's towed, and the tow is free. If anything's missing or replaced (catalytic converter, battery, wheels), tell me now so the number is right before I come out.`,
    });
    out.push({ key: "follow-up", label: "Follow up", body: `Hi ${first(b)}, ${business.owner} again. Still have the ${carName(b)}? Happy to come get it today or tomorrow.` });
  }
  if (s.pickup) {
    out.push({
      key: "pickup",
      label: "Pickup confirmed",
      body: `Set for ${when(s.pickup.at)} at ${s.pickup.address}. Have the title (if you have it) and your photo ID ready. You get paid before the car is hooked up.`,
    });
  }
  if (opts.signUrl) out.push({ key: "sign", label: "Signing link", body: `Here's the bill of sale for the ${carName(b)}. Read it through and sign at the end: ${opts.signUrl}` });
  if (s.pickedUp) {
    out.push({ key: "review", label: "Review ask", body: `Thanks again, ${first(b)}. If it went the way I said it would, a quick Google review helps a lot: ${opts.reviewUrl ?? ""}`.trim() });
    out.push({
      key: "transfer",
      label: "Transfer reminder",
      body: `One last thing for you, ${first(b)}: take the plates and toll tag off if you haven't, and file the Vehicle Transfer Notification (VTR-346) with TxDMV within 30 days. It protects you from tolls and tickets after the sale.`,
    });
  }
  return out;
}

/** sms: link for iPhone and Android alike. */
export function smsLink(phone: string | undefined, body: string) {
  const digits = (phone ?? "").replace(/\D/g, "");
  return `sms:${digits ? `+1${digits.slice(-10)}` : ""}?&body=${encodeURIComponent(body)}`;
}

export const telLink = (phone?: string) => `tel:+1${(phone ?? "").replace(/\D/g, "").slice(-10)}`;
