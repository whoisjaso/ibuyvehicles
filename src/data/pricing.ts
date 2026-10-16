/*
  ESTIMATOR SETTINGS. MARK SETS THESE BEFORE LAUNCH.

  The online estimate is a starting range, never a promise: Mark confirms the
  final offer in person. These defaults are rough placeholders so the tool
  works in development. Tune them to what Mark actually pays, or set
  showDollarRange to false and the site says "Mark texts your number" instead
  of showing dollars.
*/

export const pricing = {
  /**
   * TODO(Mark): false until Mark has replaced the placeholder values below with
   * what he actually pays. Every build prints a warning while this is false.
   */
  confirmedByMark: false,
  showDollarRange: true,

  /** Floor: what a vehicle is worth as scrap, per US ton of curb weight. */
  scrapPerTon: 150,

  /** Approximate curb weight in tons, by body class. */
  weightTons: { sedan: 1.5, compact: 1.3, suv: 2.2, truck: 2.4, van: 2.2, coupe: 1.5, motorcycle: 0.25 },

  /** A clean, running, 3-year-old vehicle's cash value by class (before the factors below). */
  baseValue: { sedan: 11000, compact: 9000, suv: 15000, truck: 19000, van: 12000, coupe: 12000, motorcycle: 4000 },

  /** Value lost per year of age beyond 3 years (compounding). */
  yearlyDepreciation: 0.11,

  /** Expected miles per year; each 10,000 miles over or under moves value 3%. */
  milesPerYear: 12000,
  mileageStep: 0.03,

  drive: { drives: 1, "starts-only": 0.5, "no-start": 0.32 },
  damage: { none: 1, minor: 0.85, major: 0.55, flood: 0.3, fire: 0 },
  title: { "in-hand": 1, "not-in-name": 1, lost: 1, salvage: 0.7, dealer: 1 },
  keys: { yes: 1, no: 0.9 },

  /** Range spread around the point estimate. */
  low: 0.85,
  high: 1.12,

  /** Never show a high number below this, so even scrap feels worth a call. */
  minimumHigh: 150,
} as const;

/** Dollars show in production only after Mark confirms the numbers, or on a preview deploy that opts in. */
export const showDollars =
  pricing.showDollarRange && (pricing.confirmedByMark || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_PRICES === "1" || process.env.NODE_ENV !== "production");

export type BodyClass = keyof typeof pricing.weightTons;
export type DriveState = keyof typeof pricing.drive;
export type DamageState = keyof typeof pricing.damage;
