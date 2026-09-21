import { createContext, useContext } from "react";

import type { ApplicantComplianceSection } from "../types/compliance.types";

import type { ApplicantComplianceSectionKey } from "../config/compliance-sections";
import type { FormField } from "@/components/forms/types/field";

export interface ComplianceSectionData {
  section: ApplicantComplianceSection;
  fields: FormField[];
  values: Record<string, unknown>;
  comment?: string | null;
}

export interface ApplicantComplianceFormContextValue {
  sections: ApplicantComplianceSection[];

  activeSectionId: ApplicantComplianceSectionKey | null;
  activeSection: ApplicantComplianceSection | null;

  fields: FormField[];
  values: Record<string, unknown>;
  comment: string | null;

  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;

  isSaving: boolean;
  isSubmitting: boolean;

  selectSection: (sectionId: ApplicantComplianceSectionKey) => void;
  retryActiveSection: () => Promise<void>;

  saveDraft: (values: Record<string, unknown>) => Promise<void>;
  submitSection: (values: Record<string, unknown>) => Promise<void>;
}

export const ApplicantComplianceFormContext =
  createContext<ApplicantComplianceFormContextValue | null>(null);

export function useApplicantComplianceForm() {
  const context = useContext(ApplicantComplianceFormContext);

  if (!context) {
    throw new Error(
      "useApplicantComplianceForm must be used inside ApplicantComplianceFormProvider.",
    );
  }

  return context;
}
