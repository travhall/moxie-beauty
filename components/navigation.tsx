"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navContainerRef = useRef<HTMLElement>(null);

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        name: "Appointments",
        section: "Appointments",
        description: "Book your appointment",
      },
      {
        name: "Our Services",
        section: "Services",
        description: "Explore our services",
      },
      {
        name: "About Moxie",
        section: "About",
        description: "Learn about us",
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
    console.log("Navigation received intersection:", activeId); // Debug log
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

  // Update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(getScrollProgress());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator position - more robust approach
  useEffect(() => {
    console.log("Active section changed to:", activeSection); // Debug log

    // Skip if hero section or no container
    if (activeSection === "hero" || !navContainerRef.current) {
      console.log("Hiding indicator - hero section or no container"); // Debug log
      setIndicatorStyle({ width: 0, left: 0, opacity: 0 });
      return;
    }

    const updateIndicator = () => {
      const activeNav = navRefs.current[activeSection];
      const navContainer = navContainerRef.current;

      console.log(
        "Updating indicator - nav:",
        !!activeNav,
        "container:",
        !!navContainer
      ); // Debug log

      if (activeNav && navContainer) {
        const navRect = activeNav.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();

        const newStyle = {
          width: navRect.width,
          left: navRect.left - containerRect.left,
          opacity: 1,
        };

        console.log("New indicator style:", newStyle); // Debug log
        setIndicatorStyle(newStyle);
      } else {
        console.log("Failed to update indicator - missing elements"); // Debug log
        setIndicatorStyle({ width: 0, left: 0, opacity: 0 });
      }
    };

    // Multiple update attempts for reliability
    updateIndicator();
    const timer1 = setTimeout(updateIndicator, 50);
    const timer2 = setTimeout(updateIndicator, 150);
    const timer3 = setTimeout(updateIndicator, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeSection]);

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
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <motion.div
          className="h-full bg-(--accent)"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Navigation */}
      <nav
        ref={navContainerRef}
        className="bevel flex md:inline-flex flex-row justify-evenly md:gap-4 fixed md:sticky bottom-2 md:bottom-auto md:top-6 right-2 md:right-auto left-2 md:left-56 lg:mt-44 z-50 bg-(--background)/60 backdrop-blur inset-shadow-sm inset-shadow-midnite/50 rounded-full border-[.5px] border-(--accent)/50 p-4"
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
              console.log(`Nav ref set for ${item.section}:`, !!el); // Debug log
            }}
            className={`text-xs sm:text-base font-bold rounded-full py-1.5 px-2.5 transition-all relative z-10 border border-transparent hover:border-(--accent)/20 hover:bg-(--accent)/20 focus:outline-none focus:ring-2 focus:ring-(--accent)/50 focus:border-(--accent)/40 ${
              activeSection === item.section ? "text-(--background)" : ""
            }`}
            onClick={(e) => scrollToSection(item.section, e)}
            onKeyDown={(e) => handleKeyDown(e, item.section)}
            aria-label={item.description}
            aria-current={activeSection === item.section ? "true" : "false"}
          >
            <span className="relative z-10">{item.name}</span>
            {activeSection === item.section && (
              <motion.span
                className="absolute inset-0 rounded-full bg-(--accent)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </a>
        ))}

        {/* Sliding indicator */}
        <AnimatePresence>
          {activeSection !== "hero" && (
            <motion.div
              className="absolute bg-(--accent)/90 rounded-full shadow-lg z-0"
              style={{
                height: "calc(100% - 2rem)",
                top: "1rem",
              }}
              animate={indicatorStyle}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
