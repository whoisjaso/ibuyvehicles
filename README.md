# iBuy Vehicles

The new ibuyvehicles.com: Houston's cash car buyer (Mark), rebuilt as a fast, animated, phone-first site with an instant offer estimator.

## What's here

| Route | What it does |
|---|---|
| `/` | Porsche-grade monochrome: one full-bleed studio photograph and "Cash Before The Tow."; the swipeable range of problem cars (each opens the estimator preset); a quiet statement with the facts; "One Evening, Start To Finish" (sticky clock beside three tall photographs); title router; build-your-offer band; Google reviews; Mark; offer and dealer tiles; FAQ; finale photograph |
| `/offer` | The instant offer: VIN lookup (NHTSA decode + open recalls) or year/make/model, then one question per screen, the estimate, and "Lock it in with Mark". Presets via `?body= &drive= &damage= &title= &situation=` |
| `/dealers` | Aged inventory, direct to Mark |
| `/about` | Story, numbers, Mark, reviews |
| `/<service>` and `/<area>` | The old WordPress URLs (`/cash-for-junk-cars`, `/river-oaks-houston`, …), so search rankings carry over. Other old URLs redirect in `next.config.ts` |

Every lead carries a `titleRoute` (`in-hand`, `not-in-name`, `lost`, `salvage`, `dealer`), the vehicle, the estimate and UTM data, ready for the sale desk.

## Before launch: Mark sets these

1. **`src/data/pricing.ts`: the estimator's numbers.** The defaults are placeholders, and every build prints a warning until `confirmedByMark` is `true`. Set the scrap price per ton and the base values to what Mark really pays, or set `showDollarRange: false` and the site says "Mark texts your number" instead of showing dollars.
2. **`src/data/business.ts`**: confirm the address, hours, phone, pickup window and review count (all copied from the old site), and add the Google rating and legal name.
3. **Lead delivery** (`.env.example`): `LEAD_WEBHOOK_URL` (n8n, Zapier, CRM, the future desk) or `RESEND_API_KEY` + `LEAD_TO_EMAIL`. With neither set, leads only print to the server log.
4. **Optional AI review**: set `ANTHROPIC_API_KEY` and Claude adjusts the range within ±15% and explains what moves the number. Without it, the rules engine answers alone. If Claude declines or fails, the rules range stands.
5. **The emblem** in `src/components/Emblem.tsx` is a vector redraw of the original logo (`public/brand/original-logo.png`). Mark should approve it.
6. **Images**: every slot has a code (A01 to R04). Prompts, reference images and the status table are in `docs/ASSET-BRIEF.md`. Place a delivered image by setting its `src` in `src/data/media.ts`.

## Design

The visual system is recorded in `DESIGN.md`; product truth lives in `PRODUCT.md`. The direction contract is the HTML comment at the top of `<body>` (`src/app/layout.tsx`).

## Develop

```bash
npm install
npm run dev
```

`npm run build` must pass before deploying. Deploys to Vercel with zero config.

## Facts

Every fact the site prints lives in `src/data/business.ts`, `reviews.ts` and `services.ts`, with its source. Nothing is invented: unknown values are `null` and hidden. The reviews are verbatim Google reviews from the old site.
