"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { DeviceMobile, UserCheck, Money } from "@phosphor-icons/react";
import { business } from "@/data/business";

/*
  The sticky story. The section is 320vh tall; the stage pins while the visitor
  scrolls and a road draws itself: the car is priced, the tow truck arrives,
  and the cash lands. Each step lights up in turn.
*/
const steps = [
  { n: "01", Icon: DeviceMobile, title: "Tell Us About It.", body: "Sixty seconds online, a text, or one call. Year, make, how it runs, and whether you have the title. Get an instant estimate." },
  { n: "02", Icon: UserCheck, title: `${business.owner} Confirms It.`, body: `A real person, not an algorithm, gives you the final number after a quick look and a VIN check. No haggling at the curb.` },
  { n: "03", Icon: Money, title: "Paid. Then Towed.", body: `The truck is often there within ${business.pickupWindow}. You're paid before it's hooked up, and the tow is free.` },
];

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(v < 0.33 ? 0 : v < 0.66 ? 1 : 2));

  return (
    <section ref={ref} id="how" className="relative h-[320vh] bg-night">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_60%,rgba(31,72,201,.18),transparent_70%)]" />
        <div className="wrap relative grid h-full content-start gap-6 pt-[88px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:content-center lg:items-center lg:gap-16 lg:pt-0">
          <div>
            <p className="eyebrow text-red">How It Works</p>
            <h2 className="display display-md mt-3">Driveway To Cash In Three Moves.</h2>
            <div className="mt-2 h-[30svh] lg:hidden">
              <Stage progress={scrollYProgress} />
            </div>
            <ol className="mt-2 space-y-1 lg:mt-10 lg:space-y-4">
              {steps.map((s, i) => (
                <li key={s.n} className={`rounded-2xl p-3 transition-all duration-500 lg:p-5 ${active === i ? "bg-white/[.07] opacity-100" : "opacity-35"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-500 ${active === i ? "bg-red text-white" : "bg-white/10"}`}>
                      <s.Icon size={22} weight="fill" />
                    </span>
                    <h3 className="display text-[1.7rem] lg:text-[2.1rem]">{s.title}</h3>
                  </div>
                  <motion.p
                    initial={false}
                    animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                    className="overflow-hidden pl-[60px] text-[15px] leading-relaxed text-ink-2 lg:text-base"
                  >
                    <span className="block pt-2">{s.body}</span>
                  </motion.p>
                </li>
              ))}
            </ol>
            <Link href="/offer" className="btn btn-cash mt-6 hidden lg:inline-flex">
              Start Step One
            </Link>
          </div>
          <div className="hidden lg:block">
            <Stage progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const road = useTransform(progress, [0, 0.95], [0, 1]);
  const carX = useTransform(progress, [0, 0.28, 0.66, 0.74, 0.98], [-200, 230, 230, 206, 868]);
  const carY = useTransform(progress, [0.64, 0.74], [0, -46]);
  const carS = useTransform(progress, [0.64, 0.74], [1, 0.78]);
  const truckX = useTransform(progress, [0.3, 0.6, 0.74, 0.98], [820, 220, 220, 882]);
  const truckO = useTransform(progress, [0.28, 0.36], [0, 1]);
  const priceO = useTransform(progress, [0.08, 0.2, 0.62, 0.7], [0, 1, 1, 0]);
  const priceY = useTransform(progress, [0.08, 0.2], [20, 0]);
  const checkS = useTransform(progress, [0.42, 0.52], [0, 1]);
  const cashO = useTransform(progress, [0.7, 0.8], [0, 1]);
  const cashY = useTransform(progress, [0.7, 0.9], [40, -10]);
  const amount = useTransform(progress, [0.7, 0.95], [0, 1]);

  return (
    <div className="relative mx-auto h-full w-full max-w-[760px] lg:aspect-[16/11] lg:h-auto">
      <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="roadG" x1="0" x2="1">
            <stop offset="0" stopColor="#e1252c" />
            <stop offset="1" stopColor="#5b82ff" />
          </linearGradient>
          <radialGradient id="glow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#fff" stopOpacity=".25" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Skyline */}
        <g fill="#1a1d26">
          {[40, 90, 130, 175, 230, 280, 330, 370, 430, 470, 520, 570, 610, 660, 710, 750].map((x, i) => (
            <rect key={x} x={x} y={330 - ((i * 37) % 120) - 40} width={36} height={((i * 37) % 120) + 40} rx="2" />
          ))}
        </g>
        <rect x="0" y="330" width="800" height="220" fill="#0c0e13" />
        <path d="M0 420 L800 420" stroke="#262a35" strokeWidth="56" />
        <path d="M0 420 L800 420" stroke="#3a3f4c" strokeWidth="2" strokeDasharray="24 22" />
        <motion.path d="M0 452 L800 452" stroke="url(#roadG)" strokeWidth="4" strokeLinecap="round" style={{ pathLength: road }} />
        {/* Tow truck */}
        <motion.g style={{ x: truckX, opacity: truckO }}>
          <ellipse cx="120" cy="442" rx="120" ry="9" fill="#000" opacity=".5" />
          <rect x="0" y="398" width="160" height="22" rx="3" fill="#e1252c" />
          <path d="M160 420 v-56 q0-8 8-8 h34 q6 0 10 5 l20 26 q4 5 4 11 v22 z" fill="#f2f3f5" />
          <path d="M172 366 h28 l16 22 h-44 z" fill="#1c2230" />
          <rect x="40" y="384" width="8" height="14" fill="#e9c46a" />
          <circle cx="40" cy="434" r="13" fill="#0b0c0f" />
          <circle cx="110" cy="434" r="13" fill="#0b0c0f" />
          <circle cx="200" cy="434" r="13" fill="#0b0c0f" />
          <rect x="190" y="350" width="22" height="5" rx="2" fill="#e1252c" />
        </motion.g>
        {/* Car */}
        <motion.g style={{ x: carX, y: carY, scale: carS, transformOrigin: "90px 440px" }}>
          <ellipse cx="60" cy="440" rx="70" ry="8" fill="#000" opacity=".5" />
          <path d="M0 430 v-22 q0-8 8-10 l26-6 l24-22 q6-5 14-5 h52 q8 0 13 6 l18 21 l22 4 q10 2 10 12 v22 z" fill="#c9ccd3" />
          <path d="M62 392 l18-17 q3-3 7-3 h22 v20 z M115 372 h20 q5 0 8 4 l12 16 h-40 z" fill="#1c2230" />
          <circle cx="38" cy="432" r="13" fill="#0b0c0f" />
          <circle cx="38" cy="432" r="5" fill="#5d626e" />
          <circle cx="148" cy="432" r="13" fill="#0b0c0f" />
          <circle cx="148" cy="432" r="5" fill="#5d626e" />
          <rect x="174" y="404" width="8" height="5" rx="2" fill="#fff4c2" />
        </motion.g>
      </svg>

      {/* Step 1: price tag */}
      <motion.div style={{ opacity: priceO, y: priceY }} className="glass absolute left-[18%] top-[14%] rounded-2xl px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Instant Estimate</p>
        <p className="display mt-1 text-3xl">Range Ready</p>
        <p className="text-xs text-white/60">in about 60 seconds</p>
      </motion.div>

      {/* Step 2: confirmed */}
      <motion.div style={{ scale: checkS }} className="absolute right-[12%] top-[10%] grid size-28 place-items-center rounded-full bg-emerald-500/90 text-center shadow-[0_0_60px_rgba(16,185,129,.5)]">
        <span className="display text-xl leading-none">
          Offer
          <br />
          Locked
        </span>
      </motion.div>

      {/* Step 3: cash */}
      <motion.div style={{ opacity: cashO, y: cashY }} className="absolute left-1/2 top-[8%] -translate-x-1/2 text-center">
        <div className="relative">
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="absolute left-1/2 top-1/2 h-16 w-32 -translate-x-1/2 -translate-y-1/2 rounded-md border border-emerald-200/40 bg-gradient-to-br from-emerald-700 to-emerald-900"
              style={{ rotate: `${(n - 1) * 9}deg` }}
            />
          ))}
          <div className="relative h-16 w-32 rounded-md border border-emerald-100/60 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-2xl">
            <span className="display absolute inset-0 grid place-items-center text-3xl text-emerald-50">$</span>
          </div>
        </div>
        <motion.p className="display mt-5 text-3xl">
          Paid <motion.span style={{ opacity: amount }}>On The Spot</motion.span>
        </motion.p>
      </motion.div>
    </div>
  );
}
