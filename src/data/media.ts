/*
  Photo slots. A slot is null until its image arrives from the image brief
  (docs/IMAGE-BRIEF.md); the page shows a drawn stand-in until then.
  Drop the file in public/photos/ under the slot's name, set the path here,
  and set a focus point so phones crop to the subject.
  "brand" = generated mood image; "real" = Mark's own photo.
*/
type Slot = { src: string | null; focus?: string; kind: "brand" | "real"; alt: string };

export const media = {
  hero: { src: null, focus: "70% 55%", kind: "brand", alt: "A car on a tow truck bed under Houston city lights at dusk" },
  heroMobile: { src: null, focus: "60% 60%", kind: "brand", alt: "A car on a tow truck bed at dusk" },
  journey: { src: null, focus: "50% 50%", kind: "brand", alt: "A flatbed tow truck on a Houston freeway at night" },
  dealer: { src: null, focus: "60% 50%", kind: "brand", alt: "A row of used cars on a dealer lot at blue hour" },
  offer: { src: null, focus: "50% 50%", kind: "brand", alt: "A hand holding a phone showing a cash offer beside a car" },
  mark: { src: null, focus: "50% 30%", kind: "real", alt: "Mark, the buyer at iBuy Vehicles" },
  finale: { src: null, focus: "50% 60%", kind: "brand", alt: "Cash being handed over beside a car at golden hour" },
  // Situation cards
  rent: { src: null, focus: "50% 50%", kind: "brand", alt: "A kitchen table with bills and car keys at night" },
  sitting: { src: null, focus: "50% 60%", kind: "brand", alt: "A dusty car with flat tires in a driveway" },
  title: { src: null, focus: "50% 50%", kind: "brand", alt: "An empty folder and car keys on a table" },
  repair: { src: null, focus: "50% 50%", kind: "brand", alt: "A car with its hood open, steam rising" },
  offerInHand: { src: null, focus: "50% 50%", kind: "brand", alt: "A phone showing another buyer's offer" },
  dealerCard: { src: null, focus: "50% 50%", kind: "brand", alt: "A dealer lot with an aged unit" },
  // Real cars from Mark's own collection (originals from ibuyvehicles.com)
  realCharger: { src: "/photos/real-charger.webp", focus: "50% 55%", kind: "real", alt: "A red sedan bought by iBuy Vehicles, parked in a shop" },
  realJeep: { src: "/photos/real-jeep.webp", focus: "55% 55%", kind: "real", alt: "A silver Jeep with a cracked windshield bought by iBuy Vehicles" },
  realImpala: { src: "/photos/real-impala.webp", focus: "50% 60%", kind: "real", alt: "A grey sedan in a Houston driveway before pickup" },
  realTow: { src: "/photos/real-tow.webp", focus: "50% 55%", kind: "real", alt: "A red car being hooked to a tow truck in an apartment lot" },
} satisfies Record<string, Slot>;

export type SlotName = keyof typeof media;
