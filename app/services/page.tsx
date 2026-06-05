import type { Metadata } from "next";
import Appointments from "@/components/appointments";
import MarqueeTicker from "@/components/marquee-ticker";
import ServiceCardClient from "@/components/service-card-client";
import { containerClass } from "@/lib/layout";
import {
  getSquareServices,
  formatPrice,
  formatDuration,
  lowestPrice,
  primaryDuration,
  primaryVariationId,
  groupServices,
  type SquareService,
} from "@/lib/square";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Services | Moxie Beauty Studio",
  description:
    "Explore Moxie Beauty Studio's full range of lash and brow services — eyelash extensions, lash lift & tint, brow lamination, and more.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/services",
    title: "Our Services | Moxie Beauty Studio",
    description:
      "Lash extensions, lash lift & tint, brow lamination, and more — by appointment in Rochester, WI.",
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
    title: "Our Services | Moxie Beauty Studio",
    description:
      "Lash extensions, lash lift & tint, brow lamination, and more.",
    images: ["/images/hero-img.jpg"],
  },
};

// ── Live service helpers ──────────────────────────────────────────────────────

/** Build meta string array from a live Square service. */
function squareMeta(svc: SquareService): string[] {
  const price = lowestPrice(svc.variations);
  const duration = primaryDuration(svc.variations);
  const meta: string[] = [];
  meta.push(price != null ? `From ${formatPrice(price)}` : "Ask us");
  if (duration != null) meta.push(formatDuration(duration));
  return meta;
}

// ── Hardcoded fallback data ───────────────────────────────────────────────────

const FALLBACK_BROW = [
  {
    num: "01",
    name: "Brow Lamination & Shape",
    desc: "Beautifully lifted, fuller-looking brows designed to enhance your natural shape with an effortlessly polished finish.",
    meta: ["From $95", "75 min", "Lasts 6–8 wks"],
  },
  {
    num: "02",
    name: "Brow Tint & Sculpt",
    desc: "A short, all-purpose visit. Soft tint matched to your hair, plus a sculpt — the easiest way to wake up looking finished.",
    meta: ["From $75", "45 min", "Lasts 3–4 wks"],
  },
  {
    num: "03",
    name: "Microblading",
    desc: "Semi-permanent, hair-stroke brows crafted to match your natural coloring and bone structure. Begins with a required consultation to discuss your goals and determine if the service is right for you.",
    meta: ["Consultation required", "Lasts 12–18 mo", "Touch-up at 6–8 wks"],
  },
];

const FALLBACK_LASH = [
  {
    num: "04",
    name: "Signature Lash Set",
    desc: "Fully customized extensions hand-applied to your natural lashes — length, curl, and finish tailored to your eye shape and lifestyle. The look of great lashes, made to feel like yours.",
    meta: ["From $145", "120 min", "Fills from $70"],
  },
  {
    num: "05",
    name: "Volume Lash Set",
    desc: "Hand-crafted fans of ultra-fine extensions for soft, even density with more dimension. Choose your level of drama — from a quiet lift to a deliberate full set.",
    meta: ["From $195", "150 min", "Fills from $95"],
  },
  {
    num: "06",
    name: "Lash Lift & Tint",
    desc: "A low-maintenance treatment that lifts, curls, and darkens your natural lashes for an effortlessly enhanced look.",
    meta: ["From $110", "60 min", "Lasts 6–8 wks"],
  },
];

const FALLBACK_EXTRAS = [
  {
    num: "07",
    name: "First-Visit Consult",
    desc: "New here? Start with a 30-minute consultation. We'll plan a service together and book the right appointment for you.",
    meta: ["Complimentary", "30 min", "In studio"],
  },
  {
    num: "08",
    name: "Lash Removal",
    desc: "Safe, gentle removal of extensions applied anywhere. No tugging, no damage to your natural lashes.",
    meta: ["From $35", "30 min", "Walk-out clean"],
  },
  {
    num: "09",
    name: "Lash Tint",
    desc: "A small visit, big difference — semi-permanent color that darkens the full length of your natural lashes for 4–6 weeks.",
    meta: ["From $45", "30 min", "Lasts 4–6 wks"],
  },
  {
    num: "10",
    name: "Moxie Gift Card",
    desc: "A quietly thoughtful gift, in any amount. Delivered as a small card by mail, or by email the same day.",
    meta: ["$50+", "No expiry", "Mail or email"],
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */

export default async function ServicesPage() {
  const container = containerClass;

  // Attempt to load live services from Square
  let groups = {
    brow: [] as SquareService[],
    lash: [] as SquareService[],
    extras: [] as SquareService[],
  };
  let useLive = false;
  try {
    const live = await getSquareServices();
    if (live.length > 0) {
      groups = groupServices(live);
      useLive = true;
    }
  } catch {
    // Fall through to hardcoded data
  }

  // Build per-section card arrays — live data if available, otherwise fallback
  function liveCards(svcs: SquareService[], startNum: number) {
    return svcs.map((svc, i) => ({
      num: String(startNum + i).padStart(2, "0"),
      name: svc.name,
      desc: svc.description,
      meta: squareMeta(svc),
      variationId: primaryVariationId(svc.variations),
    }));
  }

  // cSpell:ignore svcs

  const fallbackWithId = (arr: typeof FALLBACK_BROW) =>
    arr.map((c) => ({ ...c, variationId: null }));

  const browCards = useLive
    ? liveCards(groups.brow, 1)
    : fallbackWithId(FALLBACK_BROW);
  const lashCards = useLive
    ? liveCards(groups.lash, browCards.length + 1)
    : fallbackWithId(FALLBACK_LASH);
  const extrasCards = useLive
    ? liveCards(groups.extras, browCards.length + lashCards.length + 1)
    : fallbackWithId(FALLBACK_EXTRAS);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://moxiebeautystudiowi.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services & Pricing",
        item: "https://moxiebeautystudiowi.com/services",
      },
    ],
  };

  // Build services JSON-LD from live data when available, fallback otherwise
  const allCards = [...browCards, ...lashCards, ...extrasCards];
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services at Moxie Beauty Studio",
    itemListElement: allCards.map((c, i) => {
      const priceMatch = c.meta.find(
        (m) => m.startsWith("From ") || m.startsWith("$"),
      );
      const price =
        priceMatch?.replace(/^From \$/, "").replace(/^\$/, "") ?? null;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: c.name,
          description: c.desc,
          provider: {
            "@type": "BeautySalon",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          ...(price && {
            offers: {
              "@type": "Offer",
              price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <main>
        {/* ── Page hero ─────────────────────────────────────────────────── */}
        <section className="pt-14 pb-16 border-b border-(--line-soft)">
          <div className={container}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-(--ink-mute)">
                <li>
                  <a
                    href="/"
                    className="hover:text-(--accent) transition-colors"
                  >
                    Moxie
                  </a>
                </li>
                <li aria-hidden="true">
                  <span className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent) mx-1" />
                </li>
                <li>
                  <span aria-current="page">Services &amp; Pricing</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_540px] gap-10 mb-16">
              <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
                The <em className="font-nyght-italic text-(--accent)">menu.</em>
                <br />
                Quality work,
                <br />
                crafted with care.
              </h1>
              <p className="text-lg text-(--ink-soft) leading-relaxed self-end text-pretty">
                A focused list of lash and brow services — each one designed
                around the consultation we&apos;ll have before we begin. Prices
                are starting points; final pricing reflects your shape, density,
                and the time we spend together.
              </p>
            </div>

            {/* Fact strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft)/80 rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
              {[
                { k: "Studio", v: "By appointment" },
                {
                  k: "Sessions",
                  v: (
                    <span>
                      30 – 150 <em className="font-nyght-italic">min</em>
                    </span>
                  ),
                },
                { k: "Starting", v: "$65" },
                {
                  k: "First visit",
                  v: <em className="font-nyght-italic">Complimentary</em>,
                },
              ].map(({ k, v }) => (
                <div key={k} className="bg-(--background) px-7 py-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium mb-1">
                    {k}
                  </p>
                  <p className="font-nyght text-[22px] text-(--foreground)">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Marquee ───────────────────────────────────────────────────── */}
        <MarqueeTicker
          items={[
            "brow lamination",
            "signature lashes",
            "volume sets",
            "lash lifts",
            "microblading",
            "brow shaping",
            "tinting",
            "lash fills",
          ]}
        />

        {/* ── I · Brow ──────────────────────────────────────────────────── */}
        {browCards.length > 0 && (
          <section id="brow" className="py-20">
            <div className={container}>
              <div className="grid lg:grid-cols-[420px_540px] gap-4 justify-between mb-10">
                <div>
                  <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                    I · Brow
                  </p>
                  <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                    Thoughtfully{" "}
                    <em className="font-nyght-italic text-(--accent)">
                      shaped.
                    </em>{" "}
                    Beautifully yours.
                  </h2>
                </div>
                <p className="text-(--ink-soft) lg:pt-14 lg:self-end leading-relaxed text-pretty">
                  Whether you&apos;re looking for a fuller appearance, more
                  definition, or simply a little extra polish, every brow
                  service is thoughtfully customized to enhance your natural
                  features and create a look that feels effortless, balanced,
                  and uniquely you.
                </p>
              </div>

              <div className="divide-y-0">
                {browCards.map((c) => (
                  <ServiceCardClient
                    key={c.num}
                    num={c.num}
                    name={c.name}
                    desc={c.desc}
                    meta={c.meta}
                    variationId={c.variationId}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Price ribbon — shown when at least one adjacent section exists ── */}
        {(browCards.length > 0 || lashCards.length > 0) && (
          <section
            className="py-20 bg-(--foreground) dark:bg-(--foreground)/80"
            aria-label="A note on the way we work"
          >
            <div className={container}>
              <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--background)/80 mb-6">
                A note on the way we work
              </p>
              <p className="font-nyght-italic text-[clamp(32px,5vw,64px)] text-(--background) leading-tight max-w-3xl text-balance">
                <span className="text-(--accent)">Beautiful.</span>{" "}
                <span className="text-(--accent)">Intentional.</span> Never
                one-size-fits-all.
              </p>
              <p className="mt-8 text-[12px] tracking-[0.2em] uppercase text-(--background)">
                Jackie · founder · est. 2021
              </p>
            </div>
          </section>
        )}

        {/* ── II · Lash ─────────────────────────────────────────────────── */}
        {lashCards.length > 0 && (
          <section id="lash" className="py-20">
            <div className={container}>
              <div className="grid lg:grid-cols-[420px_540px] gap-4 justify-between mb-10">
                <div>
                  <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                    II · Lash
                  </p>
                  <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                    Customized for your{" "}
                    <em className="font-nyght-italic text-(--accent)">eyes.</em>{" "}
                    Designed for your life.
                  </h2>
                </div>
                <p className="text-(--ink-soft) lg:pt-14 lg:self-end leading-relaxed text-pretty">
                  Beautiful lashes should feel effortless. Every lash set is
                  thoughtfully customized to your eye shape, natural lashes,
                  lifestyle, and beauty goals to create a look that feels
                  comfortable, flattering, and uniquely you.
                </p>
              </div>

              <div>
                {lashCards.map((c) => (
                  <ServiceCardClient
                    key={c.num}
                    num={c.num}
                    name={c.name}
                    desc={c.desc}
                    meta={c.meta}
                    variationId={c.variationId}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── III · Extras ──────────────────────────────────────────────── */}
        {extrasCards.length > 0 && (
          <section id="extras" className="pb-20">
            <div className={container}>
              <div className="grid lg:grid-cols-[380px_1fr] gap-16 mb-10">
                <div>
                  <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                    III · Extras
                  </p>
                  <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                    Small{" "}
                    <em className="font-nyght-italic text-(--accent)">
                      finishes,
                    </em>{" "}
                    &amp; first visits.
                  </h2>
                </div>
                <p className="text-(--ink-soft) lg:pt-14 lg:self-end leading-relaxed">
                  A handful of tidy-ups and additions that pair well with the
                  services above — and the consultation you&apos;ll want if
                  it&apos;s your first time here.
                </p>
              </div>

              <div>
                {extrasCards.map((c) => (
                  <ServiceCardClient
                    key={c.num}
                    num={c.num}
                    name={c.name}
                    desc={c.desc}
                    meta={c.meta}
                    variationId={c.variationId}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Booking CTA ───────────────────────────────────────────────── */}
        <Appointments context="services" />
      </main>
    </>
  );
}
