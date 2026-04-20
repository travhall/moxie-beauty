import { useState, useEffect, useCallback, useRef } from "react";

interface UseIntersectionObserverProps {
  elementIds: string[];
  rootMargin?: string;
  threshold?: number | number[];
  onIntersection?: (activeId: string | null) => void;
}

export function useIntersectionObserver({
  elementIds,
  rootMargin = "-80px 0px -40% 0px",
  threshold = [0],
  onIntersection,
}: UseIntersectionObserverProps): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Track all currently-intersecting sections across callback batches
  const intersectingIds = useRef<Set<string>>(new Set());

  // Among all sections currently in the detection zone, pick the one whose
  // top edge has most recently crossed above the viewport top (80px matches
  // the -80px rootMargin offset). This correctly handles sections that are
  // taller than the viewport — ratio-based approaches break there because a
  // 5× viewport-height section can never score above a 1× section.
  const pickActive = useCallback(() => {
    const ids = Array.from(intersectingIds.current);
    if (ids.length === 0) return;

    const NAV_OFFSET = 80; // matches rootMargin top value
    let bestId: string | null = null;
    let bestTop = -Infinity;

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      // Sections whose top has scrolled past the nav offset win; among those
      // pick the one deepest into the viewport (top closest to 0 from above).
      if (top <= NAV_OFFSET && top > bestTop) {
        bestTop = top;
        bestId = id;
      }
    }

    // Nothing past the nav yet — fall back to the topmost visible section
    if (!bestId) {
      let lowestTop = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < lowestTop) {
          lowestTop = top;
          bestId = id;
        }
      }
    }

    if (bestId) {
      setActiveId(bestId);
      onIntersection?.(bestId);
    }
  }, [onIntersection]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          intersectingIds.current.add(entry.target.id);
        } else {
          intersectingIds.current.delete(entry.target.id);
        }
      }
      pickActive();
    },
    [pickActive]
  );

  useEffect(() => {
    if (elementIds.length === 0) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold,
    });

    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
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
