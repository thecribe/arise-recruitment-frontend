/**
 * -----------------------------------------------------------------------------
 * File: mock-permissions.ts
 * Description:
 * Mock permission sets used during frontend development.
 *
 * Responsibilities:
 * - Centralize permissions for mock users.
 * - Mirror the real backend permission model.
 * -----------------------------------------------------------------------------
 */

export const ADMIN_PERMISSIONS = ["*"];

export const APPLICANT_PERMISSIONS = ["application:view", "application:update"];

export const RECRUITMENT_MANAGER_PERMISSIONS = [
  "application:view",
  "application:approve",
  "recruitment:view",
  "compliance:view",
];

export const STAFF_MANAGER_PERMISSIONS = [
  "staff:view",
  "staff:update",
  "compliance:view",
];

import { env } from "@/config/env";
/**
 * -----------------------------------------------------------------------------
 * File: mock-users.ts
 * Description:
 * Mock authenticated users.
 *
 * Responsibilities:
 * - Simulate authenticated users.
 * - Allow easy role switching.
 * -----------------------------------------------------------------------------
 */

import type { AuthUser } from "../types/auth.types";
import { authApi } from "./auth.api";

export const mockUsers = {
  admin: {
    id: "1",
    firstName: "System",
    lastName: "Administrator",
    email: "admin@airse.test",
    role: "ADMIN",
    permissions: ADMIN_PERMISSIONS,
  } satisfies AuthUser,

  applicant: {
    id: "2",
    firstName: "John",
    lastName: "Applicant",
    email: "applicant@airse.test",
    role: "APPLICANT",
    permissions: APPLICANT_PERMISSIONS,
  } satisfies AuthUser,

  recruitmentManager: {
    id: "3",
    firstName: "Sarah",
    lastName: "Manager",
    email: "recruitment@airse.test",
    role: "RECRUITMENT_MANAGER",
    permissions: RECRUITMENT_MANAGER_PERMISSIONS,
  } satisfies AuthUser,

  staffManager: {
    id: "4",
    firstName: "David",
    lastName: "Staff",
    email: "staff@airse.test",
    role: "STAFF_MANAGER",
    permissions: STAFF_MANAGER_PERMISSIONS,
  } satisfies AuthUser,
};

/**
 * -----------------------------------------------------------------------------
 * File: auth.mock.ts
 * Description:
 * Mock authentication API.
 *
 * Responsibilities:
 * - Simulate backend authentication.
 * - Return mock users.
 * -----------------------------------------------------------------------------
 */

export const authMockApi = {
  async getCurrentUser() {
    await new Promise((resolve) => setTimeout(resolve, 400));

    // return mockUsers.recruitmentManager;
    return mockUsers.applicant;
    // return mockUsers.admin;
  },
};

export const authProvider = env.enableAuth ? authMockApi : authApi;
