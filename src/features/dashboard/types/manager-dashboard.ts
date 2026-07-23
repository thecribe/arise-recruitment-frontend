export interface ManagerSummary {
  pendingReviews: number;
  returnedPhases: number;
  approvedToday: number;
  activeApplicants: number;
}

export interface ManagerPhaseQueue {
  id: string;
  title: string;
  pending: number;
}

export interface ManagerActivity {
  id: string;
  applicantName: string;
  applicantId: string;
  phase: string;
  action: string;
  createdAt: string;
}

export interface ManagerDashboard {
  summary: ManagerSummary;

  phaseQueue: ManagerPhaseQueue[];

  recentActivities: ManagerActivity[];
}
