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
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle opening animation
  useEffect(() => {
    if (isOpen && !isVisible) {
      // Delay setting visible to allow initial render with starting styles
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }

    if (!isOpen) {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 600);
  };

  // Outside click and escape handlers - unchanged from your code
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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen && !isClosing) return null;

  // Splitting for staggered animation
  const paragraphs = fullDescription.split(/\n\n|\r\n\r\n/).filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-(--background)/80"
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
          <h3 className="font-nyght text-3xl bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent pr-10">
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="text-(--accent) hover:text-(--foreground) transition-colors rounded-full p-1 hover:bg-(--accent)/10"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="prose prose-lg text-balance p-4">
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
