"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import BookingOverlay from "@/components/booking-overlay";

interface BookingContextType {
  openBooking: (serviceId?: string, serviceName?: string) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

type BookingState =
  | { open: false }
  | { open: true; serviceId?: string; serviceName?: string };

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>({ open: false });

  const openBooking = (serviceId?: string, serviceName?: string) => {
    setBooking({ open: true, serviceId, serviceName });
  };

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingOverlay
        isOpen={booking.open}
        onClose={() => setBooking({ open: false })}
        serviceId={booking.open ? booking.serviceId : undefined}
        serviceName={booking.open ? booking.serviceName : undefined}
      />
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
