"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Star, GoogleLogo } from "@phosphor-icons/react";
import { reviews } from "@/data/reviews";
import { business } from "@/data/business";

export function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % 4), 7000);
    return () => clearInterval(id);
  }, []);
  const featured = reviews[i];
  const rest = reviews.slice(4).concat(reviews.slice(0, 4));

  return (
    <section className="band-paper section overflow-hidden" id="reviews">
      <div className="wrap">
        <div className="flex items-center gap-3 text-coal-2">
          <GoogleLogo size={22} weight="bold" />
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold">{business.googleReviews} Google Reviews</span>
          <span className="flex text-[#f4b400]">
            {Array.from({ length: 5 }).map((_, n) => (
              <Star key={n} size={18} weight="fill" />
            ))}
          </span>
        </div>
        <div className="relative mt-10 min-h-[340px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-4 inline-block rounded-full bg-coal px-4 py-1.5 font-[family-name:var(--font-display)] text-sm font-semibold capitalize text-white">{featured.tag}</span>
              <blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.01em]">
                &ldquo;{featured.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-coal-2">— {featured.name}, Google review</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex gap-2">
          {[0, 1, 2, 3].map((n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Review ${n + 1}`} className="h-11 w-8">
              <span className={`block h-1 rounded-full transition-all ${n === i ? "bg-coal" : "bg-coal/20"}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="marquee mt-12" style={{ ["--marquee-speed" as string]: "60s" }}>
        {[0, 1].map((k) => (
          <div key={k} className="marquee-track !gap-4 !pr-4" aria-hidden={k === 1}>
            {rest.map((r) => (
              <figure key={r.name + k} className="w-[320px] shrink-0 rounded-2xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(0,0,0,.4)]">
                <span className="flex text-[#f4b400]">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <Star key={n} size={14} weight="fill" />
                  ))}
                </span>
                <blockquote className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-coal">{r.text}</blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-coal-2">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
