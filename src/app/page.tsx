import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemBoard } from "@/components/ProblemBoard";
import { Dispatch } from "@/components/Dispatch";
import { TitleRouter } from "@/components/TitleRouter";
import { Reviews } from "@/components/Reviews";
import { RealPickups } from "@/components/RealPickups";
import { TwoFields } from "@/components/TwoFields";
import { MeetMark } from "@/components/MeetMark";
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
        <ProblemBoard />
        <Dispatch />
        <TitleRouter />
        <Reviews />
        <RealPickups />
        <TwoFields />
        <MeetMark />
        <Faq items={faqs} />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
