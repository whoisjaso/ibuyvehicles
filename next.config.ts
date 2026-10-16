import type { NextConfig } from "next";
import { pricing } from "./src/data/pricing";

if (!pricing.confirmedByMark) {
  console.warn("\n[iBuy Vehicles] Estimator prices in src/data/pricing.ts are PLACEHOLDERS. Mark must set them (then confirmedByMark: true) before launch.\n");
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [90],
  },
  // Old WordPress URLs keep their search rankings.
  async redirects() {
    return [
      { source: "/sell-now", destination: "/offer", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/portfolio", destination: "/about", permanent: true },
      { source: "/sell-flood-damaged-car-houston-2", destination: "/sell-flood-damaged-car-houston", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
    ];
  },
};

export default nextConfig;
