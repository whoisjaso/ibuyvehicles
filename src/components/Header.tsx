"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { List, X, Phone, ChatCircleText, ArrowRight } from "@phosphor-icons/react";
import { Wordmark } from "./Emblem";
import { business, telHref, smsHref } from "@/data/business";

const links = [
  { href: "/offer", label: "Get My Offer" },
  { href: "/#problems", label: "What We Buy" },
  { href: "/#dispatch", label: "How It Goes" },
  { href: "/vehicles-without-title", label: "No Title" },
  { href: "/dealers", label: "Dealers" },
  { href: "/#reviews", label: "Reviews" },
];

export function Header({ solid = false }: { solid?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => !solid && setScrolled(y > 24));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-asphalt/92 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : ""
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label={`${business.name} home`}>
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.slice(1).map((l) => (
              <Link key={l.href} href={l.href} className="font-[family-name:var(--font-vinyl)] text-[1.15rem] font-bold uppercase tracking-[0.06em] text-ink-2 transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={telHref} className="hidden items-center gap-2 font-[family-name:var(--font-vinyl)] text-[1.35rem] font-extrabold tracking-[0.03em] md:inline-flex">
              <Phone size={20} weight="fill" /> {business.phoneDisplay}
            </a>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid size-12 place-items-center rounded-[4px] bg-asphalt-3 lg:hidden">
              <List size={24} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] flex flex-col bg-asphalt" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}>
            <div className="wrap flex h-[72px] items-center justify-between">
              <Wordmark />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-12 place-items-center rounded-[4px] bg-asphalt-3">
                <X size={24} weight="bold" />
              </button>
            </div>
            <nav className="wrap mt-4 flex flex-col" aria-label="Menu">
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className={`flex items-center justify-between border-b border-[var(--line)] py-4 ${i === 0 ? "text-tape" : ""}`}>
                    <span className="vinyl text-[2.6rem]">{l.label}</span>
                    <ArrowRight size={24} weight="bold" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="wrap mt-auto grid grid-cols-2 gap-3 pb-8">
              <a href={telHref} className="decal decal-white">
                <Phone size={20} weight="fill" /> Call
              </a>
              <a href={smsHref("Hi Mark, I want to sell my car.")} className="decal decal-line">
                <ChatCircleText size={20} weight="fill" /> Text
              </a>
              <p className="col-span-2 mt-2 text-center text-ink-2">{business.hours.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
