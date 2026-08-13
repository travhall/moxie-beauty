"use client";

import Button from "./button";
import { useBooking } from "@/context/BookingContext";
import { containerClass } from "@/lib/layout";

export default function ConsultationPromo() {
  const { openBooking } = useBooking();

  return (
    <section
      className="py-8 border-b border-(--line-soft) bg-(--bg-soft)"
      aria-label="First-time visitor consultation"
    >
      <div className={containerClass}>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <p className="text-(--ink-soft) max-w-2xl text-pretty">
            <strong className="text-(--foreground) font-nyght text-lg mr-1">
              New here?
            </strong>
            Not sure where to start? Book a visit and we&apos;ll talk through
            your goals before we begin — no service needs to be picked ahead
            of time.
          </p>
          <Button size="sm" variant="outline" onClick={() => openBooking()}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
