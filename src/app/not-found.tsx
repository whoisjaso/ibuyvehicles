import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header solid />
      <main className="wrap grid min-h-[100svh] content-center">
        <h1 className="vinyl vinyl-xl">Wrong Turn.</h1>
        <p className="lede mt-6">That page is gone. Your car can be too.</p>
        <Link href="/offer" className="decal decal-red mt-9 self-start justify-self-start">
          Get My Offer
        </Link>
      </main>
    </>
  );
}
