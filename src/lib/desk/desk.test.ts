import { describe, expect, it } from "vitest";
import type { Buy, StepData } from "./types";
import { mergeStepData } from "./step-data";
import { buildGuideSteps, nextOpenStep, isComplete } from "./guide";
import { stageOf, nextAction, todayList } from "./pipeline";
import { normalizePhone, cleanName, normalizeVin, botSignals } from "./lead-quality";
import { billOfSaleFields, canFile, paymentCheck, NOT_SET } from "./bill-of-sale";
import { textsFor, smsLink } from "./texts";
import { numbersFor } from "./stats";
import { TITLE_ROUTES } from "./title-routes";

const T0 = "2026-10-16T15:00:00.000Z";
const at = (min: number) => new Date(Date.parse(T0) + min * 60_000).toISOString();

function buy(stepData: StepData = {}, extra: Partial<Buy> = {}): Buy {
  return { id: "b1", createdAt: T0, updatedAt: T0, version: 0, channel: "estimate", source: {}, stepData, documents: [], events: [{ at: T0, kind: "created" }], ...extra };
}

const full: StepData = {
  seller: { name: "Erika Moore", phone: "2815550123" },
  reached: { at: at(3), how: "call" },
  car: { year: 2007, make: "Chevrolet", model: "Impala", vin: "2G1WT58K879123456", miles: 182000 },
  condition: { drive: "no-start", damage: "minor", keys: "yes" },
  title: { route: "in-hand", lien: "no" },
  offer: { amount: 650, at: at(10) },
  answer: { decision: "yes", at: at(20) },
  pickup: { at: at(180), address: "123 Main St, Houston" },
  sellerId: { nameOnId: "Erika Moore", address: "123 Main St, Houston, TX 77040", idKind: "dl", idLast4: "1234", confirmedAt: at(180) },
};

describe("step data", () => {
  it("merges only the writer's keys", () => {
    const r = mergeStepData({ seller: { name: "A" } }, 3, 3, { car: { year: 2001 } });
    expect(r).toEqual({ ok: true, stepData: { seller: { name: "A" }, car: { year: 2001 } }, version: 4 });
  });
  it("refuses a stale write", () => {
    expect(mergeStepData({}, 4, 3, { car: { year: 2001 } })).toEqual({ ok: false, error: "conflict" });
  });
});

describe("guide", () => {
  it("starts at reaching the seller", () => {
    expect(nextOpenStep(buildGuideSteps(buy({ seller: { name: "Erika Moore" } })))?.key).toBe("reach");
  });
  it("needs a lienholder when there is a loan", () => {
    const steps = buildGuideSteps(buy({ ...full, title: { route: "in-hand", lien: "yes" } }));
    expect(steps.find((s) => s.key === "title")?.done).toBe(false);
  });
  it("waits, not asks, while the seller thinks", () => {
    const step = buildGuideSteps(buy({ ...full, answer: { decision: "thinking", at: at(20) } })).find((s) => s.key === "answer");
    expect(step?.done).toBe(false);
    expect(step?.waiting).toMatch(/thinking/);
  });
  it("is complete only when signed, paid and picked up", () => {
    const signed: Buy = buy({ ...full, payment: { amount: 650, method: "cash", at: at(185) }, pickedUp: { at: at(190) } }, {
      documents: [{ id: "d1", type: "bill-of-sale", filedAt: at(181), snapshot: {}, signature: { name: "Erika Moore", image: "x", at: at(182), scrolledToEnd: true } }],
    });
    expect(isComplete(signed)).toBe(true);
    expect(isComplete(buy(full))).toBe(false);
  });
  it("ignores a voided bill of sale", () => {
    const b = buy(full, { documents: [{ id: "d1", type: "bill-of-sale", filedAt: at(181), snapshot: {}, voidedAt: at(183), signature: { name: "x", image: "x", at: at(182), scrolledToEnd: true } }] });
    expect(buildGuideSteps(b).find((s) => s.key === "bill-of-sale")?.done).toBe(false);
  });
});

describe("pipeline", () => {
  it("stages follow the record", () => {
    expect(stageOf(buy({}))).toBe("new");
    expect(stageOf(buy({ reached: full.reached }))).toBe("reached");
    expect(stageOf(buy({ reached: full.reached, offer: full.offer }))).toBe("offered");
    expect(stageOf(buy(full))).toBe("scheduled");
    expect(stageOf(buy(full, { lost: { reason: "sold-elsewhere", at: at(30) } }))).toBe("lost");
  });
  it("a new lead turns hot after five minutes", () => {
    expect(nextAction(buy({ seller: { name: "Erika" } }), new Date(at(2)))?.tone).toBe("today");
    expect(nextAction(buy({ seller: { name: "Erika" } }), new Date(at(6)))?.tone).toBe("hot");
  });
  it("the oldest new lead comes first", () => {
    const list = todayList([buy({ seller: { name: "A" } }, { id: "a", createdAt: at(10) }), buy({ seller: { name: "B" } }, { id: "b" })], new Date(at(20)));
    expect(list[0].buyId).toBe("b");
  });
  it("asks for the review two hours after pickup", () => {
    const b = buy({ ...full, payment: { amount: 650, method: "cash", at: at(185) }, pickedUp: { at: at(190) } }, {
      documents: [{ id: "d1", type: "bill-of-sale", filedAt: at(181), snapshot: {}, signature: { name: "E", image: "x", at: at(182), scrolledToEnd: true } }],
    });
    expect(nextAction(b, new Date(at(200)))).toBeNull();
    expect(nextAction(b, new Date(at(320)))?.label).toMatch(/review/);
  });
});

describe("lead quality", () => {
  it("accepts real US numbers and rejects junk", () => {
    expect(normalizePhone("(281) 840-0452")).toBe("2818400452");
    expect(normalizePhone("+1 281 840 0452")).toBe("2818400452");
    expect(normalizePhone("123")).toBeNull();
    expect(normalizePhone("1111111111")).toBeNull();
    expect(normalizePhone("2815550123")).toBeNull();
    expect(normalizePhone("0818400452")).toBeNull();
  });
  it("cleans names and refuses links", () => {
    expect(cleanName("  erika   moore ")).toBe("Erika Moore");
    expect(cleanName("http://spam.example")).toBeNull();
    expect(cleanName("12")).toBeNull();
  });
  it("keeps only valid VINs", () => {
    expect(normalizeVin("2g1wt58k879123456")).toBe("2G1WT58K879123456");
    expect(normalizeVin("123")).toBeUndefined();
  });
  it("flags scripts", () => {
    expect(botSignals({ honeypot: "x" })).toContain("honeypot");
    expect(botSignals({ startedAt: 1000, now: 2000 })).toContain("too-fast");
    expect(botSignals({ startedAt: 1000, now: 9000 })).toEqual([]);
  });
});

describe("bill of sale", () => {
  it("prints a missing fact as a visible marker, never a guess", () => {
    const { fields, missing } = billOfSaleFields(buy({ ...full, car: { ...full.car, vin: undefined } }));
    expect(fields.vin).toBe(NOT_SET("VIN"));
    expect(missing).toContain("VIN");
  });
  it("blocks filing until the business facts are set", () => {
    const r = canFile(buy(full));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toMatch(/legal business name/);
  });
  it("blocks filing before the ID is checked", () => {
    const r = canFile(buy({ ...full, sellerId: undefined }));
    expect(r.ok).toBe(false);
  });
  it("a different amount needs a reason", () => {
    expect(paymentCheck(buy(full), 600).ok).toBe(false);
    expect(paymentCheck(buy(full), 650).ok).toBe(true);
  });
  it("a different amount than the signed paper needs a refile", () => {
    const b = buy(full, { documents: [{ id: "d1", type: "bill-of-sale", filedAt: at(181), snapshot: { price: "$650.00" } }] });
    expect(paymentCheck(b, 600, "Catalytic converter missing").ok).toBe(false);
    expect(paymentCheck(b, 650).ok).toBe(true);
  });
});

describe("texts", () => {
  it("never promise a guaranteed price", () => {
    const b = buy({ ...full, payment: { amount: 650, method: "cash", at: at(185) }, pickedUp: { at: at(190) } });
    for (const t of textsFor(b, { signUrl: "https://x", reviewUrl: "https://g" })) {
      expect(t.body).not.toMatch(/guarantee/i);
      expect(t.body).not.toMatch(/[–—]/);
    }
  });
  it("open in Messages with the seller's number", () => {
    expect(smsLink("(281) 840-0452", "Hi")).toBe("sms:+12818400452?&body=Hi");
  });
});

describe("title routes", () => {
  it("every legal note has a source or is marked not set", () => {
    for (const r of Object.values(TITLE_ROUTES)) for (const n of r.notes) expect(Boolean(n.source) || n.text.includes("[Not set") || !/\b(law|form|VTR|§|statute)\b/i.test(n.text)).toBe(true);
  });
});

describe("numbers", () => {
  it("counts from the records", () => {
    const n = numbersFor([buy(full), buy({}, { id: "b2", channel: "chat" })], new Date(at(-60)));
    expect(n.leads).toBe(2);
    expect(n.reached).toBe(1);
    expect(n.medianMinutesToReach).toBe(3);
    expect(n.byChannel.find((c) => c.channel === "chat")?.leads).toBe(1);
  });
});
