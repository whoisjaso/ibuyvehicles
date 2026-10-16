import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lineup } from "@/components/Lineup";
import { Statement } from "@/components/Statement";
import { Evening } from "@/components/Evening";
import { BuildBand } from "@/components/BuildBand";
import { TitleRouter } from "@/components/TitleRouter";
import { Reviews } from "@/components/Reviews";
import { MeetMark } from "@/components/MeetMark";
import { Discover } from "@/components/Discover";
import { Faq } from "@/components/Faq";
import { Finale } from "@/components/Finale";
import { Footer } from "@/components/Footer";
import { faqs } from "@/data/services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lineup />
        <Statement />
        <Evening />
        <TitleRouter />
        <BuildBand />
        <Reviews />
        <MeetMark />
        <Discover />
        <Faq items={faqs} />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
