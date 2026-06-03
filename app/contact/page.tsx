import type { Metadata } from "next";
import Appointments from "@/components/appointments";
import MarqueeTicker from "@/components/marquee-ticker";
import { siteConfig } from "@/lib/site-config";
import { containerClass } from "@/lib/layout";
import DiagArrow from "@/components/icons/DiagArrow";

export const metadata: Metadata = {
  title: "Contact | Moxie Beauty Studio",
  description:
    "Find Moxie Beauty Studio at 402 S Front Street, Rochester WI. Hours, directions, contact channels, and FAQ.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/contact",
    title: "Contact | Moxie Beauty Studio",
    description:
      "402 S Front Street, Rochester WI — hours, directions, and contact channels.",
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
    title: "Contact | Moxie Beauty Studio",
    description:
      "402 S Front Street, Rochester WI — hours, directions, and contact.",
    images: ["/images/hero-img.jpg"],
  },
};

const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 1V11M1 6H11"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

/* ── FAQ data ───────────────────────────────────────────────────────────── */
const faqItems = [
  {
    num: "01",
    q: "Do you take walk-ins?",
    a: "Almost never — the studio is one chair, by appointment only, so we usually don't have an empty slot. If you find yourself in town and want to ask, text us; if there's a cancellation that day, we'll let you know.",
  },
  {
    num: "02",
    q: "What's your cancellation policy?",
    a: "Cancellations are free up to 24 hours before your appointment. Inside 24 hours we charge 50% of the service; same-day no-shows are 100%. Life happens — text us; if it's a real one, we'll usually waive it.",
  },
  {
    num: "03",
    q: "Do you take deposits?",
    a: "Not currently — a credit card is required to hold your appointment, and any late cancellation or no-show fees are charged to the card on file. No charge if you cancel with at least 24 hours' notice.",
  },
  {
    num: "04",
    q: "What if I'm pregnant?",
    a: "Brow shaping and tinting are generally fine. For lash services and lamination, we recommend consulting your doctor first and letting us know when you book so we can plan accordingly.",
  },
  {
    num: "05",
    q: "Can I bring my child?",
    a: "To keep the studio safe and relaxing for everyone, we ask that you make other arrangements for children while you're receiving services. The space is small and the work requires focus — we appreciate your understanding.",
  },
  {
    num: "06",
    q: "What payment do you accept?",
    a: "Cash and credit card. A card is required on file to hold your appointment — cancellation and no-show fees are charged there if applicable.",
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */

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
      name: "Contact",
      item: "https://moxiebeautystudiowi.com/contact",
    },
  ],
};

export default function ContactPage() {
  const container = containerClass;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main>
        {/* ── Page hero ─────────────────────────────────────────────────── */}
        <section className="pt-14 pb-16 border-b border-(--line-soft)">
          <div className={container}>
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
                  <span aria-current="page">Contact</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_540px] gap-10 mb-16">
              <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
                402 South
                <br />
                Front{" "}
                <em className="font-nyght-italic text-(--accent)">Street.</em>
              </h1>
              <p className="text-lg text-(--ink-soft) leading-relaxed self-end text-pretty">
                The studio sits in a 1908 mercantile on the south end of Front
                Street in Rochester, Wisconsin. There&apos;s a small painted M
                on the door — you&apos;ll know it when you see it.
              </p>
            </div>

            {/* Fact strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft)/80 rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
              {[
                { k: "Where", v: "Rochester, WI" },
                { k: "Hours", v: siteConfig.hours.display },
                {
                  k: "Parking",
                  v: (
                    <span>
                      Street, <em className="font-nyght-italic">free</em>
                    </span>
                  ),
                },
                {
                  k: "Days",
                  v: (
                    <span>
                      <em className="font-nyght-italic">Tue – Sat</em>
                    </span>
                  ),
                },
              ].map(({ k, v }) => (
                <div key={k} className="bg-(--background) px-7 py-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium mb-1">
                    {k}
                  </p>
                  <p className="font-nyght text-[20px] text-(--foreground) leading-snug">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Map placeholder ───────────────────────────────────────────── */}
        <section className="py-8">
          <div className={container}>
            <a
              href={siteConfig.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center rounded-3xl overflow-hidden border border-b-8 border-(--line) h-80 lg:h-110 bg-(--bg-soft)"
              aria-label="Open map for Moxie Beauty Studio (opens in new tab)"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, var(--line-soft) 0, var(--line-soft) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, var(--line-soft) 0, var(--line-soft) 1px, transparent 1px, transparent 48px)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-4 left-5 text-[10px] tracking-[0.2em] uppercase text-(--ink-mute) font-medium"
              >
                42.74° N · Lat
              </span>
              <span
                aria-hidden="true"
                className="absolute top-4 right-5 text-[10px] tracking-[0.2em] uppercase text-(--ink-mute) font-medium"
              >
                88.22° W · Long
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-5 text-[10px] tracking-[0.2em] uppercase text-(--ink-mute) font-medium"
              >
                N ↑
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-5 text-[10px] tracking-[0.2em] uppercase text-(--ink-mute) font-medium group-hover:text-(--accent) transition-colors"
              >
                Get directions ↗
              </span>
              <div className="flex flex-col items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-(--accent) shadow-[0_0_0_6px_color-mix(in_oklab,var(--accent)_20%,transparent)] animate-pulse" />
                <span className="font-nyght-bold text-[11px] tracking-[0.2em] uppercase text-(--foreground) bg-(--background) px-3 py-1 rounded-full border border-(--line-soft)">
                  Moxie · 402 S Front St
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ── Hours + Contact split ─────────────────────────────────────── */}
        <section className="py-20">
          <div className={container}>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Hours */}
              <div>
                <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-6">
                  Hours
                </p>
                <h2 className="font-nyght text-3xl lg:text-4xl leading-tight mb-8 text-balance">
                  Open{" "}
                  <em className="font-nyght-italic text-(--accent)">Tuesday</em>{" "}
                  through{" "}
                  <em className="font-nyght-italic text-(--accent)">
                    Saturday,
                  </em>{" "}
                  by appointment.
                </h2>

                {/* Schedule rows */}
                <div className="border-t border-(--line-soft)">
                  {[
                    { day: "Monday", abbr: "Mon", open: false, tag: "Closed" },
                    {
                      day: "Tuesday",
                      abbr: "Tue",
                      open: true,
                      tag: "10 AM – 7 PM",
                    },
                    {
                      day: "Wednesday",
                      abbr: "Wed",
                      open: true,
                      tag: "10 AM – 7 PM",
                    },
                    {
                      day: "Thursday",
                      abbr: "Thu",
                      open: true,
                      tag: "10 AM – 7 PM",
                    },
                    {
                      day: "Friday",
                      abbr: "Fri",
                      open: true,
                      tag: "10 AM – 7 PM",
                    },
                    {
                      day: "Saturday",
                      abbr: "Sat",
                      open: true,
                      tag: "10 AM – 7 PM",
                    },
                    { day: "Sunday", abbr: "Sun", open: false, tag: "Closed" },
                  ].map(({ day, abbr, open, tag }) => (
                    <div
                      key={day}
                      className={`flex items-center justify-between border-b border-(--line-soft) py-4 gap-4 ${!open ? "opacity-40" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-nyght-bold text-[10px] tracking-[0.25em] uppercase text-(--ink-mute) w-8">
                          {abbr}
                        </span>
                        <span className="font-nyght text-base md:text-lg text-(--foreground)">
                          {day}
                        </span>
                      </div>
                      <span
                        className={`text-[12px] tracking-widest uppercase ${open ? "text-(--ink-soft)" : "text-(--ink-mute)"}`}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact channels */}
              <div>
                <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-6">
                  Get in touch
                </p>
                <h2 className="font-nyght text-3xl lg:text-4xl leading-tight mb-8">
                  The{" "}
                  <em className="font-nyght-italic text-(--accent)">
                    quickest
                  </em>{" "}
                  way to reach us.
                </h2>
                <p className="text-(--ink-soft) leading-relaxed mb-8">
                  <a
                    href={siteConfig.contact.smsHref}
                    className="text-(--foreground) hover:text-(--accent) transition-colors underline underline-offset-4"
                  >
                    Text
                  </a>{" "}
                  is best — we read messages between appointments and reply in
                  clusters during the day. Email is checked twice: first thing
                  and at close. Phone gets picked up if we&apos;re free.
                </p>

                <div className="divide-y divide-(--line-soft) border-y border-(--line-soft)">
                  {[
                    {
                      k: "Text",
                      v: siteConfig.contact.phone,
                      href: siteConfig.contact.smsHref,
                    },
                    {
                      k: "Email",
                      v: siteConfig.contact.email,
                      href: siteConfig.contact.emailHref,
                    },
                    {
                      k: "Instagram",
                      v: siteConfig.social.instagram.handle,
                      href: siteConfig.social.instagram.href,
                    },
                    {
                      k: "Facebook",
                      v: "Moxie Beauty Studio · WI",
                      href: siteConfig.social.facebook.href,
                    },
                  ].map(({ k, v, href }) => (
                    <a
                      key={k}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={
                        href.startsWith("http")
                          ? `${k}: ${v} (opens in new tab)`
                          : undefined
                      }
                      className="group flex items-center justify-between py-4 no-underline hover:pl-2 transition-all duration-300"
                    >
                      <span className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) w-24 group-hover:text-(--accent) transition-colors duration-300">
                        {k}
                      </span>
                      <span className="flex-1 font-nyght text-base md:text-lg text-(--foreground) group-hover:text-(--accent) transition-colors duration-300">
                        {v}
                      </span>
                      <span className="text-(--ink-mute) group-hover:text-(--accent) transition-colors duration-300">
                        <DiagArrow />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee ───────────────────────────────────────────────────── */}
        <MarqueeTicker
          items={[
            "402 s front street",
            `rochester wi ${siteConfig.address.zip}`,
            "by appointment",
            "text preferred",
            siteConfig.contact.phone,
            siteConfig.contact.email,
          ]}
        />

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="py-16 bg-(--bg-soft)/60 border-t border-(--line-soft)">
          <div className={container}>
            <div className="grid lg:grid-cols-[380px_540px] justify-between gap-16 mb-12">
              <div>
                <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                  FAQ
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                  The things people{" "}
                  <em className="font-nyght-italic text-(--accent)">often</em>{" "}
                  ask.
                </h2>
              </div>
              <p className="text-(--ink-soft) lg:pt-12 lg:self-end leading-relaxed">
                A short list of what comes up most. If yours isn&apos;t here,{" "}
                <a
                  href={siteConfig.contact.smsHref}
                  className="text-(--foreground) hover:text-(--accent) transition-colors underline underline-offset-4"
                >
                  send a text
                </a>{" "}
                — we&apos;d rather hear it than have you guess.
              </p>
            </div>

            <div className="border-t border-(--line-soft)">
              {faqItems.map(({ num, q, a }) => (
                <details key={num} className="faq-item group">
                  <summary className="flex items-center gap-5 py-6 cursor-pointer select-none">
                    <span className="font-nyght-bold text-[10px] tracking-[0.25em] uppercase text-(--ink-mute) w-7 shrink-0">
                      {num}
                    </span>
                    <span className="flex-1 font-nyght text-xl md:text-2xl text-(--foreground)">
                      {q}
                    </span>
                    <span className="faq-chev text-(--ink-mute) group-open:rotate-45">
                      <PlusIcon />
                    </span>
                  </summary>
                  <p className="pb-6 pl-12 text-(--ink-soft) leading-relaxed max-w-2xl">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        {/* cSpell:ignore chev */}

        {/* ── Booking CTA ───────────────────────────────────────────────── */}
        <Appointments context="contact" />
      </main>
    </>
  );
}
