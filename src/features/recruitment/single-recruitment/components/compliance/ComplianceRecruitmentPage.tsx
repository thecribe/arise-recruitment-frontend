import { useState } from "react";

import ComplianceSidebar from "./ComplianceSidebar";

import RightToWorkCompliance from "./sections/right-to-work/RightToWorkCompliance";
import DbsCompliance from "./sections/dbs/DbsCompliance";
import ProfessionalMemberships from "./sections/professional-membership/ProfessionalMemberships";
import IdentityCompliance from "./sections/identity-compliance/IdentityCompliance";
import ManagerReferencesSection from "./sections/reference/ManagerReferencesSection";

import type { ComplianceSectionId } from "@/features/recruitment/types/compliance.types";

import ComplianceSectionProvider from "./ComplianceSectionProvider";
import TrainingCertificatesSection from "./sections/training/TrainingCertificatesSection";

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
    <div className="w-full min-w-0 space-y-6">
      {/* -----------------------------------------------------------------------
       * Header
       * ----------------------------------------------------------------------- */}
      <div
        className="
          w-full
          rounded-2xl
          border
          border-blue-200/50
          bg-white/40
          p-4
          shadow-xl
          shadow-blue-900/5
          backdrop-blur-xl
          sm:p-5
          lg:p-6
          dark:border-blue-400/20
          dark:bg-slate-900/30
        "
      >
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-slate-100">
          Compliance
        </h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Review, verify and manage applicant compliance.
        </p>
      </div>

      {/* -----------------------------------------------------------------------
       * Compliance workspace
       * ----------------------------------------------------------------------- */}
      <div
        className="
          flex
          min-w-0
          flex-col
          gap-4
          lg:flex-row
          lg:items-start
          lg:gap-6
        "
      >
        {/* ---------------------------------------------------------------------
         * Sidebar / Mobile Navigation
         * --------------------------------------------------------------------- */}
        <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="w-full min-w-0 lg:w-64 lg:shrink-0">
            <ComplianceSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------------
         * Main Content
         * --------------------------------------------------------------------- */}
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
            <ManagerReferencesSection applicationId={applicationId} />
          )}

          {activeSection === "certificates" && (
            <TrainingCertificatesSection
              applicationId={applicationId}
              sectionId={activeSection}
              canDelete={true}
              canEdit={true}
            />
          )}
        </main>
      </div>
    </div>
  );
}
