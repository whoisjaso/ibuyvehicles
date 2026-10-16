"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "../actions";

/** A form whose submit is a server action; shows the action's error in plain words and refreshes on success. */
export function ActionForm({
  action,
  children,
  className = "",
  hidden = {},
  onDone,
}: {
  action: (form: FormData) => Promise<ActionResult>;
  children: React.ReactNode;
  className?: string;
  hidden?: Record<string, string | number>;
  onDone?: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // The button that submitted carries the answer (one-tap choices).
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        if (submitter?.name) data.set(submitter.name, submitter.value);
        start(async () => {
          const r = await action(data);
          if (r && !r.ok) setError(r.error);
          else {
            setError(null);
            onDone?.();
            router.refresh();
          }
        });
      }}
    >
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <fieldset disabled={pending} className="contents">
        {children}
      </fieldset>
      {error && (
        <p role="alert" className="mt-4 rounded-[4px] bg-[#fdecec] px-4 py-3 text-[15px] text-[#9b1c1f]">
          {error}
        </p>
      )}
    </form>
  );
}

/** One big tap target per answer: the answer is the submit. */
export function Choice({ name, value, label, sub, pressed }: { name: string; value: string; label: string; sub?: string; pressed?: boolean }) {
  return (
    <button type="submit" name={name} value={value} aria-pressed={pressed} className="option justify-between">
      <span>
        <span className="block text-[1.06rem] font-semibold">{label}</span>
        {sub && <span className="mt-0.5 block text-[14px] text-ink-3">{sub}</span>}
      </span>
    </button>
  );
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[15px] font-medium text-ink-2">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[13px] text-ink-3">{hint}</span>}
    </label>
  );
}
