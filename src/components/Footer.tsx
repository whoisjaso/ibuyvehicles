import Link from "next/link";
import { FacebookLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./Emblem";
import { business, telHref } from "@/data/business";
import { services, areas } from "@/data/services";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night pb-28 pt-20 md:pb-12">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-[34ch] text-ink-2">{business.tagline} Houston&apos;s cash car buyer since {business.since}. Free towing, paid at pickup.</p>
            <div className="mt-6 flex gap-3">
              <a href={business.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <FacebookLogo size={20} weight="fill" />
              </a>
              <a href={business.social.x} target="_blank" rel="noopener" aria-label="X" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <XLogo size={20} weight="bold" />
              </a>
            </div>
          </div>
          <FooterCol title="What We Buy" links={services.map((s) => ({ href: `/${s.slug}`, label: s.title }))} />
          <FooterCol title="Where" links={areas.map((a) => ({ href: `/${a.slug}`, label: a.name }))} />
          <div>
            <p className="eyebrow text-white/50">Contact</p>
            <ul className="mt-5 space-y-3 text-ink-2">
              <li>
                <a href={telHref} className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-white">
                  {business.email}
                </a>
              </li>
              <li>
                {business.address.street}
                <br />
                {business.address.locality}, {business.address.region} {business.address.postal}
              </li>
              <li>{business.hours.label}</li>
              <li>
                <Link href="/dealers" className="hover:text-white">
                  Dealers
                </Link>
                {" · "}
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ink-3 md:flex-row">
          <p>
            © {new Date().getFullYear()} {business.legalName ?? business.name}. Online estimates are a starting range, not an offer. Final offers are made in person after inspection.
          </p>
          <a href="#" className="hover:text-white">
            Back To Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow text-white/50">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink-2 transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
