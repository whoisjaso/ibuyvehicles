# iBuy Vehicles: Asset Brief

Every image on the new site has a code (A01, B03, ...). The same code is used in the site (`src/data/media.ts`), in this brief, and in the file name you send back. Generate in ChatGPT (image generation), download at the highest size offered, name the file with its code (for example `A01-hero.png`), and send it. I place it, crop it for phones, check it at desktop and phone size, and mark it done here.

**Reference images** live in this repo under `public/photos/` and `public/brand/`. They are also linked on the published brief page so you can save them straight to your phone. When a prompt says "upload reference", attach that file to the same ChatGPT message as the prompt.

---

## How to run every prompt (read once)

1. Start a **new chat** for each studio family (all B images in one chat, all C images in one chat). ChatGPT keeps the look consistent inside one chat.
2. Paste the **whole** prompt, including the HOUSE STYLE block at the end. Do not shorten it.
3. If the result has any text, logo, badge, license plate characters, watermark, or a person who shouldn't be there, reply: *"Same image, remove [the thing]. Change nothing else."*
4. If the car looks too new, shiny, or fake, reply: *"Same image, make the car look like a real 10 to 15 year old daily driver: light dust, small chips, faded clear coat. Change nothing else."*
5. When you like one, reply: *"Upscale this to the largest size you can, same image."* Then download it.

### The three non-negotiables

- **Nothing generated may pose as Mark, his lot, his customers, or a specific car he bought.** These are brand photographs. Real proof (Mark, real pickups) is the R list at the bottom, shot on a phone.
- **No text, logos, badges, emblems, or license plate characters** in any image. Badges on cars must be smooth, blank metal.
- **No people** unless the prompt describes them, and then hands only. No faces.

---

## HOUSE STYLE A: Night Studio (used by A01, A02, C01 to C03, D01, D02)

Append this exact block to every prompt that says [NIGHT STUDIO]:

> Photographed like a Porsche or Rolex campaign still, not like a car advert. Medium format digital camera (Phase One IQ4 look), 80mm lens equivalent, f/5.6, ISO 100, tripod, perfectly level horizon. Lighting: one very large rectangular softbox directly overhead, angled slightly toward the front of the subject, creating one long, clean, soft highlight along the roof, hood and shoulder lines; a faint cool rim light from behind to separate the silhouette from the background; everything else falls into deep, rich, detailed shadow. Background: a seamless charcoal-black cyclorama studio with no visible corners or seams, the floor a dark polished resin that shows a soft, blurred reflection of the subject. Colour: neutral, slightly cool, 5600K, true colours, no orange or teal grade, no added colour cast, low saturation. Finish: crisp micro-contrast, fine natural film grain, no HDR, no bloom, no lens flare, no vignette beyond the natural falloff of the light, no smoke, no haze, no sparks, no water spray. Absolutely no text, words, numbers, logos, badges, emblems, watermarks or license plate characters anywhere in the frame; any badge position on the vehicle is smooth blank metal. Photorealistic, indistinguishable from a real photograph.

## HOUSE STYLE B: White Studio (used by B01 to B06)

Append this exact block to every prompt that says [WHITE STUDIO]:

> Photographed like the Porsche model-range page: a seamless, very light warm-grey cyclorama studio (colour close to #E9EAEC), no visible corners, horizon line or seams; the floor is the same light grey with a soft, natural contact shadow under the subject and a very faint reflection. Lighting: a huge overhead diffusion scrim plus two large softboxes at 45 degrees front-left and front-right, giving even, soft, wraparound light with gentle gradients across the bodywork and no harsh hotspots. Camera: medium format, 70mm lens equivalent, f/8, eye level at 1.1 metres, three-quarter front view, the subject centred horizontally and sitting in the lower 60% of the frame, generous empty space above. Colour: neutral, true-to-life, 5600K, no grade, no colour cast, low saturation. Finish: crisp, clean, catalogue sharp, fine grain, no HDR, no vignette, no reflections of studio equipment, no props unless described. Absolutely no text, words, numbers, logos, badges, emblems, watermarks or license plate characters anywhere; badge positions are smooth blank metal; the front and rear plate areas are empty. Photorealistic.

---

## A. Hero

### A01: Hero, desktop (the most important image on the site)

- **Where:** full-screen opening photograph on the home page. The headline sits in the lower-left corner over it.
- **Size:** 16:9, at least 2560×1440 (ask for the widest landscape ChatGPT allows, then upscale).
- **File:** `A01-hero.png`
- **Upload reference:** `public/photos/real-impala.webp` (a grey sedan Mark bought) with this sentence before the prompt: *"Use the attached photo only as a reference for the type and age of car: an ordinary grey 2000s American four-door sedan. Do not copy the background."*

> An ordinary, slightly tired mid-2000s grey four-door American family sedan (similar in shape to a Chevrolet Impala, but with no badges or brand marks anywhere), photographed as if it were a new flagship in a luxury car studio. The car sits alone, three-quarter front view, facing slightly left, placed in the RIGHT HALF of the frame with its front wheel at roughly 62% of the frame width and its roof line at roughly 45% of the frame height. It is honest about its age: a light, even film of dust on the paint, a few small stone chips on the hood edge, faded clear coat on the roof, one hubcap slightly scuffed, tyres a little dull, but it is clean, straight and dignified, not wrecked. The single overhead softbox draws one long, silver highlight along the roof and down the hood, making the plain car look sculpted and important. The LEFT 45% of the frame is calm, almost black, seamless studio with only the faint reflection of the floor, leaving clear, empty room for a headline in the lower-left corner. Horizon of the floor sits at about 70% of the frame height. Mood: quiet respect, the moment before a decision, calm and expensive. [NIGHT STUDIO]

**Check before sending:** car is on the right and fully inside the frame; the lower-left quarter is dark and empty; no badges or plate characters; it looks like a photograph, not a render.

### A02: Hero, phone

- **Where:** the same opening photograph on phones.
- **Size:** 9:16 portrait, at least 1440×2560.
- **File:** `A02-hero-phone.png`
- **Upload reference:** your finished **A01** image, with: *"Recompose this exact image as a vertical 9:16 photograph."*

> Recompose the attached photograph as a tall vertical 9:16 image of the same scene: the same grey sedan, same studio, same light, same dust and wear, same colours. Show the car three-quarter front, filling the frame width from edge to edge with a little breathing room, positioned in the MIDDLE third of the height (its wheels at about 62% of the frame height). The TOP 30% is calm black studio. The BOTTOM 30% is dark polished floor with the car's soft reflection, empty and dark, because white text will sit there. Change nothing about the car or the lighting. [NIGHT STUDIO]

---

## B. The Range (six tiles, all in ONE chat, all White Studio)

These six read like a car maker's model range, but each is a problem car. Generate B01 first. For B02 to B06, start each message with: *"Same studio, same lighting, same camera height and lens as the previous image."*

- **Size:** 4:5 portrait, at least 1600×2000.
- **Where:** the swipeable "Every Kind Of Car. Every Kind Of Problem." range on the home page. Title text sits at the bottom of each tile, so keep the bottom 25% simple.

### B01: Won't Start

- **File:** `B01-wont-start.png`
- **Upload reference:** `public/photos/real-tow.webp` (car type only).

> A dark red 2000s four-door compact sedan with no badges, three-quarter front view, centred, sitting in the lower 60% of the frame. The hood is propped fully open on its stay rod, revealing a dusty, ordinary engine bay. A pair of thin black jumper cables lies loosely coiled on the floor beside the front wheel, their clamps not attached to anything. The front passenger tyre is slightly low on air. Light dust on the paint. Calm, matter-of-fact, almost museum-like: the problem is shown plainly, without drama. [WHITE STUDIO]

### B02: No Title

- **File:** `B02-no-title.png`
- **Upload reference:** none.

> A still life photographed from directly above (flat lay), centred on the light grey studio floor: an open, completely empty manila document folder lying flat; resting across its open centre, a single ordinary car key with a plain black rubber head (no logo) and a simple steel key ring; beside the folder, a slim black ballpoint pen lying parallel to the folder's edge. Arrangement is precise and geometric with generous empty space around it, like a luxury watch catalogue still life. The folder has no paper, no writing and no labels. Soft overhead light with a gentle shadow under each object. [WHITE STUDIO] (Override the camera for this one: top-down at 90 degrees, 100mm macro lens equivalent, f/11.)

### B03: Wrecked

- **File:** `B03-wrecked.png`
- **Upload reference:** `public/photos/real-jeep.webp` with: *"Reference for the vehicle type and the cracked windshield only."*

> A silver two-door boxy off-road SUV (similar in shape to a Jeep Wrangler, but with no badges, no grille logo and no lettering anywhere), three-quarter front view, centred, sitting in the lower 60% of the frame. The windshield has a large, realistic spider-web crack spreading from the passenger side. The front bumper is pushed slightly in on one corner and the left fender has a long, shallow crease. Everything else is intact and clean. Presented calmly, like a design object that has had a hard day. [WHITE STUDIO]

### B04: Flooded

- **File:** `B04-flooded.png`
- **Upload reference:** none.

> A pale silver 2010s four-door midsize sedan with no badges, three-quarter front view, centred, sitting in the lower 60% of the frame. A clear, dried, muddy brown waterline runs horizontally across both doors and the front fender at about the height of the middle of the wheels; below the line the paint is dulled with a fine film of dried silt, and the lower edges of the tyres and wheels carry dried mud. Above the line the car is clean. One small strand of dried grass is caught in the front grille. Calm, precise, documentary. [WHITE STUDIO]

### B05: Runs Fine

- **File:** `B05-runs-fine.png`
- **Upload reference:** `public/photos/real-charger.webp` with: *"Reference for the type of car only (a red American four-door muscle sedan)."*

> A red 2010s four-door American muscle sedan (similar in shape to a Dodge Charger, but with no badges, no grille logo and no lettering), three-quarter front view, centred, sitting in the lower 60% of the frame. It is in decent, honest used condition: clean, straight, tyres good, paint slightly faded on the hood, black wheels with light brake dust. It looks like a car someone is simply done with, not a car with a problem. [WHITE STUDIO]

### B06: Dealer Units

- **File:** `B06-dealer-units.png`
- **Upload reference:** none.

> Three ordinary used vehicles parked side by side at a slight angle, overlapping like a model range line-up, all facing three-quarter front-left: on the left a white mid-size SUV, in the middle a dark grey four-door sedan, on the right a black crew-cab pickup truck. None has badges, plates, price stickers or lettering. Each has a small, plain, blank white rectangular card tucked under its windshield wiper. All three sit in the lower 55% of the frame with generous empty studio above. Orderly, calm, like inventory awaiting a decision. [WHITE STUDIO]

---

## C. One Evening (three tall photographs, all in ONE chat, Night Studio adapted to location)

These run beside the clock (6:12 PM, 6:25 PM, 8:40 PM). They are moments, not studio shots, but they keep the same quiet, dark, expensive light.

- **Size:** 4:5 portrait, at least 1600×2000.

### C01: 6:12 PM, You Send The Car

- **File:** `C01-send.png`
- **Upload reference:** `public/photos/real-impala.webp` (for the car in the background).

> Over-the-shoulder view of a person's right hand holding a modern black smartphone (screen facing the camera, showing only the phone's camera viewfinder with a blurred grey car in it, no app interface, no text), photographing a grey 2000s four-door sedan parked in a residential driveway at dusk. Only the hand, wrist and the cuff of a plain grey hooded sweatshirt are visible; no face. The car is softly out of focus behind the phone, lit by a single warm porch light and the deep blue of the evening sky. Shallow depth of field, focus on the phone's edge and the fingers. Quiet, ordinary, private. [NIGHT STUDIO] (Override the background: a real suburban Houston driveway at blue hour instead of a studio, but keep the lighting discipline: one soft key light, deep shadows, cool neutral colour.)

### C02: 6:25 PM, Mark Calls

- **File:** `C02-call.png`
- **Upload reference:** none.

> A modern black smartphone lying face up on a dark walnut kitchen table, its screen glowing softly with an incoming call (the screen shows only a soft white glow and two round buttons, one green and one red, with no names, numbers, text or icons). Beside it: a single ordinary car key with a plain black rubber head and a half-full glass of water. Evening light: the only light is the phone screen and the warm, low light from a window out of frame on the left. Photographed at a low angle, 100mm macro lens look, f/2.8, very shallow depth of field, the key and glass falling softly out of focus. Calm anticipation. [NIGHT STUDIO] (Override the background: a dark, real kitchen interior, mostly in shadow.)

### C03: 8:40 PM, Paid. Then Towed.

- **File:** `C03-paid.png`
- **Upload reference:** `public/photos/real-tow.webp` (the real pickup: car type and tow truck type).

> A clean white flatbed tow truck parked at the kerb of a quiet Houston residential street at deep blue hour, its bed tilted down, a dark red 2000s compact sedan halfway up the bed with the winch cable taut. A single amber roof beacon glows softly (not flashing streaks). In the foreground, low and to the right, two hands meet: one hands over a neat, folded stack of US banknotes to the other (only hands and sleeves visible, no faces; the notes are realistic but no denomination or text is readable). The truck and car are slightly out of focus behind the hands. Street lights glow warm; the sky is deep navy. Quiet relief, a deal done. [NIGHT STUDIO] (Override the background: real street at blue hour, wet-looking asphalt with soft reflections.)

---

## D. Discover Tiles

### D01: Already Have An Offer?

- **File:** `D01-second-look.png`
- **Size:** 16:11 landscape, at least 2400×1650.
- **Upload reference:** none.

> Two hands across a dark stone table in a dim, elegant room: the left hand slides a single sheet of blank white paper (no writing at all) across the table; the right hand rests beside it holding an ordinary car key with a plain black rubber head. One soft overhead light pools on the paper and hands; everything else falls into deep shadow. Only hands and the cuffs of dark, plain shirts are visible. Calm, considered, like a second opinion from someone you trust. The left 40% of the frame is darker and emptier for a headline. [NIGHT STUDIO] (Override the background: dark interior, not a car studio.)

### D02: For Dealers

- **File:** `D02-dealers.png`
- **Size:** 4:5 portrait, at least 1600×2000 (it also crops to landscape on the dealer page).
- **Upload reference:** none.

> A small, tidy independent used-car lot in Houston at blue hour, photographed from a low angle at the end of a single row of six assorted used cars, SUVs and pickups parked nose-out so they recede in perspective. Overhead pole lights cast clean pools of light on dark asphalt. No signs, no flags, no balloons, no price stickers with numbers, no lettering, no badges, no plates. One car at the far end has a small blank white card under its wiper. The sky is deep navy with the last trace of light at the horizon. Orderly, quiet, slightly melancholy: inventory that has waited too long. [NIGHT STUDIO] (Override the background: real lot at blue hour.)

---

## E. Finale

### E01: It Could Be Cash Tonight

- **File:** `E01-finale.png`
- **Size:** 21:9 ultra-wide, at least 3200×1370 (ask for the widest landscape, I will crop).
- **Upload reference:** your finished **C03** (for the truck).

> The same clean white flatbed tow truck from the reference, now driving away from the camera down an empty, wide Houston boulevard at deep blue hour, a grey sedan secured on its bed, red tail lights glowing, its soft reflection on the damp asphalt. The truck is small in the frame, placed at about 70% of the width. Tall, softly lit palm trees and street lights line the road, receding to a soft, out-of-focus downtown Houston skyline on the horizon. The LEFT 55% of the frame is calm, dark sky and road with no objects, for a large headline. Peaceful, final, a weight lifted. [NIGHT STUDIO] (Override the background: real street at blue hour.)

---

## L. Logo (ChatGPT explorations; the site already uses my vector redraw)

The site now uses a faithful vector replica of Mark's current logo (`public/brand/emblem-original.svg`, plus full lockups `logo-lockup-on-dark.svg`, `logo-lockup-on-light.svg` and `logo-full-on-dark.svg`), rebuilt from the original's measured geometry so it stays sharp at any zoom. A refined alternative emblem is in `public/brand/emblem.svg`. Use these prompts to explore further directions with Mark. Whatever he picks, I redraw it as a final SVG, because a ChatGPT logo is a picture, not a vector.

The one part still raster is the cartoon mascot, because the original is only about 130 pixels tall. L05 below redraws him cleanly so he can be traced into a crisp vector.

**Upload reference for all L prompts:** `public/brand/original-logo.png` (the current logo) and `public/brand/emblem.svg` exported as PNG from the brief page.

### L01: Refined emblem, same idea, luxury finish

> Redesign the attached car-dealer emblem as a refined, premium automotive logo mark, keeping its core idea: a circular emblem with a red and blue swirl wrapping around a white ring, and a simple front-facing car silhouette inside a deep blue disc. Make it feel like a heritage automotive or watchmaker mark (think the precision of a Porsche crest or a Rolex coronet, not a cartoon): perfectly geometric circles, the red and blue swirl drawn as two clean, tapered crescents with crisp pointed ends, consistent negative space, the car silhouette simplified to a few precise shapes with even line weights, flat colours only (no gradients, no shadows, no gloss, no 3D, no glow). Colours: signal red #D6262D, royal blue #1F48C9, deep navy #14318F, white. Centred on a pure white background, generous margin, presented flat and front-on like a brand guideline page. No text, no letters, no tagline, no mascot.

### L02: Monochrome emblem (for black-and-white use)

> Using the attached emblem, produce a single-colour version: the whole mark in solid near-black #0E0E12 on pure white, built only from shapes and negative space so it still reads clearly (swirl, ring, disc and car), like a luxury brand's one-colour stamp or engraving. Perfectly flat, crisp edges, no gradients, no texture, centred with generous margin. No text.

### L03: Wordmark lockup

> Create a horizontal logo lockup on pure white: on the left the attached circular emblem; on the right the name "iBuy Vehicles" set in a refined, wide-tracked geometric sans-serif in uppercase, near-black #0E0E12, letter spacing generous like a luxury fashion or watch house, with the dot of the i replaced by a small solid red #D6262D circle. Everything perfectly aligned to the emblem's vertical centre, flat colours only, presented like a brand guideline page with generous margin. Spell the name exactly: iBuy Vehicles.

### L04: App icon / favicon

> Place the attached emblem centred on a rounded-square app icon with a solid near-black #0E0E12 background, the emblem filling about 78% of the icon, perfectly flat, crisp, no gradients, no shadow, no text. Square 1024×1024.

### L05: Mascot redraw (so he can become a vector)

- **File:** `L05-mascot.png`
- **Size:** 1024×1536 portrait, transparent or pure white background.
- **Upload reference:** `public/brand/original-logo.png` with: *"Redraw only the cartoon man on the left of this logo."*

> Redraw the cartoon businessman from the left side of the attached logo as a clean, high-resolution flat vector-style illustration, keeping him instantly recognisable: same pose (standing three-quarter view, left hand giving a thumbs-up at waist height, right arm extended palm-up as if presenting something to his right), same character (friendly middle-aged man, short neatly combed grey hair, thin rectangular glasses, warm open smile), same outfit (dark navy-blue suit, white shirt, solid red tie, black shoes). Style: crisp flat colour shapes with clean, smooth outlines and at most two tones of shading per colour, like a professional mascot drawn in Adobe Illustrator; no gradients, no texture, no photo realism, no shadow on the ground. Full figure head to toe, centred, generous margin, on a pure white background. No text, no logo, no other objects.

**Check before sending:** same pose and outfit as the original; flat colours only; edges crisp at full size. I trace this into an SVG and drop it into `logo-full-on-dark.svg`.

---

## M. Mark's expressions (one chat, upload the mascot as reference)

The site now uses Mark everywhere a person would talk: the hero, his three-question chat, the review wall, the phone dock. Each moment asks for a mood; until that mood's drawing exists he uses his presenting pose. Send them in this chat; I cut out the white background, name them as below in `public/brand/mark/`, and they appear on the next build.

**How to run:** start one new chat. Upload `docs/brand-explorations/L05-mascot-source.webp` (the redraw you already made). Send the BASE block plus the first pose. For every next pose, send only: *"Same character, same style, same outfit, same proportions. New pose:"* plus the pose line.

**BASE (send with the first pose):**

> This exact cartoon character from the attached image, redrawn in exactly the same flat vector illustration style: same face, grey hair, rectangular glasses, navy suit, white shirt, red tie, black shoes, same line weight and soft cel shading, same proportions. Full body, head to shoes, centred, on a pure white background (#FFFFFF) with no shadow, no floor, no props unless described, no text. Square canvas 1536×1536, the character about 85% of the canvas height. Friendly, warm, trustworthy, a man who buys your car and pays you on the spot.

| File | Mood | Pose line |
|---|---|---|
| `wave.png` | Hello | Waving hello with his right hand raised at shoulder height, palm out, big warm open smile, left hand relaxed at his side. |
| `hello.png` | Listening | Leaning slightly forward, head tilted a little, eyebrows raised, kind attentive smile, both hands clasped loosely in front of his waist. |
| `thinking.png` | Thinking | One hand on his chin, the other arm folded across his chest, eyes glancing up and to the side, a small knowing smile. |
| `thumbs.png` | Got it | Both thumbs up at chest height, eyes closed in a happy grin, shoulders slightly raised. |
| `point.png` | Look at this | Pointing with his whole right arm extended to the right of the frame, index finger out, looking toward where he points, mouth open mid-sentence. |
| `phone.png` | On the phone | Holding a plain black smartphone to his right ear, left hand gesturing open, smiling as if saying good news. The phone screen shows nothing. |
| `cash.png` | Paid | Holding a neat fan of plain green banknotes out toward the viewer with both hands, proud happy smile. The notes show no numbers, faces or text. |
| `celebrate.png` | Done | Both fists raised in celebration, one knee slightly lifted, laughing. |

**Check before sending:** same face and glasses every time, white background, nothing cut off at the feet or hands.

---

## O. Social share image

### O01: Link preview (Facebook, Google, text messages)

- **File:** `O01-share.png`
- **Size:** exactly 1200×630.
- **Upload reference:** your finished **A01**.

> Recompose the attached photograph as a 1200×630 landscape image: same car, same studio, same light. The car sits in the right 50% of the frame, fully visible. The left 45% is dark, calm and empty. Change nothing else. No text.

---

## R. Real photography (an iPhone, not ChatGPT)

These must be real. Shoot on the iPhone's main camera at 1x, in **Portrait mode** where noted, at **golden hour or blue hour** to match the site. Hold the phone level. Send the original files (AirDrop or email; texting compresses them).

| Code | Where | What to shoot |
|---|---|---|
| **R01** | "The Final Word Comes From Mark." (4:5) | **Mark**, waist up, in a plain dark polo or jacket, standing beside his tow truck's cab door or a car he has just bought, body turned slightly, looking at the camera with a calm, confident half smile. Shoot at golden hour with the sun behind and to one side of him, Portrait mode, phone at his chest height. Take 20 frames and send the best three. **This is the single most valuable image on the site.** |
| R02 | Interim tiles, later the About page | A car Mark just bought, on his flatbed, shot low from the rear corner at blue hour with the beacon on. |
| R03 | About page | Mark's hand shaking a customer's hand beside a car (hands only, with the customer's permission). |
| R04 | Footer, Google Business | The front of 8150 W Little York Rd from across the street, daytime, level, the whole frontage in frame. |

**Optional retouch for R01 (only with Mark's approval):** upload his best R01 photo to ChatGPT with: *"Retouch this real photograph without changing the person's face, body, clothing or identity in any way: even out the background into a soft, slightly darker blur, balance the light so it looks like a professional golden-hour portrait, neutral true colours, keep it photorealistic. Do not add or remove anything."* Compare it side by side with the original before using it. If anything about Mark looks different, use the original.

---

## Status

| Code | Image | Status |
|---|---|---|
| A01 | Hero, desktop | Done, on the site |
| A02 | Hero, phone | Done, on the site |
| B01 to B06 | Range tiles | Done, on the site |
| C01 | One Evening: send | Done, on the site |
| C02, C03 | One Evening: call, paid | On the site from the first round, cooled and cropped tall; a 4:5 Night Studio regeneration would replace them |
| D01 | Discover tile: offer | Done, on the site |
| D02 | Discover tile: dealers | Done, on the site |
| E01 | Finale | Done, on the site |
| L01 to L04 | Logo explorations | Three in docs/brand-explorations for Mark to pick; the pick gets redrawn as SVG |
| L05 | Mascot redraw (for vector) | Done: public/brand/mascot.svg, in logo-full-on-dark.svg |
| M: wave, hello, thinking, thumbs, point, phone, cash, celebrate | Mark's expressions | Needed (site falls back to his presenting pose) |
| O01 | Share image | Needed |
| R01 | Mark portrait | Needed (real) |
| R02 to R04 | Real proof | Wanted (real) |

Images go in `public/photos/` named by code; `scripts/sync-photos.mjs` places them on the next build. Until each image arrives, its slot shows either Mark's original photo in black and white (A01, A02, B01, B03, B05, C03) or an empty studio backdrop.
