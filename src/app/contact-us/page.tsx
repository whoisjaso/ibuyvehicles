import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OpenNow } from "@/components/OpenNow";
import { TalkToMarkButton } from "@/components/TalkToMarkButton";
import { JsonLd } from "@/components/JsonLd";
import { SocialLinks } from "@/components/SocialLinks";
import { business, mapsHref, smsHref, telHref } from "@/data/business";
import { BUSINESS_ID, breadcrumbs, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Mark: Call, Text Or Visit",
  description: `Call or text ${business.phoneDisplay}, every day 8 AM to 10 PM. ${business.name}, ${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postal}.`,
  alternates: { canonical: "/contact-us" },
};

const address = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postal}`;

export default function Contact() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbs([{ name: "Contact", path: "/contact-us" }]), {
          "@type": "ContactPage",
          url: `${business.siteUrl}/contact-us`,
          about: { "@id": BUSINESS_ID },
        })}
      />
      <Header solid />
      <main>
        <section className="pb-[var(--section)] pt-36 md:pt-44">
          <div className="wrap grid gap-14 lg:grid-cols-[6fr_6fr] lg:gap-20">
            <div>
              <h1 className="t-hero max-w-[11ch]">Talk To The Man Who Pays You.</h1>
              <p className="lede mt-7">The person who answers is the person who makes the offer. Call, text, or send the car through the estimate and {business.owner} calls you back.</p>
              <OpenNow className="mt-6 block text-[15px] font-medium text-ink-2" />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={telHref} className="btn btn-red">
                  Call {business.phoneDisplay}
                </a>
                <a href={smsHref(`Hi ${business.owner}, I want to sell my car.`)} className="btn btn-ink">
                  Text {business.owner}
                </a>
                <TalkToMarkButton />
              </div>
              <dl className="mt-14 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-[15px] text-ink-3">Phone and text</dt>
                  <dd className="mt-1.5 text-[1.2rem]">
                    <a href={telHref}>{business.phoneDisplay}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] text-ink-3">Email</dt>
                  <dd className="mt-1.5 text-[1.2rem]">
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] text-ink-3">The lot</dt>
                  <dd className="mt-1.5 text-[1.2rem]">
                    <a href={mapsHref} target="_blank" rel="noopener">
                      {business.address.street}
                      <br />
                      {business.address.locality}, {business.address.region} {business.address.postal}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] text-ink-3">Hours</dt>
                  <dd className="mt-1.5 text-[1.2rem]">{business.hours.label}</dd>
                </div>
              </dl>
              <div className="mt-10 flex items-center gap-4">
                <SocialLinks tone="paper" />
                <span className="text-[15px] text-ink-3">Google, Facebook and X</span>
              </div>
              <p className="mt-8 text-ink-2">
                Rather see a number first?{" "}
                <Link href="/offer" className="font-semibold text-ink underline underline-offset-4">
                  Get an estimate in about a minute
                </Link>
                .
              </p>
            </div>
            <div className="tile min-h-[420px] lg:min-h-full">
              <iframe
                title={`Map to ${business.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                className="absolute inset-0 size-full border-0 grayscale-[.35]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
