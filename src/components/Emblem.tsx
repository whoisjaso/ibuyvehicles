/*
  iBuy Vehicles emblem, redrawn as precise vector geometry from the original
  (public/brand/original-logo.png): a red and blue tapered swirl around a white
  ring, a deep blue disc, and a car seen head-on. Pending Mark's approval.
  Crescents are an outer circle minus an offset inner circle, so the stroke
  tapers like the original's swoosh.
*/
let uid = 0;

export function Emblem({ size = 40, className = "", spin = false }: { size?: number; className?: string; spin?: boolean }) {
  const id = `em${uid++}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label="iBuy Vehicles emblem">
      <defs>
        <clipPath id={`${id}-a`}>
          <path d="M-10 -10H130L-10 130Z" transform="rotate(-8 60 60)" />
        </clipPath>
        <clipPath id={`${id}-b`}>
          <path d="M130 130H-10L130 -10Z" transform="rotate(-8 60 60)" />
        </clipPath>
        <radialGradient id={`${id}-d`} cx="45%" cy="38%" r="70%">
          <stop offset="0" stopColor="#2f5fe0" />
          <stop offset="1" stopColor="#14318f" />
        </radialGradient>
      </defs>
      <g className={spin ? "emblem-spin" : undefined}>
        <path clipPath={`url(#${id}-a)`} fillRule="evenodd" fill="#d6262d" d="M60 3a57 57 0 1 0 0 114A57 57 0 1 0 60 3ZM65 17a48 48 0 1 1 0 96a48 48 0 1 1 0-96Z" />
        <path clipPath={`url(#${id}-b)`} fillRule="evenodd" fill="#1f48c9" d="M60 3a57 57 0 1 0 0 114A57 57 0 1 0 60 3ZM55 7a48 48 0 1 1 0 96a48 48 0 1 1 0-96Z" />
      </g>
      <circle cx="60" cy="60" r="44" fill="#fff" />
      <circle cx="60" cy="60" r="39.5" fill={`url(#${id}-d)`} />
      <path
        fill="#fff"
        d="M42 72v-8.5l4.4-9.9c1-2.2 3.2-3.6 5.6-3.6h16c2.4 0 4.6 1.4 5.6 3.6l4.4 9.9V72c0 1.4-1.1 2.5-2.5 2.5h-3c-1.4 0-2.5-1.1-2.5-2.5v-1.5H50V72c0 1.4-1.1 2.5-2.5 2.5h-3c-1.4 0-2.5-1.1-2.5-2.5Z"
      />
      <path fill="#1d42b8" d="M48.6 61.5l2.8-6.2c.4-.8 1.2-1.3 2.1-1.3h13c.9 0 1.7.5 2.1 1.3l2.8 6.2Z" />
      <circle cx="49" cy="65.6" r="2.2" fill="#1d42b8" />
      <circle cx="71" cy="65.6" r="2.2" fill="#1d42b8" />
      <rect x="55" y="64.6" width="10" height="2" rx="1" fill="#1d42b8" />
    </svg>
  );
}

/** Wordmark: the emblem is the only colour; the name is set quietly beside it. */
export function Wordmark({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap ${className}`}>
      <Emblem size={34} className="size-8 md:size-[34px]" />
      <span className={`text-[1.06rem] font-semibold uppercase tracking-[0.24em] ${inverse ? "text-white" : "text-ink"}`}>iBuy Vehicles</span>
    </span>
  );
}
