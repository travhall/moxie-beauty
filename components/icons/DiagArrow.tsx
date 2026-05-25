interface DiagArrowProps {
  size?: number;
}

/** Diagonal arrow icon used on booking/external links. Decorative — always aria-hidden. */
export default function DiagArrow({ size = 14 }: DiagArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
