import Image from "next/image";
import { media, type SlotName } from "@/data/media";

/**
 * A photo slot. The delivered image when it exists; otherwise Mark's interim
 * original in monochrome; otherwise an empty studio cyclorama. Nothing here
 * pretends to be a photo it isn't.
 */
export function Photo({ slot, priority = false, sizes = "100vw", className = "" }: { slot: SlotName; priority?: boolean; sizes?: string; className?: string }) {
  const m = media[slot] as (typeof media)[SlotName] & { interim?: string };
  const src = m.src ?? m.interim;
  if (src) {
    return (
      <Image
        src={src}
        alt={m.alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={90}
        className={`object-cover ${m.src ? "" : "mono"} ${className}`}
        style={{ objectPosition: m.focus }}
      />
    );
  }
  return <div role="img" aria-label={m.alt} className={`absolute inset-0 ${m.tone ?? "studio"} ${className}`} />;
}
