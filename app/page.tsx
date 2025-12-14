"use client";

import { useState } from "react";
import Image from "next/image";
import HeroImg from "../public/images/hero-img.jpg";
import Button from "@/components/button";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Services from "@/components/services";
import Appointments from "@/components/appointments";
import BookingOverlay from "@/components/booking-overlay";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useFadeInOnScroll();

  return (
    <main>
      <section
        className="min-h-screen md:min-h-[70vh] w-full grid place-items-center lg:place-items-start p-4"
        id="hero"
        tabIndex={-1}
        aria-label="Hero section"
      >
        <div className="content bg-(--background)/80 backdrop-blur relative p-4 lg:p-0 mt-32 lg:mt-0 w-full max-w-[72ch] rounded-tr-4xl lg:left-56 z-20">
          <h1 className="font-nyght text-(--foreground) text-6xl xl:text-7xl my-8 text-balance fade-in-section">
            Welcome to{" "}
            <span className="inline-block bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent pr-2 pb-2">
              Moxie Beauty <span className="hidden lg:inline">Studio</span>
            </span>
          </h1>
          <p className="text-base text-balance mb-10 fade-in-section delay-100">
            Where artistry meets individuality. Specializing in bespoke lash and
            brow transformations, we craft personalized enhancements to
            highlight your natural beauty. Let your confidence shine with
            treatments designed for real life &mdash; and those extraordinary
            moments.
          </p>
          <ul
            className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 mb-4 space-y-4 md:space-y-0 fade-in-section delay-200"
            id="contact-hero"
          >
            <li>
              <Button
                className="w-full md:w-auto"
                variant="default"
                size="lg"
                onClick={() => setIsBookingOpen(true)}
              >
                Make an Appointment
              </Button>
            </li>
            <li className="text-base flex md:flex-col gap-2 md:gap-0">
              <span className="font-nyght-bold text-(--accent)">Phone</span>
              <a
                href="tel:2623326072"
                className="font-semibold no-underline text-nowrap before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative"
              >
                (262) 332-6072
              </a>
            </li>
            <li className="text-base flex md:flex-col gap-2 md:gap-0">
              <span className="font-nyght-bold text-(--accent)">Email</span>
              <a
                href="mailto:hello@moxiebeautystudiowi.com"
                className="font-semibold no-underline text-nowrap before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative"
              >
                hello@moxiebeautystudiowi.com
              </a>
            </li>
          </ul>
        </div>
        <Image
          src={HeroImg}
          alt="Close up of a woman's face. She has amazing lashes."
          className="absolute top-0 right-0 w-60 md:w-1/3 2xl:w-[32vw] h-96 md:h-[48vh] lg:h-[64vh] xl:h-[80vh] 2xl:h-[88vh] rounded-bl-full rounded-tl-[15%] border-l-16 border-(--accent) object-cover z-0 fade-in-section delay-300"
          sizes="(max-width: 768px) 15rem, (max-width: 1536px) 33vw, 32vw"
          quality={90}
          priority={true}
          loading="eager"
          placeholder="blur"
          blurDataURL="data:image/png;base64,L3CFkh^300%LD*W.~BxG00xZ?aNG"
        />
      </section>

      <div className="w-full h-32 bg-linear-to-b from-(--background) sticky top-0 z-20" />

      <Services onBookingClick={() => setIsBookingOpen(true)} />
      <Appointments onBookingClick={() => setIsBookingOpen(true)} />
      <div className="w-full h-32 bg-linear-to-t from-(--background) sticky bottom-0 z-20 -mt-32 pointer-events-none" />
      <About onBookingClick={() => setIsBookingOpen(true)} />
      <Testimonials />

      <BookingOverlay
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
