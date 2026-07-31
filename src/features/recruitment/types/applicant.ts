import type { ApplicantApplication } from "@/features/application/types";

export interface Applicant {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  postcode: string;

  jobRole: string;

  application: ApplicantApplication;

  createdAt: string;
  updatedAt: string;
}
