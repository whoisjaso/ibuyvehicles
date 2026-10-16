"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

/*
  The visitor finds their own sentence, in door lettering, and taps it.
  Each row opens the estimator already set up for that problem.
*/
const rows = [
  { label: "Won't Start", line: "Dead battery, blown engine, sitting for months.", href: "/offer?drive=no-start" },
  { label: "No Title", line: "Lost, never transferred, or not in your name.", href: "/offer?title=lost" },
  { label: "Wrecked", line: "Accident damage, airbags out, cracked glass.", href: "/offer?damage=major" },
  { label: "Flooded", line: "Water got inside. Most buyers walk away. Mark doesn't.", href: "/offer?damage=flood" },
  { label: "Rent's Due", line: "You need cash this week, not a buyer next month.", href: "/offer?situation=cash-now" },
  { label: "Got Another Offer", line: "Get a second look from a real person before you sign.", href: "/offer?situation=second-opinion" },
  { label: "Runs Fine", line: "Just done with it. Mark buys those too.", href: "/offer?drive=drives" },
];

export function ProblemBoard() {
  const reduce = useReducedMotion();
  return (
    <section id="problems" className="pb-16 pt-[var(--section)] md:pb-24">
      <div className="wrap">
        <h2 className="vinyl vinyl-lg max-w-[12ch]">What&apos;s Wrong With It?</h2>
        <p className="lede mt-5">Tap yours. Your estimate opens already set up for it.</p>
        <ul className="mt-12 border-t border-[var(--line)]">
          {rows.map((r, i) => (
            <motion.li
              key={r.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={r.href} className="group relative flex items-center gap-6 overflow-hidden border-b border-[var(--line)] py-5 md:py-6">
                {/* The red decal wipes in on hover, like vinyl being laid */}
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-tape transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100" aria-hidden />
                <span className="vinyl min-w-0 flex-1 text-[clamp(2.4rem,6vw,5.2rem)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-4 md:group-hover:translate-x-6">{r.label}</span>
                <span className="hidden max-w-[30ch] text-ink-2 transition-colors group-hover:text-white md:block">{r.line}</span>
                <span className="grid size-12 shrink-0 place-items-center rounded-[4px] bg-asphalt-3 transition-colors group-hover:bg-white group-hover:text-tape md:mr-6">
                  <ArrowRight size={22} weight="bold" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
