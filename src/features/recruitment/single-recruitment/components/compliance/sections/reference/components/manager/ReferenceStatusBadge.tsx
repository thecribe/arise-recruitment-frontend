import type { ReferenceStatus } from "@/features/recruitment/types/reference.types";

interface ReferenceStatusBadgeProps {
  status: ReferenceStatus;
}

const statusConfig: Record<
  ReferenceStatus,
  {
    label: string;
    className: string;
  }
> = {
  in_progress: {
    label: "In Progress",
    className:
      "border-blue-200/60 bg-blue-500/10 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300",
  },

  submitted: {
    label: "Submitted",
    className:
      "border-sky-200/60 bg-sky-500/10 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300",
  },

  approved: {
    label: "Approved",
    className:
      "border-emerald-200/60 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  },

  rejected: {
    label: "Rejected",
    className:
      "border-red-200/60 bg-red-500/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300",
  },
};

export function ReferenceStatusBadge({ status }: ReferenceStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-full border",
        "px-2.5 py-1",
        "text-xs font-medium",
        "whitespace-nowrap",
        config.className,
      ].join(" ")}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {config.label}
    </span>
  );
}
