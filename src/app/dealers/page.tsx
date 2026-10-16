import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { business, telHref, smsHref } from "@/data/business";

export const metadata: Metadata = {
  title: "Dealers: Sell Aged Inventory Direct",
  description: `Aged units, unwanted trade-ins and mechanical buybacks. Sell direct to ${business.name} in Houston: one call, no auction run list, picked up free.`,
};

const points = [
  { t: "No Sale-Day Wait", d: "No run list, no waiting on the lane. Call today, the unit can be gone today." },
  { t: "One Straight Number", d: "One buyer, one number per unit. No bidding war working against you." },
  { t: "Picked Up Free", d: "Mark sends the truck. Non-runners and no-starts included." },
  { t: "One Unit Or A Row", d: "Text the stock list. Mark prices each one and can take the lot." },
];

const dealerFaq = [
  { q: "What units do you take?", a: "Aged retail units, trade-ins you don't want to recondition, mechanical buybacks, non-runners and wrecked units. Running or not." },
  { q: "What paperwork do you need?", a: "The title or MCO with a dealer reassignment, the stock number and the keys. Mark confirms anything else on the call." },
  { q: "How fast is payment?", a: "Paid at pickup, the same as every iBuy Vehicles sale." },
];

export default function Dealers() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-paint pb-20 pt-36 md:pt-44">
          <div className="beacon-cone -z-10 left-[85%] top-[-50vmax] size-[120vmax] -translate-x-1/2 opacity-50" aria-hidden />
          <div className="grain -z-10" />
          <div className="wrap">
            <h1 className="vinyl vinyl-xl max-w-[10ch]">Aged Units. Gone Today.</h1>
            <p className="lede mt-7 text-white/85">
              Every day a unit sits, it costs you floor plan and lot space. Sell it straight to {business.owner}: one call, one number, picked up free, paid at pickup.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={telHref} className="decal decal-white">
                <Phone size={20} weight="fill" /> Call {business.owner}
              </a>
              <a href={smsHref("Hi Mark, I'm a dealer with units to move. Stock list:")} className="decal decal-line">
                <ChatCircleText size={20} weight="fill" /> Text A Stock List
              </a>
              <Link href="/offer?situation=dealer" className="decal decal-red">
                Price One Unit <ArrowRight size={20} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
        <div className="tape h-7 md:h-9" aria-hidden />
        <section className="py-[var(--section)]">
          <div className="wrap grid gap-x-16 gap-y-12 md:grid-cols-2">
            {points.map((p) => (
              <div key={p.t}>
                <span className="tape mb-6 block h-2.5 w-20 rounded-[1px]" aria-hidden />
                <h2 className="vinyl vinyl-md">{p.t}</h2>
                <p className="mt-4 max-w-[44ch] text-[1.15rem] text-ink-2">{p.d}</p>
              </div>
            ))}
          </div>
        </section>
        <Faq items={dealerFaq} title="Dealer Questions." />
      </main>
      <Footer />
    </>
  );
}
