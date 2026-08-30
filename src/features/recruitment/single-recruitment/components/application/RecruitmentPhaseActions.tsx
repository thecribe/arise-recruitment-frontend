/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentPhaseActions.tsx
 *
 * Description:
 * Displays and manages Recruitment Manager actions for an application phase.
 *
 * Supported transitions:
 *
 * locked
 *   → in_progress
 *
 * in_progress
 *   → locked
 *   → approved
 *
 * approved
 *   → in_progress
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { CheckCircle2, Lock, Loader2, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";

import ConfirmDialog from "@/components/feedback/ConfirmDialog";

import type {
  RecruitmentApplicationPhase,
  RecruitmentApplicationPhaseStatus,
} from "@/features/recruitment/types/recruitment.types";

import { useUpdateRecruitmentApplicationPhaseStatus } from "@/features/recruitment/hooks/useUpdateRecruitmentApplicationPhaseStatus";

interface RecruitmentPhaseActionsProps {
  applicationId: string;
  phase: RecruitmentApplicationPhase;
}

type PhaseAction = "start" | "lock" | "approve" | "reopen" | null;

interface PhaseActionConfig {
  title: string;
  description: string;
  confirmLabel: string;
  variant: "default" | "warning" | "destructive";
  status: RecruitmentApplicationPhaseStatus;
}

export default function RecruitmentPhaseActions({
  applicationId,
  phase,
}: RecruitmentPhaseActionsProps) {
  const [pendingAction, setPendingAction] = useState<PhaseAction>(null);

  const updatePhaseStatus = useUpdateRecruitmentApplicationPhaseStatus();

  const actionConfig: Record<Exclude<PhaseAction, null>, PhaseActionConfig> = {
    start: {
      title: "Start this phase?",
      description:
        "This will set the phase to in progress and make all sections in this phase available for management.",
      confirmLabel: "Start Phase",
      variant: "default",
      status: "in_progress",
    },

    lock: {
      title: "Lock this phase?",
      description:
        "This will lock the phase and prevent further work on its sections until the phase is started again.",
      confirmLabel: "Lock Phase",
      variant: "warning",
      status: "locked",
    },

    approve: {
      title: "Approve this phase?",
      description:
        "Approving this phase will approve all sections within it. Approved sections will no longer be editable.",
      confirmLabel: "Approve Phase",
      variant: "warning",
      status: "approved",
    },

    reopen: {
      title: "Reopen this phase?",
      description:
        "This will move the phase back to in progress and allow its sections to be managed again.",
      confirmLabel: "Reopen Phase",
      variant: "default",
      status: "in_progress",
    },
  };

  const handleConfirm = () => {
    if (!pendingAction) {
      return;
    }

    const action = actionConfig[pendingAction];

    updatePhaseStatus.mutate(
      {
        applicationId,
        phaseId: phase.id,
        status: action.status,
      },
      {
        onSuccess: () => {
          setPendingAction(null);
        },
      },
    );
  };

  const currentAction = pendingAction ? actionConfig[pendingAction] : null;

  return (
    <>
      <GlassCard className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* --------------------------------------------------------------- */}
          {/* Phase information */}
          {/* --------------------------------------------------------------- */}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {phase.title}
                </p>

                {phase.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {phase.description}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              {phase.sections.length}{" "}
              {phase.sections.length === 1 ? "section" : "sections"}
            </p>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* Phase actions */}
          {/* --------------------------------------------------------------- */}

          <div className="flex flex-wrap gap-2">
            {phase.status === "locked" && (
              <Button
                type="button"
                size="sm"
                disabled={updatePhaseStatus.isPending}
                leftIcon={
                  updatePhaseStatus.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )
                }
                onClick={() => setPendingAction("start")}
              >
                Start Phase
              </Button>
            )}

            {phase.status === "in_progress" && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={updatePhaseStatus.isPending}
                  leftIcon={<Lock className="h-4 w-4" />}
                  onClick={() => setPendingAction("lock")}
                >
                  Lock Phase
                </Button>

                <Button
                  type="button"
                  size="sm"
                  disabled={updatePhaseStatus.isPending}
                  leftIcon={<CheckCircle2 className="h-4 w-4" />}
                  onClick={() => setPendingAction("approve")}
                >
                  Approve Phase
                </Button>
              </>
            )}

            {phase.status === "approved" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={updatePhaseStatus.isPending}
                leftIcon={<RotateCcw className="h-4 w-4" />}
                onClick={() => setPendingAction("reopen")}
              >
                Reopen Phase
              </Button>
            )}
          </div>
        </div>
      </GlassCard>

      {/* ----------------------------------------------------------------- */}
      {/* Confirmation dialog */}
      {/* ----------------------------------------------------------------- */}

      {currentAction && (
        <ConfirmDialog
          open={Boolean(pendingAction)}
          title={currentAction.title}
          description={currentAction.description}
          confirmLabel={currentAction.confirmLabel}
          variant={currentAction.variant}
          isLoading={updatePhaseStatus.isPending}
          onCancel={() => setPendingAction(null)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
