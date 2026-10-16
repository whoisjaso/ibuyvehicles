/*
  Every business fact the site prints lives here, with its source.
  PUBLIC = read from ibuyvehicles.com on 2026-10-16 (pending Mark's confirmation).
  null = not known yet. The site hides a null field instead of guessing.
*/

export const business = {
  name: "iBuy Vehicles", // PUBLIC: logo wordmark
  owner: "Mark", // PUBLIC: Google reviews name Mark as the buyer
  tagline: "Get paid top dollar today!", // PUBLIC: logo lockup
  city: "Houston",
  state: "TX",
  address: {
    street: "8150 W Little York Rd", // PUBLIC: contact section
    locality: "Houston",
    region: "TX",
    postal: "77040",
  },
  phone: "+12818400452", // PUBLIC
  phoneDisplay: "(281) 840-0452", // PUBLIC
  email: "mark@ibuyvehicles.com", // PUBLIC
  hours: { open: 8, close: 22, days: "Every Day", label: "Every day, 8 AM to 10 PM" }, // PUBLIC: "Mon - Sun : 8 AM–10 PM"
  timeZone: "America/Chicago",
  since: 2010, // PUBLIC: "Serving Houston and surrounding areas since 2010"
  googleReviews: 252, // PUBLIC: Trustindex widget, "252 Google reviews"
  googleRating: null as number | null, // not published on the site; ask Mark
  pickupWindow: "2 to 4 hours", // PUBLIC: same-day page, "we can often arrive at your door within two to four hours"
  social: {
    facebook: "https://www.facebook.com/Ibuyvehicleshouston/", // PUBLIC
    x: "https://x.com/ibuyvehicles", // PUBLIC
  },
  siteUrl: "https://ibuyvehicles.com",
  legalName: null as string | null, // ask Mark
} as const;

export const yearsInBusiness = () => new Date().getFullYear() - business.since;

export const telHref = `tel:${business.phone}`;
export const smsHref = (body?: string) =>
  `sms:${business.phone}${body ? `?&body=${encodeURIComponent(body)}` : ""}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postal}`,
)}`;

/** Open right now in Houston? Uses the business time zone, not the visitor's. */
export function isOpenNow(date = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: business.timeZone }).format(date),
  );
  return hour >= business.hours.open && hour < business.hours.close;
}
