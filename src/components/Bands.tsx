import Link from "next/link";
import { ArrowRight, Storefront, Scales } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

/** Two audiences the old site never spoke to: dealers with aged units, and sellers holding another offer. */
export function Bands() {
  return (
    <section className="bg-night section">
      <div className="wrap grid gap-4 lg:grid-cols-2">
        <Reveal>
          <Link href="/dealers" className="tile group relative flex min-h-[560px] flex-col justify-end p-7 md:p-10">
            <Photo slot="dealer" tone="blue" className="-z-10" sizes="(min-width:1024px) 50vw, 100vw" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <Storefront size={40} weight="duotone" />
            <p className="eyebrow mt-6 text-white/60">For Dealers</p>
            <h3 className="display display-md mt-3 max-w-[14ch]">Aged Units Off Your Lot. One Call.</h3>
            <p className="mt-4 max-w-[46ch] text-white/75">Trade-ins you don&apos;t want, units past 60 days, mechanical buybacks. Sell direct with no auction run list and no waiting on a sale day.</p>
            <span className="btn btn-light mt-8 self-start">
              Move My Inventory <ArrowRight size={18} weight="bold" className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <Link href="/offer?situation=second-opinion" className="tile group relative flex min-h-[560px] flex-col justify-end p-7 md:p-10">
            <Photo slot="offer" tone="red" className="-z-10" sizes="(min-width:1024px) 50vw, 100vw" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <Scales size={40} weight="duotone" />
            <p className="eyebrow mt-6 text-white/60">Already Have An Offer?</p>
            <h3 className="display display-md mt-3 max-w-[14ch]">Get A Second Look Before You Sign.</h3>
            <p className="mt-4 max-w-[46ch] text-white/75">Got a number from an online buyer or a dealer? Send it with your car&apos;s details. Mark will tell you straight whether he can do better.</p>
            <span className="btn btn-cash mt-8 self-start">
              Compare My Offer <ArrowRight size={18} weight="bold" className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
