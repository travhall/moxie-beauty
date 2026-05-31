"use client";

import { useBooking } from "@/context/BookingContext";
import DiagArrow from "./icons/DiagArrow";

export interface ServiceCardData {
  num: string;
  name: string;
  desc: string;
  meta: string[];
  variationId: string | null;
}

export default function ServiceCardClient({
  num,
  name,
  desc,
  meta,
  variationId,
}: ServiceCardData) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking(variationId ?? undefined, name)}
      aria-label={`Book ${name}`}
      className="group flex items-start gap-5 py-7 border-b border-(--line-soft) w-full text-left cursor-pointer bg-transparent px-4 -mx-4 rounded-xl hover:bg-[linear-gradient(to_right,transparent,var(--bg-soft)_15%,var(--bg-soft)_85%,transparent)] transition-all duration-300"
    >
      <span className="font-nyght-bold text-[11px] tracking-[0.25em] text-(--ink-mute) mt-1 min-w-5.5" aria-hidden="true">
        {num}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-nyght text-2xl md:text-3xl text-(--foreground) mb-2 group-hover:text-(--accent) transition-all duration-300">
          {name}
        </h3>
        <p className="text-sm text-(--ink-soft) leading-relaxed mb-4 text-pretty">
          {desc}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-(--ink-mute)">
          {meta.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
      <span className="text-(--ink-mute) group-hover:text-(--accent) transition-all duration-300 mt-1 shrink-0">
        <DiagArrow />
      </span>
    </button>
  );
}
