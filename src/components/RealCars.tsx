"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "./Photo";
import type { SlotName } from "@/data/media";

/** Mark's own photos: horizontal drift on scroll, proof that these are real cars from real driveways. */
const cars: { slot: SlotName; caption: string }[] = [
  { slot: "realTow", caption: "Hooked up in an apartment lot" },
  { slot: "realJeep", caption: "Cracked glass, still bought" },
  { slot: "realImpala", caption: "Driveway pickup" },
  { slot: "realCharger", caption: "Into the shop" },
];

export function RealCars() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-18%"]);
  return (
    <section ref={ref} className="section overflow-hidden bg-night" id="real">
      <div className="wrap flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-red">Real Cars. Real Driveways.</p>
          <h2 className="display display-lg mt-4 max-w-[14ch]">If It Has Wheels, We&apos;ve Seen Worse.</h2>
        </div>
        <p className="lede max-w-[420px] text-ink-2">Straight from iBuy Vehicles&apos; own camera roll. Dents, cracked glass, dead batteries: none of it is a deal-breaker.</p>
      </div>
      <motion.div style={{ x }} className="mt-14 flex gap-4 pl-[var(--gutter)]">
        {cars.map((c) => (
          <figure key={c.slot} className="tile relative aspect-[4/5] w-[72vw] shrink-0 sm:w-[44vw] lg:w-[30vw]">
            <Photo slot={c.slot} sizes="(min-width:1024px) 30vw, 72vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16 font-[family-name:var(--font-display)] text-xl font-semibold capitalize">
              {c.caption}
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </section>
  );
}
