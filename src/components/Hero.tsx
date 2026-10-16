"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import { MarkBust } from "./MarkAvatar";
import { openMarkChat, PROBLEMS } from "./MarkChat";
import { business, telHref } from "@/data/business";

const ease = [0.16, 1, 0.3, 1] as const;

/*
  One fixed photograph, the way a marque opens: an ordinary car lit like a
  flagship (slot A01), with a slow studio light passing over it. The first
  line of the headline cycles through the seller's actual problem before
  landing on the promise. Mark leans in from the corner with a question and
  tap-to-answer chips that open his chat already on that answer.
*/
// Their words, from the seller research (docs/ICP-RESEARCH.md): the problem,
// the trigger, the fear. Each one lands word by word, then lifts away.
const PROBES = [
  "Won't start?",
  "Lost the title?",
  "Never titled to you?",
  "Transmission out?",
  "Repair costs more than it's worth?",
  "Red tag on the windshield?",
  "Need the money today?",
  "Lowballed at the curb before?",
  "Inherited a car you don't need?",
  "Tired of looking at it in the driveway?",
];

function Probe() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % PROBES.length), 2900);
    return () => clearInterval(id);
  }, [reduce]);
  const words = PROBES[i].split(" ");
  return (
    <span aria-hidden className="mb-3 flex min-h-[2.3em] items-end text-[clamp(1.35rem,2.3vw,2.15rem)] font-normal leading-[1.12] tracking-[-0.015em] text-on-night-2 md:mb-4 md:max-w-[22ch]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={i} className="block" exit={{ opacity: 0, y: "-0.35em", filter: "blur(8px)", transition: { duration: 0.35, ease } }}>
          {words.map((w, k) => (
            <motion.span
              key={k}
              className="inline-block whitespace-pre"
              initial={{ opacity: 0, y: "0.45em", filter: "blur(10px)" }}
              animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
              transition={{ delay: k * 0.07, duration: 0.55, ease }}
            >
              {w + (k < words.length - 1 ? " " : "")}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Mark future-paces before he asks: who he is, what tonight looks like, then the question.
const MARK_LINES = [
  "I make the offer myself.",
  "Tonight the driveway is empty and the money's in your pocket.",
  "The number I give you is the number you're handed.",
  "That title thing you've been putting off? Two-minute conversation.",
  "What's going on with your car?",
];

function useMarkLine(start: number) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? MARK_LINES.length - 1 : -1);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const t: number[] = [];
    let at = start;
    MARK_LINES.forEach((_, k) => {
      t.push(window.setTimeout(() => setTyping(true), at));
      at += 850;
      t.push(window.setTimeout(() => { setTyping(false); setN(k); }, at));
      at += k === MARK_LINES.length - 1 ? 0 : 2600;
    });
    return () => t.forEach(clearTimeout);
  }, [reduce, start]);
  return { line: n >= 0 ? MARK_LINES[n] : null, typing, last: n === MARK_LINES.length - 1 };
}

function Dots() {
  return (
    <span className="inline-flex gap-1 py-1.5" aria-hidden>
      {[0, 1, 2].map((k) => (
        <motion.span key={k} className="size-1.5 rounded-full bg-white/70" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.9, repeat: Infinity, delay: k * 0.15 }} />
      ))}
    </span>
  );
}

const PILL = ["I make the offer myself.", "Paid before it's towed.", "Tap to tell me about your car."];

function PillLine() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? PILL.length - 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % PILL.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={i}
        className="text-white/75"
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(5px)" }}
        transition={{ duration: 0.35, ease }}
      >
        {PILL[i]}
      </motion.span>
    </AnimatePresence>
  );
}

const CHIPS = ["no-start", "wrecked", "flood"] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const mark = useMarkLine(2300);

  return (
    <section ref={ref} className="on-night relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-black text-white">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 6, ease }}>
          <div className="absolute inset-0 hidden md:block">
            <Photo slot="hero" priority />
          </div>
          {/* Phones: the photo holds the top two thirds so the car clears the headline. */}
          <div className="absolute inset-x-0 top-0 h-[66%] md:hidden">
            <Photo slot="heroMobile" priority />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black" />
          </div>
        </motion.div>
        {!reduce && <div aria-hidden className="hero-sweep pointer-events-none absolute inset-0" />}
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.28)_38%,rgba(0,0,0,0)_62%)]" />

      {/* Phones: Mark waits above the car. */}
      <motion.button
        type="button"
        onClick={() => openMarkChat()}
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7, ease }}
        className="absolute left-[var(--gutter)] top-[88px] flex items-center gap-2.5 rounded-full bg-white/12 py-1.5 pl-1.5 pr-4 text-left backdrop-blur-md ring-1 ring-white/20 md:hidden"
      >
        <MarkBust size={36} ring={false} />
        <span className="text-[14px] leading-tight">
          <span className="font-semibold">Hey, I&apos;m {business.owner}.</span>{" "}
          <PillLine />
        </span>
      </motion.button>

      <div className="wrap flex h-full flex-col justify-end pb-12 md:pb-16">
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.1, ease }} className="max-w-[760px]">
          <h1 className="t-hero">
            <span className="sr-only">Won&apos;t start, no title, wrecked or flooded? </span>
            <Probe />
            Cash Before <br />
            The Tow.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[1.12rem] leading-relaxed text-white/85">
            <span className="[@media(max-height:720px)]:max-md:hidden">Junk, wrecked, no title, won&apos;t start. </span>
            {business.owner} makes the offer himself, pays you on the spot, and tows it free. Often within {business.pickupWindow}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row [@media(max-height:720px)]:mt-6 [@media(max-height:720px)]:flex-row [@media(max-height:720px)]:*:flex-1">
            <Link href="/offer" className="btn btn-red">
              Get My Offer
            </Link>
            <a href={telHref} className="btn btn-frost">
              Call {business.owner}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Desktop: Mark leans in from the corner with a question. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 220, damping: 20 }}
        className="absolute bottom-16 right-[var(--gutter)] hidden w-[330px] origin-bottom-right lg:block"
      >
        <div className="rounded-[18px] rounded-br-[6px] bg-white/[.08] p-4 ring-1 ring-white/15 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <motion.span animate={reduce ? undefined : { rotate: [0, -6, 4, 0] }} transition={{ delay: 2.4, duration: 0.9, repeat: Infinity, repeatDelay: 6 }}>
              <MarkBust size={52} />
            </motion.span>
            <p className="min-h-[3.9em] text-[15px] leading-snug" aria-live="polite">
              <span className="block font-semibold">Hey, I&apos;m {business.owner}.</span>
              <AnimatePresence mode="wait" initial={false}>
                {mark.typing ? (
                  <motion.span key="dots" className="block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Dots />
                  </motion.span>
                ) : mark.line ? (
                  <motion.span
                    key={mark.line}
                    className="block text-white/80"
                    initial={reduce ? false : { opacity: 0, y: 6, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease }}
                  >
                    {mark.line}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </p>
          </div>
          <motion.div className="mt-3.5 flex flex-wrap gap-2" initial={false} animate={{ opacity: mark.last ? 1 : 0.35 }} transition={{ duration: 0.5 }}>
            {CHIPS.map((id) => {
              const p = PROBLEMS.find((x) => x.id === id)!;
              return (
                <button key={id} type="button" onClick={() => openMarkChat(id)} className="rounded-full bg-white/10 px-3.5 py-2 text-[14px] font-medium ring-1 ring-white/20 transition-colors hover:bg-white hover:text-ink">
                  {p.label}
                </button>
              );
            })}
            <button type="button" onClick={() => openMarkChat()} className="rounded-full px-3.5 py-2 text-[14px] font-medium text-white/75 transition-colors hover:text-white">
              Something else
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
