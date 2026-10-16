import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource/barlow-semi-condensed/500.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { MobileDock } from "@/components/MobileDock";
import { business } from "@/data/business";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Sell Your Car For Cash Today in Houston, TX | iBuy Vehicles",
    template: `%s | ${business.name}`,
  },
  description:
    "Get an instant cash estimate for your car, truck or SUV in Houston. Running, junk, wrecked, flooded or no title. Free towing and you're paid at pickup. Since 2010.",
  openGraph: { type: "website", siteName: business.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#07080b", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: business.name,
  url: business.siteUrl,
  telephone: business.phone,
  email: business.email,
  foundingDate: String(business.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postal,
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  areaServed: "Houston, TX",
  sameAs: [business.social.facebook, business.social.x],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          {children}
          <MobileDock />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
