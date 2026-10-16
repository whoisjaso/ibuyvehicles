import Link from "next/link";
import { notFound } from "next/navigation";
import { deskStore } from "@/lib/desk/store";
import { billOfSaleFields, type BillOfSaleFields } from "@/lib/desk/bill-of-sale";
import { BillOfSaleDoc } from "@/components/BillOfSaleDoc";
import { PrintButton } from "./PrintButton";

export const metadata = { title: "Bill Of Sale" };

/* The live filed document, or a draft preview built from the record when nothing is filed. Voided copies are listed, never removed. */
export default async function BillOfSale({ params }: { params: Promise<{ id: string }> }) {
  const store = deskStore();
  if (!store) notFound();
  const { id } = await params;
  const buy = await store.get(id);
  if (!buy) notFound();
  const docs = buy.documents.filter((d) => d.type === "bill-of-sale");
  const live = docs.find((d) => !d.voidedAt);
  return (
    <main className="min-h-svh bg-stone px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto mb-6 flex max-w-[760px] items-center justify-between print:hidden">
        <Link href={`/desk/buys/${id}?step=bill-of-sale`} className="text-[15px] text-ink-3 hover:text-ink">
          ← Back to the buy
        </Link>
        <PrintButton />
      </div>
      {live ? <BillOfSaleDoc f={live.snapshot as BillOfSaleFields} signature={live.signature} /> : <BillOfSaleDoc f={billOfSaleFields(buy).fields} draft />}
      {docs
        .filter((d) => d.voidedAt)
        .map((d) => (
          <div key={d.id} className="mt-10 print:hidden">
            <p className="mx-auto mb-3 max-w-[760px] text-[14px] text-ink-3">Voided: {d.voidReason}</p>
            <BillOfSaleDoc f={d.snapshot as BillOfSaleFields} signature={d.signature} voided />
          </div>
        ))}
    </main>
  );
}
