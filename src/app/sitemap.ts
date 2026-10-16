import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { services, areas } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/offer", "/dealers", "/about", ...services.map((s) => `/${s.slug}`), ...areas.map((a) => `/${a.slug}`)];
  return paths.map((p) => ({ url: `${business.siteUrl}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p === "/offer" ? 0.9 : 0.7 }));
}
