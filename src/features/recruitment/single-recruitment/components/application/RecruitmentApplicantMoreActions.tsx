/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicantMoreActions.tsx
 *
 * Description:
 *
 * Recruitment applicant management actions.
 *
 * Currently supports:
 *
 * - Updating application status
 * - Updating application stage
 *
 * Additional management actions can be added here later.
 * -----------------------------------------------------------------------------
 */

import { Loader2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUpdateRecruitmentApplicationStatus } from "@/features/recruitment/hooks/useUpdateRecruitmentApplicationStatus";

import { useUpdateRecruitmentApplicationStage } from "@/features/recruitment/hooks/useUpdateRecruitmentApplicationStage";

import type {
  RecruitmentApplicationStage,
  RecruitmentApplicantStatus,
} from "@/features/recruitment/types/recruitment.types";

interface RecruitmentApplicantMoreActionsProps {
  /**
   * ApplicantApplication ID.
   *
   * IMPORTANT:
   * This is the application ID, not the applicant/user ID.
   */
  applicantId: string;

  /**
   * Current application status.
   */
  status: RecruitmentApplicantStatus;

  /**
   * Current application stage.
   */
  stage: RecruitmentApplicationStage;
}

export default function RecruitmentApplicantMoreActions({
  applicantId,
  status,
  stage,
}: RecruitmentApplicantMoreActionsProps) {
  /**
   * ---------------------------------------------------------------------------
   * Application status mutation.
   * ---------------------------------------------------------------------------
   */

  const updateApplicationStatus = useUpdateRecruitmentApplicationStatus();

  /**
   * ---------------------------------------------------------------------------
   * Application stage mutation.
   * ---------------------------------------------------------------------------
   */

  const updateApplicationStage = useUpdateRecruitmentApplicationStage();

  /**
   * ---------------------------------------------------------------------------
   * Combined loading state.
   *
   * Prevents multiple actions from being triggered simultaneously.
   * ---------------------------------------------------------------------------
   */

  const isUpdating =
    updateApplicationStatus.isPending || updateApplicationStage.isPending;

  /**
   * ---------------------------------------------------------------------------
   * Update application status.
   * ---------------------------------------------------------------------------
   */

  const handleStatusChange = async (nextStatus: RecruitmentApplicantStatus) => {
    if (nextStatus === status) {
      return;
    }

    await updateApplicationStatus.mutateAsync({
      applicantId,
      status: nextStatus,
    });
  };

  /**
   * ---------------------------------------------------------------------------
   * Update application stage.
   * ---------------------------------------------------------------------------
   */

  const handleStageChange = async (nextStage: RecruitmentApplicationStage) => {
    if (nextStage === stage) {
      return;
    }

    await updateApplicationStage.mutateAsync({
      applicantId,
      stage: nextStage,
    });
  };

  return (
    <DropdownMenu>
      {/* ------------------------------------------------------------------- */}
      {/* Trigger                                                             */}
      {/* ------------------------------------------------------------------- */}

      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            disabled={isUpdating}
            leftIcon={
              isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )
            }
          >
            {isUpdating ? "Updating..." : "More Actions"}
          </Button>
        }
      />

      {/* ------------------------------------------------------------------- */}
      {/* Content                                                             */}
      {/* ------------------------------------------------------------------- */}

      <DropdownMenuContent
        align="end"
        className="
          w-60
          rounded-xl
          border
          border-slate-200/80
          bg-white/95
          p-1
          shadow-xl
          backdrop-blur-xl
        "
      >
        {/* ----------------------------------------------------------------- */}
        {/* Application Actions Label                                         */}
        {/* ----------------------------------------------------------------- */}

        <DropdownMenuGroup>
          <DropdownMenuLabel>Application Actions</DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* ----------------------------------------------------------------- */}
        {/* Application Status                                                */}
        {/* ----------------------------------------------------------------- */}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex w-full items-center justify-between gap-4">
              <span>Change Status</span>

              <span className="text-xs text-slate-400">
                {formatStatus(status)}
              </span>
            </div>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent
            className="
              w-52
              rounded-xl
              border
              border-slate-200/80
              bg-white/95
              shadow-xl
              backdrop-blur-xl
            "
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Application Status</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                disabled={isUpdating || status === "IN_PROGRESS"}
                onClick={() => handleStatusChange("IN_PROGRESS")}
              >
                In Progress
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={isUpdating || status === "APPROVED"}
                onClick={() => handleStatusChange("APPROVED")}
              >
                Approved
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                disabled={isUpdating || status === "REJECTED"}
                onClick={() => handleStatusChange("REJECTED")}
              >
                Rejected
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* ----------------------------------------------------------------- */}
        {/* Application Stage                                                 */}
        {/* ----------------------------------------------------------------- */}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex w-full items-center justify-between gap-4">
              <span>Change Stage</span>

              <span className="text-xs text-slate-400">
                {formatStage(stage)}
              </span>
            </div>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent
            className="
              w-52
              rounded-xl
              border
              border-slate-200/80
              bg-white/95
              shadow-xl
              backdrop-blur-xl
            "
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Application Stage</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                disabled={isUpdating || stage === "APPLICATION_FORM"}
                onClick={() => handleStageChange("APPLICATION_FORM")}
              >
                Application Form
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={isUpdating || stage === "INTERVIEW"}
                onClick={() => handleStageChange("INTERVIEW")}
              >
                Interview
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={isUpdating || stage === "COMPLIANCE"}
                onClick={() => handleStageChange("COMPLIANCE")}
              >
                Compliance
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* ----------------------------------------------------------------- */}
        {/* Future Actions                                                    */}
        {/* ----------------------------------------------------------------- */}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>More actions will be added here</DropdownMenuLabel>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * -----------------------------------------------------------------------------
 * Format application status.
 * -----------------------------------------------------------------------------
 */

function formatStatus(status: RecruitmentApplicantStatus) {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/**
 * -----------------------------------------------------------------------------
 * Format application stage.
 * -----------------------------------------------------------------------------
 */

function formatStage(stage: RecruitmentApplicationStage) {
  return stage
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
