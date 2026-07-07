"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

export interface FilmstripImage {
  src: string;
  alt: string;
  /** Intrinsic pixel width of the source file — used to compute aspect ratio. */
  width: number;
  /** Intrinsic pixel height of the source file — used to compute aspect ratio. */
  height: number;
}

export interface StudioFilmstripProps {
  images: FilmstripImage[];
  /** Accessible name for the scrollable region. */
  ariaLabel?: string;
}

const EDGE_THRESHOLD = 4;

export function computeScrollEdges(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
): { atStart: boolean; atEnd: boolean } {
  return {
    atStart: scrollLeft <= EDGE_THRESHOLD,
    atEnd: scrollLeft + clientWidth >= scrollWidth - EDGE_THRESHOLD,
  };
}

export default function StudioFilmstrip({
  images,
  ariaLabel = "Photo gallery",
}: StudioFilmstripProps) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updateEdges = useCallback((el: HTMLDivElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const { atStart, atEnd } = computeScrollEdges(
      scrollLeft,
      scrollWidth,
      clientWidth,
    );
    setAtStart(atStart);
    setAtEnd(atEnd);
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateEdges(el);
      });
    },
    [updateEdges],
  );

  const containerRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) updateEdges(el);
    },
    [updateEdges],
  );

  // Fade edges only once there's actually more content to reveal in that
  // direction — the strip stays fully crisp at rest and at either end.
  const stops = [
    atStart ? "black 0%" : "transparent 0%",
    ...(atStart ? [] : ["black 32px"]),
    ...(atEnd ? [] : ["black calc(100% - 64px)"]),
    atEnd ? "black 100%" : "transparent 100%",
  ];
  const maskImage = `linear-gradient(to right, ${stops.join(", ")})`;

  return (
    <div className="ml-[max(2.5rem,calc((100vw-1340px)/2+2.5rem))] max-[720px]:ml-5.5">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-2 pb-10 pr-10 -mx-1 px-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
        style={{ WebkitMaskImage: maskImage, maskImage }}
      >
        {images.map(({ src, alt, width, height }) => (
          <div
            key={src}
            className="relative shrink-0 h-80 sm:h-96 min-w-[16rem] sm:min-w-[20rem] max-w-104 sm:max-w-120 snap-start overflow-hidden rounded-2xl border border-b-8 border-(--accent) shadow-xl"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 416px, 480px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
