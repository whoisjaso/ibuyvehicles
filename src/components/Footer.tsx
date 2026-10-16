import Link from "next/link";
import { Wordmark } from "./Emblem";
import { SocialLinks } from "./SocialLinks";
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
            <SocialLinks className="mt-6" />
            <a href={business.reviewUrl} target="_blank" rel="noopener" className="mt-4 inline-block text-[15px] text-on-night-2 underline underline-offset-4 hover:text-white">
              Sold to Mark? Leave a Google review
            </a>
          </div>
          <Col title="What We Buy" links={[...services.map((s) => ({ href: `/${s.slug}`, label: s.title })), { href: "/dealers", label: "Dealers" }, { href: "/services", label: "All Services" }]} />
          <Col title="Free Pickup In" links={[...areas.map((a) => ({ href: `/${a.slug}`, label: a.name })), { href: "/service-areas", label: "All Areas" }]} />
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
              <li>
                <Link href="/contact-us" className="text-on-night-2 hover:text-white">
                  Contact And Directions
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-on-night-2 hover:text-white">
                  Articles
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
