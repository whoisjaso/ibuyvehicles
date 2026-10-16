import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "./Photo";
import { Emblem } from "./Emblem";
import { business, telHref } from "@/data/business";
import { media } from "@/data/media";

/** The final say is a person. Portrait slot R01 is Mark's real photo only; the emblem holds it until then. */
export function MeetMark() {
  return (
    <section className="pb-[var(--section)]">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="tile aspect-[4/5]">
          <Photo slot="mark" sizes="(min-width:1024px) 45vw, 100vw" />
          {!media.mark.src && (
            <div className="absolute inset-0 grid place-items-center">
              <Emblem size={200} spin className="size-36 opacity-90 sm:size-[200px]" />
            </div>
          )}
        </div>
        <div>
          <h2 className="t-1">The Final Word Comes From {business.owner}.</h2>
          <p className="lede mt-6">
            The estimate gives you a number in a minute. Then {business.owner} looks at the car, checks the VIN, and makes the offer himself. That is how it has worked since {business.since}.
          </p>
          <figure className="mt-10 border-t border-rule pt-8">
            <blockquote className="max-w-[44ch] text-[1.3rem] leading-snug tracking-[-0.01em]">&ldquo;I sent him some pictures of the vehicle and he was honest and upfront with the price.&rdquo;</blockquote>
            <figcaption className="mt-3 text-[15px] text-ink-3">Erika Moore, on Google</figcaption>
          </figure>
          <a href={telHref} className="btn btn-outline mt-10">
            <Phone size={18} /> {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
