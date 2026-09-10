import { createContext } from "react";

import type { RecruitmentSectionComment } from "@/features/recruitment/types/recruitment.types";

import type { ComplianceSectionReviewStatus } from "../hooks/useComplianceSectionStatus";
import type { ComplianceFormValues } from "@/features/recruitment/types/compliance.types";

export interface ComplianceSectionContextValue {
  applicationId: string;
  applicantId: string;
  sectionId: string;

  // -------------------------------------------------------------------------
  // Applicant compliance
  // -------------------------------------------------------------------------

  sectionValues: ComplianceFormValues;

  updateSection: (values: unknown) => Promise<unknown>;

  isUpdatingSection: boolean;
  updateSectionError: unknown;

  // -------------------------------------------------------------------------
  // Manager compliance
  // -------------------------------------------------------------------------

  managerSectionValues: ComplianceFormValues;

  updateManagerSection: (values: unknown) => Promise<unknown>;

  isUpdatingManagerSection: boolean;
  updateManagerSectionError: unknown;

  // -------------------------------------------------------------------------
  // Comments
  // -------------------------------------------------------------------------

  comments: RecruitmentSectionComment[];

  addComment: (comment: string) => Promise<void> | void;

  updateComment: (payload: {
    commentId: string;
    comment: string;
  }) => Promise<unknown>;

  deleteComment: (comment: string) => Promise<void> | void;

  isAddingComment: boolean;
  updatingCommentId: string | null;
  deletingCommentId: string | null;

  // -------------------------------------------------------------------------
  // Section status
  // -------------------------------------------------------------------------

  progress:
    | "locked"
    | "in_progress"
    | "submitted"
    | "approved"
    | "rejected"
    | undefined;

  updateStatus: (payload: {
    status: ComplianceSectionReviewStatus;
    comment?: string;
  }) => Promise<unknown>;

  isUpdatingStatus: boolean;
  updateStatusError: unknown;

  // -------------------------------------------------------------------------
  // Request state
  // -------------------------------------------------------------------------

  isLoading: boolean;
  isError: boolean;
  error: unknown;

  refetch: () => Promise<void>;
}

export const ComplianceSectionContext =
  createContext<ComplianceSectionContextValue | null>(null);
