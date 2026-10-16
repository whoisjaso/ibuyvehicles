/*
  The buy desk's data model, Handle A Sale's architecture on the buy side.

  A buy is ONE record. The seller and the car are entered once; every step,
  text, document and number is derived from it. Answers live under named
  keys of `stepData`; each writer merges only its own key, with a version
  check (step-data.ts). "Done" is never stored: guide.ts computes every step
  from the record, so the Today list, the corridor and the numbers cannot
  disagree. Documents are never edited or deleted: a filed document is
  voided and filed again.
*/

export type TitleRoute = "in-hand" | "not-in-name" | "lost" | "salvage" | "dealer";
export type Drive = "drives" | "starts-only" | "no-start";
export type Damage = "none" | "minor" | "major" | "flood" | "fire";
export type PayMethod = "cash" | "zelle" | "cashapp" | "other";
export type Channel = "estimate" | "chat" | "call" | "text" | "walk-in" | "dealer" | "other";

export type StepData = {
  seller?: { name?: string; phone?: string; email?: string; zip?: string; prefers?: "call" | "text"; language?: "en" | "es" };
  /** A person confirmed this is a real seller with a real car: the funnel's human check. */
  reached?: { at: string; how: "call" | "text" | "in-person" };
  car?: { vin?: string; year?: number; make?: string; model?: string; body?: string; miles?: number; color?: string };
  condition?: { drive?: Drive; damage?: Damage; keys?: "yes" | "no"; parts?: string[] };
  title?: { route?: TitleRoute; lien?: "yes" | "no"; lienholder?: string };
  estimate?: { low?: number; high?: number };
  offer?: { amount: number; at: string };
  answer?: { decision: "yes" | "thinking"; at: string };
  pickup?: { at: string; address: string; notes?: string };
  /** Read by a person from the seller's ID at the curb; never by guesswork. */
  sellerId?: { nameOnId: string; address?: string; idKind: "dl" | "state-id" | "passport" | "other"; idLast4?: string; matchesTitle?: "yes" | "no" | "no-title"; confirmedAt: string };
  payment?: { amount: number; method: PayMethod; at: string; differsReason?: string };
  pickedUp?: { at: string };
};

export type BuyEvent = {
  at: string;
  kind: "created" | "duplicate-lead" | "reached" | "texted" | "called" | "offer" | "answer" | "pickup-set" | "id-confirmed" | "document-filed" | "document-voided" | "document-signed" | "paid" | "picked-up" | "lost" | "reopened" | "note" | "review-asked" | "transfer-reminded" | "follow-up";
  text?: string;
  by?: string;
};

export type BuyDocument = {
  id: string;
  type: "bill-of-sale";
  filedAt: string;
  /** The facts printed on the document, frozen when it was filed. */
  snapshot: Record<string, string>;
  signToken?: string;
  signature?: { name: string; image: string; at: string; scrolledToEnd: true; ip?: string };
  voidedAt?: string;
  voidReason?: string;
};

export type Buy = {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  channel: Channel;
  source: { page?: string; utm?: Record<string, string>; estimateAi?: boolean };
  stepData: StepData;
  documents: BuyDocument[];
  events: BuyEvent[];
  lost?: { reason: LostReason; at: string; note?: string };
};

export const LOST_REASONS = {
  "no-answer": "Never answered",
  "sold-elsewhere": "Sold it elsewhere",
  "price-too-low": "Wanted more than the offer",
  "kept-it": "Decided to keep it",
  "not-real": "Not a real seller",
  "cant-buy": "Mark passed on it",
  duplicate: "Duplicate of another buy",
} as const;
export type LostReason = keyof typeof LOST_REASONS;
