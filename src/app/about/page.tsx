import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MeetMark } from "@/components/MeetMark";
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
      <Header solid />
      <main>
        <section className="relative isolate overflow-hidden pb-16 pt-36 md:pt-44">
          <div className="wrap">
            <h1 className="t-hero max-w-[12ch]">Quick, Easy, Worth It.</h1>
            <p className="lede mt-7">
              That&apos;s been the job since {business.since}: make selling a car quick, easy and worthwhile. Running or not, {business.owner} handles the paperwork, tows it free and pays you on the spot. Most of the work comes from people who sold once and sent a friend.
            </p>
          </div>
        </section>
        <MeetMark />
        <Reviews />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
