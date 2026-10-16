import Link from "next/link";
import { X, Check } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/data/business";

/*
  Built from the seller research (docs/ICP-RESEARCH.md): the five things that
  go wrong most often when people sell a problem car, set against what Mark's
  own customers describe. Every right-hand line is backed by his reviews or
  his published service, never by a promise he hasn't made.
*/
const rows = [
  {
    usually: "The tow driver shows up and cuts your price in the driveway.",
    mark: `${business.owner} makes the offer himself, after a quick look, before anything is loaded.`,
  },
  {
    usually: "You wait all day. No truck. No call.",
    mark: `Pickup is often within ${business.pickupWindow}, any day, 8 AM to 10 PM.`,
  },
  {
    usually: "A check that bounces, or money that shows up days later.",
    mark: "Paid on the spot, before the car is towed.",
  },
  {
    usually: "“Sorry, we can’t take it without a title.”",
    mark: "No title, no key, sitting two years. Erika’s car still went the same day.",
  },
  {
    usually: "A stranger in a personal truck you can’t look up.",
    mark: `A Houston buyer since ${business.since}, with ${business.googleReviews} Google reviews.`,
  },
];

export function Different() {
  return (
    <section className="on-night bg-night py-[var(--section)] text-on-night">
      <div className="wrap">
        <h2 className="t-1 max-w-[20ch]">You Have Probably Been Burned Before. This Is Different.</h2>
        <p className="lede mt-6">
          We read through reviews from people who sold a problem car online. The same five things went wrong again and again. Here is what happens with {business.owner} instead.
        </p>

        <div className="mt-14 hidden grid-cols-2 gap-10 border-b border-white/15 pb-4 text-[15px] text-on-night-2 md:grid">
          <span>What usually happens</span>
          <span>With {business.owner}</span>
        </div>
        <ul>
          {rows.map((r) => (
            <li key={r.mark} className="grid gap-3 border-b border-white/15 py-7 md:grid-cols-2 md:gap-10">
              <p className="flex items-start gap-3 text-on-night-2">
                <X size={18} className="mt-1 shrink-0 opacity-70" aria-label="Usually" />
                <span className="line-through decoration-white/30">{r.usually}</span>
              </p>
              <p className="flex items-start gap-3 text-[1.2rem] leading-snug text-white">
                <Check size={20} weight="bold" className="mt-1 shrink-0 text-white" aria-label={`With ${business.owner}`} />
                <span>{r.mark}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <figure className="rounded-[12px] bg-night-2 p-8">
            <blockquote className="text-[1.35rem] leading-snug tracking-[-0.01em]">
              &ldquo;I sent him some pictures of the vehicle and he was honest and upfront with the price. They towed it away that day! The car had been sitting there over two years, no title and no key!&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[15px] text-on-night-2">Erika Moore, on Google</figcaption>
          </figure>
          <figure className="rounded-[12px] bg-night-2 p-8">
            <blockquote className="text-[1.35rem] leading-snug tracking-[-0.01em]">
              &ldquo;Helped me out with the toughest car situation I&apos;ve ever had. Made it happen all in 1-2 hours. Gave me a very fair price as well.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[15px] text-on-night-2">Efrain Gonzalez, on Google</figcaption>
          </figure>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-white/15 pt-10 lg:flex-row lg:items-end">
          <p className="t-2 max-w-[22ch]">The Person Who Quotes You Is The Person Who Pays You.</p>
          <Link href="/offer" className="btn btn-red">
            Get My Offer
          </Link>
        </div>
      </div>
    </section>
  );
}
