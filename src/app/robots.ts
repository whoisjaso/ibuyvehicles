import type { MetadataRoute } from "next";
import { business } from "@/data/business";

// Search engines and AI answer engines are all welcome: being the answer
// ChatGPT, Perplexity, Gemini or Google's AI Overview gives for "sell my
// junk car Houston" is the point. Only the API is off limits.
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }, ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" }))],
    sitemap: `${business.siteUrl}/sitemap.xml`,
    host: business.siteUrl,
  };
}
