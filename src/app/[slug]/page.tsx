import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { Journey } from "@/components/Journey";
import { Reviews } from "@/components/Reviews";
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
  if (r.kind === "service") return { title: `${r.s.title} in Houston, TX`, description: r.s.lede };
  return {
    title: `Sell Your Car For Cash in ${r.a.name}, Houston`,
    description: `Cash for cars in ${r.a.name}. Running, junk, wrecked or no title. Free towing and paid at pickup.`,
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
  const points = r.kind === "service" ? r.s.points : ["Free towing from your door", "Paid at pickup", "No title? There's a path", `Open ${business.hours.label}`];
  const qs = new URLSearchParams(Object.entries(r.kind === "service" ? r.s.preset : {}) as [string, string][]).toString();
  const href = `/offer${qs ? `?${qs}` : ""}`;

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden pt-36 pb-24 md:pt-48">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_80%_20%,rgba(225,37,44,.25),transparent_60%),radial-gradient(60%_70%_at_10%_90%,rgba(31,72,201,.25),transparent_60%)]" />
          <div className="grain -z-10" />
          <div className="wrap">
            <p className="eyebrow text-white/60">{r.kind === "service" ? "What We Buy" : "Houston Neighborhoods"}</p>
            <h1 className="display display-xl mt-4 max-w-[13ch]">{title}</h1>
            <p className="lede mt-6 max-w-[620px] text-white/80">{lede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={href} className="btn btn-cash shine text-lg">
                Get My Cash Offer <ArrowRight size={18} weight="bold" />
              </Link>
              <a href={telHref} className="btn btn-frost text-lg">
                <Phone size={18} weight="fill" /> {business.phoneDisplay}
              </a>
            </div>
            <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {points.map((p) => (
                <li key={p} className="glass flex items-center gap-3 rounded-2xl p-5 font-[family-name:var(--font-display)] text-lg font-semibold capitalize">
                  <CheckCircle size={24} weight="fill" className="shrink-0 text-emerald-400" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Journey />
        <Reviews />
        <Faq items={r.kind === "service" ? [...r.s.faq, ...faqs.slice(2, 4)] : faqs} light />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
