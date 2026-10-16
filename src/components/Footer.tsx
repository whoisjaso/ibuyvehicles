import Link from "next/link";
import { FacebookLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./Emblem";
import { business, telHref } from "@/data/business";
import { services, areas } from "@/data/services";

export function Footer() {
  return (
    <footer className="on-night bg-night pb-32 pt-20 text-on-night md:pb-14">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark inverse />
            <p className="mt-6 max-w-[34ch] text-on-night-2">Houston&apos;s cash car buyer since {business.since}. Free towing, paid at pickup.</p>
            <div className="mt-6 flex gap-2">
              <a href={business.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-11 place-items-center rounded-full bg-night-2 transition-colors hover:bg-white hover:text-ink">
                <FacebookLogo size={18} />
              </a>
              <a href={business.social.x} target="_blank" rel="noopener" aria-label="X" className="grid size-11 place-items-center rounded-full bg-night-2 transition-colors hover:bg-white hover:text-ink">
                <XLogo size={18} />
              </a>
            </div>
          </div>
          <Col title="What We Buy" links={[...services.map((s) => ({ href: `/${s.slug}`, label: s.title })), { href: "/dealers", label: "Dealers" }]} />
          <Col title="Free Pickup In" links={areas.map((a) => ({ href: `/${a.slug}`, label: a.name }))} />
          <div>
            <p className="text-[15px] text-on-night-2">Contact</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a href={telHref} className="text-[1.25rem]">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="text-on-night-2 hover:text-white">
                  {business.email}
                </a>
              </li>
              <li className="text-on-night-2">
                {business.address.street}
                <br />
                {business.address.locality}, {business.address.region} {business.address.postal}
              </li>
              <li className="text-on-night-2">{business.hours.label}</li>
              <li>
                <Link href="/about" className="text-on-night-2 hover:text-white">
                  About {business.name}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-16 border-t border-white/10 pt-6 text-[13px] text-on-night-2">
          © {new Date().getFullYear()} {business.legalName ?? business.name}. Online estimates are a starting range, not an offer. Final offers are made in person after inspection.
        </p>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-[15px] text-on-night-2">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-on-night-2">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
