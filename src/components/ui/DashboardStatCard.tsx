/**
 * -----------------------------------------------------------------------------
 * File: DashboardStatCard.tsx
 * Description:
 * Dashboard statistics card.
 * -----------------------------------------------------------------------------
 */

/**
 * -----------------------------------------------------------------------------
 * File: DashboardStatCard.tsx
 * Description:
 * Dashboard statistics card.
 * -----------------------------------------------------------------------------
 */
import type { LucideIcon } from "lucide-react";

import GlassCard from "./GlassCard";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
}

export default function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <GlassCard hover className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="mt-3 text-sm text-slate-500">{description}</p>
          )}
        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
          "
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </GlassCard>
  );
}
