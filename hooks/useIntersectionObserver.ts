import { useState, useEffect, useCallback } from "react";

interface UseIntersectionObserverProps {
  elementIds: string[];
  rootMargin?: string;
  threshold?: number | number[];
  onIntersection?: (activeId: string | null) => void;
}

export function useIntersectionObserver({
  elementIds,
  rootMargin = "-80px 0px -40% 0px",
  threshold = [0, 0.1, 0.25, 0.5, 0.75, 1],
  onIntersection,
}: UseIntersectionObserverProps): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      let mostVisibleEntry: IntersectionObserverEntry | null = null;
      let maxVisibility = 0;

      for (const entry of entries) {
        const visibility = entry.intersectionRatio;
        // console.log(`Section ${entry.target.id}: visibility=${visibility}`); // Debug log

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleEntry = entry;
        }
      }

      if (mostVisibleEntry && mostVisibleEntry.intersectionRatio > 0.05) {
        const targetElement = mostVisibleEntry.target as HTMLElement;
        const newActiveId = targetElement.id;

        // console.log(
        //   `Setting active section: ${newActiveId} (visibility: ${mostVisibleEntry.intersectionRatio})`
        // ); // Debug log
        setActiveId(newActiveId);
        onIntersection?.(newActiveId);
      }
    },
    [onIntersection]
  );

  useEffect(() => {
    if (elementIds.length === 0) return;

    // console.log("Setting up intersection observer for:", elementIds); // Debug log

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold,
    });

    // Validate elements exist before observing
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        // console.log(`Observing element: ${id}`, element); // Debug log
        observer.observe(element);
      } else {
        // console.warn(`Element with id "${id}" not found`); // Debug log
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [elementIds, rootMargin, threshold, handleIntersection]);

  return activeId;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setScrollDirection(direction);
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
}
