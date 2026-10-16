import Link from "next/link";
import { Phone, ChatCircleText, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "./Photo";
import { business, telHref, smsHref, mapsHref } from "@/data/business";

export function Finale() {
  return (
    <section className="relative isolate overflow-hidden" id="contact">
      <Photo slot="finale" tone="red" className="-z-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/60 to-night" />
      <div className="wrap section text-center">
        <p className="eyebrow text-white/60">It&apos;s Still Sitting There.</p>
        <h2 className="display display-xl mx-auto mt-5 max-w-[14ch]">
          It Could Be Cash <span className="text-red">By Tonight.</span>
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/offer" className="btn btn-cash shine text-lg">
            Get My Cash Offer
          </Link>
          <a href={telHref} className="btn btn-light text-lg">
            <Phone size={18} weight="fill" /> {business.phoneDisplay}
          </a>
          <a href={smsHref("Hi Mark, I want to sell my car.")} className="btn btn-frost text-lg">
            <ChatCircleText size={18} weight="fill" /> Text Photos
          </a>
        </div>
        <div className="mx-auto mt-16 grid max-w-[900px] gap-px overflow-hidden rounded-[var(--radius)] bg-white/10 text-left sm:grid-cols-2">
          <a href={mapsHref} target="_blank" rel="noopener" className="flex gap-4 bg-night-2/90 p-6 backdrop-blur-xl transition hover:bg-night-3">
            <MapPin size={26} weight="duotone" className="shrink-0 text-red" />
            <span>
              <span className="block font-[family-name:var(--font-display)] text-lg font-semibold">{business.address.street}</span>
              <span className="text-sm text-ink-2">
                {business.address.locality}, {business.address.region} {business.address.postal} · Directions
              </span>
            </span>
          </a>
          <div className="flex gap-4 bg-night-2/90 p-6 backdrop-blur-xl">
            <Clock size={26} weight="duotone" className="shrink-0 text-red" />
            <span>
              <span className="block font-[family-name:var(--font-display)] text-lg font-semibold">Open {business.hours.days}</span>
              <span className="text-sm text-ink-2">{business.hours.label}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
