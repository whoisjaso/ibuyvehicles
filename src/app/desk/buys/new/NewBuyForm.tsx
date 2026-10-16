"use client";

import { useActionState } from "react";
import { createFromCall, type ActionResult } from "../../actions";

export function NewBuyForm() {
  const [state, act, pending] = useActionState<ActionResult | null, FormData>(createFromCall, null);
  return (
    <form action={act} className="mt-7 grid gap-4">
      <label className="block">
        <span className="mb-2 block text-[15px] font-medium text-ink-2">Their name</span>
        <input name="name" autoComplete="off" required className="field" />
      </label>
      <label className="block">
        <span className="mb-2 block text-[15px] font-medium text-ink-2">Their phone</span>
        <input name="phone" inputMode="tel" autoComplete="off" required className="field" />
      </label>
      <fieldset>
        <legend className="mb-2 text-[15px] font-medium text-ink-2">They reached you by</legend>
        <div className="flex gap-2">
          {[["call", "Phone call"], ["text", "Text"]].map(([v, l]) => (
            <label key={v} className="flex cursor-pointer items-center rounded-full px-4 py-2.5 text-[15px] ring-1 ring-rule has-[:checked]:bg-ink has-[:checked]:text-paper">
              <input type="radio" name="channel" value={v} defaultChecked={v === "call"} className="sr-only" /> {l}
            </label>
          ))}
        </div>
      </fieldset>
      <button className="btn btn-red mt-2" disabled={pending}>
        {pending ? "Starting" : "Start The Buy"}
      </button>
      {state && !state.ok && (
        <p role="alert" className="rounded-[4px] bg-[#fdecec] px-4 py-3 text-[15px] text-[#9b1c1f]">
          {state.error}
        </p>
      )}
    </form>
  );
}
