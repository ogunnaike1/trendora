# Handoff: Trendora Storefront (Next.js)

## Overview
Trendora is a premium home-accessories e-commerce brand. This bundle covers the prototype of the Home page, Shop/Wishlist listing, Product detail, and Cart drawer. Target implementation: **Next.js (App Router) + TypeScript + Tailwind CSS**, per the original brief.

## About the Design Files
`Trendora.dc.html` and `ProductCard.dc.html` are **design references built in HTML** — prototypes of intended look and behaviour, not production code to copy. Recreate them in the Next.js codebase using its patterns. (They are "Design Component" files: markup in the first block, logic in a `<script data-dc-script>` class; read them as annotated source.)

## Fidelity
**High-fidelity** for colours, type, layout, motion timing and copy. **Placeholders**: all photography is striped placeholder tiles — replace with licensed interior photography (Unsplash/Pexels) via `next/image`.

## Design Tokens
Colours (define as CSS variables + Tailwind tokens; no hardcoded hex elsewhere):
- `--white` #FFFFFF (primary background)
- `--stone` #EAE7E0 (alternate section bg, footer text)
- `--slate` #405B70 (ink/text, buttons, footer, dark sections)
- `--mist` #8296A5 (accent: italic headings, hover, progress bar, rules)
- Button hover dark: #2E4252
- Product placeholder tones: `oklch(L 0.035 245)`, L 0.32–0.8
Type: headings **Instrument Serif** (400, tight tracking −.02 to −.03em); body **Hanken Grotesk** (300/400/500) via `next/font/google`. Labels: 11–12px uppercase, letter-spacing .16–.24em.
- Hero H1 `clamp(56px,10vw,150px)` line-height .92; section H2 `clamp(44px,7vw,104px)` / `clamp(34px,4.5vw,64px)`; product title `clamp(44px,5vw,72px)`; body 15–17px/1.6–1.7.
Spacing: page gutter `clamp(20px,4vw,56px)`; section padding-block `clamp(70px,10vw,150px)`. Radius 0 (circles only for colour swatches). Shadows none. Borders 1px hairline.
Glass: `background rgba(255,255,255,.1–.5); backdrop-filter: blur(18px) saturate(1.3); border 1px rgba(255,255,255,.3)`.
Easing everywhere: `cubic-bezier(.76,0,.24,1)`; animate only transform/opacity/clip-path.

## Screens / Views

### Global: Announcement + Header
- Fixed. Announcement bar: slate bg, white 11px uppercase text, "Complimentary delivery on orders over $150 · New season now available".
- Header 68px, 3-col grid `1fr auto 1fr`: **TRENDORA** wordmark top-left (34px serif, .14em tracking); nav centred (Home, Shop, New, Collections; 12px uppercase); right: "Wishlist (n)", "Bag (n)".
- Over hero: transparent/glass white .08, white text. After 60px scroll: glass white .62, slate text, 1px slate bottom border. Hides on scroll down, shows on scroll up (translateY −110%, .6s).
- 2px scroll-progress bar (mist) at very top.

### Home (/)
1. **Hero carousel** (100svh, min 640): 4 slides — "The Quiet Living Room" / "Make room for better living."; "Evening Light" / "Light, held low and warm."; "Table Rituals" / "Set the table slowly."; "New Season Textures" / "Wool, linen, and clay." Each: full-bleed photo, bottom gradient, collection label `0N — Label`, headline with per-line mask reveal (translateY 110%→0, 1.1s, stagger .15s from .45s), subtext (max 440px), CTAs "Shop collection" (filled white) and "Explore" (outline white; scrolls to story). Text sits in a glass panel bottom-left. Transition: clip-path wipe `inset(0 0 0 100%)→inset(0)` 1.3s + 9s linear Ken Burns scale 1→1.1. Controls bar (glass): counter `01 / 04`, 4 hairline progress bars (active fills over 6.5s), Pause/Play, ← → 44px square buttons. Autoplay 6.5s; pauses on hover, hidden tab, user pause; ←/→ keys. Add swipe/drag (Embla). Reduced motion: no autoplay, crossfade.
2. **Marquee**: stone bg, 12px uppercase, "Complimentary delivery • Handpicked pieces • Easy 30-day returns • Made in small batches", 40s linear loop.
3. **Shop by category**: H2 "Shop by *category*" + 300px intro. 12-col grid, 16px gap, 5 asymmetric tiles (cols 1/5, 6/3, 9/4, 2/4, 7/5; staggered margin-top 0/90/30/0/−60px; ratios 4/5, 3/4, 4/5, 1/1, 5/4) — Lighting, Vases, Textiles, Candles, Tableware. Glass label chip on image; row below: serif 28px name + "n pieces →" with 1px slate bottom border. Links to `/shop?category=`.
4. **Bestsellers** "The considered edit": 4-up product grid (min 240px, gap 40/20), header with bottom hairline + "View all →".
5. **Brand story** (stone bg): left 6 cols — 4/5 image masked-reveal + small square image (46% width, 10px stone border, parallax −0.14) overlapping bottom-right; right glass panel (cols 7–12, −6% margin overlap): label "Our philosophy", H2 "Objects that make a space feel like *yours.*", paragraph, two counters (42 Partner studios; 100% Natural materials) counting up on view.
6. **Shop by room**: slate bg, 340vh tall, inner sticky 100vh; cards (3/4, width clamp(220,24vw,360)) in a horizontal track translated by scroll progress (pinned horizontal scroll). Rooms: Living Room, Bedroom, Dining Room, Kitchen, Home Office, Bathroom; alternating 0/60px offsets; glass caption `01 / name`.
7. **New arrivals**: "New *arrivals*" + product grid (badge "New") + "See all new →".
8. **Feature banner**: 90vh (max 780), parallax background (0.22), glass text panel: "The Autumn Collection" / "The art of a *considered* home." / CTA "Explore the collection".
9. **Testimonials**: 3 columns, top hairline, serif 26px quotes (Imogen R. — London; Daniel K. — Berlin; Sofia M. — Lisbon), middle one offset 40px.
10. **Newsletter** (stone): H2 "A little inspiration for your space." + underline email input + "Subscribe →"; validates `^\S+@\S+\.\S+$`; toasts "Thank you — welcome to Trendora" / "Please enter a valid email".
11. **Social grid**: "@trendora.home" + "Follow →"; 6 square tiles.
12. **Footer** (slate): giant wordmark, description, columns Shop / Service / Trendora, bottom bar © 2026 + payment methods.
- Section bg crossfades (white ↔ stone, .9s) based on section under viewport midpoint. Grids/headings fade-up with stagger (48px, 1–1.2s, .09s steps) via IntersectionObserver.

### Shop (/shop) and Wishlist (/wishlist)
Title (H1 up to 128px, "All objects" / category / "New arrivals" / "Wishlist"), piece count, hairline. Filter chips (All, Lighting, Vases, Textiles, Wall Decor, Tableware, Candles; active = filled slate), sort select (Featured, Price low–high, high–low). Grid min 250px, gap 48/20. Empty wishlist: "Nothing here yet. Browse the shop." Still to add for production: price/colour/material filters, grid toggle, load more.

### Product (/products/[slug])
Breadcrumb; 2-col (auto-fit 320px, gap up to 80px). Left: 72px thumb column + 4/5 main image (4 images). Right (max 520px): category label, H1, price + ★ rating (count), description, colour swatches (34px circles, active 1px outline offset 3px), quantity stepper + "Add to bag — $total" (slate, hover #2E4252) + wishlist square 52px, stock line, accordions (Details; Materials & dimensions; Shipping & returns; animated `grid-template-rows 0fr→1fr` .6s). Below: "You may also like" 4-up. Add: reviews, recently viewed, zoom.

### Product card (reusable)
4/5 image; hover (1.2s) scale 1.05 + second image crossfade (.7s); glass badge top-left; glass heart (♡/♥) top-right; glass "Quick add" bar slides up (translateY 101%→0, .6s). Below: serif 22px name + 11px uppercase category left, price 14px right. Click image/name → product.

### Cart drawer (also needed as /cart)
Right drawer 440px (full width mobile; use bottom sheet on mobile), glass white .72, slides in .7s; scrim slate .45. Header "Your bag (n)" + Close. Lines: 84px thumb, serif name, colour, − qty +, line total, Remove. Footer: Subtotal, Delivery (Complimentary ≥ $150 else $12; note "Add $X for complimentary delivery"), Total (serif 24px), Checkout button.

### Toast
Bottom-centre glass slate; 2.2s; messages: "Added to bag", "Saved to wishlist", "Removed from wishlist".

## State Management (Zustand, persisted to localStorage)
`cart: {productId, color, qty}[]` (merge on same id+color), `wishlist: id[]`, `cartOpen`, `toast`. Derived: count, subtotal, shipping, total. Local UI: hero index/progress/paused, shop category/sort/onlyNew, product colour/qty/image/accordion.

## Data model (/data/products.ts)
`id, slug, name, category, price, salePrice?, colors[], materials, dimensions, description, badge?, rating, reviewCount, stock, images[], isNew, featured, createdAt`. 12 prototype products: Arca Vase 89, Lumen Table Lamp 189 (New), Soma Cushion 64, Orbit Wall Mirror 245 (New), Tala Candle 42, Mesa Serving Bowl 76 (New), Fold Floor Lamp 329, Nube Throw 148 (New), Duna Planter 58, Linea Print Set 95, Pilar Candlesticks 68, Oro Dinner Plates 112. Extend to 24+, 6 categories. Prepare Supabase tables: products, categories, collections, profiles, wishlist, orders, order_items (+RLS).

## Not in the prototype (build per original brief)
Routes: categories/[slug], collections, search overlay, checkout (RHF+Zod, Stripe-ready), order-confirmation, account/login/register, about, contact, FAQ, shipping, returns, privacy, terms, 404/loading. SEO metadata, sitemap, robots, product JSON-LD. Lenis, GSAP ScrollTrigger (prototype uses vanilla IntersectionObserver + rAF), page transitions, custom cursor.

## Animations summary
Fade-up stagger; masked image reveal (`clip-path inset(0 0 100% 0)→0`, 1.5s); parallax via translate3d on scroll; pinned horizontal scroll; count-up 1.6s ease-out cubic; marquee; progress bar. All respect `prefers-reduced-motion`.

## Assets
No real images. Use `next/image` with `sizes` + blur placeholders; first hero image `priority`. Fonts via `next/font/google`.

## Files
- `Trendora.dc.html` — full prototype (template + logic)
- `ProductCard.dc.html` — product card component
