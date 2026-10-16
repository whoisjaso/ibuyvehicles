"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CheckCircle, Truck } from "@phosphor-icons/react";
import { estimate, money, type EstimateInput } from "@/lib/estimate";
import { pricing } from "@/data/pricing";

/*
  A live demo of the estimator in the hero: it cycles through example vehicles
  and counts each range up, so a visitor sees the product before reading a word.
  Labelled "Example" because these are not real customers.
*/
const examples: (EstimateInput & { name: string; tags: string[] })[] = [
  { name: "2013 Dodge Charger", year: 2013, body: "sedan", miles: 168000, drive: "starts-only", damage: "minor", title: "lost", keys: "yes", tags: ["Won't Drive", "Lost Title"] },
  { name: "2018 Ford F-150", year: 2018, body: "truck", miles: 121000, drive: "drives", damage: "minor", title: "in-hand", keys: "yes", tags: ["Runs", "Dents"] },
  { name: "2007 Chevrolet Impala", year: 2007, body: "sedan", miles: 214000, drive: "no-start", damage: "none", title: "in-hand", keys: "no", tags: ["No Start", "No Keys"] },
  { name: "2011 Jeep Wrangler", year: 2011, body: "suv", miles: 146000, drive: "drives", damage: "major", title: "salvage", keys: "yes", tags: ["Wrecked", "Salvage"] },
];

export function OfferCard() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % examples.length), 4200);
    return () => clearInterval(id);
  }, []);
  const ex = examples[i];
  const r = estimate(ex);

  return (
    <div className="glass w-[400px] rounded-[28px] p-6">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-[11px] text-white/60">Example Instant Estimate</span>
        <span className="flex gap-1">
          {examples.map((_, n) => (
            <span key={n} className={`h-1 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-white" : "w-2 bg-white/25"}`} />
          ))}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
          <p className="display mt-5 text-[2rem]">{ex.name}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ex.tags.map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-black/40 p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-white/50">Estimated Cash Range</p>
            {pricing.showDollarRange ? (
              <p className="display mt-2 text-[3rem] text-white">
                <Count to={r.low} />
                <span className="text-white/40">–</span>
                <Count to={r.high} />
              </p>
            ) : (
              <p className="display mt-2 text-[2.2rem]">Mark Texts Your Number</p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <ul className="mt-5 space-y-2 text-sm text-white/80">
        <li className="flex items-center gap-2">
          <CheckCircle size={18} weight="fill" className="text-emerald-400" /> Final offer confirmed by Mark in person
        </li>
        <li className="flex items-center gap-2">
          <Truck size={18} weight="fill" className="text-emerald-400" /> Free tow · paid at pickup
        </li>
      </ul>
    </div>
  );
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const c = animate(Math.round(to * 0.6), to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = money(Math.round(v / 25) * 25)),
    });
    return () => c.stop();
  }, [to]);
  return <span ref={ref}>{money(to)}</span>;
}
