/**
 * -----------------------------------------------------------------------------
 * File: DbsCompliance.tsx
 *
 * Description:
 * DBS Update Check compliance section.
 *
 * The applicant provides their DBS information and disclosure document.
 * The Recruitment Manager provides the DBS Update Check and expiry date.
 * The manager can also verify DBS details and preview the response.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { Eye, Loader2, ShieldCheck } from "lucide-react";

import ComplianceSectionReview from "../../ComplianceSectionReview";
import { useComplianceSection } from "../../hooks/useComplianceSection";

import DbsComplianceForm from "./DbsComplianceForm";
import DbsComplianceStatus from "./DbsComplianceStatus";
import { dbsApplicantFields } from "./dbs-applicant.fields";
import { dbsManagerFields } from "./dbs-manager.fields";
import useVerifyDbs from "../../hooks/useVerifyDbs";
import DbsVerificationResponseModal from "./DbsVerificationResponseModal";

interface DbsComplianceProps {
  applicationId: string;
}

export default function DbsCompliance({ applicationId }: DbsComplianceProps) {
  const {
    sectionValues,
    managerSectionValues,
    updateSection,
    updateManagerSection,
    isUpdatingSection,
    isUpdatingManagerSection,
  } = useComplianceSection();

  const {
    verifyDbs,
    verificationResponse,
    isVerifying,
    verifyDbsError,
    resetVerification,
  } = useVerifyDbs({ applicationId });

  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const disclosureNumber = sectionValues?.disclosureNumber;
  const dateOfBirth = sectionValues?.dateOfBirth;
  const surname = sectionValues?.surname;

  const canVerifyDbs = [disclosureNumber, dateOfBirth, surname].every(
    (value) => typeof value === "string" && value.trim().length > 0,
  );

  // Clear an old response if the applicant's verification details change.
  useEffect(() => {
    resetVerification();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsResponseModalOpen(false);
  }, [disclosureNumber, dateOfBirth, surname, resetVerification]);

  const handleVerifyDbs = async () => {
    if (!canVerifyDbs || isVerifying) return;

    if (
      typeof disclosureNumber !== "string" ||
      typeof dateOfBirth !== "string" ||
      typeof surname !== "string"
    ) {
      return;
    }

    await verifyDbs({
      disclosureNumber: disclosureNumber.trim(),
      dateOfBirth: dateOfBirth.trim(),
      surname: surname.trim(),
    });
  };
  const hasVerificationResponse = verificationResponse !== undefined;

  return (
    <ComplianceSectionReview
      title="DBS Update Check"
      description="Review the applicant's DBS information and complete the required DBS update check."
    >
      <div className="space-y-5">
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

        {/* DBS Verification */}
        <section className="rounded-xl border border-blue-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-blue-900/60 dark:bg-slate-900/40 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  DBS Verification
                </h3>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Verify the applicant's DBS details using the information
                provided above.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {hasVerificationResponse && (
                <button
                  type="button"
                  onClick={() => setIsResponseModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50"
                >
                  <Eye className="h-4 w-4" />
                  View Response
                </button>
              )}

              <button
                type="button"
                onClick={handleVerifyDbs}
                disabled={!canVerifyDbs || isVerifying}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Verify DBS
                  </>
                )}
              </button>
            </div>
          </div>

          {!canVerifyDbs && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
              Enter the disclosure number, date of birth, and surname before
              verifying.
            </p>
          )}

          {Boolean(verifyDbsError) && (
            <p
              role="alert"
              className="mt-3 text-sm text-red-600 dark:text-red-400"
            >
              Unable to verify DBS details. Please try again.
            </p>
          )}
        </section>

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
      onClick={}
      {/* Verification Response Modal */}
      {isResponseModalOpen && hasVerificationResponse && (
        <DbsVerificationResponseModal
          response={verificationResponse}
          onClose={() => setIsResponseModalOpen(false)}
        />
      )}
    </ComplianceSectionReview>
  );
}
