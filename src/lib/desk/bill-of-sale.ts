import type { Buy } from "./types";
import { TITLE_ROUTES } from "./title-routes";
import { liveDocument } from "./guide";
import { business } from "@/data/business";

/*
  Mark's purchase bill of sale: the seller sells, iBuy Vehicles buys. Built
  from the record; a fact that is not on file prints as a visible
  "[Not set: ...]" marker and blocks filing. It is never filled with
  something plausible. The price printed is the price paid; if the number
  changes at the curb, the filed document is voided and filed again with
  the reason on record. Nothing is rewritten in place.
*/
export const NOT_SET = (what: string) => `[Not set: ${what}]`;

export type BillOfSaleFields = {
  date: string;
  sellerName: string;
  sellerAddress: string;
  sellerId: string;
  buyerName: string;
  buyerAddress: string;
  buyerSigner: string;
  vehicle: string;
  vin: string;
  odometer: string;
  price: string;
  title: string;
  lien: string;
};

export function businessDate(at: Date = new Date()) {
  return at.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: business.timeZone });
}

const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function billOfSaleFields(b: Buy, at: Date = new Date()): { fields: BillOfSaleFields; missing: string[] } {
  const s = b.stepData;
  const missing: string[] = [];
  const need = (v: string | number | undefined | null, what: string) => {
    if (v === undefined || v === null || v === "") {
      missing.push(what);
      return NOT_SET(what);
    }
    return String(v);
  };
  const car = s.car ?? {};
  const price = s.payment?.amount ?? s.offer?.amount;
  const fields: BillOfSaleFields = {
    date: businessDate(at),
    sellerName: need(s.sellerId?.nameOnId, "seller's name as on their ID"),
    sellerAddress: need(s.sellerId?.address, "seller's address"),
    sellerId: s.sellerId ? `${{ dl: "Driver licence", "state-id": "State ID", passport: "Passport", other: "ID" }[s.sellerId.idKind]}${s.sellerId.idLast4 ? ` ending ${s.sellerId.idLast4}` : ""}` : need(undefined, "seller's ID checked"),
    // Mark sets these once (business.ts or the BUSINESS_LEGAL_NAME / BUSINESS_SIGNER_NAME settings); never guessed.
    buyerName: need(business.legalName ?? process.env.BUSINESS_LEGAL_NAME, "iBuy Vehicles' legal business name"),
    buyerAddress: `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postal}`,
    buyerSigner: need(business.signerFullName ?? process.env.BUSINESS_SIGNER_NAME, "Mark's full legal name"),
    vehicle: need([car.year, car.make, car.model].filter(Boolean).join(" ") || undefined, "year, make and model"),
    vin: need(car.vin, "VIN"),
    odometer: car.miles != null ? `${car.miles.toLocaleString("en-US")} miles` : need(undefined, "odometer reading"),
    price: price != null ? usd(price) : need(undefined, "price"),
    title: s.title?.route ? TITLE_ROUTES[s.title.route].label : need(undefined, "title situation"),
    lien: s.title?.lien === "no" ? "None" : s.title?.lien === "yes" ? need(s.title.lienholder, "lienholder") : need(undefined, "whether there is a loan on the car"),
  };
  return { fields, missing };
}

export type FileCheck = { ok: true } | { ok: false; reason: string };

/** Filing needs every fact on file and the seller's ID checked by a person. */
export function canFile(b: Buy): FileCheck {
  if (liveDocument(b, "bill-of-sale")) return { ok: false, reason: "A bill of sale is already filed. Void it to file again." };
  if (!b.stepData.sellerId?.confirmedAt) return { ok: false, reason: "Check the seller's ID first." };
  const { missing } = billOfSaleFields(b);
  if (missing.length) return { ok: false, reason: `Still not set: ${missing.join(", ")}.` };
  return { ok: true };
}

/** Paying a different amount than the filed bill of sale says requires voiding and refiling it. */
export function paymentCheck(b: Buy, amount: number, reason?: string): FileCheck {
  const offer = b.stepData.offer?.amount;
  if (!Number.isFinite(amount) || amount <= 0) return { ok: false, reason: "Enter the amount paid." };
  if (offer != null && amount !== offer && !reason?.trim()) return { ok: false, reason: "The amount is different from the offer. Say why, so the record is honest." };
  const doc = liveDocument(b, "bill-of-sale");
  if (doc && doc.snapshot.price !== usd(amount)) return { ok: false, reason: "The signed bill of sale shows a different price. Void it and file it again at this amount first." };
  return { ok: true };
}
