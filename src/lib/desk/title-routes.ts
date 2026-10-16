import type { TitleRoute } from "./types";

/*
  What each title situation means for the buy. Every legal statement here
  carries its source and the date it was read (docs/ICP-RESEARCH.md §6,
  read 2026-10-16). Anything not sourced is a question for Mark, shown as a
  [Not set] note, never a guess. This module does not decide whether Mark
  may buy a car without a title: that depends on his licence, which is not
  on file.
*/
export type Source = { label: string; url: string; read: string };

export type RouteGuide = {
  label: string;
  /** What Mark tells the seller to have ready, in plain words. */
  bring: string[];
  notes: { text: string; source?: Source }[];
  /** True when the desk cannot say the paperwork is settled without Mark's own rule. */
  needsMarkRule: boolean;
};

const TXDMV_COPY: Source = { label: "TxDMV: Get a copy of your title", url: "https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/get-a-copy-of-your-title", read: "2026-10-16" };
const TXDMV_NO_TITLE: Source = { label: "TxDMV: Bought a vehicle with no title", url: "https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/bought-a-vehicle-with-no-title", read: "2026-10-16" };
const HB5436: Source = { label: "Texas HB 5436 (89R), effective Sept 1, 2025", url: "https://capitol.texas.gov/tlodocs/89R/billtext/html/HB05436F.htm", read: "2026-10-16" };
export const TRANSFER_NOTICE: Source = { label: "TxDMV: Buying or selling a vehicle (VTR-346); Transp. Code §501.147", url: "https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle", read: "2026-10-16" };

export const TITLE_ROUTES: Record<TitleRoute, RouteGuide> = {
  "in-hand": {
    label: "Title in the seller's name",
    bring: ["The title", "A photo ID that matches the name on the title"],
    notes: [{ text: "The seller signs the title over at the curb. If there was ever a loan, bring the lien release." }],
    needsMarkRule: false,
  },
  "not-in-name": {
    label: "Title not in the seller's name",
    bring: ["The title they have", "Their photo ID", "Anything showing how they got the car"],
    notes: [
      { text: "If the owner died with no probate, the heirs can use an affidavit of heirship (VTR-262), all signatures notarized.", source: { label: "TxDMV VTR-262", url: "https://www.txdmv.gov/sites/default/files/form_files/VTR-262.pdf", read: "2026-10-16" } },
      { text: "[Not set: Mark's rule for buying when the title is in someone else's name.]" },
    ],
    needsMarkRule: true,
  },
  lost: {
    label: "Title lost",
    bring: ["Photo ID", "Registration or insurance in their name"],
    notes: [
      { text: "The owner of record can get a certified copy (VTR-34): $2 by mail or $5.45 in person, with photo ID, and the lien release if there was a loan.", source: TXDMV_COPY },
      { text: "With no title at all, the paths are a bonded title, a tax-office hearing or a court order; not available for junked or nonrepairable vehicles.", source: TXDMV_NO_TITLE },
      { text: "A licensed used auto parts recycler may buy a vehicle 13+ years old and unregistered 7+ years, for parts or scrap only, with the seller's photo ID and a signed statement, reported to TxDMV.", source: HB5436 },
      { text: "[Not set: which licence Mark holds, and so which of these paths he uses.]" },
    ],
    needsMarkRule: true,
  },
  salvage: {
    label: "Salvage or branded title",
    bring: ["The salvage title", "Photo ID"],
    notes: [{ text: "Signed over like any title. Insurer-totaled flood cars carry a \"Flood Damage\" remark.", source: { label: "TxDMV Salvage and Nonrepairable Manual", url: "https://www.txdmv.gov/sites/default/files/body-files/Salvage_Nonrepairable_Manual.pdf", read: "2026-10-16" } }],
    needsMarkRule: false,
  },
  dealer: {
    label: "Dealer unit",
    bring: ["The title or reassignment", "Dealer contact on site"],
    notes: [{ text: "[Not set: Mark's dealer-purchase paperwork.]" }],
    needsMarkRule: true,
  },
};

export const LIEN_NOTE = "A loan on the car must be paid off, or the payoff handled, before the title can transfer. Ask for the lender's name and a payoff letter.";
