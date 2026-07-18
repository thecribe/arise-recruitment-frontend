/**
 * -----------------------------------------------------------------------------
 * File: routes.ts
 *
 * Description:
 * Defines every URL path used throughout the application.
 *
 * Responsibilities:
 * - Prevent hard-coded route strings
 * - Improve maintainability
 * - Provide IntelliSense
 * -----------------------------------------------------------------------------
 */

/**
 * Application route constants.
 */
export const ROUTES = {
  HOME: "/",

  LOGIN: "/login",

  DASHBOARD: "/dashboard",

  APPLICATION: "/application",

  RECRUITMENT: "/recruitment",

  COMPLIANCE: "/compliance",

  STAFF: "/staff",

  SETTINGS: "/settings",
} as const;