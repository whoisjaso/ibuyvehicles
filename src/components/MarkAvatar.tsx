import placed from "@/data/mark.generated.json";

/*
  Mark, the cartoon from his logo. One default pose (public/brand/mark/full.svg,
  traced from the redraw) plus any expressions dropped into public/brand/mark/
  named by mood. A mood that hasn't been drawn yet falls back to the default,
  so components can ask for "wave" or "cash" today and pick it up on the next
  build once the file exists.
*/
export type Mood = "hello" | "wave" | "thinking" | "thumbs" | "phone" | "cash" | "point" | "celebrate";

const files = placed as Partial<Record<Mood, string>>;

export const hasMood = (mood: Mood) => Boolean(files[mood]);

/** Head and shoulders in a circle. Expression files are full-body, so they're cropped to the face. */
export function MarkBust({ mood = "hello", size = 48, ring = true, className = "" }: { mood?: Mood; size?: number; ring?: boolean; className?: string }) {
  const src = files[mood];
  return (
    <span
      aria-hidden
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-night-2 ${ring ? "ring-2 ring-white/90" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src ?? "/brand/mark/bust.svg"}
        alt=""
        className={src ? "absolute left-1/2 top-[4%] w-[210%] max-w-none -translate-x-1/2" : "size-full"}
        draggable={false}
      />
    </span>
  );
}

/** Mark standing, for moments with room for him. */
export function MarkFull({ mood = "point", className = "" }: { mood?: Mood; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={files[mood] ?? "/brand/mark/full.svg"} alt="" aria-hidden className={`select-none ${className}`} draggable={false} />;
}
