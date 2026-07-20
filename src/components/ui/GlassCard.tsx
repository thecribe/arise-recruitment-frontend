/**
 * -----------------------------------------------------------------------------
 * File: GlassCard.tsx
 * Description:
 * Shared glass container used throughout the dashboard.
 *
 * Responsibilities:
 * - Consistent styling
 * - Optional hover animation
 * - Reusable wrapper
 * -----------------------------------------------------------------------------
 */

/**
 * -----------------------------------------------------------------------------
 * File: GlassCard.tsx
 * Description:
 * Shared glass container used throughout the dashboard.
 *
 * Responsibilities:
 * - Consistent styling
 * - Optional hover animation
 * - Reusable wrapper
 * -----------------------------------------------------------------------------
 */
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function GlassCard({
  className,
  hover = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div {...props} className={cn("glass", hover && "glass-hover", className)}>
      {children}
    </div>
  );
}
