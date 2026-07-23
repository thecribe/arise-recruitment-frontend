import type { AdminDashboard } from "../types/admin-dashboard";

export const adminDashboardMock: AdminDashboard = {
  summary: {
    totalApplicants: 248,
    approvedStaff: 86,
    activeManagers: 6,
    pendingCompliance: 14,
  },

  pipeline: [
    {
      phase: "Personal Information",
      total: 52,
    },
    {
      phase: "Compliance",
      total: 41,
    },
    {
      phase: "Interview",
      total: 23,
    },
    {
      phase: "Offer",
      total: 12,
    },
    {
      phase: "Onboarding",
      total: 8,
    },
  ],
};
