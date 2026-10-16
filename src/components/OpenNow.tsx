"use client";

import { useEffect, useState } from "react";
import { business, isOpenNow } from "@/data/business";

/** Live open/closed dot in Houston time. Renders nothing until mounted to avoid a hydration mismatch. */
export function OpenNow({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (open === null) return <span className={`inline-flex h-5 ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`live-dot ${open ? "" : "closed"}`} />
      <span>{open ? "Open Now · Mark Is Buying" : `Opens ${business.hours.open} AM · Leave Your Info`}</span>
    </span>
  );
}
