import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header solid />
      <main className="wrap grid min-h-[100svh] place-content-center text-center">
        <p className="eyebrow text-red">404</p>
        <h1 className="display display-lg mt-4">Wrong Turn.</h1>
        <p className="lede mt-4 text-ink-2">That page is gone, but your car can be too.</p>
        <Link href="/offer" className="btn btn-cash mx-auto mt-8">
          Get My Cash Offer
        </Link>
      </main>
    </>
  );
}
