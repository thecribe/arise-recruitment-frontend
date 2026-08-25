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

  const isPending = isApproving || isRejecting || isMarkingInProgress;

  /**
   * ---------------------------------------------------------------------------
   * Locked
   *
   * A locked section cannot be reviewed.
   * ---------------------------------------------------------------------------
   */

  if (sectionStatus === "locked") {
    return null;
  }

  /**
   * ---------------------------------------------------------------------------
   * Approved
   *
   * Manager cannot edit approved sections.
   *
   * However, the manager can reopen the section by moving it
   * back to in_progress.
   * ---------------------------------------------------------------------------
   */

  if (sectionStatus === "approved") {
    return (
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
          onClick={onMarkInProgress}
        >
          {isMarkingInProgress ? "Updating..." : "Mark In Progress"}
        </Button>
      </div>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Rejected
   *
   * The manager can:
   *
   * - Approve
   * - Move back to in_progress
   *
   * The manager can still edit the section separately.
   * ---------------------------------------------------------------------------
   */

  if (sectionStatus === "rejected") {
    return (
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
          onClick={onMarkInProgress}
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
          onClick={onApprove}
        >
          {isApproving ? "Approving..." : "Approve Section"}
        </Button>
      </div>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * In Progress / Submitted
   *
   * Both statuses can be reviewed.
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
            onClick={() => {
              const comment = rejectionComment.trim();

              if (!comment) return;

              onReject(comment);
            }}
          >
            {isRejecting ? "Rejecting..." : "Reject Section"}
          </Button>
        </div>
      </div>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Normal review actions
   * ---------------------------------------------------------------------------
   */

  return (
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
        onClick={onApprove}
      >
        {isApproving ? "Approving..." : "Approve Section"}
      </Button>
    </div>
  );
}
