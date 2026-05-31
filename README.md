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

- **Framework**: Next.js 16.2.6 — App Router, React Server Components
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS v4 — OKLCH color space, CSS custom properties
- **3D / WebGL**: Three.js + simplex-noise — ambient blob background
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
│   ├── sitemap.ts          # Auto-generated sitemap.xml
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
│   ├── blob.tsx            # WebGL ambient background (Three.js)
│   ├── booking-overlay.tsx # Full-screen Square booking modal
│   ├── button.tsx          # Accessible polymorphic button/link
│   ├── footer.tsx
│   ├── footer-theme-island.tsx
│   ├── hero-section.tsx
│   ├── logo.tsx
│   ├── marquee-ticker.tsx
│   ├── navigation.tsx      # Scroll-aware sticky nav, mobile drawer
│   ├── service-card-client.tsx
│   ├── service-rows-client.tsx
│   ├── services.tsx
│   ├── testimonials.tsx
│   └── theme-toggle.tsx
├── lib/
│   ├── layout.ts           # Shared layout utility (containerClass)
│   ├── site-config.ts      # Single source of truth for business info
│   └── square.ts           # Square API helpers
├── providers/
│   └── theme-provider.tsx
└── public/
    ├── fonts/              # Nyght Serif woff2 files
    └── images/
```

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm start
```

No environment variables required for the public site. Square booking uses a public-facing appointments URL configured in `lib/site-config.ts`.

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
