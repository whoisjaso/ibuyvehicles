import Link from "next/link";
import { Photo } from "./Photo";
import { business, telHref, mapsHref } from "@/data/business";

/** The close, on one wide photograph (slot E01). */
export function Finale() {
  return (
    <section id="contact" className="on-night relative isolate overflow-hidden bg-night text-white">
      <div className="absolute inset-0 -z-10">
        <Photo slot="finale" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.7)_0%,rgba(0,0,0,.3)_55%,rgba(0,0,0,.05)_100%)]" />
      <div className="wrap flex min-h-[86svh] flex-col justify-end py-16 md:py-24">
        <ul className="mb-10 space-y-2 text-[clamp(1.15rem,1.6vw,1.45rem)] text-white/85">
          <li>The driveway is clear.</li>
          <li>The money is in your hand.</li>
          <li>Nobody is calling you about that car again.</li>
        </ul>
        <h2 className="t-hero max-w-[13ch]">It Could Be Cash Tonight.</h2>
        <a href={telHref} className="mt-6 block text-[clamp(1.6rem,3vw,2.6rem)] font-light tracking-[-0.02em] tabular-nums text-white/90 transition-colors hover:text-white">
          {business.phoneDisplay}
        </a>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/offer" className="btn btn-red">
            Get My Offer
          </Link>
          <a href={mapsHref} target="_blank" rel="noopener" className="btn btn-frost">
            Directions
          </a>
        </div>
        <p className="mt-8 text-[15px] text-white/70">
          {business.address.street}, {business.address.locality}, {business.address.region} {business.address.postal}. {business.hours.label}.
        </p>
      </div>
    </section>
  );
}
