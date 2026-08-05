"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

// SSR-safe "has this mounted on the client yet" flag — needed because the
// back-to-top button is rendered via a portal into document.body, which
// doesn't exist during server rendering. Same pattern as ThemeSwitch's
// useMounted in components/theme-toggle.tsx.
const noopSubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export interface JumpNavItem {
  /** Id of the target section this link jumps to (no leading "#"). */
  id: string;
  /** Large decorative marker rendered behind the label (e.g. a numeral). */
  marker: string;
  /** Visible link text. */
  label: string;
}

export interface JumpNavProps {
  items: JumpNavItem[];
  /** Accessible name for the <nav> landmark. */
  ariaLabel: string;
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
// Matches the IntersectionObserver's rootMargin top inset below — the band
// where a section is considered "current" starts 160px down from the
// viewport top (clearing the sticky header + this nav).
const TOP_ACTIVATION_OFFSET_PX = 160;

export default function JumpNav({ items, ariaLabel }: JumpNavProps) {
  const mounted = useMounted();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
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
      {
        rootMargin: `-${TOP_ACTIVATION_OFFSET_PX}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const firstId = items[0]?.id;
    const firstSection = firstId ? document.getElementById(firstId) : null;

    const onScroll = () => {
      setShowBackToTop(window.scrollY > BACK_TO_TOP_THRESHOLD_PX);
      // IntersectionObserver only fires when a section's intersection
      // state changes, and pickActiveId deliberately keeps the previous
      // active id when nothing is currently intersecting (to avoid
      // flickering between sections). That means once you scroll back up
      // past the first section entirely, there's nothing left to hand
      // activation off to, and it stays "stuck" on the first section
      // forever. This clears it explicitly once we're above the band
      // where the first section would start counting as active.
      if (
        firstSection &&
        firstSection.getBoundingClientRect().top > TOP_ACTIVATION_OFFSET_PX
      ) {
        setActiveId(null);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <nav aria-label={ariaLabel}>
        <ul className="flex flex-col md:flex-row md:flex-wrap py-2 list-none [&>li:first-child>a]:md:pl-0">
          {items.map(({ id, marker, label }) => {
            const isActive = activeId === id;
            const isDimmed = activeId !== null && !isActive;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative flex items-center overflow-hidden py-4 px-6 text-(--foreground) hover:text-(--accent) transition-[color,opacity] duration-300 hover:opacity-100 ${
                    isDimmed ? "opacity-45" : "opacity-100"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`font-nyght-italic absolute top-1/2 -translate-y-[52%] text-[48px] leading-none z-0 transition-all ${
                      isActive
                        ? "text-(--accent-soft)/60"
                        : "text-(--rose-gold-100) dark:text-(--rose-gold-800) group-hover:text-(--accent-soft)/60"
                    }`}
                  >
                    {marker}
                  </span>
                  <span
                    className={`relative z-10 font-sans font-semibold text-xs tracking-[0.14em] uppercase transition-colors ${
                      isActive
                        ? "text-(--foreground)"
                        : "text-(--ink-mute) group-hover:text-(--foreground)"
                    }`}
                  >
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {mounted &&
        createPortal(
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
          </button>,
          document.body,
        )}
    </>
  );
}
