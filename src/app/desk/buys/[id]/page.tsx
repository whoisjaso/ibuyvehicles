import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Check, Phone } from "@phosphor-icons/react/dist/ssr";
import { Shell, Card, NoDatabase } from "../../_ui/Shell";
import { TextButton } from "../../_ui/TextButton";
import { ActionForm } from "../../_ui/ActionForm";
import { StepScreen } from "./StepScreen";
import { deskStore } from "@/lib/desk/store";
import { buildGuideSteps, liveDocument, nextOpenStep, progress, type StepKey } from "@/lib/desk/guide";
import { stageOf, STAGE_LABEL } from "@/lib/desk/pipeline";
import { textsFor, smsLink, telLink } from "@/lib/desk/texts";
import { TITLE_ROUTES, LIEN_NOTE } from "@/lib/desk/title-routes";
import { billOfSaleFields } from "@/lib/desk/bill-of-sale";
import { formatPhone } from "@/lib/desk/lead-quality";
import { LOST_REASONS } from "@/lib/desk/types";
import { addNote, reopen } from "../../actions";
import { business } from "@/data/business";

export const metadata = { title: "Buy" };

const when = (iso: string) => new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: business.timeZone });

export default async function BuyPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ step?: string; dup?: string }> }) {
  const store = deskStore();
  if (!store)
    return (
      <Shell>
        <NoDatabase />
      </Shell>
    );
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const buy = await store.get(id);
  if (!buy) notFound();

  const s = buy.stepData;
  const steps = buildGuideSteps(buy);
  const asked = steps.find((x) => x.key === sp.step);
  const current = asked ?? nextOpenStep(steps);
  const stage = stageOf(buy);
  const { done, total } = progress(steps);
  const bos = liveDocument(buy, "bill-of-sale");
  const host = (await headers()).get("host");
  const origin = host ? `${host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https"}://${host}` : business.siteUrl;
  const signUrl = bos?.signToken && !bos.signature ? `${origin}/sign/${bos.signToken}` : undefined;
  const texts = textsFor(buy, { signUrl, reviewUrl: business.reviewUrl });
  const suggested = stage === "new" ? "first" : stage === "offered" ? (s.answer?.decision === "thinking" ? "follow-up" : "offer") : stage === "scheduled" ? (signUrl ? "sign" : "pickup") : stage === "bought" ? "review" : undefined;
  const car = [s.car?.year, s.car?.make, s.car?.model].filter(Boolean).join(" ") || "Car not set yet";
  const phone = s.seller?.phone;

  return (
    <Shell>
      <Link href="/desk" className="text-[15px] text-ink-3 hover:text-ink">
        ← Today
      </Link>

      {sp.dup && <p className="mt-4 rounded-[10px] bg-[#e8eefc] px-4 py-3 text-[15px] text-ink">This seller already had an open buy, so you&apos;re on it instead of a duplicate.</p>}
      {buy.lost && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[10px] bg-[#f1f2f5] px-4 py-3 text-[15px]">
          <span>
            Closed: <strong>{LOST_REASONS[buy.lost.reason]}</strong> ({when(buy.lost.at)})
          </span>
          <ActionForm action={reopen} hidden={{ id: buy.id }}>
            <button className="btn btn-outline !min-h-10 !px-4 text-[14px]">Reopen</button>
          </ActionForm>
        </div>
      )}

      <div className="mt-4 grid gap-5 lg:grid-cols-[7fr_5fr]">
        <div className="grid content-start gap-5">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="t-2">{s.seller?.name ?? "Unknown seller"}</h1>
                <p className="mt-1 text-ink-2">{car}</p>
              </div>
              <span className="rounded-full bg-stone px-3 py-1.5 text-[13px] font-semibold">{STAGE_LABEL[stage]}</span>
            </div>
            {phone && (
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={telLink(phone)} className="btn btn-red !min-h-12">
                  <Phone size={18} weight="fill" /> {formatPhone(phone)}
                </a>
              </div>
            )}
            <div className="mt-6">
              <div className="h-1.5 overflow-hidden rounded-full bg-stone">
                <div className="h-full w-full origin-left rounded-full bg-ink transition-transform duration-500" style={{ transform: `scaleX(${done / total})` }} />
              </div>
              <p className="mt-2 text-[13px] text-ink-3">
                {done} of {total} done{s.offer ? ` · Offer $${s.offer.amount.toLocaleString("en-US")}` : ""}
                {s.payment ? ` · Paid $${s.payment.amount.toLocaleString("en-US")}` : ""}
              </p>
            </div>
          </Card>

          {current && !buy.lost ? (
            <Card>
              {current.waiting && !asked && <p className="mb-4 rounded-[10px] bg-[#fff6e5] px-4 py-3 text-[15px] text-[#7a4b00]">{current.waiting}.</p>}
              <StepScreen
                buy={buy}
                step={current.key as StepKey}
                title={current.title}
                billOfSale={{ filed: Boolean(bos), signed: Boolean(bos?.signature), missing: billOfSaleFields(buy).missing, signUrl, docId: bos?.id }}
              />
            </Card>
          ) : !buy.lost ? (
            <Card>
              <h2 className="t-2">Bought.</h2>
              <p className="mt-2 text-ink-2">Signed, paid and on the truck. Send the review ask and the transfer reminder from the right.</p>
            </Card>
          ) : null}

          <Card>
            <h2 className="t-3">The Buy, Step By Step</h2>
            <ol className="mt-4 divide-y divide-rule">
              {steps.map((x) => (
                <li key={x.key}>
                  <Link href={`/desk/buys/${buy.id}?step=${x.key}`} className={`flex items-center gap-3 py-3 ${current?.key === x.key ? "font-semibold" : ""}`}>
                    <span className={`grid size-6 shrink-0 place-items-center rounded-full ${x.done ? "bg-ink text-paper" : "ring-1 ring-rule"}`}>{x.done && <Check size={13} weight="bold" />}</span>
                    <span className={x.done ? "text-ink-2" : ""}>{x.title}</span>
                    {x.waiting && <span className="ml-auto text-[13px] text-[#7a4b00]">Waiting</span>}
                  </Link>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <div className="grid content-start gap-5">
          <Card>
            <h2 className="t-3">Texts</h2>
            <p className="mt-1 text-[14px] text-ink-3">Opens in your Messages app, from your number. Nothing sends until you tap send.</p>
            <div className="mt-4 grid gap-2">
              {phone && <TextButton id={buy.id} kind="call" label={`Call ${s.seller?.name?.split(" ")[0] ?? ""}`} href={telLink(phone)} />}
              {texts.map((t) => (
                <TextButton key={t.key} id={buy.id} kind={t.key} label={t.label} body={t.body} href={smsLink(phone, t.body)} primary={t.key === suggested} />
              ))}
            </div>
          </Card>

          {s.title?.route && (
            <Card>
              <h2 className="t-3">{TITLE_ROUTES[s.title.route].label}</h2>
              <p className="mt-3 text-[14px] font-semibold text-ink-2">Tell them to have ready</p>
              <ul className="mt-1.5 list-disc pl-5 text-[15px] text-ink-2">
                {TITLE_ROUTES[s.title.route].bring.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <ul className="mt-4 space-y-3 text-[14px] text-ink-2">
                {s.title.lien === "yes" && <li>{LIEN_NOTE}</li>}
                {TITLE_ROUTES[s.title.route].notes.map((n) => (
                  <li key={n.text} className={n.text.startsWith("[Not set") ? "font-medium text-[#7a4b00]" : ""}>
                    {n.text}
                    {n.source && (
                      <a href={n.source.url} target="_blank" rel="noopener" className="ml-1 text-ink-3 underline underline-offset-2">
                        {n.source.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card>
            <h2 className="t-3">History</h2>
            <ActionForm action={addNote} hidden={{ id: buy.id }} className="mt-4 flex gap-2">
              <input name="text" placeholder="Add a note" className="field !min-h-11 flex-1" />
              <button className="btn btn-outline !min-h-11 !px-4">Add</button>
            </ActionForm>
            <ul className="mt-4 space-y-3 text-[14px]">
              {[...buy.events].reverse().map((e, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-[92px] shrink-0 tabular-nums text-ink-3">{when(e.at)}</span>
                  <span className="text-ink-2">{e.text ?? e.kind.replace(/-/g, " ")}</span>
                </li>
              ))}
            </ul>
            {buy.documents.some((d) => d.voidedAt) && (
              <p className="mt-4 border-t border-rule pt-3 text-[13px] text-ink-3">Voided documents stay on file and are never deleted.</p>
            )}
          </Card>
        </div>
      </div>
    </Shell>
  );
}
