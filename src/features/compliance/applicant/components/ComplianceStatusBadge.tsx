import type { RecruitmentApplicationSectionStatus } from "../types/compliance.types";

interface ComplianceStatusBadgeProps {
  status: RecruitmentApplicationSectionStatus;
}

const statusConfig: Record<
  RecruitmentApplicationSectionStatus,
  { label: string; className: string }
> = {
  locked: {
    label: "Locked",
    className: "bg-slate-100 text-slate-600",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700",
  },
  submitted: {
    label: "Submitted",
    className: "bg-amber-100 text-amber-700",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-100 text-emerald-700",
  },
};

const ComplianceStatusBadge = ({ status }: ComplianceStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default ComplianceStatusBadge;
