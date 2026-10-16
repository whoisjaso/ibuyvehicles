"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { List, X, Phone, ChatCircleText, ArrowRight } from "@phosphor-icons/react";
import { Wordmark } from "./Emblem";
import { OpenNow } from "./OpenNow";
import { business, telHref, smsHref } from "@/data/business";

const links = [
  { href: "/offer", label: "Get My Offer", note: "60 seconds, no obligation" },
  { href: "/#how", label: "How It Works", note: "Three moves to cash" },
  { href: "/vehicles-without-title", label: "No Title?", note: "Still sellable" },
  { href: "/dealers", label: "For Dealers", note: "Aged units, one call" },
  { href: "/#reviews", label: "Reviews", note: `${business.googleReviews} on Google` },
  { href: "/#services", label: "What We Buy", note: "Junk, wrecked, flooded, running" },
];

export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solid) return;
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [solid]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-500 ${
          scrolled ? "bg-night/70 shadow-[0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl" : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm font-semibold lg:hidden" aria-label="Open menu">
            <List size={26} weight="bold" />
          </button>
          <Link href="/" aria-label={`${business.name} home`} className="lg:mr-6">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {links.slice(1, 6).map((l) => (
              <Link key={l.href} href={l.href} className="font-[family-name:var(--font-display)] text-[1.02rem] font-semibold capitalize text-white/80 transition hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <OpenNow className="text-xs font-medium text-white/70" />
            </div>
            <a href={telHref} className="hidden items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold md:inline-flex">
              <Phone size={18} weight="fill" /> {business.phoneDisplay}
            </a>
            <Link href="/offer" className="btn btn-cash !min-h-[44px] !px-4 text-[.95rem] md:!px-5">
              Get Offer
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close menu" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute inset-y-0 left-0 flex w-[min(92vw,420px)] flex-col bg-night-2 p-6 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div className="flex items-center justify-between">
                <Wordmark />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full bg-white/10">
                  <X size={22} weight="bold" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col">
                {links.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="group flex items-center justify-between border-b border-white/10 py-4">
                      <span>
                        <span className="display block text-[2rem]">{l.label}</span>
                        <span className="text-sm text-ink-2">{l.note}</span>
                      </span>
                      <ArrowRight size={22} className="transition group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                <a href={telHref} className="btn btn-light">
                  <Phone size={18} weight="fill" /> Call
                </a>
                <a href={smsHref("Hi Mark, I want to sell my car.")} className="btn btn-frost">
                  <ChatCircleText size={18} weight="fill" /> Text
                </a>
              </div>
              <p className="mt-4 text-center text-sm text-ink-2">{business.hours.label}</p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
