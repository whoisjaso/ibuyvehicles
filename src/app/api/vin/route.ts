import { NextResponse } from "next/server";
import { bodyFromVpic } from "@/lib/estimate";

/*
  Free public data from NHTSA: VIN decode (vPIC) plus open safety recalls.
  No key needed. A full title/accident history is pulled by Mark at inspection.
*/

const VIN = /^[A-HJ-NPR-Z0-9]{17}$/;

export async function GET(req: Request) {
  const vin = new URL(req.url).searchParams.get("vin")?.trim().toUpperCase() ?? "";
  if (!VIN.test(vin)) return NextResponse.json({ ok: false, error: "invalid_vin" }, { status: 422 });

  try {
    const r = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`, {
      next: { revalidate: 60 * 60 * 24 * 30 },
      signal: AbortSignal.timeout(8000),
    });
    const d = (await r.json()).Results?.[0] ?? {};
    const year = Number(d.ModelYear) || null;
    if (!d.Make || !year) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

    const vehicle = {
      vin,
      year,
      make: titleCase(d.Make),
      model: d.Model || "",
      trim: d.Trim || d.Series || "",
      bodyClass: d.BodyClass || "",
      body: bodyFromVpic(d.BodyClass, d.VehicleType),
      engine: [d.DisplacementL && `${Number(d.DisplacementL).toFixed(1)}L`, d.EngineCylinders && `${d.EngineCylinders}-cyl`, d.FuelTypePrimary]
        .filter(Boolean)
        .join(" · "),
      drive: d.DriveType || "",
      plant: [d.PlantCity, d.PlantCountry].filter(Boolean).map(titleCase).join(", "),
    };

    let recalls: { component: string; summary: string; date: string }[] = [];
    try {
      const rr = await fetch(
        `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(d.Make)}&model=${encodeURIComponent(d.Model ?? "")}&modelYear=${year}`,
        { next: { revalidate: 60 * 60 * 24 }, signal: AbortSignal.timeout(6000) },
      );
      const rj = await rr.json();
      recalls = (rj.results ?? []).slice(0, 6).map((x: Record<string, string>) => ({
        component: titleCase(x.Component ?? ""),
        summary: (x.Summary ?? "").slice(0, 240),
        date: x.ReportReceivedDate ?? "",
      }));
    } catch {
      // Recalls are a bonus; the decode still stands.
    }

    return NextResponse.json({ ok: true, vehicle, recalls });
  } catch {
    return NextResponse.json({ ok: false, error: "lookup_failed" }, { status: 502 });
  }
}

function titleCase(s: string) {
  return s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
}
