import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/*
  Mark's articles, ported from the old site with their exact URLs
  (content/posts/<slug>.md). Read at build time; every article is a static
  page. Frontmatter carries the answer-first summary and the FAQ that become
  structured data for search and AI answer engines.
*/
export type Category = "titles" | "selling" | "towing" | "flood" | "value" | "guides";

export type Post = {
  slug: string;
  title: string;
  description: string;
  published?: string;
  updated?: string;
  answer?: string;
  category: Category;
  faq: { q: string; a: string }[];
  html: string;
  minutes: number;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  titles: "Titles And Paperwork",
  selling: "Selling Your Car",
  value: "What It's Worth",
  towing: "Towing",
  flood: "Flood Cars",
  guides: "Guides",
};

const DIR = path.join(process.cwd(), "content/posts");

const clean = (s: string) => s.replace(/\s*[–—]\s*/g, ", ");

function load(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const words = content.split(/\s+/).length;
  return {
    slug: String(data.slug ?? file.replace(/\.md$/, "")),
    title: clean(String(data.title)),
    description: clean(String(data.description ?? "")),
    published: data.published ? String(data.published) : undefined,
    updated: data.updated ? String(data.updated) : undefined,
    answer: data.answer ? clean(String(data.answer)) : undefined,
    category: (data.category as Category) ?? "guides",
    faq: Array.isArray(data.faq) ? data.faq.map((f: { q: string; a: string }) => ({ q: clean(String(f.q)), a: clean(String(f.a)) })) : [],
    // The article's own H1 is the page title, so body headings start at h2.
    html: marked.parse(clean(content).replace(/^# .*$/m, ""), { async: false }) as string,
    minutes: Math.max(2, Math.round(words / 230)),
  };
}

let cache: Post[] | null = null;

export function allPosts(): Post[] {
  if (!cache) {
    cache = fs.existsSync(DIR)
      ? fs
          .readdirSync(DIR)
          .filter((f) => f.endsWith(".md"))
          .map(load)
          .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""))
      : [];
  }
  return cache;
}

export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);

export function related(post: Post, n = 3) {
  const same = allPosts().filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = allPosts().filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, n);
}
