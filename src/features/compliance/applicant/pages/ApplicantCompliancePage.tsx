import { ShieldCheck } from "lucide-react";
import { useState } from "react";

import type { ApplicantComplianceTab } from "../types/compliance.types";
import ApplicantComplianceTabs from "../components/ApplicantComplianceTabs";
import ComplianceFormsTab from "../components/ComplianceFormsTab";
import ReferencesTab from "../components/reference/ReferencesTab";
import TrainingCertificatesTab from "../components/certiificates/TrainingCertificatesTab";

const ApplicantCompliancePage = () => {
  const [activeTab, setActiveTab] =
    useState<ApplicantComplianceTab>("compliance-forms");

  return (
    <div className="w-full space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Page Header                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="
          rounded-3xl
          border border-white/20
          bg-white/70
          px-5
          py-4
          shadow-lg
          backdrop-blur-xl
          sm:px-6
          sm:py-5
        "
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Compliance Information */}
          <div className="flex min-w-0 items-start gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/15
                text-blue-600
              "
            >
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Applicant Portal
              </p>

              <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Compliance Centre
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Complete your compliance requirements for recruitment review.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                  Compliance
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  Applicant
                </span>
              </div>
            </div>
          </div>

          {/* Security Indicator */}
          {/* <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-white/40
              px-4
              py-3
              sm:min-w-[180px]
              sm:flex-col
              sm:items-end
              sm:bg-transparent
              sm:p-0
            "
          >
            <span className="text-sm text-slate-500">Compliance Status</span>

            <span className="text-base font-bold text-blue-700 sm:text-lg">
              In Progress
            </span>
          </div> */}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Navigation Tabs                                                    */}
      {/* ------------------------------------------------------------------ */}
      <ApplicantComplianceTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Tab Content                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="
          w-full
         
          
          
          
        "
      >
        {activeTab === "compliance-forms" && <ComplianceFormsTab />}
        {activeTab === "references" && <ReferencesTab />}

        {activeTab === "training-certificates" && (
          <TrainingCertificatesTab sectionId="certificates" />
        )}
      </section>
    </div>
  );
};

export default ApplicantCompliancePage;
