import { business } from "@/data/business";

/** A quiet paragraph of truth, then the facts as one plain sentence. */
export function Statement() {
  return (
    <section className="py-[var(--section)]">
      <div className="wrap">
        <p className="max-w-[30ch] text-[clamp(1.7rem,3.2vw,3rem)] leading-[1.18] tracking-[-0.02em]">
          {business.owner} looks at the car, gives you one honest number, and pays you before it is hooked up.{" "}
          <span className="text-ink-3">No haggling at the curb. No waiting on a buyer who never shows.</span>
        </p>
        <p className="mt-10 max-w-[60ch] border-t border-rule pt-6 text-[1.06rem] text-ink-2">
          Buying cars in Houston since {business.since}. {business.googleReviews} Google reviews. The tow is free, and the phone is answered {business.hours.label.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
