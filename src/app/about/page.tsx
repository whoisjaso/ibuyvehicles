import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MeetMark } from "@/components/MeetMark";
import { Stats } from "@/components/Stats";
import { Reviews } from "@/components/Reviews";
import { Finale } from "@/components/Finale";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "About",
  description: `${business.name}: Houston's cash car buyer since ${business.since}. Honest offers, free towing, paid at pickup.`,
};

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pt-40 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_80%_10%,rgba(225,37,44,.22),transparent_60%)]" />
          <div className="wrap relative">
            <p className="eyebrow text-white/60">About {business.name}</p>
            <h1 className="display display-xl mt-4 max-w-[14ch]">Quick, Easy And Worth It.</h1>
            <p className="lede mt-6 max-w-[640px] text-white/80">
              That&apos;s been the mission since {business.since}: make selling a car quick, easy and worthwhile. Running or not, {business.owner} handles the paperwork, tows it free and pays you on the spot. Most of our business comes from people who sold to us once and sent a friend.
            </p>
          </div>
        </section>
        <Stats />
        <MeetMark />
        <Reviews />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
