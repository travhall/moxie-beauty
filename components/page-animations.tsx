"use client";

import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

/**
 * Renders nothing — exists solely to initialize the scroll-fade
 * IntersectionObserver for all `.fade-in-section` elements on the page.
 * Lives in a Server Component page so it must be its own client island.
 */
export default function PageAnimations() {
  useFadeInOnScroll();
  return null;
}
