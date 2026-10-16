import Link from "next/link";
import { Emblem } from "@/components/Emblem";
import { signOut } from "../actions";

/** The desk's frame: Mark's mark, three places to go, sign out. Same paper, ink and red as the public site. */
export function Shell({ children, active }: { children: React.ReactNode; active?: "today" | "buys" | "new" }) {
  const tab = (href: string, key: string, label: string) => (
    <Link href={href} aria-current={active === key ? "page" : undefined} className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${active === key ? "bg-ink text-paper" : "text-ink-2 hover:bg-stone"}`}>
      {label}
    </Link>
  );
  return (
    <div className="min-h-svh bg-stone">
      <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-3 px-4 md:px-6">
          <Link href="/desk" className="flex items-center gap-2.5 font-semibold">
            <Emblem size={30} className="size-[30px]" /> <span className="hidden sm:inline">Mark&apos;s Desk</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1" aria-label="Desk">
            {tab("/desk", "today", "Today")}
            {tab("/desk/buys", "buys", "Buys")}
            {tab("/desk/buys/new", "new", "New")}
          </nav>
          <form action={signOut}>
            <button className="ml-1 rounded-full px-3 py-2 text-[14px] text-ink-3 hover:text-ink">Sign out</button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-6 md:px-6 md:pt-10">{children}</main>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-[14px] bg-paper p-5 shadow-[0_1px_0_var(--rule)] md:p-7 ${className}`}>{children}</section>;
}

export function NoDatabase() {
  return (
    <Card>
      <h1 className="t-2">The desk needs its database.</h1>
      <p className="mt-3 max-w-[60ch] text-ink-2">
        Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for Mark&apos;s own Supabase project and apply supabase/migrations. Until then nothing is stored here, so no seller&apos;s details can be lost.
      </p>
    </Card>
  );
}
