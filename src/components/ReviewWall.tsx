"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star, GoogleLogo } from "@phosphor-icons/react";
import { reviews } from "@/data/reviews";
import { business } from "@/data/business";
import { MarkFull } from "./MarkAvatar";

/*
  The review wheel: every real Google review on file, in columns that roll
  endlessly in opposite directions at different speeds, faded top and bottom
  like a watch's date wheel. Hover or focus pauses a column. Reduced motion
  shows the same cards as a still grid. Each column is rendered twice and
  translated by exactly half its height, so the loop has no seam.
*/
type Review = (typeof reviews)[number];

function columns(n: number) {
  const cols: Review[][] = Array.from({ length: n }, () => []);
  reviews.forEach((r, i) => cols[i % n].push(r));
  return cols;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function ReviewWall() {
  const reduce = useReducedMotion();
  const desktop = columns(3);
  const speeds = ["58s", "72s", "64s"];

  return (
    <section id="reviews" className="relative overflow-hidden bg-stone py-[var(--section)]">
      <div className="wrap grid gap-12 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <div className="lg:sticky lg:top-[22vh] lg:h-fit">
          <p className="flex items-center gap-2 text-[15px] text-ink-2">
            <GoogleLogo size={18} weight="bold" /> Google reviews
          </p>
          <h2 className="t-1 mt-4">
            {business.googleReviews} Reviews.
            <br />
            Real People. Real Cars.
          </h2>
          <p className="lede mt-6">Word for word, the way they wrote them on Google. No title, no keys, sitting for years, done in an hour or two.</p>
          <a
            href={business.reviewsUrl}
            target="_blank"
            rel="noopener"
            className="btn btn-outline mt-9"
          >
            Read Them On Google
          </a>
          {/* Mark presents the wall. */}
          <div className="mt-12 flex items-start gap-1">
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            >
              <MarkFull mood="point" className="h-[170px] w-auto md:h-[230px]" />
            </motion.div>
            <motion.p
              initial={reduce ? false : { opacity: 0, scale: 0.8, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.45, type: "spring", stiffness: 260, damping: 18 }}
              className="mt-6 max-w-[200px] origin-bottom-left rounded-[16px] rounded-bl-[4px] bg-paper px-4 py-3 text-[15px] leading-snug shadow-[0_10px_30px_-16px_rgba(10,22,64,.45)] ring-1 ring-rule"
            >
              Don&apos;t take my word for it. <span className="font-semibold">Take theirs.</span>
            </motion.p>
          </div>
        </div>

        {reduce ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.name}>
                <Card r={r} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="relative h-[640px] overflow-hidden md:h-[760px]"
            style={{ maskImage: "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)" }}
          >
            {/* Phones and tablets: two columns; desktop: three. */}
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {desktop.map((col, c) => (
                <div key={c} className={`wheel-col group ${c === 1 ? "hidden sm:block" : ""} ${c === 2 ? "hidden xl:block" : ""}`}>
                  <ul
                    className="wheel-track flex flex-col gap-4"
                    style={{ animationDuration: speeds[c], animationDirection: c % 2 ? "reverse" : "normal" }}
                  >
                    {[...col, ...col, ...col, ...col].map((r, i) => (
                      <li key={`${r.name}-${i}`} aria-hidden={i >= col.length ? true : undefined}>
                        <Card r={r} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <figure className="rounded-[12px] bg-paper p-6 shadow-[0_1px_0_var(--rule),0_18px_40px_-28px_rgba(11,18,48,0.35)]">
      <div className="flex items-center gap-3">
        <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-night text-[13px] font-semibold tracking-[0.04em] text-on-night">
          {initials(r.name)}
        </span>
        <figcaption className="min-w-0">
          <span className="block truncate font-medium">{r.name}</span>
          <span className="flex items-center gap-1.5 text-[13px] text-ink-3">
            <GoogleLogo size={13} weight="bold" /> Google review
          </span>
        </figcaption>
      </div>
      <p className="mt-4 flex gap-0.5 text-[#e8a31b]" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} weight="fill" />
        ))}
      </p>
      <blockquote className="mt-3 text-[1.02rem] leading-relaxed text-ink">&ldquo;{r.text}&rdquo;</blockquote>
    </figure>
  );
}
