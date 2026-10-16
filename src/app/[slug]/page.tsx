import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, faqPage, graph, serviceNode } from "@/lib/schema";
import { notFound } from "next/navigation";
import { Check, ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { Evening } from "@/components/Evening";
import { ReviewWall } from "@/components/ReviewWall";
import { Finale } from "@/components/Finale";
import { services, areas, faqs } from "@/data/services";
import { business, telHref } from "@/data/business";

/* Service and neighborhood pages share one template, at the old site's URLs. */

export function generateStaticParams() {
  return [...services.map((s) => ({ slug: s.slug })), ...areas.map((a) => ({ slug: a.slug }))];
}

function resolve(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (s) return { kind: "service" as const, s };
  const a = areas.find((x) => x.slug === slug);
  if (a) return { kind: "area" as const, a };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = resolve((await params).slug);
  if (!r) return {};
  const path = `/${(await params).slug}`;
  if (r.kind === "service") return { title: `${r.s.title} in Houston, TX`, description: r.s.lede, alternates: { canonical: path } };
  return {
    title: `Sell Your Car For Cash in ${r.a.name}, Houston`,
    description: `Cash for cars in ${r.a.name}. Running, junk, wrecked or no title. Free towing and paid at pickup.`,
    alternates: { canonical: path },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const r = resolve((await params).slug);
  if (!r) notFound();

  const title = r.kind === "service" ? r.s.title : `Cash For Cars In ${r.a.name}.`;
  const lede =
    r.kind === "service"
      ? r.s.lede
      : `Selling a car in ${r.a.name}? ${business.owner} buys running, junk, wrecked and no-title vehicles, tows them free and pays you before the tow. Often there within ${business.pickupWindow}.`;
  const points = r.kind === "service" ? r.s.points : ["Free towing from your door", "Paid at pickup", "No title? There's a way", business.hours.label];
  const qs = new URLSearchParams(Object.entries(r.kind === "service" ? r.s.preset : {}) as [string, string][]).toString();
  const href = `/offer${qs ? `?${qs}` : ""}`;

  const path = r.kind === "service" ? `/${r.s.slug}` : `/${r.a.slug}`;
  const faqItems = r.kind === "service" ? [...r.s.faq, ...faqs.slice(2, 4)] : faqs;
  const ld = graph(
    serviceNode({ name: r.kind === "service" ? `${r.s.title} in Houston` : `Cash for cars in ${r.a.name}`, description: lede, path, area: r.kind === "area" ? `${r.a.name}, Houston, TX` : undefined }),
    breadcrumbs(r.kind === "service" ? [{ name: "Services", path: "/services" }, { name: r.s.title, path }] : [{ name: "Service Areas", path: "/service-areas" }, { name: r.a.name, path }]),
    faqPage(faqItems, path),
  );

  return (
    <>
      <JsonLd data={ld} />
      <Header solid />
      <main>
        <section className="relative isolate overflow-hidden pb-20 pt-36 md:pt-44">
          <div className="wrap">
            <h1 className="t-hero max-w-[12ch]">{title}</h1>
            <p className="lede mt-7">{lede}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={href} className="btn btn-red">
                Get My Offer <ArrowRight size={20} weight="bold" />
              </Link>
              <a href={telHref} className="btn btn-outline">
                <Phone size={20} weight="fill" /> {business.phoneDisplay}
              </a>
            </div>
            <ul className="mt-16 grid gap-x-10 gap-y-4 border-t border-rule pt-8 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[1.2rem]">
                  <Check size={22} className="shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Evening />
        <ReviewWall />
        <Faq items={faqItems} />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
