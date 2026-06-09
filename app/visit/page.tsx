import type { Metadata } from "next";
import Image from "next/image";
import Appointments from "@/components/appointments";
import { siteConfig } from "@/lib/site-config";
import { containerClass } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Your Visit | Moxie Beauty Studio",
  description:
    "What to expect at Moxie Beauty Studio — from booking through aftercare. Your complete appointment guide.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/visit",
    title: "Your Visit | Moxie Beauty Studio",
    description:
      "What to expect at Moxie Beauty Studio — from booking through aftercare.",
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
    title: "Your Visit | Moxie Beauty Studio",
    description:
      "What to expect at Moxie Beauty Studio, from booking through aftercare.",
    images: ["/images/hero-img.jpg"],
  },
};

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
      name: "Your Visit",
      item: "https://moxiebeautystudiowi.com/visit",
    },
  ],
};

export default function VisitPage() {
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
                  <span aria-current="page">Your Visit</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_540px] gap-10 mb-16">
              <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
                Your appointment,
                <br />
                start to{" "}
                <em className="font-nyght-italic text-(--accent)">finish.</em>
              </h1>
              <p className="text-lg text-(--ink-soft) leading-relaxed self-end text-pretty">
                Every appointment is thoughtfully tailored to the service
                you&apos;re receiving and the experience you prefer. Here&apos;s
                what you can expect from booking to checkout.
              </p>
            </div>

            {/* Fact strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft)/80 rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
              {[
                { k: "Booking", v: "By Square" },
                { k: "Studio", v: siteConfig.hours.display },
                {
                  k: "Consults",
                  v: <em className="font-nyght-italic">Complimentary</em>,
                },
                {
                  k: "Sessions",
                  v: (
                    <span>
                      30 – 150 <em className="font-nyght-italic">min</em>
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

        {/* ── Journey steps ─────────────────────────────────────────────── */}
        <section className="py-20">
          <div className={container}>
            {/* Step 01 — Book */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 border-b border-(--line-soft)">
              <div>
                <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) mb-5">
                  01 · Book
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance mb-6">
                  Find a{" "}
                  <em className="font-nyght-italic text-(--accent)">
                    quiet hour
                  </em>{" "}
                  for yourself.
                </h2>
                <p className="text-(--ink-soft) leading-relaxed mb-5">
                  Booking is simple through Square. Choose your service, select
                  a time that works for you, and you&apos;ll receive appointment
                  confirmations and reminders leading up to your visit.
                </p>
                <p className="text-(--ink-soft) leading-relaxed">
                  New to Moxie? If you&apos;re unsure which service is right for
                  you, feel free to reach out — I&apos;m always happy to help
                  guide you toward the best option for your goals.
                </p>
              </div>
              <div
                className="relative rounded-3xl overflow-hidden aspect-4/3 bg-(--bg-soft) border border-r-8 border-(--accent) shadow-xl"
                style={{ borderRadius: "16px 48px 16px 48px" }}
              >
                <Image
                  src="/images/appt-img4.jpg"
                  alt="Booking your appointment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Step 02 — Prepare */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 border-b border-(--line-soft)">
              <div className="lg:order-2">
                <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) mb-5">
                  02 · Prepare
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance mb-6">
                  Arrive as{" "}
                  <em className="font-nyght-italic text-(--accent)">
                    yourself.
                  </em>
                </h2>
                <p className="text-(--ink-soft) leading-relaxed mb-5">
                  A clean face is always helpful, especially for lash and brow
                  services, but there&apos;s no need to overthink it. Moxie was
                  designed to be a welcoming space where you can relax, unwind,
                  and enjoy a little time for yourself.
                </p>
                <p className="text-(--ink-soft) leading-relaxed">
                  There&apos;s a complimentary parking lot directly in front of
                  the studio — easy from the moment you arrive.
                </p>
              </div>
              <div
                className="relative rounded-3xl overflow-hidden aspect-4/3 bg-(--bg-soft) lg:order-1 border border-l-8 border-(--accent) shadow-xl"
                style={{ borderRadius: "48px 16px 48px 16px" }}
              >
                <Image
                  src="/images/appt-img2.jpg"
                  alt="Preparing for your appointment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Service prep grid ───────────────────────────────────────── */}
            <div className="py-14 border-b border-(--line-soft)">
              <div className="mb-10">
                <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) mb-5">
                  Before you arrive
                </p>
                <div className="grid lg:grid-cols-[1fr_540px] gap-6">
                  <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                    A little prep goes a{" "}
                    <em className="font-nyght-italic text-(--accent)">
                      long way.
                    </em>
                  </h2>
                  <p className="text-(--ink-soft) leading-relaxed self-end text-pretty">
                    Each service has a short list of things to know before you
                    come in. None of it is complicated — but a few of these make
                    a real difference to how your appointment goes.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--line-soft) rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
                {[
                  {
                    service: "Lash Extensions",
                    items: [
                      "Arrive with completely clean lashes — no mascara, no residue, including bottom lashes",
                      "Limit caffeine beforehand if it makes you jittery; it helps you stay still",
                      "Plan for up to 2 hours for a full set",
                      "Make childcare arrangements in advance",
                    ],
                  },
                  {
                    service: "Lash Fills",
                    items: [
                      "Clean lashes required — no mascara or product residue",
                      "1-week fill: plan 30 min · 2-week fill: 60 min · 3-week fill: 75 min",
                      "If you're unsure whether you have enough lashes for a fill, text us a photo first",
                    ],
                  },
                  {
                    service: "Lash Lift & Tint",
                    items: [
                      "Come with clean lashes, free of mascara and residue",
                      "Limit caffeine if it makes you jittery",
                      "Plan for 90 minutes",
                      "Make childcare arrangements in advance",
                    ],
                  },
                  {
                    service: "Microblading",
                    items: [
                      "A consultation is recommended prior to booking your initial appointment to discuss your goals and determine if the service is right for you",
                      "Brow shape, color selection, and treatment recommendations will be customized to your unique features and desired outcome",
                      "Plan for approximately two weeks of healing following your appointment",
                      "Swimming, excessive sweating, and direct water exposure should be avoided during healing — keep dry for the first 3 days",
                      "A perfecting touch-up is recommended 6–8 weeks after your initial service for the best long-term results",
                    ],
                  },
                  {
                    service: "Brow Lamination",
                    items: [
                      "Wear your usual brow makeup to your appointment — it helps us see what you like",
                      "Avoid retinol and retinoid products for at least 3 days prior",
                      "No Accutane use within the past 6 months",
                      "Make childcare arrangements in advance",
                    ],
                  },
                  {
                    service: "All Services",
                    items: [
                      "Arrive a few minutes early, settle in, and make yourself comfortable",
                      "To help maintain a calm and relaxing environment for all guests, we kindly ask that children not accompany you to your appointment",
                      "If you have any allergies, sensitivities, or concerns, please let us know ahead of time so we can best accommodate your needs",
                    ],
                  },
                ].map(({ service, items }) => (
                  <div
                    key={service}
                    className="bg-(--background)/80 p-7 lg:p-8"
                  >
                    <h3 className="font-nyght text-xl md:text-2xl text-(--foreground) mb-4 leading-snug">
                      {service}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm text-(--ink-soft) text-pretty"
                        >
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full bg-(--accent) shrink-0"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {/* cSpell:ignore retinoid */}
            {/* Step 03 — During */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 border-b border-(--line-soft)">
              <div>
                <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) mb-5">
                  03 · During
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance mb-6">
                  Your time,{" "}
                  <em className="font-nyght-italic text-(--accent)">
                    your way.
                  </em>
                </h2>
                <p className="text-(--ink-soft) leading-relaxed mb-5">
                  Your comfort is always the priority. Whether you enjoy
                  conversation, prefer a quiet appointment, or want to listen to
                  your own music or podcast — your experience can be tailored to
                  what feels best for you.
                </p>
                <p className="text-(--ink-soft) leading-relaxed">
                  Relax, unwind, and enjoy a little time dedicated entirely to
                  you.
                </p>
              </div>
              <div
                className="relative rounded-3xl overflow-hidden aspect-4/3 bg-(--bg-soft) border border-r-8 border-(--accent) shadow-xl"
                style={{ borderRadius: "16px 48px 16px 48px" }}
              >
                <Image
                  src="/images/appt-img.jpg"
                  alt="During your appointment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Step 04 — Aftercare */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14">
              <div className="lg:order-2">
                <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) mb-5">
                  04 · Aftercare
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance mb-6">
                  Aftercare{" "}
                  <em className="font-nyght-italic text-(--accent)">
                    matters.
                  </em>
                </h2>
                <p className="text-(--ink-soft) leading-relaxed mb-5">
                  Beautiful results don&apos;t end when your appointment does.
                  We&apos;ll make sure you know how to care for your lashes,
                  brows, or permanent makeup — and we&apos;re always happy to
                  answer questions along the way.
                </p>
                <p className="text-(--ink-soft) leading-relaxed">
                  If you have concerns after your appointment, don&apos;t
                  hesitate to{" "}
                  <a
                    href={siteConfig.contact.smsHref}
                    className="text-(--foreground) hover:text-(--accent) transition-colors underline underline-offset-4"
                  >
                    reach out
                  </a>
                  — we&apos;re here to help.
                </p>
              </div>
              <div
                className="relative rounded-3xl overflow-hidden aspect-4/3 bg-(--bg-soft) lg:order-1 border border-l-8 border-(--accent) shadow-xl"
                style={{ borderRadius: "16px 48px 16px 48px" }}
              >
                <Image
                  src="/images/appt-img3.jpg"
                  alt="Aftercare instructions"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Arrival ───────────────────────────────────────────────────── */}
        <section className="py-16 bg-(--foreground) dark:bg-(--foreground)/80 border-t border-(--line-soft)">
          <div className={container}>
            <div className="mb-12">
              <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--background)/80 mb-4">
                Finding us
              </p>
              <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance text-(--background) mb-3">
                402 S Front{" "}
                <em className="font-nyght-italic text-(--accent)">Street,</em>{" "}
                Rochester.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-14">
              {[
                {
                  num: "01",
                  heading: (
                    <span>
                      Look for the{" "}
                      <em className="font-nyght-italic text-(--accent)">
                        black door.
                      </em>
                    </span>
                  ),
                  body: "Front Street runs north-south through the village. We're at 402 S Front Street — look for the black door with the Moxie logo on the window.",
                  cta: {
                    label: "Get directions",
                    href: siteConfig.address.mapsHref,
                  },
                },
                {
                  num: "02",
                  heading: (
                    <span>
                      Parking is{" "}
                      <em className="font-nyght-italic text-(--accent)">
                        easy.
                      </em>
                    </span>
                  ),
                  body: "A complimentary parking lot is located directly in front of the studio, making your visit easy from the moment you arrive.",
                  cta: null,
                },
                {
                  num: "03",
                  heading: (
                    <span>
                      Just{" "}
                      <em className="font-nyght-italic text-(--accent)">
                        yourself.
                      </em>
                    </span>
                  ),
                  body: "Arriving with clean lashes or brows is always helpful, but not required. We'll have cold drinks, sweet treats, and everything you need for a relaxing appointment.",
                  cta: null,
                },
              ].map(({ num, heading, body, cta }) => (
                <div key={num}>
                  <p className="font-nyght-bold text-[10px] tracking-[0.25em] uppercase text-(--background)/80 mb-4">
                    {num} ·{" "}
                    {num === "01"
                      ? "Finding us"
                      : num === "02"
                        ? "Parking"
                        : "What to bring"}
                  </p>
                  <h3 className="font-nyght text-xl md:text-2xl text-(--background) mb-4 leading-snug">
                    {heading}
                  </h3>
                  <p className="text-sm text-(--background) leading-relaxed mb-3 text-pretty">
                    {body}
                  </p>
                  {cta && (
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${cta.label} (opens in new tab)`}
                      className="text-sm font-bold text-(--accent) hover:underline underline-offset-4"
                    >
                      {cta.label} ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking CTA ───────────────────────────────────────────────── */}
        <Appointments context="visit" />
      </main>
    </>
  );
}
