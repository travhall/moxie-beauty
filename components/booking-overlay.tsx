"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, RefreshCw, AlertCircle } from "lucide-react";
import Button from "./button";

interface BookingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingOverlay: React.FC<BookingOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Reset state when overlay opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen]);

  // Handle opening and closing animations
  useEffect(() => {
    if (isOpen) {
      // Start rendering with initial state (not animating)
      setIsAnimatingIn(false);
      setIsAnimatingOut(false);
      setShouldRender(true);

      // Wait for the component to render, then trigger entrance animation
      const timer = setTimeout(() => {
        setIsAnimatingIn(true);
      }, 10); // Small delay to ensure initial render completes

      return () => clearTimeout(timer);
    } else if (shouldRender) {
      // Trigger exit animation
      setIsAnimatingIn(false);
      setIsAnimatingOut(true);

      // Remove from DOM after animation completes
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setIsAnimatingOut(false);
      }, 300); // Match the transition duration

      return () => clearTimeout(timeout);
    }
  }, [isOpen, shouldRender]);

  // Handle iframe loading timeout
  useEffect(() => {
    if (isOpen && isLoading) {
      // Set a timeout for iframe loading (15 seconds)
      loadingTimeoutRef.current = setTimeout(() => {
        if (isLoading) {
          setHasError(true);
          setIsLoading(false);
        }
      }, 15000);

      return () => {
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      };
    }
  }, [isOpen, isLoading]);

  // Handle iframe load success
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
  };

  // Refresh/retry loading the iframe
  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1); // Force iframe reload by changing key
  };

  useEffect(() => {
    if (isOpen && isAnimatingIn) {
      // Store the currently focused element to restore focus later
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Prevent body scroll when overlay is open
      document.body.style.overflow = "hidden";

      // Focus the close button when overlay opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 150);

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        // Restore body scroll
        document.body.style.overflow = "";
        // Restore focus to the element that triggered the overlay
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, isAnimatingIn, onClose]);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = overlay.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-9999 bg-(--background) flex flex-col transition-all duration-300 ease-in-out ${
        isAnimatingIn && !isAnimatingOut
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
      style={{ transformOrigin: "center" }}
    >
      {/* Close button - positioned at top right */}
      <div
        className={`absolute top-4 right-4 z-10000 transition-all duration-300 delay-100 ease-in-out ${
          isAnimatingIn && !isAnimatingOut
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
      >
        <Button
          ref={closeButtonRef}
          variant="outline"
          size="lg"
          icon={X}
          onClick={onClose}
          ariaLabel="Close booking overlay"
        >
          Close
        </Button>
      </div>

      {/* Iframe container */}
      <div
        className={`flex-1 w-full h-full p-4 pt-20 transition-all duration-300 delay-75 ease-in-out relative ${
          isAnimatingIn && !isAnimatingOut
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        {/* Loading indicator */}
        {isLoading && !hasError && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-(--background) z-10 rounded-lg m-4 mt-20"
            role="status"
            aria-live="polite"
            aria-label="Loading booking page"
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-12 h-12 border-4 border-(--accent)/30 border-t-(--accent) rounded-full animate-spin"
                aria-hidden="true"
              />
              <p className="text-lg font-medium">Loading booking page...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-(--background) z-10 rounded-lg m-4 mt-20">
            <div className="flex flex-col items-center gap-6 max-w-md text-center p-8">
              <AlertCircle className="w-16 h-16 text-(--accent)" />
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Unable to Load Booking Page
                </h3>
                <p className="text-base mb-6">
                  We&rsquo;re having trouble loading the appointment booking
                  page. This might be due to a slow connection or temporary
                  issue.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button
                  size="lg"
                  onClick={handleRefresh}
                  icon={RefreshCw}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
              <p className="text-sm text-(--foreground)/60">
                Or call us directly at{" "}
                <a
                  href="tel:2623326072"
                  className="font-semibold text-(--accent) hover:underline"
                >
                  (262) 332-6072
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src="https://book.squareup.com/appointments/anzl660330wful/location/LHZ09SDE51Z6W/services"
          title="Moxie Beauty Studio Appointment Booking"
          className="w-full h-full border-0 rounded-lg"
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
