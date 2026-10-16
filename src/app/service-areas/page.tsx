import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IndexList } from "@/components/IndexList";
import { ReviewWall } from "@/components/ReviewWall";
import { Finale } from "@/components/Finale";
import { JsonLd } from "@/components/JsonLd";
import { business, mapsHref } from "@/data/business";
import { areas } from "@/data/services";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Areas: Cash For Cars Across Houston, TX",
  description: `${business.name} buys cars across Houston: Downtown, The Heights, Midtown, Montrose, River Oaks, the Galleria, the Medical Center, the Museum District and the neighborhoods around them. Free towing to all of it.`,
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreas() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbs([{ name: "Service Areas", path: "/service-areas" }]), {
          "@type": "ItemList",
          itemListElement: areas.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: `${a.name}, Houston`, url: `${business.siteUrl}/${a.slug}` })),
        })}
      />
      <Header solid />
      <main>
        <section className="pb-16 pt-36 md:pt-44">
          <div className="wrap">
            <h1 className="t-hero max-w-[13ch]">Wherever It&apos;s Sitting In Houston.</h1>
            <p className="lede mt-7">
              Driveway, apartment lot, street or shop: the tow is free and {business.owner} comes to it. Based at {business.address.street} in northwest Houston, buying cars across the city since {business.since}.
            </p>
            <a href={mapsHref} target="_blank" rel="noopener" className="btn btn-outline mt-9">
              Directions To The Lot
            </a>
          </div>
        </section>
        <section className="pb-[var(--section)]">
          <div className="wrap">
            <IndexList items={areas.map((a) => ({ href: `/${a.slug}`, title: a.name, line: `Cash for cars in ${a.name}. Free towing, paid on the spot.` }))} />
            <p className="mt-8 max-w-[60ch] text-ink-2">Not on the list? Most of Greater Houston is. Call {business.phoneDisplay} and ask; it takes one question.</p>
          </div>
        </section>
        <ReviewWall />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
