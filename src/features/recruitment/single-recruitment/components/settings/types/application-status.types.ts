export type ApplicationStage = "APPLICATION_FORM" | "INTERVIEW" | "COMPLIANCE";

export type ApplicationStatus = "IN_PROGRESS" | "APPROVED" | "REJECTED";

export interface ApplicationStatusResponse {
  id: string;
  previousStatus: ApplicationStatus | null;
  status: ApplicationStatus;
  previousStage: ApplicationStage | null;
  stage: ApplicationStage;
  reason: string | null;
  changedBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface UpdateApplicationStatusPayload {
  status?: ApplicationStatus;
  stage?: ApplicationStage;
  reason?: string;
}
