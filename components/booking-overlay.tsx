"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, RefreshCw, PhoneCall } from "lucide-react";
import Button from "./button";
import Logo from "./logo";
import { siteConfig } from "@/lib/site-config";

interface BookingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  /** Optional service ID for pre-selecting a service in the booking flow */
  serviceId?: string;
}

const BookingOverlay: React.FC<BookingOverlayProps> = ({
  isOpen,
  onClose,
  serviceId,
}) => {
  // Append variation ID to the base URL to pre-select the service.
  // Square's hosted booking format: .../services/{variationId}
  const iframeSrc = serviceId
    ? `${siteConfig.bookingUrl}/${serviceId}`
    : siteConfig.bookingUrl;
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // ── Mount / unmount with animation ────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setShouldRender(true);
      // Defer visibility so CSS transition fires after DOM insertion
      const t = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(t);
    } else if (shouldRender) {
      setIsVisible(false);
      const t = setTimeout(() => setShouldRender(false), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Loading timeout (15 s) ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !isLoading) return;
    loadingTimeoutRef.current = setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, 15_000);
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, [isOpen, isLoading]);

  // ── Body scroll lock + focus management + Escape ───────────────────────────
  useEffect(() => {
    if (!isOpen || !isVisible) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => closeButtonRef.current?.focus(), 150);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    };
  }, [isOpen, isVisible, onClose]);

  // ── Focus trap ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = overlay.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
      );
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((k) => k + 1);
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
      className={[
        "fixed inset-0 z-[9999] flex flex-col bg-(--background)",
        "transition-[opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <div
        className={[
          "shrink-0 flex items-center justify-between h-16 px-5 border-b border-(--line-soft)",
          "bg-(--background)/95 backdrop-blur-sm",
          "transition-[opacity,transform] duration-350 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <Logo placement="header" />
          <span
            className="hidden sm:block w-px h-5 bg-(--line)"
            aria-hidden="true"
          />
          <p className="hidden sm:block text-[11px] font-medium tracking-[0.18em] uppercase text-(--ink-mute)">
            Book an Appointment
          </p>
        </div>

        {/* Close */}
        <Button
          ref={closeButtonRef}
          variant="outline"
          size="sm"
          onClick={onClose}
          aria-label="Close booking"
        >
          <X size={15} aria-hidden="true" />
          Close
        </Button>
      </div>

      {/* ── Content area (iframe + overlays) ────────────────────────────── */}
      <div
        className={[
          "relative flex-1 min-h-0",
          "transition-[opacity,transform] duration-350 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3",
        ].join(" ")}
      >
        {/* Loading state */}
        {isLoading && !hasError && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-(--background)"
            role="status"
            aria-live="polite"
            aria-label="Loading booking page"
          >
            {/* Branded pulsing dots */}
            <div className="flex items-center gap-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-(--accent) animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-(--ink-mute) tracking-[0.1em]">
              Opening booking&hellip;
            </p>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-(--background) p-8">
            <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
              {/* Icon */}
              <span
                className="flex items-center justify-center w-14 h-14 rounded-full bg-(--accent)/10 text-(--accent)"
                aria-hidden="true"
              >
                <PhoneCall size={24} />
              </span>

              <div>
                <h3 className="font-nyght text-2xl text-(--foreground) mb-2">
                  Couldn&rsquo;t load booking
                </h3>
                <p className="text-sm text-(--ink-soft) leading-relaxed">
                  The booking page didn&rsquo;t load — this is usually a slow
                  connection or a temporary issue with Square.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button size="md" onClick={handleRetry} className="flex-1" showArrow={false}>
                  <RefreshCw size={14} aria-hidden="true" />
                  Try again
                </Button>
                <Button
                  size="md"
                  variant="ghost"
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  Open in new tab
                </Button>
              </div>

              <p className="text-sm text-(--ink-mute)">
                Or reach us directly —{" "}
                <a
                  href={siteConfig.contact.smsHref}
                  className="text-(--foreground) hover:text-(--accent) transition-colors font-medium"
                >
                  text us
                </a>{" "}
                or{" "}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="text-(--foreground) hover:text-(--accent) transition-colors font-medium"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Square booking iframe */}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={iframeSrc}
          title="Book an appointment at Moxie Beauty Studio"
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
          allow="payment"
          loading="eager"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
};

export default BookingOverlay;
