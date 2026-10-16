"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, ChatCircle } from "@phosphor-icons/react";
import { telHref, smsHref } from "@/data/business";

/** Phones: call, text, or start the offer, always in the thumb zone. Hidden inside the offer itself. */
export function MobileDock() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const path = usePathname();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 520));
  if (path?.startsWith("/offer")) return null;
  return (
    <motion.div className="fixed inset-x-0 bottom-0 z-40 md:hidden" initial={false} animate={{ y: show ? 0 : "110%" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
      <div className="flex gap-2 border-t border-rule bg-paper/95 p-2.5 backdrop-blur-md" style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}>
        <a href={telHref} aria-label="Call Mark" className="grid size-14 shrink-0 place-items-center rounded-[4px] bg-stone">
          <Phone size={22} />
        </a>
        <a href={smsHref("Hi Mark, I want to sell my car.")} aria-label="Text Mark" className="grid size-14 shrink-0 place-items-center rounded-[4px] bg-stone">
          <ChatCircle size={22} />
        </a>
        <Link href="/offer" className="btn btn-red flex-1">
          Get My Offer
        </Link>
      </div>
    </motion.div>
  );
}
