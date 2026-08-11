import Button from "./button";
import ServiceRowsClient from "./service-rows-client";
import {
  getSquareServicesSafe,
  formatPrice,
  formatDuration,
  lowestPrice,
  primaryDuration,
  primaryVariationId,
  type SquareService,
} from "@/lib/square";
import { FALLBACK_SERVICES } from "@/lib/fallback-services";

const TEASER_SERVICE_IDS = [
  "brow-lamination-shape",
  "signature-lash-set",
  "volume-lash-set",
  "lash-lift-tint",
  "microblading",
  "first-visit-consult",
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
  const liveServices = (await getSquareServicesSafe()) ?? [];
  const useLive = liveServices.length > 0;

  // First 6 live services, or hardcoded fallback
  const fallbackDisplayServices = TEASER_SERVICE_IDS.map((id, i) => {
    const svc = FALLBACK_SERVICES.find((s) => s.id === id);
    if (!svc) throw new Error(`Unknown fallback service id: ${id}`);
    return {
      num: String(i + 1).padStart(2, "0"),
      name: svc.name,
      desc: svc.teaserDesc ?? svc.desc,
      meta: svc.teaserMeta ?? [],
      variationId: null,
    };
  });

  const displayServices = useLive
    ? liveServices.slice(0, 6).map((svc, i) => ({
        num: String(i + 1).padStart(2, "0"),
        name: svc.name,
        desc: svc.description,
        meta: buildMeta(svc),
        variationId: primaryVariationId(svc.variations),
      }))
    : fallbackDisplayServices;

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
              <br className="hidden lg:block" /> beautifully &amp;
              intentionally.
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
          <Button variant="outline" href="/services" showArrow>
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
