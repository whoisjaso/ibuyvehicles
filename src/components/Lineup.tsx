"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import { Photo } from "./Photo";
import type { SlotName } from "@/data/media";

/*
  The model range, for problem cars. Each tile is a situation the visitor
  recognises, photographed in the same white studio (slots B01 to B06), and
  each opens the estimator already set up for it.
*/
const range: { slot: SlotName; title: string; line: string; href: string }[] = [
  { slot: "wontStart", title: "Won't Start", line: "Dead, sitting, or the engine's gone.", href: "/offer?drive=no-start" },
  { slot: "noTitle", title: "No Title", line: "Lost, never transferred, or not in your name.", href: "/offer?title=lost" },
  { slot: "wrecked", title: "Wrecked", line: "Accident damage, airbags out, cracked glass.", href: "/offer?damage=major" },
  { slot: "flooded", title: "Flooded", line: "Water got inside. Mark still buys it.", href: "/offer?damage=flood" },
  { slot: "runsFine", title: "Runs Fine", line: "Just done with it. Sold in a day.", href: "/offer?drive=drives" },
  { slot: "dealer", title: "Dealer Units", line: "Aged inventory, one call, picked up free.", href: "/dealers" },
];

export function Lineup() {
  const rail = useRef<HTMLUListElement>(null);
  const nudge = (d: number) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section id="lineup" className="pt-[var(--section)]">
      <div className="wrap flex items-end justify-between gap-6">
        <h2 className="t-1 max-w-[16ch]">Every Kind Of Car. Every Kind Of Problem.</h2>
        <div className="hidden gap-2 md:flex">
          <button onClick={() => nudge(-1)} aria-label="Previous" className="grid size-12 place-items-center rounded-full bg-stone transition-colors hover:bg-stone-2">
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => nudge(1)} aria-label="Next" className="grid size-12 place-items-center rounded-full bg-stone transition-colors hover:bg-stone-2">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <ul ref={rail} className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 [scrollbar-width:none] md:gap-4">
        {range.map((r) => (
          <li key={r.title} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[29vw] 2xl:w-[24vw]">
            <Link href={r.href} className="group block">
              <div className="tile aspect-[4/5]">
                <Photo slot={r.slot} sizes="(min-width:1024px) 30vw, 78vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                  <div>
                    <h3 className="t-2">{r.title}</h3>
                    <p className="mt-1.5 text-[15px] text-white/80">{r.line}</p>
                  </div>
                  <span className="orb shrink-0">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
