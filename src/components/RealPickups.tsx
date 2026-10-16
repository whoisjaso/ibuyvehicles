import Image from "next/image";

/*
  Mark's own photos (from the old site). Daylight phone shots, graded down so
  they sit in the night world without pretending to be anything else.
*/
const shots = [
  { src: "/photos/real-tow.webp", alt: "A red car being hooked to a tow truck in an apartment parking lot", caption: "Apartment lot pickup", w: 382, h: 510 },
  { src: "/photos/real-jeep.webp", alt: "A silver Jeep with a cracked windshield", caption: "Cracked glass, still bought", w: 1024, h: 683 },
  { src: "/photos/real-impala.webp", alt: "A grey sedan in a Houston driveway before pickup", caption: "Driveway, before the tow", w: 382, h: 510 },
  { src: "/photos/real-charger.webp", alt: "A red sedan in a shop after purchase", caption: "Into the shop", w: 564, h: 423 },
];

export function RealPickups() {
  return (
    <section className="py-[var(--section)]">
      <div className="wrap">
        <h2 className="vinyl vinyl-lg max-w-[14ch]">Real Cars Mark Bought.</h2>
        <p className="lede mt-5">Straight off his phone. Dents, cracked glass, dead batteries. None of it was a deal-breaker.</p>
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:thin] md:gap-4">
        {shots.map((s) => (
          <li key={s.src} className="relative h-[62svh] max-h-[620px] min-h-[380px] shrink-0 snap-start overflow-hidden rounded-[14px] bg-asphalt-3" style={{ aspectRatio: `${s.w} / ${s.h}` }}>
            <Image src={s.src} alt={s.alt} fill sizes="(min-width:768px) 40vw, 80vw" className="night-grade object-cover" />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
            <p className="vinyl absolute bottom-5 left-5 right-5 text-[1.9rem] leading-[0.95]">{s.caption}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
