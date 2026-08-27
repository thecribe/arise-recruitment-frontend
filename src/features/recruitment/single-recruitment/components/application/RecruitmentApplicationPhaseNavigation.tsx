/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicationPhaseNavigation.tsx
 * -----------------------------------------------------------------------------
 */

import type { RecruitmentApplicationPhase } from "@/features/recruitment/types/recruitment.types";

import { cn } from "@/lib/utils";

interface RecruitmentApplicationPhaseNavigationProps {
  phases: RecruitmentApplicationPhase[];

  selectedPhaseId: string | null;

  onPhaseChange: (phaseId: string) => void;
}

export default function RecruitmentApplicationPhaseNavigation({
  phases,
  selectedPhaseId,
  onPhaseChange,
}: RecruitmentApplicationPhaseNavigationProps) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto pb-1">
      {phases.map((phase) => {
        const isSelected = phase.id === selectedPhaseId;

        const statusLabel = {
          locked: "Locked",
          in_progress: "In Progress",
          approved: "Approved",
        }[phase.status];

        return (
          <button
            key={phase.id}
            type="button"
            onClick={() => onPhaseChange(phase.id)}
            className={cn(
              `
                shrink-0
                rounded-xl
                border
                px-4
                py-3
                text-left
                transition-all
              `,
              isSelected
                ? `
                  border-blue-200
                  bg-blue-50
                  text-blue-700
                  shadow-sm
                `
                : `
                  border-slate-200
                  bg-white/50
                  text-slate-600
                  hover:bg-white
                  hover:text-slate-900
                `,
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <p
                className={cn(
                  "text-sm",
                  isSelected ? "font-semibold" : "font-medium",
                )}
              >
                {phase.title}
              </p>

              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",

                  phase.status === "approved" && "bg-green-100 text-green-700",

                  phase.status === "in_progress" && "bg-blue-100 text-blue-700",

                  phase.status === "locked" && "bg-slate-100 text-slate-500",
                )}
              >
                {statusLabel}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {phase.sections.length}{" "}
              {phase.sections.length === 1 ? "section" : "sections"}
            </p>
          </button>
        );
      })}
    </div>
  );
}
