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
            <p
              className={cn(
                "text-sm",
                isSelected ? "font-semibold" : "font-medium",
              )}
            >
              {phase.title}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {phase.sections.length}{" "}
              {phase.sections.length === 1 ? "section" : "sections"}
            </p>
          </button>
        );
      })}
    </div>
  );
}
