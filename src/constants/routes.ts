/**
 * -----------------------------------------------------------------------------
 * File: routes.ts
 * Description:
 * Centralised application route constants.
 *
 * Responsibilities:
 * - Prevent hardcoded URLs.
 * - Provide typed route paths.
 * - Used by router, sidebar, breadcrumbs and redirects.
 * -----------------------------------------------------------------------------
 */

export const ROUTES = {
  ROOT: "/",

  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_EMAIL_NOTICE: "/verify-email-notice",
    UNAUTHORIZED: "/unauthorized",
  },

  DASHBOARD: "/dashboard",

  APPLICATION: {
    ROOT: "/application",
    STAGE: "/application/:stage",
  },

  RECRUITMENT: {
    ROOT: "/recruitment",
    APPLICANT: "/recruitment/:id",
  },

  COMPLIANCE: {
    ROOT: "/compliance",
    STAFF: "/compliance/:staffId",
  },

  STAFF: {
    ROOT: "/staff",
    PROFILE: "/staff/:id",
  },

  SETTINGS: "/settings",

  PROFILE: "/profile",

  NOT_FOUND: "*",
} as const;
