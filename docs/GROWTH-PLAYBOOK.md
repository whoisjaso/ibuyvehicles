# iBuy Vehicles: Being Found, And Turning It Into Cars

Two halves. **Found:** search on Google, AI answer engines (ChatGPT, Perplexity, Gemini, Google's AI Overviews) and social platforms. **Turned into cars:** the funnel that takes someone from the chat or the estimate to a car on the truck, and proves who is real.

Everything here is built on what the research says the seller fears (docs/ICP-RESEARCH.md): the price dropping at the curb, no-shows, short money, paperwork. Every post, page and reply answers one of those.

---

## Part 1: Found

### The one rule for every platform
Search everywhere now works on the same three signals: **the words people type, proof that real people trust you, and freshness.** So every post uses the seller's own words ("junk car", "no title", "won't start", "Houston"), shows a real car and a real payout moment, and goes up on a steady rhythm.

### Google (the money platform)
1. **Google Business Profile is the single biggest lever** for "junk car buyer near me". Primary category: *Junk car buyer*. Secondary: *Car buyer, Towing service, Auto wrecker*. Hours, phone and address exactly as on the site.
2. **Reviews:** ask every seller at payout, by text, with the direct review link. Aim for 4 a week. Mark replies to every review within a day, using the seller's car and neighbourhood in the reply ("Glad we got that Impala out of your driveway in Spring Branch").
3. **Google Posts weekly:** one photo of a car bought that week, one line, one link to /offer.
4. **Photos weekly:** real cars on the truck, the lot, Mark. Geotagged originals from the phone.
5. **The site is now set up for it:** one business entity in structured data across every page, canonical URLs, sitemap, FAQ markup, fast pages, and the old URLs kept so rankings carry over.

### AI answer engines (AEO and GEO)
People now ask ChatGPT "who buys junk cars in Houston with no title". These engines quote sources that state facts plainly and consistently.
- **llms.txt** (live at /llms.txt) gives them the facts in one place.
- **Answer-first articles:** every article opens with a two-sentence direct answer, then the detail. The 40 old articles are being ported in this format with FAQ markup.
- **Consistency:** the same name, phone, address and hours on the site, Google, Facebook, Yelp, BBB and every directory. Mismatches are the most common reason AI engines skip a business.
- **Be cited elsewhere:** answer "no title Texas" questions on Reddit (r/houston, r/askcarsales) and Quora as Mark, plainly, with no pitch. These threads are heavily used as AI sources.

### Facebook
- Page name *iBuy Vehicles: Cash For Junk Cars Houston*; category *Car dealership* plus *Towing service*; the same phone, address and hours as Google.
- **Marketplace is where these sellers already are.** Post "We buy junk cars, any condition, Houston" listings weekly in the vehicles category, and answer Marketplace sellers of broken cars directly.
- Join and contribute to Houston neighbourhood groups and buy/sell groups; post the before and after story, not an ad.
- Turn on the Meta Pixel (the site supports it: set `NEXT_PUBLIC_META_PIXEL_ID`) so ads can retarget estimate visitors.

### Instagram
Search on Instagram now reads captions, alt text and on-screen text, not just hashtags.
- Bio: *Cash for junk cars in Houston. Paid on the spot, free tow. (281) 840-0452*, with the link to /offer.
- Reels: 15 to 30 seconds. The car, the problem, the payout handshake, the truck pulling away. The first line on screen is the seller's question: "No title? Still sold it today."
- Caption keywords in plain words: junk car Houston, sell car no title Texas, cash for cars Houston. Three to five hashtags, local ones only.
- Write alt text on every post.

### TikTok
TikTok is a search engine for under-40s ("how to sell a car with no title Texas").
- The same Reels, plus Mark talking straight to camera for 20 seconds: "Lost your title in Texas? Here's what you actually need." One question per video, said out loud in the first 2 seconds (TikTok transcribes speech for search).
- On-screen text and captions repeat the spoken question.

### YouTube
- **Shorts:** the same vertical clips.
- **Three evergreen long videos** that answer the biggest fears, each 3 to 6 minutes, each linked from the matching article:
  1. "How to sell a car with no title in Texas"
  2. "What happens when a junk car buyer comes to your house" (filmed on a real pickup)
  3. "Flood car in Houston: what it's worth and who buys it"
- Titles are the question; descriptions open with the answer and the phone number.

### Snapchat
Lowest priority. Snap Map and a Public Profile for the business, plus the same vertical clips. Only worth it after the four above run weekly.

### Weekly rhythm (about two hours a week)
| Day | What | Where |
|---|---|---|
| Every pickup | 3 photos, 1 vertical clip, review link texted to the seller | Phone |
| Monday | Post last week's best car | Google Post, Facebook, Instagram |
| Wednesday | One "seller question" video by Mark | TikTok, Reels, Shorts |
| Friday | Marketplace listing refresh, reply to every review | Facebook, Google |

---

## Part 2: Turned Into Cars (the real funnel)

Right now the chat and the estimate hand off to a call or a text, and the estimate sends its lead to Mark by email or webhook. That proves the idea. To run it as a business, it needs a spine:

### 1. Capture
Every entry point (Mark's chat, the estimate, the call and text buttons, the dealer form) writes **one lead record**: name, phone, the car (year, make, model, VIN if given), the answers (problem, title, keys, parts missing, where it sits), photos, the estimate shown, the source page and the ad or post that brought them.

### 2. Prove they're real
- **Phone check by text code** before the estimate number is shown in full. Real sellers do it in ten seconds; bots and junk leads stop.
- **Duplicate check** on phone and VIN, so one car is one lead.
- **Bot protection** (Cloudflare Turnstile) on every form.

### 3. Speed (where these deals are won)
Sellers send the same car to several buyers at once, and the one who calls first with a straight number has the best shot. Minutes matter.
- Mark gets a **text the instant a lead lands**, with the car, the answers and a one-tap call button.
- If the lead isn't opened in 5 minutes, it texts again; in 15, it goes to a backup person.
- The seller gets an instant text from Mark's number: "Got it. I'll call you in a few minutes about the [car]." (The voice agent from the brief can take this call after hours.)

### 4. Mark's desk (the Handle A Sale desk, next phase)
A private dashboard where every lead moves through **New, Called, Offered, Scheduled, Picked up and paid, Lost**, with the offer amount, the pickup time, the title paperwork (from the handle-a-sale skill), and the reason for every lost deal.

### 5. Follow-up nobody has to remember
- No answer: texts at 1 hour, next morning, day 3.
- Offered but not booked: day 1 and day 4 ("Still have the [car]? The offer stands until Friday.").
- After pickup: review request at 2 hours, the TxDMV transfer reminder at day 2.

### 6. The numbers Mark sees every week
Leads by source; percent verified; time to first call; offers made; cars bought; average buy price; cost per car bought by channel; reviews gained. That's what tells him which platform in Part 1 is worth his time.

### What it takes
A database (Supabase), a text provider (Twilio or similar, with an approved business number), bot protection, and the desk. The site's lead route is already built to feed it.

---

## Part 3: Old site pages

Every page and all 40 articles from the old site keep their exact URLs, so the rankings carry over (see content/ and the article routes). Anything retired gets a permanent redirect to its closest new page, never a 404.
