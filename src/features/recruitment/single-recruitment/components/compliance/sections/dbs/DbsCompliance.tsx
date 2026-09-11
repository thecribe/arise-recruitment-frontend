/**
 * -----------------------------------------------------------------------------
 * File: DbsCompliance.tsx
 *
 * Description:
 *
 * DBS Update Check compliance section.
 *
 * The applicant provides their DBS information and disclosure document.
 * The Recruitment Manager provides the DBS Update Check and expiry date.
 *
 * -----------------------------------------------------------------------------
 */

import ComplianceSectionReview from "../../ComplianceSectionReview";
import { useComplianceSection } from "../../hooks/useComplianceSection";

import DbsComplianceForm from "./DbsComplianceForm";
import DbsComplianceStatus from "./DbsComplianceStatus";

import { dbsApplicantFields } from "./dbs-applicant.fields";

import { dbsManagerFields } from "./dbs-manager.fields";

export default function DbsCompliance() {
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
      title="DBS Update Check"
      description="Review the applicant's DBS information and complete the required DBS update check."
    >
      <div className="space-y-6">
        <DbsComplianceForm
          formId="dbs-applicant"
          title="Applicant DBS Information"
          description="DBS information and disclosure document submitted by the applicant."
          fields={dbsApplicantFields}
          values={sectionValues}
          canEdit={true}
          isSaving={isUpdatingSection}
          onSave={updateSection}
        />
        <DbsComplianceStatus values={managerSectionValues} />
        <DbsComplianceForm
          formId="dbs-manager"
          title="DBS Compliance Check"
          description="DBS update check completed by the Recruitment Manager."
          fields={dbsManagerFields}
          values={managerSectionValues}
          canEdit={true}
          isSaving={isUpdatingManagerSection}
          onSave={updateManagerSection}
        />
      </div>
    </ComplianceSectionReview>
  );
}
