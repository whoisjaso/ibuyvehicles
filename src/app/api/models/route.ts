import { NextResponse } from "next/server";

/** Model names for a make and year, from NHTSA vPIC. Feeds the model picker. */
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const make = p.get("make")?.trim() ?? "";
  const year = Number(p.get("year"));
  if (!make || make.length > 40 || !(year > 1950 && year < 2100)) return NextResponse.json({ models: [] });
  try {
    const r = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`,
      { next: { revalidate: 60 * 60 * 24 * 30 }, signal: AbortSignal.timeout(8000) },
    );
    const j = await r.json();
    const models = [...new Set<string>((j.Results ?? []).map((m: { Model_Name: string }) => m.Model_Name))].sort();
    return NextResponse.json({ models });
  } catch {
    return NextResponse.json({ models: [] });
  }
}
