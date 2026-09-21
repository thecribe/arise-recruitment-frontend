import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  useApplicantComplianceSection,
  useApplicantComplianceSections,
  useSaveApplicantComplianceDraft,
  useSubmitApplicantComplianceSection,
} from "../hooks/useApplicantCompliance";

import {
  APPLICANT_COMPLIANCE_SECTIONS,
  type ApplicantComplianceSectionKey,
} from "../config/compliance-sections";

import {
  ApplicantComplianceFormContext,
  type ComplianceSectionData,
} from "./ApplicantComplianceFormContext";

import type { ApplicantComplianceSection } from "../types/compliance.types";
import type { FormField } from "@/components/forms/types/field";

interface ApplicantComplianceFormProviderProps {
  children: ReactNode;

  /**
   * Resolve frontend field definitions for a section.
   */
  getFields?: (sectionId: ApplicantComplianceSectionKey) => FormField[];
}

const DEFAULT_SECTION_ID = APPLICANT_COMPLIANCE_SECTIONS[0]?.key ?? null;

export default function ApplicantComplianceFormProvider({
  children,
  getFields,
}: ApplicantComplianceFormProviderProps) {
  const [activeSectionId, setActiveSectionId] =
    useState<ApplicantComplianceSectionKey | null>(DEFAULT_SECTION_ID);

  const [sectionData, setSectionData] = useState<ComplianceSectionData | null>(
    null,
  );

  const {
    data: sections = [],
    isLoading: isLoadingSections,
    isFetching: isFetchingSections,
    error: sectionsError,
    refetch: refetchSections,
  } = useApplicantComplianceSections();

  const {
    data: selectedSectionData,
    isLoading: isLoadingSection,
    isFetching: isFetchingSection,
    error: sectionError,
    refetch: refetchSection,
  } = useApplicantComplianceSection(activeSectionId);

  const saveDraftMutation = useSaveApplicantComplianceDraft();

  const submitSectionMutation = useSubmitApplicantComplianceSection();

  /**
   * Find the active section status.
   */
  const activeSection = useMemo(() => {
    if (!activeSectionId) {
      return null;
    }

    return (
      sections.find((section) => section.section_id === activeSectionId) ?? null
    );
  }, [activeSectionId, sections]);

  /**
   * Convert API section data into provider data.
   */
  useEffect(() => {
    if (!selectedSectionData || !activeSectionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSectionData(null);
      return;
    }

    const fields = getFields?.(activeSectionId) ?? [];

    setSectionData({
      section: selectedSectionData.section,
      fields,
      values: selectedSectionData.values ?? {},
      comment: selectedSectionData.comments?.[0]?.comment ?? null,
    });
  }, [selectedSectionData, activeSectionId, getFields]);

  /**
   * Select a compliance section.
   */
  const selectSection = useCallback(
    (sectionId: ApplicantComplianceSectionKey) => {
      if (sectionId === activeSectionId) {
        return;
      }

      setSectionData(null);
      setActiveSectionId(sectionId);
    },
    [activeSectionId],
  );

  /**
   * Retry the active section request.
   */
  const retryActiveSection = useCallback(async () => {
    await refetchSection();
  }, [refetchSection]);

  /**
   * Save a section draft.
   */
  const saveDraft = useCallback(
    async (values: Record<string, unknown>) => {
      if (!activeSectionId) {
        return;
      }

      await saveDraftMutation.mutateAsync({
        sectionId: activeSectionId,
        values,
      });

      setSectionData((current) =>
        current
          ? {
              ...current,
              values,
            }
          : current,
      );
    },
    [activeSectionId, saveDraftMutation],
  );

  /**
   * Submit a section.
   */
  const submitSection = useCallback(
    async (values: Record<string, unknown>) => {
      if (!activeSectionId) {
        return;
      }

      await submitSectionMutation.mutateAsync({
        sectionId: activeSectionId,
        values,
      });

      await refetchSections();
      await refetchSection();
    },
    [activeSectionId, submitSectionMutation, refetchSections, refetchSection],
  );

  const fields = sectionData?.fields ?? [];
  const values = sectionData?.values ?? {};
  const comment = sectionData?.comment ?? null;

  const isLoading = isLoadingSections || isLoadingSection;

  const isFetching = isFetchingSections || isFetchingSection;

  const error = sectionsError ?? sectionError ?? null;

  const contextValue = useMemo(
    () => ({
      sections: sections as ApplicantComplianceSection[],
      activeSectionId,
      activeSection,
      fields,
      values,
      comment,
      isLoading,
      isFetching,
      error,
      isSaving: saveDraftMutation.isPending,
      isSubmitting: submitSectionMutation.isPending,
      selectSection,
      retryActiveSection,
      saveDraft,
      submitSection,
    }),
    [
      sections,
      activeSectionId,
      activeSection,
      fields,
      values,
      comment,
      isLoading,
      isFetching,
      error,
      saveDraftMutation.isPending,
      submitSectionMutation.isPending,
      selectSection,
      retryActiveSection,
      saveDraft,
      submitSection,
    ],
  );

  return (
    <ApplicantComplianceFormContext.Provider value={contextValue}>
      {children}
    </ApplicantComplianceFormContext.Provider>
  );
}
