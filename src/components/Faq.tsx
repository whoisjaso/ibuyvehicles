"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

export function Faq({ items, title = "Questions, Answered.", light = false }: { items: readonly { q: string; a: string }[]; title?: string; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`section ${light ? "band-paper" : "bg-night"}`} id="faq">
      <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="eyebrow text-red">FAQ</p>
          <h2 className="display display-lg mt-4">{title}</h2>
        </div>
        <div>
          {items.map((f, i) => (
            <div key={f.q} className={`border-b ${light ? "border-black/10" : "border-white/10"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="font-[family-name:var(--font-display)] text-[1.45rem] font-semibold leading-tight md:text-[1.7rem]">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className={`grid size-10 shrink-0 place-items-center rounded-full ${light ? "bg-black/5" : "bg-white/10"}`}>
                  <Plus size={18} weight="bold" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className={`max-w-[62ch] pb-7 text-lg leading-relaxed ${light ? "text-coal-2" : "text-ink-2"}`}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
