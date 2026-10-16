"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Receipt, Hourglass, FolderOpen, Wrench, HandCoins, Storefront } from "@phosphor-icons/react";
import { Photo } from "./Photo";
import type { SlotName } from "@/data/media";

/*
  Self-identification is the hook: the visitor finds their own sentence and
  the estimator opens already set up for it.
*/
const cards: { slot: SlotName; tone: "night" | "red" | "blue"; Icon: typeof Receipt; title: string; line: string; href: string }[] = [
  { slot: "rent", tone: "red", Icon: Receipt, title: "The Rent Is Due.", line: "You need cash this week, not a buyer next month.", href: "/offer?situation=cash-now" },
  { slot: "sitting", tone: "night", Icon: Hourglass, title: "It Hasn't Moved In Months.", line: "Flat tires, dead battery, taking up the driveway.", href: "/offer?situation=sitting&drive=no-start" },
  { slot: "title", tone: "blue", Icon: FolderOpen, title: "The Title Is Gone.", line: "Lost, never transferred, or not in your name.", href: "/offer?situation=no-title&title=lost" },
  { slot: "repair", tone: "night", Icon: Wrench, title: "The Repair Costs More Than The Car.", line: "Engine, transmission, frame. Don't sink another dollar.", href: "/offer?situation=repair&damage=major" },
  { slot: "offerInHand", tone: "red", Icon: HandCoins, title: "I Already Have An Offer.", line: "Get a second look from a real person before you sign.", href: "/offer?situation=second-opinion" },
  { slot: "dealerCard", tone: "blue", Icon: Storefront, title: "I'm A Dealer.", line: "Aged units eating floor plan. One call, gone.", href: "/dealers" },
];

export function Situations() {
  return (
    <section className="band-paper section" id="situations">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-red">Start Here</p>
            <h2 className="display display-lg mt-4 max-w-[12ch]">Which One Is You?</h2>
          </div>
          <p className="lede max-w-[420px] text-coal-2">Tap the one that sounds like your week. Your estimate opens already set up for it.</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={c.href} className="tile group relative flex aspect-[4/5] flex-col justify-between p-6 text-white sm:aspect-[5/6] md:p-8">
                <Photo slot={c.slot} tone={c.tone} className="-z-10" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <c.Icon aria-hidden size={320} weight="thin" className="pointer-events-none absolute -right-16 -top-10 -z-10 text-white/[.06] transition duration-1000 group-hover:rotate-6 group-hover:scale-105" />
                <c.Icon size={44} weight="duotone" className="text-white/90 transition duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                <div>
                  <h3 className="display text-[clamp(2rem,3vw,2.8rem)]">{c.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-white/75">{c.line}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 font-[family-name:var(--font-display)] font-semibold backdrop-blur-md transition group-hover:bg-white group-hover:text-coal">
                    That&apos;s Me <ArrowUpRight size={18} weight="bold" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
