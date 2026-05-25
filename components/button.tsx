import React from "react";

export type ButtonVariant = "default" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "href"
> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders an animated CSS arrow after the label */
  showArrow?: boolean;
  /** When provided, renders as an <a> element instead of <button> */
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  isLoading?: boolean;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-[10px] font-sans font-medium tracking-[0.18em] uppercase rounded-full border whitespace-nowrap cursor-pointer select-none transition-all duration-[350ms] ease-[ease] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--button) disabled:pointer-events-none disabled:opacity-50 no-underline";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-5 text-[11px]",
  md: "h-[46px] px-[26px] text-[13px]",
  lg: "h-[52px] px-8 text-[13px]",
};

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-(--button) text-(--button-foreground) border-(--button) shadow-[0_1px_0_0_color-mix(in_oklab,var(--button)_35%,transparent)] hover:-translate-y-px hover:shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--midnite-900)_70%,transparent),0_2px_6px_-3px_color-mix(in_oklab,var(--rose-gold-700)_35%,transparent)]",
  outline:
    "bg-transparent text-(--foreground) border-(--foreground)/80 hover:border-(--foreground)/20 hover:bg-(--accent)/20 focus-visible:outline-(--foreground)",
  ghost:
    "bg-transparent text-(--ink) border-(--line) hover:bg-(--accent-soft)/20 hover:border-(--accent)/55",
};

function Arrow() {
  return (
    <span className="btn-arrow" aria-hidden="true">
      <span className="btn-arrow-shaft" />
    </span>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      variant = "default",
      size = "md",
      showArrow = false,
      href,
      target,
      rel,
      className = "",
      isLoading = false,
      disabled,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
    const content = isLoading ? (
      <Spinner />
    ) : (
      <>
        {children}
        {showArrow && <Arrow />}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={cls}
          aria-label={ariaLabel}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cls}
        disabled={isLoading || disabled}
        aria-label={ariaLabel}
        aria-busy={isLoading || undefined}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
