import type { ApplicationPhase } from "@/features/application/types";

export const declarationPhase: ApplicationPhase = {
  id: "phase-declaration",

  key: "declaration",

  title: "Declaration",

  description: "Review your application and submit your declaration.",

  order: 4,
};
