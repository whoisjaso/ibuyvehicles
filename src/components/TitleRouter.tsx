"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { titleRoutes, type TitleRoute } from "@/data/titleRoutes";

/** "Do you have the title?" answered in one tap, with what to have ready on pickup day. */
export function TitleRouter() {
  const keys = (Object.keys(titleRoutes) as TitleRoute[]).filter((k) => k !== "dealer");
  const [k, setK] = useState<TitleRoute>("lost");
  const r = titleRoutes[k];
  return (
    <section id="title" className="py-[var(--section)]">
      <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <h2 className="t-1">Do You Have The Title?</h2>
          <p className="lede mt-6">Every answer has a way through. Choose yours and see exactly what to have ready.</p>
          <div className="mt-10 border-t border-rule" role="tablist" aria-label="Title situation">
            {keys.map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={k === key}
                onClick={() => setK(key)}
                className="group flex w-full items-center justify-between border-b border-rule py-5 text-left"
              >
                <span className={`text-[1.3rem] tracking-[-0.01em] transition-colors ${k === key ? "text-ink" : "text-ink-3 group-hover:text-ink"}`}>{titleRoutes[key].label}</span>
                <span className={`size-2.5 rounded-full transition-colors ${k === key ? "bg-ink" : "bg-transparent"}`} aria-hidden />
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[12px] bg-stone p-8 md:p-12" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <h3 className="t-1">{r.headline}</h3>
              <h4 className="t-3 mt-10">Have Ready On Pickup Day</h4>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {r.bring.map((b) => (
                  <li key={b} className="flex items-start gap-4 py-4 text-[1.1rem]">
                    <Check size={20} className="mt-1 shrink-0" /> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[54ch] text-ink-2">{r.note}</p>
              <Link href={`/offer?title=${k}`} className="btn btn-ink mt-10">
                Get My Offer
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
