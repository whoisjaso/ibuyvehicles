"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import type { SlotName } from "@/data/media";
import { business } from "@/data/business";

/*
  One evening, start to finish. The left column holds still while three tall
  photographs pass on the right; the clock and the sentence change as each
  one reaches the middle of the screen. Times are illustrative and stay
  inside business hours and the published pickup window.
*/
const steps: { slot: SlotName; time: string; title: string; body: string }[] = [
  { slot: "stepSend", time: "6:12 PM", title: "You send the car.", body: "Sixty seconds online, a text with a few photos, or one call. You see an estimate before you give your number." },
  { slot: "stepCall", time: "6:25 PM", title: `${business.owner} calls with the number.`, body: "He has read your answers and seen your photos. One honest offer. Nothing to negotiate at the curb." },
  { slot: "stepPaid", time: "8:40 PM", title: "Paid. Then towed.", body: "Cash in your hand before the car is hooked up. The tow is free, and the driveway is yours again." },
];

export function Evening() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section id="evening" className="bg-stone py-[var(--section)]">
      <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-[18vh] lg:h-fit">
          <h2 className="t-1">One Evening, Start To Finish.</h2>
          <div className="mt-10 hidden lg:block" aria-live="polite">
            <div className="relative h-[1.1em] overflow-hidden text-[clamp(3.5rem,6vw,6rem)] font-light leading-none tracking-[-0.04em] tabular-nums">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={steps[i].time} className="absolute inset-0" initial={reduce ? { opacity: 0 } : { y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { y: "-60%", opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  {steps[i].time}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex gap-1.5" aria-hidden>
              {steps.map((s, n) => (
                <span key={s.time} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${n <= i ? "bg-ink" : "bg-rule"}`} />
              ))}
            </div>
            <p className="mt-6 max-w-[40ch] text-[15px] text-ink-3">An illustrated evening. Pickup is often within {business.pickupWindow} of your call.</p>
            <Link href="/offer" className="btn btn-ink mt-8">
              Get My Offer
            </Link>
          </div>
        </div>
        <ol className="space-y-16 lg:space-y-[18vh]">
          {steps.map((s, n) => (
            <Step key={s.time} s={s} onActive={() => setI(n)} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ s, onActive }: { s: (typeof steps)[number]; onActive: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);
  return (
    <li ref={ref}>
      <div className="tile aspect-[4/5] lg:aspect-[5/6]">
        <Photo slot={s.slot} sizes="(min-width:1024px) 55vw, 100vw" />
      </div>
      <p className="mt-6 text-[15px] tabular-nums text-ink-3">{s.time}</p>
      <h3 className="t-2 mt-1">{s.title}</h3>
      <p className="lede mt-3">{s.body}</p>
    </li>
  );
}
