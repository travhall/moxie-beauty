"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/images/moxie-about-lobby.jpg", alt: "The Moxie studio lobby" },
  { src: "/images/moxie-home-room-two.jpg", alt: "A Moxie treatment room" },
  { src: "/images/moxie-about-room-one.jpg", alt: "The Moxie studio" },
  {
    src: "/images/moxie-about-posters.jpg",
    alt: "Artwork inside Moxie Beauty Studio",
  },
  { src: "/images/rooms.jpg", alt: "The Moxie studio interior" },
];

const EDGE_THRESHOLD = 4;

export default function StudioFilmstrip() {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback((el: HTMLDivElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= EDGE_THRESHOLD);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - EDGE_THRESHOLD);
  }, []);

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
        onScroll={(e) => updateEdges(e.currentTarget)}
        role="region"
        aria-label="Studio photo gallery"
        tabIndex={0}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-2 pb-10 pr-10 -mx-1 px-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
        style={{ WebkitMaskImage: maskImage, maskImage }}
      >
        {IMAGES.map(({ src, alt }) => (
          <div
            key={src}
            className="relative shrink-0 w-64 sm:w-80 h-80 sm:h-96 snap-start overflow-hidden rounded-2xl border border-b-8 border-(--accent) shadow-xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 256px, 320px"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
