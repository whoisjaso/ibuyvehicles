import { pricing, type BodyClass, type DamageState, type DriveState } from "@/data/pricing";
import type { TitleRoute } from "@/data/titleRoutes";

export type EstimateInput = {
  year: number;
  body: BodyClass;
  miles?: number | null;
  drive: DriveState;
  damage: DamageState;
  title: TitleRoute;
  keys: "yes" | "no";
};

export type Estimate = { low: number; high: number; floor: number; mid: number };

const round = (n: number, step: number) => Math.round(n / step) * step;

/** Rules-based starting range. Pure and deterministic, so it runs instantly in the browser. */
export function estimate(input: EstimateInput, now = new Date()): Estimate {
  const floor = pricing.weightTons[input.body] * pricing.scrapPerTon;
  const age = Math.max(0, now.getFullYear() - input.year);

  let value = pricing.baseValue[input.body] * Math.pow(1 - pricing.yearlyDepreciation, Math.max(0, age - 3));

  if (input.miles && input.miles > 0) {
    const expected = Math.max(1, age) * pricing.milesPerYear;
    const steps = (input.miles - expected) / 10000;
    value *= Math.min(1.15, Math.max(0.55, 1 - steps * pricing.mileageStep));
  }

  value *= pricing.drive[input.drive] * pricing.damage[input.damage] * pricing.title[input.title] * pricing.keys[input.keys];

  const mid = Math.max(floor, value);
  const step = mid > 2000 ? 100 : 25;
  const low = Math.max(round(floor * 0.9, 25), round(mid * pricing.low, step));
  const high = Math.max(pricing.minimumHigh, round(mid * pricing.high, step), low + 50);
  return { low, high, floor: round(floor, 25), mid: round(mid, step) };
}

/** Map an NHTSA vPIC BodyClass string to the estimator's classes. */
export function bodyFromVpic(bodyClass?: string, vehicleType?: string): BodyClass {
  const s = `${bodyClass ?? ""} ${vehicleType ?? ""}`.toLowerCase();
  if (s.includes("motorcycle")) return "motorcycle";
  if (s.includes("pickup") || s.includes("truck")) return "truck";
  if (s.includes("van") || s.includes("minivan")) return "van";
  if (s.includes("sport utility") || s.includes("suv") || s.includes("crossover") || s.includes("mpv")) return "suv";
  if (s.includes("coupe") || s.includes("convertible")) return "coupe";
  if (s.includes("hatchback")) return "compact";
  return "sedan";
}

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
