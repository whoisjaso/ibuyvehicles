import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Emblem } from "./Emblem";
import { business, telHref } from "@/data/business";

/*
  Authority with a name. The portrait slot holds the emblem until Mark sends
  a real photo (docs/IMAGE-BRIEF.md, R1). Never a generated person.
*/
export function MeetMark() {
  return (
    <section className="py-[var(--section)]">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="door grid aspect-[4/5] place-items-center">
          <span className="beacon-cone -z-10 -right-1/2 -top-1/2 size-[200%] opacity-50" aria-hidden />
          <Emblem size={220} spin className="size-40 sm:size-[220px]" />
        </div>
        <div>
          <h2 className="vinyl vinyl-xl">
            Mark Answers
            <br />
            His Own Phone.
          </h2>
          <p className="lede mt-7">
            The estimate gets you a number in a minute. Then {business.owner} looks at the car, checks the VIN, and gives you the final offer himself. Same way since {business.since}.
          </p>
          <blockquote className="mt-9 max-w-[44ch] text-[1.2rem] leading-relaxed">
            &ldquo;I sent him some pictures of the vehicle and he was honest and upfront with the price.&rdquo;
            <footer className="mt-2 text-base text-ink-3">Erika Moore, on Google</footer>
          </blockquote>
          <a href={telHref} className="decal decal-white mt-10">
            <Phone size={20} weight="fill" /> {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
