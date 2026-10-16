"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, ChatCircleText } from "@phosphor-icons/react";
import { telHref, smsHref } from "@/data/business";

/** Thumb-zone dock on phones: call, text, or start the offer. Hidden inside the offer flow itself. */
export function MobileDock() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const path = usePathname();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 480));
  if (path?.startsWith("/offer")) return null;
  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      initial={false}
      animate={{ y: show ? 0 : "110%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="tape h-1.5" aria-hidden />
      <div className="flex gap-2 bg-asphalt/96 p-2.5 backdrop-blur-md" style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}>
        <a href={telHref} aria-label="Call Mark" className="grid size-[58px] shrink-0 place-items-center rounded-[4px] bg-asphalt-3">
          <Phone size={24} weight="fill" />
        </a>
        <a href={smsHref("Hi Mark, I want to sell my car.")} aria-label="Text Mark" className="grid size-[58px] shrink-0 place-items-center rounded-[4px] bg-asphalt-3">
          <ChatCircleText size={24} weight="fill" />
        </a>
        <Link href="/offer" className="decal decal-red flex-1">
          Get My Offer
        </Link>
      </div>
    </motion.div>
  );
}
