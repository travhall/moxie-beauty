"use client";

import Button from "./button";
import { useBooking } from "@/context/BookingContext";
import { siteConfig } from "@/lib/site-config";

/**
 * Home page booking CTA band.
 * The full appointment guide (prep, steps, aftercare) lives on the Visit page.
 */
export default function Appointments() {
  const { openBooking } = useBooking();

  return (
    <section
      id="Appointments"
      className="w-full bg-(--bg-soft) border-y border-(--line-soft) px-6 py-24 text-center"
      tabIndex={-1}
      aria-label="Book an appointment"
    >
      <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--accent) mb-5">
        By Appointment Only
      </p>
      <h2 className="font-nyght text-5xl lg:text-6xl bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent pb-2 mb-4 text-balance">
        Ready to Experience the Moxie Difference?
      </h2>
      <p className="text-xl text-(--ink-soft) mb-12 text-balance max-w-xl mx-auto">
        {siteConfig.hours.display} &nbsp;·&nbsp; Rochester, WI
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" showArrow onClick={() => openBooking()}>
          Book Your Appointment
        </Button>
        <Button size="lg" variant="ghost" href={siteConfig.contact.phoneHref}>
          {siteConfig.contact.phone}
        </Button>
      </div>
    </section>
  );
}
