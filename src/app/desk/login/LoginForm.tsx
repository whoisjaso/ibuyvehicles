"use client";

import { useActionState } from "react";
import { signIn, type ActionResult } from "../actions";

export function LoginForm({ next }: { next: string }) {
  const [state, act, pending] = useActionState<ActionResult | null, FormData>(signIn, null);
  return (
    <form action={act} className="mt-8 grid gap-3">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-2 block text-[15px] font-medium text-ink-2">Passcode</span>
        <input name="passcode" type="password" autoComplete="current-password" required autoFocus className="field" />
      </label>
      <button className="btn btn-ink mt-2" disabled={pending}>
        {pending ? "Checking" : "Sign In"}
      </button>
      {state && !state.ok && (
        <p role="alert" className="rounded-[4px] bg-[#fdecec] px-4 py-3 text-[15px] text-[#9b1c1f]">
          {state.error}
        </p>
      )}
    </form>
  );
}
