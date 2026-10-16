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
      <Header />
      <main>
        <section className="relative isolate overflow-hidden pb-16 pt-36 md:pt-44">
          <div className="beacon-cone -z-10 left-[85%] top-[-50vmax] size-[120vmax] -translate-x-1/2 opacity-70" aria-hidden />
          <div className="wrap">
            <h1 className="vinyl vinyl-xl max-w-[12ch]">Quick, Easy, Worth It.</h1>
            <p className="lede mt-7">
              That&apos;s been the job since {business.since}: make selling a car quick, easy and worthwhile. Running or not, {business.owner} handles the paperwork, tows it free and pays you on the spot. Most of the work comes from people who sold once and sent a friend.
            </p>
          </div>
        </section>
        <div className="tape h-7 md:h-9" aria-hidden />
        <MeetMark />
        <Reviews />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
