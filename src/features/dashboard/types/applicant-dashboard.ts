import type { PhaseStatus } from "@/features/application/constants/phase-status";


export interface DashboardFeedback {
  author: string;
  message: string;
  createdAt: string;
}

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

 
}
