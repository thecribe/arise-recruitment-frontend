/**
 * -----------------------------------------------------------------------------
 * File: roles.ts
 * Description:
 * Mock application roles.
 *
 * Mirrors the backend response until the API is connected.
 * -----------------------------------------------------------------------------
 */

export const ROLES = [
  {
    id: 1,
    name: "Applicant",
    code: "APPLICANT",
    description: "Applicant",
  },
  {
    id: 2,
    name: "Recruitment Manager",
    code: "RECRUITMENT_MANAGER",
    description: "Recruitment Manager",
  },
  {
    id: 3,
    name: "Compliance Manager",
    code: "COMPLIANCE_MANAGER",
    description: "Compliance Manager",
  },

  {
    id: 4,
    name: "Staff Manager",
    code: "STAFF_MANAGER",
    description: "Staff Manager",
  },
  {
    id: 5,
    name: "Administrator",
    code: "TOP_ADMIN",
    description: "Administrator",
  },
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_CODES = {
  APPLICANT: "APPLICANT",
  RECRUITMENT_MANAGER: "RECRUITMENT_MANAGER",
  COMPLIANCE_MANAGER:"COMPLIANCE_MANAGER",
  STAFF_MANAGER:"STAFF_MANAGER",
  TOP_ADMIN: "TOP_ADMIN",
} as const;

export const getRoleByCode = (code: string) =>
  ROLES.find((role) => role.code === code);

export const getRoleById = (id: number) => ROLES.find((role) => role.id === id);
