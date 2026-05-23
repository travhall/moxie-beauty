"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import BookingOverlay from "@/components/booking-overlay";

interface BookingContextType {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ openBooking: () => setIsOpen(true) }}>
      {children}
      <BookingOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}
