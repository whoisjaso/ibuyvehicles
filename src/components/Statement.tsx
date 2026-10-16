import { business } from "@/data/business";

/** A quiet paragraph of truth, then the facts as one plain sentence. */
export function Statement() {
  return (
    <section className="py-[var(--section)]">
      <div className="wrap">
        <h2 className="t-1 max-w-[18ch]">The Person Who Quotes You Is The Person Who Pays You.</h2>
        <p className="mt-8 max-w-[34ch] text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.22] tracking-[-0.018em]">
          With many online buyers, a different company&apos;s tow driver shows up, and the price can change in your driveway.{" "}
          <span className="text-ink-3">With iBuy Vehicles there is no one in the middle. {business.owner} makes the offer himself, and you are paid before the car is hooked up.</span>
        </p>
        <p className="mt-10 max-w-[48ch] border-t border-rule pt-6 text-[clamp(1.15rem,1.5vw,1.4rem)] leading-snug text-ink-2">
          Buying cars in Houston since {business.since}. {business.googleReviews} Google reviews. The tow is free, and the phone is answered every day, {business.hours.label.replace("Every day, ", "")}.
        </p>
      </div>
    </section>
  );
}
