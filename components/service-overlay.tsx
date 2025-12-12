import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface ServiceOverlayProps {
  title: string;
  fullDescription: string;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceOverlay = ({
  title,
  fullDescription,
  isOpen,
  onClose,
}: ServiceOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle opening animation and focus management
  useEffect(() => {
    if (isOpen && !isVisible) {
      // Store the element that opened the modal
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Delay setting visible to allow initial render with starting styles
      requestAnimationFrame(() => {
        setIsVisible(true);
        // Focus the close button after animation starts
        setTimeout(() => {
          closeButtonRef.current?.focus();
        }, 100);
      });
    }

    if (!isOpen) {
      setIsVisible(false);
      // Return focus to the element that opened the modal
      previousActiveElement.current?.focus();
    }
  }, [isOpen, isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 600);
  };

  // Outside click, escape handlers, and focus trap
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!overlayRef.current || event.key !== "Tab") return;

      const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEscKey);
      window.addEventListener("keydown", handleFocusTrap);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscKey);
      window.removeEventListener("keydown", handleFocusTrap);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  // Splitting for staggered animation
  const paragraphs = fullDescription.split(/\n\n|\r\n\r\n/).filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-(--background)/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      style={{
        backdropFilter: "blur(8px)",
        opacity: isClosing ? 0 : isVisible ? 1 : 0,
        transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        ref={overlayRef}
        className="bg-(--background) max-w-4xl rounded-lg border border-(--accent)/20 p-6 shadow-md overflow-hidden"
        style={{
          opacity: isClosing ? 0 : isVisible ? 1 : 0,
          transform: isClosing
            ? "translateY(30px) scale(0.95) rotate(-1deg)"
            : isVisible
            ? "translateY(0) scale(1) rotate(0deg)"
            : "translateY(30px) scale(0.95) rotate(1deg)",
          transition:
            "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out, rotate 0.6s ease-in-out",
          transformOrigin: isClosing ? "bottom center" : "center",
        }}
      >
        <div
          className="flex justify-between items-start px-4"
          style={{
            opacity: isClosing ? 0 : isVisible ? 1 : 0,
            transform: isClosing
              ? "translateY(-10px)"
              : isVisible
              ? "translateY(0)"
              : "translateY(-10px)",
            transition:
              "opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <h3
            id="dialog-title"
            className="font-nyght text-3xl bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent pr-10"
          >
            {title}
          </h3>
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="text-(--accent) hover:text-(--foreground) transition-colors rounded-full p-1 hover:bg-(--accent)/10"
            aria-label="Close dialog"
          >
            <X size={24} />
          </button>
        </div>

        <div className="prose prose-lg text-balance p-4" id="dialog-description">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  opacity: isClosing ? 0 : isVisible ? 1 : 0,
                  transform: isClosing
                    ? "translateY(20px)"
                    : isVisible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `opacity 0.6s ease-out, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)`,
                  transitionDelay: `${0.1 + index * 0.08}s`,
                }}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p
              style={{
                opacity: isClosing ? 0 : isVisible ? 1 : 0,
                transform: isClosing
                  ? "translateY(20px)"
                  : isVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition:
                  "opacity 0.6s ease-out, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.1s",
              }}
            >
              {fullDescription}
            </p>
          )}
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-(--accent)/30 to-transparent"
          style={{
            transform: isClosing
              ? "scaleX(0.5) translateY(4px)"
              : isVisible
              ? "scaleX(1) translateY(0)"
              : "scaleX(0.5) translateY(4px)",
            opacity: isClosing ? 0 : isVisible ? 1 : 0,
            transition:
              "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-in-out",
            transitionDelay: "0.05s",
          }}
        />
      </div>
    </div>
  );
};

export default ServiceOverlay;
