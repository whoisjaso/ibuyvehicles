import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Faq } from "./Faq";
import { TalkToMarkButton } from "./TalkToMarkButton";
import { MarkFull } from "./MarkAvatar";
import { CATEGORY_LABEL, type Post } from "@/lib/posts";
import { business, telHref } from "@/data/business";

const date = (d?: string) => (d ? new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : null);

/** One of Mark's articles: the short answer first, then the detail, then his offer. */
export function Article({ post, more }: { post: Post; more: Post[] }) {
  const shown = date(post.updated ?? post.published);
  return (
    <article>
      <header className="pb-12 pt-36 md:pt-44">
        <div className="wrap max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="text-[15px] text-ink-3">
            <Link href="/blogs" className="hover:text-ink">
              Articles
            </Link>
            <span className="mx-2">/</span>
            <span>{CATEGORY_LABEL[post.category]}</span>
          </nav>
          <h1 className="t-1 mt-5 max-w-[22ch]">{post.title}</h1>
          <p className="mt-5 text-[15px] text-ink-3">
            By {business.owner}, {business.name}
            {shown && <> · Updated {shown}</>} · {post.minutes} min read
          </p>
          {post.answer && (
            <div className="mt-10 rounded-[12px] bg-stone p-6 md:p-8">
              <p className="text-[15px] font-semibold text-ink-2">The short answer</p>
              <p className="mt-2 text-[1.18rem] leading-relaxed md:text-[1.3rem]">{post.answer}</p>
            </div>
          )}
        </div>
      </header>

      <div className="wrap max-w-[1100px] pb-[var(--section)]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="prose-ib" dangerouslySetInnerHTML={{ __html: post.html }} />
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[12px] bg-night p-6 text-white">
              <div className="flex items-start gap-3">
                <MarkFull mood="point" className="h-[120px] w-auto shrink-0" />
                <p className="text-[15px] leading-snug">
                  <span className="block font-semibold">Got a car like this?</span>
                  <span className="text-white/75">Tell me about it. I&apos;ll make you an offer myself and tow it free.</span>
                </p>
              </div>
              <div className="mt-5 grid gap-2">
                <Link href="/offer" className="btn btn-red w-full">
                  Get My Offer
                </Link>
                <a href={telHref} className="btn btn-frost w-full">
                  Call {business.phoneDisplay}
                </a>
              </div>
            </div>
            <TalkToMarkButton className="mt-3 w-full" />
          </aside>
        </div>
      </div>

      {post.faq.length > 0 && <Faq items={post.faq} title="Quick Answers." />}

      {more.length > 0 && (
        <section className="py-[var(--section)]">
          <div className="wrap">
            <h2 className="t-2">Keep Reading</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="group flex h-full flex-col justify-between gap-8 rounded-[12px] bg-stone p-6 transition-colors hover:bg-stone-2">
                    <span>
                      <span className="text-[14px] text-ink-3">{CATEGORY_LABEL[p.category]}</span>
                      <span className="t-3 mt-2 block">{p.title}</span>
                    </span>
                    <span className="flex items-center gap-2 text-[15px] font-semibold">
                      Read <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
