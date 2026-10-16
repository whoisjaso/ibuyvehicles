import Link from "next/link";
import { Car, Truck, Jeep, Van, Motorcycle, ArrowRight } from "@phosphor-icons/react/dist/ssr";

/** The configurator invitation: pick the body, the estimate opens on it. */
const bodies = [
  { body: "sedan", label: "Car", Icon: Car },
  { body: "truck", label: "Truck", Icon: Truck },
  { body: "suv", label: "SUV", Icon: Jeep },
  { body: "van", label: "Van", Icon: Van },
  { body: "motorcycle", label: "Motorcycle", Icon: Motorcycle },
];

export function BuildBand() {
  return (
    <section className="on-night bg-night py-[var(--section)] text-on-night">
      <div className="wrap grid items-end gap-12 lg:grid-cols-2">
        <div>
          <h2 className="t-1">Build Your Offer In About A Minute.</h2>
          <p className="lede mt-6">Five questions, one per screen. Use the VIN for the most accurate number. Mark confirms the final offer in person.</p>
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {bodies.map(({ body, label, Icon }) => (
            <li key={body}>
              <Link href={`/offer?body=${body}`} className="group flex h-full min-h-[120px] flex-col justify-between rounded-[4px] bg-night-2 p-5 transition-colors duration-300 hover:bg-white hover:text-ink">
                <Icon size={30} weight="light" />
                <span className="flex items-center justify-between text-[1.1rem] font-medium">
                  {label} <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/offer" className="flex h-full min-h-[120px] flex-col justify-end rounded-[4px] bg-white p-5 text-ink">
              <span className="text-[1.1rem] font-semibold">Start Now</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
