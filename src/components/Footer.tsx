import Link from "next/link";
import { FacebookLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./Emblem";
import { business, telHref } from "@/data/business";
import { services, areas } from "@/data/services";

export function Footer() {
  return (
    <footer className="bg-asphalt pb-32 pt-16 md:pb-14">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-[36ch] text-ink-2">
              Houston&apos;s cash car buyer since {business.since}. Free towing, paid at pickup.
            </p>
            <a href={telHref} className="vinyl mt-6 block text-[2.2rem]">
              {business.phoneDisplay}
            </a>
            <a href={`mailto:${business.email}`} className="mt-1 block text-ink-2 hover:text-ink">
              {business.email}
            </a>
            <div className="mt-6 flex gap-2">
              <a href={business.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-11 place-items-center rounded-[4px] bg-asphalt-3 transition-colors hover:bg-asphalt-4">
                <FacebookLogo size={20} weight="fill" />
              </a>
              <a href={business.social.x} target="_blank" rel="noopener" aria-label="X" className="grid size-11 place-items-center rounded-[4px] bg-asphalt-3 transition-colors hover:bg-asphalt-4">
                <XLogo size={20} weight="bold" />
              </a>
            </div>
          </div>
          <nav aria-label="What we buy">
            <p className="font-[family-name:var(--font-vinyl)] text-lg font-bold uppercase tracking-[0.12em] text-ink-3">What We Buy</p>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-ink-2 transition-colors hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dealers" className="text-ink-2 transition-colors hover:text-ink">
                  Dealers
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Areas">
            <p className="font-[family-name:var(--font-vinyl)] text-lg font-bold uppercase tracking-[0.12em] text-ink-3">Free Pickup In</p>
            <ul className="mt-4 space-y-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/${a.slug}`} className="text-ink-2 transition-colors hover:text-ink">
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="text-ink-2 transition-colors hover:text-ink">
                  About {business.name}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-14 max-w-[90ch] border-t border-[var(--line)] pt-6 text-sm text-ink-3">
          © {new Date().getFullYear()} {business.legalName ?? business.name}. {business.address.street}, {business.address.locality}, {business.address.region} {business.address.postal}. Online estimates are a starting range, not an offer. Final offers are made in person after inspection.
        </p>
      </div>
    </footer>
  );
}
