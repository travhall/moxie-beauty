# Moxie Beauty Studio

A performant, accessible marketing site for Moxie Beauty Studio — a brow and lash studio in Rochester, Wisconsin.

## Lighthouse Scores

Measured against the production build (dev scores shown — all metrics 100):

| Metric | Score |
|---|---|
| Accessibility | 100 |
| SEO | 100 |
| Core Web Vitals — LCP | 100 |
| Core Web Vitals — CLS | 100 |
| Core Web Vitals — TBT | 100 |

*Scores audited with Lighthouse + axe DevTools (axe-core 4.11, WCAG 2.1 AA). Dev build JS includes devtools not present in production.*

## Tech Stack

- **Framework**: Next.js 16.2.9 — App Router, React Server Components
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS v4 — OKLCH color space, CSS custom properties
- **Ambient background**: Hand-rolled WebGL mesh gradient (`components/mesh-gradient.tsx`) — raw WebGL1, no Three.js or other shader library, inlined simplex-noise domain warp
- **Fonts**: Mulish (Google) + Nyght Serif family (local, 4 weights)
- **Analytics**: Vercel Analytics
- **Booking**: Square Appointments (embedded iframe)
- **Package Manager**: pnpm

## Project Structure

```
moxie-beauty/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, structured data, skip link
│   ├── globals.css         # Tailwind v4 @theme, design tokens, animation classes
│   ├── page.tsx            # Home page
│   ├── error.tsx           # Branded error boundary
│   ├── not-found.tsx       # Branded 404 page
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   ├── api/square/webhook/ # Square catalog webhook (HMAC-verified)
│   ├── about/
│   ├── aftercare/
│   ├── contact/
│   ├── policies/
│   ├── services/
│   ├── visit/
│   └── style-guide/        # Design system reference (noindex)
├── components/
│   ├── about.tsx
│   ├── appointments.tsx    # Three-breakpoint booking journey section
│   ├── blob.tsx             # WebGL ambient background (Three.js)
│   ├── booking-overlay.tsx  # Full-screen Square booking modal
│   ├── breadcrumbs.tsx      # Per-page breadcrumb nav + JSON-LD
│   ├── button.tsx           # Accessible polymorphic button/link
│   ├── footer.tsx
│   ├── footer-theme-island.tsx
│   ├── hero-section.tsx
│   ├── icons/
│   ├── logo.tsx
│   ├── map.tsx              # Google Maps embed
│   ├── marquee-ticker.tsx
│   ├── navigation.tsx       # Scroll-aware sticky nav, mobile drawer
│   ├── service-card-client.tsx
│   ├── service-rows-client.tsx
│   ├── services.tsx
│   ├── studio-filmstrip.tsx
│   ├── testimonials.tsx
│   └── theme-toggle.tsx
├── context/
│   └── BookingContext.tsx  # Shared booking-overlay open/close state
├── lib/
│   ├── layout.ts           # Shared layout utility (containerClass)
│   ├── site-config.ts      # Single source of truth for business info
│   └── square.ts           # Square API helpers
├── providers/
│   └── theme-provider.tsx
├── scripts/
│   └── sync-catalog-to-sandbox.ts  # pnpm sync-sandbox
└── public/
    ├── fonts/              # Nyght Serif woff2 files
    └── images/
```

## Testing

Unit tests cover pure, logic-bearing functions only — no component rendering
or DOM testing is set up (`vitest.config.ts` runs in a plain Node
environment).

```bash
pnpm test
```

| File | Covers |
|---|---|
| `app/api/square/webhook/route.test.ts` | Webhook HMAC signature validation |
| `lib/square.test.ts` | Price/duration formatting, service grouping |
| `components/studio-filmstrip.test.ts` | Scroll-edge detection for the fade mask |

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm start
```

The public marketing pages need no environment variables — the Square
booking flow uses a public-facing appointments URL configured in
`lib/site-config.ts`. The Square **webhook** endpoint
(`app/api/square/webhook/route.ts`) does require configuration in
production; see `.env.example` for the full list. It fails closed
(rejects requests) if `SQUARE_WEBHOOK_SIGNATURE_KEY` is unset, so set
these in your Vercel project's Environment Variables before relying on
webhook-driven behavior:

| Variable | Used by |
|---|---|
| `SQUARE_ENVIRONMENT` | `lib/square.ts` — `"sandbox"` or `"production"` |
| `SQUARE_ACCESS_TOKEN` | `lib/square.ts` — Square API client |
| `SQUARE_LOCATION_ID` | `lib/square.ts` |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | `app/api/square/webhook/route.ts` — required, fails closed if unset |
| `NEXT_PUBLIC_SQUARE_APP_ID` | client-side Square SDK config |
| `NEXT_PUBLIC_SQUARE_LOCATION_ID` | client-side Square SDK config |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | optional — `components/map.tsx`, see `docs/google-maps-setup.md` |

## Design System

### Color Tokens (OKLCH)

Defined in `app/globals.css` under `@theme inline`. All semantic tokens resolve correctly in both light and dark mode.

| Token | Light mode | Dark mode | Contrast on bg |
|---|---|---|---|
| `--accent` | rose-gold-500 (oklch 54%) | rose-gold-300 (oklch 70%) | 3.5:1 / 7.8:1 |
| `--accent-text` | rose-gold-600 (oklch 42%) | rose-gold-300 (oklch 70%) | 7.6:1 / 7.8:1 |
| `--foreground` | ivory-rose-900 | ivory-rose-50 | — |
| `--ink-mute` | midnite-600 | ivory-rose-200 | 7.3:1 / 7.5:1 |

`--accent` is used for decorative purposes (borders, dots, gradient endpoints, large heading emphasis ≥24px). `--accent-text` is used for any text below 24px that carries semantic meaning — it meets WCAG AA for normal text in both modes.

### Typography

Two-stop responsive scale: base (mobile/tablet) → `lg:` (desktop). Nyght Serif renders ~15% optically smaller than sans-serif — all headings are bumped up to compensate.

| Role | Classes |
|---|---|
| Hero H1 | `font-nyght text-6xl lg:text-7xl` |
| Section H2 | `font-nyght text-5xl lg:text-6xl` |
| About H2 | `font-nyght text-4xl lg:text-5xl` |
| Card H3 | `font-nyght text-xl sm:text-2xl` |
| Blockquote | `font-nyght-italic text-3xl lg:text-4xl` |
| Accent label (eyebrow) | `font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--accent-text)` |

Font tokens: `font-nyght` (Light), `font-nyght-italic` (Light Italic), `font-nyght-bold` (Dark), `font-nyght-bold-italic` (Dark Italic), `font-sans` (Mulish).

### Gradient Text

Brand heading gradient: `bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent`

## Accessibility

- **WCAG 2.1 AA** — verified with Lighthouse and axe DevTools (0 issues)
- **Skip link** — first focusable element on every page, targets `#main-content`
- **Focus rings** — branded rose-gold (`--accent`) outline on all interactive elements via low-specificity `:where()` baseline
- **Keyboard navigation** — full Tab/Enter/Escape support including booking modal focus trap
- **Reduced motion** — `prefers-reduced-motion` strips all CSS transitions/animations; Three.js blob handled separately in JS
- **Color contrast** — all text meets or exceeds WCAG AA; small accent text uses `--accent-text` (7.6:1 light / 7.8:1 dark)
- **Screen readers** — semantic HTML, heading hierarchy, ARIA labels on complex widgets, `aria-hidden` on decorative elements

## SEO

- `BeautySalon` JSON-LD structured data in root layout
- Breadcrumb JSON-LD per inner page
- Per-page `<title>`, `<meta description>`, Open Graph, and Twitter Card
- `sitemap.xml` auto-generated via `app/sitemap.ts`
- `robots.txt` — all pages indexed except `/style-guide`

## Browser Support

Chrome, Edge, Firefox, Safari — latest 2 major versions. Mobile Safari iOS 14+.

## License

Proprietary — All rights reserved by Moxie Beauty Studio.

## Author

Travis Hall — [travishall.design](https://travishall.design)
