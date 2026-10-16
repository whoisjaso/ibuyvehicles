# iBuy Vehicles: Image Brief

These are the ChatGPT image prompts for the new site. Run each one, send back the files, and Claude places them: it resizes the image, sets the focal point, takes desktop and phone screenshots, and marks the row done below.

**Status:** 0 of 18 done. Until an image arrives, its slot shows a drawn stand-in (dark studio gradients in the logo's red and blue).

## The two rules

1. **Generated images set the mood, nothing more.** They can be the hero, a banner or a card background. They must never be passed off as a car Mark actually bought, his lot, Mark himself, or a customer. The "Real Cars. Real Driveways." strip and the "Meet Mark" portrait are **real phone photos only**.
2. **No text, logos, badges or plates** in any generated image. Text in AI images looks fake and can't be edited. The site puts the words on top.

## House style (paste at the end of every prompt)

> Photorealistic automotive campaign photograph, the quality of a Porsche or Tesla launch film still. Houston, Texas at blue hour just after sunset: deep navy sky, warm sodium streetlights, wet asphalt with long reflections. One accent of signal red light and one of cobalt blue light somewhere in the frame (taillights, a neon reflection, a light bar). Shot on a full-frame cinema camera, 35mm lens, f/2, low eye level, shallow depth of field, subtle film grain, rich contrast, crushed but detailed blacks. No text, no words, no logos, no brand badges or emblems on any vehicle, no license plate characters, no watermarks. No people unless described.

## Using Mark's real photos as references (image-to-image)

ChatGPT can take a real photo and re-shoot it as a campaign image. Upload the reference and paste the prompt. The reference photos are in this repo under `public/photos/`, and the originals are on the current ibuyvehicles.com.

These results are **mood images**. They go in the hero, the banners and the finale, never in the "Real Cars" strip.

---

## 0. HERO (most important, do this first)

**Slot:** `hero` · **Shape:** 16:9, 2560×1440 or larger · **File:** `00-hero.png`
**Reference to upload:** `real-tow.webp` (the red car being hooked to a tow truck)

> Use the uploaded photo only as a reference for the subject: a tired, everyday sedan being loaded onto a flatbed tow truck. Re-shoot it as a cinematic campaign photograph. A clean white flatbed tow truck sits on the RIGHT 55% of the frame, three-quarter rear view, its bed tilted down at an angle with a slightly dusty silver four-door sedan halfway up the ramp, winch cable taut. The truck's amber beacon glows softly and its red taillights reflect in the wet street. Behind them, the downtown Houston skyline is softly out of focus, with bokeh city lights. The LEFT 45% of the frame is calm and dark: empty wet asphalt and deep navy sky with no objects, leaving clear room for a large headline. The horizon sits low, about one third up from the bottom. Mood: relief and momentum, the moment a problem gets solved. [HOUSE STYLE]

**Then make the phone version from the same image:**
**Slot:** `heroMobile` · **Shape:** 9:16, 1440×2560 · **File:** `00b-hero-mobile.png`

> Edit this image into a vertical 9:16 composition. Keep the same tow truck, sedan, light and skyline. Place the truck and sedan in the LOWER-RIGHT half of the frame and extend the dark navy sky and empty wet street above and to the left, so the top 55% of the frame is calm and dark with room for text. Change nothing else.

---

## 1. JOURNEY BACKDROP (optional; the animated drawing already works)

**Slot:** `journey` · **Shape:** 16:9 · **File:** `01-journey.png`

> A white flatbed tow truck carrying a silver sedan drives away from the camera down an elevated Houston freeway at night. Long-exposure light trails in red and white stream past on both sides. The truck is small in the center-right of the frame. The overpass curves into the distance toward a softly lit skyline. Wide, quiet, cinematic. [HOUSE STYLE]

---

## 2–7. "WHICH ONE IS YOU?" CARDS (six, portrait 4:5)

Make these as a matched set: same light, same grade, same lens. After the first one, upload it with each of the others and say "Match the light, color grade and lens of this image." Text sits at the bottom of each card, so keep the bottom third darker and simpler.

**2. The rent is due** · Slot `rent` · 4:5 · `02-rent.png`
> Close-up still life on a worn wooden kitchen table at night, lit by one warm pendant light: a single car key with a plain black fob (no logo) rests on top of a small stack of unopened envelopes, a phone face-down beside them. Through the window behind, out of focus, the red taillights of a car parked outside glow faintly. Quiet tension, not despair. The bottom third falls into shadow. [HOUSE STYLE]

**3. It hasn't moved in months** · Slot `sitting` · 4:5 · `03-sitting.png`
**Reference to upload:** `real-impala.webp`
> Using the uploaded photo as a reference for the car and setting, re-shoot it as a moody campaign image: a grey four-door sedan parked in a suburban Houston driveway at dusk, covered in a fine layer of dust and fallen live oak leaves, one front tire visibly flat, a garage door behind it. A single warm porch light. Low angle from the front three-quarter. Stillness: it's been sitting for a long time. The bottom third falls into shadow. [HOUSE STYLE]

**4. The title is gone** · Slot `title` · 4:5 · `04-title.png`
> Top-down still life on a dark slate surface: an empty, open manila folder, a car key, a driver's license-shaped blank card (no text, no photo) and a pen, lit by a narrow beam of cool light from the upper right. One corner of the folder glows faintly blue. Minimal, graphic, premium. The bottom third falls into shadow. [HOUSE STYLE]

**5. The repair costs more than the car** · Slot `repair` · 4:5 · `05-repair.png`
**Reference to upload:** `real-charger.webp`
> Using the uploaded photo as a reference for the car and the garage, re-shoot it as a dramatic campaign image: a red four-door muscle sedan with its hood open inside a dim mechanic's bay, a single work light hanging from the hood casting hard shadows on the engine, faint steam rising, tools on the floor. Shot from a low front three-quarter angle. The feeling: this is the moment you decide to stop paying for it. The bottom third falls into shadow. [HOUSE STYLE]

**6. I already have an offer** · Slot `offerInHand` · 4:5 · `06-offer-in-hand.png`
> A hand holding a smartphone at night, the screen glowing but completely blank white (no text, no interface). Behind it, softly out of focus, a parked silver SUV under a streetlight. Rim light on the hand in cobalt blue, warm light from the screen on the fingers. Only the hand and wrist are visible. The bottom third falls into shadow. [HOUSE STYLE]

**7. I'm a dealer** · Slot `dealerCard` · 4:5 · `07-dealer-card.png`
> A single used sedan sitting alone at the far end of an otherwise empty used-car lot at blue hour, string lights overhead, a small blank price sticker on the windshield (no numbers), puddles reflecting the lights. Lonely, overlooked. Shot from a distance with a long lens. The bottom third falls into shadow. [HOUSE STYLE]

---

## 8. DEALER BANNER

**Slot:** `dealer` · **Shape:** 16:9 (also crops to 4:5) · **File:** `08-dealer.png`

> A row of six assorted used cars, SUVs and pickups parked nose-out on a small Houston dealer lot at blue hour, shot from a low angle at the end of the row so they recede into the distance. Overhead lot lights create pools of light on the wet pavement. A white flatbed tow truck is backing into the frame on the right edge, its amber beacon glowing. The left third is darker and quieter. [HOUSE STYLE]

## 9. "ALREADY HAVE AN OFFER?" BANNER

**Slot:** `offer` · **Shape:** 16:9 (also crops to 4:5) · **File:** `09-second-look.png`
**Reference to upload:** `real-jeep.webp`

> Using the uploaded photo as a reference for the vehicle, re-shoot it as a campaign image: a silver two-door off-road SUV with a cracked windshield parked alone under a single streetlight in an empty lot at night, shot from a low front three-quarter angle. A cone of warm light falls on the vehicle. A red neon reflection glows on the wet ground. The top and bottom of the frame are dark. Mood: a second look. [HOUSE STYLE]

## 10. FINALE ("It could be cash by tonight")

**Slot:** `finale` · **Shape:** 16:9, 2560×1440 · **File:** `10-finale.png`

> A close, cinematic shot of two hands mid-handshake beside the open driver door of a silver sedan at golden-to-blue-hour transition. One hand holds a folded stack of US dollar bills (realistic, not readable). A white flatbed tow truck is softly out of focus in the background with its amber beacon on. Only hands, wrists and sleeves are visible: a work jacket on one side, a casual shirt on the other. Warm, relieved, done. The center of the frame is darker for a headline. [HOUSE STYLE]

## 11. SOCIAL SHARE IMAGE

**Slot:** social preview (wired into the page metadata when it arrives) · **Shape:** 1200×630 · **File:** `11-og.png`

> Edit image 00 (the hero) into a 1200×630 landscape crop with the tow truck and sedan on the right half and dark, empty space on the left half. Change nothing else.

---

## REAL PHOTOS (not ChatGPT: a phone and five minutes)

These have to be real. Shoot them on an iPhone in the main camera's 1x mode, landscape unless noted, in daylight or just before sunset.

| # | Slot | What to shoot |
|---|---|---|
| R1 | `mark` (portrait, 4:5) | **Mark**, waist up, standing beside his tow truck or a car he just bought, looking at the camera with a calm, confident half-smile. Golden hour, sun behind him and to one side. Shoot it in Portrait mode. This is the most valuable photo on the site: people sell to a person. |
| R2–R5 | `realTow`, `realJeep`, `realImpala`, `realCharger` | Newer, sharper versions of real pickups: the car on the truck, the driveway before pickup, cash changing hands (hands only), the truck arriving. Ask the customer before photographing them or their home. |
| R6 | Lot / building | The front of 8150 W Little York from across the street, so people know they're at the right place. |

The current real photos came off the old site and are low resolution. They work, but R2–R5 will sharpen that section a lot.

---

## Done and live

_(Claude updates this list as images arrive.)_

- None yet.
