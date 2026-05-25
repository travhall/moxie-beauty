import type { Metadata } from "next";
import Appointments from "@/components/appointments";
import MarqueeTicker from "@/components/marquee-ticker";
import { siteConfig } from "@/lib/site-config";
import { containerClass } from "@/lib/layout";
import DiagArrow from "@/components/icons/DiagArrow";

export const metadata: Metadata = {
  title: "Our Services | Moxie Beauty Studio",
  description:
    "Explore Moxie Beauty Studio's full range of lash and brow services — eyelash extensions, lash lift & tint, brow lamination, henna brows, and more.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/services",
    title: "Our Services | Moxie Beauty Studio",
    description:
      "Lash extensions, lash lift & tint, brow lamination, henna brows, and more — by appointment in Rochester, WI.",
    images: [{ url: "/images/hero-img.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Moxie Beauty Studio",
    description: "Lash extensions, lash lift & tint, brow lamination, and more.",
    images: ["/images/hero-img.jpg"],
  },
};



interface ServiceCardProps {
  num: string;
  name: string;
  desc: string;
  meta: [string, string, string];
}

function ServiceCard({ num, name, desc, meta }: ServiceCardProps) {
  return (
    <a
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — book this service (opens in new tab)`}
      className="group flex items-start gap-5 py-7 border-b border-(--line-soft) no-underline hover:bg-(--bg-soft) px-4 -mx-4 rounded-xl transition-colors duration-300"
    >
      <span className="font-nyght-bold text-[11px] tracking-[0.25em] text-(--ink-mute) mt-1 min-w-5.5">
        {num}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-nyght text-xl text-(--foreground) mb-2 group-hover:text-(--accent) transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-(--ink-soft) leading-relaxed mb-4">{desc}</p>
        {/* TODO: confirm all pricing and durations with Jackie */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-(--ink-mute)">
          {meta.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
      <span className="text-(--ink-mute) group-hover:text-(--accent) transition-colors duration-300 mt-1 shrink-0">
        <DiagArrow />
      </span>
    </a>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  const container = containerClass;

  return (
    <main>
      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <section className="pt-14 pb-16 border-b border-(--line-soft)">
        <div className={container}>
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-(--ink-mute) mb-10"
            aria-label="Breadcrumb"
          >
            <a href="/" className="hover:text-(--accent) transition-colors">
              Moxie
            </a>
            <span
              className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent) mx-1"
              aria-hidden="true"
            />
            <span aria-current="page">Services &amp; Pricing</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 mb-16">
            <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              The{" "}
              <em className="font-nyght-italic not-italic text-(--accent)">
                menu.
              </em>
              <br />
              Slow work,
              <br />
              done carefully.
            </h1>
            <p className="text-xl text-(--ink-soft) leading-relaxed self-end max-w-105">
              A focused list of brow and lash services — each one designed
              around the consultation we&apos;ll have before we begin. Prices
              are starting points; final pricing reflects your shape, density,
              and the time we spend together.
            </p>
          </div>

          {/* Fact strip */}
          {/* TODO: confirm "Starting $65" and session range with Jackie */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft) rounded-2xl overflow-hidden border border-(--line-soft)">
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
          "classic lashes",
          "volume sets",
          "hybrid lashes",
          "lash lifts",
          "brow shaping",
          "tinting",
          "henna brows",
        ]}
      />

      {/* ── I · Brow ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className={container}>
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 mb-10">
            <div>
              <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                I · Brow
              </p>
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight">
                For the{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">
                  shape
                </em>{" "}
                you were born with.
              </h2>
            </div>
            <p className="text-(--ink-soft) lg:pt-14 lg:self-end leading-relaxed">
              Brow design is part architecture, part observation. We map your
              bone structure, talk through how you want to look on a Monday and
              a Saturday, and only then pick up the tweezers.
            </p>
          </div>

          <div className="divide-y-0">
            <ServiceCard
              num="01"
              name="Signature Brow Shape"
              desc="Mapping, shaping with wax & precision tweezing, gentle trim and a finished groom. The foundation for every other brow service."
              meta={["From $55", "45 min", "Every 3–4 wks"]}
            />
            <ServiceCard
              num="02"
              name="Brow Lamination & Shape"
              desc="A gentle lift that sets brows in their fullest, most natural direction. Includes mapping, lamination, tint, and a precision shape."
              meta={["From $95", "75 min", "Lasts 6–8 wks"]}
            />
            <ServiceCard
              num="03"
              name="Henna Brows"
              desc="Plant-based brow color that softly stains the skin beneath, for a fuller-looking shape that holds up between visits. No ammonia, no peroxide."
              meta={["From $65", "45 min", "Skin: 1–2 wks"]}
            />
            <ServiceCard
              num="04"
              name="Brow Tint & Shape"
              desc="A short, all-purpose visit. Soft tint matched to your hair, plus a shape — the easiest way to wake up looking finished."
              meta={["From $75", "45 min", "Lasts 3–4 wks"]}
            />
          </div>
        </div>
      </section>

      {/* ── Price ribbon ──────────────────────────────────────────────── */}
      {/* TODO: confirm "est. 2019" founding year */}
      <section
        className="py-20 bg-(--foreground)"
        aria-label="A note on the way we work"
      >
        <div className={container}>
          <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--background)/50 mb-6">
            A note on the way we work
          </p>
          <p className="font-nyght-italic text-[clamp(32px,5vw,64px)] text-(--background) leading-tight max-w-2xl">
            We&apos;d rather be <span className="text-(--accent)">slow</span>{" "}
            &amp; right
            <br />
            than fast and full of{" "}
            <span className="text-(--accent)">apologies.</span>
          </p>
          <p className="mt-8 text-[12px] tracking-[0.2em] uppercase text-(--background)/40">
            Jackie · founder · est. 2019
          </p>
        </div>
      </section>

      {/* ── II · Lash ─────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className={container}>
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 mb-10">
            <div>
              <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                II · Lash
              </p>
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight">
                Lashes that look like{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">
                  yours,
                </em>{" "}
                only better.
              </h2>
            </div>
            <p className="text-(--ink-soft) lg:pt-14 lg:self-end leading-relaxed">
              Hand-applied, customized to your eye shape, lifestyle, and how
              much you&apos;d like to feel them. We use vegan adhesives and
              finishes that hold up in summer humidity and winter wool.
            </p>
          </div>

          <div>
            <ServiceCard
              num="05"
              name="Classic Lash Set"
              desc="One natural extension applied to each of your natural lashes — the look of a really good mascara, without the mascara."
              meta={["From $145", "120 min", "Fills $70"]}
            />
            <ServiceCard
              num="06"
              name="Hybrid Lash Set"
              desc="Half classic, half volume. Subtle texture and a little more depth, without the full drama of a volume set."
              meta={["From $170", "135 min", "Fills $85"]}
            />
            <ServiceCard
              num="07"
              name="Volume Lash Set"
              desc="Hand-made fans of ultra-fine extensions create soft, even density. Choose anywhere from a quiet 2D to a deliberate 5D set."
              meta={["From $195", "150 min", "Fills $95"]}
            />
            <ServiceCard
              num="08"
              name="Lash Lift & Tint"
              desc="A subtle curl from root to tip that makes your own lashes look longer. Pair with a tint to skip the mascara entirely."
              meta={["From $110", "60 min", "Lasts 6–8 wks"]}
            />
          </div>
        </div>
      </section>

      {/* ── III · Extras ──────────────────────────────────────────────── */}
      <section className="pb-20">
        <div className={container}>
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 mb-10">
            <div>
              <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                III · Extras
              </p>
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight">
                Small{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">
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
            <ServiceCard
              num="09"
              name="First-Visit Consult"
              desc="New here? Start with a 30-minute mapping & consultation. We'll plan a shape together and book the right services for you."
              meta={["Complimentary", "30 min", "In studio"]}
            />
            <ServiceCard
              num="10"
              name="Lash Removal"
              desc="Safe, gentle removal of extensions applied anywhere. No tugging, no damage to your natural lashes. Often paired with a lift."
              meta={["From $35", "30 min", "Walk-out clean"]}
            />
            <ServiceCard
              num="11"
              name="Lash Tint"
              desc="A small visit, big difference — semi-permanent color that darkens the full length of your natural lashes for 4–6 weeks."
              meta={["From $45", "30 min", "Lasts 4–6 wks"]}
            />
            <ServiceCard
              num="12"
              name="Moxie Gift Card"
              desc="A quietly thoughtful gift, in any amount. Delivered as a small card by mail, or by email the same day."
              meta={["$50+", "No expiry", "Mail or email"]}
            />
          </div>
        </div>
      </section>

      {/* ── Booking CTA ───────────────────────────────────────────────── */}
      <Appointments />
    </main>
  );
}
