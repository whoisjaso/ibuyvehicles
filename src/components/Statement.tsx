import { business, yearsInBusiness } from "@/data/business";

/** A quiet paragraph of truth, with the facts set inline between hairlines. */
export function Statement() {
  const facts = [
    [`${yearsInBusiness()} years`, `buying cars in Houston since ${business.since}`],
    [`${business.googleReviews}`, "Google reviews"],
    ["$0", "for the tow, anywhere in Houston"],
    ["7 days", business.hours.label.replace("Every day, ", "")],
  ];
  return (
    <section className="py-[var(--section)]">
      <div className="wrap">
        <p className="max-w-[30ch] text-[clamp(1.7rem,3.2vw,3rem)] leading-[1.18] tracking-[-0.02em]">
          {business.owner} looks at the car, gives you one honest number, and pays you before it is hooked up.{" "}
          <span className="text-ink-3">No haggling at the curb. No waiting on a buyer who never shows.</span>
        </p>
        <dl className="mt-16 grid grid-cols-2 border-t border-rule lg:grid-cols-4">
          {facts.map(([v, l], i) => (
            <div key={l} className={`border-rule py-6 pr-6 ${i % 2 ? "border-l pl-6" : ""} lg:border-l lg:pl-6 ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}>
              <dt className="text-[clamp(1.6rem,2.4vw,2.2rem)] tracking-[-0.02em] tabular-nums">{v}</dt>
              <dd className="mt-1 text-[15px] text-ink-3">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
