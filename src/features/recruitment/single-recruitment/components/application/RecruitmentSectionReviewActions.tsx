/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentSectionReviewActions.tsx
 *
 * Description:
 * Handles Recruitment Manager section review status actions.
 *
 * Status transitions:
 *
 * in_progress -> approved
 * in_progress -> rejected
 *
 * submitted -> approved
 * submitted -> rejected
 *
 * rejected -> approved
 * rejected -> in_progress
 *
 * approved -> in_progress
 *
 * locked sections cannot be reviewed.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import {
  CheckCircle2,
  Loader2,
  RotateCcw,
  Send,
  X,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import ConfirmDialog from "@/components/feedback/ConfirmDialog";

import type { RecruitmentApplicationSectionStatus } from "@/features/recruitment/types/recruitment.types";

interface RecruitmentSectionReviewActionsProps {
  sectionStatus: RecruitmentApplicationSectionStatus;

  onApprove: () => Promise<void> | void;

  onReject: (comment: string) => Promise<void> | void;

  onMarkInProgress: () => Promise<void> | void;

  isApproving?: boolean;
  isRejecting?: boolean;
  isMarkingInProgress?: boolean;
}

type PendingAction = "approve" | "reject" | "mark_in_progress" | null;

export default function RecruitmentSectionReviewActions({
  sectionStatus,
  onApprove,
  onReject,
  onMarkInProgress,
  isApproving = false,
  isRejecting = false,
  isMarkingInProgress = false,
}: RecruitmentSectionReviewActionsProps) {
  const [isRejectingMode, setIsRejectingMode] = useState(false);

  const [rejectionComment, setRejectionComment] = useState("");

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const isPending = isApproving || isRejecting || isMarkingInProgress;

  const handleApproveConfirm = async () => {
    await onApprove();

    setPendingAction(null);
  };

  const handleRejectConfirm = async () => {
    const comment = rejectionComment.trim();

    if (!comment) {
      return;
    }

    await onReject(comment);

    setRejectionComment("");
    setIsRejectingMode(false);
    setPendingAction(null);
  };

  const handleMarkInProgressConfirm = async () => {
    await onMarkInProgress();

    setPendingAction(null);
  };

  /**
   * ---------------------------------------------------------------------------
   * Locked
   * ---------------------------------------------------------------------------
   */

  if (sectionStatus === "locked") {
    return null;
  }

  /**
   * ---------------------------------------------------------------------------
   * Approved
   * ---------------------------------------------------------------------------
   */

  if (sectionStatus === "approved") {
    return (
      <>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />

            <span>Section approved.</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending}
            leftIcon={
              isMarkingInProgress ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )
            }
            onClick={() => setPendingAction("mark_in_progress")}
          >
            {isMarkingInProgress ? "Updating..." : "Mark In Progress"}
          </Button>
        </div>

        <ConfirmDialog
          open={pendingAction === "mark_in_progress"}
          title="Mark section as in progress?"
          description="This will reopen the approved section and allow it to be managed again."
          confirmLabel="Mark In Progress"
          isLoading={isMarkingInProgress}
          onCancel={() => setPendingAction(null)}
          onConfirm={handleMarkInProgressConfirm}
        />
      </>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Rejected
   * ---------------------------------------------------------------------------
   */

  if (sectionStatus === "rejected") {
    return (
      <>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-red-600">
            <XCircle className="h-4 w-4" />

            <span>Section rejected.</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending}
            leftIcon={
              isMarkingInProgress ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )
            }
            onClick={() => setPendingAction("mark_in_progress")}
          >
            {isMarkingInProgress ? "Updating..." : "Mark In Progress"}
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={isPending}
            leftIcon={
              isApproving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )
            }
            onClick={() => setPendingAction("approve")}
          >
            {isApproving ? "Approving..." : "Approve Section"}
          </Button>
        </div>

        <ConfirmDialog
          open={pendingAction === "approve"}
          title="Approve this section?"
          description="The section will be marked as approved and will no longer be editable until it is reopened."
          confirmLabel="Approve Section"
          isLoading={isApproving}
          onCancel={() => setPendingAction(null)}
          onConfirm={handleApproveConfirm}
        />

        <ConfirmDialog
          open={pendingAction === "mark_in_progress"}
          title="Mark section as in progress?"
          description="This will move the rejected section back to in progress."
          confirmLabel="Mark In Progress"
          isLoading={isMarkingInProgress}
          onCancel={() => setPendingAction(null)}
          onConfirm={handleMarkInProgressConfirm}
        />
      </>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * In Progress / Submitted
   * ---------------------------------------------------------------------------
   */

  const canReview =
    sectionStatus === "in_progress" || sectionStatus === "submitted";

  if (!canReview) {
    return null;
  }

  /**
   * ---------------------------------------------------------------------------
   * Reject mode
   * ---------------------------------------------------------------------------
   */

  if (isRejectingMode) {
    return (
      <>
        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-red-50/40
            p-4
            sm:p-5
          "
        >
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-slate-800">
              Reject Section
            </h4>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Provide a reason for rejecting this section.
            </p>
          </div>

          <Textarea
            value={rejectionComment}
            onChange={(event) => setRejectionComment(event.target.value)}
            placeholder="Enter the reason for rejecting this section..."
            rows={4}
            disabled={isPending}
          />

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              leftIcon={<X className="h-4 w-4" />}
              onClick={() => {
                setIsRejectingMode(false);
                setRejectionComment("");
              }}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={!rejectionComment.trim() || isPending}
              leftIcon={
                isRejecting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )
              }
              onClick={() => setPendingAction("reject")}
            >
              {isRejecting ? "Rejecting..." : "Reject Section"}
            </Button>
          </div>
        </div>

        <ConfirmDialog
          open={pendingAction === "reject"}
          title="Reject this section?"
          description="The applicant will be required to review the feedback and update this section before it can proceed."
          confirmLabel="Reject Section"
          variant="destructive"
          isLoading={isRejecting}
          onCancel={() => setPendingAction(null)}
          onConfirm={handleRejectConfirm}
        />
      </>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Normal review actions
   * ---------------------------------------------------------------------------
   */

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={isPending}
          leftIcon={<XCircle className="h-4 w-4" />}
          onClick={() => setIsRejectingMode(true)}
        >
          Reject Section
        </Button>

        <Button
          type="button"
          size="sm"
          disabled={isPending}
          leftIcon={
            isApproving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )
          }
          onClick={() => setPendingAction("approve")}
        >
          {isApproving ? "Approving..." : "Approve Section"}
        </Button>
      </div>

      <ConfirmDialog
        open={pendingAction === "approve"}
        title="Approve this section?"
        description="The section will be marked as approved and will no longer be editable until it is reopened."
        confirmLabel="Approve Section"
        isLoading={isApproving}
        onCancel={() => setPendingAction(null)}
        onConfirm={handleApproveConfirm}
      />
    </>
  );
}
