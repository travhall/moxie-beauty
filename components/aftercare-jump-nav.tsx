"use client";

import { useEffect, useState } from "react";

export interface AftercareJumpNavGroup {
  num: string;
  category: string;
}

export interface AftercareJumpNavProps {
  groups: AftercareJumpNavGroup[];
}

interface ObservedEntry {
  id: string;
  isIntersecting: boolean;
  intersectionRatio: number;
}

/**
 * Picks the active section id from a batch of IntersectionObserver entries.
 * The most-visible intersecting entry wins; if nothing is intersecting in
 * this batch, the previous active id is kept (avoids flickering to `null`
 * during the brief gap between one section leaving and the next entering).
 */
export function pickActiveId(
  entries: ObservedEntry[],
  previousId: string | null,
): string | null {
  const visible = entries.filter((e) => e.isIntersecting);
  if (visible.length === 0) return previousId;
  return visible.reduce((best, e) =>
    e.intersectionRatio > best.intersectionRatio ? e : best,
  ).id;
}

const BACK_TO_TOP_THRESHOLD_PX = 600;

export default function AftercareJumpNav({ groups }: AftercareJumpNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const ids = groups.map(({ num }) => `aftercare-${num.toLowerCase()}`);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        setActiveId((previous) =>
          pickActiveId(
            observerEntries.map((entry) => ({
              id: entry.target.id,
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
            })),
            previous,
          ),
        );
      },
      // Treats a section as "current" once it's in the band just below the
      // sticky global header + this sticky jump nav (~160px combined), and
      // stops counting it once it's scrolled past the upper 40% of the
      // viewport — keeps exactly one section active at a time instead of
      // flickering between two when they're both partially visible.
      { rootMargin: "-160px 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > BACK_TO_TOP_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <nav aria-label="Aftercare sections">
      <ul className="flex flex-col md:flex-row md:flex-wrap py-2 list-none [&>li:first-child>a]:md:pl-0">
        {groups.map(({ num, category }) => {
          const id = `aftercare-${num.toLowerCase()}`;
          const isActive = activeId === id;
          return (
            <li key={num}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className="group relative flex items-center overflow-hidden py-4 px-6 text-(--foreground) hover:text-(--accent) transition-colors"
              >
                <span
                  aria-hidden="true"
                  className={`font-nyght-italic absolute top-1/2 -translate-y-[52%] text-[48px] leading-none z-0 transition-all ${
                    isActive
                      ? "text-(--accent-soft)/60"
                      : "text-(--rose-gold-100) dark:text-(--rose-gold-800) group-hover:text-(--accent-soft)/60"
                  }`}
                >
                  {num}
                </span>
                <span
                  className={`relative z-10 font-sans font-semibold text-xs tracking-[0.14em] uppercase transition-colors ${
                    isActive
                      ? "text-(--foreground)"
                      : "text-(--ink-mute) group-hover:text-(--foreground)"
                  }`}
                >
                  {category}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      </nav>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`md:hidden fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-(--line-soft) bg-(--background)/90 backdrop-blur-md text-(--foreground) shadow-lg transition-opacity duration-300 ${
          showBackToTop
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 13V3M8 3L3 8M8 3L13 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
