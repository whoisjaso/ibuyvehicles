const items = ["Won't Start", "No Title", "Wrecked", "Flooded", "No Keys", "Sitting For Years", "Blown Engine", "Bad Transmission", "Dealer Aged Units", "Running Great Too"];

export function Ticker() {
  const row = (
    <div className="marquee-track" aria-hidden>
      {items.map((t) => (
        <span key={t} className="display flex items-center gap-12 whitespace-nowrap text-[clamp(1.6rem,3.2vw,3rem)] text-white/90">
          {t}
          <span className="inline-block size-2.5 rotate-45 bg-red" />
        </span>
      ))}
    </div>
  );
  return (
    <section id="ticker" aria-label="Vehicles we buy" className="border-y border-white/10 bg-night py-6">
      <div className="marquee">
        {row}
        {row}
      </div>
    </section>
  );
}
