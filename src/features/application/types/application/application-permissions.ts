/**
 * -----------------------------------------------------------------------------
 * File: application-permissions.ts
 *
 * Description:
 * Defines the actions an applicant can perform on a section.
 * These permissions are determined by the backend.
 * -----------------------------------------------------------------------------
 */

export interface ApplicationSectionPermissions {
  canView: boolean;
  canEdit: boolean;
  canSubmit: boolean;
}
