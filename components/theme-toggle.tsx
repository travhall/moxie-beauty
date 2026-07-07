"use client";

import { useTheme } from "@/providers/theme-provider";
import { useRef, useState, useSyncExternalStore } from "react";

// SSR-safe "has this mounted on the client yet" flag — avoids a setState
// call inside a useEffect body just to force a post-hydration re-render.
const noopSubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

// ── Inline icons ─────────────────────────────────────────────────────────────
// Kept as local components so we don't pull in a full icon library for two glyphs.

function SunIcon({ className }: { className?: string }) {
  // Delicate 8-ray sun — centre disc + radiating strokes
  const rays = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="5.5" cy="5.5" r="2.1" fill="currentColor" />
      {rays.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={5.5 + Math.cos(rad) * 3.3}
            y1={5.5 + Math.sin(rad) * 3.3}
            x2={5.5 + Math.cos(rad) * 5.1}
            y2={5.5 + Math.sin(rad) * 5.1}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  // 4-pointed star matching the brand logomark sparkle
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5.5 0.4
           C5.5 0.4 5.85 3.35 7.15 4.6
           C8.45 5.85 11 5.5 11 5.5
           C11 5.5 8.45 5.15 7.15 6.4
           C5.85 7.65 5.5 10.6 5.5 10.6
           C5.5 10.6 5.15 7.65 3.85 6.4
           C2.55 5.15 0 5.5 0 5.5
           C0 5.5 2.55 5.85 3.85 4.6
           C5.15 3.35 5.5 0.4 5.5 0.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [squishing, setSquishing] = useState(false);
  // Prevent stacked clicks from re-triggering during animation
  const animating = useRef(false);

  const toggle = () => {
    if (animating.current) return;
    animating.current = true;
    setSquishing(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => {
      setSquishing(false);
      animating.current = false;
    }, 560);
  };

  // SSR placeholder — same dimensions so layout doesn't shift
  if (!mounted) {
    return <div className="w-14 h-7 rounded-full" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      role="switch"
      aria-checked={isDark}
      className={[
        // Size & base
        "relative inline-flex h-7 w-14 rounded-full shrink-0 cursor-pointer overflow-hidden",
        // Border
        "border border-(--line)",
        // Focus
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
        // Track fill
        isDark ? "bg-(--midnite-800)" : "bg-(--ivory-rose-100)",
        // Smooth everything
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      ].join(" ")}
    >
      {/* ── Rose-gold ambient bloom (dark mode only) ────────────────────── */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 78% 50%, color-mix(in oklab, var(--accent) 28%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* ── Thumb ── outer span: handles translateX position ────────────── */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-0.5 h-5.5 w-5.5",
          // Spring position transition
          "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isDark ? "translate-x-7.5" : "translate-x-0.5",
        ].join(" ")}
      >
        {/* ── Thumb inner: handles squish animation & visual styling ─────── */}
        <span
          className={[
            "flex h-full w-full items-center justify-center rounded-full",
            // Ivory face — always light so it pops off both track colors
            "bg-(--ivory-rose-50)",
            // Subtle shadow to lift it off the track
            "shadow-[0_1px_4px_color-mix(in_oklab,var(--midnite-800)_22%,transparent),0_0_0_0.5px_color-mix(in_oklab,var(--midnite-800)_6%,transparent)]",
            // Squish keyframe — applied while animating
            squishing ? "theme-thumb-squish" : "",
          ].join(" ")}
        >
          {/* Sun — visible in light mode */}
          <span
            className={[
              "absolute text-(--accent) transition-all duration-300",
              isDark
                ? "opacity-0 scale-50 rotate-60"
                : "opacity-100 scale-100 rotate-0",
            ].join(" ")}
          >
            <SunIcon />
          </span>

          {/* Sparkle — visible in dark mode */}
          <span
            className={[
              "absolute text-(--accent) transition-all duration-300",
              isDark
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-50 -rotate-60",
            ].join(" ")}
          >
            <SparkleIcon />
          </span>
        </span>
      </span>
    </button>
  );
}
