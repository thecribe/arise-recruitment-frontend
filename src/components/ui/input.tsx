/**
 * -----------------------------------------------------------------------------
 * File: input.tsx
 * Description:
 * Reusable application input component.
 *
 * Responsibilities:
 * - Provide a premium styled text input.
 * - Maintain accessibility.
 * - Support all native input props.
 * -----------------------------------------------------------------------------
 */

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // Layout
          "flex h-12 w-full rounded-2xl",

          // Border
          "border border-slate-200/80",

          // Glass
          "bg-white/80 backdrop-blur-xl",

          // Spacing
          "px-4 py-2",

          // Typography
          "text-sm text-slate-900",
          "placeholder:text-slate-400",

          // Shadow
          "shadow-sm",

          // Animation
          "transition-all duration-200",

          // Hover
          "hover:border-blue-300",
          "hover:bg-white",

          // Focus
          "focus-visible:outline-none",
          "focus-visible:border-blue-500",
          "focus-visible:ring-4",
          "focus-visible:ring-blue-500/15",

          // Disabled
          "disabled:cursor-not-allowed",
          "disabled:opacity-60",

          // File Input
          "file:border-0",
          "file:bg-transparent",
          "file:text-sm",
          "file:font-medium",

          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
