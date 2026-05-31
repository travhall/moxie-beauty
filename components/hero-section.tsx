"use client";

import Image from "next/image";
import Link from "next/link";
import HeroImg from "@/public/images/hero-img.jpg";
import Button from "@/components/button";
import { useBooking } from "@/context/BookingContext";
import { siteConfig } from "@/lib/site-config";

export default function HeroSection() {
  const { openBooking } = useBooking();

  return (
    <section
      className="relative min-h-[90vh] flex items-start overflow-hidden"
      id="hero"
      tabIndex={-1}
      aria-label="Hero section"
    >
      <div className="max-w-335 mx-auto px-10 max-[720px]:px-5.5 w-full relative z-20 py-20">
        <div className="flex lg:flex-row-reverse items-start gap-16 xl:gap-24">
          {/* ── Copy ──────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 max-w-180">
            {/* Eyebrow */}
            <p className="flex items-center gap-3 font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--ink-mute) mb-6">
              <span
                className="inline-block w-1.25 h-1.25 rounded-full bg-(--accent) shrink-0"
                aria-hidden="true"
              />
              Brow &amp; Lash Studio · Rochester, WI
            </p>

            {/* Headline */}
            <h1 className="font-nyght text-(--foreground) text-5xl sm:text-6xl md:text-7xl my-4 lg:my-6 text-balance">
              Welcome to{" "}
              <span className="inline-block bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent pr-2 pb-2">
                Moxie Beauty <span className="hidden lg:inline">Studio</span>
              </span>
            </h1>

            {/* Body copy */}
            <p className="text-pretty leading-relaxed max-w-[56ch] mb-10">
              Where artistry meets individuality. Specializing in bespoke lash
              and brow transformations, we craft personalized enhancements to
              highlight your natural beauty. Let your confidence shine with
              treatments designed for real life &mdash; and those extraordinary
              moments.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" showArrow onClick={() => openBooking()}>
                Make an Appointment
              </Button>
              <Button variant="ghost" size="lg" href="/services">
                Explore Services
              </Button>
            </div>

            {/* Meta strip */}
            <div className="flex gap-10 flex-wrap">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium mb-1">
                  Studio
                </p>
                <p className="font-nyght text-[19px] text-(--foreground)">
                  {siteConfig.hours.display}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium mb-1">
                  Call
                </p>
                <Link
                  href={siteConfig.contact.phoneHref}
                  className="font-nyght text-[19px] text-(--foreground) no-underline hover:text-(--accent) transition-colors rounded-full"
                >
                  {siteConfig.contact.phone}
                </Link>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium mb-1">
                  Email
                </p>
                <Link
                  href={siteConfig.contact.emailHref}
                  className="font-nyght text-[19px] text-(--foreground) no-underline hover:text-(--accent) transition-colors rounded-full"
                >
                  {siteConfig.contact.email}
                </Link>
              </div>
            </div>
          </div>

          {/* ── Hero image ──────────────────────────────────────────────── */}
          <div
            className="hidden lg:block shrink-0 w-1/2 max-w-120"
            aria-hidden="true"
          >
            <div
              className="relative w-full border border-(--line-soft) shadow-xl"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "32px 32px 32px 240px",
                overflow: "hidden",
              }}
            >
              <Image
                src={HeroImg}
                alt="Close up of a woman's face. She has amazing lashes."
                fill
                className="border border-l-16 border-(--accent) object-cover z-0"
                style={{ borderRadius: "inherit" }}
                sizes="(max-width: 1280px) 380px, (max-width: 1536px) 440px, 480px"
                quality={75}
                priority={true}
                fetchPriority="high"
                loading="eager"
                placeholder="blur"
                blurDataURL="data:image/png;base64,L3CFkh^300%LD*W.~BxG00xZ?aNG"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Image
        src={HeroImg}
        alt="Close up of a woman's face. She has amazing lashes."
        className="absolute top-0 right-0 w-60 md:w-1/3 2xl:w-[32vw] h-96 md:h-[48vh] lg:h-[64vh] xl:h-[80vh] 2xl:h-[88vh] rounded-bl-full rounded-tl-[15%] border-l-16 border-(--accent) object-cover z-0"
        sizes="(max-width: 768px) 15rem, (max-width: 1536px) 33vw, 32vw"
        quality={75}
        priority={true}
        fetchPriority="high"
        loading="eager"
        placeholder="blur"
        blurDataURL="data:image/png;base64,L3CFkh^300%LD*W.~BxG00xZ?aNG"
      /> */}
    </section>
  );
}
