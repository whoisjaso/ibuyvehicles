"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChatCircleText, Phone } from "@phosphor-icons/react";
import { logTouch } from "../actions";

/** Opens the pre-written text in Mark's own Messages app and logs that he sent it. Nothing is sent without his tap. */
export function TextButton({ id, kind, label, href, body, primary }: { id: string; kind: string; label: string; href: string; body?: string; primary?: boolean }) {
  const [, start] = useTransition();
  const router = useRouter();
  const log = () => {
    const f = new FormData();
    f.set("id", id);
    f.set("kind", kind);
    f.set("label", label);
    start(async () => {
      await logTouch(f);
      router.refresh();
    });
  };
  return (
    <a href={href} onClick={log} className={`group block rounded-[10px] p-4 ring-1 transition-colors ${primary ? "bg-ink text-paper ring-ink hover:bg-night-2" : "bg-paper ring-rule hover:ring-ink-3"}`}>
      <span className="flex items-center gap-2 text-[15px] font-semibold">
        {kind === "call" ? <Phone size={18} /> : <ChatCircleText size={18} />} {label}
      </span>
      {body && <span className={`mt-1.5 line-clamp-3 block text-[14px] leading-snug ${primary ? "text-white/75" : "text-ink-3"}`}>{body}</span>}
    </a>
  );
}
