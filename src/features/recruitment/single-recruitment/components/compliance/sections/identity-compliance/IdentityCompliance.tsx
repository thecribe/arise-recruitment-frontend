/**
 * -----------------------------------------------------------------------------
 * File: IdentityCompliance.tsx
 *
 * Description:
 *
 * Identity Compliance section for the Recruitment Manager.
 *
 * The applicant provides the required identity information and supporting
 * documents. The Recruitment Manager reviews the submission and can approve
 * or reject the compliance section.
 *
 * There is no separate manager compliance form for this section.
 *
 * -----------------------------------------------------------------------------
 */

import ComplianceSectionReview from "../../ComplianceSectionReview";
import { useComplianceSection } from "../../hooks/useComplianceSection";

import IdentityComplianceForm from "./IdentityComplianceForm";

import { identityComplianceApplicantFields } from "./identity-compliance-applicant.fields";

export default function IdentityCompliance() {
  const { sectionValues, updateSection, isUpdatingSection } =
    useComplianceSection();
  return (
    <ComplianceSectionReview
      title="Identity Compliance"
      description="Review the identity information and supporting documents submitted by the applicant."
    >
      <IdentityComplianceForm
        formId="identity-compliance-applicant"
        title="Applicant Identity Information"
        description="Identity information and supporting documents provided by the applicant."
        fields={identityComplianceApplicantFields}
        values={sectionValues}
        isSaving={isUpdatingSection}
        onSave={updateSection}
      />
    </ComplianceSectionReview>
  );
}
