"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { reviews } from "@/data/reviews";
import { business } from "@/data/business";

/** One real Google review at a time, set like a pull quote. Stops rotating once touched. */
export function Reviews() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const n = reviews.length;
  useEffect(() => {
    if (held) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 8000);
    return () => clearInterval(id);
  }, [held, n]);
  const go = (d: number) => {
    setHeld(true);
    setI((x) => (x + d + n) % n);
  };
  const r = reviews[i];
  return (
    <section id="reviews" className="border-t border-rule py-[var(--section)]">
      <div className="wrap">
        <div className="flex items-center justify-between gap-6">
          <div className="ml-auto flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous review" className="grid size-12 place-items-center rounded-full bg-stone transition-colors hover:bg-stone-2">
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => go(1)} aria-label="Next review" className="grid size-12 place-items-center rounded-full bg-stone transition-colors hover:bg-stone-2">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="mt-10 min-h-[15rem] md:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <blockquote className={`max-w-[34ch] tracking-[-0.02em] ${r.text.length > 150 ? "text-[clamp(1.5rem,2.4vw,2.3rem)] leading-[1.25]" : "text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.15]"}`}>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-8 text-ink-3">
                {r.name}, on Google. Review {i + 1} of {n} from {business.googleReviews}.
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
