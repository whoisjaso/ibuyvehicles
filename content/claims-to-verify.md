# Claims to Verify Before Republishing

## Questions for Mark

1. **Hours.** The old site shows three different sets of hours: "Mon - Sun: 8 AM-10 PM" (contact block), "Mon - Sat: 10:00am - 08:00pm" (footer) and a "24/7 Customer Support" badge. The posts now use none of these; the brief says 8 AM to 10 PM every day. Which is right?
2. **Licence.** What licence does iBuy Vehicles hold (licensed dealer, Used Auto Parts Recycler (UAPR), other), and what is the number? The posts no longer claim any licence. If iBuy is a UAPR, the title posts could say so plainly for the 13-year/7-year no-title route.
3. **Payment method.** Do you ever pay by check? The posts now say only "paid on the spot, before the car is towed".
4. **Google rating.** What is the real Google star rating? The posts use the review count (252) only.
5. **Paperwork.** Do you file any TxDMV paperwork for the seller, or only walk them through it? Posts now say "walks you through the paperwork" and tell sellers to file their own Vehicle Transfer Notification.
6. **Vehicle types.** Do you buy motorcycles, RVs and boats? The new posts and pages mention them on the old site; the ported new posts now say "call to ask".

---

This file lists specific claims in the ported content (`content/posts/*.md`, `content/pages/*.md`). In this pass the posts were edited against the client rules; `content/pages/*.md` were **not** edited (out of scope for this pass), so every pages item below is STILL OPEN.

Status key: **FIXED** (what was done) or **STILL OPEN** (needs Mark or a source).

Standard wording now used for pricing: "Mark makes the offer himself after a quick look at the car, and he asks about anything that changes the price (like a missing catalytic converter) before he gives you a number, not at the curb. You never have to sell." Online estimates are described as "a starting range, not an offer". Payment is "paid on the spot, before the car is towed". Timing is "pickup is often within 2 to 4 hours".

---

## 1. Price Guarantees in Writing (Client Asked for None: Must Remove or Reword)

- `posts/auto-valuation.md` (FAQ): "our original digital cash offer is completely guaranteed". **FIXED**: replaced with the standard wording.
- `posts/auto-valuation.md` (body): "receive a guaranteed cash offer based on market rates". **FIXED**: now "a starting estimate range"; final offer after a quick look.
- `posts/auto-valuation.md` (body): "the absolute highest payout possible". **FIXED**: removed.
- `posts/we-buy-flood-damaged-cars-houston.md`: "The number you agreed to is the number on the check." and "The quote is the price. Full stop." **FIXED**: replaced with the standard wording.
- `posts/sell-non-running-car-houston.md`: "Quotes change last minute? Ours lock in." **FIXED**: standard wording.
- `posts/cash-for-junk-cars-houston.md`: "No low offers or last-minute changes ever." and "you get top dollar every time". **FIXED**: both removed; standard wording added.
- `posts/sell-a-car-in-houston-guide.md`: "a firm cash offer ... No last-minute price drops." **FIXED**: standard wording.
- `posts/salvage-car-value.md`: "They give you a firm cash offer." **FIXED**.
- `posts/flood-damaged-car-value.md`: "They will give you a firm offer." and "They pay top dollar". **FIXED**.
- `posts/junk-car-buyers-pay-houston.md`: "firm quote upfront and sticks to it at pickup" and "not a number designed to drop at pickup". **FIXED**.
- `posts/sell-wrecked-car-for-cash.md`: "We pay top cash ... often more than scrap yards." and "offering top dollar for all conditions". **FIXED**: removed.
- `posts/sell-flood-damaged-car-houston.md`: "we pay more than individual junkyards". **FIXED**: removed (with "process volume through local salvage networks").
- `pages/services.md`, `pages/about-us.md`: "We pay top dollar ..." and "top-dollar offers". **STILL OPEN** (pages not edited).
- `posts/we-buy-flood-damaged-cars-houston.md`: "no runaround, no lowballing"; `posts/sell-wrecked-car-for-cash.md`: "No lowball games". **FIXED**: removed.
- Also fixed (not previously listed): `posts/how-the-process-works-selling-your-vehicle-in-3-easy-steps.md` ("we don’t lowball"), `posts/why-selling-your-vehicle-to-i-buy-vehicle-is-the-smart-choice.md` and `posts/tips-to-get-the-best-value-when-selling-your-vehicle.md` ("instant" offers), `posts/junkyard-vs-scrap-yard-vs-junk-car-buyer.md` (checklist question "Is the quote guaranteed?"), `posts/junk-car-worth.md` ("beats yard payouts", "Cash for cars buyers pay more"), `posts/cash-for-cars-vs-private-sale.md` (FAQ "Cash for cars companies typically pay more than dealers").

## 2. Licence, Permit and Legal-Status Claims

- `posts/sell-car-without-title-houston.md`: "I Buy Vehicles operates under these exact permits ... established relationships with the Texas DMV". **FIXED**: section rewritten around the UAPR no-title exemption with no licence claim. **STILL OPEN**: Mark to confirm licence type and number (Questions 2).
- `posts/sell-car-without-title-houston.md`: "licensed vehicle buyers ... carry special permits". **FIXED**: removed.
- `posts/we-buy-flood-damaged-cars-houston.md`: "licensed hurricane-damaged car buyer". **FIXED**: "licensed" removed; "multiple hurricane seasons" replaced with "since 2010".
- `posts/sell-non-running-car-houston.md`: "Our insured team". **FIXED**: removed.
- `posts/sell-wrecked-car-for-cash.md`: "Family-owned". **FIXED**: removed.
- `posts/sell-car-documents-houston.md`: "They make sure everything is legal and compliant." and "You do not need to visit the tax office." **FIXED**: replaced with "walk you through the paperwork" plus the seller’s own Vehicle Transfer Notification.

## 3. Texas Title Law Statements (Conflicting or Likely Wrong)

All posts now follow the 2026 title series (`sell-junk-car-without-title-texas`, `texas-bonded-title`, `texas-lost-car-title-replacement`): certified copy via VTR-34; bonded title via VTR-130-SOF; no-title only for the UAPR exemption (13+ years old, not registered 7+ years, VTR-341-2), otherwise VTR-340 ownership evidence. No post says iBuy itself is a UAPR.

- `posts/sell-a-car-in-houston-guide.md`: "Licensed junk car buyers are legally permitted ... using a bill of sale". **FIXED**: replaced with the UAPR exemption.
- `posts/sell-a-car-in-houston-guide.md`: "does not require a title for vehicles manufactured before 1995". **FIXED**: removed.
- `posts/sell-a-car-in-houston-guide.md`: "the no-title process is well-established and completely legal". **FIXED**: rewritten.
- `posts/sell-non-running-car-houston.md`: "Texas law allows seller affidavits." **FIXED**: removed (the newer posts do not support it); FAQ "Use a quick affidavit" also fixed.
- `posts/cash-for-junk-cars-houston.md` FAQ: "Most vehicles qualify without any extra steps". **FIXED**.
- `posts/junk-car-worth.md` FAQ, `posts/sell-wrecked-car-for-cash.md`: blanket "we buy vehicles without title". **FIXED**. `pages/services.md`: **STILL OPEN** (pages not edited).
- `posts/auto-valuation.md` FAQ: "registration document and a matching photo ID". **FIXED**.
- Also fixed (not previously listed): no-title claims in `posts/junk-car-buyers-pay-houston.md`, `posts/flood-damaged-car-value.md`, `posts/sell-flood-damaged-car-houston.md`, `posts/we-buy-flood-damaged-cars-houston.md` (insurer-kept-title + bill of sale), `posts/sell-car-documents-houston.md`, `posts/sell-car-without-title-texas.md` ("possible ... as long as you can provide proof of legal right").
- Bonded title cost and timing. **FIXED**: `sell-car-without-title-houston` ($100 to $150, two to three weeks) and `sell-a-car-in-houston-guide` ("several months") now say time and cost vary and point to TxDMV; the bond is described as generally 1.5 times the determined value, matching `texas-bonded-title`. "guarantee no hidden claims" and "VIN inspection through your local DMV office" replaced with the VTR-130-SOF / VTR-68-A steps from `texas-bonded-title`.
- Duplicate/certified title process. **FIXED**: all posts now say VTR-34, in person at a TxDMV Regional Service Center ($5.45) or by mail ($2), allow at least 15 days by mail. Removed "county tax assessor-collector", "two to four weeks", "expedited options", "online at txdmv.gov".
- `posts/sell-car-documents-houston.md`: "Texas requires annual safety inspections ... within 90 days of sale." **FIXED**: now says Texas ended safety inspections for most non-commercial passenger vehicles on January 1, 2025, emissions testing continues in some counties including Harris.
- `posts/sell-car-documents-houston.md`: "odometer disclosure for all cars under 20 years old". **FIXED**: softened to "most vehicles, some older vehicles are exempt, check with TxDMV". "They are pink in color." and "Plates stay with the seller in Texas." **STILL OPEN** (left as written; plates line matches `car-title-vs-registration-texas`; title colour unverified). "duplicate title online ... a few weeks". **FIXED**.
- `posts/salvage-car-value.md`: "Texas uses a different calculation ... Repair Cost + Salvage Value > ACV". **FIXED**: heading no longer says Texas; text says some insurers and states use it and to ask the adjuster/TxDMV. "usually 75-85%" **STILL OPEN** (general, unsourced).
- `posts/sell-flood-damaged-car-houston.md`: "Texas issues salvage titles ... non-repairable certificates". **STILL OPEN** (left; broadly consistent with TxDMV salvage/nonrepairable titles, but check wording).
- Lien thresholds (bonded title: 10 years; UAPR: 6 years plus $25 fee). **STILL OPEN**: left as in the 2026 posts; re-check before publishing.
- TxDMV fees and deadlines ($15 bonded fee, 1.5x bond, $5.45/$2 certified copy, 30-day wait, $28/$33 title fee, $50.75 registration, 6.25% tax, $2.50 Harris transfer fee, 10-day lien release, 30-day title and VTN deadlines, UAPR 24-hour report, Houston RSC and Wichita Falls addresses). **STILL OPEN**: unchanged; re-check before publishing since fees change.

## 4. Same-Day and Other Time Promises

Payment contradiction ("cash or check" vs "cash, not checks" vs "no checks"). **FIXED**: every post now says "paid on the spot, before the car is towed". **STILL OPEN**: whether Mark ever pays by check (Questions 3).

- `posts/cash-for-junk-cars-houston.md`: "same hour", "within hours not days", "less than an hour", "within hours", FAQ "within a few hours". **FIXED**: replaced with "often within 2 to 4 hours" and "often same day". Title changed to "Get Cash for Junk Cars in Houston, TX, Often With Same Day Pickup" (slug unchanged).
- `posts/junk-car-buyers-pay-houston.md` FAQ: "within 24 hours"; "Same-day pickups are available". **FIXED**.
- `posts/we-buy-flood-damaged-cars-houston.md`: "Same-day pickup is available"; FAQ "within 24 hours". **FIXED**.
- `posts/sell-flood-damaged-car-houston.md`: FAQ "same day or within 24 hours ... add extra drivers"; "Within minutes, you get a real offer". **FIXED**. Title changed from "Get Cash Today" to "Get Cash in Houston" (slug unchanged).
- `posts/auto-valuation.md` FAQ: "twenty-four to forty-eight hours". **FIXED**: "often within 2 to 4 hours".
- `posts/sell-non-running-car-houston.md`: "free quote in 2 minutes", "same-day free towing". **FIXED**.
- `posts/sell-wrecked-car-for-cash.md`: "We reply in minutes", "same-day pickup". **FIXED**.
- `posts/junk-car-worth.md`: "We arrive same-day"; FAQ "Same-day pickup and payment is our norm". **FIXED**.
- `posts/sell-car-without-title-houston.md`: "immediate payment ... the same day"; "cash offer in minutes and schedule pickup today". **FIXED**.
- `posts/sell-car-documents-houston.md`: "Same-Day Payment ... cash on the spot". **FIXED**.
- `pages/services.md`, `pages/about-us.md`: "Same-Day Payment: Get paid instantly". **STILL OPEN** (pages not edited).
- Contact blocks: "24/7 Customer Support". **STILL OPEN** (pages/layout; see Questions 1).
- Generic, non-iBuy timing statements in neutral guides (e.g. `cash-for-cars-vs-private-sale`: "less than 48 hours" for cash-for-cars companies in general) were left as general market description.

## 5. Dollar Amounts Presented as What IBV Pays or What Cars Are Worth

- `posts/junk-car-worth.md`: "$200 to $2,000", Accord "$800 / $250-400", "$200-400 per ton", converters "$100-300". **FIXED**: all cut; points to the estimate.
- `posts/junk-car-buyers-pay-houston.md`: "$100 to $1,500", "$2,000 or more", "$200 and $700", "$600 / $420", "$200 to $400", title "adds $50 to $200", "$0.03 to $0.07 per pound", "3,000 lbs". **FIXED**: all cut; answer rewritten.
- `posts/we-buy-flood-damaged-cars-houston.md` FAQ: "$500 to $2,000", "$100 to $500". **FIXED**: cut. "70 to 75 percent" **FIXED**: softened to "approach or exceed ACV; varies by insurer and state".
- `posts/sell-wrecked-car-for-cash.md`: F-150 "$500 to $2,000", "$20 a day", "$100 or more". **FIXED**: cut.
- `posts/sell-non-running-car-houston.md`: Silverado "$400 to $1,000", Toyota "$600", "$150 bill", "$3,000 plus", "Inner-loop spots fetch more". **FIXED**: cut. FAQ "$200 to $2,000" **FIXED**: cut.
- `posts/salvage-car-value.md`: "20-40%". **FIXED**: answer and body now say "a fraction of pre-damage value" as a general market pattern. Converter "$100 to $500" **FIXED**: cut.
- `posts/flood-damaged-car-value.md`: "0-40%", "60-75%", "75-85%". **STILL OPEN**: kept as general market ranges for salvage/rebuilt cars (not iBuy offers); needs a source or removal.
- `posts/cash-for-cars-vs-private-sale.md`: cash-for-cars "15 to 30%" and "$11,000 to $13,000". **FIXED**: cut. Trade-in "$10,000 to $12,000" **FIXED**: cut. FAQ "10 to 20% higher than trade in" **FIXED**: cut. "According to Kelley Blue Book" **FIXED**: attribution removed. Private-sale "$16,000 to $18,000" example **STILL OPEN** (kept, labelled as a general market example). "less than 48 hours" left as generic. Competitor name "We Buy Any Car" **STILL OPEN** (left; decide whether to name competitors).
- `posts/repair-or-sell-car-as-junk.md`: engine "$4,000 and $9,000", transmission "$2,500 to $7,500", 25%/50% rule. **STILL OPEN**: repair-cost market context, not iBuy offers; unsourced.
- `posts/why-junk-car-prices-are-increasing.md`: Prius converter "over $3,000" and "$2,466 to $3,038"; "double or triple your offer". **FIXED**: cut. All macro statistics ($297 billion, quadruple, ~20%, 8.1 million, 32%/23%, $50,300, 60%, 95%, 20.5 million tons, €1.5 billion, $200 billion, 15%, 5,000/2,900 lb) **STILL OPEN**: unsourced; need sources or removal.
- `pages/portfolio.md` price labels. **STILL OPEN** (pages not edited).

## 6. Company Track Record and Social Proof

- "Since 2010": kept (verified). "10+ years" / "over a decade" in `posts/salvage-car-value.md`, `posts/sell-car-documents-houston.md`, `posts/flood-damaged-car-value.md`. **FIXED**: replaced with "since 2010". Pages: **STILL OPEN**.
- `posts/cash-for-junk-cars-houston.md`: "thousands of cars each year", "our local facility", "We focus only on vehicles in the Houston area". **FIXED**: removed.
- `posts/sell-flood-damaged-car-houston.md`: "refined across thousands of Houston vehicles". **FIXED**: removed. "Our city sees thousands of flood-damaged vehicles every year" (about the city, not iBuy) **STILL OPEN**: unsourced.
- `posts/sell-wrecked-car-for-cash.md`: "Thousands of Houston folks trust us". **FIXED**: replaced with "252 Google reviews".
- `posts/sell-car-documents-houston.md`: "Join thousands of satisfied Houston sellers"; "Customer reviews praise ...". **FIXED**.
- `posts/we-buy-flood-damaged-cars-houston.md`: "multiple hurricane seasons". **FIXED**.
- `posts/sell-flood-damaged-car-houston.md` FAQ: "retrieved cars from retention ponds ... neighboring counties". **FIXED**: removed (also "proper fluid disposal and environmental compliance").
- `pages/about-us.md` reviews and "252 Google reviews"; `pages/services.md` vehicle types and "boats". **STILL OPEN** (pages not edited; see Questions 4 and 6).
- `posts/sell-car-without-title-houston.md`: "verify ownership through multiple channels ... No callbacks"; "all Houston neighborhoods and surrounding areas". **FIXED**: removed.

## 7. Out-of-Market or Unsourced Technical Claims

- `posts/reasons-cars-rejected-by-dealers.md`. **FIXED**: rewritten for Houston and the US with the same structure; UK models, pound-sterling repair costs, failure-rate percentages and the CVT claim removed; reasons are now general (high mileage, engine and transmission faults, warning lights, flood damage, frame damage, missing keys and poor condition, title and lien problems, salvage/branded titles); safety-inspection line replaced with the 2025 Texas change plus Harris County emissions; iBuy added as the Houston cash buyer option.
- `posts/sell-flood-damaged-car-houston.md`: "Mold starts within 48 hours", "few inches ... can total", "Water above the dashboard almost always". **STILL OPEN**: left as written (general, unsourced).
- `posts/flood-damage-car.md`: mold "twenty-four hours" vs FAQ "twenty-four to forty-eight". **FIXED**: body now matches the FAQ. "bend or snap instantly" **FIXED**: softened to "can bend or snap".
- `posts/we-buy-flood-damaged-cars-houston.md`: "60 to 70 percent". **STILL OPEN**: left (general rule of thumb, unsourced).
- `posts/junk-car-worth.md`: "diesel trucks lead the pack for top dollar". **FIXED**: softened to "often draw strong interest". "Cars over 200,000 miles face lower scrap car prices" **STILL OPEN** (left).

## 8. Business Details That Conflict

- Hours. **STILL OPEN** (Questions 1). No post states hours.
- Brand name. **PARTLY FIXED**: singular "I Buy Vehicle" corrected to "I Buy Vehicles" in the three oldest posts and `posts/documents-needed-sell-car-without-title-texas.md` (slugs unchanged). Posts still mix "I Buy Vehicles", "iBuy Vehicles" and "iBuyVehicles" as in the originals; **STILL OPEN** if Mark wants one spelling everywhere.
- "online junk car value estimator" / "junk car price calculator" / "online form". **FIXED**: now point to the estimate at https://ibuyvehicles.com/offer and describe it as a starting range, not an offer.

## 9. Copy Defects

- `pages/services.md`, "Cash for Junk Cars" card missing words. **STILL OPEN** (pages not edited).
- `posts/how-to-junk-a-car-in-texas.md` garbled paragraph ("heart and jocular assurances ... flatbed lorries"). **FIXED**: rewritten in plain English; "favourable" also fixed.
- `posts/how-to-avoid-junk-car-scams.md`: "$2,500 to the salesperson ... dealership". **FIXED**: now "quote you $2,500 over the phone ... once the tow truck arrives". "A good businessman should..." also fixed.
- `posts/flood-damage-car.md`: "flood-damaged vehicle restoration service car". **FIXED**.
- `posts/junkyard-vs-scrap-yard-vs-junk-car-buyer.md`: garbled "If ever, then right questions upfront ... realised". **FIXED**.
- Keyword-stuffed closing SEO paragraphs (e.g. "With **sell car without title Houston**, owners can..."). **STILL OPEN**: mostly left; the one in `sell-car-without-title-houston` was trimmed to remove its title-law claim.

## 10. New Posts Ported in This Pass

Three posts live on the old site but missing from the sitemap were ported with all rules applied (dates from the page `datePublished`; FAQ moved to frontmatter):

- `posts/ibuyvehicles-vs-dealerships-private-buyers-junkyards.md` (category `selling`, published 2026-10-15)
- `posts/why-houston-car-owners-choose-ibuyvehicles.md` (category `selling`, published 2026-10-14)
- `posts/selling-your-vehicle-houston-ibuyvehicles.md` (category `guides`, published 2026-10-13)

Changes from the live text: "same-day pickup and payment" became "pickup often within 2 to 4 hours" and "paid on the spot, before the car is towed"; "Motorcycles, RVs, and boats" became "call to ask" (Questions 6); missing-title sections now follow the 2026 title posts; the offer process now says Mark makes the offer himself after a quick look. **STILL OPEN**: the live versions on the old site still carry the unedited wording.
