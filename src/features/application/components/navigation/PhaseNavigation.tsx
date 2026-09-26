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
  const { availablePhases, activePhase, selectPhase } = useApplicationContext();

  const phases = [...availablePhases].sort((a, b) => a.order - b.order);

  /**
   * Build a lookup map for applicant phase records.
   */
  const phaseRecordMap = new Map(phases.map((phase) => [phase.id, phase]));

  /**
   * Determines whether a phase can be selected.
   */
  const canSelectPhase = (phaseStatus?: string) => {
    return phaseStatus !== PHASE_STATUS.LOCKED && Boolean(phaseStatus);
  };

  return (
    <section
      className="
        rounded-2xl
        border border-white/20
        bg-white/70
        px-3
        py-3
        shadow-md
        backdrop-blur-xl
        sm:px-4
        sm:py-3.5
      "
    >
      {/* ================================================================
          HEADER
      ================================================================= */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Application Journey
          </h2>

          <span
            className="
              rounded-full
              bg-blue-50
              px-2
              py-0.5
              text-[10px]
              font-medium
              text-blue-600
              sm:text-xs
            "
          >
            {phases.length}
          </span>
        </div>

        <span className="text-[10px] text-slate-400 sm:text-xs">
          Scroll to view
        </span>
      </div>

      {/* ================================================================
          PHASES
      ================================================================= */}
      <div
        className="
          flex
          gap-2
          overflow-x-auto
          overflow-y-hidden
          pb-1
          snap-x
          snap-mandatory
          scroll-smooth
          touch-pan-x
          scrollbar-thin
        "
      >
        {phases.map((phase) => {
          const record = phaseRecordMap.get(phase.id);

          /**
           * This should never happen because availablePhases
           * are derived from applicantApplication.phases.
           */
          if (!record) {
            return null;
          }

          const config =
            record.status && phaseStatusConfig[record.status as PhaseStatus]
              ? phaseStatusConfig[record.status as PhaseStatus]
              : phaseStatusConfig[PHASE_STATUS.LOCKED];

          const Icon = config.icon;

          const isActive = phase.id === activePhase.id;

          const isSelectable = canSelectPhase(record.status);

          return (
            <button
              key={phase.id}
              type="button"
              disabled={!isSelectable}
              onClick={(e) => {
                e.preventDefault();

                if (isSelectable) {
                  selectPhase(phase.id);
                }
              }}
              className={`
                group
                w-56
                min-w-56
                shrink-0
                snap-start
                rounded-xl
                border
                px-3
                py-2.5
                text-left
                transition-all
                duration-200

                ${config.container}

                ${
                  isActive
                    ? `
                      ring-2
                      ring-blue-500/70
                      shadow-sm
                    `
                    : `
                      hover:-translate-y-0.5
                      hover:shadow-sm
                    `
                }

                disabled:cursor-not-allowed
              `}
            >
              {/* Phase Title */}
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/60
                  "
                >
                  <Icon
                    className={`
                      h-4
                      w-4
                      shrink-0
                      ${
                        record.status === PHASE_STATUS.IN_PROGRESS
                          ? "animate-spin"
                          : ""
                      }
                    `}
                  />
                </div>

                <h3 className="truncate text-sm font-semibold">
                  {phase.title}
                </h3>
              </div>

              {/* Description */}
              {phase.description && (
                <p
                  className="
                    mt-1.5
                    line-clamp-1
                    text-[11px]
                    leading-4
                    opacity-75
                  "
                >
                  {phase.description}
                </p>
              )}

              {/* Active Indicator */}
              {isActive && (
                <div className="mt-1.5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                  <span className="text-[10px] font-medium text-blue-700">
                    Current phase
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
