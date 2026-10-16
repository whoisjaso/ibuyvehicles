import type { Metadata } from "next";
import { Phone, ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { Photo } from "@/components/Photo";
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
        <section className="on-night relative isolate flex min-h-[86svh] items-end overflow-hidden bg-night pb-16 pt-36 text-white md:pb-24">
          <div className="absolute inset-0 -z-10">
            <Photo slot="dealerBand" priority />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.25)_45%,rgba(0,0,0,0)_70%)]" />
          <div className="wrap">
            <h1 className="t-hero max-w-[10ch]">Aged Units. Gone Today.</h1>
            <p className="lede mt-7 text-white/85">
              Every day a unit sits, it costs you floor plan and lot space. Sell it straight to {business.owner}: one call, one number, picked up free, paid at pickup.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={telHref} className="btn btn-paper">
                <Phone size={20} weight="fill" /> Call {business.owner}
              </a>
              <a href={smsHref("Hi Mark, I'm a dealer with units to move. Stock list:")} className="btn btn-frost">
                <ChatCircleText size={20} weight="fill" /> Text A Stock List
              </a>
            </div>
          </div>
        </section>
        <section className="py-[var(--section)]">
          <div className="wrap grid gap-x-16 gap-y-12 md:grid-cols-2">
            {points.map((p) => (
              <div key={p.t}>
                <span className="mb-6 block h-px w-full bg-rule" aria-hidden />
                <h2 className="t-2">{p.t}</h2>
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
