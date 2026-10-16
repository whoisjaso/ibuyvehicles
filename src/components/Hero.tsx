"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Phone, ArrowDown, Car, Truck, Van, Motorcycle, Jeep } from "@phosphor-icons/react";
import { Photo } from "./Photo";
import { OfferCard } from "./OfferCard";
import { OpenNow } from "./OpenNow";
import { business, telHref } from "@/data/business";

const ease = [0.22, 1, 0.36, 1] as const;
const quick = [
  { body: "sedan", label: "Car", Icon: Car },
  { body: "truck", label: "Truck", Icon: Truck },
  { body: "suv", label: "SUV", Icon: Jeep },
  { body: "van", label: "Van", Icon: Van },
  { body: "motorcycle", label: "Motorcycle", Icon: Motorcycle },
];

const trails = [
  { top: "86%", d: "4.8s", delay: "0s", c: "red" },
  { top: "89%", d: "6.2s", delay: "1.2s", c: "white" },
  { top: "92%", d: "3.9s", delay: "2.1s", c: "red" },
  { top: "84%", d: "7.1s", delay: "0.6s", c: "white" },
  { top: "95%", d: "5.4s", delay: "3s", c: "white" },
  { top: "90%", d: "4.4s", delay: "3.8s", c: "red" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 6, ease }}>
          <div className="absolute inset-0 hidden md:block">
            <Photo slot="hero" priority />
          </div>
          <div className="absolute inset-0 md:hidden">
            <Photo slot="heroMobile" priority />
          </div>
        </motion.div>
        <div className="trails hidden md:block">
          {trails.map((t, i) => (
            <span key={i} className={`trail ${t.c}`} style={{ top: t.top, ["--d" as string]: t.d, ["--delay" as string]: t.delay }} />
          ))}
        </div>
        {/* Road horizon glow */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(60%_60%_at_65%_100%,rgba(225,37,44,.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,11,.92)_0%,rgba(7,8,11,.55)_45%,rgba(7,8,11,.1)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
        <div className="grain" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="wrap relative flex min-h-[100svh] flex-col justify-end gap-10 pb-14 pt-28 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
        <div className="max-w-[880px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }}>
            <OpenNow className="mb-6 rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium backdrop-blur-md" />
          </motion.div>
          <h1 className="display display-xl">
            {["Sell It Today.", "Get Paid Today."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 1.1, ease }}
                >
                  {i === 1 ? (
                    <>
                      Get Paid <span className="text-red">Today.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="lede mt-6 max-w-[560px] text-white/80"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease }}
          >
            Running, junk, wrecked or no title. {business.owner} buys it as-is, tows it free and pays you before it leaves your driveway. Anywhere in {business.city}.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease }}
          >
            <Link href="/offer" className="btn btn-cash shine text-lg">
              Get My Cash Offer
            </Link>
            <a href={telHref} className="btn btn-frost text-lg">
              <Phone size={18} weight="fill" /> Call {business.owner}
            </a>
          </motion.div>
          <motion.div className="mt-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 1 }}>
            <p className="eyebrow mb-3 text-white/60">What Are You Selling?</p>
            <div className="flex flex-wrap gap-2">
              {quick.map(({ body, label, Icon }) => (
                <Link key={body} href={`/offer?body=${body}`} className="chip">
                  <Icon size={18} weight="duotone" /> {label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hidden shrink-0 lg:block"
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 1, duration: 1.2, ease }}
        >
          <div className="relative">
            <div className="halo pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[1px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/20 blur-[90px]" />
            <div className="relative">
              <OfferCard />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <a href="#ticker" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/60 lg:block">
        <motion.span className="block" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <ArrowDown size={22} />
        </motion.span>
      </a>
    </section>
  );
}
