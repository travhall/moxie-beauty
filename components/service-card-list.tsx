"use client";

import { useState } from "react";
import ServiceCardClient, { type ServiceCardData } from "./service-card-client";

export default function ServiceCardList({
  cards,
}: {
  cards: ServiceCardData[];
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="divide-y-0" onMouseLeave={() => setHovered(null)}>
      {cards.map((c) => (
        <ServiceCardClient
          key={c.num}
          {...c}
          faded={hovered !== null && hovered !== c.num}
          onHoverStart={() => setHovered(c.num)}
        />
      ))}
    </div>
  );
}
