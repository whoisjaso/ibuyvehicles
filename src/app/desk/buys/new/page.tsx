import { Shell, Card } from "../../_ui/Shell";
import { NewBuyForm } from "./NewBuyForm";

export const metadata = { title: "New Buy" };

export default function NewBuy() {
  return (
    <Shell active="new">
      <Card className="mx-auto max-w-[560px]">
        <h1 className="t-2">Someone Called About A Car.</h1>
        <p className="mt-2 text-ink-2">Their name and number is all it takes to start. The rest comes one question at a time.</p>
        <NewBuyForm />
      </Card>
    </Shell>
  );
}
