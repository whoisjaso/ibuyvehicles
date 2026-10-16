import Link from "next/link";
import { Shell, Card, NoDatabase } from "../_ui/Shell";
import { deskStore } from "@/lib/desk/store";
import { stageOf, STAGE_LABEL, type Stage } from "@/lib/desk/pipeline";
import { buildGuideSteps, progress } from "@/lib/desk/guide";
import { business } from "@/data/business";

export const metadata = { title: "Buys" };

export default async function Buys({ searchParams }: { searchParams: Promise<{ stage?: string }> }) {
  const store = deskStore();
  if (!store)
    return (
      <Shell active="buys">
        <NoDatabase />
      </Shell>
    );
  const { stage } = await searchParams;
  const all = await store.list();
  const filter = stage && stage in STAGE_LABEL ? (stage as Stage) : null;
  const list = filter ? all.filter((b) => stageOf(b) === filter) : all.filter((b) => stageOf(b) !== "lost");
  return (
    <Shell active="buys">
      <h1 className="t-1">{filter ? STAGE_LABEL[filter] : "Open Buys"}</h1>
      <nav className="mt-5 flex flex-wrap gap-2" aria-label="Filter">
        <Link href="/desk/buys" className={`rounded-full px-4 py-2 text-[15px] ring-1 ring-rule ${!filter ? "bg-ink text-paper" : "bg-paper"}`}>
          Open
        </Link>
        {(Object.keys(STAGE_LABEL) as Stage[]).map((s) => (
          <Link key={s} href={`/desk/buys?stage=${s}`} className={`rounded-full px-4 py-2 text-[15px] ring-1 ring-rule ${filter === s ? "bg-ink text-paper" : "bg-paper"}`}>
            {STAGE_LABEL[s]}
          </Link>
        ))}
      </nav>
      <Card className="mt-6 !p-0">
        {list.length === 0 ? (
          <p className="p-6 text-ink-2">Nothing here.</p>
        ) : (
          <ul className="divide-y divide-rule">
            {list.map((b) => {
              const p = progress(buildGuideSteps(b));
              const car = [b.stepData.car?.year, b.stepData.car?.make, b.stepData.car?.model].filter(Boolean).join(" ") || "Car not set";
              return (
                <li key={b.id}>
                  <Link href={`/desk/buys/${b.id}`} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-stone md:grid-cols-[2fr_2fr_1fr_auto]">
                    <span className="font-semibold">{b.stepData.seller?.name ?? "Unknown"}</span>
                    <span className="order-3 col-span-2 text-[14px] text-ink-3 md:order-none md:col-span-1 md:text-[15px] md:text-ink-2">{car}</span>
                    <span className="hidden text-[14px] text-ink-3 md:block">{new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: business.timeZone })}</span>
                    <span className="rounded-full bg-stone px-3 py-1 text-[13px] font-semibold">
                      {STAGE_LABEL[stageOf(b)]} · {p.done}/{p.total}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </Shell>
  );
}
