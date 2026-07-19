import { ROUTES } from "./routes";

export const RouteBuilder = {
  applicant: (id: string) => `/recruitment/${id}`,

  applicationStage: (stage: string) => `/application/${stage}`,

  staffProfile: (id: string) => `/staff/${id}`,

  compliance: (staffId: string) => `/compliance/${staffId}`,
} as const;
