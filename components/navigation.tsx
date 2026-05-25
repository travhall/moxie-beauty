"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import Button from "./button";
import { useBooking } from "@/context/BookingContext";
import { siteConfig } from "@/lib/site-config";

interface NavItem {
  /** Display label in the navigation */
  name: string;
  /** Page route — used as the link href */
  href: string;
}

const NAV_HEIGHT_PX = 78;

export default function Navigation() {
  const { openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Our Services", href: "/services" },
    { name: "Your Visit", href: "/visit" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Active-state: purely route-based
  const pathname = usePathname();
  const isNavActive = (item: NavItem) => pathname.startsWith(item.href);

  // Close drawer when navigation commits — so the drawer closes to reveal the
  // incoming page rather than the outgoing one
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Transparent-at-top effect: fade in background + shadow on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // sync immediately on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Gooey desktop nav blob ─────────────────────────────────────────────────
  //
  // The effect works in two layers:
  //   1. A blob div (absolutely positioned, rounded-full) that moves and stretches
  //      between nav items. It sits inside a container that has an SVG gooey filter
  //      applied — feGaussianBlur + feColorMatrix alpha threshold — which makes the
  //      blob's edges look organic/liquid rather than perfectly geometric.
  //   2. The nav links sit on top (z-10) on a separate unfiltered layer so the
  //      filter doesn't blur the text.
  //
  // Animation has two phases:
  //   Phase 1 — stretch: the blob quickly extends to cover both the old and new
  //             item positions, creating a liquid bridge.
  //   Phase 2 — snap: the blob contracts to sit only under the new item, with a
  //             spring-y overshoot easing for the organic feel.

  const desktopNavRef = useRef<HTMLElement>(null);
  const blobTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevBlobRef = useRef<{ left: number; width: number } | null>(null);
  const [blobStyle, setBlobStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  // Cleanup pending timeout on unmount
  useEffect(() => {
    return () => {
      if (blobTimeoutRef.current) clearTimeout(blobTimeoutRef.current);
    };
  }, []);

  // ── Focus management ───────────────────────────────────────────────────────
  // Move focus into the drawer on open; return it to the trigger on close.
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerFirstLinkRef = useRef<HTMLAnchorElement>(null);
  const hasOpenedMenuRef = useRef(false);

  useEffect(() => {
    if (menuOpen) {
      hasOpenedMenuRef.current = true;
      // Defer so the drawer is visible before focus moves
      requestAnimationFrame(() => drawerFirstLinkRef.current?.focus());
    } else if (hasOpenedMenuRef.current) {
      hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  const handleLinkEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const nav = desktopNavRef.current;
      if (!nav) return;

      const navRect = nav.getBoundingClientRect();
      const linkRect = (e.currentTarget as HTMLElement).getBoundingClientRect();

      const newLeft = linkRect.left - navRect.left;
      const newWidth = linkRect.width;
      const padY = 12;
      const top = linkRect.top - navRect.top - padY;
      const height = linkRect.height + padY * 2;

      if (blobTimeoutRef.current) clearTimeout(blobTimeoutRef.current);

      // Respect the OS reduce-motion preference — skip the two-phase animation
      // and just snap the blob directly to its destination.
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!prevBlobRef.current || reducedMotion) {
        // First hover or reduced-motion — snap directly to position
        setBlobStyle({
          left: newLeft,
          top,
          width: newWidth,
          height,
          opacity: 1,
          transform: "scaleY(1)",
          transition: reducedMotion
            ? "none"
            : "opacity 0.18s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        });
      } else {
        const prev = prevBlobRef.current;
        const movingRight = newLeft > prev.left;

        // Phase 1: stretch to bridge old + new positions; squish height so the
        // blob "thins out" as it pours — amplifies the liquid mercury feel
        if (movingRight) {
          // Moving right: left edge holds, right edge rushes ahead
          setBlobStyle({
            left: prev.left,
            top,
            width: newLeft + newWidth - prev.left,
            height,
            opacity: 1,
            transform: "scaleY(0.3)",
            transition:
              "width 0.22s cubic-bezier(0.4,0,0.6,1), transform 0.22s cubic-bezier(0.4,0,0.6,1), opacity 0.18s ease",
          });
        } else {
          // Moving left: right edge holds, left edge rushes ahead
          setBlobStyle({
            left: newLeft,
            top,
            width: prev.left + prev.width - newLeft,
            height,
            opacity: 1,
            transform: "scaleY(0.3)",
            transition:
              "left 0.22s cubic-bezier(0.4,0,0.6,1), width 0.22s cubic-bezier(0.4,0,0.6,1), transform 0.22s cubic-bezier(0.4,0,0.6,1), opacity 0.18s ease",
          });
        }

        // Phase 2: spring-snap to destination — overshoot easing makes it
        // feel like a droplet settling
        blobTimeoutRef.current = setTimeout(() => {
          setBlobStyle({
            left: newLeft,
            top,
            width: newWidth,
            height,
            opacity: 1,
            transform: "scaleY(1)",
            transition:
              "left 0.45s cubic-bezier(0.34,1.56,0.64,1), width 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
          });
        }, 200);
      }

      prevBlobRef.current = { left: newLeft, width: newWidth };
    },
    [],
  );

  const handleNavLeave = useCallback(() => {
    if (blobTimeoutRef.current) clearTimeout(blobTimeoutRef.current);
    // Implode: squish to a point in the center before going transparent
    setBlobStyle((s) => ({
      ...s,
      transform: "scaleX(0.4) scaleY(0)",
      opacity: 0,
      transition: "transform 0.28s cubic-bezier(0.4,0,1,1), opacity 0.28s ease",
    }));
    prevBlobRef.current = null;
  }, []);

  return (
    <>
      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header
        className={`sticky max-w-335 mx-2 xl:mx-auto p-4 rounded-full top-4 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? "bg-(--background)/80 saturate-150 backdrop-blur-md border-b border-(--line-soft) shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--ivory-rose-50)_60%,transparent),0_6px_24px_-16px_color-mix(in_oklab,var(--midnite-800)_22%,transparent)]"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
        style={{ "--nav-height": `${NAV_HEIGHT_PX}px` } as React.CSSProperties}
      >
        <div className="">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link
              href="/"
              className="inline-flex ms-4"
              aria-label="Moxie Beauty Studio — Home"
            >
              <Logo placement="header" />
            </Link>

            {/* Desktop nav links */}
            <nav
              ref={desktopNavRef}
              className="hidden lg:flex items-center gap-10 relative"
              aria-label="Main navigation"
              onMouseLeave={handleNavLeave}
            >
              {/* SVG gooey filter definition — zero-size, purely declarative */}
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: 0,
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <defs>
                  <filter
                    id="nav-goo"
                    x="-30%"
                    y="-100%"
                    width="600%"
                    height="300%"
                  >
                    {/* Blur spreads the alpha, color matrix thresholds it back
                        to create organic edges instead of hard geometry */}
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="8"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -4"
                    />
                  </filter>
                </defs>
              </svg>

              {/* Blob layer — the filter makes edges organic/liquid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ filter: "url(#nav-goo)" }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    background:
                      "color-mix(in oklab, var(--accent) 40%, var(--background))",
                    ...blobStyle,
                  }}
                />
              </div>

              {/* Nav links — z-10 to float above the blob layer */}
              {navItems.map((item) => {
                const isActive = isNavActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "relative z-10 px-3 text-sm font-semibold tracking-[0.06em] no-underline transition-colors duration-250",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)",
                      isActive
                        ? "text-(--accent)"
                        : "text-(--ink-soft) hover:text-(--foreground)",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={handleLinkEnter}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Book Now — desktop only */}
              <Button
                onClick={() => openBooking()}
                size="sm"
                variant="outline"
                className="hidden lg:inline-flex"
              >
                Book Now
              </Button>

              {/* Hamburger — tablet + mobile */}
              <button
                ref={hamburgerRef}
                type="button"
                className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.25 rounded-full border border-(--line) bg-transparent cursor-pointer transition-colors duration-300 hover:border-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                aria-expanded={menuOpen}
                aria-controls="nav-mobile-drawer"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span
                  className={`block w-4.5 h-[1.5px] rounded-sm bg-(--foreground) origin-center transition-transform duration-350 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
                />
                <span
                  className={`block w-4.5 h-[1.5px] rounded-sm bg-(--foreground) transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-4.5 h-[1.5px] rounded-sm bg-(--foreground) origin-center transition-transform duration-350 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile / tablet drawer ─────────────────────────────────────── */}
      {/* Rendered outside the header to escape its backdrop-filter stacking context */}
      <div
        id="nav-mobile-drawer"
        className={`nav-mobile-drawer bg-(--background) lg:hidden ${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={!menuOpen || undefined}
      >
        <div className="px-8 pt-32 flex flex-col">
          {/* Big display links */}
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => {
              const isActive = isNavActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={index === 0 ? drawerFirstLinkRef : undefined}
                  className={[
                    "drawer-item",
                    // Base — vertical accent bar grows from center on left edge
                    "block font-nyght text-[clamp(36px,8vw,52px)] leading-none no-underline py-4.5 border-b border-(--line-soft) tracking-[-0.01em] relative pl-0",
                    "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:rounded-full before:bg-(--accent)",
                    "before:origin-center before:transition-transform before:duration-400 before:ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "transition-all duration-250",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)",
                    isActive
                      ? "text-(--accent) before:scale-y-100 pl-4"
                      : "text-(--foreground) hover:text-(--accent) hover:pl-4 before:scale-y-0 hover:before:scale-y-100",
                  ].join(" ")}
                  style={
                    {
                      "--drawer-delay": `${0.05 + index * 0.055}s`,
                    } as React.CSSProperties
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA buttons */}
          <div
            className="drawer-item mt-9 flex flex-col items-start gap-3"
            style={{ "--drawer-delay": "0.28s" } as React.CSSProperties}
          >
            <Button
              size="sm"
              showArrow
              onClick={() => {
                setMenuOpen(false);
                openBooking();
              }}
            >
              Book an Appointment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              href={siteConfig.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions (opens in new tab)"
            >
              Get Directions
            </Button>
          </div>

          {/* Meta: hours + address */}
          <div
            className="drawer-item mt-11 pt-7 border-t border-(--line-soft) flex flex-col gap-5"
            style={{ "--drawer-delay": "0.36s" } as React.CSSProperties}
          >
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium">
                Hours
              </p>
              <p className="font-nyght text-[19px] text-(--foreground) mt-1">
                {siteConfig.hours.display}
              </p>
              <p className="text-sm text-(--ink-soft) mt-0.5">
                {siteConfig.hours.note}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium">
                Phone
              </p>
              <a
                href={siteConfig.contact.phoneHref}
                className="font-nyght text-[19px] text-(--foreground) mt-1 block hover:text-(--accent) transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-(--ink-mute) font-medium">
                Location
              </p>
              <a
                href={siteConfig.address.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.address.short} (opens in new tab)`}
                className="font-nyght text-[19px] text-(--foreground) mt-1 block hover:text-(--accent) transition-colors"
              >
                {siteConfig.address.short}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-32 bg-linear-to-b from-(--background) fixed top-0 z-40" />
    </>
  );
}
