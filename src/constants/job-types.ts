/**
 * -----------------------------------------------------------------------------
 * File: job-types.ts
 * Description:
 * Centralized list of job types available during applicant registration.
 * -----------------------------------------------------------------------------
 */

export interface JobTypeOption {
  label: string;
  value: string;
}

export const JOB_TYPES: JobTypeOption[] = [
  {
    label: "Registered Nurse",
    value: "registered_nurse",
  },
  {
    label: "Mental Health Nurse",
    value: "mental_health_nurse",
  },
  {
    label: "Learning Disability Nurse",
    value: "learning_disability_nurse",
  },
  {
    label: "Healthcare Assistant",
    value: "healthcare_assistant",
  },
  {
    label: "Support Worker",
    value: "support_worker",
  },
  {
    label: "Senior Carer",
    value: "senior_carer",
  },
];
