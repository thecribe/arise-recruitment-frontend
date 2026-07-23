export interface AdminSummary {
  totalApplicants: number;
  approvedStaff: number;
  activeManagers: number;
  pendingCompliance: number;
}

export interface RecruitmentPipelineType {
  phase: string;
  total: number;
}

export interface AdminDashboard {
  summary: AdminSummary;
  pipeline: RecruitmentPipelineType[];
}
