/**
 * -----------------------------------------------------------------------------
 * File: EmptyState.tsx
 * Description:
 * Shared empty state component.
 * -----------------------------------------------------------------------------
 */

/**
 * -----------------------------------------------------------------------------
 * File: EmptyState.tsx
 * Description:
 * Shared empty state component.
 * -----------------------------------------------------------------------------
 */
import type { ReactNode } from "react";

import GlassCard from "./GlassCard";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <GlassCard className="flex flex-col items-center px-8 py-12 text-center">
      {icon && <div className="mb-5">{icon}</div>}

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      {description && (
        <p className="mt-2 max-w-md text-slate-500">{description}</p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </GlassCard>
  );
}
