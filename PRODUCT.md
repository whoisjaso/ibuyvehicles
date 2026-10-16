# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: a private seller in Houston with a car that has become a problem: junk, won't start, wrecked, flooded, sitting for months, title lost or not in their name. They need cash this week (rent, a bill) and want the car gone. Non-technical, on a phone, often stressed, sometimes Spanish-first. Secondary: people holding another buyer's offer who want a second look; dealers with aged units on the lot.

## Product Purpose
iBuy Vehicles (owner Mark) buys vehicles for cash in any condition, tows them free, and pays the seller at pickup before the tow. The site turns a stressed visitor into a call, a text, or a completed instant-offer request in under a minute. Success: a lead in Mark's hands with the vehicle, its title situation, and the seller's number.

## Positioning
Fastest honest cash, from a real person. Mark gives the final number himself after a quick look, pays before the car is hooked up, and is often there within 2 to 4 hours. No title, no keys, no start are not deal-breakers. Since 2010.

## Operating Context
Visitors arrive from Google search, Facebook and paid ads, mostly on phones, often outdoors or at night. Mark works from 8150 W Little York Rd, Houston, 7 days, 8 AM to 10 PM, and handles leads by phone and text. The instant estimate is a starting range only; Mark's in-person offer is final. Every lead carries a title-route code for the future buy-side sale desk (Handle A Sale).

## Capabilities and Constraints
- Instant offer flow at /offer: VIN decode and open recalls (NHTSA), or year/make/model; one question per screen; rules range plus optional bounded AI review; lead capture; text-photos-to-Mark handoff.
- Estimator dollar values are placeholders until Mark sets them (src/data/pricing.ts); a no-dollar mode exists.
- Old WordPress service and area URLs must keep working (SEO).
- Next.js 15, Tailwind 4, motion. Fonts self-hosted.

## Brand Commitments
- Name: iBuy Vehicles. Logo: red and blue swirl around a car in a blue disc, wordmark with a red i-dot, tagline "Get paid top dollar today!" (public/brand/original-logo.png; vector redraw pending Mark's approval).
- Logo red and blue are the brand's colours.

## Evidence on Hand
- 252 Google reviews (count), eight verbatim review quotes in src/data/reviews.ts. No star rating published: do not show one as a number.
- Since 2010; pickup often within 2 to 4 hours; paid at pickup; free towing; hours; address; phone (281) 840-0452; mark@ibuyvehicles.com.
- Four real low-resolution photos of cars Mark bought (public/photos/real-*.webp).
- Absent: photo of Mark, rating value, legal name, prices paid, customer counts. Never fabricate these.

## Product Principles
1. One thumb, one minute: every path to Mark is one tap from anywhere on a phone.
2. Honest before clever: the estimate is labelled an estimate; Mark's word is final.
3. Meet the seller in their problem: the visitor should find their exact situation, not a feature list.
4. A person, not a platform: Mark's name and voice carry the trust.

## Accessibility & Inclusion
Low-literacy and older users: large tap targets, plain words, high contrast, no reliance on motion. Respect reduced motion. WCAG AA.
