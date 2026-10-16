"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { business } from "@/data/business";

/*
  One evening, as a dispatch log. The section pins while the clock rolls
  forward and each entry lights in turn; the tape fills as the night goes on.
  Times are illustrative and stay inside business hours and the published
  2 to 4 hour pickup window.
*/
const log = [
  { time: "6:12", title: "You send the car.", body: "Sixty seconds online, a text, or one call. You see an instant estimate before you give your number." },
  { time: "6:25", title: `${business.owner} calls with the real number.`, body: "He's read your answers and seen your photos. No haggling at the curb, no surprises on the driveway." },
  { time: "8:40", title: "Paid. Then towed.", body: "Cash in your hand before the car is hooked up. The tow is free. The space is yours again." },
];

export function Dispatch() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(v < 0.34 ? 0 : v < 0.68 ? 1 : 2));
  const fill = useTransform(scrollYProgress, [0.02, 0.92], ["0%", "100%"]);

  return (
    <section ref={ref} id="dispatch" className="relative h-[300svh] bg-asphalt-2">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="beacon-cone left-[85%] top-[-50vmax] size-[110vmax] -translate-x-1/2 opacity-40" aria-hidden />
        <div className="wrap relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="vinyl vinyl-md text-ink-2">One Evening In Houston.</h2>
            <div className="mt-4 flex items-baseline gap-4" aria-live="polite">
              <span className="relative inline-block overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={log[i].time}
                    className="vinyl block text-[clamp(6rem,21vw,17rem)] leading-[0.8] tabular-nums"
                    initial={reduce ? { opacity: 0 } : { y: "70%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: "-70%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {log[i].time}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="vinyl text-[clamp(2rem,5vw,4rem)] text-tape">PM</span>
            </div>
            <div className="mt-6 h-3 w-full max-w-[640px] overflow-hidden rounded-[2px] bg-asphalt-4" aria-hidden>
              <motion.div className="tape h-full" style={{ width: fill }} />
            </div>
          </div>
          <ol className="space-y-2">
            {log.map((e, n) => (
              <li key={e.time} className={`py-3 transition-opacity duration-500 ${n === i ? "opacity-100" : n < i ? "opacity-45" : "opacity-30"}`}>
                <p className="flex items-center gap-3 font-[family-name:var(--font-vinyl)] text-base font-bold uppercase tracking-[0.14em] text-ink-2">
                  <span className={`size-2.5 rounded-[1px] transition-colors duration-500 ${n === i ? "bg-tape" : "bg-asphalt-4"}`} aria-hidden />
                  {e.time} PM
                </p>
                <h3 className="vinyl mt-1 text-[clamp(1.9rem,3vw,2.6rem)] leading-[0.95]">{e.title}</h3>
                <motion.p initial={false} animate={{ height: n === i ? "auto" : 0, opacity: n === i ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden text-ink-2">
                  <span className="block pt-2">{e.body}</span>
                </motion.p>
              </li>
            ))}
            <li className="pt-4">
              <p className="text-sm text-ink-3">An illustrated evening. Pickup is often within {business.pickupWindow} of your call.</p>
              <Link href="/offer" className="decal decal-red mt-5 max-md:hidden">
                Get My Offer <ArrowRight size={20} weight="bold" />
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
