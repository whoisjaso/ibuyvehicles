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
const PROBLEM_LINES = ["Won't Start?", "No Title?", "Wrecked?", "Flooded?", "No Keys?", "Just Done?"];

function Rotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % PROBLEM_LINES.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <span aria-hidden className="relative block h-[1.06em] overflow-hidden text-on-night-2">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={PROBLEM_LINES[i]}
          className="block"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease }}
        >
          {PROBLEM_LINES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const CHIPS = ["no-start", "wrecked", "flood"] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

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
          <span className="font-semibold">Hey, I&apos;m {business.owner}.</span> <span className="text-white/75">Tap to tell me about your car.</span>
        </span>
      </motion.button>

      <div className="wrap flex h-full flex-col justify-end pb-12 md:pb-16">
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.1, ease }} className="max-w-[760px]">
          <h1 className="t-hero">
            <span className="sr-only">Won&apos;t start, no title, wrecked or flooded? </span>
            <Rotator />
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
          <div className="flex items-center gap-3">
            <motion.span animate={reduce ? undefined : { rotate: [0, -6, 4, 0] }} transition={{ delay: 2.4, duration: 0.9, repeat: Infinity, repeatDelay: 6 }}>
              <MarkBust size={52} />
            </motion.span>
            <p className="text-[15px] leading-snug">
              <span className="block font-semibold">Hey, I&apos;m {business.owner}.</span>
              <span className="text-white/75">What&apos;s going on with your car?</span>
            </p>
          </div>
          <div className="mt-3.5 flex flex-wrap gap-2">
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
          </div>
        </div>
      </motion.div>
    </section>
  );
}
