/*
  The iBuy Vehicles emblem: Mark's mark (red and blue swoosh, white ring,
  blue disc, white car), redrawn clean so it stays sharp from favicon to
  billboard (public/brand/emblem-clean.svg). The faithful replica of the old
  raster logo is kept in public/brand/emblem-original.svg.
*/
export function Emblem({ size = 40, className = "" }: { size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/emblem-clean.svg" alt="" aria-hidden width={size} height={size} className={className} />;
}

/** "iBuy Vehicles" in proper case, the i's dot in the emblem's red, as on Mark's original logo. */
export function Wordmark({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap ${className}`}>
      <Emblem size={34} className="size-[30px] md:size-[34px]" />
      <span className={`text-[1.2rem] font-semibold tracking-[-0.012em] md:text-[1.3rem] ${inverse ? "text-white" : "text-ink"}`}>
        <span className="relative inline-block">
          {/* The red dot: the same i twice, clipped to its dot and to its stem. */}
          <span aria-hidden className="absolute inset-0 text-emblem-red [clip-path:inset(0_0_64%_0)]">i</span>
          <span className="[clip-path:inset(36%_0_0_0)]">i</span>
        </span>
        Buy Vehicles
      </span>
    </span>
  );
}
