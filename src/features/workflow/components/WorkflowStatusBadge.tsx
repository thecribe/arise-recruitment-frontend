/**
 * -----------------------------------------------------------------------------
 * WorkflowStatusBadge.tsx
 * -----------------------------------------------------------------------------
 */

import { cn } from "@/lib/utils";
import type { WorkflowStatus } from "../types";

interface Props {
  status: WorkflowStatus;
}

const styles: Record<WorkflowStatus, string> = {
  approved: "bg-green-100 text-green-700",

  completed: "bg-blue-100 text-blue-700",

  in_progress: "bg-amber-100 text-amber-700",

  not_started: "bg-slate-100 text-slate-600",

  locked: "bg-slate-100 text-slate-400",

  rejected: "bg-red-100 text-red-700",
};

const labels: Record<WorkflowStatus, string> = {
  approved: "Approved",

  completed: "Completed",

  in_progress: "In Progress",

  not_started: "Not Started",

  locked: "Locked",

  rejected: "Rejected",
};

export default function WorkflowStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
