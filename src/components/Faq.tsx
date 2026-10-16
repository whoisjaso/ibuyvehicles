"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

export function Faq({ items, title = "Straight Answers." }: { items: readonly { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-asphalt-2 py-[var(--section)]">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 className="vinyl vinyl-lg max-w-[8ch]">{title}</h2>
        <div className="border-t border-[var(--line)]">
          {items.map((f, i) => (
            <div key={f.q} className="border-b border-[var(--line)]">
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="vinyl text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1]">{f.q}</span>
                <span className={`grid size-11 shrink-0 place-items-center rounded-[4px] transition-colors ${open === i ? "bg-tape" : "bg-asphalt-3"}`}>
                  <motion.span className="grid" animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                    <Plus size={20} weight="bold" />
                  </motion.span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="max-w-[62ch] pb-7 text-[1.1rem] leading-relaxed text-ink-2">{f.a}</p>
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
