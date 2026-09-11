import { useState } from "react";

import ComplianceSidebar from "./ComplianceSidebar";

import RightToWorkCompliance from "./sections/right-to-work/RightToWorkCompliance";
import DbsCompliance from "./sections/dbs/DbsCompliance";
import ProfessionalMemberships from "./sections/professional-membership/ProfessionalMemberships";
import ReferencesCompliance from "./sections/reference/ReferencesCompliance";
import TrainingCertificatesCompliance from "./sections/training/TrainingCertificatesCompliance";

import type { ComplianceSectionId } from "@/features/recruitment/types/compliance.types";
import ComplianceSectionProvider from "./ComplianceSectionProvider";
import IdentityCompliance from "./sections/identity-compliance/IdentityCompliance";

interface ComplianceRecruitmentPageProps {
  applicantId: string;
  applicationId: string;
}

export default function ComplianceRecruitmentPage({
  applicantId,
  applicationId,
}: ComplianceRecruitmentPageProps) {
  const [activeSection, setActiveSection] = useState<ComplianceSectionId>(
    "identity-compliance",
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-slate-900">Compliance</h2>

        <p className="mt-1 text-sm text-slate-600">
          Review, verify and manage applicant compliance.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <ComplianceSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="min-w-0 flex-1">
          <ComplianceSectionProvider
            applicationId={applicationId}
            applicantId={applicantId}
            sectionId={activeSection}
          >
            {activeSection === "right-to-work" && <RightToWorkCompliance />}

            {activeSection === "identity-compliance" && <IdentityCompliance />}

            {activeSection === "dbs" && <DbsCompliance />}

            {activeSection === "professional-memberships" && (
              <ProfessionalMemberships />
            )}
          </ComplianceSectionProvider>
          {activeSection === "references" && (
            <ReferencesCompliance
              applicationId={applicationId}
              applicantId={applicantId}
              sectionId={activeSection}
            />
          )}

          {activeSection === "certificates" && (
            <TrainingCertificatesCompliance />
          )}
        </main>
      </div>
    </div>
  );
}
