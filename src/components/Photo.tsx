import Image from "next/image";
import { media, type SlotName } from "@/data/media";

/**
 * A photo slot. The delivered image when it exists; otherwise Mark's interim
 * original in a navy duotone; otherwise a branded studio backdrop. Nothing here
 * pretends to be a photo it isn't.
 */
export function Photo({ slot, priority = false, sizes = "100vw", className = "" }: { slot: SlotName; priority?: boolean; sizes?: string; className?: string }) {
  const m = media[slot] as (typeof media)[SlotName] & { interim?: string };
  const src = m.src ?? m.interim;
  if (src) {
    return (
      <>
      <Image
        src={src}
        alt={m.src ? m.alt : "A car bought by iBuy Vehicles"}
        fill
        priority={priority}
        sizes={sizes}
        quality={90}
        className={`object-cover ${m.src ? "" : "mono"} ${className}`}
        style={{ objectPosition: m.focus }}
      />
      {!m.src && <span aria-hidden className="duo pointer-events-none absolute inset-0" />}
      </>
    );
  }
  return (
    <div aria-hidden className={`absolute inset-0 grid place-items-center ${m.tone ?? "studio"} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/emblem-original.svg" alt="" className={`w-[38%] max-w-[260px] ${m.tone === "studio-night" ? "opacity-[.14]" : "opacity-[.18] mix-blend-multiply"}`} />
    </div>
  );
}
