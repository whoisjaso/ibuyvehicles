import type { Metadata } from "next";
import { deskStore } from "@/lib/desk/store";
import type { BillOfSaleFields } from "@/lib/desk/bill-of-sale";
import { BillOfSaleDoc } from "@/components/BillOfSaleDoc";
import { Emblem } from "@/components/Emblem";
import { SignPad } from "./SignPad";
import { business } from "@/data/business";

export const metadata: Metadata = { title: "Sign Your Bill Of Sale", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Sign({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const store = deskStore();
  const hit = store && /^[A-Za-z0-9_-]{20,64}$/.test(token) ? await store.findBySignToken(token) : null;
  return (
    <main className="min-h-svh bg-stone px-4 pb-24 pt-6">
      <div className="mx-auto mb-6 flex max-w-[760px] items-center gap-2.5 font-semibold">
        <Emblem size={30} className="size-[30px]" /> {business.name}
      </div>
      {!hit ? (
        <div className="mx-auto max-w-[760px] rounded-[14px] bg-paper p-7">
          <h1 className="t-2">This link isn&apos;t valid.</h1>
          <p className="mt-2 text-ink-2">It may have been replaced with a new one. Call or text {business.owner} at {business.phoneDisplay}.</p>
        </div>
      ) : hit.doc.signature ? (
        <div className="mx-auto max-w-[760px]">
          <div className="mb-6 rounded-[14px] bg-paper p-7">
            <h1 className="t-2">Signed. Thank you.</h1>
            <p className="mt-2 text-ink-2">You&apos;re paid before the car is towed. Keep this page if you want a copy.</p>
          </div>
          <BillOfSaleDoc f={hit.doc.snapshot as BillOfSaleFields} signature={hit.doc.signature} />
        </div>
      ) : (
        <div className="mx-auto max-w-[760px]">
          <h1 className="t-2 mb-2">Your Bill Of Sale</h1>
          <p className="mb-6 text-ink-2">Read it through. The signature box opens at the end.</p>
          <SignPad token={token}>
            <BillOfSaleDoc f={hit.doc.snapshot as BillOfSaleFields} />
          </SignPad>
        </div>
      )}
    </main>
  );
}
