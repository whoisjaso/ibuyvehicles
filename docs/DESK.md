# Mark's Desk (the buy desk)

Handle A Sale's architecture on the buy side: every car Mark might buy is one
record, one question per screen, nothing typed twice, "done" computed and
never stored, documents voided and refiled but never deleted, and no fact
ever guessed.

## What it does
- **Leads land on their own.** The online estimate and Mark's chat ("Have Mark Call Me") create a buy with everything the seller already answered. A repeat from the same phone or VIN lands on the open buy instead of a duplicate.
- **Real people only.** Honeypot, a time trap, a per-IP rate limit, a US phone check (no 555-01xx, no keyboard mashes), name cleaning, then the human check: the first step is Mark reaching them.
- **Today** ranks what needs him: new leads with a waiting timer (red after 5 minutes), offers to make, follow-ups after 20 hours, today's pickups, review asks 2 hours after pickup, transfer reminders after 2 days. Plus the week's numbers by channel.
- **The corridor:** reached → car → condition → title (with sourced Texas notes per route, and [Not set] where Mark's own rule is needed) → offer → yes / thinking / no (lost reason) → pickup → seller's ID read by a person → bill of sale filed → signed on the seller's phone → paid → on the truck.
- **Texts** are pre-written from the record and open in Mark's own Messages app from his number. Nothing sends without his tap. No text promises a price in writing.
- **Bill of sale:** Mark's purchase paper in the brand. Missing facts print as yellow [Not set] and block filing. The seller signs at a one-time link; the pad unlocks only after scrolling to the end. Paying a different amount than the signed paper is refused until it is voided and refiled, with the reason on record.

## Hand steps (Mark or Jason)
1. **Create Mark's own Supabase project** (not another business's) and run `supabase/migrations/20261016120000_buy_desk.sql` in its SQL editor.
2. **Set these on the host (Vercel):**
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - `DESK_PASSCODE` (Mark's passcode, 6+ characters)
   - `DESK_SESSION_SECRET` (`openssl rand -base64 48`)
   - `BUSINESS_LEGAL_NAME` (as on the bill of sale) and `BUSINESS_SIGNER_NAME` (Mark's full legal name)
3. Mark signs in at **/desk**.
4. Answer the open questions in `content/claims-to-verify.md` (licence type and number decide the no-title routes on the desk).

Without the database the desk shows a setup notice and stores nothing in production, so no seller's details are ever lost. Locally it keeps buys in `.data/desk.json` (gitignored).

## Later
- Supabase Auth email codes instead of the passcode (no screen changes).
- Twilio: instant reply to new leads, verification codes, automatic follow-ups (needs a business number and US A2P registration).
- Photo uploads (ID, title, car) to a private bucket.
- Resale side (the full Handle A Sale sell desk) if Mark retails cars under a dealer licence.
