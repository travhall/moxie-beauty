"use client";

import { useEffect, useRef } from "react";

interface UseFadeInOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useFadeInOnScroll(
  options: UseFadeInOnScrollOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px 0px 0px",
    triggerOnce = true,
  } = options;

  const elementsRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            if (triggerOnce) {
              observer.unobserve(entry.target);
              elementsRef.current.delete(entry.target);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const sections = document.querySelectorAll(".fade-in-section");
    const fixed = document.querySelectorAll(".fade-in-fixed");

    sections.forEach((el) => {
      observer.observe(el);
      elementsRef.current.add(el);
    });

    fixed.forEach((el) => {
      observer.observe(el);
      elementsRef.current.add(el);
    });

    return () => {
      observer.disconnect();
      elementsRef.current.clear();
    };
  }, [threshold, rootMargin, triggerOnce]);
}
