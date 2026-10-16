"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-ink !min-h-11">
      Print Or Save PDF
    </button>
  );
}
