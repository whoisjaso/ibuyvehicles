"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts a simple figure like "95%" or "12.7%" up from zero the first time it scrolls into view.
 * The real value is server rendered, so the number is correct without JavaScript; the animation
 * writes straight to the text node (no React re-render per frame) and an invisible copy of the
 * final value reserves the width so nothing shifts while it counts. Other values render as is.
 */
export function CountUp({ value }: { value: string }) {
  const m = /^(\d+(?:\.\d+)?)(%?)$/.exec(value);
  const numText = m ? m[1] : "";
  const suffix = m ? m[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const armed = useRef(false);
  const ok = m !== null;

  // before it is seen, park the number at zero (only if it starts below the fold)
  useEffect(() => {
    const el = ref.current;
    if (!ok || reduce || !el) return;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      const decimals = numText.includes(".") ? numText.split(".")[1].length : 0;
      el.textContent = (0).toFixed(decimals);
      armed.current = true;
    }
  }, [ok, numText, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!ok || reduce || !inView || !el || !armed.current) return;
    armed.current = false;
    const target = parseFloat(numText);
    const decimals = numText.includes(".") ? numText.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = v.toFixed(decimals)),
      onComplete: () => (el.textContent = numText),
    });
    return () => {
      controls.stop();
      el.textContent = numText;
    };
  }, [inView, ok, numText, reduce]);

  if (!m) return <span>{value}</span>;
  return (
    <span className="relative inline-block tabular-nums" aria-label={value}>
      <span aria-hidden className="invisible">
        {numText}
        {suffix}
      </span>
      <span aria-hidden className="absolute inset-0">
        <span ref={ref}>{numText}</span>
        {suffix}
      </span>
    </span>
  );
}
