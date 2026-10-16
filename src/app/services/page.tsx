import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Lineup } from "@/components/Lineup";
import { IndexList } from "@/components/IndexList";
import { Faq } from "@/components/Faq";
import { Finale } from "@/components/Finale";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import { services, faqs } from "@/data/services";
import { breadcrumbs, faqPage, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services: Cash For Junk, Wrecked, Flooded And No-Title Cars in Houston",
  description: `Every way ${business.name} buys a car in Houston: junk, non-running, wrecked, flooded and no-title vehicles, free towing and same-day pickup with payment on the spot.`,
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbs([{ name: "Services", path: "/services" }]),
          {
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `${business.siteUrl}/${s.slug}` })),
          },
          faqPage(faqs, "/services"),
        )}
      />
      <Header solid />
      <main>
        <section className="pb-16 pt-36 md:pt-44">
          <div className="wrap">
            <h1 className="t-hero max-w-[14ch]">Every Way A Car Gets Sold To {business.owner}.</h1>
            <p className="lede mt-7">
              Running or not, titled or not, dry or flooded. {business.owner} makes the offer himself, tows it free anywhere in Houston and pays you on the spot, often within {business.pickupWindow}.
            </p>
          </div>
        </section>
        <section className="pb-[var(--section)]">
          <div className="wrap">
            <IndexList items={services.map((s) => ({ href: `/${s.slug}`, title: s.title, line: s.short }))} />
          </div>
        </section>
        <Lineup />
        <div className="h-[var(--section)]" />
        <Faq items={faqs} />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
