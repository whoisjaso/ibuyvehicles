"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CheckSquare, ArrowRight, Certificate, UserSwitch, FileX, Wrench } from "@phosphor-icons/react";
import { titleRoutes, type TitleRoute } from "@/data/titleRoutes";

/** "Got the title?" answered in one tap, with exactly what to have ready on pickup day. */
export function TitleRouter() {
  const keys = (Object.keys(titleRoutes) as TitleRoute[]).filter((k) => k !== "dealer");
  const [k, setK] = useState<TitleRoute>("lost");
  const r = titleRoutes[k];
  return (
    <section id="title" className="py-[var(--section)]">
      <div className="wrap">
        <h2 className="vinyl vinyl-lg">Got The Title?</h2>
        <p className="lede mt-5">Every answer has a way through. Pick yours and see what to have ready.</p>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" aria-label="Title situation">
          {keys.map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={k === key}
              onClick={() => setK(key)}
              className={`decal shrink-0 !text-[1.1rem] ${k === key ? "decal-white" : "decal-line"}`}
            >
              {titleRoutes[key].label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid overflow-hidden rounded-[14px] bg-asphalt-2 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-[220px] flex-col justify-between gap-10 overflow-hidden bg-paint p-7 md:p-10">
            <div className="tape absolute inset-x-0 top-0 h-3" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.h3 key={k} className="vinyl vinyl-md" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                {r.headline}
              </motion.h3>
            </AnimatePresence>
            <RouteIcon k={k} />
            <p className="font-[family-name:var(--font-vinyl)] text-[1.2rem] font-bold uppercase tracking-[0.12em] text-white/80">Free tow. Paid at pickup.</p>
          </div>
          <div className="p-7 md:p-10" role="tabpanel">
            <h4 className="vinyl text-[1.9rem]">Have Ready On Pickup Day</h4>
            <AnimatePresence mode="wait">
              <motion.div key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <ul className="mt-5 space-y-4">
                  {r.bring.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[1.15rem]">
                      <CheckSquare size={26} weight="fill" className="shrink-0 text-ink" /> {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 max-w-[52ch] text-ink-2">{r.note}</p>
              </motion.div>
            </AnimatePresence>
            <Link href={`/offer?title=${k}`} className="decal decal-red mt-8">
              Get My Offer <ArrowRight size={20} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const routeIcons = { "in-hand": Certificate, "not-in-name": UserSwitch, lost: FileX, salvage: Wrench, dealer: Certificate } as const;

/** The paperwork itself, drawn large in the blue field, so the panel shows what the answer is about. */
function RouteIcon({ k }: { k: TitleRoute }) {
  const Icon = routeIcons[k];
  return (
    <AnimatePresence mode="wait">
      <motion.span key={k} className="block self-end text-white/25" initial={{ opacity: 0, rotate: -6, scale: 0.92 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} aria-hidden>
        <Icon size={168} weight="thin" />
      </motion.span>
    </AnimatePresence>
  );
}
