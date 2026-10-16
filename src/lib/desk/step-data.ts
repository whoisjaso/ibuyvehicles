import type { StepData } from "./types";

/*
  The one way step data gets written: merge only the keys the writer owns,
  and only if nobody else wrote since the caller read (compare and swap on
  `version`). Two tabs, or Mark and a helper on the same buy, can never
  silently overwrite each other's answers.
*/
export type MergeResult = { ok: true; stepData: StepData; version: number } | { ok: false; error: "conflict" };

export function mergeStepData(current: StepData, currentVersion: number, readVersion: number, patch: Partial<StepData>): MergeResult {
  if (readVersion !== currentVersion) return { ok: false, error: "conflict" };
  const next: StepData = { ...current };
  for (const [k, v] of Object.entries(patch) as [keyof StepData, StepData[keyof StepData]][]) {
    if (v === undefined) delete next[k];
    else (next as Record<string, unknown>)[k] = v;
  }
  return { ok: true, stepData: next, version: currentVersion + 1 };
}
