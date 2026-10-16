"use client";

import { useState } from "react";
import Link from "next/link";
import { ActionForm, Choice, Field } from "../../_ui/ActionForm";
import * as act from "../../actions";
import type { Buy } from "@/lib/desk/types";
import { LOST_REASONS } from "@/lib/desk/types";
import type { StepKey } from "@/lib/desk/guide";

/* One question per screen. The answer is the submit; nothing a formula can produce is asked. */

const PARTS = ["Catalytic converter", "Engine or transmission", "Battery", "Wheels or tires"];

function localInput(iso?: string) {
  if (!iso) return "";
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(iso));
  const g = (k: string) => p.find((x) => x.type === k)?.value;
  return `${g("year")}-${g("month")}-${g("day")}T${g("hour")}:${g("minute")}`;
}

export function StepScreen({ buy, step, title, billOfSale }: { buy: Buy; step: StepKey; title: string; billOfSale: { filed: boolean; signed: boolean; missing: string[]; signUrl?: string; docId?: string } }) {
  const s = buy.stepData;
  const h = { id: buy.id, version: buy.version };
  const first = s.seller?.name?.split(" ")[0] ?? "the seller";
  const [voiding, setVoiding] = useState(false);
  const [differs, setDiffers] = useState(false);


  switch (step) {
    case "reach":
      return (
        <Q title={title}>
          <p className="-mt-2 mb-5 text-ink-2">A real person on the phone is the check that this lead is real. Call or text {first} first, then tell the desk how you reached them.</p>
          <ActionForm action={act.answerReach} hidden={h} className="grid gap-2">
            <Choice name="how" value="call" label="Talked on the phone" />
            <Choice name="how" value="text" label="Texted back and forth" />
            <Choice name="how" value="in-person" label="In person" />
          </ActionForm>
          <LostRow buy={buy} />
        </Q>
      );
    case "car":
      return (
        <Q title={title}>
          <ActionForm action={act.answerCar} hidden={h} className="grid gap-4 sm:grid-cols-3">
            <Field label="Year">
              <input name="year" inputMode="numeric" defaultValue={s.car?.year ?? ""} className="field" required />
            </Field>
            <Field label="Make">
              <input name="make" defaultValue={s.car?.make ?? ""} className="field" required />
            </Field>
            <Field label="Model">
              <input name="model" defaultValue={s.car?.model ?? ""} className="field" required />
            </Field>
            <div className="sm:col-span-2">
              <Field label="VIN" hint="Needed for the bill of sale. 17 characters, on the dash or the door jamb.">
                <input name="vin" defaultValue={s.car?.vin ?? ""} className="field uppercase" maxLength={17} autoCapitalize="characters" />
              </Field>
            </div>
            <Field label="Miles">
              <input name="miles" inputMode="numeric" defaultValue={s.car?.miles ?? ""} className="field" />
            </Field>
            <div className="sm:col-span-3">
              <Save />
            </div>
          </ActionForm>
        </Q>
      );
    case "condition":
      return (
        <Q title={title}>
          <ActionForm action={act.answerCondition} hidden={h} className="grid gap-5">
            <Radio name="drive" value={s.condition?.drive} options={[["drives", "Drives"], ["starts-only", "Starts, doesn't drive"], ["no-start", "Won't start"]]} label="Does it run?" />
            <Radio name="damage" value={s.condition?.damage} options={[["none", "No damage"], ["minor", "Minor"], ["major", "Major or wrecked"], ["flood", "Flood"], ["fire", "Fire"]]} label="Damage" />
            <Radio name="keys" value={s.condition?.keys} options={[["yes", "Has keys"], ["no", "No keys"]]} label="Keys" />
            <fieldset>
              <legend className="mb-2 text-[15px] font-medium text-ink-2">Missing or replaced (ask before the number, not at the curb)</legend>
              <div className="flex flex-wrap gap-2">
                {PARTS.map((p) => (
                  <label key={p} className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-[15px] ring-1 ring-rule has-[:checked]:bg-ink has-[:checked]:text-paper">
                    <input type="checkbox" name="parts" value={p} defaultChecked={s.condition?.parts?.includes(p)} className="sr-only" /> {p}
                  </label>
                ))}
              </div>
            </fieldset>
            <Save />
          </ActionForm>
        </Q>
      );
    case "title":
      return (
        <Q title={title}>
          <TitleForm buy={buy} />
        </Q>
      );
    case "offer":
      return (
        <Q title={title}>
          {s.estimate?.low ? (
            <p className="-mt-2 mb-5 text-ink-2">
              The site showed {first} an estimate of ${s.estimate.low.toLocaleString("en-US")} to ${s.estimate.high?.toLocaleString("en-US")}.
            </p>
          ) : null}
          <ActionForm action={act.answerOffer} hidden={h}>
            <Field label="Your offer, in dollars">
              <input name="amount" inputMode="numeric" defaultValue={s.offer?.amount ?? ""} className="field max-w-[220px] text-[1.4rem]" required />
            </Field>
            <Save label="Make The Offer" />
          </ActionForm>
          <p className="mt-4 text-[14px] text-ink-3">Next: send it with the &ldquo;The offer&rdquo; text on the right.</p>
        </Q>
      );
    case "answer":
      return (
        <Q title={title}>
          <ActionForm action={act.answerDecision} hidden={h} className="grid gap-2">
            <Choice name="decision" value="yes" label="Yes, let's do it" />
            <Choice name="decision" value="thinking" label="Thinking it over" sub="It moves to follow-ups on Today." />
          </ActionForm>
          <ActionForm action={act.answerDecision} hidden={{ ...h, decision: "no" }} className="mt-6 flex flex-wrap items-end gap-2 border-t border-rule pt-5">
            <Field label="Said no because">
              <select name="reason" className="field" defaultValue="price-too-low">
                {(["price-too-low", "sold-elsewhere", "kept-it", "cant-buy"] as const).map((r) => (
                  <option key={r} value={r}>
                    {LOST_REASONS[r]}
                  </option>
                ))}
              </select>
            </Field>
            <button className="btn btn-outline">They Said No</button>
          </ActionForm>
        </Q>
      );
    case "pickup":
      return (
        <Q title={title}>
          <ActionForm action={act.answerPickup} hidden={h} className="grid gap-4">
            <Field label="Day and time (Houston)">
              <input name="at" type="datetime-local" defaultValue={localInput(s.pickup?.at)} className="field max-w-[280px]" required />
            </Field>
            <Field label="Where the car is">
              <input name="address" defaultValue={s.pickup?.address ?? ""} autoComplete="street-address" className="field" required />
            </Field>
            <Field label="Notes for the driver">
              <input name="notes" defaultValue={s.pickup?.notes ?? ""} placeholder="Gate code, flat tires, parked in back..." className="field" />
            </Field>
            <Save label="Set Pickup" />
          </ActionForm>
        </Q>
      );
    case "seller-id":
      return (
        <Q title={title}>
          <p className="-mt-2 mb-5 text-ink-2">Read it off the ID in front of you. Type the name exactly as printed.</p>
          <ActionForm action={act.answerSellerId} hidden={h} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Name on the ID">
                <input name="nameOnId" defaultValue={s.sellerId?.nameOnId ?? ""} className="field" required />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Seller's address" hint="For the bill of sale.">
                <input name="address" defaultValue={s.sellerId?.address ?? ""} className="field" required />
              </Field>
            </div>
            <Field label="Kind of ID">
              <select name="idKind" defaultValue={s.sellerId?.idKind ?? "dl"} className="field">
                <option value="dl">Driver licence</option>
                <option value="state-id">State ID</option>
                <option value="passport">Passport</option>
                <option value="other">Other photo ID</option>
              </select>
            </Field>
            <Field label="Last 4 of the ID number">
              <input name="idLast4" maxLength={4} defaultValue={s.sellerId?.idLast4 ?? ""} className="field" />
            </Field>
            <div className="sm:col-span-2">
              <Radio name="matchesTitle" value={s.sellerId?.matchesTitle} options={[["yes", "Matches the title"], ["no", "Doesn't match the title"], ["no-title", "No title to compare"]]} label="Does the name match the title?" />
            </div>
            <div className="sm:col-span-2">
              <Save label="ID Checked" />
            </div>
          </ActionForm>
        </Q>
      );
    case "bill-of-sale":
      return (
        <Q title={title}>
          {!billOfSale.filed ? (
            <>
              {billOfSale.missing.length > 0 && (
                <div className="mb-5 rounded-[10px] bg-[#fff6e5] p-4 text-[15px] text-[#7a4b00]">
                  <p className="font-semibold">Can&apos;t file yet. Still not set:</p>
                  <ul className="mt-2 list-disc pl-5">
                    {billOfSale.missing.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Link href={`/desk/buys/${buy.id}/bill-of-sale`} className="btn btn-outline">
                  Preview
                </Link>
                <ActionForm action={act.fileBillOfSale} hidden={{ id: buy.id }}>
                  <button className="btn btn-ink">File It</button>
                </ActionForm>
              </div>
            </>
          ) : (
            <>
              <p className="-mt-2 text-ink-2">
                {billOfSale.signed ? `Signed by ${first}.` : `Filed. ${first} signs it on their own phone (send the signing link on the right), or hand them yours.`}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/desk/buys/${buy.id}/bill-of-sale`} className="btn btn-outline">
                  Open
                </Link>
                {!billOfSale.signed && billOfSale.signUrl && (
                  <a href={billOfSale.signUrl} target="_blank" rel="noopener" className="btn btn-ink">
                    Sign Here On This Phone
                  </a>
                )}
                <button type="button" onClick={() => setVoiding((v) => !v)} className="btn text-ink-3 hover:text-ink">
                  Void
                </button>
              </div>
              {voiding && (
                <ActionForm action={act.voidDocument} hidden={{ id: buy.id, docId: billOfSale.docId ?? "" }} className="mt-4 flex flex-wrap items-end gap-2">
                  <Field label="Why is it being voided?">
                    <input name="reason" className="field" required />
                  </Field>
                  <button className="btn btn-outline">Void It</button>
                </ActionForm>
              )}
            </>
          )}
        </Q>
      );
    case "paid":
      return (
        <Q title={title}>
          <ActionForm action={act.answerPayment} hidden={h} className="grid gap-4">
            <Field label="Amount paid">
              <input
                name="amount"
                inputMode="numeric"
                defaultValue={s.payment?.amount ?? s.offer?.amount ?? ""}
                onChange={(e) => setDiffers(Number(e.target.value) !== s.offer?.amount)}
                className="field max-w-[220px] text-[1.4rem]"
                required
              />
            </Field>
            {differs && (
              <Field label="Why is it different from the offer?" hint="Kept on the record. If the bill of sale is signed, void it and file again at the new amount first.">
                <input name="reason" className="field" required />
              </Field>
            )}
            <Radio name="method" value={s.payment?.method} options={[["cash", "Cash"], ["zelle", "Zelle"], ["cashapp", "Cash App"], ["other", "Other"]]} label="Paid by" />
            <Save label="Paid" />
          </ActionForm>
        </Q>
      );
    case "picked-up":
      return (
        <Q title={title}>
          <ActionForm action={act.answerPickedUp} hidden={h}>
            <button className="btn btn-red w-full sm:w-auto">It&apos;s On The Truck</button>
          </ActionForm>
        </Q>
      );
  }
}

/* Declared outside StepScreen: a component defined inside a render is a new type every render, and React would remount the form and drop what was typed. */
function Q({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="t-2">{title}</h2>
      <div className="mt-6">{children}</div>
    </>
  );
}

function Save({ label = "Save" }: { label?: string }) {
  return <button className="btn btn-ink mt-6 w-full sm:w-auto">{label}</button>;
}

function Radio({ name, value, options, label }: { name: string; value?: string; options: [string, string][]; label: string }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[15px] font-medium text-ink-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, l]) => (
          <label key={v} className="flex cursor-pointer items-center rounded-full px-4 py-2.5 text-[15px] ring-1 ring-rule transition-colors has-[:checked]:bg-ink has-[:checked]:text-paper">
            <input type="radio" name={name} value={v} defaultChecked={value === v} required className="sr-only" /> {l}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function TitleForm({ buy }: { buy: Buy }) {
  const s = buy.stepData;
  const [lien, setLien] = useState(s.title?.lien);
  return (
    <ActionForm action={act.answerTitle} hidden={{ id: buy.id, version: buy.version }} className="grid gap-5">
      <Radio name="route" value={s.title?.route} label="The title" options={[["in-hand", "In their name"], ["not-in-name", "Someone else's name"], ["lost", "Lost"], ["salvage", "Salvage or branded"], ["dealer", "Dealer unit"]]} />
      <fieldset onChange={(e) => setLien((e.target as unknown as HTMLInputElement).value as "yes" | "no")}>
        <legend className="mb-2 text-[15px] font-medium text-ink-2">Still a loan on it?</legend>
        <div className="flex gap-2">
          {(["no", "yes"] as const).map((v) => (
            <label key={v} className="flex cursor-pointer items-center rounded-full px-4 py-2.5 text-[15px] ring-1 ring-rule has-[:checked]:bg-ink has-[:checked]:text-paper">
              <input type="radio" name="lien" value={v} defaultChecked={s.title?.lien === v} required className="sr-only" /> {v === "no" ? "No loan" : "Yes, a loan"}
            </label>
          ))}
        </div>
      </fieldset>
      {lien === "yes" && (
        <Field label="Who holds the loan?">
          <input name="lienholder" defaultValue={s.title?.lienholder ?? ""} className="field" required />
        </Field>
      )}
      <button className="btn btn-ink w-full sm:w-auto">Save</button>
    </ActionForm>
  );
}

function LostRow({ buy }: { buy: Buy }) {
  return (
    <ActionForm action={act.markLost} hidden={{ id: buy.id }} className="mt-6 flex flex-wrap items-end gap-2 border-t border-rule pt-5">
      <Field label="Couldn't reach them?">
        <select name="reason" className="field" defaultValue="no-answer">
          {(["no-answer", "not-real", "duplicate"] as const).map((r) => (
            <option key={r} value={r}>
              {LOST_REASONS[r]}
            </option>
          ))}
        </select>
      </Field>
      <button className="btn btn-outline">Close It</button>
    </ActionForm>
  );
}
