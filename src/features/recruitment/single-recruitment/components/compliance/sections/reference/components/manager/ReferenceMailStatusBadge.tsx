import type { ReferenceMailStatus } from "@/features/recruitment/types/reference.types";

interface ReferenceMailStatusBadgeProps {
  status: ReferenceMailStatus;
}

const statusConfig: Record<
  ReferenceMailStatus,
  {
    label: string;
    className: string;
  }
> = {
  "Not sent": {
    label: "Not Sent",
    className:
      "border-slate-200/60 bg-slate-500/10 text-slate-700 dark:border-slate-400/20 dark:bg-slate-400/10 dark:text-slate-300",
  },

  Pending: {
    label: "Pending",
    className:
      "border-amber-200/60 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300",
  },

  Received: {
    label: "Received",
    className:
      "border-emerald-200/60 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  },

  Refused: {
    label: "Refused",
    className:
      "border-red-200/60 bg-red-500/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300",
  },
};

export function ReferenceMailStatusBadge({
  status,
}: ReferenceMailStatusBadgeProps) {
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
