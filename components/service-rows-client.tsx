"use client";

import { useBooking } from "@/context/BookingContext";
import DiagArrow from "./icons/DiagArrow";

export interface ServiceRowData {
  num: string;
  name: string;
  desc: string;
  meta: { label: string; value: string }[];
  variationId: string | null;
}

function ServiceRow({
  num,
  name,
  desc,
  meta,
  variationId,
  isOdd,
}: ServiceRowData & { isOdd: boolean }) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking(variationId ?? undefined, name)}
      aria-label={`Book ${name}`}
      className={[
        "group flex gap-7 items-start border-b border-(--line) py-9 text-(--foreground)",
        "w-full text-left cursor-pointer bg-transparent transition-all duration-300",
        "odd:hover:bg-linear-to-l odd:hover:from-(--bg-soft) odd:hover:to-transparent",
        "even:hover:bg-linear-to-r even:hover:from-(--bg-soft) even:hover:to-transparent",
        isOdd ? "sm:border-r sm:border-(--line) sm:pr-15" : "sm:pl-10",
      ].join(" ")}
    >
      {/* Service number */}
      <span className="font-mono text-[11px] tracking-widest text-(--ink-mute) pt-1.5 shrink-0 tabular-nums" aria-hidden="true">
        {num}
      </span>

      {/* Name + description + meta */}
      <div className="flex-1 min-w-0">
        <h3 className="font-nyght text-[26px] lg:text-[30px] leading-tight text-(--foreground) mb-2.5 group-hover:text-(--accent) transition-all duration-300">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-(--ink-soft) mb-4 max-w-[46ch] text-pretty">
          {desc}
        </p>
        <div className="flex gap-4 flex-wrap">
          {meta.map(({ label, value }) => (
            <span
              key={label}
              className="text-[11px] tracking-[0.18em] uppercase text-(--ink-mute)"
            >
              {label}{" "}
              <strong className="text-(--foreground) font-medium ml-1">
                {value}
              </strong>
            </span>
          ))}
        </div>
      </div>

      {/* Diagonal arrow */}
      <span
        className="shrink-0 mt-1 w-9 h-9 rounded-full border border-(--line) flex items-center justify-center text-(--ink-soft) group-hover:border-(--accent) group-hover:text-(--accent) transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden="true"
      >
        <DiagArrow />
      </span>
    </button>
  );
}

export default function ServiceRowsClient({
  services,
}: {
  services: ServiceRowData[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-(--line)">
      {services.map((svc, i) => (
        <ServiceRow key={svc.num} {...svc} isOdd={i % 2 === 0} />
      ))}
    </div>
  );
}
