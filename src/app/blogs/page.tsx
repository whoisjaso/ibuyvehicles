import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IndexList } from "@/components/IndexList";
import { Finale } from "@/components/Finale";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import { allPosts, CATEGORY_LABEL, type Category } from "@/lib/posts";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Articles: Selling A Junk Car In Houston, Titles, Towing And Value",
  description: `Straight answers from ${business.owner} on selling a junk, wrecked, flooded or no-title car in Houston: Texas title paperwork, what a car is worth, towing and avoiding scams.`,
  alternates: { canonical: "/blogs" },
};

const ORDER: Category[] = ["titles", "selling", "value", "towing", "flood", "guides"];

export default function Blogs() {
  const posts = allPosts();
  return (
    <>
      <JsonLd
        data={graph(breadcrumbs([{ name: "Articles", path: "/blogs" }]), {
          "@type": "CollectionPage",
          name: "Articles",
          url: `${business.siteUrl}/blogs`,
          hasPart: posts.map((p) => ({ "@type": "Article", headline: p.title, url: `${business.siteUrl}/${p.slug}` })),
        })}
      />
      <Header solid />
      <main>
        <section className="pb-12 pt-36 md:pt-44">
          <div className="wrap">
            <h1 className="t-hero max-w-[13ch]">Straight Answers Before You Sell.</h1>
            <p className="lede mt-7">Titles, paperwork, what it&apos;s worth and what happens at pickup, from the man who buys the cars. {posts.length} articles.</p>
            <nav aria-label="Topics" className="mt-9 flex flex-wrap gap-2">
              {ORDER.filter((c) => posts.some((p) => p.category === c)).map((c) => (
                <a key={c} href={`#${c}`} className="rounded-full px-4 py-2.5 text-[15px] font-medium ring-1 ring-ink/20 transition-colors hover:bg-ink hover:text-paper">
                  {CATEGORY_LABEL[c]}
                </a>
              ))}
            </nav>
          </div>
        </section>
        {ORDER.map((c) => {
          const list = posts.filter((p) => p.category === c);
          if (!list.length) return null;
          return (
            <section key={c} id={c} className="scroll-mt-24 pb-20">
              <div className="wrap">
                <h2 className="t-2 mb-6">{CATEGORY_LABEL[c]}</h2>
                <IndexList items={list.map((p) => ({ href: `/${p.slug}`, title: p.title, line: p.description }))} />
              </div>
            </section>
          );
        })}
        <Finale />
      </main>
      <Footer />
    </>
  );
}
