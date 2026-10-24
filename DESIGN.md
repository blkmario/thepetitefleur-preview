# DESIGN.md: The Petite Fleur (v3, "the order text")

Documents the world as built in `v3.html` / `v3.css` / `v3.js`. The light (`index.html`) and dark (`dark.html`) versions are earlier alternatives and do not follow this file.

## World
Florist's tissue wrap. Bloom and stem: bougainvillea magenta fields, deep leaf-green type, blush tissue sheets set at slight angles, white paper. The page's job is to write the customer's order text for them.

## Color tokens
| Token | Value | Role |
|---|---|---|
| `--bloom` | `#c2185b` | Header, hero field, message panel, footer |
| `--bloom-deep` | `#9c1149` | Text on white buttons sitting on magenta |
| `--leaf` | `#173f2c` | All type on light grounds, primary buttons, the message bubble, delivery band |
| `--leaf-2` | `#2b5a43` | Hover on green, scrollbar thumb |
| `--blush` | `#fbe3ec` | Tissue sheets, order section ground, secondary text on magenta |
| `--blush-2` | `#f4c9da` | Second tissue tone |
| `--muted` | `#55665d` | Secondary text and placeholders on white (about 6:1) |
| `--line` | `#ecd3dd` | Input and option borders |

Strategy: Full palette, with magenta and green owning whole regions, not used as scattered accents.

## Type
Bricolage Grotesque (Google Fonts, `opsz 12..96`, `wght 300..700`), one family throughout.
- Display: 700, `opsz 96`, tracking -0.035 to -0.04em, line-height 0.92 to 0.98, max 6rem.
- Body: 400, 1.0625rem / 1.55. Labels: 600.
- Prices use `tabular-nums lining-nums`.

## Shape and material
- Paper sheets: radius 3px, rotated -5 to +4 degrees, shadow `0 8px 20px -12px rgb(60 0 25 / .5)`. Used only in the hero (behind the video, and under the headline at -1.5deg). The gallery grid is too tight for sheets; they read as slivers there.
- Photos and cards: radius 14px (`--radius`).
- Controls: pills (999px) for buttons and the segmented switch; 12px radius for inputs and option cards. Inputs are 16px text so iOS doesn't zoom.

## Components
- **Order builder:** Subscription/Event switch (sliding leaf thumb, 260ms ease-in-out), plan cards with prices, color chips with conic swatches, date/guest/location fields, a ZIP field shown only for "Ship it".
- **Message preview:** magenta panel with a white thread and a leaf bubble that settles in 180ms when the message changes. Actions: Send as a text (sms: link), Copy message, Call instead.
- **Mobile dock:** "Text to order" and "Call"; the first becomes "Send this text" while the builder is on screen.
- **Video:** every looping video has a pause toggle and plays only while visible; it never autoplays under reduced motion.

## Motion
- One authored arrival: the headline, copy and media rise, and the two tissue sheets rotate into their wrap (1100ms, `cubic-bezier(0.23, 1, 0.32, 1)`).
- Everything else is fast feedback: buttons scale 0.97 over 140ms, color changes take 150ms, and hover effects only apply on devices with a real pointer.
- Reduced motion: no transforms, and videos stay paused.

## Browser surfaces
Selection is leaf on blush. Focus is a 2px leaf outline, white on magenta areas. The caret is bloom, the input accent is leaf, and the scrollbar is leaf-2 on blush.
