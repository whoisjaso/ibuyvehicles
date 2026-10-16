import Link from "next/link";
import { ChatCircleText, ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { business, telHref, smsHref, mapsHref } from "@/data/business";

/** The close: the number, as big as it is on the truck. */
export function Finale() {
  return (
    <section id="contact" className="relative isolate overflow-hidden pt-[var(--section)]">
      <div className="beacon-cone -z-10 left-1/2 top-[-40vmax] size-[140vmax] -translate-x-1/2 opacity-70" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(255,158,48,.14),transparent_70%)]" />
      <div className="wrap">
        <h2 className="vinyl vinyl-lg max-w-[16ch]">
          It Could Be Cash <span className="text-tape">Tonight.</span>
        </h2>
        <a href={telHref} className="vinyl mt-10 block text-[clamp(3.6rem,13.5vw,13rem)] leading-[0.82] tabular-nums transition-colors hover:text-tape-hot">
          {business.phoneDisplay}
        </a>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/offer" className="decal decal-red">
            Get My Offer <ArrowRight size={20} weight="bold" />
          </Link>
          <a href={smsHref("Hi Mark, I want to sell my car. Here are photos:")} className="decal decal-line">
            <ChatCircleText size={20} weight="fill" /> Text Mark Photos
          </a>
        </div>
        <a href={mapsHref} target="_blank" rel="noopener" className="mt-12 inline-flex items-start gap-3 text-ink-2 transition-colors hover:text-ink">
          <MapPin size={22} weight="fill" className="mt-0.5 shrink-0 text-ink" />
          <span>
            {business.address.street}, {business.address.locality}, {business.address.region} {business.address.postal}. {business.hours.label}.
          </span>
        </a>
      </div>
      <div className="tape mt-20 h-7 md:mt-24 md:h-9" aria-hidden />
    </section>
  );
}
