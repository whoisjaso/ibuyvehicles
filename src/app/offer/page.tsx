import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { OfferFlow } from "@/components/OfferFlow";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Get Your Instant Cash Offer",
  description: `Answer five quick questions and see what your car is worth to ${business.name}. Running or not, title or not. Free towing in Houston.`,
};

export default async function OfferPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const p = await searchParams;
  const one = (k: string) => (typeof p[k] === "string" ? (p[k] as string).slice(0, 40) : undefined);
  const preset = { body: one("body"), drive: one("drive"), damage: one("damage"), title: one("title"), situation: one("situation") };
  return (
    <>
      <Header solid />
      <main className="relative min-h-[100svh] overflow-hidden pb-32 pt-28 md:pt-36">
        <div className="beacon-cone pointer-events-none left-[90%] top-[-60vmax] size-[120vmax] -translate-x-1/2 opacity-40" aria-hidden />
        <div className="wrap relative">
          <OfferFlow preset={preset} />
        </div>
      </main>
    </>
  );
}
