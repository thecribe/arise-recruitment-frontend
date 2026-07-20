/**
 * -----------------------------------------------------------------------------
 * File: ApplicationStageTracker.tsx
 * Description:
 * Vertical application progress tracker.
 * -----------------------------------------------------------------------------
 */

import { CheckCircle2, Circle, Clock3, XCircle } from "lucide-react";

import { GlassCard } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ApplicationStage } from "../../types/type";

interface ApplicationStageTrackerProps {
  stages: ApplicationStage[];
}

export default function ApplicationStageTracker({
  stages,
}: ApplicationStageTrackerProps) {
  return (
    <GlassCard className="p-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-900">
          Application Progress
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Track your progress through the recruitment process.
        </p>
      </div>

      <div className="space-y-0">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="relative flex gap-5 pb-8 last:pb-0">
              {/* Vertical Line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-[14px] top-8 h-full w-0.5",
                    stage.status === "completed"
                      ? "bg-green-500"
                      : "bg-slate-200",
                  )}
                />
              )}

              {/* Icon */}
              <div className="relative z-10">
                {stage.status === "completed" && (
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                )}

                {stage.status === "current" && (
                  <Clock3 className="h-7 w-7 text-blue-600" />
                )}

                {stage.status === "upcoming" && (
                  <Circle className="h-7 w-7 text-slate-300" />
                )}

                {stage.status === "rejected" && (
                  <XCircle className="h-7 w-7 text-red-600" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between">
                  <h4
                    className={cn(
                      "font-semibold",
                      stage.status === "upcoming"
                        ? "text-slate-400"
                        : "text-slate-900",
                    )}
                  >
                    {stage.title}
                  </h4>

                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium capitalize",

                      stage.status === "completed" &&
                        "bg-green-100 text-green-700",

                      stage.status === "current" && "bg-blue-100 text-blue-700",

                      stage.status === "upcoming" &&
                        "bg-slate-100 text-slate-500",

                      stage.status === "rejected" && "bg-red-100 text-red-700",
                    )}
                  >
                    {stage.status}
                  </span>
                </div>

                {stage.completedAt && (
                  <p className="mt-2 text-sm text-slate-500">
                    Completed on {stage.completedAt}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
