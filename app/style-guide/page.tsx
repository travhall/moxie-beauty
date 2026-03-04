"use client";

import Button from "@/components/button";
import { Heart, Send, Menu, CalendarClock } from "lucide-react";

// ─── Type Scale ───────────────────────────────────────────────────────────────

const typeScale = [
  {
    label: "Display / H1",
    usage: "Hero heading",
    classes: "font-nyght text-6xl lg:text-7xl text-balance",
    gradient: true,
    sample: "Welcome to Moxie Beauty Studio",
  },
  {
    label: "Section / H2",
    usage: "Section headings",
    classes: "font-nyght text-5xl lg:text-6xl text-balance",
    gradient: true,
    sample: "The Magic of Moxie",
  },
  {
    label: "Step / H3",
    usage: "Appointment steps, desktop panels",
    classes: "font-nyght text-3xl lg:text-4xl text-balance",
    gradient: true,
    sample: "Find Your Service",
  },
  {
    label: "Card / H3",
    usage: "Service cards",
    classes: "font-nyght text-xl sm:text-2xl text-balance",
    gradient: true,
    sample: "Eyelash Extensions",
  },
  {
    label: "Blockquote",
    usage: "Featured pull quotes",
    classes: "font-nyght-italic text-3xl lg:text-4xl text-balance",
    gradient: true,
    sample:
      "Jackie is committed to fostering strong relationships with her clients.",
  },
  {
    label: "Lead Body",
    usage: "Section subtitles",
    classes: "text-xl text-balance",
    gradient: false,
    sample:
      "Discover Moxie\u2019s premium beauty treatments, crafted to enhance your natural allure.",
  },
  {
    label: "Body",
    usage: "General copy",
    classes: "text-base text-pretty",
    gradient: false,
    sample:
      "From special occasions to everyday self-care, Moxie is here to help you look and feel your best. Our expert team provides personalized services to ensure flawless, long-lasting results.",
  },
  {
    label: "Small",
    usage: "Captions, meta, fine print",
    classes: "text-sm",
    gradient: false,
    sample:
      "Results last longest when kept dry for 24 hours and away from saunas for 48 hours.",
  },
  {
    label: "Nav / Label",
    usage: "Navigation links, UI labels",
    classes: "font-bold text-base tracking-wide",
    gradient: false,
    sample: "Our Services  \u00b7  Appointments  \u00b7  About Moxie",
  },
  {
    label: "Accent Label",
    usage: "Eyebrow labels, section markers",
    classes: "font-nyght-bold text-sm tracking-widest uppercase",
    gradient: false,
    sample: "Moxie Beauty Studio — Est. 2022",
  },
];

// ─── Font Families ────────────────────────────────────────────────────────────

const fontFamilies = [
  {
    label: "Nyght Light",
    classes: "font-nyght text-2xl",
    sample: "Aa — The quick brown fox jumps over the lazy dog",
  },
  {
    label: "Nyght Light Italic",
    classes: "font-nyght-italic text-2xl",
    sample: "Aa — The quick brown fox jumps over the lazy dog",
  },
  {
    label: "Nyght Dark",
    classes: "font-nyght-bold text-2xl",
    sample: "Aa — The quick brown fox jumps over the lazy dog",
  },
  {
    label: "Nyght Dark Italic",
    classes: "font-nyght-bold-italic text-2xl",
    sample: "Aa — The quick brown fox jumps over the lazy dog",
  },
  {
    label: "Mulish Regular",
    classes: "font-sans font-normal text-2xl",
    sample: "Aa — The quick brown fox jumps over the lazy dog",
  },
  {
    label: "Mulish SemiBold",
    classes: "font-sans font-semibold text-2xl",
    sample: "Aa — The quick brown fox jumps over the lazy dog",
  },
  {
    label: "Mulish Bold",
    classes: "font-sans font-bold text-2xl",
    sample: "Aa — The quick brown fox jumps over the lazy dog",
  },
];

// ─── Color Palettes ───────────────────────────────────────────────────────────

const palettes = [
  { name: "Ivory Rose", token: "ivory-rose", darkFrom: 600 },
  { name: "Rose Gold", token: "rose-gold", darkFrom: 600 },
  { name: "Midnite", token: "midnite", darkFrom: 600 },
];

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StyleGuide() {
  return (
    <main className="p-8 md:p-12 space-y-24 max-w-6xl mx-auto">
      <header className="border-b border-(--accent) pb-6">
        <p className="font-nyght-bold text-sm tracking-widest uppercase text-(--accent) mb-2">
          Moxie Beauty Studio
        </p>
        <h1 className="font-nyght text-4xl lg:text-5xl">Style Guide</h1>
      </header>

      {/* ── Typography ─────────────────────────────────────────────── */}
      <section>
        <h2 className="font-sans font-bold text-2xl mb-2 text-(--accent)">
          Typography
        </h2>
        <p className="text-sm text-(--foreground)/50 mb-12">
          Nyght Serif renders optically smaller than equivalent sans-serif sizes.
          All heading levels are scaled ~1 step larger to compensate.
        </p>

        {/* Type scale specimens */}
        <div className="space-y-10 mb-20">
          {typeScale.map(({ label, usage, classes, gradient, sample }) => (
            <div key={label} className="border-b border-(--accent)/15 pb-8">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                <span className="font-sans font-bold text-xs text-(--accent) uppercase tracking-widest">
                  {label}
                </span>
                <span className="text-xs text-(--foreground)/40">{usage}</span>
                <code className="text-xs bg-(--foreground)/5 px-2 py-0.5 rounded font-mono text-(--foreground)/60">
                  {classes}
                </code>
              </div>
              <p
                className={`${classes} ${gradient
                  ? "bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent"
                  : "text-(--foreground)"
                  }`}
              >
                {sample}
              </p>
            </div>
          ))}
        </div>

        {/* Font family specimens */}
        <h3 className="font-sans font-bold text-lg mb-6">Font Families</h3>
        <div className="space-y-5">
          {fontFamilies.map(({ label, classes, sample }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
              <span className="text-xs text-(--foreground)/40 sm:w-40 shrink-0 uppercase tracking-wide">
                {label}
              </span>
              <span className={classes}>{sample}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Color Palette ──────────────────────────────────────────── */}
      <section>
        <h2 className="font-sans font-bold text-2xl mb-8 text-(--accent)">
          Color Palette
        </h2>
        <div className="space-y-8">
          {palettes.map(({ name, token, darkFrom }) => (
            <div key={name}>
              <h3 className="font-sans font-semibold text-sm uppercase tracking-widest mb-3 text-(--foreground)/60">
                {name}
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {shades.map((shade) => (
                  <div
                    key={shade}
                    className="rounded-sm"
                    style={{
                      backgroundColor: `var(--${token}-${shade})`,
                      height: "64px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "4px 6px",
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: shade >= darkFrom ? "#f3f4f6" : "#111827",
                      }}
                    >
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Buttons ────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-sans font-bold text-2xl mb-8 text-(--accent)">
          Buttons
        </h2>
        <div className="space-y-10">
          {(["default", "outline", "ghost"] as const).map((variant) => (
            <div key={variant}>
              <h3 className="font-sans font-semibold text-xs uppercase tracking-widest text-(--foreground)/40 mb-4 capitalize">
                {variant}
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant={variant} size="sm">
                  Small
                </Button>
                <Button variant={variant}>Default</Button>
                <Button variant={variant} size="lg">
                  Large
                </Button>
                <Button variant={variant} icon={Heart}>
                  With Icon
                </Button>
                <Button variant={variant} icon={Send} iconPosition="right">
                  Icon Right
                </Button>
                <Button
                  variant={variant}
                  icon={CalendarClock}
                  iconOnly
                  aria-label="Calendar"
                />
                <Button variant={variant} icon={Menu} iconOnly aria-label="Menu" />
                <Button variant={variant} isLoading>
                  Loading
                </Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
