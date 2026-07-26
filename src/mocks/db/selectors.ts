/**
 * -----------------------------------------------------------------------------
 * File: selectors.ts
 *
 * Description:
 * Shared selectors for the mock database.
 * -----------------------------------------------------------------------------
 */

import type { MockDatabase } from "./types";

export const selectUsers = (db: MockDatabase) => db.users;

export const selectApplicationDefinition = (db: MockDatabase) =>
  db.applicationDefinition;

export const selectApplicantApplications = (db: MockDatabase) =>
  db.applicantApplications;

export const selectApplicantSectionRecords = (db: MockDatabase) =>
  db.applicantSectionRecords;

export const selectRecruitmentReviews = (db: MockDatabase) =>
  db.recruitmentReviews;

export const selectComplianceDocuments = (db: MockDatabase) =>
  db.complianceDocuments;

export const selectStaff = (db: MockDatabase) => db.staff;

export const selectSettings = (db: MockDatabase) => db.settings;

export const selectAuditLogs = (db: MockDatabase) => db.auditLogs;
