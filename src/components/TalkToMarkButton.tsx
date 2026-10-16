"use client";

import { MarkBust } from "./MarkAvatar";
import { openMarkChat } from "./MarkChat";

export function TalkToMarkButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => openMarkChat()} className={`btn btn-outline gap-3 !pl-2 ${className}`}>
      <MarkBust size={40} ring={false} /> Talk To Mark
    </button>
  );
}
