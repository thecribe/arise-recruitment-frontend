import {
  CheckCircle2,
  Clock3,
  Loader,
  Lock,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

import { PHASE_STATUS, type PhaseStatus } from "../../constants/phase-status";
import { useApplicationContext } from "../../context/ApplicationContext";

const phaseStatusConfig: Record<
  PhaseStatus,
  {
    icon: LucideIcon;
    container: string;
  }
> = {
  [PHASE_STATUS.LOCKED]: {
    icon: Lock,
    container: "border-slate-200 bg-slate-100 text-slate-400",
  },
  [PHASE_STATUS.IN_PROGRESS]: {
    icon: Loader,
    container: "border-slate-200 bg-slate-100 text-slate-400",
  },

  [PHASE_STATUS.DRAFT]: {
    icon: Clock3,
    container: "border-blue-300 bg-blue-50 text-blue-700",
  },

  [PHASE_STATUS.SUBMITTED]: {
    icon: Clock3,
    container: "border-amber-300 bg-amber-50 text-amber-700",
  },

  [PHASE_STATUS.REJECTED]: {
    icon: RotateCcw,
    container: "border-red-300 bg-red-50 text-red-700",
  },

  [PHASE_STATUS.APPROVED]: {
    icon: CheckCircle2,
    container: "border-green-300 bg-green-50 text-green-700",
  },
};

export default function PhaseNavigation() {
  const { availablePhases, applicantApplication, activePhase, selectPhase } =
    useApplicationContext();

  const phases = [...availablePhases].sort((a, b) => a.order - b.order);

  /**
   * Build a lookup map for applicant phase records.
   */
  const phaseRecordMap = new Map(
    applicantApplication.phases.map((phase) => [phase.phaseId, phase]),
  );

  return (
    <section
      className="
        rounded-3xl
        border border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-lg
        p-5
        sm:p-6
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Application Journey</h2>

        <span className="text-xs text-slate-500">{phases.length} Phases</span>
      </div>

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          overflow-y-hidden
          pb-2
          snap-x
          snap-mandatory
          scroll-smooth
          no-scrollbar
        "
      >
        {phases.map((phase) => {
          const record = phaseRecordMap.get(phase.id);

          /**
           * This should never happen because availablePhases
           * are derived from applicantApplication.phases.
           * Guard against inconsistent backend data.
           */
          if (!record) {
            return null;
          }

          const config = phaseStatusConfig[record.status];
          const Icon = config.icon;

          const isActive = phase.id === activePhase.id;

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => selectPhase(phase.id)}
              className={`
                min-w-[220px]
                sm:min-w-[240px]
                shrink-0
                snap-start
                rounded-2xl
                border
                p-4
                text-left
                transition-all
                duration-200
                ${config.container}
                ${
                  isActive
                    ? "scale-[1.02] ring-2 ring-blue-500 shadow-md"
                    : "hover:-translate-y-0.5"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0" />

                <h3 className="truncate font-semibold">{phase.title}</h3>
              </div>

              {phase.description && (
                <p className="mt-2 line-clamp-2 text-sm opacity-80">
                  {phase.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
