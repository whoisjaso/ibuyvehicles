import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Clock, Truck, Scales, Stack } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { business, telHref, smsHref } from "@/data/business";

export const metadata: Metadata = {
  title: "Dealers: Sell Aged Inventory Direct",
  description: `Aged units, unwanted trade-ins and mechanical buybacks. Sell direct to ${business.name} in Houston: one call, no auction run list, picked up free.`,
};

const points = [
  { Icon: Clock, t: "No Sale-Day Wait", d: "No run list, no waiting on the lane. Call today, the unit can be gone today." },
  { Icon: Scales, t: "No Bidding War Against You", d: "One buyer, one straight number. Mark isn't competing with your floor." },
  { Icon: Truck, t: "Picked Up Free", d: "Mark sends the truck. Non-runners and no-starts included." },
  { Icon: Stack, t: "One Unit Or A Row", d: "Send the stock list. Mark prices each one and takes the lot." },
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
        <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden pb-20 pt-36">
          <Photo slot="dealer" tone="blue" className="-z-10" priority />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,8,11,.94),rgba(7,8,11,.5)_60%,rgba(7,8,11,.2))]" />
          <div className="grain -z-10" />
          <div className="wrap">
            <p className="eyebrow text-blue-2">For Dealers</p>
            <h1 className="display display-xl mt-4 max-w-[12ch]">Aged Units. Gone Today.</h1>
            <p className="lede mt-6 max-w-[560px] text-white/80">
              Every day a unit sits, it costs you floor plan and space. Sell it straight to {business.owner}: one call, one number, picked up free, paid at pickup.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={telHref} className="btn btn-light text-lg">
                <Phone size={18} weight="fill" /> Call {business.owner}
              </a>
              <a href={smsHref("Hi Mark, I'm a dealer with units to move. Stock list:")} className="btn btn-frost text-lg">
                Text A Stock List
              </a>
              <Link href="/offer?situation=dealer" className="btn btn-cash text-lg">
                Price One Unit <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
        <section className="band-paper section">
          <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className="rounded-[var(--radius)] bg-white p-7">
                <p.Icon size={36} weight="duotone" className="text-blue" />
                <h2 className="display mt-6 text-[1.9rem]">{p.t}</h2>
                <p className="mt-3 text-coal-2">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <Faq items={dealerFaq} title="Dealer Questions." />
      </main>
      <Footer />
    </>
  );
}
