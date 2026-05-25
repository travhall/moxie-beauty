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
    images: [{ url: "/images/hero-img.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Visit | Moxie Beauty Studio",
    description: "What to expect at Moxie Beauty Studio, from booking through aftercare.",
    images: ["/images/hero-img.jpg"],
  },
};

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function VisitPage() {
  const container = containerClass;

  return (
    <main>

      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <section className="pt-14 pb-16 border-b border-(--line-soft)">
        <div className={container}>

          <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-(--ink-mute) mb-10" aria-label="Breadcrumb">
            <a href="/" className="hover:text-(--accent) transition-colors">Moxie</a>
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-(--accent) mx-1" aria-hidden="true" />
            <span aria-current="page">Your Visit</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 mb-16">
            <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              Your appointment,<br />
              start to{" "}
              <em className="font-nyght-italic not-italic text-(--accent)">finish.</em>
            </h1>
            <p className="text-xl text-(--ink-soft) leading-relaxed self-end max-w-[420px]">
              Every visit follows the same quiet rhythm — a consultation first,
              then the work, then a few minutes to talk through aftercare. Here&apos;s
              what to expect from the moment you book.
            </p>
          </div>

          {/* Fact strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft) rounded-2xl overflow-hidden border border-(--line-soft)">
            {[
              { k: "Booking",    v: "By Square" },
              { k: "Studio",     v: siteConfig.hours.display },
              { k: "First visit", v: <em className="font-nyght-italic">Complimentary</em> },
              { k: "Sessions",   v: <span>30 – 150 <em className="font-nyght-italic">min</em></span> },
            ].map(({ k, v }) => (
              <div key={k} className="bg-(--background) px-7 py-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium mb-1">{k}</p>
                <p className="font-nyght text-[20px] text-(--foreground) leading-snug">{v}</p>
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
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight mb-6">
                Find a{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">quiet hour</em>{" "}
                for yourself.
              </h2>
              <p className="text-(--ink-soft) leading-relaxed mb-5">
                Booking is handled through Square — choose a service, pick a time
                that works, and you&apos;ll receive a confirmation with gentle reminders
                as the date approaches. Same-day openings appear at the top.
              </p>
              <p className="text-(--ink-soft) leading-relaxed">
                Not sure which service is right for you? Start with a complimentary
                first-visit consultation — 30 minutes, no service required.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-(--bg-soft)" style={{ borderRadius: "16px 40px 16px 40px" }}>
              <Image
                src="/images/appt-img4.jpg"
                alt="Booking your appointment"
                fill
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
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight mb-6">
                Arrive as{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">yourself.</em>
              </h2>
              <p className="text-(--ink-soft) leading-relaxed mb-5">
                If you can, come with a clean face — no eye makeup, no heavy
                moisturizer near the brows or lashes. It&apos;s not required, just
                helpful. If you&apos;re coming from work, we have makeup remover wipes.
              </p>
              <p className="text-(--ink-soft) leading-relaxed">
                Allow a few extra minutes to find parking on Front Street. And if
                you&apos;re nervous — that&apos;s normal. We&apos;ll talk through everything before
                anything happens.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-(--bg-soft) lg:order-1" style={{ borderRadius: "40px 16px 40px 16px" }}>
              <Image
                src="/images/appt-img2.jpg"
                alt="Preparing for your appointment"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Step 03 — During */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 border-b border-(--line-soft)">
            <div>
              <p className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) mb-5">
                03 · During
              </p>
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight mb-6">
                The consultation{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">comes</em>{" "}
                first.
              </h2>
              <p className="text-(--ink-soft) leading-relaxed mb-5">
                Every appointment starts with a mapping and a conversation. We&apos;ll
                look at your bone structure, talk through what you want to look
                like on a Monday and a Saturday, and only then start the actual
                service.
              </p>
              <p className="text-(--ink-soft) leading-relaxed">
                The studio is quiet and unhurried. There&apos;s usually tea, always
                music at low volume, and one chair — yours. We don&apos;t double-book.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-(--bg-soft)" style={{ borderRadius: "16px 40px 16px 40px" }}>
              <Image
                src="/images/appt-img.jpg"
                alt="During your appointment"
                fill
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
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight mb-6">
                You leave with{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">written</em>{" "}
                instructions.
              </h2>
              <p className="text-(--ink-soft) leading-relaxed mb-5">
                Before you go, we&apos;ll walk through exactly how to care for your
                new brows or lashes at home. You&apos;ll get a small card of
                instructions specific to your service — not a generic printout.
              </p>
              <p className="text-(--ink-soft) leading-relaxed">
                If anything feels off in the first week, text us. We&apos;d rather
                hear from you than have you wait until the next appointment.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-(--bg-soft) lg:order-1" style={{ borderRadius: "40px 16px 40px 16px" }}>
              <Image
                src="/images/appt-img3.jpg"
                alt="Aftercare instructions"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Arrival ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-(--bg-soft) border-t border-(--line-soft)">
        <div className={container}>
          <div className="mb-12">
            <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
              Finding us
            </p>
            <h2 className="font-nyght text-4xl lg:text-5xl leading-tight">
              402 S Front{" "}
              <em className="font-nyght-italic not-italic text-(--accent)">Street,</em>{" "}
              Rochester.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-14">
            {[
              {
                num: "01",
                heading: <span>The <em className="font-nyght-italic not-italic text-(--accent)">door</em> with the M.</span>,
                body: "Front Street runs north-south through the village. Look for the small painted M — you'll know it when you see it.",
                cta: { label: "Get directions →", href: siteConfig.address.mapsHref },
              },
              {
                num: "02",
                heading: <span>Free, on the <em className="font-nyght-italic not-italic text-(--accent)">street.</em></span>,
                body: "Street parking is free and rarely full. There's also a small village lot half a block south, behind the post office.",
                cta: null,
              },
              {
                num: "03",
                heading: <span>Just <em className="font-nyght-italic not-italic text-(--accent)">yourself.</em></span>,
                body: "Arrive with a clean face if you can. We have tea, water, and a small bench for jackets. Please come solo — no space to wait.",
                cta: null,
              },
            ].map(({ num, heading, body, cta }) => (
              <div key={num}>
                <p className="font-nyght-bold text-[10px] tracking-[0.25em] uppercase text-(--ink-mute) mb-4">
                  {num} · {num === "01" ? "Finding us" : num === "02" ? "Parking" : "What to bring"}
                </p>
                <h3 className="font-nyght text-2xl text-(--foreground) mb-4 leading-snug">
                  {heading}
                </h3>
                <p className="text-sm text-(--ink-soft) leading-relaxed mb-3">{body}</p>
                {cta && (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-(--accent) hover:underline underline-offset-4"
                  >
                    {cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ───────────────────────────────────────────────── */}
      <Appointments />

    </main>
  );
}
