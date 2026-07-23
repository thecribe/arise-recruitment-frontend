import { PHASE_STATUS } from "@/features/application/constants/phase-status";
import type { ApplicantDashboard } from "../types/applicant-dashboard";

export const applicantDashboardMock: ApplicantDashboard = {
  overallProgress: 25,

  currentPhase: {
    id: "personal-information",
    title: "Personal Information",
    description: "Complete your personal information before proceeding.",
    status: PHASE_STATUS.IN_PROGRESS,
  },

  latestFeedback: {
    author: "Recruitment Manager",
    message:
      "Welcome! Complete your Personal Information phase and submit it for review.",
    createdAt: "2026-07-20T09:30:00Z",
  },

  phases: [
    {
      id: "personal-information",
      title: "Personal Information",
      description: "Personal details, address, employment and references.",
      status: PHASE_STATUS.IN_PROGRESS,
    },
    {
      id: "compliance",
      title: "Compliance",
      description: "Upload required compliance documents.",
      status: PHASE_STATUS.LOCKED,
    },
    {
      id: "interview",
      title: "Interview",
      description: "Interview and assessment.",
      status: PHASE_STATUS.LOCKED,
    },
    {
      id: "offer",
      title: "Offer",
      description: "Offer and acceptance.",
      status: PHASE_STATUS.LOCKED,
    },
    {
      id: "onboarding",
      title: "Onboarding",
      description: "Complete onboarding as a new staff member.",
      status: PHASE_STATUS.LOCKED,
    },
  ],

  nextAction: {
    label: "Continue Application",
    route: "/application?phase=personal-information",
    disabled: false,
  },
};
