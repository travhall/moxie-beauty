import type { Metadata } from "next";
import Image from "next/image";
import Appointments from "@/components/appointments";
import MarqueeTicker from "@/components/marquee-ticker";
import { containerClass } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Our Story | Moxie Beauty Studio",
  description:
    "Meet Jackie and learn the story behind Moxie Beauty Studio — a one-chair brow and lash studio in Rochester, WI where artistry meets individuality.",
  openGraph: {
    type: "website",
    url: "https://moxiebeautystudiowi.com/about",
    title: "Our Story | Moxie Beauty Studio",
    description:
      "Meet Jackie and learn the story behind Moxie Beauty Studio — a one-chair brow and lash studio in Rochester, WI.",
    images: [{ url: "/images/hero-img.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | Moxie Beauty Studio",
    description: "Meet Jackie and the story behind Moxie Beauty Studio.",
    images: ["/images/hero-img.jpg"],
  },
};

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  const container = containerClass;

  return (
    <main>
      {/* ── Page hero ─────────────────────────────────────────────────── */}
      {/* TODO: confirm founding year (2019) and review count with Jackie */}
      <section className="pt-14 pb-16 border-b border-(--line-soft)">
        <div className={container}>
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
            <span aria-current="page">About the studio</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 mb-16">
            <h1 className="font-nyght text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              Quiet hands,
              <br />
              careful{" "}
              <em className="font-nyght-italic not-italic text-(--accent)">
                eyes.
              </em>
            </h1>
            <p className="text-xl text-(--ink-soft) leading-relaxed self-end max-w-105">
              Moxie is a one-chair brow and lash studio in the village of
              Rochester, Wisconsin. We opened in 2019 with a small idea: that
              the people doing this kind of work should be allowed to take their
              time.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft) rounded-2xl overflow-hidden border border-(--line-soft)">
            {[
              { k: "Founded", v: "2019" },
              {
                k: "Studio size",
                v: (
                  <span>
                    1<em className="font-nyght-italic">:</em>1, always
                  </span>
                ),
              },
              { k: "Licensed", v: "WI Esthetician" },
              {
                k: "Reviews",
                v: (
                  <span>
                    312 · <em className="font-nyght-italic">5★</em>
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
      {/* TODO: ALL copy in this section is placeholder — needs Jackie's review */}
      <section className="py-20">
        <div className={container}>
          <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-20">
            {/* Portrait */}
            <div className="flex flex-col items-start gap-3">
              <div
                className="relative w-full max-w-85 overflow-hidden"
                style={{ borderRadius: "999px 999px 24px 24px" }}
              >
                <Image
                  src="/images/jackie-profile.jpg"
                  alt="Jackie, founder of Moxie Beauty Studio"
                  width={680}
                  height={900}
                  className="w-full object-cover"
                  priority
                />
              </div>
              <p className="font-nyght-bold text-[10px] tracking-[0.25em] uppercase text-(--ink-mute)">
                Jackie · founder
              </p>
            </div>

            {/* Bio */}
            <div className="lg:pt-8">
              <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-6">
                The founder
              </p>
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight mb-6">
                A studio built by someone who&apos;d{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">
                  rather
                </em>{" "}
                sit and study.
              </h2>
              <p className="text-xl text-(--ink-soft) mb-5 leading-relaxed">
                Jackie is a licensed esthetician with a quiet obsession for
                symmetry, the underside of a good brow shape, and the way a lash
                sits when nobody told it to.
              </p>
              <p className="text-(--ink-soft) mb-5 leading-relaxed">
                She trained in Milwaukee, worked several years in a much busier
                salon, and finally opened Moxie when she realized the work she
                wanted to do — the slow, mapped, half-an-hour-of-consultation
                kind — wasn&apos;t really possible alongside someone else&apos;s
                schedule. The studio is small on purpose.
              </p>
              <p className="text-(--ink-soft) leading-relaxed">
                When she isn&apos;t in studio, you&apos;ll find her in her
                garden in Burlington, or with a coffee somewhere nearby.
              </p>

              <div className="mt-10 pt-8 border-t border-(--line-soft)">
                <p className="font-nyght text-3xl text-(--foreground)">
                  Jackie
                  <em className="font-nyght-italic not-italic text-(--accent)">
                    .
                  </em>
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
          <div className="relative bg-(--bg-soft) border border-(--line-soft) rounded-3xl px-10 py-14 lg:px-20 lg:py-20 overflow-hidden">
            <span
              className="absolute -top-6 left-8 font-nyght text-[160px] leading-none text-(--accent) opacity-15 select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="relative font-nyght-italic text-3xl lg:text-4xl text-(--foreground) leading-snug max-w-2xl">
              Brows and lashes should look like they{" "}
              <em className="not-italic text-(--accent)">grew</em> that way
              <em className="not-italic text-(--accent)">.</em> Only a little
              better than the morning you happened to catch them at their best.
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
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 mb-14">
            <div>
              <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                Principles
              </p>
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight">
                Four{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">
                  things
                </em>{" "}
                we hold to.
              </h2>
            </div>
            <p className="text-(--ink-soft) lg:pt-12 lg:self-end leading-relaxed">
              Small choices, made the same way every appointment. They add up to
              the way the studio feels — and to whether you&apos;d come back.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-(--line-soft) rounded-2xl overflow-hidden border border-(--line-soft)">
            {[
              {
                num: "01",
                heading: (
                  <span>
                    One guest at a{" "}
                    <em className="font-nyght-italic not-italic text-(--accent)">
                      time.
                    </em>
                  </span>
                ),
                body: "No double-booking, no rushed handoffs, no waiting room. Your hour is yours. We never overlap appointments — even by a few minutes — so the studio stays quiet.",
              },
              {
                num: "02",
                heading: (
                  <span>
                    The consultation{" "}
                    <em className="font-nyght-italic not-italic text-(--accent)">
                      comes
                    </em>{" "}
                    first.
                  </span>
                ),
                body: "We map your features and talk through how you want to look before any wax or adhesive comes out. If a service isn't right for you that day, we'll say so.",
              },
              {
                num: "03",
                heading: (
                  <span>
                    Products we&apos;d use{" "}
                    <em className="font-nyght-italic not-italic text-(--accent)">
                      ourselves.
                    </em>
                  </span>
                ),
                body: "Vegan, cruelty-free adhesives. Plant-based brow tints. We don't carry anything we haven't tried on our own face, and we'll always tell you what we're using and why.",
              },
              {
                num: "04",
                heading: (
                  <span>
                    Aftercare is part of the{" "}
                    <em className="font-nyght-italic not-italic text-(--accent)">
                      work.
                    </em>
                  </span>
                ),
                body: "You leave with a small card of instructions written for your specific service, and a number you can text if anything feels off in the first week.",
              },
            ].map(({ num, heading, body }) => (
              <div key={num} className="bg-(--background) p-8 lg:p-10">
                <span className="font-nyght-bold text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) block mb-4">
                  {num}
                </span>
                <h3 className="font-nyght text-2xl text-(--foreground) mb-3 leading-snug">
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
      {/* TODO: "312 five-star reviews" is a placeholder */}
      <MarqueeTicker items={["slow work", "1:1 appointments", "vegan adhesives", "plant-based tints", "licensed esthetician", "rochester, wi", "312 five-star reviews"]} />

      {/* ── Studio mosaic ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className={container}>
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 mb-12">
            <div>
              <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-4">
                The space
              </p>
              <h2 className="font-nyght text-4xl lg:text-5xl leading-tight">
                A small,{" "}
                <em className="font-nyght-italic not-italic text-(--accent)">
                  light-filled
                </em>{" "}
                room.
              </h2>
            </div>
            <p className="text-(--ink-soft) lg:pt-12 lg:self-end leading-relaxed">
              We&apos;re tucked into a 1908 mercantile building on the south end
              of Front Street, with one north-facing window, soft Belgian linen,
              and a single chair that hasn&apos;t yet had a guest fall asleep in
              it.
            </p>
          </div>

          {/* Mosaic grid */}
          <div className="grid grid-cols-6 grid-rows-[280px_180px] gap-3 rounded-3xl overflow-hidden">
            {/* Tile 1: lobby photo — wide */}
            <div
              className="col-span-6 sm:col-span-3 row-span-2 relative overflow-hidden rounded-2xl"
              style={{ borderRadius: "40px 40px 16px 16px" }}
            >
              <Image
                src="/images/moxie-lobby.jpg"
                alt="The Moxie studio"
                fill
                className="object-cover"
              />
            </div>

            {/* Tile 2: placeholder — top right */}
            <div
              className="col-span-6 sm:col-span-3 row-span-1 bg-(--bg-soft) border border-(--line-soft) flex items-end p-5 rounded-2xl"
              style={{ borderRadius: "16px 40px 16px 16px" }}
            >
              <span className="font-nyght-bold text-[9px] tracking-[0.25em] uppercase text-(--ink-mute)">
                [ Studio · service chair detail ]
              </span>
            </div>

            {/* Tile 3: placeholder — bottom right */}
            <div
              className="col-span-6 sm:col-span-3 row-span-1 bg-(--bg-soft) border border-(--line-soft) flex items-end p-5 rounded-2xl"
              style={{ borderRadius: "16px 16px 40px 16px" }}
            >
              <span className="font-nyght-bold text-[9px] tracking-[0.25em] uppercase text-(--ink-mute)">
                [ Botanical · north window ]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking CTA ───────────────────────────────────────────────── */}
      <Appointments />
    </main>
  );
}
