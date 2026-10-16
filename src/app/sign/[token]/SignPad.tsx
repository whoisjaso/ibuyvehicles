"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signDocument } from "./actions";

/* Scroll to the end unlocks the pad; finger or mouse signs; one tap files it. */
export function SignPad({ token, children }: { token: string; children: React.ReactNode }) {
  const end = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [read, setRead] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const el = end.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRead(true), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const c = canvas.current;
    if (!c || !read) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * ratio;
    c.height = rect.height * ratio;
    const ctx = c.getContext("2d")!;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0b1230";
    let down = false;
    const pos = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top] as const;
    };
    const onDown = (e: PointerEvent) => {
      down = true;
      c.setPointerCapture(e.pointerId);
      const [x, y] = pos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const [x, y] = pos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      setDrawn(true);
    };
    const onUp = () => (down = false);
    c.addEventListener("pointerdown", onDown);
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerup", onUp);
    c.addEventListener("pointercancel", onUp);
    return () => {
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
    };
  }, [read]);

  const clear = () => {
    const c = canvas.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setDrawn(false);
  };

  return (
    <>
      {children}
      <div ref={end} className="h-px" />
      <section className="mx-auto mt-8 max-w-[760px] rounded-[14px] bg-paper p-6 md:p-8">
        {!read ? (
          <p className="text-ink-2">Scroll to the end of the bill of sale to sign.</p>
        ) : (
          <>
            <label className="block">
              <span className="mb-2 block text-[15px] font-medium text-ink-2">Your full name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field" />
            </label>
            <p className="mb-2 mt-5 text-[15px] font-medium text-ink-2">Sign here</p>
            <canvas ref={canvas} className="h-[160px] w-full touch-none rounded-[10px] bg-stone ring-1 ring-rule" aria-label="Signature box" />
            <div className="mt-2 flex justify-end">
              <button type="button" onClick={clear} className="text-[14px] text-ink-3 underline underline-offset-2">
                Clear
              </button>
            </div>
            <button
              type="button"
              disabled={pending || !drawn || name.trim().length < 3}
              onClick={() =>
                start(async () => {
                  const r = await signDocument(token, name, canvas.current!.toDataURL("image/png"), read);
                  if (!r.ok) setError(r.error);
                  else router.refresh();
                })
              }
              className="btn btn-red mt-5 w-full disabled:opacity-40"
            >
              {pending ? "Signing" : "Sign The Bill Of Sale"}
            </button>
            {error && (
              <p role="alert" className="mt-4 rounded-[4px] bg-[#fdecec] px-4 py-3 text-[15px] text-[#9b1c1f]">
                {error}
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}
