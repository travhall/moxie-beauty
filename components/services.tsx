// components/services.tsx
import { siteConfig } from "@/lib/site-config";
import Button from "./button";
import DiagArrow from "./icons/DiagArrow";

// TODO: confirm service names, pricing, and durations with Jackie
const services = [
  {
    num: "01",
    name: "Brow Lamination & Shape",
    desc: "A gentle lift that sets brows in their fullest, most natural direction. Includes mapping, lamination, tint and a precision shape.",
    meta: [
      { label: "From", value: "$95" },
      { label: "Duration", value: "75 min" },
      { label: "Lasts", value: "6–8 wks" },
    ],
  },
  {
    num: "02",
    name: "Classic Lash Set",
    desc: "One natural extension applied to each of your natural lashes — the look of a really good mascara, without the mascara.",
    meta: [
      { label: "From", value: "$145" },
      { label: "Duration", value: "120 min" },
      { label: "Fills", value: "$70" },
    ],
  },
  {
    num: "03",
    name: "Volume & Hybrid Lashes",
    desc: "Hand-made fans for soft density, or a mix of classics and fans for texture. Customized to your eye shape and lifestyle.",
    meta: [
      { label: "From", value: "$195" },
      { label: "Duration", value: "150 min" },
      { label: "Fills", value: "$95" },
    ],
  },
  {
    num: "04",
    name: "Lash Lift & Tint",
    desc: "A subtle curl from root to tip that makes your own lashes look longer. Pair with a tint to skip the mascara entirely.",
    meta: [
      { label: "From", value: "$110" },
      { label: "Duration", value: "60 min" },
      { label: "Lasts", value: "6–8 wks" },
    ],
  },
  {
    num: "05",
    name: "Henna & Tinting",
    desc: "Plant-based brow color that softly stains the skin beneath, for a fuller-looking shape that holds up between visits.",
    meta: [
      { label: "From", value: "$65" },
      { label: "Duration", value: "45 min" },
      { label: "Skin", value: "2 wks" },
    ],
  },
  {
    num: "06",
    name: "First-Visit Consult",
    desc: "New here? Start with a 30-minute mapping & consultation. We'll plan a shape together and book the right services for you.",
    meta: [
      { label: "Price", value: "Complimentary" },
      { label: "Duration", value: "30 min" },
      { label: "Where", value: "In studio" },
    ],
  },
];

export default function Services() {
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
          <p className="text-[17px] leading-relaxed text-(--ink-soft) max-w-[52ch]">
            Every appointment begins with a quiet consultation. We map your
            features, talk through how you want to look and feel, and tailor the
            work from there. No two faces are the same &mdash; your brows
            shouldn&rsquo;t be either.
          </p>
        </div>

        {/* ── Service rows — 2-col grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-(--line)">
          {services.map((svc, i) => {
            const isOdd = i % 2 === 0;
            return (
              <a
                key={svc.num}
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${svc.name} — book this service (opens in new tab)`}
                className={[
                  "group flex gap-7 items-start border-b border-(--line) py-9 text-(--foreground) no-underline",
                  "transition-colors duration-300 hover:bg-(--bg-soft)",
                  isOdd
                    ? "sm:border-r sm:border-(--line) sm:pr-15"
                    : "sm:pl-10",
                ].join(" ")}
              >
                {/* Service number */}
                <span className="font-mono text-[11px] tracking-widest text-(--ink-mute) pt-1.5 shrink-0 tabular-nums">
                  {svc.num}
                </span>

                {/* Name + description + meta */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-nyght text-[26px] lg:text-[30px] leading-tight text-(--foreground) mb-2.5 group-hover:text-(--accent) transition-colors duration-300">
                    {svc.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-(--ink-soft) mb-4 max-w-[46ch]">
                    {svc.desc}
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    {svc.meta.map(({ label, value }) => (
                      <span
                        key={label}
                        className="text-[11px] tracking-[0.18em] uppercase text-(--ink-mute)"
                      >
                        {label}{" "}
                        <strong className="text-(--foreground) font-medium ml-1">
                          {value}
                        </strong>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Diagonal arrow */}
                <span
                  className="shrink-0 mt-1 w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--ink-soft) group-hover:border-(--accent) group-hover:text-(--accent) transition-[border-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  <DiagArrow />
                </span>
              </a>
            );
          })}
        </div>

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
