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

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceId, setServiceId] = useState<string | undefined>(undefined);
  const [serviceName, setServiceName] = useState<string | undefined>(undefined);

  const openBooking = (id?: string, name?: string) => {
    setServiceId(id);
    setServiceName(name);
    setIsOpen(true);
  };

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceId={serviceId}
        serviceName={serviceName}
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
