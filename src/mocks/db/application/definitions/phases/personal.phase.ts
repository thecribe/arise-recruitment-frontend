import type { ApplicationPhase } from "@/features/application/types";

export const personalPhase: ApplicationPhase = {
  id: "phase-personal",

  key: "personal",

  title: "Personal Information",

  description:
    "Provide your personal details, contact information, education and employment history.",

  order: 1,
};
