import { useState, useEffect, useCallback } from "react";

interface SlideAnimationState {
  isVisible: boolean;
  slideIn: boolean;
  fadeOut: boolean;
}

interface UseSlideAnimationProps {
  elementIds: string[];
  rootMargin?: string;
  threshold?: number | number[];
  onIntersection?: (
    activeId: string | null,
    states: Record<string, SlideAnimationState>
  ) => void;
}

export function useSlideAnimation({
  elementIds,
  rootMargin = "-50% 0px -50% 0px",
  threshold = [0, 0.1, 0.25, 0.5, 0.75, 1],
  onIntersection,
}: UseSlideAnimationProps): {
  activeId: string | null;
  animationStates: Record<string, SlideAnimationState>;
} {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [animationStates, setAnimationStates] = useState<
    Record<string, SlideAnimationState>
  >(() => {
    const initialStates: Record<string, SlideAnimationState> = {};
    elementIds.forEach((id) => {
      initialStates[id] = { isVisible: false, slideIn: false, fadeOut: false };
    });
    return initialStates;
  });

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      setAnimationStates((prevStates) => {
        const newStates = { ...prevStates };
        let mostVisibleEntry: IntersectionObserverEntry | null = null;
        let maxVisibility = 0;
        const visibleEntries: IntersectionObserverEntry[] = [];

        // Find all visible entries and the most visible one
        for (const entry of entries) {
          const visibility = entry.intersectionRatio;
          const targetElement = entry.target as HTMLElement;
          const targetId = targetElement.id;

          if (visibility > 0.05) {
            visibleEntries.push(entry);
          }

          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            mostVisibleEntry = entry;
          }
        }

        // Sort visible entries by their position in the DOM
        visibleEntries.sort((a, b) => {
          const aIndex = elementIds.indexOf(a.target.id);
          const bIndex = elementIds.indexOf(b.target.id);
          return aIndex - bIndex;
        });

        // Update animation states based on visibility
        elementIds.forEach((id, index) => {
          const entry = visibleEntries.find((e) => e.target.id === id);
          const isVisible = entry ? entry.intersectionRatio > 0.05 : false;
          const isMostVisible = mostVisibleEntry?.target.id === id;

          // Get the position from the element's data attribute or determine from index
          const element = document.getElementById(id);
          const position =
            element?.getAttribute("data-position") ||
            (index % 2 === 0 ? "left" : "right");

          // Determine if this section should fade out (when later sections are visible)
          const currentSectionIndex = elementIds.indexOf(id);
          const shouldFadeOut =
            visibleEntries.length > 1 &&
            currentSectionIndex <
              Math.max(
                ...visibleEntries.map((e) => elementIds.indexOf(e.target.id))
              );

          newStates[id] = {
            isVisible,
            slideIn: isVisible,
            fadeOut: shouldFadeOut && !isMostVisible,
          };
        });

        // Set the most visible section as active
        if (mostVisibleEntry && mostVisibleEntry.intersectionRatio > 0.05) {
          const newActiveId = mostVisibleEntry.target.id;
          setActiveId(newActiveId);
          onIntersection?.(newActiveId, newStates);
        }

        return newStates;
      });
    },
    [elementIds, onIntersection]
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
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [elementIds, rootMargin, threshold, handleIntersection]);

  return { activeId, animationStates };
}

// Utility function to get slide animation classes
export function getSlideAnimationClasses(
  state: SlideAnimationState,
  position: "left" | "right"
): string {
  const baseClasses = "transition-all duration-700 ease-out";

  if (!state.isVisible) {
    return `${baseClasses} ${
      position === "left" ? "translate-x-[-100vw]" : "translate-x-[100vw]"
    } opacity-0`;
  }

  if (state.fadeOut) {
    return `${baseClasses} translate-x-0 opacity-30`;
  }

  return `${baseClasses} translate-x-0 opacity-100`;
}
