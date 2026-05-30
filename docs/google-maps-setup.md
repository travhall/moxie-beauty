# Google Maps — Contact Page Setup

The contact page currently shows a styled decorative placeholder (grid + pulsing dot). This doc covers how to replace it with a real, brand-styled embed when ready.

---

## What Jackie needs to provide / set up

1. A **Google account** (personal or a dedicated `hello@moxiebeautystudiowi.com` Google Workspace account)
2. Access to **Google Cloud Console** — Jackie can create a free project at [console.cloud.google.com](https://console.cloud.google.com)
3. A **Maps JavaScript API key** — created inside that project (free tier is very generous; a single-location site will never hit billing)

---

## Options, from simplest to most custom

### Option A — Basic iframe embed (no API key, no brand styling)

Google provides a free, no-key embed URL from [maps.google.com](https://maps.google.com). Search for the address, click Share → Embed a map, copy the `<iframe>` src URL.

**Pros:** Zero setup, zero cost, zero maintenance.  
**Cons:** Google's default color scheme — light blue/gray, no dark mode, no brand customization.

Use this if the goal is just "show the real map location" quickly.

---

### Option B — Maps JavaScript API with custom styling (recommended)

Gives full control over map colors — background, roads, labels, markers — so the map can match the site's dark ivory/rose-gold palette.

**Setup steps:**

1. Jackie creates a Google Cloud project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the **Maps JavaScript API** in the project's API Library
3. Create an API key: APIs & Services → Credentials → Create Credentials → API Key
4. **Restrict the key** (important): under Key Restrictions, set Application Restrictions to "HTTP referrers" and add:
   ```
   moxiebeautystudiowi.com/*
   *.moxiebeautystudiowi.com/*
   localhost:3001/*
   ```
5. Add the key to the project as an environment variable:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...
   ```

**Map styling:**

Use [Google Maps Platform Styling Wizard](https://mapstyle.withgoogle.com/) or the newer [Cloud-based Map Styling](https://console.cloud.google.com/google/maps-apis/studio) to create a custom style. Target colors:

| Element | Color |
|---|---|
| Map background / land | `#1a0a08` (matches `--ivory-rose-900`) |
| Roads | `#2e1208` |
| Road labels | `#c4956a` (matches `--rose-gold-300` / `--accent` in dark mode) |
| Water | `#120605` |
| Parks | `#1f0d09` |
| Labels | `#d4b896` |

Export the style JSON from the wizard and pass it as the `styles` array to the `google.maps.Map` constructor.

---

### Option C — Mapbox with OpenStreetMap (no Google account needed)

[Mapbox](https://mapbox.com) offers a generous free tier and excellent dark-mode map styles. No Google account needed. Requires a Mapbox public token (also free for this scale).

Good fallback if the Google setup is a blocker.

---

## Implementation

When the API key is ready, replace the placeholder `<a>` block in `app/contact/page.tsx` (the `{/* ── Map placeholder ── */}` section) with a new client component — something like `components/map.tsx` — that initializes the Google Maps JS API with the custom style JSON.

The marker should be placed at:
- **Lat:** 42.7402° N  
- **Long:** -88.2229° W  
- **Address:** 402 S Front St, Rochester, WI 53167

Keep the existing decorative placeholder until the component is ready — it already links to Google Maps and serves as a functional fallback.
