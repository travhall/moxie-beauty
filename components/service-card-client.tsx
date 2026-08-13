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

  // A trailing "(Most Popular)"-style tag lives in the Square catalog name
  // itself (no separate "featured" field is available through the API), so
  // it's pulled out here and rendered as a real badge instead of plain text.
  // Parenthetical suffixes that contain a digit (e.g. "(15-21 Days)",
  // "(Up to 14 Days)") are duration info, not a promo tag — leave those in
  // the title untouched.
  const badgeMatch = name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const badgeCandidate = badgeMatch ? badgeMatch[2] : null;
  const badge = badgeCandidate && !/\d/.test(badgeCandidate) ? badgeCandidate : null;
  const displayName = badge ? badgeMatch![1] : name;

  return (
    <button
      type="button"
      onClick={() => openBooking(variationId ?? undefined, name)}
      aria-label={`Book ${name}`}
      className="group flex items-start gap-5 py-7 border-b border-(--line-soft) w-full text-left cursor-pointer bg-transparent px-4 -mx-4 rounded-xl hover:bg-[linear-gradient(to_right,transparent,var(--bg-soft)_15%,var(--bg-soft)_85%,transparent)] transition-all duration-300"
    >
      <span
        className="font-nyght-bold text-[11px] tracking-[0.25em] text-(--ink-mute) mt-1 min-w-5.5"
        aria-hidden="true"
      >
        {num}
      </span>
      <div className="flex-1 min-w-0">
        {badge && (
          <span className="inline-block mb-2 px-2.5 py-1 rounded-full bg-(--accent)/15 text-(--accent) text-[10px] font-nyght-bold tracking-[0.15em] uppercase">
            {badge}
          </span>
        )}
        <h3 className="font-nyght text-2xl md:text-3xl text-(--foreground) mb-2 group-hover:text-(--accent) transition-all duration-300">
          {displayName}
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
      <span
        className="shrink-0 mt-1 w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--ink-mute) group-hover:border-(--accent) group-hover:text-(--accent) transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden="true"
      >
        <DiagArrow />
      </span>
    </button>
  );
}
