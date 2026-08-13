import type { Metadata } from "next";
import Appointments from "@/components/appointments";
import MarqueeTicker from "@/components/marquee-ticker";
import Breadcrumbs from "@/components/breadcrumbs";
import FactStrip from "@/components/fact-strip";
import ServiceCardClient from "@/components/service-card-client";
// import ConsultationPromo from "@/components/consultation-promo";
import { containerClass } from "@/lib/layout";
import {
  getSquareServicesSafe,
  formatPrice,
  formatDuration,
  lowestPrice,
  primaryDuration,
  primaryVariationId,
  groupServices,
  type SquareService,
} from "@/lib/square";
import { siteConfig } from "@/lib/site-config";
import {
  FALLBACK_SERVICES,
  type FallbackService,
} from "@/lib/fallback-services";

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
  const live = await getSquareServicesSafe();
  if (live && live.length > 0) {
    groups = groupServices(live);
    useLive = true;
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

  const fallbackCards = (
    category: FallbackService["category"],
    startNum: number,
  ) =>
    FALLBACK_SERVICES.filter((s) => s.category === category).map((s, i) => ({
      num: String(startNum + i).padStart(2, "0"),
      name: s.name,
      desc: s.desc,
      meta: s.cardMeta,
      variationId: null,
    }));

  const browCards = useLive
    ? liveCards(groups.brow, 1)
    : fallbackCards("brow", 1);
  const lashCards = useLive
    ? liveCards(groups.lash, browCards.length + 1)
    : fallbackCards("lash", browCards.length + 1);
  const extrasCards = useLive
    ? liveCards(groups.extras, browCards.length + lashCards.length + 1)
    : fallbackCards("extras", browCards.length + lashCards.length + 1);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <main>
        {/* ── Page hero ─────────────────────────────────────────────────── */}
        <section className="pt-14 pb-16 border-b border-(--line-soft)">
          <div className={container}>
            <Breadcrumbs page="Services & Pricing" href="/services" />

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
            <FactStrip
              items={[
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
              ]}
            />
          </div>
        </section>

        {/* ── New-here consultation promo ──────────────────────────────── */}
        {/* <ConsultationPromo /> */}

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

              <div className="divide-y-0 service-hover-fade">
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
            className="py-20 bg-(--foreground) z-50 relative"
            aria-label="A note on the way we work"
          >
            <div className={container}>
              <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--background) mb-6">
                A note on the way we work
              </p>
              <p className="font-nyght-italic text-[clamp(32px,5vw,64px)] text-(--background) leading-tight max-w-3xl text-balance">
                <span className="text-(--rose-gold-300) dark:text-(--rose-gold-500)">
                  Beautiful.
                </span>{" "}
                <span className="text-(--rose-gold-300) dark:text-(--rose-gold-500)">
                  Intentional.
                </span>{" "}
                Never one-size-fits-all.
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

              <div className="service-hover-fade">
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

              <div className="service-hover-fade">
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
