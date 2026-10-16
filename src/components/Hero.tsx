"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Phone, ArrowRight } from "@phosphor-icons/react";
import { Emblem } from "./Emblem";
import { OpenNow } from "./OpenNow";
import { business, telHref } from "@/data/business";

const ease = [0.16, 1, 0.3, 1] as const;

/*
  First viewport: the truck door at night. Vinyl headline left, the painted
  door panel right carrying the real door lettering (name, number, city, since),
  the beacon sweeping both, the rear chevron tape along the bottom edge.
*/
export function Hero() {
  const reduce = useReducedMotion();
  const rise = (i: number) =>
    reduce ? {} : { initial: { y: "100%" }, animate: { y: 0 }, transition: { delay: 0.15 + i * 0.09, duration: 0.9, ease } };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Wet asphalt, sodium wash from below, beacon from the top right */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_55%_at_70%_105%,rgba(255,158,48,.16),transparent_70%),radial-gradient(60%_50%_at_10%_0%,rgba(31,72,201,.14),transparent_70%)]" />
      <div className="beacon-cone -z-10 left-[78%] top-[-30vmax] size-[150vmax] -translate-x-1/2 opacity-90 max-lg:left-[88%] max-lg:top-[-60vmax]" />
      <div className="sweep -z-10 absolute inset-0 opacity-70" aria-hidden />
      <div className="grain -z-10" />

      <div className="wrap grid flex-1 items-center gap-10 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-32">
        <div>
          <OpenNow className="mb-7 text-[15px] text-ink-2" />
          <h1 className="vinyl vinyl-xl">
            {["Cash", "Before", "The Tow."].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.04em]">
                <motion.span className={`block ${i === 2 ? "text-tape" : ""}`} {...rise(i)}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="lede mt-7" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>
            Junk, wrecked, no title, won&apos;t start. {business.owner} pays you at the curb, then hooks it up. Often within {business.pickupWindow}.
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7, ease }}>
            <Link href="/offer" className="decal decal-red">
              Get My Offer <ArrowRight size={20} weight="bold" />
            </Link>
            <a href={telHref} className="decal decal-line">
              <Phone size={20} weight="fill" /> Call {business.owner}
            </a>
          </motion.div>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 1.1, ease }}>
          <DoorPanel />
        </motion.div>
      </div>

      <div className="tape h-7 w-full md:h-9" aria-hidden />
    </section>
  );
}

function DoorPanel() {
  return (
    <a href={telHref} aria-label={`Call ${business.name} at ${business.phoneDisplay}`} className="door group block">
      {/* Window glass with the beacon passing across it */}
      <span className="relative block h-[26%] min-h-[96px] overflow-hidden rounded-tr-[48px] bg-[linear-gradient(160deg,#1a2233_0%,#07090d_70%)] shadow-[inset_0_-2px_0_rgba(0,0,0,.6)]" aria-hidden>
        <span className="sweep absolute inset-0" />
        <span className="absolute inset-y-0 left-[18%] w-[22%] -skew-x-12 bg-white/[.05]" />
      </span>
      {/* Chrome beltline */}
      <span className="block h-[5px] bg-[linear-gradient(90deg,#3b4352,#c9ced6_40%,#5d6573)]" aria-hidden />
      <span className="relative block p-6 sm:p-9">
        {/* Handle recess just under the beltline */}
        <span className="absolute right-7 top-5 h-3.5 w-24 rounded-full bg-black/45 shadow-[inset_0_2px_3px_rgba(0,0,0,.7),0_1px_0_rgba(255,255,255,.1)]" aria-hidden />
        <span className="flex items-center gap-4 pt-8">
          <Emblem size={84} className="size-16 shrink-0 drop-shadow-[0_2px_1px_rgba(0,0,0,.45)] sm:size-[84px]" />
          <span className="vinyl text-[clamp(2.4rem,5vw,4rem)] leading-[0.82] [text-shadow:0_2px_0_rgba(0,0,0,.35)]">
            iBuy
            <br />
            Vehicles
          </span>
        </span>
        <span className="vinyl mt-7 block text-[clamp(2.6rem,5.6vw,4.6rem)] tabular-nums tracking-[0.01em] text-white [text-shadow:0_2px_0_rgba(0,0,0,.35)] transition-colors group-hover:text-tape-hot">
          {business.phoneDisplay}
        </span>
        <span className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-[family-name:var(--font-vinyl)] text-[1.15rem] font-bold uppercase tracking-[0.14em] text-white/85">
          <span>Cash For Cars</span>
          <span>Any Condition</span>
        </span>
        <span className="tape mt-8 block h-3 rounded-[1px]" aria-hidden />
        <span className="mt-4 flex items-end justify-between font-[family-name:var(--font-vinyl)] text-[1rem] font-bold uppercase tracking-[0.16em] text-white/70">
          <span>
            {business.city}, {business.state}
          </span>
          <span>Since {business.since}</span>
        </span>
      </span>
    </a>
  );
}
