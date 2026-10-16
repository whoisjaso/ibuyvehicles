"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { List, X, Phone, ArrowRight } from "@phosphor-icons/react";
import { Wordmark } from "./Emblem";
import { business, telHref } from "@/data/business";

const links = [
  { href: "/offer", label: "Get My Offer", note: "An estimate in about a minute" },
  { href: "/#lineup", label: "What We Buy", note: "Running, wrecked, flooded, no title" },
  { href: "/#evening", label: "How It Works", note: "From your message to cash in hand" },
  { href: "/vehicles-without-title", label: "No Title", note: "Still sellable" },
  { href: "/dealers", label: "Dealers", note: "Aged units, one call" },
  { href: "/about", label: "About Mark", note: `Buying cars in Houston since ${business.since}` },
];

/** Porsche grammar: menu left, mark centred, the call right. Transparent over the hero, white after. */
export function Header({ solid = false }: { solid?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => !solid && setScrolled(y > 40));
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  const light = !scrolled;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${light ? "text-white" : "bg-paper/95 text-ink shadow-[0_1px_0_var(--rule)] backdrop-blur-md"}`}>
        {light && <div className="pointer-events-none absolute inset-0 -z-10 h-32 bg-gradient-to-b from-black/45 to-transparent" />}
        <div className="wrap grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4">
          <button onClick={() => setOpen(true)} className="flex min-h-11 items-center gap-2.5 justify-self-start text-[15px] font-medium" aria-label="Open menu">
            <List size={22} /> <span className="hidden sm:inline">Menu</span>
          </button>
          <Link href="/" aria-label={`${business.name} home`}>
            <Wordmark inverse={light} />
          </Link>
          <div className="flex items-center gap-5 justify-self-end">
            <a href={telHref} className="hidden items-center gap-2 text-[15px] font-medium md:inline-flex">
              <Phone size={18} /> {business.phoneDisplay}
            </a>
            <Link href="/offer" className={`btn btn-red hidden !min-h-11 !px-5 text-[15px] ${light ? "" : "lg:inline-flex"}`}>
              Get My Offer
            </Link>
            <a href={telHref} className="grid size-11 place-items-center md:hidden" aria-label="Call Mark">
              <Phone size={22} />
            </a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <button className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} aria-label="Close menu" />
            <motion.aside
              className="absolute inset-y-0 left-0 flex w-[min(100vw,460px)] flex-col bg-paper text-ink"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex h-[72px] items-center justify-between px-6">
                <Wordmark />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full bg-stone">
                  <X size={20} />
                </button>
              </div>
              <nav className="mt-4 px-6" aria-label="Menu">
                {links.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="group flex items-center justify-between border-b border-rule py-4">
                      <span>
                        <span className="block text-[1.65rem] leading-tight tracking-[-0.015em]">{l.label}</span>
                        <span className="text-[15px] text-ink-3">{l.note}</span>
                      </span>
                      <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto space-y-3 p-6">
                <a href={telHref} className="btn btn-ink w-full">
                  <Phone size={18} /> Call {business.phoneDisplay}
                </a>
                <p className="text-center text-[15px] text-ink-3">{business.hours.label}</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
