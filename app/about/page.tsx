import type { Metadata } from "next";
import Image from "next/image";
import Appointments from "@/components/appointments";
import MarqueeTicker from "@/components/marquee-ticker";
import { containerClass } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Our Story | Moxie Beauty Studio",
  description:
    "Meet Jackie and learn the story behind Moxie Beauty Studio — a one-chair lash and brow studio in Rochester, WI where artistry meets individuality.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/about",
    title: "Our Story | Moxie Beauty Studio",
    description:
      "Meet Jackie and the story behind Moxie Beauty Studio — a one-chair lash and brow studio in Rochester, WI.",
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
    title: "Our Story | Moxie Beauty Studio",
    description: "Meet Jackie and the story behind Moxie Beauty Studio.",
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
      name: "Our Story",
      item: "https://moxiebeautystudiowi.com/about",
    },
  ],
};

export default function AboutPage() {
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
                  <span aria-current="page">About the studio</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_540px] gap-10 mb-16">
              <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
                More than
                <br />
                <em className="font-nyght-italic text-(--accent)">beauty.</em>
              </h1>
              <p className="text-lg text-(--ink-soft) leading-relaxed self-end text-pretty">
                Moxie was built on the belief that beauty services should feel
                personal.
              </p>
            </div>

            {/* Fact strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft)/80 rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
              {[
                { k: "Founded", v: "2021" },
                {
                  k: "Your appointment",
                  v: (
                    <span>
                      1<em className="font-nyght-italic">:</em>1, always
                    </span>
                  ),
                },
                { k: "Specialist", v: "Lashes & Brows" },
                {
                  k: "Reviews",
                  v: (
                    <span>
                      5<em className="font-nyght-italic">★</em> on Google
                    </span>
                  ),
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

        {/* ── Founder ───────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className={container}>
            <div className="grid md:grid-cols-[340px_1fr] gap-8 md:gap-x-12 md:gap-y-12 lg:gap-x-16 lg:gap-y-8">
              {/* Portrait — spans both text rows on desktop */}
              <div className="lg:row-span-2 lg:ml-8 lg:mt-16">
                <div
                  className="relative w-full max-w-85 rounded-t-[170px] rounded-b-2xl overflow-hidden border-l-8 border-b-2 border-(--accent) shadow-xl bg-(--accent)"
                  style={{ height: "400px" }}
                >
                  <Image
                    src="/images/jackie-profile.jpg"
                    alt="Jackie Schult, founder of Moxie Beauty Studio"
                    width={680}
                    height={900}
                    className="w-full h-full object-cover object-top"
                    sizes="340px"
                    priority
                  />
                </div>
              </div>

              {/* Eyebrow + Heading — beside image on tablet+, above body on desktop */}
              <div className="md:self-center lg:self-auto lg:pt-8">
                <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-6">
                  The founder
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                  Built from a love of beauty — and a need to do it{" "}
                  <em className="font-nyght-italic text-(--accent)">right.</em>
                </h2>
              </div>

              {/* Body + Signature — full width on tablet, right column on desktop */}
              <div className="md:col-span-2 lg:col-span-1 lg:col-start-2 max-w-[72ch]">
                <p className="text-xl text-(--ink-soft) mb-5 leading-relaxed">
                  Jackie has always had a passion for helping women feel
                  confident and like the best version of themselves. Learning
                  lash extensions felt like a natural first step — and once she
                  started, she couldn&apos;t stop.
                </p>
                <p className="text-(--ink-soft) mb-5 leading-relaxed">
                  She trained at The Beauty Room in Eau Claire, with additional
                  specialty brow training in Chicago. As Moxie grew, so did
                  Jackie&apos;s vision. What began as a passion for beauty
                  evolved into a thoughtfully curated experience where every
                  detail — from the services provided to the atmosphere of the
                  studio — is designed with intention, comfort, and confidence
                  in mind.
                </p>
                <p className="text-(--ink-soft) leading-relaxed">
                  Outside the studio, Jackie is a wife and mom to three kids who
                  she&apos;d describe as pretty rad. She loves small-town life
                  in Rochester, making memories with the people she loves — and
                  is rarely without an ice-cold Diet Coke.
                </p>

                {/* cSpell:ignore wasn couldn */}

                <div className="mt-10 pt-8 border-t border-(--line-soft)">
                  <p className="font-nyght text-3xl text-(--foreground)">
                    Jackie
                    <em className="font-nyght-italic text-(--accent)">.</em>
                  </p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-(--ink-mute) mt-1">
                    Founder &amp; lead artist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pull quote ────────────────────────────────────────────────── */}
        <section className="py-12">
          <div className={container}>
            <div className="relative bg-(--bg-soft) border border-b-8 border-(--line-soft) rounded-3xl px-10 py-14 lg:px-20 lg:py-20 overflow-hidden">
              <span
                className="absolute -top-6 left-8 font-nyght text-[160px] leading-none text-(--accent) opacity-15 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="relative font-nyght-italic text-3xl lg:text-4xl text-(--foreground) leading-snug max-w-2xl text-balance">
                While beautiful results matter, what matters most is how clients
                feel while they&apos;re{" "}
                <em className="text-(--accent)">here.</em>
              </blockquote>
              <div className="flex items-center gap-3 mt-8">
                <span
                  className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent)"
                  aria-hidden="true"
                />
                <span className="text-[11px] tracking-[0.25em] uppercase text-(--ink-mute)">
                  Jackie · the Moxie philosophy
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Principles ────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className={container}>
            <div className="grid lg:grid-cols-[1fr_540px] gap-16 mb-14">
              <div>
                <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                  Principles
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                  Four{" "}
                  <em className="font-nyght-italic text-(--accent)">things</em>{" "}
                  we hold to.
                </h2>
              </div>
              <p className="text-(--ink-soft) lg:pt-12 lg:self-end leading-relaxed">
                Confidence looks different on everyone. That&apos;s why
                everything we do is customized, intentional, and designed to
                help you feel your best.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-(--line-soft) rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
              {[
                {
                  num: "01",
                  heading: (
                    <span>
                      Personalized{" "}
                      <em className="font-nyght-italic text-(--accent)">
                        attention.
                      </em>
                    </span>
                  ),
                  body: "At Moxie, every service is approached with care, intention, and attention to detail. The focus is on creating a customized experience that never feels rushed and always feels personal.",
                },
                {
                  num: "02",
                  heading: (
                    <span>
                      Beauty is never{" "}
                      <em className="font-nyght-italic text-(--accent)">
                        one-size-fits-all.
                      </em>
                    </span>
                  ),
                  body: "No two clients are the same, and no two services should be either. Every recommendation, lash set, brow service, and treatment is thoughtfully customized to your features, lifestyle, and goals.",
                },
                {
                  num: "03",
                  heading: (
                    <span>
                      Every detail is{" "}
                      <em className="font-nyght-italic text-(--accent)">
                        intentional.
                      </em>
                    </span>
                  ),
                  body: "From the mini fridge stocked with cold drinks to the little touches throughout the studio, every detail is chosen to create an experience that feels comfortable, welcoming, and uniquely Moxie.",
                },
                {
                  num: "04",
                  heading: (
                    <span>
                      Confidence doesn&apos;t end at{" "}
                      <em className="font-nyght-italic text-(--accent)">
                        checkout.
                      </em>
                    </span>
                    // cSpell:ignore doesn
                  ),
                  body: "Beautiful results are only part of the experience. We believe in setting clients up for success with education, aftercare, and ongoing support long after the appointment is over.",
                },
              ].map(({ num, heading, body }) => (
                <div key={num} className="bg-(--background) p-8 lg:p-10">
                  <span className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) block mb-4">
                    {num}
                  </span>
                  <h3 className="font-nyght text-xl md:text-2xl text-(--foreground) mb-3 leading-snug">
                    {heading}
                  </h3>
                  <p className="text-sm text-(--ink-soft) leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Marquee ───────────────────────────────────────────────────── */}
        <MarqueeTicker
          items={[
            "1:1 appointments",
            "est. 2021",
            "intentional by design",
            "brows & lashes",
            "rochester, wi",
            "5★ on google",
            "beautiful & intentional",
          ]}
        />

        {/* ── Studio mosaic ─────────────────────────────────────────────── */}
        <section className="py-20">
          <div className={container}>
            <div className="grid lg:grid-cols-[1fr_540px] justify-between gap-16 mb-12">
              <div>
                <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                  The space
                </p>
                <h2 className="font-nyght text-4xl md:text-5xl leading-tight text-balance">
                  A space designed with{" "}
                  <em className="font-nyght-italic text-(--accent)">
                    intention.
                  </em>
                </h2>
              </div>
              <p className="text-(--ink-soft) lg:pt-12 lg:self-end leading-relaxed">
                Moxie was designed to feel like a breath of fresh air. Created
                with comfort, confidence, and connection in mind, it&apos;s a
                space where every detail serves a purpose — from the carefully
                curated d&eacute;cor to the little touches clients have come to
                love.
              </p>
            </div>

            {/* Mosaic grid */}
            <div className="grid grid-cols-6 grid-rows-[280px_180px] gap-3 rounded-3xl">
              {/* Tile 1: lobby photo — wide */}
              <div className="col-span-6 sm:col-span-3 row-span-2 relative overflow-hidden rounded-sm rounded-l-2xl border border-l-8 border-(--accent) shadow-xl">
                <Image
                  src="/images/moxie-lobby.jpg"
                  alt="The Moxie studio"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tile 2: placeholder — top right */}
              <div
                aria-hidden="true"
                className="col-span-6 sm:col-span-3 row-span-1 bg-(--bg-soft) border flex items-end p-5 relative overflow-hidden rounded-sm rounded-tr-2xl border-r-8 border-(--accent) shadow-xl"
              >
                <span className="font-nyght-bold text-[9px] tracking-[0.25em] uppercase text-(--ink-mute)">
                  [ Studio · service chair detail ]
                </span>
              </div>

              {/* Tile 3: placeholder — bottom right */}
              <div
                aria-hidden="true"
                className="col-span-6 sm:col-span-3 row-span-1 bg-(--bg-soft) border flex items-end p-5 relative overflow-hidden rounded-sm rounded-br-2xl border-r-8 border-(--accent) shadow-xl"
              >
                <span className="font-nyght-bold text-[9px] tracking-[0.25em] uppercase text-(--ink-mute)">
                  [ Botanical · north window ]
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Booking CTA ───────────────────────────────────────────────── */}
        <Appointments context="about" />
      </main>
    </>
  );
}
