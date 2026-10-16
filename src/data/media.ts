/*
  Every image on the site is a named slot. The asset brief (docs/ASSET-BRIEF.md
  and the published brief page) uses the same codes. To place an image: drop
  the file in public/photos/ named with the slot's code (A01.jpg,
  B03-wrecked.png): scripts/sync-photos.mjs picks it up on the next build and
  fills `src` below. Adjust `focus` so phones crop to the subject.

  kind "brand": a generated mood image (ChatGPT). Never presented as a
  specific car Mark bought, his lot, him, or a customer.
  kind "real": Mark's own photography. Interim: the low-resolution originals
  from the old site, shown in monochrome until the shoot arrives.
*/
import placed from "./photos.generated.json";

export type Slot = {
  code: string;
  src: string | null;
  interim?: string;
  focus?: string;
  kind: "brand" | "real";
  alt: string;
  tone?: "studio" | "studio-night";
};

export const media = {
  hero: { code: "A01", src: null as string | null, interim: "/photos/real-impala.webp", focus: "72% 55%", kind: "brand", alt: "A silver sedan alone in a dark photo studio under one soft overhead light", tone: "studio-night" },
  heroMobile: { code: "A02", src: null as string | null, interim: "/photos/real-impala.webp", focus: "50% 70%", kind: "brand", alt: "A silver sedan alone in a dark photo studio", tone: "studio-night" },
  wontStart: { code: "B01", src: null, interim: "/photos/real-tow.webp", focus: "50% 60%", kind: "brand", alt: "A sedan with its hood open in a white studio", tone: "studio" },
  noTitle: { code: "B02", src: null, focus: "50% 50%", kind: "brand", alt: "A car key resting on an empty document folder", tone: "studio" },
  wrecked: { code: "B03", src: null, interim: "/photos/real-jeep.webp", focus: "50% 58%", kind: "brand", alt: "A silver off-road SUV with a cracked windshield in a white studio", tone: "studio" },
  flooded: { code: "B04", src: null, focus: "50% 50%", kind: "brand", alt: "A sedan with a dried waterline across its doors in a white studio", tone: "studio" },
  runsFine: { code: "B05", src: null, interim: "/photos/real-charger.webp", focus: "50% 50%", kind: "brand", alt: "A red four-door sedan in a white studio", tone: "studio" },
  dealer: { code: "B06", src: null, focus: "50% 55%", kind: "brand", alt: "Three used cars lined up in a white studio", tone: "studio" },
  stepSend: { code: "C01", src: null, focus: "50% 50%", kind: "brand", alt: "A hand holding a phone, photographing a parked car", tone: "studio" },
  stepCall: { code: "C02", src: null, focus: "36% 60%", kind: "brand", alt: "A phone on a table lit by an incoming call at dusk", tone: "studio" },
  stepPaid: { code: "C03", src: null, interim: "/photos/real-tow.webp", focus: "48% 60%", kind: "brand", alt: "A sedan being winched onto a white flatbed at dusk", tone: "studio" },
  mark: { code: "R01", src: null, focus: "50% 30%", kind: "real", alt: "Mark, who buys every car himself", tone: "studio" },
  offerBand: { code: "D01", src: null, focus: "64% 55%", kind: "brand", alt: "Two hands exchanging a car key over a sheet of paper", tone: "studio-night" },
  dealerBand: { code: "D02", src: null, focus: "50% 55%", kind: "brand", alt: "A quiet used-car lot at blue hour", tone: "studio-night" },
  finale: { code: "E01", src: null, focus: "68% 60%", kind: "brand", alt: "A white flatbed carrying a car down an empty Houston street at blue hour", tone: "studio-night" },
} satisfies Record<string, Slot>;

// Fill each slot from public/photos. The two hero crops stand in for each
// other until both exist.
const files = placed as Record<string, string>;
for (const slot of Object.values(media) as Slot[]) slot.src ??= files[slot.code] ?? null;
media.hero.src ??= files.A02 ?? null;
media.heroMobile.src ??= files.A01 ?? null;

export type SlotName = keyof typeof media;
