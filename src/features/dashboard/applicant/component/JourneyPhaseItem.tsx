import { CheckCircle2, Clock3, Lock, RotateCcw, Send } from "lucide-react";

import StatusBadge from "../../components/StatusBadge";
import { PHASE_STATUS } from "@/features/application/constants/phase-status";
import type { ApplicantDashboardPhase } from "../../types/applicant-dashboard";

interface JourneyPhaseItemProps {
  phase: ApplicantDashboardPhase;
  isLast?: boolean;
  onClick?: () => void;
}

const icons = {
  [PHASE_STATUS.APPROVED]: CheckCircle2,
  [PHASE_STATUS.IN_PROGRESS]: Clock3,
  [PHASE_STATUS.SUBMITTED]: Send,
  [PHASE_STATUS.RETURNED]: RotateCcw,
  [PHASE_STATUS.LOCKED]: Lock,
};

const JourneyPhaseItem = ({
  phase,
  isLast = false,
  onClick,
}: JourneyPhaseItemProps) => {
  const Icon = icons[phase.status];

  return (
    <div
      className={`relative flex gap-4 ${phase.status === PHASE_STATUS.LOCKED ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
    >
      {!isLast && (
        <div className="absolute left-5 top-10 h-full w-px bg-border" />
      )}

      <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 rounded-xl border bg-background p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-semibold">{phase.title}</h4>

            {phase.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {phase.description}
              </p>
            )}

            {phase.completedAt && (
              <p className="mt-2 text-xs text-muted-foreground">
                Completed {phase.completedAt}
              </p>
            )}
          </div>

          <StatusBadge status={phase.status} />
        </div>
      </div>
    </div>
  );
};

export default JourneyPhaseItem;
