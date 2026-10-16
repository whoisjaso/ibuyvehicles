import type { BillOfSaleFields } from "@/lib/desk/bill-of-sale";
import type { BuyDocument } from "@/lib/desk/types";
import { business } from "@/data/business";

/*
  Mark's purchase bill of sale, on paper. A plain private document in the
  brand, not an official state form. Missing facts show as yellow
  [Not set] marks so nobody mistakes a draft for a finished paper.
*/
const Val = ({ v }: { v: string }) => (v.startsWith("[Not set") ? <mark className="rounded bg-[#fff1b8] px-1 text-[#7a4b00]">{v}</mark> : <>{v}</>);

export function BillOfSaleDoc({ f, signature, voided, draft }: { f: BillOfSaleFields; signature?: BuyDocument["signature"]; voided?: boolean; draft?: boolean }) {
  const rows: [string, string][] = [
    ["Year, make, model", f.vehicle],
    ["VIN", f.vin],
    ["Odometer", f.odometer],
    ["Title", f.title],
    ["Loan or lien", f.lien],
  ];
  return (
    <article className="relative mx-auto max-w-[760px] bg-white p-7 text-[15px] leading-relaxed text-[#0b1230] shadow-[0_20px_60px_-30px_rgba(10,22,64,.35)] ring-1 ring-[#d2d8e7] print:shadow-none print:ring-0 md:p-12">
      {(voided || draft) && (
        <span className="pointer-events-none absolute right-6 top-6 rotate-6 rounded border-2 border-[#d6262d] px-3 py-1 text-[13px] font-bold uppercase tracking-widest text-[#d6262d]">{voided ? "Void" : "Draft"}</span>
      )}
      <header className="flex items-center gap-3 border-b border-[#d2d8e7] pb-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/emblem-clean.svg" alt="" className="size-11" />
        <div>
          <p className="text-[1.25rem] font-semibold leading-tight">Bill Of Sale</p>
          <p className="text-[13px] text-[#5f6783]">Motor vehicle purchase · {f.date}</p>
        </div>
      </header>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#5f6783]">Seller</p>
          <p className="mt-1 font-semibold">
            <Val v={f.sellerName} />
          </p>
          <p>
            <Val v={f.sellerAddress} />
          </p>
          <p className="text-[13px] text-[#5f6783]">
            <Val v={f.sellerId} />
          </p>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#5f6783]">Buyer</p>
          <p className="mt-1 font-semibold">
            <Val v={f.buyerName} />
          </p>
          <p className="text-[13px] text-[#5f6783]">Doing business as {business.name}</p>
          <p>{f.buyerAddress}</p>
        </div>
      </section>

      <section className="mt-7">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#5f6783]">Vehicle</p>
        <dl className="mt-2 divide-y divide-[#e1e6f2] border-y border-[#e1e6f2]">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[160px_1fr] gap-3 py-2">
              <dt className="text-[#5f6783]">{k}</dt>
              <dd>
                <Val v={v} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-7 rounded-[10px] bg-[#eef1f8] p-5">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#5f6783]">Price paid</p>
        <p className="mt-1 text-[1.8rem] font-semibold tabular-nums leading-tight">
          <Val v={f.price} />
        </p>
      </section>

      <section className="mt-7 space-y-3 text-[14px]">
        <p>The Seller sells and transfers the vehicle described above to the Buyer for the price paid, and the Seller has received that amount in full.</p>
        <p>The Seller states that they own this vehicle or are authorized to sell it, and that it carries no loan or lien other than any shown above.</p>
        <p>The Seller states that the odometer reading above is what the vehicle shows today. The Buyer buys the vehicle as it is.</p>
        <p>The Seller will remove their license plates and toll tag, and file a Vehicle Transfer Notification (VTR-346) with the Texas Department of Motor Vehicles within 30 days.</p>
      </section>

      <section className="mt-9 grid gap-8 sm:grid-cols-2">
        <div>
          <div className="flex h-20 items-end border-b border-[#0b1230]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {signature && <img src={signature.image} alt={`Signature of ${signature.name}`} className="max-h-[72px]" />}
          </div>
          <p className="mt-1.5 text-[13px] text-[#5f6783]">
            Seller{signature ? `: ${signature.name}, signed ${new Date(signature.at).toLocaleString("en-US", { timeZone: business.timeZone, dateStyle: "medium", timeStyle: "short" })}` : ""}
          </p>
        </div>
        <div>
          <div className="h-20 border-b border-[#0b1230]" />
          <p className="mt-1.5 text-[13px] text-[#5f6783]">
            Buyer: <Val v={f.buyerSigner} />, for {business.name}
          </p>
        </div>
      </section>
    </article>
  );
}
