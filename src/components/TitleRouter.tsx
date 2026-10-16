"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { titleRoutes, type TitleRoute } from "@/data/titleRoutes";

/** "Do you have the title?" answered in one tap, with exactly what to have ready. */
export function TitleRouter() {
  const keys = Object.keys(titleRoutes) as TitleRoute[];
  const [k, setK] = useState<TitleRoute>("lost");
  const r = titleRoutes[k];
  return (
    <section className="band-paper section" id="title">
      <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="eyebrow text-red">The Paperwork Question</p>
          <h2 className="display display-lg mt-4">Do You Have The Title?</h2>
          <p className="lede mt-6 max-w-[460px] text-coal-2">Whatever the answer, there&apos;s a path. Tap yours and see exactly what to have ready. No guessing, no tax-office detour.</p>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Title situation">
            {keys.map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={k === key}
                onClick={() => setK(key)}
                className={`btn !min-h-12 !px-5 text-base ${k === key ? "btn-dark" : "btn-ghost-dark"}`}
              >
                {titleRoutes[key].label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-coal p-7 text-white md:p-10">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-red/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-blue/30 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={k}
              className="relative"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow text-white/50">{r.short}</p>
              <h3 className="display display-md mt-3">{r.headline}</h3>
              <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-white/50">Have Ready</p>
              <ul className="mt-4 space-y-3">
                {r.bring.map((b, i) => (
                  <motion.li
                    key={b}
                    className="flex items-start gap-3 text-lg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    <CheckCircle size={24} weight="fill" className="mt-0.5 shrink-0 text-emerald-400" /> {b}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 max-w-[52ch] text-white/70">{r.note}</p>
              <Link href={k === "dealer" ? "/dealers" : `/offer?title=${k}`} className="btn btn-cash mt-8">
                Get My Offer <ArrowRight size={18} weight="bold" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
