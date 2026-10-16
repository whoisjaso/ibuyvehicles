"use client";

import { useEffect, useState } from "react";
import { business, isOpenNow } from "@/data/business";

/** Plain-language open status in Houston time. Empty until mounted so server and client agree. */
export function OpenNow({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (open === null) return <span className={`inline-block h-6 ${className}`} />;
  return <span className={className}>{open ? `Open now until ${business.hours.close - 12} PM` : `Opens ${business.hours.open} AM. Send it tonight.`}</span>;
}
