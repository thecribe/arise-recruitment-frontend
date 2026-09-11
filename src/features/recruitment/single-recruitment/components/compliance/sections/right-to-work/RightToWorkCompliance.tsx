import ComplianceSectionReview from "../../ComplianceSectionReview";
import { useComplianceSection } from "../../hooks/useComplianceSection";

import RightToWorkComplianceForm from "./RightToWorkComplianceForm";
import RightToWorkReviewStatus from "./RightToWorkReviewStatus";
import { rightToWorkApplicantFields } from "./right-to-work-applicant.fields";
import { rightToWorkManagerFields } from "./right-to-work-manager.fields";

export default function RightToWorkCompliance() {
  const {
    sectionValues,
    managerSectionValues,
    updateSection,
    updateManagerSection,
    isUpdatingSection,
    isUpdatingManagerSection,
  } = useComplianceSection();

  return (
    <ComplianceSectionReview
      title="Right to Work Compliance"
      description="Review the applicant's Right to Work information and supporting compliance checks."
    >
      <div className="space-y-6">
        <RightToWorkComplianceForm
          formId="right-to-work-applicant"
          title="Applicant Right to Work Information"
          description="Right to Work information provided as part of the applicant's recruitment application."
          fields={rightToWorkApplicantFields}
          values={sectionValues}
          isSaving={isUpdatingSection}
          onSave={updateSection}
        />
        <RightToWorkReviewStatus values={managerSectionValues} />
        <RightToWorkComplianceForm
          formId="right-to-work-manager"
          title="Right to Work Compliance Check"
          description="Compliance checks and supporting documents completed by the Recruitment Manager."
          fields={rightToWorkManagerFields}
          values={managerSectionValues}
          isSaving={isUpdatingManagerSection}
          onSave={updateManagerSection}
        />
      </div>
    </ComplianceSectionReview>
  );
}
