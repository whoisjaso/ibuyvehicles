import type { Buy, BuyDocument } from "./types";

/*
  The buy, one question at a time. Steps are computed from the record every
  time; nothing is stored as done. A step that does not apply does not exist,
  so there is no Skip button, and a refresh lands on the same step.
*/
export type StepKey = "reach" | "car" | "condition" | "title" | "offer" | "answer" | "pickup" | "seller-id" | "bill-of-sale" | "paid" | "picked-up";

export type GuideStep = { key: StepKey; title: string; done: boolean; waiting?: string };

export const liveDocument = (b: Buy, type: BuyDocument["type"]) => b.documents.find((d) => d.type === type && !d.voidedAt);

export function buildGuideSteps(b: Buy): GuideStep[] {
  const s = b.stepData;
  const name = s.seller?.name?.split(" ")[0] || "the seller";
  const bos = liveDocument(b, "bill-of-sale");
  const steps: GuideStep[] = [
    { key: "reach", title: `Did you reach ${name}?`, done: Boolean(s.reached) },
    { key: "car", title: "What's the car?", done: Boolean(s.car?.year && s.car?.make && s.car?.model) },
    { key: "condition", title: "What shape is it in?", done: Boolean(s.condition?.drive && s.condition?.damage && s.condition?.keys) },
    { key: "title", title: "What's the title situation?", done: Boolean(s.title?.route && s.title?.lien && (s.title.lien === "no" || s.title.lienholder)) },
    { key: "offer", title: "What's your offer?", done: Boolean(s.offer) },
    {
      key: "answer",
      title: `Did ${name} say yes?`,
      done: s.answer?.decision === "yes",
      waiting: s.answer?.decision === "thinking" ? `${name} is thinking it over` : undefined,
    },
    { key: "pickup", title: "When and where is pickup?", done: Boolean(s.pickup?.at && s.pickup?.address) },
    { key: "seller-id", title: "Check the seller's ID", done: Boolean(s.sellerId?.confirmedAt) },
    {
      key: "bill-of-sale",
      title: "Bill of sale, signed",
      done: Boolean(bos?.signature),
      waiting: bos && !bos.signature ? `Waiting for ${name} to sign` : undefined,
    },
    { key: "paid", title: "Pay the seller", done: Boolean(s.payment) },
    { key: "picked-up", title: "Car on the truck?", done: Boolean(s.pickedUp) },
  ];
  return steps;
}

export const nextOpenStep = (steps: GuideStep[]) => steps.find((x) => !x.done) ?? null;

export function progress(steps: GuideStep[]) {
  const done = steps.filter((x) => x.done).length;
  return { done, total: steps.length };
}

export const isComplete = (b: Buy) => buildGuideSteps(b).every((x) => x.done);
