"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Button from "./button";

interface BookingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingOverlay: React.FC<BookingOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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
      className={`fixed inset-0 z-[9999] bg-(--background) flex flex-col transition-all duration-300 ease-in-out ${
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
        className={`absolute top-4 right-4 z-[10000] transition-all duration-300 delay-100 ease-in-out ${
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
          iconOnly
          onClick={onClose}
          ariaLabel="Close booking overlay"
          className="bg-(--background) hover:bg-(--foreground)/10"
        >
          Close
        </Button>
      </div>

      {/* Iframe container */}
      <div
        className={`flex-1 w-full h-full p-4 pt-20 transition-all duration-300 delay-75 ease-in-out ${
          isAnimatingIn && !isAnimatingOut
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <iframe
          src="https://book.squareup.com/appointments/anzl660330wful/location/LHZ09SDE51Z6W/services"
          title="Moxie Beauty Studio Appointment Booking"
          className="w-full h-full border-0 rounded-lg"
          allow="payment"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default BookingOverlay;
