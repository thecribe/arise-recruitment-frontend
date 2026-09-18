/**
 * -----------------------------------------------------------------------------
 * File: TrainingCertificateStatus.tsx
 *
 * Description:
 * Displays and manages the Recruitment Manager review status for the
 * Training Certificates section.
 *
 * Responsibilities:
 * - Fetch current section status
 * - Display current status
 * - Approve the Training Certificates section
 * - Reject the Training Certificates section
 * - Reopen approved sections
 * - Handle confirmation before status changes
 * - Handle loading and mutation states
 *
 * The component only requires:
 * - applicationId
 * - sectionId
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import {
  CheckCircle2,
  Clock3,
  Loader2,
  RotateCcw,
  XCircle,
} from "lucide-react";

import type { TrainingCertificateSectionStatus } from "../types/training-certificate.types";

import {
  useTrainingCertificateSectionStatus,
  useUpdateTrainingCertificateSectionStatus,
} from "../../../hooks/training-certificates.hooks";

interface TrainingCertificateStatusProps {
  applicationId: string;
  sectionId: string;
}

type PendingStatus = "approved" | "rejected" | "in_progress" | null;

const statusConfig: Record<
  TrainingCertificateSectionStatus,
  {
    label: string;
    description: string;
    icon: typeof Clock3;
    className: string;
  }
> = {
  locked: {
    label: "Locked",
    description: "This section is not currently available for review.",
    icon: Clock3,
    className:
      "border-slate-200 bg-slate-50/70 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
  },

  in_progress: {
    label: "In Progress",
    description: "The applicant is still completing this section.",
    icon: Clock3,
    className:
      "border-blue-200 bg-blue-50/70 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400",
  },

  submitted: {
    label: "Submitted",
    description: "The training certificates are ready for manager review.",
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50/70 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400",
  },

  approved: {
    label: "Approved",
    description: "The Training Certificates section has been approved.",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50/70 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  },

  rejected: {
    label: "Rejected",
    description: "The Training Certificates section has been rejected.",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50/70 text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400",
  },
};

const TrainingCertificateStatus = ({
  applicationId,
  sectionId,
}: TrainingCertificateStatusProps) => {
  const [pendingStatus, setPendingStatus] = useState<PendingStatus>(null);

  const { data, isLoading, isError, refetch } =
    useTrainingCertificateSectionStatus(applicationId, sectionId);

  const updateStatus = useUpdateTrainingCertificateSectionStatus(
    applicationId,
    sectionId,
  );

  const status = data?.status ?? "in_progress";

  const config = statusConfig[status];

  const StatusIcon = config.icon;

  const handleStatusChange = async () => {
    if (!pendingStatus) {
      return;
    }

    try {
      await updateStatus.mutateAsync(pendingStatus);

      setPendingStatus(null);
    } catch {
      // Global mutation/error handling handles the error.
    }
  };

  const getConfirmationTitle = () => {
    switch (pendingStatus) {
      case "approved":
        return "Approve Training Certificates?";

      case "rejected":
        return "Reject Training Certificates?";

      case "in_progress":
        return "Reopen Training Certificates?";

      default:
        return "";
    }
  };

  const getConfirmationDescription = () => {
    switch (pendingStatus) {
      case "approved":
        return "This will mark the Training Certificates section as approved.";

      case "rejected":
        return "This will mark the Training Certificates section as rejected. Make sure any required feedback has been added.";

      case "in_progress":
        return "This will move the Training Certificates section back to in progress so it can be reviewed again.";

      default:
        return "";
    }
  };

  const getConfirmationButtonLabel = () => {
    if (updateStatus.isPending) {
      return "Updating...";
    }

    switch (pendingStatus) {
      case "approved":
        return "Approve";

      case "rejected":
        return "Reject";

      case "in_progress":
        return "Reopen";

      default:
        return "Confirm";
    }
  };

  const getConfirmationButtonClassName = () => {
    switch (pendingStatus) {
      case "rejected":
        return "bg-red-600 hover:bg-red-700";

      case "in_progress":
        return "bg-blue-600 hover:bg-blue-700";

      case "approved":
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-blue-200/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl dark:border-blue-900/40 dark:bg-slate-950/30">
        <div className="flex min-h-24 items-center justify-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Loading training certificate status...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200/70 bg-red-50/50 p-5 backdrop-blur-xl dark:border-red-900/40 dark:bg-red-950/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              Unable to load section status.
            </p>

            <p className="mt-1 text-xs text-red-600 dark:text-red-500">
              Please try again.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white/70 px-3 text-sm font-medium text-red-700 transition hover:bg-white dark:border-red-900/50 dark:bg-slate-900/50 dark:text-red-400"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-blue-200/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl dark:border-blue-900/40 dark:bg-slate-950/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${config.className}`}
            >
              <StatusIcon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Training Certificate Review
                </h3>

                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
                >
                  {config.label}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {config.description}
              </p>
            </div>
          </div>

          {status !== "locked" && (
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              {status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => setPendingStatus("rejected")}
                  disabled={updateStatus.isPending}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/70 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              )}

              {status !== "approved" && (
                <button
                  type="button"
                  onClick={() => setPendingStatus("approved")}
                  disabled={updateStatus.isPending}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </button>
              )}

              {status === "approved" && (
                <button
                  type="button"
                  onClick={() => setPendingStatus("in_progress")}
                  disabled={updateStatus.isPending}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-400"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reopen
                </button>
              )}

              {status === "rejected" && (
                <button
                  type="button"
                  onClick={() => setPendingStatus("in_progress")}
                  disabled={updateStatus.isPending}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-400"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reopen
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {pendingStatus && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-blue-200/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-blue-900/40 dark:bg-slate-950/95">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  pendingStatus === "approved"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    : pendingStatus === "rejected"
                      ? "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                }`}
              >
                {pendingStatus === "approved" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : pendingStatus === "rejected" ? (
                  <XCircle className="h-5 w-5" />
                ) : (
                  <RotateCcw className="h-5 w-5" />
                )}
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {getConfirmationTitle()}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {getConfirmationDescription()}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingStatus(null)}
                disabled={updateStatus.isPending}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-4 text-sm font-medium text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStatusChange}
                disabled={updateStatus.isPending}
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${getConfirmationButtonClassName()}`}
              >
                {updateStatus.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {getConfirmationButtonLabel()}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingCertificateStatus;
