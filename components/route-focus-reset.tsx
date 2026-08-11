"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Moves focus to #main-content on client-side route changes (WCAG 2.4.3) —
 * Next.js/next-view-transitions swap content without a full page load, so
 * focus otherwise stays wherever it was on the previous page. */
export default function RouteFocusReset() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
