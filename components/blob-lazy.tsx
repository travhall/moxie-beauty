"use client";

/**
 * Thin client-component wrapper so the Three.js blob can be lazy-loaded
 * with ssr:false from the Server Component layout.tsx.
 *
 * `next/dynamic` with `ssr: false` is only allowed inside Client Components.
 * By isolating it here, the layout stays a Server Component while Three.js
 * is deferred until after the page is interactive — keeping it off the
 * critical-path JS bundle.
 */

import dynamic from "next/dynamic";

const Blob = dynamic(() => import("@/components/blob"), {
  ssr: false,
  loading: () => null,
});

export default function BlobLazy() {
  return <Blob />;
}
