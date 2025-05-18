"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Logo from "./logo";

interface NavItem {
  name: string;
  section: string;
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const navItems = useMemo<NavItem[]>(
    () => [
      { name: "Appointments", section: "Appointments" },
      { name: "Our Services", section: "Services" },
      { name: "About Moxie", section: "About" },
    ],
    []
  );

  // Update indicator position based on active section
  useEffect(() => {
    if (activeSection === "hero") {
      setIndicatorStyle({
        width: 0,
        left: 0,
        opacity: 0,
      });
      return;
    }

    const activeNav = navRefs.current[activeSection];
    if (activeNav) {
      const navRect = activeNav.getBoundingClientRect();
      const navContainer = activeNav.parentElement;

      if (navContainer) {
        const containerRect = navContainer.getBoundingClientRect();

        setIndicatorStyle({
          width: navRect.width,
          left: navRect.left - containerRect.left,
          opacity: 1,
        });
      }
    }
  }, [activeSection]);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", ...navItems.map((item) => item.section)];
      const scrollPosition = window.scrollY + 100;

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 0;
      const sectionTop = section.getBoundingClientRect().top;
      const offsetPosition = sectionTop + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Logo placement="header" />
      <nav className="bevel flex md:inline-flex flex-row justify-evenly md:gap-4 fixed md:sticky bottom-2 md:bottom-auto md:top-6 right-2 md:right-auto left-2 md:left-56 lg:mt-44 z-50 bg-(--background)/60 backdrop-blur inset-shadow-sm inset-shadow-midnite/50 rounded-full border-[.5px] border-(--accent)/50 p-4">
        {/* Navigation items */}
        {navItems.map((item) => (
          <a
            key={item.section}
            href={`#${item.section}`}
            ref={(el) => {
              navRefs.current[item.section] = el;
            }}
            className={`text-xs sm:text-base font-bold rounded-full py-1.5 px-2.5 transition-all relative z-10 border border-transparent hover:border-(--accent)/20 hover:bg-(--accent)/20 ${
              activeSection === item.section ? "text-(--background)" : ""
            }`}
            onClick={(e) => scrollToSection(item.section, e)}
          >
            {item.name}
          </a>
        ))}
        {/* Sliding indicator */}
        <div
          className="absolute bg-(--accent)/90 rounded-full transition-all duration-300 ease-in-out bevel z-0"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
            height: "calc(100% - 2rem)",
            top: "1rem",
            opacity: indicatorStyle.opacity,
          }}
        />
      </nav>
    </>
  );
}
