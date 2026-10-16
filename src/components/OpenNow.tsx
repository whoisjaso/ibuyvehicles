"use client";

import { useEffect, useState } from "react";
import { business, isOpenNow } from "@/data/business";

/** Live open/closed lamp in Houston time. Empty until mounted, so server and client agree. */
export function OpenNow({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (open === null) return <span className={`inline-flex h-6 ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`live ${open ? "" : "off"}`} />
      <span>{open ? `${business.owner} is buying now` : `Back at ${business.hours.open} AM. Send it tonight.`}</span>
    </span>
  );
}
