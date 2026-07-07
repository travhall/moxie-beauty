/// <reference types="google.maps" />
"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1a0a08" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#d4b896" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a0a08" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2e1208" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c4956a" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#120605" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1f0d09" }],
  },
];

interface MapProps {
  apiKey: string;
  lat: number;
  lng: number;
  label: string;
  /** Rendered if the Maps script fails to load or errors during init. */
  fallback: React.ReactNode;
}

export default function Map({ apiKey, lat, lng, label, fallback }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    if (status !== "ready" || !containerRef.current) return;
    const map = new google.maps.Map(containerRef.current, {
      center: { lat, lng },
      zoom: 15,
      styles: MAP_STYLES,
      disableDefaultUI: true,
      zoomControl: true,
    });
    new google.maps.Marker({ position: { lat, lng }, map, title: label });
  }, [status, lat, lng, label]);

  if (status === "error") return <>{fallback}</>;

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`}
        strategy="afterInteractive"
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />
      <div
        ref={containerRef}
        role="img"
        aria-label={`Map showing the location of ${label}`}
        className="rounded-3xl overflow-hidden border border-b-8 border-(--line) h-80 lg:h-110"
      />
    </>
  );
}
