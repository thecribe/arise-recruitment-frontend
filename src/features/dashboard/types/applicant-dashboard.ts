import type { PhaseStatus } from "@/features/application/constants/phase-status";
import type { DashboardAction, DashboardFeedback } from "./dashboard";

export interface ApplicantDashboardPhase {
  id: string;
  title: string;
  description?: string;
  status: PhaseStatus;
  completedAt?: string;
}

export interface ApplicantDashboard {
  overallProgress: number;

  currentPhase: ApplicantDashboardPhase;

  latestFeedback?: DashboardFeedback;

  phases: ApplicantDashboardPhase[];

  nextAction: DashboardAction;
}
