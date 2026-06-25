import type { Metadata } from "next";
import Appointments from "@/components/appointments";
import Breadcrumbs from "@/components/breadcrumbs";
import { containerClass } from "@/lib/layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aftercare | Moxie Beauty Studio",
  description:
    "How to care for your lash extensions, lash lift & tint, brow lamination, and microblading after your Moxie appointment. Service-specific instructions from Jackie.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/aftercare",
    title: "Aftercare | Moxie Beauty Studio",
    description:
      "Service-specific aftercare instructions for lash extensions, lash lifts, brow lamination, and microblading.",
    images: [
      {
        url: "/images/hero-img.jpg",
        width: 1200,
        height: 630,
        alt: "Moxie Beauty Studio — lash and brow studio in Rochester, WI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aftercare | Moxie Beauty Studio",
    description:
      "Aftercare instructions for lash and brow services at Moxie Beauty Studio.",
    images: ["/images/hero-img.jpg"],
  },
};

const aftercareGroups = [
  {
    num: "I",
    category: "Lash Extensions",
    intro:
      "The most important thing you can do for your lash extensions is keep them clean. Clean lashes hold better, last longer, and stay healthier — it's the single biggest factor in retention.",
    items: [
      {
        heading: "First 24 hours",
        body: "Keep your lashes completely dry. No washing, no steam, no sweating. This gives the adhesive time to fully cure.",
      },
      {
        heading: "48 hours",
        body: "Avoid saunas, steam rooms, hot yoga, and tanning beds. Heat and humidity stress the bond before it's fully set.",
      },
      {
        heading: "Cleaning (ongoing)",
        body: "Wash your lashes every 2–3 days with a lash-safe foam cleanser — we carry them in studio for $20. Apply with a soft brush, rinse gently, and pat dry. Avoid oil-based products anywhere near your eyes.",
      },
      {
        heading: "Sleeping",
        body: "Sleeping on your back extends your lash life significantly. If you're a side sleeper, a silk pillowcase reduces friction.",
      },
      {
        heading: "Makeup",
        body: "Skip mascara entirely — extensions give you that look already, and mascara (especially waterproof) breaks down adhesive. If you do wear eye makeup, use water-based products only and remove gently.",
      },
      {
        heading: "Fills",
        body: "Book fills on schedule to keep your lashes full and healthy. The timing determines your appointment length — 1-week fill (0–9 days): 30 min. 2-week fill (10–18 days): 60 min. 3-week fill (19–27 days): 75 min. Waiting longer means more work at each visit.",
      },
      {
        heading: "What to avoid",
        body: "Oil-based cleansers, makeup removers, and moisturizers near the eyes. Rubbing or pulling your lashes. DIY removal — come in and we'll take them off safely.",
      },
    ],
  },
  {
    num: "II",
    category: "Lash Lift & Tint",
    intro:
      "Your lift is set by a chemical process that takes about 24 hours to fully stabilize. Protecting it during that window — and the 48 hours after — makes the difference between a lift that lasts 6 weeks and one that drops after two.",
    items: [
      {
        heading: "First 24 hours",
        body: "Keep lashes completely dry. No washing, no steam, no humidity. No showers with the water hitting your face, no saunas, no hot yoga. The lift is still setting.",
      },
      {
        heading: "24–48 hours",
        body: "Continue avoiding tanning beds, saunas, and hot yoga through the full 48 hours. These activities generate sustained heat that relaxes the curl before it's locked in.",
      },
      {
        heading: "Mascara",
        body: "You can add mascara after 48 hours if you want it — but most clients find they don't need it. If you do use it, water-based formulas only. Avoid waterproof mascara, which is harder to remove and can stress the lashes.",
      },
      {
        heading: "Ongoing care",
        body: "Use a lash serum or conditioning oil between appointments to keep your natural lashes healthy. The better condition they're in, the better your next lift will hold.",
      },
      {
        heading: "Results",
        body: "Your lift should last 6–8 weeks with proper care. Results vary slightly with natural lash length and texture.",
      },
    ],
  },
  {
    num: "III",
    category: "Brow Lamination",
    intro:
      "Brow lamination reshapes your brow hairs into a set position — the first 24 hours are critical to keeping that shape locked in.",
    items: [
      {
        heading: "First 24 hours",
        body: "Keep brows completely dry and away from heat. No washing your face over them, no sweating, no steam. The shape is still setting.",
      },
      {
        heading: "Brushing",
        body: "Brush your brows upward gently each morning with a spoolie to maintain the direction and shape.",
      },
      {
        heading: "Retinol & exfoliants",
        body: "Avoid retinol, AHAs, and exfoliating products on or near the brow area — they break down the lamination bond and shorten results.",
      },
      {
        heading: "Tint maintenance",
        body: "If your service included a tint, avoid exfoliating the brow area to extend the color. The tint typically fades faster than the lamination.",
      },
      {
        heading: "Results",
        body: "Lamination lasts 6–8 weeks. Regular maintenance appointments keep the shape defined and the hairs conditioned.",
      },
    ],
  },
  {
    num: "IV",
    category: "Microblading",
    intro:
      "Microblading heals in stages over about 6 weeks. The first 10 days are the most important — what you do (and don't do) during healing directly affects how your brows look once they settle.",
    items: [
      {
        heading: "Days 1–10: Healing phase",
        body: "Keep the brow area completely dry and clean. Avoid sweating, swimming, saunas, and direct water contact. No picking, scratching, or rubbing — even when they start to flake (and they will flake; that's normal).",
      },
      {
        heading: "Flaking",
        body: "Some peeling and flaking during healing is completely normal. The color will look lighter or patchy during this stage — don't panic. The final result won't be visible until healing is complete.",
      },
      {
        heading: "What to avoid during healing",
        body: "Sun exposure, retinols, AHAs, exfoliants, and any makeup on the brow area. These can affect how the pigment sets into the skin.",
      },
      {
        heading: "Your 6-week touch-up",
        body: "The touch-up appointment at 6 weeks is required, not optional — it's when we perfect the shape, fill any gaps from healing, and ensure even pigment. Skipping it affects your long-term results.",
      },
      {
        heading: "Long-term care",
        body: "Avoid prolonged sun exposure on the brow area and use SPF when outdoors — UV fades pigment over time. Results typically last 12–18 months with proper care and a touch-up as needed.",
      },
      {
        heading: "Something doesn't look right?",
        body: "Text us within 7 days of your appointment. We'd rather hear about a concern early than have you wait until your touch-up.",
      },
    ],
  },
];

// cSpell:ignore spoolie exfoliants retinol doesn

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function AftercarePage() {
  const container = containerClass;

  return (
    <>
      <main>
        {/* ── Page hero ─────────────────────────────────────────────────── */}
        <section className="pt-14 pb-16 border-b border-(--line-soft)">
          <div className={container}>
            <Breadcrumbs page="Aftercare" href="/aftercare" />

            <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_540px] gap-10 mb-16">
              <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
                The work
                <br />
                doesn&apos;t stop{" "}
                <em className="font-nyght-italic text-(--accent)">here.</em>
              </h1>
              <p className="text-lg text-(--ink-soft) leading-relaxed self-end text-pretty">
                How you care for your lashes and brows at home has a direct
                impact on how long your results last — and how your next
                appointment goes. Find your service below.
              </p>
            </div>

            {/* Jump links */}
            <div className="flex flex-wrap gap-3">
              {aftercareGroups.map(({ num, category }) => (
                <a
                  key={num}
                  href={`#aftercare-${num.toLowerCase()}`}
                  className="font-nyght-bold text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-b-4 border-(--accent)/60 text-(--accent)/80 hover:text-(--accent) hover:border-(--line-soft) hover:bg-(--accent)/10 transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Aftercare sections ────────────────────────────────────────── */}
        {aftercareGroups.map(({ num, category, intro, items }) => (
          <section
            key={num}
            id={`aftercare-${num.toLowerCase()}`}
            className="py-28 border-b border-(--line-soft)"
            tabIndex={-1}
          >
            <div className={container}>
              <div className="grid lg:grid-cols-[380px_540px] justify-between gap-16 mb-12">
                <div>
                  <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                    {num} · {category}
                  </p>
                  <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                    {category}
                  </h2>
                </div>
                <p className="text-(--ink-soft) lg:pt-12 lg:self-end leading-relaxed">
                  {intro}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--line-soft) rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
                {items.map(({ heading, body }) => (
                  <div
                    key={heading}
                    className="bg-(--background)/40 p-7 lg:p-8"
                  >
                    <h3 className="font-nyght text-xl md:text-2xl text-(--foreground) mb-3 text-balance">
                      {heading}
                    </h3>
                    <p className="text-sm text-(--ink-soft) leading-relaxed text-pretty">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── Retail note ───────────────────────────────────────────────── */}
        <section className="py-16 bg-(--bg-soft) border-b border-(--line-soft)">
          <div className={container}>
            <div className="grid lg:grid-cols-[380px_1fr] gap-16">
              <div>
                <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                  In studio
                </p>
                <h2 className="font-nyght text-4xl leading-tight">
                  Products we{" "}
                  <em className="font-nyght-italic text-(--accent)">carry.</em>
                </h2>
              </div>
              <div className="lg:self-center">
                <p className="text-(--ink-soft) leading-relaxed mb-4">
                  We stock lash shampoo kits in studio for $20 — the same foam
                  cleanser we recommend for daily lash care. Clean lashes are
                  the single biggest factor in extension retention, and
                  we&apos;d rather sell you the right product than have you
                  guess at the drugstore.
                </p>
                <p className="text-(--ink-soft) leading-relaxed">
                  We also carry a rotating selection of retail items — candles,
                  tumblers, earrings, and a few other things worth browsing
                  while you&apos;re in. Ask Jackie what&apos;s currently in
                  stock.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Questions note ────────────────────────────────────────────── */}
        <section className="py-16 bg-(--foreground)/90">
          <div className={container}>
            <div className="max-w-2xl">
              <p className="font-nyght text-3xl lg:text-4xl text-(--background)/80 leading-snug mb-5">
                Something doesn&apos;t look right?{" "}
                <a
                  href={siteConfig.contact.smsHref}
                  className="font-nyght-italic text-(--accent) hover:underline underline-offset-4"
                >
                  Text us.
                </a>
              </p>
              <p className="text-(--background) leading-relaxed">
                If anything feels off in the first week after your appointment,
                reach out before your next visit. Lash services come with a
                complimentary adjustment window of 7 days — we&apos;d rather fix
                it early than have you wait.
              </p>
            </div>
          </div>
        </section>

        {/* ── Booking CTA ───────────────────────────────────────────────── */}
        <Appointments context="visit" />
      </main>
    </>
  );
}
