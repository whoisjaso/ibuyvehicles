"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Emblem } from "./Emblem";

const SEEN_KEY = "ibv-intro-seen";

/** Once-per-session intro: the emblem spins up, the name draws in, a hairline runs out. Under 1.6s. */
export function Loader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1550);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-night"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div initial={{ scale: 0.6, rotate: -120, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Emblem size={88} />
            </motion.div>
            <motion.p
              className="wide-caps text-sm text-white"
              initial={{ opacity: 0, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, letterSpacing: "0.42em" }}
              transition={{ duration: 0.9, delay: 0.25 }}
            >
              iBuy Vehicles
            </motion.p>
            <motion.span className="h-px w-48 origin-left bg-red" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
