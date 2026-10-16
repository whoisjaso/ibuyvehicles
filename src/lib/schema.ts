import { business, mapsHref } from "@/data/business";
import { services, areas } from "@/data/services";

/*
  Structured data, written for search engines and AI answer engines alike.
  Every node points back to one business entity (@id) so Google, Bing,
  ChatGPT, Perplexity and Gemini all resolve the same Mark, the same
  address, the same phone. Only facts from src/data/business.ts; nothing
  invented, no self-awarded star rating.
*/
const site = business.siteUrl;
export const BUSINESS_ID = `${site}/#business`;

export const businessNode = {
  "@type": ["AutomotiveBusiness", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: business.name,
  url: site,
  logo: `${site}/brand/emblem-clean.svg`,
  image: `${site}/og.jpg`,
  slogan: "Cash before the tow.",
  description: `${business.name} buys junk, wrecked, flooded, non-running and no-title cars in Houston. ${business.owner} makes the offer himself, tows free and pays on the spot, often within ${business.pickupWindow}.`,
  telephone: business.phone,
  email: business.email,
  foundingDate: String(business.since),
  founder: { "@type": "Person", name: business.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postal,
    addressCountry: "US",
  },
  hasMap: mapsHref,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: `${String(business.hours.open).padStart(2, "0")}:00`,
      closes: `${business.hours.close}:00`,
    },
  ],
  areaServed: [
    { "@type": "City", name: "Houston", containedInPlace: { "@type": "State", name: "Texas" } },
    ...areas.map((a) => ({ "@type": "Place", name: `${a.name}, Houston, TX` })),
  ],
  knowsAbout: ["Junk car buying", "Cash for cars", "Selling a car without a title in Texas", "Flood-damaged cars", "Free junk car towing", "Texas title transfer"],
  makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site}/${s.slug}` } })),
  sameAs: Object.values(business.social),
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": `${site}/#website`,
  url: site,
  name: business.name,
  publisher: { "@id": BUSINESS_ID },
  inLanguage: "en-US",
};

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site}${it.path}`,
    })),
  };
}

export function faqPage(items: { q: string; a: string }[], path = "") {
  return {
    "@type": "FAQPage",
    "@id": `${site}${path}#faq`,
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceNode(opts: { name: string; description: string; path: string; area?: string }) {
  return {
    "@type": "Service",
    "@id": `${site}${opts.path}#service`,
    name: opts.name,
    description: opts.description,
    url: `${site}${opts.path}`,
    provider: { "@id": BUSINESS_ID },
    serviceType: "Cash car buying and free towing",
    areaServed: opts.area ? { "@type": "Place", name: opts.area } : { "@type": "City", name: "Houston, TX" },
  };
}

export function articleNode(a: { title: string; description: string; path: string; published?: string; updated?: string }) {
  return {
    "@type": "Article",
    "@id": `${site}${a.path}#article`,
    headline: a.title,
    description: a.description,
    url: `${site}${a.path}`,
    mainEntityOfPage: `${site}${a.path}`,
    ...(a.published ? { datePublished: a.published } : {}),
    ...(a.updated || a.published ? { dateModified: a.updated || a.published } : {}),
    author: { "@type": "Person", name: business.owner, worksFor: { "@id": BUSINESS_ID } },
    publisher: { "@id": BUSINESS_ID },
    image: `${site}/og.jpg`,
    inLanguage: "en-US",
  };
}
