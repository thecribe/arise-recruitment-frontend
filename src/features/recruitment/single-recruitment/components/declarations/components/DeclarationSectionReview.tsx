import type { PropsWithChildren } from "react";
import { CheckCircle2, CircleAlert, Clock3, XCircle } from "lucide-react";
import type { ApplicationSectionStatus } from "@/features/compliance/applicant/components/declarations/application-section-status";
import {
  useApplicationSectionStatus,
  useUpdateApplicationSectionStatus,
} from "../hooks/useApplicantDeclarations";

const DECLARATIONS_SECTION_ID = "declarations";

const statusConfig: Record<
  ApplicationSectionStatus,
  {
    label: string;
    icon: typeof Clock3;
  }
> = {
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
};

interface DeclarationSectionReviewProps extends PropsWithChildren {
  applicationId: string;
}

export default function DeclarationSectionReview({
  applicationId,
  children,
}: DeclarationSectionReviewProps) {
  const { data: statusData, isLoading } = useApplicationSectionStatus(
    applicationId,
    DECLARATIONS_SECTION_ID,
  );

  const updateStatus = useUpdateApplicationSectionStatus();

  const currentStatus: ApplicationSectionStatus =
    statusData?.status ?? "locked";

  const config = statusConfig[currentStatus];
  const StatusIcon = config.icon;

  const handleStatusUpdate = async (status: ApplicationSectionStatus) => {
    await updateStatus.mutateAsync({
      applicationId,
      sectionId: DECLARATIONS_SECTION_ID,
      status,
    });
  };

  const showInProgressButton = currentStatus !== "in_progress";

  const showApproveButton =
    currentStatus !== "approved" && currentStatus !== "locked";

  const showRejectButton =
    currentStatus !== "rejected" && currentStatus !== "locked";

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-blue-100/60 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-blue-900/40 dark:bg-slate-900/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Declarations Review
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Manage the application status for the declarations section.
            </p>
          </div>

          <div
            className={[
              "inline-flex w-fit shrink-0 items-center gap-2 rounded-full",
              "border border-blue-100 bg-blue-50/80 px-3 py-1.5",
              "text-sm font-medium text-blue-700",
              "dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300",
            ].join(" ")}
          >
            <StatusIcon className="h-4 w-4" />

            <span>{isLoading ? "Loading..." : config.label}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {showInProgressButton && (
            <button
              type="button"
              disabled={isLoading || updateStatus.isPending}
              onClick={() => handleStatusUpdate("in_progress")}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
            >
              <Clock3 className="h-4 w-4" />
              Mark In Progress
            </button>
          )}

          {showApproveButton && (
            <button
              type="button"
              disabled={isLoading || updateStatus.isPending}
              onClick={() => handleStatusUpdate("approved")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve Section
            </button>
          )}

          {showRejectButton && (
            <button
              type="button"
              disabled={isLoading || updateStatus.isPending}
              onClick={() => handleStatusUpdate("rejected")}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
            >
              <XCircle className="h-4 w-4" />
              Reject Section
            </button>
          )}
        </div>
      </section>

      {children}
    </div>
  );
}
