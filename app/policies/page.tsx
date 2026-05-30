import type { Metadata } from "next";
import Appointments from "@/components/appointments";
import { containerClass } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Studio Policies | Moxie Beauty Studio",
  description:
    "Moxie Beauty Studio's client policies — cancellations, late arrivals, lash fill requirements, refunds, and more. Clear, fair, and straightforward.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/policies",
    title: "Studio Policies | Moxie Beauty Studio",
    description:
      "Client policies for Moxie Beauty Studio — cancellations, no-shows, lash fills, and more.",
    images: [{ url: "/images/hero-img.jpg", width: 1200, height: 630, alt: "Moxie Beauty Studio — lash and brow studio in Rochester, WI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Policies | Moxie Beauty Studio",
    description: "Client policies for Moxie Beauty Studio.",
    images: ["/images/hero-img.jpg"],
  },
};

const policies = [
  {
    num: "01",
    heading: "Cancellations",
    body: "A minimum of 24 hours' notice is required to cancel or reschedule. Cancellations made with less than 24 hours' notice are charged 50% of the scheduled service fee to the card on file. One courtesy exception may be granted for a genuine emergency — just communicate with us as soon as you can.",
  },
  {
    num: "02",
    heading: "No-Shows",
    body: "Appointments missed without any notice may be charged 100% of the scheduled service fee to the card on file. We understand life happens — a quick text goes a long way.",
  },
  {
    num: "03",
    heading: "Late Arrivals",
    body: "Appointments begin promptly as scheduled so every guest gets the full experience they deserve. If you arrive late, your service may be shortened to stay on schedule — full service fees still apply. Clients arriving 15 or more minutes late may be asked to reschedule and may be subject to the applicable cancellation fee.",
  },
  {
    num: "04",
    heading: "Lash Fill Policy",
    body: "Fill appointments are for maintaining existing extensions and require sufficient retention at the time of service. If you arrive with too few lashes remaining, the appointment may be adjusted to a full set price — or rescheduled if there isn't adequate time. Not sure if you have enough? Text us a photo before you come in.",
  },
  {
    num: "05",
    heading: "Maintenance Requirement",
    body: "To maintain lash health and proper balance, significantly grown-out extensions may need to be removed during fill appointments. Additional time or pricing may apply when corrective work is needed.",
  },
  {
    num: "06",
    heading: "Foreign Fill Policy",
    body: "Lash work performed by another artist is considered a foreign fill. Because products, techniques, and application quality vary between artists, foreign fills require additional assessment and aren't guaranteed to be accepted as a standard fill. They may be subject to an additional fee. If the existing work doesn't meet the standard needed to safely perform a fill, a removal and new set may be recommended.",
  },
  {
    num: "07",
    heading: "Refunds & Returns",
    body: "Due to the customized nature of lash and brow services, all services are non-refundable — what you're paying for is skill and time. If you experience significant lash loss (20 or more extensions) within 24 hours of your appointment, contact us promptly with photos and a complimentary 30-minute touch-up may be offered. Products are also non-returnable.",
  },
  {
    num: "08",
    heading: "Payments",
    body: "Cash and credit card are accepted. A credit card is required to hold your appointment. Cancellation and no-show fees are charged to the card on file.",
  },
  {
    num: "09",
    heading: "Children",
    body: "To keep the studio safe and relaxing for all clients, we ask that you make other arrangements for children while receiving services. The space is small and the work requires focus — we appreciate your understanding.",
  },
  {
    num: "10",
    heading: "Pricing",
    body: "Prices are subject to change at any time. Final pricing reflects the time and work involved in your specific service — listed prices are starting points.",
  },
  {
    num: "11",
    heading: "Your Rights as a Client",
    body: "You have the right to a clean, safe, and comfortable environment; to stop any treatment at any time for any reason; to be treated with consideration, dignity, and respect; to have your health information kept confidential; and to ask questions about your experience, products used, or our training and certifications.",
  },
  {
    num: "12",
    heading: "Privacy",
    body: "We respect the privacy of every client. Information collected is used solely for establishing client profiles and service records. We do not share client information with third parties for any purpose.",
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://moxiebeautystudiowi.com" },
    { "@type": "ListItem", position: 2, name: "Studio Policies", item: "https://moxiebeautystudiowi.com/policies" },
  ],
};

export default function PoliciesPage() {
  const container = containerClass;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main>
      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <section className="pt-14 pb-16 border-b border-(--line-soft)">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-(--ink-mute)">
              <li>
                <a href="/" className="hover:text-(--accent) transition-colors">Moxie</a>
              </li>
              <li aria-hidden="true">
                <span className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent) mx-1" />
              </li>
              <li>
                <span aria-current="page">Studio Policies</span>
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_540px] gap-10 mb-16">
            <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              Let&apos;s agree
              <br />
              to <em className="font-nyght-italic text-(--accent)">agree.</em>
            </h1>
            <p className="text-lg text-(--ink-soft) leading-relaxed self-end text-pretty">
              These policies exist to protect your time and ours. They&apos;re
              meant to be clear and fair — not fine print. If you have questions
              about any of them, just ask before you book.
            </p>
          </div>
        </div>
      </section>

      {/* ── Policies list ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className={container}>
          <div className="max-w-3xl">
            {policies.map(({ num, heading, body }) => (
              <div
                key={num}
                className="grid sm:grid-cols-[80px_1fr] gap-4 py-10 border-b border-(--line-soft)"
              >
                <span className="font-nyght-bold text-[11px] tracking-[0.3em] uppercase text-(--ink-mute) pt-1">
                  {num}
                </span>
                <div>
                  <h2 className="font-nyght text-2xl text-(--foreground) mb-3">
                    {heading}
                  </h2>
                  <p className="text-(--ink-soft) leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing note ──────────────────────────────────────────────── */}
      <section className="py-16 bg-(--foreground)">
        <div className={container}>
          <div className="max-w-2xl">
            <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--background)/80 mb-4">
              A note from Jackie
            </p>
            <p className="font-nyght text-3xl lg:text-4xl text-(--background) leading-snug mb-6">
              I genuinely love what I do — and I want every visit to feel that
              way for <em className="font-nyght-italic text-(--accent)">you</em>
              , too.
            </p>
            <p className="text-(--background)/80 leading-relaxed">
              These policies keep the studio running smoothly so that when
              you&apos;re in the chair, we can focus entirely on you. If
              something ever feels off, reach out — I&apos;d rather hear about
              it than have you leave wondering.
            </p>
          </div>
        </div>
      </section>

      {/* ── Booking CTA ───────────────────────────────────────────────── */}
      <Appointments context="visit" />
    </main>
    </>
  );
}
