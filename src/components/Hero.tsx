"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "./Photo";
import { business, telHref } from "@/data/business";

const ease = [0.16, 1, 0.3, 1] as const;

/*
  One fixed photograph, the way a marque opens: an ordinary car lit like a
  flagship (slot A01). Headline pinned to the lower-left gutter so it never
  crosses the car; the photo settles from 1.06 and drifts slower than the page.
*/
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  return (
    <section ref={ref} className="on-night relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-night text-white">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 6, ease }}>
          <div className="absolute inset-0 hidden md:block">
            <Photo slot="hero" priority />
          </div>
          <div className="absolute inset-0 md:hidden">
            <Photo slot="heroMobile" priority />
          </div>
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.28)_38%,rgba(0,0,0,0)_62%)]" />

      <div className="wrap flex h-full flex-col justify-end pb-12 md:pb-16">
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.1, ease }} className="max-w-[760px]">
          <h1 className="t-hero">Cash Before The Tow.</h1>
          <p className="mt-5 max-w-[46ch] text-[1.12rem] leading-relaxed text-white/85">
            Junk, wrecked, no title, won&apos;t start. {business.owner} makes the offer himself, pays you on the spot, and tows it free. Often within {business.pickupWindow}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/offer" className="btn btn-red">
              Get My Offer
            </Link>
            <a href={telHref} className="btn btn-frost">
              Call {business.owner}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
