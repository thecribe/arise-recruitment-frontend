import useComplianceSectionData from "./useComplianceSectionData";
import useComplianceComments from "./useComplianceComments";
import useComplianceSectionStatus from "./useComplianceSectionStatus";
import useUpdateComplianceSectionData from "./useUpdateComplianceSectionData";
import useUpdateComplianceManagerSection from "./useUpdateComplianceManagerSection";

interface UseComplianceSectionValuesProps {
  applicationId: string;
  applicantId: string;
  sectionId: string;
}

export function useComplianceSectionValues({
  applicationId,
  applicantId,
  sectionId,
}: UseComplianceSectionValuesProps) {
  const sectionData = useComplianceSectionData(applicationId, sectionId);

  const comments = useComplianceComments({
    applicationId,
    sectionId,
  });

  const status = useComplianceSectionStatus({
    applicationId,
    sectionId,
  });

  const updateSection = useUpdateComplianceSectionData({
    applicationId,
    sectionId,
  });

  const updateManagerSection = useUpdateComplianceManagerSection({
    applicationId,
    sectionId,
  });

  const data = sectionData.data;

  return {
    applicationId,
    applicantId,
    sectionId,

    // -----------------------------------------------------------------------
    // Applicant
    // -----------------------------------------------------------------------

    sectionValues: data?.applicant?.values ?? {},

    updateSection: updateSection.updateSection,

    isUpdatingSection: updateSection.isUpdatingSection,

    updateSectionError: updateSection.updateSectionError,

    // -----------------------------------------------------------------------
    // Manager
    // -----------------------------------------------------------------------

    managerSectionValues: data?.manager?.values ?? {},

    updateManagerSection: updateManagerSection.updateManagerSection,

    isUpdatingManagerSection: updateManagerSection.isUpdatingManagerSection,

    updateManagerSectionError: updateManagerSection.updateManagerSectionError,

    // -----------------------------------------------------------------------
    // Comments
    // -----------------------------------------------------------------------

    comments: data?.comments ?? [],

    addComment: comments.addComment,

    updateComment: comments.updateComment,

    deleteComment: comments.deleteComment,

    isAddingComment: comments.isAddingComment,

    updatingCommentId: comments.updatingCommentId,

    deletingCommentId: comments.deletingCommentId,

    // -----------------------------------------------------------------------
    // Progress
    // -----------------------------------------------------------------------

    progress: data?.progress,

    // -----------------------------------------------------------------------
    // Status
    // -----------------------------------------------------------------------

    updateStatus: status.updateStatus,

    isUpdatingStatus: status.isUpdatingStatus,

    updateStatusError: status.updateStatusError,

    // -----------------------------------------------------------------------
    // Query state
    // -----------------------------------------------------------------------

    isLoading: sectionData.isLoading,

    isError: sectionData.isError,

    error: sectionData.error,

    // -----------------------------------------------------------------------
    // Refresh
    // -----------------------------------------------------------------------

    refetch: async () => {
      await sectionData.refetch();
    },
  };
}

export default useComplianceSectionValues;
