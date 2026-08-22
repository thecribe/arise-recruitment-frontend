/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicationSectionNavigation.tsx
 *
 * Description:
 * Vertical navigation for sections belonging to an application phase.
 *
 * Responsibilities:
 * - Display all sections belonging to the selected phase.
 * - Display the status of each section.
 * - Indicate the currently selected section.
 * - Allow the Recruitment Manager to switch between sections.
 *
 * Design:
 * The phase is already controlled by an Accordion. Therefore, sections are
 * intentionally displayed as vertical navigation instead of another accordion.
 *
 * Important:
 * This component receives only lightweight section summaries.
 *
 * It does NOT receive:
 * - Field definitions
 * - Applicant values
 * - Repeatable entries
 * - Recruiter comments
 *
 * Those are loaded separately when a section is selected.
 * -----------------------------------------------------------------------------
 */

import {
  CheckCircle2,
  Circle,
  Clock3,
  LockKeyhole,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  RecruitmentApplicationSectionStatus,
  RecruitmentApplicationSectionSummary,
} from "@/features/recruitment/types/recruitment.types";

interface RecruitmentApplicationSectionNavigationProps {
  /**
   * Lightweight section summaries belonging to the selected phase.
   */
  sections: RecruitmentApplicationSectionSummary[];

  /**
   * ID of the currently selected section.
   */
  selectedSectionId: string | null;

  /**
   * Called when the manager selects a section.
   */
  onSectionChange: (sectionId: string) => void;
}

/**
 * -----------------------------------------------------------------------------
 * Section status configuration.
 *
 * The icon provides a quick visual indication of the applicant's progress
 * without requiring the manager to open every section.
 * -----------------------------------------------------------------------------
 */
const statusConfig: Record<
  RecruitmentApplicationSectionStatus,
  {
    icon: typeof Circle;
    iconClassName: string;
  }
> = {
  locked: {
    icon: LockKeyhole,
    iconClassName: "text-slate-400",
  },

  in_progress: {
    icon: Circle,
    iconClassName: "text-blue-500",
  },

  submitted: {
    icon: Clock3,
    iconClassName: "text-amber-500",
  },

  approved: {
    icon: CheckCircle2,
    iconClassName: "text-green-500",
  },

  rejected: {
    icon: XCircle,
    iconClassName: "text-red-500",
  },
};

export default function RecruitmentApplicationSectionNavigation({
  sections,
  selectedSectionId,
  onSectionChange,
}: RecruitmentApplicationSectionNavigationProps) {
  /**
   * ---------------------------------------------------------------------------
   * Empty section state.
   *
   * This should normally not occur because application phases are expected to
   * contain sections, but keeping the component defensive prevents an empty
   * navigation area from looking broken.
   * ---------------------------------------------------------------------------
   */
  if (!sections.length) {
    return (
      <div className="px-3 py-4 text-center">
        <p className="text-xs text-slate-400">No sections available.</p>
      </div>
    );
  }

  return (
    <nav aria-label="Application sections" className="space-y-1">
      {sections.map((section) => {
        const config = statusConfig[section.status];

        const Icon = config.icon;

        const isSelected = section.id === selectedSectionId;

        const isLocked = section.status === "locked";

        return (
          <button
            key={section.id}
            type="button"
            disabled={isLocked}
            aria-current={isSelected ? "page" : undefined}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              /*
               * Base section navigation styling.
               */
              "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left",
              "transition-all duration-200",

              /*
               * Selected section.
               */
              isSelected && "bg-blue-50 text-blue-700 shadow-sm",

              /*
               * Non-selected section.
               */
              !isSelected &&
                !isLocked &&
                "text-slate-600 hover:bg-slate-50 hover:text-slate-900",

              /*
               * Locked section.
               */
              isLocked && "cursor-not-allowed opacity-60",
            )}
          >
            {/* ---------------------------------------------------------------- */}
            {/* Section status icon */}
            {/* ---------------------------------------------------------------- */}

            <Icon className={cn("h-4 w-4 shrink-0", config.iconClassName)} />

            {/* ---------------------------------------------------------------- */}
            {/* Section title */}
            {/* ---------------------------------------------------------------- */}

            <span
              className={cn(
                "min-w-0 flex-1 truncate text-sm",
                isSelected ? "font-semibold" : "font-medium",
              )}
            >
              {section.title}
            </span>

            {/* ---------------------------------------------------------------- */}
            {/* Selected indicator */}
            {/* ---------------------------------------------------------------- */}

            {isSelected && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
