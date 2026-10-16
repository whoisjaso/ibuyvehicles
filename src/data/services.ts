/*
  Services and service areas. Slugs match the old WordPress URLs so search
  rankings carry over. Copy is rewritten from Mark's own pages; no new claims.
*/

export type Service = {
  slug: string;
  title: string;
  short: string;
  lede: string;
  points: string[];
  faq: { q: string; a: string }[];
  preset: Partial<Record<"drive" | "title" | "damage", string>>;
  photo: string;
};

export const services: Service[] = [
  {
    slug: "cash-for-junk-cars",
    title: "Cash For Junk Cars",
    short: "Old, dead or done. It still has value.",
    lede: "Your old car may not run anymore, but it still has value. Any make, any model, any condition: you get a fair cash offer and a free tow.",
    points: ["Any make, model or condition", "Free towing anywhere in Houston", "Paid at pickup, before it's towed", "We handle the paperwork"],
    faq: [
      { q: "What types of vehicles do you buy?", a: "Cars, trucks, SUVs, motorcycles, RVs and even boats. Running or not, Mark makes a fair cash offer." },
      { q: "Do I have to pay for the tow?", a: "No. Towing is free anywhere in Houston." },
    ],
    preset: { drive: "no-start" },
    photo: "/photos/real-tow.webp",
  },
  {
    slug: "vehicles-without-title",
    title: "Vehicles Without Title",
    short: "Lost the title? You can still sell it.",
    lede: "Losing a title is common and it doesn't have to stop the sale. With a valid photo ID and proof of ownership like registration, Mark walks you through the rest and handles the verification.",
    points: ["Valid photo ID", "Registration or insurance in your name", "Mark handles the verification", "No trip to the tax office first"],
    faq: [
      { q: "Can I really sell my car without a title?", a: "Yes. As long as you can prove ownership with documents like registration or insurance papers, Mark guides you through the process." },
      { q: "Will I get less money without a title?", a: "No. Offers are based on the car's condition and value, not just the paperwork." },
    ],
    preset: { title: "lost" },
    photo: "/photos/real-impala.webp",
  },
  {
    slug: "non-running-vehicle-removal",
    title: "Non-Running Vehicle Removal",
    short: "Won't start? Doesn't matter.",
    lede: "Cars that no longer start are hard to sell to a private buyer. Mark buys non-running vehicles of every type and removes them free, so you get paid without the stress.",
    points: ["No jump, no repair needed", "Free removal", "Flat tires and missing keys are fine", "Paid on the spot"],
    faq: [{ q: "It hasn't moved in years. Will you still take it?", a: "Yes. One reviewer's car had been sitting over two years with no title and no key, and it was towed the same day." }],
    preset: { drive: "no-start" },
    photo: "/photos/real-tow.webp",
  },
  {
    slug: "same-day-car-pickup-payment",
    title: "Same-Day Pickup & Payment",
    short: "Call today. Cash today.",
    lede: "From the first call to payment in hours, not weeks. In most of Houston the truck can be at your door within two to four hours, and you're paid at pickup.",
    points: ["Pickup often within 2 to 4 hours", "Paid before it's towed", "Open 7 days a week", "No extra fee for same-day"],
    faq: [
      { q: "Do I get paid before or after towing?", a: "Before. You're paid at pickup." },
      { q: "Is weekend service available?", a: "Yes, 7 days a week, 8 AM to 10 PM." },
    ],
    preset: {},
    photo: "/photos/real-charger.webp",
  },
  {
    slug: "damaged-wrecked-car-purchase",
    title: "Damaged & Wrecked Cars",
    short: "Wrecked, crushed, cracked glass.",
    lede: "Accident damage, a cracked windshield, a crushed corner: Mark buys wrecked vehicles as they sit, so you don't sink money into a repair you'll never get back.",
    points: ["As-is, no repairs", "Airbags out is fine", "Free tow from wherever it sits", "Fair offer, no haggling"],
    faq: [{ q: "Do I need to fix anything first?", a: "No. Sell it exactly as it is." }],
    preset: { damage: "major" },
    photo: "/photos/real-jeep.webp",
  },
  {
    slug: "flood-damaged-car-purchase",
    title: "Flood-Damaged Cars",
    short: "Water got in. Get it out of your driveway.",
    lede: "Houston floods. When water gets into a car, most buyers walk away. Mark buys flood-damaged vehicles and tows them for free.",
    points: ["Any water level", "Running or not", "Free towing", "Paid on pickup"],
    faq: [{ q: "Will you buy a car that was underwater?", a: "Yes. Tell Mark how high the water got and he'll make an offer." }],
    preset: { damage: "flood" },
    photo: "/photos/real-impala.webp",
  },
  {
    slug: "free-towing-service",
    title: "Free Towing",
    short: "We come to it. You don't pay for it.",
    lede: "Wherever the car sits in Houston (driveway, apartment lot, street, shop), the tow is on Mark, never on you.",
    points: ["$0 tow anywhere in Houston", "Driveways, lots, shops, streets", "Flat tires are fine", "Same-day in most cases"],
    faq: [{ q: "Is there a hidden fee?", a: "No. Towing is free and same-day pickup is standard." }],
    preset: {},
    photo: "/photos/real-tow.webp",
  },
];

// PUBLIC: the eight neighborhoods listed on ibuyvehicles.com.
export const areas = [
  { slug: "downtown-houston", name: "Downtown" },
  { slug: "the-heights-houston", name: "The Heights" },
  { slug: "midtown-houston", name: "Midtown" },
  { slug: "museum-district-houston", name: "Museum District" },
  { slug: "river-oaks-houston", name: "River Oaks" },
  { slug: "galleria-uptown-houston", name: "Galleria / Uptown" },
  { slug: "medical-center-houston", name: "Medical Center" },
  { slug: "montrose-houston", name: "Montrose" },
] as const;

export const faqs = [
  { q: "Will the price change when the truck shows up?", a: "Mark makes the final offer himself after a quick look, before anything is loaded. Tell him up front about anything missing or replaced, like the catalytic converter, and there is nothing left to surprise anyone at the curb. You never have to sell." },
  { q: "Cash or check? Paid before or after it's loaded?", a: "You are paid on the spot, before the car is towed. No waiting on a check, no money days later." },
  { q: "What if there's still a loan on it?", a: "Tell Mark when you send the car. He will tell you exactly what's needed before he drives out, so nothing stalls on pickup day." },
  { q: "Who stops the toll bills after I sell?", a: "Take your plates and toll tag off, and file a Vehicle Transfer Notification with TxDMV within 30 days. It protects you from the next owner's tolls and tickets. Mark can show you how." },
  { q: "What types of vehicles do you buy?", a: "Cars, trucks, SUVs, motorcycles, RVs and even boats. Running or not, you get a fair cash offer." },
  { q: "Do I need a title to sell my car?", a: "Not always. Mark can work with you if you've lost the title, as long as you can show proof of ownership and a valid ID." },
  { q: "Is the online number my final offer?", a: "It's a fast estimate to show you where you stand. Mark confirms the final offer after a quick look at the vehicle and its VIN. No pressure and no obligation." },
  { q: "Does the tow cost anything?", a: "No. Towing is free anywhere in Houston." },
  { q: "What hours are you open?", a: "Every day, 8 AM to 10 PM." },
];
