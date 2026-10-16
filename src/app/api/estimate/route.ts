import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { estimate, type EstimateInput } from "@/lib/estimate";
import { pricing } from "@/data/pricing";

/*
  AI review of the instant estimate. Optional: without ANTHROPIC_API_KEY the
  rules engine answers alone. Claude may only nudge the range within ±15% and
  explains, in plain words, what moves the number. Mark's in-person offer is
  always final.
*/

const Review = z.object({
  adjustment: z.number().describe("Multiplier for the rules estimate, between 0.85 and 1.15"),
  headline: z.string().describe("One short, warm sentence for the seller, under 18 words"),
  factors: z.array(z.string()).describe("Two or three things that move this vehicle's value, each under 9 words"),
});

const Input = z.object({
  year: z.number().int().min(1950).max(2100),
  make: z.string().max(40),
  model: z.string().max(60),
  body: z.enum(Object.keys(pricing.weightTons) as [keyof typeof pricing.weightTons]),
  miles: z.number().min(0).max(2_000_000).nullable().optional(),
  drive: z.enum(Object.keys(pricing.drive) as [keyof typeof pricing.drive]),
  damage: z.enum(Object.keys(pricing.damage) as [keyof typeof pricing.damage]),
  title: z.enum(["in-hand", "not-in-name", "lost", "salvage", "dealer"]),
  keys: z.enum(["yes", "no"]),
  trim: z.string().max(80).optional(),
});

const SYSTEM = `You review instant cash-offer estimates for iBuy Vehicles, a Houston cash car buyer that buys running, junk, wrecked, flooded and no-title vehicles and tows them free.
You get the vehicle, its condition and a rules-based range. Return:
- adjustment: a multiplier between 0.85 and 1.15. Raise it for models known to hold value (trucks, popular SUVs, reliable Japanese sedans) and lower it for models known for weak resale or costly failures. Use 1.0 when unsure.
- headline: one plain, encouraging sentence written to the seller. No dollar figures, no promises, no exclamation marks.
- factors: two or three short phrases naming what moves this vehicle's value.
The final offer is always made in person after inspection; never imply otherwise.`;

export async function POST(req: Request) {
  let input: z.infer<typeof Input>;
  try {
    input = Input.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const base = estimate(input as EstimateInput);

  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ ok: true, ai: false, range: base });

  try {
    const client = new Anthropic({ timeout: 15_000, maxRetries: 1 });
    const res = await client.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      output_config: { effort: "low", format: zodOutputFormat(Review) },
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: JSON.stringify({ vehicle: input, rulesRange: { low: base.low, high: base.high }, scrapFloor: base.floor }),
        },
      ],
    });
    const review = res.stop_reason === "refusal" ? null : res.parsed_output;
    if (!review) return NextResponse.json({ ok: true, ai: false, range: base });

    const f = Math.min(1.15, Math.max(0.85, review.adjustment || 1));
    const step = base.mid > 2000 ? 100 : 25;
    const r = (n: number) => Math.round(n / step) * step;
    const range = {
      ...base,
      low: Math.max(base.floor, r(base.low * f)),
      high: Math.max(pricing.minimumHigh, r(base.high * f)),
    };
    return NextResponse.json({ ok: true, ai: true, range, headline: review.headline, factors: review.factors.slice(0, 3) });
  } catch (e) {
    console.error("estimate review failed", e instanceof Anthropic.APIError ? e.status : e);
    return NextResponse.json({ ok: true, ai: false, range: base });
  }
}
