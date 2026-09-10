import type { PropsWithChildren } from "react";
import { useState } from "react";
import { CheckCircle2, CircleAlert, Clock3, XCircle } from "lucide-react";

import { useComplianceSection } from "./hooks/useComplianceSection";
import RecruitmentSectionComments from "../application/RecruitmentSectionComments";

type ReviewStatus = "in_progress" | "approved" | "rejected";

const statusConfig = {
  locked: {
    label: "Locked",
    icon: Clock3,
  },
  in_progress: {
    label: "In Progress",
    icon: Clock3,
  },
  submitted: {
    label: "Submitted",
    icon: CircleAlert,
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
  },
} as const;

interface ComplianceSectionReviewProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export default function ComplianceSectionReview({
  title,
  description,
  children,
}: ComplianceSectionReviewProps) {
  const {
    progress,
    comments,
    addComment,
    updateComment,
    deleteComment,
    isAddingComment,
    updatingCommentId,
    deletingCommentId,
    updateStatus,
    isUpdatingStatus,
  } = useComplianceSection();

  const [reviewComment, setReviewComment] = useState("");

  const currentStatus = progress ?? "locked";

  const config = statusConfig[currentStatus];

  const StatusIcon = config.icon;

  /*
   * ---------------------------------------------------------------
   * Review button visibility
   * ---------------------------------------------------------------
   *
   * locked:
   *   → Mark In Progress
   *
   * in_progress:
   *   → Approve
   *   → Reject
   *
   * submitted:
   *   → Mark In Progress
   *   → Approve
   *   → Reject
   *
   * approved:
   *   → Mark In Progress
   *   → Reject
   *
   * rejected:
   *   → Mark In Progress
   *   → Approve
   */
  const showInProgressButton = currentStatus !== "in_progress";

  const showApproveButton =
    currentStatus !== "approved" && currentStatus !== "locked";

  const showRejectButton =
    currentStatus !== "rejected" && currentStatus !== "locked";

  /*
   * Comments are only available after the section
   * has been rejected.
   */
  const showComments = currentStatus !== "rejected";

  const handleStatusUpdate = async (status: ReviewStatus) => {
    await updateStatus({
      status,
      ...(reviewComment.trim()
        ? {
            comment: reviewComment.trim(),
          }
        : {}),
    });

    setReviewComment("");
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER / REVIEW STATUS
      ===================================================== */}
      <section className="rounded-2xl border border-blue-100/60 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-blue-900/40 dark:bg-slate-900/50">
        <div className="flex flex-col gap-5">
          {/* Title + status */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>

              {description && (
                <p className="mt-1 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              )}
            </div>

            {/* Current status */}
            <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
              <StatusIcon className="h-4 w-4" />
              <span>{config.label}</span>
            </div>
          </div>

          {/* =====================================================
              REVIEW CONTROLS
          ===================================================== */}
          <div className="border-t border-blue-100/60 pt-4 dark:border-blue-900/40">
            <div className="mb-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Manager Review
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Record the outcome of your compliance review. This is important
                when rejecting a section, as it allows the applicant to
                understand what needs to be improved.
              </p>
            </div>

            {/* Review comment is only shown when the section is rejected */}
            {showComments && (
              <textarea
                value={reviewComment}
                onChange={(event) => setReviewComment(event.target.value)}
                placeholder="Add a review comment..."
                rows={3}
                disabled={isUpdatingStatus}
                className="w-full resize-none rounded-xl border border-blue-100 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-blue-900/50 dark:bg-slate-950/40 dark:text-white dark:focus:border-blue-600 dark:focus:ring-blue-950"
              />
            )}

            {/* Review actions */}
            <div className="mt-3 flex flex-wrap gap-3">
              {/* Mark In Progress */}
              {showInProgressButton && (
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleStatusUpdate("in_progress")}
                  className="rounded-xl border border-blue-200 bg-white/70 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-slate-950/40 dark:text-blue-300 dark:hover:bg-blue-950/40"
                >
                  Mark In Progress
                </button>
              )}

              {/* Approve Section */}
              {showApproveButton && (
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleStatusUpdate("approved")}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Approve Section
                </button>
              )}

              {/* Reject Section */}
              {showRejectButton && (
                <button
                  type="button"
                  disabled={isUpdatingStatus || reviewComment.trim() === ""}
                  onClick={() => handleStatusUpdate("rejected")}
                  className="rounded-xl border border-red-200 bg-red-50/70 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-950/40"
                >
                  Reject Section
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION CONTENT
      ===================================================== */}
      <div>{children}</div>

      {/* =====================================================
          COMMENTS
      ===================================================== */}
      {showComments && (
        <section className="rounded-2xl border border-blue-100/60 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-blue-900/40 dark:bg-slate-900/50">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Compliance Comments
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add notes, observations, or requests related to this compliance
              section.
            </p>
          </div>

          <RecruitmentSectionComments
            comments={comments}
            onAddComment={addComment}
            onUpdateComment={async (commentId, comment) => {
              await updateComment({
                commentId,
                comment,
              });
            }}
            onDeleteComment={deleteComment}
            isAdding={isAddingComment}
            updatingCommentId={updatingCommentId}
            deletingCommentId={deletingCommentId}
          />
        </section>
      )}
    </div>
  );
}
