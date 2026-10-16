"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Phone, ChatCircleText, Lightning } from "@phosphor-icons/react";
import { telHref, smsHref } from "@/data/business";

/** Thumb-zone dock on phones: the three ways to start, always one tap away. */
export function MobileDock() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 420));
  return (
    <motion.div
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 36 }}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass flex items-center gap-2 rounded-full bg-night/80 p-2">
        <a href={telHref} aria-label="Call Mark" className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10">
          <Phone size={20} weight="fill" />
        </a>
        <a href={smsHref("Hi Mark, I want to sell my car.")} aria-label="Text Mark" className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10">
          <ChatCircleText size={20} weight="fill" />
        </a>
        <Link href="/offer" className="btn btn-cash shine !min-h-12 flex-1 text-base">
          <Lightning size={18} weight="fill" /> Get My Cash Offer
        </Link>
      </div>
    </motion.div>
  );
}
