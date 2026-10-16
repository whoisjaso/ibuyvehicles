import { FacebookLogo, GoogleLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/data/business";

/* Every profile Mark has, in one place: footer, contact page, anywhere else. Add a network to business.social and it shows up. */
const NETWORKS = [
  { key: "google", label: "iBuy Vehicles on Google", Icon: GoogleLogo },
  { key: "facebook", label: "iBuy Vehicles on Facebook", Icon: FacebookLogo },
  { key: "x", label: "iBuy Vehicles on X", Icon: XLogo },
] as const;

export function SocialLinks({ tone = "night", className = "" }: { tone?: "night" | "paper"; className?: string }) {
  const style = tone === "night" ? "bg-night-2 hover:bg-white hover:text-ink" : "bg-stone hover:bg-ink hover:text-paper";
  return (
    <div className={`flex gap-2 ${className}`}>
      {NETWORKS.map(({ key, label, Icon }) => (
        <a key={key} href={business.social[key]} target="_blank" rel="noopener me" aria-label={label} title={label} className={`grid size-11 place-items-center rounded-full transition-colors ${style}`}>
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
