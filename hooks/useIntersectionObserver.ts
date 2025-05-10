import { useState, useEffect } from "react";

interface UseIntersectionObserverProps {
  elementIds: string[];
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver({
  elementIds,
  rootMargin = "0px",
  threshold = 0.1,
}: UseIntersectionObserverProps): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // When the section is in view
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null, // viewport
      rootMargin,
      threshold,
    };

    // Create an observer for each section
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      // Clean up observers
      observers.forEach((observer) => observer.disconnect());
    };
  }, [elementIds, rootMargin, threshold]);

  return activeId;
}
