"use client";

import Button from "./button";
import { useBooking } from "@/context/BookingContext";
import { siteConfig } from "@/lib/site-config";

type AppointmentContext = "home" | "services" | "about" | "visit" | "contact";

interface AppointmentsProps {
  context?: AppointmentContext;
}

const ctaContent: Record<
  AppointmentContext,
  { eyebrow: string; heading: string }
> = {
  home: {
    eyebrow: "One chair. Your appointment.",
    heading: "Ready to find your Moxie?",
  },
  services: {
    eyebrow: "Something catch your eye?",
    heading: "Book the service that's calling you.",
  },
  about: {
    eyebrow: "Come say hello.",
    heading: "Jackie's ready when you are.",
  },
  visit: {
    eyebrow: "You're all caught up.",
    heading: "Go ahead and grab a time.",
  },
  contact: {
    eyebrow: "Let's get you on the books.",
    heading: "Find a time that works for you.",
  },
};

export default function Appointments({ context = "home" }: AppointmentsProps) {
  const { openBooking } = useBooking();
  const { eyebrow, heading } = ctaContent[context];

  return (
    <section
      id="Appointments"
      className="w-full bg-(--bg-soft)/90 border-y border-(--line-soft) px-6 py-24 text-center"
      tabIndex={-1}
      aria-label="Book an appointment"
    >
      <p className="font-nyght-bold text-[11px] tracking-[0.32em] uppercase text-(--accent-text) mb-5">
        {eyebrow}
      </p>
      <h2 className="font-nyght text-5xl lg:text-6xl bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent pb-2 mb-4 text-balance">
        {heading}
      </h2>
      {/* <p className="text-xl text-(--ink-soft) mb-12 text-balance max-w-xl mx-auto">
        {siteConfig.hours.note} &nbsp;·&nbsp; Rochester, WI
      </p> */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
