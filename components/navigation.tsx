"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Logo from "./logo";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  scrollToSectionWithFocus,
  getScrollProgress,
} from "@/utils/scroll-utils";

interface NavItem {
  name: string;
  section: string;
  description?: string;
  mobileLabel?: string;
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navContainerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        name: "Our Services",
        section: "Services",
        description: "Explore our services",
        mobileLabel: "Services",
      },
      {
        name: "Appointments",
        section: "Appointments",
        description: "Book your appointment",
      },
      {
        name: "About Moxie",
        section: "About",
        description: "Learn about us",
        mobileLabel: "About",
      },
    ],
    []
  );

  const sectionIds = useMemo(
    () => ["hero", ...navItems.map((item) => item.section)],
    [navItems]
  );

  // Handle intersection changes
  const handleIntersection = useCallback((activeId: string | null) => {
    // console.log("Navigation received intersection:", activeId);
    if (activeId) {
      setActiveSection(activeId);
    }
  }, []);

  // Use Intersection Observer for section tracking
  const observedSection = useIntersectionObserver({
    elementIds: sectionIds,
    rootMargin: "-80px 0px -40% 0px", // Less aggressive margins
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // More threshold points
    onIntersection: handleIntersection,
  });

  // Update scroll progress bar directly — bypasses React state to stay
  // frame-perfect with the scroll position (no re-render overhead)
  useEffect(() => {
    const handleScroll = () => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${getScrollProgress()}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator position on section change
  useEffect(() => {
    if (activeSection === "hero" || !navContainerRef.current) {
      setIndicatorStyle({ width: 0, left: 0, opacity: 0 });
      return;
    }

    const rafId = requestAnimationFrame(() => {
      const activeNav = navRefs.current[activeSection];
      const navContainer = navContainerRef.current;

      if (activeNav && navContainer) {
        const navRect = activeNav.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();
        setIndicatorStyle({
          width: navRect.width,
          left: navRect.left - containerRect.left,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({ width: 0, left: 0, opacity: 0 });
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [activeSection]);

  // Re-measure indicator on container resize (e.g. window resize, font load)
  useEffect(() => {
    const navContainer = navContainerRef.current;
    if (!navContainer) return;

    const observer = new ResizeObserver(() => {
      const section = activeSectionRef.current;
      if (section === "hero") return;
      const activeNav = navRefs.current[section];
      if (activeNav && navContainerRef.current) {
        const navRect = activeNav.getBoundingClientRect();
        const containerRect = navContainerRef.current.getBoundingClientRect();
        setIndicatorStyle({
          width: navRect.width,
          left: navRect.left - containerRect.left,
          opacity: 1,
        });
      }
    });

    observer.observe(navContainer);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string, e: React.MouseEvent) => {
      e.preventDefault();
      scrollToSectionWithFocus(sectionId, 0);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, sectionId: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToSectionWithFocus(sectionId, 0);
      }
    },
    []
  );

  return (
    <>
      <Logo placement="header" />

      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-(--background)/20 z-50"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          ref={progressBarRef}
          className="h-full bg-(--accent)"
          style={{ width: "0%" }}
        />
      </div>

      {/* Navigation */}
      <nav
        ref={navContainerRef}
        className="bevel flex md:inline-flex flex-row justify-between gap-4 fixed md:sticky bottom-2 md:bottom-auto md:top-8 right-2 md:right-auto left-2 md:left-56 lg:mt-44 z-50 bg-(--background)/60 backdrop-blur inset-shadow-sm inset-shadow-midnite/50 rounded-full border-[.5px] border-(--accent)/50 p-4 group fade-in-fixed delay-100 md:fade-in-section"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Navigation items */}
        {navItems.map((item) => (
          <a
            key={item.section}
            href={`#${item.section}`}
            ref={(el) => {
              navRefs.current[item.section] = el;
              // console.log(`Nav ref set for ${item.section}:`, !!el); // Debug log
            }}
            className={`text-base font-bold rounded-full py-1 px-4 transition-all relative z-10 text-shadow-(--foreground) border border-transparent hover:border-(--accent)/20 hover:bg-(--accent)/20 focus:outline-none focus:ring-2 focus:ring-(--accent)/50 focus:border-(--accent)/40 ${
              activeSection === item.section ? "text-(--background)" : ""
            }`}
            onClick={(e) => scrollToSection(item.section, e)}
            onKeyDown={(e) => handleKeyDown(e, item.section)}
            aria-label={item.description}
            aria-current={activeSection === item.section ? "true" : "false"}
          >
            <span className="relative z-10">
              <span className="sm:hidden">{item.mobileLabel || item.name}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </span>
            <span
              className={`absolute inset-0 rounded-full bg-(--accent) bevel transition-opacity duration-200 pointer-events-none ${
                activeSection === item.section ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>
        ))}

        {/* Sliding indicator */}
        <div
          className="absolute bg-(--accent)/90 rounded-full shadow-lg z-0 transition-[width,left,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none"
          style={{
            height: "calc(100% - 2rem)",
            top: "1rem",
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
      </nav>
    </>
  );
}
