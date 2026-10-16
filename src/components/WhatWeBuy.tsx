import Link from "next/link";
import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { services, areas } from "@/data/services";
import { Reveal } from "./Reveal";

export function WhatWeBuy() {
  return (
    <section className="section bg-night" id="services">
      <div className="wrap">
        <p className="eyebrow text-red">What We Buy</p>
        <h2 className="display display-lg mt-4 max-w-[16ch]">Every Kind Of Problem Car.</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.08} className="bg-night">
              <Link href={`/${s.slug}`} className="group flex h-full min-h-[220px] flex-col justify-between bg-night-2 p-6 transition hover:bg-night-3 md:p-8">
                <ArrowUpRight size={22} className="self-end text-white/40 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red" />
                <div>
                  <h3 className="display text-[1.9rem]">{s.title}</h3>
                  <p className="mt-2 text-ink-2">{s.short}</p>
                </div>
              </Link>
            </Reveal>
          ))}
          <Link href="/offer" className="flex min-h-[220px] flex-col justify-between bg-red p-6 transition hover:bg-red-2 md:p-8">
            <ArrowUpRight size={22} className="self-end" />
            <h3 className="display text-[1.9rem]">Not Listed? Ask Anyway.</h3>
          </Link>
        </div>

        <div id="areas" className="mt-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="display display-sm">Free Pickup Across Houston</p>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} className="chip">
                <MapPin size={16} weight="fill" className="text-red" /> {a.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
