import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/** Two audiences, two painted fields: the red of the decal, the blue of the door. */
export function TwoFields() {
  return (
    <section className="grid md:grid-cols-2">
      <Link href="/offer?situation=second-opinion" className="group relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-tape p-[var(--gutter)] py-14 md:min-h-[640px] md:py-16">
        <span className="tape absolute inset-x-0 top-0 h-3 opacity-80" aria-hidden />
        <h2 className="vinyl vinyl-lg max-w-[10ch]">Already Have An Offer?</h2>
        <div>
          <p className="max-w-[40ch] text-[1.15rem] leading-relaxed text-white">
            Got a number from an online buyer or a dealer? Send it with your car. Mark will tell you straight whether he can do better.
          </p>
          <span className="decal decal-white mt-8">
            Compare My Offer <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
      <Link href="/dealers" className="group relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-paint p-[var(--gutter)] py-14 md:min-h-[640px] md:py-16">
        <h2 className="vinyl vinyl-lg max-w-[10ch]">Dealer With Aged Units?</h2>
        <div>
          <p className="max-w-[40ch] text-[1.15rem] leading-relaxed text-white/90">
            Trade-ins you don&apos;t want, units past 60 days, mechanical buybacks. One call, one number, picked up free. No auction run list.
          </p>
          <span className="decal decal-white mt-8">
            Move My Inventory <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </section>
  );
}
