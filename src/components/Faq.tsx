"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

export function Faq({ items, title = "Questions, Answered." }: { items: readonly { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-stone py-[var(--section)]">
      <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <h2 className="t-1">{title}</h2>
        <div className="border-t border-rule">
          {items.map((f, i) => (
            <div key={f.q} className="border-b border-rule">
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="text-[1.25rem] tracking-[-0.01em]">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="grid shrink-0 place-items-center">
                  <Plus size={22} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="max-w-[62ch] pb-7 text-[1.06rem] leading-relaxed text-ink-2">{f.a}</p>
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
