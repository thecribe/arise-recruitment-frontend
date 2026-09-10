/**
 * -----------------------------------------------------------------------------
 * File: ProfessionalMemberships.tsx
 *
 * Description:
 *
 * Professional Memberships compliance section.
 *
 * The applicant provides their professional membership information and
 * supporting membership card. The Recruitment Manager reviews the submission
 * and approves or rejects the section.
 *
 * There is no separate manager compliance form for this section.
 *
 * -----------------------------------------------------------------------------
 */

import ComplianceSectionReview from "../../ComplianceSectionReview";
import { useComplianceSection } from "../../hooks/useComplianceSection";

import ProfessionalMembershipsForm from "./ProfessionalMembershipsForm";

import { professionalMembershipFields } from "./professional-memberships.fields";

export default function ProfessionalMemberships() {
  const { sectionValues, updateSection, isUpdatingSection } =
    useComplianceSection();

  return (
    <ComplianceSectionReview
      title="Professional Memberships"
      description="Review the professional membership information and supporting membership card submitted by the applicant."
    >
      <ProfessionalMembershipsForm
        formId="professional-memberships"
        title="Professional Membership Information"
        description="Professional membership details provided by the applicant."
        fields={professionalMembershipFields}
        values={sectionValues}
        canEdit={false}
        isSaving={isUpdatingSection}
        onSave={updateSection}
      />
    </ComplianceSectionReview>
  );
}
