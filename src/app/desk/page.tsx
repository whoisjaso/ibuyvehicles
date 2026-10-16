import Link from "next/link";
import { ArrowRight, Plus } from "@phosphor-icons/react/dist/ssr";
import { Shell, Card, NoDatabase } from "./_ui/Shell";
import { deskStore } from "@/lib/desk/store";
import { todayList, stageOf, STAGE_LABEL, type Stage, type Action } from "@/lib/desk/pipeline";
import { numbersFor } from "@/lib/desk/stats";
import { business } from "@/data/business";

export const metadata = { title: "Today" };

const TONE: Record<Action["tone"], string> = { hot: "bg-emblem-red", today: "bg-emblem-blue", soon: "bg-[#c98a12]", later: "bg-rule" };
const CHANNEL: Record<string, string> = { estimate: "Online estimate", chat: "Mark's chat", call: "Phone call", text: "Text", "walk-in": "Walk-in", dealer: "Dealer", other: "Other" };

function greeting(now: Date) {
  const h = Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: business.timeZone }).format(now));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default async function Today() {
  const store = deskStore();
  if (!store)
    return (
      <Shell active="today">
        <NoDatabase />
      </Shell>
    );
  const buys = await store.list();
  const now = new Date();
  const actions = todayList(buys, now);
  const counts = buys.reduce<Record<Stage, number>>((acc, b) => ({ ...acc, [stageOf(b)]: (acc[stageOf(b)] ?? 0) + 1 }), { new: 0, reached: 0, offered: 0, scheduled: 0, bought: 0, lost: 0 });
  const week = numbersFor(buys, new Date(now.getTime() - 7 * 86_400_000));
  const byId = new Map(buys.map((b) => [b.id, b]));

  return (
    <Shell active="today">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[15px] text-ink-3">{now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: business.timeZone })}</p>
          <h1 className="t-1 mt-1">
            {greeting(now)}, {business.owner}.
          </h1>
        </div>
        <Link href="/desk/buys/new" className="btn btn-red">
          <Plus size={18} weight="bold" /> New Buy
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[7fr_5fr]">
        <Card>
          <h2 className="t-3">Needs You</h2>
          {actions.length === 0 ? (
            <p className="mt-4 text-ink-2">Nothing waiting. New leads from the site and Mark&apos;s chat land here the moment they come in.</p>
          ) : (
            <ul className="mt-4 divide-y divide-rule">
              {actions.map((a) => {
                const b = byId.get(a.buyId)!;
                return (
                  <li key={a.buyId}>
                    <Link href={`/desk/buys/${a.buyId}`} className="group flex items-center gap-4 py-4">
                      <span className={`size-2.5 shrink-0 rounded-full ${TONE[a.tone]}`} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{a.label}</span>
                        <span className="block truncate text-[14px] text-ink-3">
                          {a.detail} · {CHANNEL[b.channel]}
                        </span>
                      </span>
                      {a.tone === "hot" && <span className="rounded-full bg-[#fdecec] px-2.5 py-1 text-[12px] font-semibold text-[#9b1c1f]">Call now</span>}
                      <ArrowRight size={18} className="text-ink-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <div className="grid content-start gap-5">
          <Card>
            <h2 className="t-3">Every Buy</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(Object.keys(STAGE_LABEL) as Stage[]).map((s) => (
                <Link key={s} href={`/desk/buys?stage=${s}`} className="rounded-[10px] bg-stone px-3 py-3 transition-colors hover:bg-stone-2">
                  <span className="block text-[1.6rem] leading-none tabular-nums">{counts[s]}</span>
                  <span className="mt-1.5 block text-[13px] text-ink-3">{STAGE_LABEL[s]}</span>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="t-3">Last 7 Days</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
              <Stat label="Leads" value={week.leads} />
              <Stat label="Reached" value={week.leads ? `${Math.round((week.reached / week.leads) * 100)}%` : "None yet"} />
              <Stat label="Bought" value={week.bought} />
              <Stat label="Time to reach" value={week.medianMinutesToReach != null ? `${week.medianMinutesToReach} min` : "None yet"} />
              <Stat label="Paid out" value={week.paidTotal ? `$${week.paidTotal.toLocaleString("en-US")}` : "$0"} />
              <Stat label="Average buy" value={week.avgPaid != null ? `$${week.avgPaid.toLocaleString("en-US")}` : "None yet"} />
            </dl>
            {week.byChannel.length > 0 && (
              <ul className="mt-6 space-y-2 border-t border-rule pt-4 text-[15px]">
                {week.byChannel.map((c) => (
                  <li key={c.channel} className="flex justify-between">
                    <span className="text-ink-2">{CHANNEL[c.channel]}</span>
                    <span className="tabular-nums">
                      {c.leads} {c.leads === 1 ? "lead" : "leads"} · {c.bought} bought
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          {store.kind === "local" && <p className="px-1 text-[13px] text-ink-3">Preview mode: buys are kept in a local file on this machine until Mark&apos;s database is connected.</p>}
        </div>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-[13px] text-ink-3">{label}</dt>
      <dd className="mt-1 text-[1.35rem] leading-tight tabular-nums">{value}</dd>
    </div>
  );
}
