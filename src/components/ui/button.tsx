/**
 * -----------------------------------------------------------------------------
 * File: button.tsx
 * Description:
 * Application button component.
 *
 * Responsibilities:
 * - Support variants and sizes.
 * - Support loading state.
 * - Support icons.
 * - Correctly support Radix Slot.
 * -----------------------------------------------------------------------------
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "gap-2",
    "rounded-2xl",
    "font-semibold",
    "transition-all duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-blue-500/20",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "active:scale-[0.98]",
    "whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-xl",

        secondary:
          "border border-slate-200 bg-white/80 text-slate-700 backdrop-blur-xl hover:bg-white",

        outline:
          "border border-blue-200 bg-transparent text-blue-700 hover:bg-blue-50",

        ghost: "text-slate-700 hover:bg-slate-100",

        destructive: "bg-red-600 text-white hover:bg-red-700",

        link: "text-blue-600 underline-offset-4 hover:underline",
      },

      size: {
        sm: "h-10 px-4 text-sm",
        default: "h-12 px-6",
        lg: "h-14 px-8",
        icon: "h-12 w-12",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          className,
        )}
        disabled={!asChild ? disabled || loading : undefined}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}

        {!loading && leftIcon}

        {children}

        {!loading && rightIcon}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
