import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/** An editorial index: one row per page, title left, line and arrow right. */
export function IndexList({ items }: { items: { href: string; title: string; line: string }[] }) {
  return (
    <ul className="border-t border-rule">
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-rule py-7 md:grid-cols-[5fr_6fr_auto] md:py-9">
            <span className="t-2 transition-colors group-hover:text-emblem-blue">{it.title}</span>
            <span className="col-span-2 row-start-2 text-[1.06rem] text-ink-2 md:col-span-1 md:row-start-auto">{it.line}</span>
            <span className="grid size-12 place-items-center rounded-full bg-stone transition-colors group-hover:bg-ink group-hover:text-paper md:row-start-auto">
              <ArrowRight size={20} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
