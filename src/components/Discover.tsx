import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "./Photo";

/** Two other doors in: a second opinion on an offer, and dealers. Unequal widths on purpose. */
export function Discover() {
  return (
    <section className="pb-[var(--section)]">
      <div className="wrap grid gap-4 lg:grid-cols-[7fr_5fr]">
        <Link href="/offer?situation=second-opinion" className="group block">
          <div className="tile aspect-[4/5] sm:aspect-[16/11]">
            <Photo slot="offerBand" sizes="(min-width:1024px) 58vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-white md:p-10">
              <div>
                <h2 className="t-1 max-w-[14ch]">Already Have An Offer?</h2>
                <p className="mt-3 max-w-[44ch] text-white/80">Send it with your car. Mark will tell you straight whether he can do better.</p>
              </div>
              <span className="orb shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </Link>
        <Link href="/dealers" className="group block">
          <div className="tile aspect-[4/5] lg:aspect-auto lg:h-full">
            <Photo slot="dealerBand" sizes="(min-width:1024px) 42vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-white md:p-10">
              <div>
                <h2 className="t-2 max-w-[14ch]">For Dealers With Aged Units</h2>
                <p className="mt-3 max-w-[36ch] text-white/80">One call, one number per unit, picked up free.</p>
              </div>
              <span className="orb shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
