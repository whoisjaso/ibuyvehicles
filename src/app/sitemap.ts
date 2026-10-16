import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { services, areas } from "@/data/services";
import { allPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/offer", "/services", "/service-areas", "/contact-us", "/dealers", "/about", ...services.map((s) => `/${s.slug}`), ...areas.map((a) => `/${a.slug}`)];
  const pages: MetadataRoute.Sitemap = [...paths, "/blogs"].map((p) => ({ url: `${business.siteUrl}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p === "/offer" ? 0.9 : 0.7 }));
  const posts: MetadataRoute.Sitemap = allPosts().map((p) => ({
    url: `${business.siteUrl}/${p.slug}`,
    lastModified: p.updated ?? p.published,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
