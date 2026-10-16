import { Emblem } from "@/components/Emblem";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign In" };

export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <main className="grid min-h-svh place-items-center bg-stone px-4">
      <div className="w-full max-w-[400px] rounded-[16px] bg-paper p-7 shadow-[0_30px_80px_-40px_rgba(10,22,64,.45)] md:p-9">
        <Emblem size={44} className="size-11" />
        <h1 className="t-2 mt-6">Mark&apos;s Desk</h1>
        <p className="mt-2 text-ink-2">Every car, from the first message to the money.</p>
        <LoginForm next={next ?? ""} />
      </div>
    </main>
  );
}
