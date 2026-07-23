import { Badge } from "@/components/ui/badge";
import { PHASE_STATUS } from "@/features/application/constants/phase-status";
import type { PhaseStatus } from "@/features/application/constants/phase-status";

interface StatusBadgeProps {
  status: PhaseStatus;
}

const variants = {
  [PHASE_STATUS.APPROVED]: "default",
  [PHASE_STATUS.IN_PROGRESS]: "secondary",
  [PHASE_STATUS.SUBMITTED]: "outline",
  [PHASE_STATUS.RETURNED]: "destructive",
  [PHASE_STATUS.LOCKED]: "secondary",
} as const;

const labels = {
  [PHASE_STATUS.APPROVED]: "Approved",
  [PHASE_STATUS.IN_PROGRESS]: "In Progress",
  [PHASE_STATUS.SUBMITTED]: "Submitted",
  [PHASE_STATUS.RETURNED]: "Returned",
  [PHASE_STATUS.LOCKED]: "Locked",
};

interface BadgeVariantMap {
  default: "default";
  secondary: "secondary";
  outline: "outline";
  destructive: "destructive";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

export default StatusBadge;
