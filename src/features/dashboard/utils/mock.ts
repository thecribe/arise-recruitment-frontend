import type { ApplicantSummary, ApplicationStage } from "../types/type";

export const applicationStages: ApplicationStage[] = [
  {
    id: "personal",
    title: "Personal Details",
    status: "completed",
    completedAt: "18 Jul 2026",
  },
  {
    id: "qualification",
    title: "Qualifications",
    status: "completed",
    completedAt: "18 Jul 2026",
  },
  {
    id: "employment",
    title: "Employment History",
    status: "completed",
    completedAt: "19 Jul 2026",
  },
  {
    id: "compliance",
    title: "Compliance",
    status: "current",
  },
  {
    id: "approval",
    title: "Final Approval",
    status: "upcoming",
  },
];

export const applicantSummary: ApplicantSummary = {
  id: "1",

  applicationNumber: "AIR-2026-00152",

  firstName: "Sarah",

  lastName: "Johnson",

  email: "sarah.johnson@email.com",

  jobRole: "Registered Nurse",

  currentStage: "Compliance",

  appliedDate: "18 July 2026",

  recruitmentManager: "Emma Wilson",
};
