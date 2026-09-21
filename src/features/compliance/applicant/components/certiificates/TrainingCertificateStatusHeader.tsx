import { FileCheck, Info } from "lucide-react";
import type { TrainingCertificateSectionStatus } from "../../types/training-certificate.types";

interface TrainingCertificateStatusHeaderProps {
  status: TrainingCertificateSectionStatus;
  comments?: {
    id: string;
    comment: string;
    createdAt: string;
  }[];
}

const statusConfig: Record<
  TrainingCertificateSectionStatus,
  {
    label: string;
    description: string;
    className: string;
  }
> = {
  locked: {
    label: "Locked",
    description: "This section is currently unavailable.",
    className: "bg-slate-500/15 text-slate-500",
  },
  in_progress: {
    label: "In Progress",
    description:
      "Complete your training certificates and submit them for review.",
    className: "bg-blue-500/15 text-blue-600",
  },
  submitted: {
    label: "Submitted",
    description: "Your training certificates have been submitted for review.",
    className: "bg-amber-500/15 text-amber-600",
  },
  approved: {
    label: "Approved",
    description: "Your training certificates have been approved.",
    className: "bg-emerald-500/15 text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    description:
      "Please review the recruiter comments and make the necessary changes.",
    className: "bg-red-500/15 text-red-600",
  },
};

const formatCommentDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export const TrainingCertificateStatusHeader = ({
  status,
  comments = [],
}: TrainingCertificateStatusHeaderProps) => {
  const config = statusConfig[status];

  return (
    <section className="rounded-2xl border border-white/20 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:bg-slate-900/50 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
            <FileCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Training Certificates
            </h2>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {config.description}
            </p>
          </div>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
        >
          {config.label}
        </span>
      </div>

      {comments.length > 0 && (
        <div className="mt-5 space-y-3 border-t border-slate-200/70 pt-4 dark:border-slate-700/70">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            <Info className="h-4 w-4 text-blue-500" />
            Recruiter Comments
          </div>

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 dark:border-blue-900/50 dark:bg-blue-950/30"
            >
              <p className="text-sm text-slate-700 dark:text-slate-200">
                {comment.comment}
              </p>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {formatCommentDate(comment.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrainingCertificateStatusHeader;
