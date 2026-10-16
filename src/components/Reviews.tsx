"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GoogleLogo, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { reviews } from "@/data/reviews";
import { business } from "@/data/business";

/** One real Google review at a time, set large. Pauses when the visitor takes control. */
export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = reviews.length;
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 8000);
    return () => clearInterval(id);
  }, [paused, n]);
  const r = reviews[i];
  const go = (d: number) => {
    setPaused(true);
    setI((x) => (x + d + n) % n);
  };

  return (
    <section id="reviews" className="relative bg-asphalt-2 py-[var(--section)]">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="flex items-center gap-3 font-[family-name:var(--font-vinyl)] text-[1.5rem] font-extrabold uppercase tracking-[0.06em]">
            <GoogleLogo size={28} weight="bold" /> {business.googleReviews} Google Reviews
          </p>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous review" className="grid size-12 place-items-center rounded-[4px] bg-asphalt-4 transition-transform active:translate-y-0.5">
              <CaretLeft size={22} weight="bold" />
            </button>
            <button onClick={() => go(1)} aria-label="Next review" className="grid size-12 place-items-center rounded-[4px] bg-asphalt-4 transition-transform active:translate-y-0.5">
              <CaretRight size={22} weight="bold" />
            </button>
          </div>
        </div>
        <div className="mt-10 min-h-[17rem] md:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <blockquote className={`font-[family-name:var(--font-vinyl)] font-bold leading-[1.04] ${r.text.length > 150 ? "max-w-[40ch] text-[clamp(1.6rem,2.9vw,2.7rem)]" : "max-w-[26ch] text-[clamp(2.2rem,4.6vw,4.2rem)]"}`}>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-6 text-lg text-ink-2">
                {r.name}, on Google
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex gap-1.5" aria-hidden>
          {reviews.map((_, x) => (
            <span key={x} className={`h-2 rounded-[1px] transition-all duration-500 ${x === i ? "w-12 bg-tape" : "w-4 bg-asphalt-4"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
