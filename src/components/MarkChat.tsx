"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChatCircleText, Phone, X } from "@phosphor-icons/react";
import { MarkBust, type Mood } from "./MarkAvatar";
import { business, isOpenNow, smsHref, telHref } from "@/data/business";

/*
  "Talk to Mark": three tap-to-answer questions in Mark's voice that hand the
  seller to the estimator with their answers already filled in. Scripted, and
  it says so; Mark makes every real offer himself. Anything on the page can
  open it with openMarkChat(), optionally with the first answer chosen.
*/

type Problem = { id: string; label: string; reply: string; params: Record<string, string> };
type Title = { id: string; label: string; reply: string };

export const PROBLEMS: Problem[] = [
  { id: "no-start", label: "Won't start", reply: "Happens all the time. It doesn't need to run. The tow is on me.", params: { drive: "no-start" } },
  { id: "wrecked", label: "Wrecked", reply: "Sorry about the wreck. You don't fix a thing, I take it exactly as it sits.", params: { damage: "major" } },
  { id: "flood", label: "Flooded", reply: "Houston water. I buy those too.", params: { damage: "flood" } },
  { id: "runs", label: "Runs, just done with it", reply: "Easy. Those are the quickest ones.", params: { drive: "drives" } },
  { id: "other", label: "Something else", reply: "No problem. I've seen just about everything.", params: {} },
];

const TITLES: Title[] = [
  { id: "in-hand", label: "Yes, in my name", reply: "Perfect, that's the fastest kind." },
  { id: "lost", label: "I lost it", reply: "That's fine. Bring your ID and registration and I'll walk you through the rest." },
  { id: "not-in-name", label: "Not in my name", reply: "We can usually work with that. I'll tell you exactly what's needed before I drive out." },
  { id: "salvage", label: "Salvage title", reply: "Salvage is fine. I buy those." },
];

type Msg = { from: "mark" | "you"; text: string; mood?: Mood };

export function openMarkChat(problem?: string) {
  window.dispatchEvent(new CustomEvent("mark:open", { detail: { problem } }));
}

function Typing() {
  return (
    <span className="inline-flex gap-1 py-1" aria-label="Mark is typing">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-1.5 rounded-full bg-ink-3" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }} />
      ))}
    </span>
  );
}

export function MarkChat() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [title, setTitle] = useState<Title | null>(null);
  const [launcher, setLauncher] = useState(false);
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [contact, setContact] = useState<"closed" | "form" | "sending" | "sent" | "error">("closed");
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [hp, setHp] = useState("");
  const shownAt = useRef(0);
  const body = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setLauncher(y > 640));

  const say = useCallback(
    (lines: Msg[]) => {
      const gap = reduce ? 0 : 750;
      lines.forEach((m, i) => {
        timers.current.push(window.setTimeout(() => setTyping(true), i * gap));
        timers.current.push(
          window.setTimeout(() => {
            setTyping(false);
            setMsgs((prev) => [...prev, m]);
          }, i * gap + (reduce ? 0 : 600)),
        );
      });
    },
    [reduce],
  );

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setProblem(null);
    setTitle(null);
    setContact("closed");
    setTyping(false);
    setMsgs([]);
  }, []);

  const pickProblem = useCallback(
    (p: Problem) => {
      setProblem(p);
      setMsgs((prev) => [...prev, { from: "you", text: p.label }]);
      say([
        { from: "mark", text: p.reply, mood: "thumbs" },
        { from: "mark", text: "Do you have the title?", mood: "thinking" },
      ]);
    },
    [say],
  );

  const start = useCallback(
    (first?: string) => {
      reset();
      setOpenNow(isOpenNow());
      setOpen(true);
      const hello: Msg[] = [
        { from: "mark", text: `Hey, I'm ${business.owner}. I buy cars in any shape, every day of the week.`, mood: "wave" },
        { from: "mark", text: "What's going on with yours?", mood: "hello" },
      ];
      const p = PROBLEMS.find((x) => x.id === first);
      if (p) {
        setMsgs(hello);
        pickProblem(p);
      } else say(hello);
    },
    [pickProblem, reset, say],
  );

  const pickTitle = (t: Title) => {
    setTitle(t);
    setMsgs((prev) => [...prev, { from: "you", text: t.label }]);
    say([
      { from: "mark", text: t.reply, mood: "thumbs" },
      { from: "mark", text: "Want a number now? About a minute, and you see it before you give me your phone number.", mood: "point" },
    ]);
  };

  useEffect(() => {
    const onOpen = (e: Event) => start((e as CustomEvent<{ problem?: string }>).detail?.problem);
    window.addEventListener("mark:open", onOpen);
    return () => window.removeEventListener("mark:open", onOpen);
  }, [start]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typing, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (path?.startsWith("/offer") || path?.startsWith("/desk") || path?.startsWith("/sign")) return null;

  const lastMark = [...msgs].reverse().find((m) => m.from === "mark");
  const settled = !typing && msgs.length > 0 && msgs[msgs.length - 1].from === "mark";
  const stage = !problem ? "problem" : !title ? "title" : contact === "form" || contact === "sending" || contact === "error" ? "contact" : contact === "sent" ? "sent" : "done";

  const askContact = () => {
    shownAt.current = Date.now();
    setContact("form");
    setMsgs((prev) => [...prev, { from: "you", text: "Have Mark call me" }]);
    say([{ from: "mark", text: "Happy to. What's your name and the best number?", mood: "phone" }]);
  };

  async function sendContact(e: React.FormEvent) {
    e.preventDefault();
    if (cName.trim().length < 2 || cPhone.replace(/\D/g, "").length < 10) return;
    setContact("sending");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cName,
          phone: cPhone,
          company: hp,
          startedAt: shownAt.current,
          intent: "chat",
          preferredContact: "call",
          titleRoute: title?.id,
          vehicle: { drive: problem?.params.drive, damage: problem?.params.damage },
          notes: `From Mark's chat: ${problem?.label ?? ""}; title: ${title?.label ?? ""}`,
          page: window.location.pathname,
          ...Object.fromEntries(new URLSearchParams(window.location.search)),
        }),
      });
      if (!r.ok) throw new Error();
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
      setContact("sent");
      const first = cName.trim().split(" ")[0];
      say([{ from: "mark", text: isOpenNow() ? `Got it, ${first}. I'll call you shortly from ${business.phoneDisplay}.` : `Got it, ${first}. I'll call you first thing when we open at ${business.hours.open} AM, from ${business.phoneDisplay}.`, mood: "thumbs" }]);
    } catch {
      setContact("error");
    }
  }
  const offerHref = `/offer?${new URLSearchParams({ ...(problem?.params ?? {}), ...(title ? { title: title.id } : {}) })}`;
  const text = `Hi ${business.owner}, I want to sell my car.${problem ? ` ${problem.label}.` : ""}${title ? ` Title: ${title.label.toLowerCase()}.` : ""}`;

  return (
    <>
      {/* Desktop launcher: appears once the hero (which has its own Mark) is behind you. */}
      <AnimatePresence>
        {launcher && !open && (
          <motion.button
            type="button"
            onClick={() => start()}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-paper py-2 pl-2 pr-5 shadow-[0_18px_40px_-18px_rgba(10,22,64,.55)] ring-1 ring-rule md:flex"
          >
            <MarkBust size={46} ring={false} />
            <span className="text-left leading-tight">
              <span className="block text-[15px] font-semibold">Talk To {business.owner}</span>
              <span className="block text-[13px] text-ink-3">Three quick questions</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-label={`Talk to ${business.owner}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-2 bottom-2 z-50 flex max-h-[min(640px,88svh)] origin-bottom-right flex-col overflow-hidden rounded-[14px] bg-paper shadow-[0_30px_80px_-24px_rgba(10,22,64,.6)] ring-1 ring-rule md:inset-x-auto md:bottom-6 md:right-6 md:w-[392px]"
          >
            <div className="on-night flex items-center gap-3 bg-night px-4 py-3.5 text-white">
              <motion.span key={lastMark?.mood} initial={reduce ? false : { rotate: -8, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
                <MarkBust mood={lastMark?.mood} size={44} />
              </motion.span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="font-semibold">{business.owner}</p>
                <p className="flex items-center gap-1.5 text-[13px] text-on-night-2">
                  {openNow !== null && <span className={`size-2 rounded-full ${openNow ? "bg-[#3ccf7a]" : "bg-on-night-2"}`} />}
                  {openNow === null ? " " : openNow ? `Open now until ${business.hours.close - 12} PM` : `Back at ${business.hours.open} AM`}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <div ref={body} className="flex-1 space-y-2.5 overflow-y-auto bg-stone px-4 py-5" aria-live="polite">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-end gap-2 ${m.from === "you" ? "justify-end" : ""}`}
                >
                  {m.from === "mark" && <MarkBust mood={m.mood} size={28} ring={false} className={msgs[i + 1]?.from === "mark" ? "invisible" : ""} />}
                  <p
                    className={`max-w-[80%] rounded-[16px] px-3.5 py-2.5 text-[15px] leading-snug ${
                      m.from === "mark" ? "rounded-bl-[4px] bg-paper text-ink shadow-[0_1px_0_var(--rule)]" : "rounded-br-[4px] bg-ink text-paper"
                    }`}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <MarkBust size={28} ring={false} />
                  <span className="rounded-[16px] rounded-bl-[4px] bg-paper px-3.5 py-2">
                    <Typing />
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-rule bg-paper p-3">
              <AnimatePresence mode="wait">
                {settled && (
                  <motion.div key={stage} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    {stage === "problem" && (
                      <div className="flex flex-wrap gap-2">
                        {PROBLEMS.map((p) => (
                          <button key={p.id} type="button" onClick={() => pickProblem(p)} className="rounded-full px-4 py-2.5 text-[15px] font-medium ring-1 ring-ink/25 transition-colors hover:bg-ink hover:text-paper">
                            {p.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {stage === "title" && (
                      <div className="flex flex-wrap gap-2">
                        {TITLES.map((t) => (
                          <button key={t.id} type="button" onClick={() => pickTitle(t)} className="rounded-full px-4 py-2.5 text-[15px] font-medium ring-1 ring-ink/25 transition-colors hover:bg-ink hover:text-paper">
                            {t.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {stage === "contact" && (
                      <form onSubmit={sendContact} className="grid gap-2">
                        <input value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Your name" autoComplete="name" className="field !min-h-12" aria-label="Your name" />
                        <input value={cPhone} onChange={(e) => setCPhone(e.target.value)} placeholder="Mobile number" inputMode="tel" autoComplete="tel" className="field !min-h-12" aria-label="Mobile number" />
                        <input value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" name="company" />
                        <button type="submit" disabled={contact === "sending"} className="btn btn-red w-full">
                          {contact === "sending" ? "Sending" : "Call Me"}
                        </button>
                        {contact === "error" && <p className="text-[13px] text-emblem-red">That didn&apos;t go through. Check the number, or call {business.phoneDisplay}.</p>}
                      </form>
                    )}
                    {stage === "sent" && (
                      <Link href={offerHref} onClick={() => setOpen(false)} className="btn btn-outline w-full">
                        See My Estimate While You Wait <ArrowRight size={18} />
                      </Link>
                    )}
                    {stage === "done" && (
                      <div className="grid gap-2">
                        <button type="button" onClick={askContact} className="btn btn-red w-full">
                          <Phone size={18} /> Have {business.owner} Call Me
                        </button>
                        <Link href={offerHref} onClick={() => setOpen(false)} className="btn btn-ink w-full">
                          See My Estimate <ArrowRight size={18} />
                        </Link>
                        <div className="grid grid-cols-2 gap-2">
                          <a href={telHref} className="btn btn-outline min-h-[48px]">
                            <Phone size={18} /> Call
                          </a>
                          <a href={smsHref(text)} className="btn btn-outline min-h-[48px]">
                            <ChatCircleText size={18} /> Text
                          </a>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-2.5 flex items-center justify-between gap-3 text-[12px] text-ink-3">
                <span>Quick questions, not a live chat. {business.owner} makes every offer himself.</span>
                {problem && (
                  <button type="button" onClick={() => start()} className="shrink-0 underline underline-offset-2 hover:text-ink">
                    Start over
                  </button>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
