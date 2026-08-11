import type { ReactNode } from "react";

interface FactStripProps {
  items: { k: string; v: ReactNode }[];
  /** "lg" (default, 22px) for pages without secondary line-wrap; "sm" for denser copy. */
  size?: "sm" | "lg";
}

export default function FactStrip({ items, size = "lg" }: FactStripProps) {
  const valueClass =
    size === "sm"
      ? "font-nyght text-[20px] text-(--foreground) leading-snug"
      : "font-nyght text-[22px] text-(--foreground)";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--line-soft)/80 rounded-2xl overflow-hidden border border-b-8 border-(--line-soft)">
      {items.map(({ k, v }) => (
        <div key={k} className="bg-(--background) px-7 py-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium mb-1">
            {k}
          </p>
          <p className={valueClass}>{v}</p>
        </div>
      ))}
    </div>
  );
}
