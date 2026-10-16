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
      { source: "/portfolio", destination: "/#real", permanent: true },
      { source: "/blogs", destination: "/", permanent: false },
      { source: "/how-to-junk-a-car-in-texas", destination: "/vehicles-without-title", permanent: false },
      { source: "/junk-cars-free-towing-houston", destination: "/free-towing-service", permanent: false },
      { source: "/junk-car-towing-houston", destination: "/free-towing-service", permanent: false },
    ];
  },
};

export default nextConfig;
