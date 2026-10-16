import { Photo } from "./Photo";
import { Emblem } from "./Emblem";
import { Reveal } from "./Reveal";
import { business, telHref } from "@/data/business";
import { media } from "@/data/media";

/** Authority with a face: the final offer comes from a person who answers his phone. */
export function MeetMark() {
  return (
    <section className="band-paper section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="tile relative aspect-[4/5] bg-coal">
          <Photo slot="mark" tone="night" sizes="(min-width:1024px) 50vw, 100vw" />
          {!media.mark.src && (
            <div className="absolute inset-0 grid place-items-center">
              <Emblem size={180} spin />
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow text-red">The Final Say Is A Person</p>
          <h2 className="display display-lg mt-4">Meet {business.owner}.</h2>
          <p className="lede mt-6 max-w-[52ch] text-coal-2">
            The online estimate gets you a number in a minute. Then {business.owner} looks at the car, checks the VIN, and gives you a final offer face to face. That&apos;s the iBuy Vehicles way, and it&apos;s how it has worked since {business.since}.
          </p>
          <blockquote className="mt-8 border-l-4 border-red pl-5 font-[family-name:var(--font-display)] text-2xl font-medium leading-snug">
            &ldquo;I sent him some pictures of the vehicle and he was honest and upfront with the price.&rdquo;
            <footer className="mt-2 font-sans text-sm font-normal text-coal-2">— Erika Moore, Google review</footer>
          </blockquote>
          <a href={telHref} className="btn btn-dark mt-10">
            Call {business.owner}: {business.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
