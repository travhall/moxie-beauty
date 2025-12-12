import React, { useMemo } from "react";
import { LucideIcon } from "lucide-react";

export type ButtonVariant = "default" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  className?: string;
  isLoading?: boolean;
  style?: Record<string, string | number>;
  ariaLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      iconOnly = false,
      className = "",
      isLoading = false,
      disabled,
      ariaLabel,
      style,
      ...props
    },
    ref
  ) => {
    const styles = useMemo(() => {
      // Base button styles
      const baseStyles =
        "inline-flex items-center justify-center text-nowrap font-bold transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--button) disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bevel";

      // Size styles
      const sizeStyles = {
        sm: "h-8 text-xs rounded-xs rounded-tr-lg rounded-bl-lg hover:rounded-xs hover:rounded-tl-lg hover:rounded-br-lg",
        md: "h-10 text-sm rounded-xs rounded-tr-xl rounded-bl-xl hover:rounded-xs hover:rounded-tl-xl hover:rounded-br-xl",
        lg: "h-12 text-base rounded-xs rounded-tr-2xl rounded-bl-2xl hover:rounded-xs hover:rounded-tl-2xl hover:rounded-br-2xl",
      };

      // Padding styles based on icon and content
      const paddingStyles = {
        sm: iconOnly ? "px-2" : "px-3",
        md: iconOnly ? "px-2.5" : "px-4",
        lg: iconOnly ? "px-3" : "px-5",
      };

      // Variant styles
      const variantStyles = {
        default:
          "bg-(--button) text-(--button-foreground) hover:bg-(--button)/90 focus-visible:ring-(--button)/80 disabled:bg-(--button)/50 text-shadow-lg text-shadow-(--foreground)",
        outline:
          "border border-(--foreground) bg-transparent hover:bg-(--foreground)/15 focus-visible:ring-(--foreground)/20 disabled:border-(--foreground)/30 disabled:text-(--foreground)/50 text-shadow-lg text-shadow-(--background)",
        ghost:
          "bg-transparent hover:bg-(--foreground)/15 focus-visible:ring-(--foreground)/20 disabled:hover:bg-transparent",
      };

      // Icon spacing
      const iconSpacing = !iconOnly && children ? "gap-2" : "";

      // Icon size
      const iconSize = {
        sm: 16,
        md: 18,
        lg: 20,
      };

      return {
        baseStyles,
        sizeStyles,
        paddingStyles,
        variantStyles,
        iconSpacing,
        iconSize,
      };
    }, [iconOnly, children]);

    const {
      baseStyles,
      sizeStyles,
      paddingStyles,
      variantStyles,
      iconSpacing,
      iconSize,
    } = styles;

    // Generate ARIA label for icon-only buttons if not provided
    const ariaLabelText = useMemo(() => {
      if (ariaLabel) return ariaLabel;
      if (iconOnly && typeof children === "string") {
        return children.trim();
      }
      return undefined;
    }, [ariaLabel, iconOnly, children]);

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${paddingStyles[size]} ${variantStyles[variant]} ${iconSpacing} ${className}`}
        disabled={isLoading || disabled}
        aria-label={ariaLabelText}
        aria-busy={isLoading}
        style={style}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {Icon && !isLoading && iconPosition === "left" && (
          <Icon size={iconSize[size]} aria-hidden="true" />
        )}

        {!iconOnly && children}

        {Icon && !isLoading && iconPosition === "right" && (
          <Icon size={iconSize[size]} aria-hidden="true" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
