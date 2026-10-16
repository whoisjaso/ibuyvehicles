import { CountUp } from "./CountUp";
import { business, yearsInBusiness } from "@/data/business";

export function Stats() {
  const stats = [
    { v: String(yearsInBusiness()), label: "Years Buying Cars In Houston", sub: `Since ${business.since}` },
    { v: String(business.googleReviews), label: "Google Reviews", sub: "Real sellers, real cars" },
    { v: "0", pre: "$", label: "Towing, Ever", sub: "Anywhere in Houston" },
    { v: "7", label: "Days A Week", sub: business.hours.label },
  ];
  return (
    <section className="bg-night pb-[var(--section)]">
      <div className="wrap grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] bg-white/10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-night-2 p-6 md:p-10">
            <p className="display text-[clamp(3rem,6vw,5.5rem)] leading-none">
              {s.pre}
              <CountUp value={s.v} />
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold capitalize">{s.label}</p>
            <p className="text-sm text-ink-2">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
