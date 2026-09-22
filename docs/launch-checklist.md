# Moxie Beauty Studio — Launch Checklist

For Jackie. No code knowledge needed.

---

## ✅ Already done

- **Domain** — `moxiebeautystudiowi.com` is live and pointing to the site
- **Booking** — Square booking overlay is wired up and working
- **Services** — Pulled live from your Square catalog
- **All pages** — Home, Services, About, Visit, Contact, Aftercare, Policies
- **SEO** — Google will find and index the site correctly
- **Security** — Standard web security headers in place
- **Light / dark mode** — Switches with system preference, toggle in footer
- **Accessibility** — 100/100 Lighthouse accessibility score

---

## ⬜ One thing left — Google Maps on the Contact page

The contact page currently shows a styled placeholder instead of a real map. Everything else on the page (address, phone, hours, directions link) is correct — this is just the visual map embed.

### What you need to do

1. **Go to** [console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with any Google account (your personal Gmail is fine, or use `hello@moxiebeautystudiowi.com`)

2. **Create a project**
   - Click the project selector at the top → "New Project"
   - Name it anything, e.g. "Moxie Beauty Studio"
   - Click Create

3. **Enable the Maps JavaScript API**
   - From the left menu: APIs & Services → Library
   - Search "Maps JavaScript API" → click it → click Enable

4. **Create an API key**
   - APIs & Services → Credentials → Create Credentials → API Key
   - Copy the key — it starts with `AIza`

5. **Restrict the key** (important — prevents misuse)
   - Click "Edit API Key" on the key you just created
   - Under "Application restrictions" → select "HTTP referrers (websites)"
   - Add these two entries:
     ```
     moxiebeautystudiowi.com/*
     *.moxiebeautystudiowi.com/*
     ```
   - Under "API restrictions" → Restrict key → select "Maps JavaScript API"
   - Click Save

6. **Send the key to Travis**
   - That's it on your end. Send the `AIza...` key and Travis will add it to the site — the map will go live on the next deploy.

### Cost?

Google Maps has a free tier of $200/month in credits. A single-location marketing site with normal traffic will never come close to that. You won't be charged unless you add billing and exceed the free tier, which won't happen here.

---

## ⬜ Square webhook URL (confirm with Travis)

Once the domain was finalized, the Square webhook URL needed updating to:
```
https://moxiebeautystudiowi.com/api/square/webhook
```
This keeps your service catalog in sync when you make changes in Square. Travis can verify this is set correctly in the Square Dashboard under Developers → Webhooks.

---

## After the map goes live — you're done 🎉

Everything else is handled automatically:
- **Catalog updates** — change a service name or price in Square and the site updates within an hour
- **Bookings** — managed entirely through your Square Appointments dashboard
- **Analytics** — basic visitor stats visible in your Netlify dashboard

---

*Questions? Contact Travis.*
