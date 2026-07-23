import type { ManagerDashboard } from "../types/manager-dashboard";

export const managerDashboardMock: ManagerDashboard = {
  summary: {
    pendingReviews: 18,
    returnedPhases: 4,
    approvedToday: 9,
    activeApplicants: 126,
  },

  phaseQueue: [
    {
      id: "personal",
      title: "Personal Information",
      pending: 8,
    },
    {
      id: "compliance",
      title: "Compliance",
      pending: 6,
    },
    {
      id: "interview",
      title: "Interview",
      pending: 3,
    },
    {
      id: "offer",
      title: "Offer",
      pending: 1,
    },
  ],

  recentActivities: [
    {
      id: "1",
      applicantName: "John Smith",
      applicantId: "1",
      phase: "Compliance",
      action: "Submitted",
      createdAt: "10 mins ago",
    },
    {
      id: "2",
      applicantName: "Sarah Johnson",
      applicantId: "2",
      phase: "Interview",
      action: "Approved",
      createdAt: "30 mins ago",
    },
    {
      id: "3",
      applicantName: "Michael Brown",
      applicantId: "3",
      phase: "Personal Information",
      action: "Returned",
      createdAt: "1 hour ago",
    },
  ],
};
