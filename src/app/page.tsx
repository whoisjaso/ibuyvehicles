import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Situations } from "@/components/Situations";
import { Journey } from "@/components/Journey";
import { Stats } from "@/components/Stats";
import { TitleRouter } from "@/components/TitleRouter";
import { RealCars } from "@/components/RealCars";
import { Reviews } from "@/components/Reviews";
import { Bands } from "@/components/Bands";
import { MeetMark } from "@/components/MeetMark";
import { WhatWeBuy } from "@/components/WhatWeBuy";
import { Faq } from "@/components/Faq";
import { Finale } from "@/components/Finale";
import { Footer } from "@/components/Footer";
import { faqs } from "@/data/services";

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Situations />
        <Journey />
        <Stats />
        <TitleRouter />
        <RealCars />
        <Reviews />
        <Bands />
        <MeetMark />
        <WhatWeBuy />
        <Faq items={faqs} light />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
