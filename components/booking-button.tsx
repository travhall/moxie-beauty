"use client";

import { useBooking } from "@/context/BookingContext";
import Button, { type ButtonProps } from "@/components/button";

export default function BookingButton({
  serviceId,
  serviceName,
  children,
  ...props
}: Omit<ButtonProps, "onClick"> & {
  serviceId?: string;
  serviceName?: string;
}) {
  const { openBooking } = useBooking();
  return (
    <Button onClick={() => openBooking(serviceId, serviceName)} {...props}>
      {children}
    </Button>
  );
}
