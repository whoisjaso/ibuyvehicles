"use client";

import Link from "next/link";
import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Barcode,
  Car,
  CheckCircle,
  ChatCircleText,
  Drop,
  Fire,
  Jeep,
  Key,
  Lightning,
  Motorcycle,
  Phone,
  PlugsConnected,
  ShieldCheck,
  Sparkle,
  Truck,
  Van,
  Warning,
  WarningOctagon,
  Wrench,
  CarProfile,
} from "@phosphor-icons/react";
import { estimate, money, type Estimate } from "@/lib/estimate";
import { pricing, showDollars, type BodyClass, type DamageState, type DriveState } from "@/data/pricing";
import { titleRoutes, type TitleRoute } from "@/data/titleRoutes";
import { business, smsHref, telHref } from "@/data/business";

/*
  The instant offer. One question per screen, the tap is the answer, a step
  that doesn't apply doesn't exist. The range is shown before any contact
  details are asked for; the visitor then locks it in with Mark.
*/

type Vehicle = { vin?: string; year?: number; make?: string; model?: string; trim?: string; body?: BodyClass; engine?: string; plant?: string; bodyClass?: string };
type Recall = { component: string; summary: string; date: string };
type State = {
  vehicle: Vehicle;
  recalls: Recall[];
  drive?: DriveState;
  damage?: DamageState;
  title?: TitleRoute;
  keys?: "yes" | "no";
  parts?: string[];
  miles?: number | null;
  competingOffer?: number | null;
  situation?: string;
};

const STORE = "ibv-offer-v1";
const STEPS = ["vehicle", "drive", "damage", "title", "keys", "reveal", "lock", "done"] as const;
type Step = (typeof STEPS)[number];
const ease = [0.22, 1, 0.36, 1] as const;

const PARTS = ["Catalytic converter", "Engine or transmission", "Battery", "Wheels or tires", "Nothing"];

const MAKES = ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Fiat", "Ford", "GMC", "Genesis", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mercury", "Mini", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Ram", "Saturn", "Scion", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", "Harley-Davidson", "Yamaha", "Kawasaki"];

const BODY: { v: BodyClass; label: string; Icon: typeof Car }[] = [
  { v: "sedan", label: "Car / Sedan", Icon: Car },
  { v: "truck", label: "Pickup Truck", Icon: Truck },
  { v: "suv", label: "SUV", Icon: Jeep },
  { v: "van", label: "Van / Minivan", Icon: Van },
  { v: "compact", label: "Small Car", Icon: CarProfile },
  { v: "coupe", label: "Coupe / Sports", Icon: Lightning },
  { v: "motorcycle", label: "Motorcycle", Icon: Motorcycle },
];

const DRIVE: { v: DriveState; label: string; sub: string; Icon: typeof Car }[] = [
  { v: "drives", label: "It Drives", sub: "Starts and moves under its own power", Icon: CheckCircle },
  { v: "starts-only", label: "Starts, But Won't Drive", sub: "Transmission, brakes, or it just isn't safe", Icon: Warning },
  { v: "no-start", label: "Won't Start", sub: "Dead, sitting, or the engine's gone", Icon: PlugsConnected },
];

const DAMAGE: { v: DamageState; label: string; sub: string; Icon: typeof Car }[] = [
  { v: "none", label: "No Real Damage", sub: "Normal wear, small scratches", Icon: Sparkle },
  { v: "minor", label: "Some Dents Or Cracks", sub: "Cosmetic, cracked glass, a fender", Icon: Wrench },
  { v: "major", label: "Wrecked", sub: "Accident damage, airbags out, frame", Icon: WarningOctagon },
  { v: "flood", label: "Flood Damage", sub: "Water got inside", Icon: Drop },
  { v: "fire", label: "Fire Damage", sub: "Burned or melted", Icon: Fire },
];

export function OfferFlow({ preset }: { preset: Record<string, string | undefined> }) {
  const [step, setStep] = useState<Step>("vehicle");
  const [dir, setDir] = useState(1);
  const [s, setS] = useState<State>(() => initial(preset));
  const [ai, setAi] = useState<{ range: Estimate; headline?: string; factors?: string[]; ai: boolean } | null>(null);
  const top = useRef<HTMLDivElement>(null);

  // Restore an unfinished offer after a refresh (but let a fresh preset win).
  useEffect(() => {
    if (Object.values(preset).some(Boolean)) return;
    try {
      const raw = sessionStorage.getItem(STORE);
      if (raw) {
        const saved = JSON.parse(raw);
        setS(saved.s);
        if (STEPS.includes(saved.step) && saved.step !== "done") setStep(saved.step);
      }
    } catch {}
  }, [preset]);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify({ s, step }));
    } catch {}
  }, [s, step]);

  const flow = useMemo(() => STEPS.filter((x) => !(x === "title" && preset.situation === "dealer")), [preset.situation]);
  const idx = flow.indexOf(step);
  const go = (to: Step) => {
    setDir(flow.indexOf(to) > idx ? 1 : -1);
    setStep(to);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const next = () => go(flow[Math.min(flow.length - 1, idx + 1)]);
  const back = () => go(flow[Math.max(0, idx - 1)]);
  const set = (patch: Partial<State>, advance = true) => {
    setS((p) => ({ ...p, ...patch }));
    if (advance) setTimeout(next, 220);
  };

  const ready = s.vehicle.year && s.vehicle.body && s.drive && s.damage && s.title && s.keys;
  const local = ready ? estimate({ year: s.vehicle.year!, body: s.vehicle.body!, miles: s.miles, drive: s.drive!, damage: s.damage!, title: s.title!, keys: s.keys! }) : null;

  // Ask the AI reviewer once the answers are complete; the rules range shows instantly either way.
  useEffect(() => {
    if (step !== "reveal" || !ready) return;
    setAi(null);
    const ctrl = new AbortController();
    fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: ctrl.signal,
      body: JSON.stringify({
        year: s.vehicle.year,
        make: s.vehicle.make ?? "",
        model: s.vehicle.model ?? "",
        trim: s.vehicle.trim,
        body: s.vehicle.body,
        miles: s.miles ?? null,
        drive: s.drive,
        damage: s.damage,
        title: s.title,
        keys: s.keys,
      }),
    })
      .then((r) => r.json())
      .then((j) => j.ok && setAi(j))
      .catch(() => {});
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const range = ai?.range ?? local;
  const pct = Math.round(((idx + 1) / flow.length) * 100);
  const carName = [s.vehicle.year, s.vehicle.make, s.vehicle.model].filter(Boolean).join(" ") || "Your Vehicle";

  return (
    <div ref={top} className="mx-auto w-full max-w-[720px] scroll-mt-24">
      {step !== "done" && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-ink-2">
            {idx > 0 ? (
              <button onClick={back} className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-[4px] px-2 font-medium hover:text-ink">
                <ArrowLeft size={18} weight="bold" /> Back
              </button>
            ) : (
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={18} weight="fill" className="text-ink-2" /> No obligation · Takes ~60 seconds
              </span>
            )}
            <span className="tabular-nums">{pct}%</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-[2px] bg-stone">
            <motion.div className="h-full bg-ink" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.38, ease }}
        >
          {step === "vehicle" && <VehicleStep s={s} setS={setS} onDone={next} />}

          {step === "drive" && (
            <Question title="Does It Run?" sub={carName}>
              {DRIVE.map((o) => (
                <Option key={o.v} pressed={s.drive === o.v} onClick={() => set({ drive: o.v })} Icon={o.Icon} label={o.label} sub={o.sub} />
              ))}
            </Question>
          )}

          {step === "damage" && (
            <Question title="Any Damage?" sub="Be honest. It keeps the final number close to your estimate.">
              {DAMAGE.map((o) => (
                <Option key={o.v} pressed={s.damage === o.v} onClick={() => set({ damage: o.v })} Icon={o.Icon} label={o.label} sub={o.sub} />
              ))}
            </Question>
          )}

          {step === "title" && (
            <Question title="Do You Have The Title?" sub="Every answer has a path. None of them is a deal-breaker.">
              {(["in-hand", "not-in-name", "lost", "salvage"] as TitleRoute[]).map((t) => (
                <Option key={t} pressed={s.title === t} onClick={() => set({ title: t })} Icon={t === "lost" ? Warning : CheckCircle} label={titleRoutes[t].label} sub={titleRoutes[t].headline} />
              ))}
            </Question>
          )}

          {step === "keys" && (
            <Question title="Keys, Parts And Miles." sub="Last one. Anything missing is named now, so nothing changes at the curb.">
              <div className="grid grid-cols-2 gap-3">
                <Option pressed={s.keys === "yes"} onClick={() => setS((p) => ({ ...p, keys: "yes" }))} Icon={Key} label="I Have Keys" />
                <Option pressed={s.keys === "no"} onClick={() => setS((p) => ({ ...p, keys: "no" }))} Icon={Warning} label="No Keys" />
              </div>
              <fieldset className="mt-2">
                <legend className="mb-2 block text-sm text-ink-2">Has anything been replaced or removed?</legend>
                <div className="flex flex-wrap gap-2">
                  {PARTS.map((part) => {
                    const on = (s.parts ?? []).includes(part);
                    return (
                      <button
                        key={part}
                        type="button"
                        aria-pressed={on}
                        onClick={() =>
                          setS((p) => {
                            const cur = p.parts ?? [];
                            if (part === "Nothing") return { ...p, parts: on ? [] : ["Nothing"] };
                            const rest = cur.filter((x) => x !== "Nothing");
                            return { ...p, parts: on ? rest.filter((x) => x !== part) : [...rest, part] };
                          })
                        }
                        className={`min-h-11 rounded-[4px] px-4 text-[15px] transition-colors ${on ? "bg-ink text-paper" : "bg-paper shadow-[inset_0_0_0_1px_var(--rule)] hover:shadow-[inset_0_0_0_1px_var(--ink-3)]"}`}
                      >
                        {part}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <label className="mt-2 block">
                <span className="mb-2 block text-sm text-ink-2">About how many miles? (skip if unsure)</span>
                <input
                  className="field tabular-nums"
                  inputMode="numeric"
                  placeholder="e.g. 145,000"
                  value={s.miles ? s.miles.toLocaleString("en-US") : ""}
                  onChange={(e) => {
                    const n = Number(e.target.value.replace(/\D/g, "").slice(0, 7));
                    setS((p) => ({ ...p, miles: n || null }));
                  }}
                />
              </label>
              {preset.situation === "second-opinion" && (
                <label className="block">
                  <span className="mb-2 block text-sm text-ink-2">The offer you already have (optional)</span>
                  <input
                    className="field tabular-nums"
                    inputMode="numeric"
                    placeholder="$"
                    value={s.competingOffer ? money(s.competingOffer) : ""}
                    onChange={(e) => {
                      const n = Number(e.target.value.replace(/\D/g, "").slice(0, 7));
                      setS((p) => ({ ...p, competingOffer: n || null }));
                    }}
                  />
                </label>
              )}
              <button disabled={!s.keys} onClick={next} className="btn btn-ink mt-3 w-full text-lg disabled:opacity-40">
                See My Estimate <ArrowRight size={18} weight="bold" />
              </button>
            </Question>
          )}

          {step === "reveal" && range && (
            <Reveal range={range} carName={carName} ai={ai} s={s} onLock={next} />
          )}

          {step === "lock" && range && <Lock s={s} range={range} ai={!!ai?.ai} carName={carName} onDone={() => go("done")} />}

          {step === "done" && <Done s={s} carName={carName} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------- steps */

function VehicleStep({ s, setS, onDone }: { s: State; setS: React.Dispatch<React.SetStateAction<State>>; onDone: () => void }) {
  const [mode, setMode] = useState<"vin" | "ymm">(s.vehicle.vin ? "vin" : "ymm");
  const [vin, setVin] = useState(s.vehicle.vin ?? "");
  const [vinState, setVinState] = useState<"idle" | "loading" | "error">("idle");
  const [models, setModels] = useState<string[]>([]);
  const years = useMemo(() => {
    const y = new Date().getFullYear() + 1;
    return Array.from({ length: y - 1979 }, (_, i) => y - i);
  }, []);
  const v = s.vehicle;
  const setV = (patch: Partial<Vehicle>) => setS((p) => ({ ...p, vehicle: { ...p.vehicle, ...patch } }));

  useEffect(() => {
    if (!v.make || !v.year) return setModels([]);
    const ctrl = new AbortController();
    fetch(`/api/models?make=${encodeURIComponent(v.make)}&year=${v.year}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => setModels(j.models ?? []))
      .catch(() => {});
    return () => ctrl.abort();
  }, [v.make, v.year]);

  async function decode() {
    setVinState("loading");
    try {
      const r = await fetch(`/api/vin?vin=${vin}`);
      const j = await r.json();
      if (!j.ok) throw new Error();
      setS((p) => ({ ...p, vehicle: { ...j.vehicle }, recalls: j.recalls ?? [] }));
      setVinState("idle");
    } catch {
      setVinState("error");
    }
  }

  const decoded = mode === "vin" && v.vin && v.vin === vin;
  const canGo = mode === "vin" ? !!decoded : !!(v.year && v.make && v.body);

  return (
    <div>
      <h1 className="t-1">What Are You Selling?</h1>
      <p className="mt-3 text-ink-2">Use the VIN for the most accurate number, or just pick the year and make.</p>

      <div className="mt-7 grid grid-cols-2 gap-1 rounded-[4px] bg-stone p-1">
        {(["ymm", "vin"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`min-h-12 rounded-[4px] font-medium text-lg font-semibold transition ${mode === m ? "bg-ink text-paper" : "text-ink-3"}`}
          >
            {m === "vin" ? "I Have The VIN" : "Year & Make"}
          </button>
        ))}
      </div>

      {mode === "vin" ? (
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Barcode size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              className="field !pl-13 font-mono uppercase tracking-[.12em]"
              placeholder="17-character VIN"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              maxLength={17}
              value={vin}
              onChange={(e) => {
                setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, ""));
                setVinState("idle");
              }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm tabular-nums text-ink-3">{vin.length}/17</span>
          </div>
          <p className="text-sm text-ink-3">Find it on the driver-side dashboard through the windshield, the driver door jamb, your registration or your insurance card.</p>
          {!decoded && (
            <button onClick={decode} disabled={vin.length !== 17 || vinState === "loading"} className="btn btn-outline w-full disabled:opacity-40">
              {vinState === "loading" ? "Looking It Up…" : "Look Up My Vehicle"}
            </button>
          )}
          {vinState === "error" && <p className="text-sm text-[#b3261e]">We couldn&apos;t match that VIN. Double-check it, or switch to Year & Make.</p>}
          {decoded && <VehicleReport s={s} />}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <select className="field" value={v.year ?? ""} onChange={(e) => setV({ year: Number(e.target.value) || undefined, model: undefined, vin: undefined })} aria-label="Year">
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <input className="field" list="makes" placeholder="Make" value={v.make ?? ""} onChange={(e) => setV({ make: e.target.value, model: undefined, vin: undefined })} aria-label="Make" />
            <datalist id="makes">
              {MAKES.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>
          <input className="field" list="models" placeholder="Model (optional)" value={v.model ?? ""} onChange={(e) => setV({ model: e.target.value })} aria-label="Model" />
          <datalist id="models">
            {models.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
          <p className="pt-2 text-sm font-medium text-ink-2">What kind of vehicle?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BODY.map((b) => (
              <button key={b.v} aria-pressed={v.body === b.v} onClick={() => setV({ body: b.v })} className="option !min-h-[64px] !gap-3 !p-3">
                <b.Icon size={24} weight="duotone" className="shrink-0" />
                <span className="font-medium text-[1.05rem] font-semibold leading-tight">{b.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={onDone} disabled={!canGo} className="btn btn-ink mt-8 w-full text-lg disabled:opacity-40">
        Continue <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}

function VehicleReport({ s }: { s: State }) {
  const v = s.vehicle;
  const rows = [
    ["Body", v.bodyClass],
    ["Engine", v.engine],
    ["Built In", v.plant],
  ].filter(([, x]) => x);
  return (
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease }} className="overflow-hidden rounded-[12px] bg-stone ring-1 ring-rule">
      <div className="flex items-center justify-between bg-stone px-5 py-3 text-sm font-semibold text-ink">
        <span className="inline-flex items-center gap-2">
          <CheckCircle size={18} weight="fill" /> VIN Matched
        </span>
        <span className="font-mono text-xs tracking-widest text-ink-2">{v.vin}</span>
      </div>
      <div className="p-5">
        <p className="t-1">
          {v.year} {v.make} {v.model}
        </p>
        {v.trim && <p className="text-ink-2">{v.trim}</p>}
        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
          {rows.map(([k, x]) => (
            <div key={k} className="rounded-[4px] bg-paper px-3 py-2">
              <dt className="text-ink-3">{k}</dt>
              <dd className="font-medium">{x}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-[4px] bg-paper p-3 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <ShieldCheck size={18} weight="fill" className={s.recalls.length ? "text-[#9a6700]" : "text-ink"} />
            {s.recalls.length ? `${s.recalls.length} Safety Recall${s.recalls.length > 1 ? "s" : ""} On File (NHTSA)` : "No Safety Recalls Found (NHTSA)"}
          </p>
          {s.recalls.slice(0, 3).map((r) => (
            <p key={r.summary} className="mt-1.5 line-clamp-1 pl-6 text-ink-2">
              {r.component}
            </p>
          ))}
          <p className="mt-2 pl-6 text-xs text-ink-3">Mark runs the full title and history check at inspection.</p>
        </div>
      </div>
    </motion.div>
  );
}

function Reveal({ range, carName, ai, s, onLock }: { range: Estimate; carName: string; ai: { headline?: string; factors?: string[]; ai: boolean } | null; s: State; onLock: () => void }) {
  return (
    <div className="text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="mx-auto grid size-16 place-items-center rounded-full bg-stone text-ink">
        <CheckCircle size={36} weight="fill" />
      </motion.div>
      <h1 className="t-1 mt-6">{carName}</h1>
      <p className="mt-2 text-ink-2">{showDollars ? "Your instant estimate" : `${business.owner} reviews it personally`}</p>
      <div className="mx-auto mt-6 rounded-[12px] bg-stone p-8">
        
        
        {showDollars ? (
          <p className="relative whitespace-nowrap text-[clamp(2.4rem,10vw,4.75rem)] font-light leading-none tracking-[-0.035em] tabular-nums">
            <Rise to={range.low} />
            <span className="px-2 text-ink-3">to</span>
            <Rise to={range.high} delay={0.15} />
          </p>
        ) : (
          <p className="t-1 relative">Mark Texts You His Number</p>
        )}
        <p className="relative mt-4 text-sm text-ink-2">{showDollars ? "Estimated cash range. Free tow included, paid at pickup." : "Free tow included, paid at pickup."}</p>
        <AnimatePresence>
          {ai?.headline && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative mt-6 rounded-[4px] bg-paper p-4 text-left">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Sparkle size={16} weight="fill" className="text-ink" /> {ai.headline}
              </p>
              {ai.factors && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {ai.factors.map((f) => (
                    <li key={f} className="rounded-[4px] bg-stone px-3 py-1 text-xs">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {s.competingOffer ? (
          <p className="relative mt-5 rounded-[4px] bg-paper p-3 ring-1 ring-rule text-sm">
            You have an offer of <strong>{money(s.competingOffer)}</strong>. Lock in below and Mark will look at both and tell you straight.
          </p>
        ) : null}
      </div>
      <button onClick={onLock} className="btn btn-red mt-8 w-full text-lg">
        <Lightning size={18} weight="fill" /> Lock It In With {business.owner}
      </button>
      <p className="mt-4 text-sm text-ink-3">This is an estimate, not an offer. {business.owner} confirms the final number after a quick look at the vehicle.</p>
    </div>
  );
}

function Lock({ s, range, ai, carName, onDone }: { s: State; range: Estimate; ai: boolean; carName: string; onDone: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [pref, setPref] = useState<"text" | "call">("text");
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const digits = phone.replace(/\D/g, "");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || digits.length < 10) return;
    setState("sending");
    const utm = Object.fromEntries(new URLSearchParams(window.location.search));
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          zip,
          preferredContact: pref,
          notes,
          company: hp,
          intent: s.situation ?? "seller",
          titleRoute: s.title,
          vehicle: { ...s.vehicle, miles: s.miles ?? undefined, drive: s.drive, damage: s.damage, keys: s.keys, parts: s.parts?.join(", ") },
          estimate: { low: range.low, high: range.high, ai },
          competingOffer: s.competingOffer ?? undefined,
          page: window.location.pathname,
          ...utm,
        }),
      });
      if (!r.ok) throw new Error();
      try {
        sessionStorage.removeItem(STORE);
        sessionStorage.setItem("ibv-last", JSON.stringify({ s, carName }));
      } catch {}
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
      onDone();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={submit}>
      <h1 className="t-1">Where Should {business.owner} Reach You?</h1>
      <p className="mt-3 text-ink-2">
        {showDollars ? (
          <>
            Your {carName} estimate is saved: <strong className="text-ink">{`${money(range.low)} to ${money(range.high)}`}</strong>. {business.owner} reviews it personally.
          </>
        ) : (
          <>
            Your {carName} details are saved. {business.owner} reviews them personally.
          </>
        )}
      </p>
      <div className="mt-7 space-y-3">
        <input className="field" placeholder="First name" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="field" placeholder="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input className="field" placeholder="ZIP where the car is (optional)" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} />
        <div className="grid grid-cols-2 gap-2">
          {(["text", "call"] as const).map((p) => (
            <button type="button" key={p} aria-pressed={pref === p} onClick={() => setPref(p)} className="option !min-h-14 justify-center">
              {p === "text" ? <ChatCircleText size={20} weight="fill" /> : <Phone size={20} weight="fill" />}
              <span className="font-medium text-lg font-semibold capitalize">{p} Me</span>
            </button>
          ))}
        </div>
        <textarea className="field !min-h-24 py-4" placeholder="Anything Mark should know? (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <input tabIndex={-1} autoComplete="off" className="hidden" aria-hidden value={hp} onChange={(e) => setHp(e.target.value)} name="company" />
      </div>
      <button disabled={state === "sending" || !name.trim() || digits.length < 10} className="btn btn-red mt-6 w-full text-lg disabled:opacity-40">
        {state === "sending" ? "Sending…" : "Send To Mark"}
      </button>
      {state === "error" && (
        <p className="mt-3 text-center text-sm text-[#b3261e]">
          That didn&apos;t go through. Call or text {business.phoneDisplay} and Mark will take it from there.
        </p>
      )}
      <p className="mt-4 text-center text-xs text-ink-3">By sending, you agree that iBuy Vehicles may call or text you about this vehicle. No spam, ever.</p>
    </form>
  );
}

function Done({ s, carName }: { s: State; carName: string }) {
  const r = s.title ? titleRoutes[s.title] : null;
  const smsBody = `Hi Mark, I just sent my ${carName} on the website${s.vehicle.vin ? ` (VIN ${s.vehicle.vin})` : ""}. Here are photos:`;
  return (
    <div>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 240, damping: 16 }} className="grid size-20 place-items-center rounded-full bg-ink text-paper">
        <CheckCircle size={44} weight="fill" />
      </motion.div>
      <h1 className="t-1 mt-8">It&apos;s With {business.owner}.</h1>
      <p className="lede mt-4 text-ink-2">Want the fastest final number? Text a few photos: all four sides, the dash with the car on, and any damage.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <a href={smsHref(smsBody)} className="btn btn-ink text-lg">
          <ChatCircleText size={20} weight="fill" /> Text Photos To Mark
        </a>
        <a href={telHref} className="btn btn-outline text-lg">
          <Phone size={20} weight="fill" /> Call Now
        </a>
      </div>
      <ol className="mt-12 space-y-5 border-l border-rule pl-6">
        {[
          ["Mark Reviews It", "He looks at your answers and any photos you send."],
          ["You Get The Final Number", "By text or call, your choice. No obligation."],
          [`Pickup, Often Within ${business.pickupWindow}`, "Paid on the spot, before the tow. The tow is free."],
        ].map(([t, d], i) => (
          <motion.li key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }} className="relative">
            <span className="absolute -left-[33px] top-1 size-4 rounded-full border-2 border-paper bg-ink" />
            <p className="font-medium text-xl font-semibold capitalize">{t}</p>
            <p className="text-ink-2">{d}</p>
          </motion.li>
        ))}
      </ol>
      {r && (
        <div className="mt-10 rounded-[12px] bg-stone p-6 ring-1 ring-rule">
          <p className="t-3">Have Ready On Pickup Day</p>
          <ul className="mt-4 space-y-2.5">
            {r.bring.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-ink" /> {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-2">{r.note}</p>
          <p className="mt-4 border-t border-rule pt-4 text-sm text-ink-2">After the sale, take your plates and toll tag off, and file a Vehicle Transfer Notification with TxDMV within 30 days. It keeps the next owner&apos;s tolls and tickets out of your name.</p>
        </div>
      )}
      <Link href="/" className="mt-10 inline-flex min-h-11 items-center gap-2 text-ink-2 hover:text-ink">
        <ArrowLeft size={16} /> Back to home
      </Link>
    </div>
  );
}

/* ---------------------------------------------------------------- bits */

function Question({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="t-1">{title}</h1>
      {sub && <p className="mt-3 text-ink-2">{sub}</p>}
      <div className="mt-7 space-y-3">{children}</div>
    </div>
  );
}

function Option({ pressed, onClick, Icon, label, sub }: { pressed: boolean; onClick: () => void; Icon: typeof Car; label: string; sub?: string }) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className="option">
      <span className={`grid size-11 shrink-0 place-items-center rounded-[4px] transition ${pressed ? "bg-ink text-paper" : "bg-stone"}`}>
        <Icon size={22} weight="fill" />
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-[1.3rem] font-semibold capitalize leading-tight">{label}</span>
        {sub && <span className="mt-0.5 block text-sm text-ink-2">{sub}</span>}
      </span>
    </button>
  );
}

function Rise({ to, delay = 0 }: { to: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const c = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = money(Math.round(v / 25) * 25)),
    });
    return () => c.stop();
  }, [to, delay]);
  return <span ref={ref} className="tabular-nums" />;
}

function initial(p: Record<string, string | undefined>): State {
  const body = p.body && p.body in pricing.weightTons ? (p.body as BodyClass) : undefined;
  return {
    vehicle: { body },
    recalls: [],
    drive: p.drive && p.drive in pricing.drive ? (p.drive as DriveState) : undefined,
    damage: p.damage && p.damage in pricing.damage ? (p.damage as DamageState) : undefined,
    title: p.situation === "dealer" ? "dealer" : p.title && p.title in titleRoutes ? (p.title as TitleRoute) : undefined,
    situation: p.situation,
  };
}
