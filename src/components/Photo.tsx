import Image from "next/image";
import { media, type SlotName } from "@/data/media";

/**
 * A photo slot. Renders the image when it exists, otherwise a drawn stand-in:
 * a dark studio gradient tinted with the brand colours, so layouts never collapse
 * and nothing pretends to be a real photo.
 */
export function Photo({
  slot,
  className = "",
  priority = false,
  sizes = "100vw",
  tone = "night",
}: {
  slot: SlotName;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "night" | "red" | "blue" | "paper";
}) {
  const m = media[slot];
  if (m.src) {
    return (
      <Image
        src={m.src}
        alt={m.alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={90}
        className={`object-cover ${className}`}
        style={{ objectPosition: m.focus }}
      />
    );
  }
  const bg = {
    night: "radial-gradient(120% 90% at 70% 80%, #2a2f3a 0%, #12141a 45%, #07080b 100%)",
    red: "radial-gradient(110% 90% at 80% 90%, rgba(225,37,44,.55) 0%, #2a0d10 40%, #0b0709 100%)",
    blue: "radial-gradient(110% 90% at 80% 90%, rgba(31,72,201,.6) 0%, #0d1530 42%, #07080b 100%)",
    paper: "radial-gradient(120% 90% at 70% 80%, #ffffff 0%, #e9e7e1 55%, #d9d6cd 100%)",
  }[tone];
  return <div role="img" aria-label={m.alt} className={`absolute inset-0 ${className}`} style={{ background: bg }} />;
}
