import Button from "./button";
import ServiceRowsClient from "./service-rows-client";
import {
  getSquareServices,
  formatPrice,
  formatDuration,
  lowestPrice,
  primaryDuration,
  primaryVariationId,
  type SquareService,
} from "@/lib/square";

// ── Fallback data ─────────────────────────────────────────────────────────────
// Shown if Square API is unavailable or returns no services.

const FALLBACK_SERVICES = [
  {
    num: "01",
    name: "Brow Lamination & Shape",
    desc: "Beautifully lifted, fuller-looking brows designed to enhance your natural shape with an effortlessly polished finish.",
    meta: [
      { label: "From", value: "$95" },
      { label: "Duration", value: "75 min" },
      { label: "Lasts", value: "6–8 wks" },
    ],
  },
  {
    num: "02",
    name: "Signature Lash Set",
    desc: "Fully customized extensions hand-applied to your natural lashes — length, curl, and finish tailored to your eye shape and lifestyle.",
    meta: [
      { label: "From", value: "$145" },
      { label: "Duration", value: "120 min" },
      { label: "Fills", value: "from $70" },
    ],
  },
  {
    num: "03",
    name: "Volume Lash Set",
    desc: "Hand-crafted fans of ultra-fine extensions for soft, even density with more dimension. Choose your level of drama.",
    meta: [
      { label: "From", value: "$195" },
      { label: "Duration", value: "150 min" },
      { label: "Fills", value: "from $95" },
    ],
  },
  {
    num: "04",
    name: "Lash Lift & Tint",
    desc: "A subtle curl from root to tip that makes your own lashes look longer and darker. Low maintenance, high impact.",
    meta: [
      { label: "From", value: "$110" },
      { label: "Duration", value: "60 min" },
      { label: "Lasts", value: "6–8 wks" },
    ],
  },
  {
    num: "05",
    name: "Microblading",
    desc: "Semi-permanent, hair-stroke brows matched to your natural coloring and bone structure. Starts with a required consultation.",
    meta: [
      { label: "Consult", value: "Required" },
      { label: "Lasts", value: "12–18 mo" },
      { label: "Touch-up", value: "6–8 wks" },
    ],
  },
  {
    num: "06",
    name: "First-Visit Consult",
    desc: "New here? Start with a 30-minute consultation. We'll plan a service together and book the right appointment for you.",
    meta: [
      { label: "Price", value: "Complimentary" },
      { label: "Duration", value: "30 min" },
      { label: "Where", value: "In studio" },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build the meta pills for a live Square service. */
function buildMeta(svc: SquareService) {
  const price = lowestPrice(svc.variations);
  const duration = primaryDuration(svc.variations);
  const meta: { label: string; value: string }[] = [];

  if (price != null) meta.push({ label: "From", value: formatPrice(price) });
  else meta.push({ label: "Price", value: "Ask us" });

  if (duration != null)
    meta.push({ label: "Duration", value: formatDuration(duration) });

  return meta;
}

// ── Section ───────────────────────────────────────────────────────────────────

export default async function Services() {
  // Attempt to load live services from Square
  let liveServices: SquareService[] = [];
  try {
    liveServices = await getSquareServices();
  } catch {
    // API unavailable — fall through to fallback
  }

  const useLive = liveServices.length > 0;

  // First 6 live services, or hardcoded fallback
  const displayServices = useLive
    ? liveServices.slice(0, 6).map((svc, i) => ({
        num: String(i + 1).padStart(2, "0"),
        name: svc.name,
        desc: svc.description,
        meta: buildMeta(svc),
        variationId: primaryVariationId(svc.variations),
      }))
    : FALLBACK_SERVICES.map((s) => ({ ...s, variationId: null }));

  return (
    <section
      id="Services"
      tabIndex={-1}
      aria-label="Services section"
      className="py-32 lg:py-40"
    >
      <div className="max-w-335 mx-auto px-10 max-[720px]:px-5.5">
        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-20 items-end mb-16 lg:mb-20">
          <div>
            <p className="flex items-center gap-3 font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-5">
              <span
                className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent) shrink-0"
                aria-hidden="true"
              />
              Services
            </p>
            <h2 className="font-nyght text-5xl lg:text-6xl leading-none tracking-tight text-balance">
              What we{" "}
              <span className="font-nyght-italic text-(--accent)">do</span>
              ,
              <br className="hidden lg:block" /> slowly &amp; with care.
            </h2>
          </div>
          <p className="text-[17px] leading-relaxed text-(--ink-soft) max-w-[56ch] justify-self-end">
            Every appointment begins with a one on one consultation. We map your
            features, talk through how you want to look and feel, and tailor the
            work from there. No two faces are the same &mdash; your brows
            shouldn&rsquo;t be either.
          </p>
          {/* cSpell:ignore shouldn */}
        </div>

        {/* ── Service rows — 2-col grid ───────────────────────────────── */}
        <ServiceRowsClient services={displayServices} />

        {/* ── Footer CTA ───────────────────────────────────────────────── */}
        <div className="mt-12">
          <Button variant="ghost" href="/services" showArrow>
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
