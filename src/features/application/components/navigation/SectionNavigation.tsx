/**
 * -----------------------------------------------------------------------------
 * File: SectionNavigation.tsx
 *
 * Description:
 * Navigation for the sections belonging to the currently selected phase.
 *
 * Responsibilities:
 * - Display available sections.
 * - Display each section's status.
 * - Allow navigation between viewable sections.
 * - Display overall section progress.
 * -----------------------------------------------------------------------------
 */

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Loader,
  Lock,
  Pencil,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { SECTION_STATUS } from "../../constants/section-status";
import { useApplicationContext } from "../../context/ApplicationContext";

const sectionStatusConfig = {
  [SECTION_STATUS.LOCKED]: {
    icon: Lock,
    iconClass: "text-slate-400",
    borderClass: "border-slate-200",
    backgroundClass: "bg-slate-50",
  },
  [SECTION_STATUS.IN_PROGRESS]: {
    icon: Loader,
    iconClass: "text-amber-600",
    borderClass: "border-amber-200",
    backgroundClass: "bg-amber-50",
  },

  [SECTION_STATUS.DRAFT]: {
    icon: Pencil,
    iconClass: "text-blue-600",
    borderClass: "border-blue-200",
    backgroundClass: "bg-blue-50",
  },

  [SECTION_STATUS.SUBMITTED]: {
    icon: Clock3,
    iconClass: "text-amber-600",
    borderClass: "border-amber-200",
    backgroundClass: "bg-amber-50",
  },

  [SECTION_STATUS.APPROVED]: {
    icon: CheckCircle2,
    iconClass: "text-green-600",
    borderClass: "border-green-200",
    backgroundClass: "bg-green-50",
  },

  [SECTION_STATUS.REJECTED]: {
    icon: AlertTriangle,
    iconClass: "text-red-600",
    borderClass: "border-red-200",
    backgroundClass: "bg-red-50",
  },
};

export default function SectionNavigation() {
  const {
    sections,
    activeSection,
    sectionRecordMap,
    progressSummary,
    selectSection,
  } = useApplicationContext();

  const orderedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <aside
      className="
        rounded-3xl
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-lg
        p-5
      "
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Sections</h3>

        <p className="text-sm text-slate-500">
          Complete each section in order.
        </p>
      </div>

      <div className="space-y-3">
        {orderedSections.map((section) => {
          const record = sectionRecordMap.get(section.id);

          const status = record?.status ?? SECTION_STATUS.LOCKED;

          const config = sectionStatusConfig[status];

          const Icon = config.icon;

          const isActive = section.id === activeSection.id;

          const canView = status !== SECTION_STATUS.LOCKED;

          return (
            <button
              key={section.id}
              type="button"
              disabled={!canView}
              onClick={() => selectSection(section.id)}
              className={cn(
                "w-full rounded-2xl border p-4 text-left transition-all",

                config.borderClass,
                config.backgroundClass,

                isActive && "ring-2 ring-blue-500 shadow-lg",

                canView && "hover:-translate-y-0.5 hover:shadow-md",

                !canView && "cursor-not-allowed opacity-60",
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                  "
                >
                  <Icon className={cn("h-5 w-5", config.iconClass)} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">
                    {section.title}
                  </p>

                  {section.description && (
                    <p className="mt-1 text-xs text-slate-500">
                      {section.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 border-t border-white/20 pt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Progress</span>

          <span className="font-semibold text-blue-700">
            {progressSummary.completedSections} /{" "}
            {progressSummary.totalSections}
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${progressSummary.percentage}%`,
            }}
          />
        </div>
      </div>
    </aside>
  );
}
