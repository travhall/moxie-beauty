// components/about.tsx
import Image from "next/image";
import Button from "@/components/button";
import homeImageOne from "@/public/images/jackie-profile.jpg";
import homeImageTwo from "@/public/images/moxie-home-room-one.jpg";
import homeImageThree from "@/public/images/moxie-home-room-two.jpg";

export default function About() {
  return (
    <section
      id="About"
      tabIndex={-1}
      aria-label="About section"
      className="py-32 lg:py-40 border-t border-(--line-soft)"
    >
      <div className="max-w-335 mx-auto px-10 max-[720px]:px-5.5">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* ── Offset duo ─────────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            className="relative aspect-4/5 w-[90%] max-w-140 mx-auto lg:mx-0"
          >
            {/* Large image — studio interior */}
            <div className="absolute inset-0 overflow-hidden rounded-xl lg:rounded-[64px] border border-l-8 border-(--accent) shadow-xl">
              <Image
                src={homeImageTwo}
                alt="Interior of one of Moxie Beauty Studio's treatment rooms"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                unoptimized
              />
            </div>

            {/* Small inset image — Jackie portrait, tucked over bottom-right corner */}
            <div className="absolute aspect-3/4.5 w-1/2 -bottom-12 -right-6 overflow-hidden border border-r-8 border-(--accent) rounded-xl lg:rounded-2xl lg:rounded-br-[48px] z-10 shadow-xl">
              <Image
                src={homeImageOne}
                alt="Jackie Schult, founder of Moxie Beauty Studio"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 27vw, 14vw"
                loading="lazy"
                unoptimized
              />
            </div>

            {/* Small inset image — Jackie portrait, tucked over bottom-right corner */}
            <div className="absolute aspect-4/3 w-2/3 -bottom-4 -left-6 overflow-hidden border border-l-8 border-(--accent) rounded-xl lg:rounded-2xl lg:rounded-bl-[64px] shadow-xl">
              <Image
                src={homeImageThree}
                alt="Interior of another one of Moxie Beauty Studio's treatment rooms"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 27vw, 14vw"
                loading="lazy"
                unoptimized
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
