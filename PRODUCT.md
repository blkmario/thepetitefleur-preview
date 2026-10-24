# The Petite Fleur

Miami florist. "Curated Florals, Beautifully Delivered." Instagram: @thepetitefleurmiami. Phone: (305) 904-5754.

## Offer
- Flower subscriptions: Weekly $80–$120+, Biweekly $150–$320+, Monthly $350–$750+ (varies with size and flowers). Unit (per delivery vs per month) not yet confirmed by the client.
- Event florals: call for pricing.
- Delivery: local Miami, plus shipping to all U.S. states, including Hawaii and Puerto Rico.

## How customers order
Phone call or text first. Online payment wanted; Stripe Payment Links go in `PAY_LINKS` in index.html once the client has an account.

## Brand
Client brief: minimalist, clean, easy to navigate. Both paths (subscribe / plan an event) have equal weight.
v1 (index.html): bougainvillea #a8245c accent, Italiana wordmark, Hanken Grotesk. v3: see DESIGN.md.

## Stock stand-ins (replace before launch)
Everything in `assets/stock/` is free Pexels media standing in for the client's shoot. Showing it as her work at launch would mislead customers.
- Hero video: Pexels video 8997553 (bridal bouquet)
- Gallery video: Pexels video 8745445 (peonies)
- Photos: Pexels 12074474 (events), 5409700 (about), 931167 and 12615497 (gallery)
- Dark version (dark.html): plumeria video Pexels 34363826; photos 16046256 (lily), 31265550 (ranunculus), 13235299 (orchid), 2362699 (gerbera), 30739526 (frangipani)

## Two versions for the client to choose
- index.html: light, minimal (matches the client's "minimalist, clean" brief)
- dark.html: dark editorial, modeled on the look of floria-landing-page.vercel.app
- v3.html: built with the Impeccable skill; magenta/leaf-green "tissue wrap" world with an order builder that writes the order text. Design system in DESIGN.md.

## Pending from client
- Photo shoot (swap the files in `assets/stock/` for her own and update the paths)
- Bio / About section
- Email address, logo
- Stripe account for online payment

## Copy rules
- Don't promise online payment until Stripe links exist (the builder says "we'll reply to confirm the details and how to pay").
- Don't claim same-day delivery or specific event types (weddings, corporate) until the client confirms them.
