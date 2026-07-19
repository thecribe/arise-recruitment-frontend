/**
 * Represents the authenticated user returned by the backend.
 *
 * Extend this interface as your backend evolves.
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;

  /**
   * User's assigned role.
   * Example:
   * - Top Admin
   * - Recruitment Manager
   * - Applicant
   * - Staff
   */
  role: string;

  /**
   * Flat list of permissions assigned to the user.
   */
  permissions: string[];
}

/**
 * Response returned by GET /auth/me
 */
export interface AuthUserResponse {
  user: User;
}