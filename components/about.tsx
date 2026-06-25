// components/about.tsx
import Image from "next/image";
import Button from "@/components/button";
import profileImage from "@/public/images/jackie-profile.jpg";
import lobbyImage from "@/public/images/moxie-kiss.jpg";
import neonImage from "@/public/images/moxie-neon.jpg";

export default function About() {
  return (
    <section
      id="About"
      tabIndex={-1}
      aria-label="About section"
      className="py-32 lg:py-40 border-t border-(--line-soft)"
    >
      <div className="max-w-335 mx-auto px-10 max-[720px]:px-5.5">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 xl:gap-24 items-center">
          {/* ── Gallery mosaic ─────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "14px",
              aspectRatio: "5 / 6",
              width: "100%",
            }}
          >
            {/* gal-a: Jackie portrait — arched top-left corner */}
            <div
              style={{
                gridArea: "1 / 1",
                position: "relative",
                overflow: "hidden",
                borderRadius: "120px 14px 14px 14px",
                border: "1px solid var(--accent)",
                borderLeftWidth: "8px",
              }}
            >
              <Image
                src={profileImage}
                alt="Jackie Schult, founder of Moxie Beauty Studio"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 30vw, 18vw"
                loading="lazy"
              />
            </div>

            {/* gal-b: Studio interior — tall right tile, arched bottom-right corner */}
            <div
              style={{
                gridArea: "1 / 2 / 3 / 3",
                position: "relative",
                overflow: "hidden",
                borderRadius: "14px 14px 220px 14px",
                border: "1px solid var(--accent)",
                borderRightWidth: "8px",
              }}
            >
              <Image
                src={lobbyImage}
                alt="Poster in the Moxie lobby"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 35vw, 22vw"
                loading="lazy"
              />
            </div>

            {/* gal-c: Jackie at work — arched bottom-left corner */}
            <div
              style={{
                gridArea: "2 / 1",
                position: "relative",
                overflow: "hidden",
                borderRadius: "14px 14px 14px 120px",
                border: "1px solid var(--accent)",
                borderLeftWidth: "8px",
              }}
            >
              <Image
                src={neonImage}
                alt="Neon sign at Moxie that reads 'You're like really pretty'"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 30vw, 18vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Body ───────────────────────────────────────────────────── */}
          <div>
            <p className="flex items-center gap-3 font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-5">
              <span
                className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent) shrink-0"
                aria-hidden="true"
              />
              About the studio
            </p>

            <h2 className="font-nyght bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-4xl md:text-5xl leading-tight text-balance pb-1">
              Discover the Heart &amp; Soul of Moxie
            </h2>

            <p className="text-[17px] leading-relaxed text-(--ink-soft) mt-6 mb-4">
              Moxie Beauty Studio is owned and operated by{" "}
              <strong className="text-(--foreground) font-semibold">
                Jackie Schult
              </strong>
              . Jackie specializes in{" "}
              <em className="italic font-bold text-(--accent-text)">
                eyelash extensions, lash lift and tint, brow lamination, and
                microblading
              </em>
              . Her dedication to craft drives her to keep learning — every
              service is built around the client in the chair, not a template.
            </p>

            <p className="leading-relaxed text-(--ink-soft)">
              Every detail at Moxie is intentional — from the scents in the
              studio to the way appointments are structured. Jackie isn&apos;t
              just offering a service; she&apos;s creating an experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-7 border-t border-(--line)">
              <div>
                <div className="font-nyght text-[40px] leading-none text-(--foreground)">
                  Est.{" "}
                  <span className="font-nyght-italic text-(--accent)">
                    &#8217;21
                  </span>
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-(--ink-mute) mt-2">
                  Rochester, WI
                </div>
              </div>
              <div>
                <div className="font-nyght text-[40px] leading-none text-(--foreground)">
                  1<span className="font-nyght-italic text-(--accent)">:</span>1
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-(--ink-mute) mt-2">
                  Always
                </div>
              </div>
              <div>
                <div className="font-nyght text-[34px] leading-none text-(--foreground)">
                  5<span className="font-nyght-italic text-(--accent)">★</span>
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-(--ink-mute) mt-2">
                  On Google
                </div>
              </div>
            </div>

            <div className="mt-9">
              <Button variant="ghost" href="/about" showArrow>
                The Moxie Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
