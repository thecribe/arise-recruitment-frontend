import { useEffect, useState } from "react";
import { Eye, Loader2, ShieldCheck } from "lucide-react";

import ComplianceSectionReview from "../../ComplianceSectionReview";
import { useComplianceSection } from "../../hooks/useComplianceSection";
import useVerifyRightToWork from "../../hooks/useVerifyRightToWork";

import RightToWorkComplianceForm from "./RightToWorkComplianceForm";
import RightToWorkReviewStatus from "./RightToWorkReviewStatus";
import RightToWorkVerificationResponseModal from "./RightToWorkVerificationResponseModal";

import { rightToWorkApplicantFields } from "./right-to-work-applicant.fields";
import { rightToWorkManagerFields } from "./right-to-work-manager.fields";

interface RightToWorkComplianceProps {
  applicationId: string;
}

export default function RightToWorkCompliance({
  applicationId,
}: RightToWorkComplianceProps) {
  const {
    sectionValues,
    managerSectionValues,
    updateSection,
    updateManagerSection,
    isUpdatingSection,
    isUpdatingManagerSection,
  } = useComplianceSection();

  const {
    verifyRightToWork,
    verificationResponse,
    isVerifying,
    verifyRightToWorkError,
    resetVerification,
  } = useVerifyRightToWork({ applicationId });

  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const shareCode = sectionValues?.shareCode;
  const dateOfBirth = sectionValues?.dateOfBirth;

  const canVerifyRightToWork = [shareCode, dateOfBirth].every(
    (value) => typeof value === "string" && value.trim().length > 0,
  );

  // Clear an old response if verification details change.
  useEffect(() => {
    resetVerification();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsResponseModalOpen(false);
  }, [shareCode, dateOfBirth, resetVerification]);

  const handleVerifyRightToWork = async () => {
    if (!canVerifyRightToWork || isVerifying) return;

    if (typeof shareCode !== "string" || typeof dateOfBirth !== "string") {
      return;
    }

    await verifyRightToWork({
      shareCode: shareCode.replace(/\s+/g, "").toUpperCase(),
      dateOfBirth: dateOfBirth.trim(),
    });
  };

  const hasVerificationResponse =
    verificationResponse !== undefined && verificationResponse !== null;

  return (
    <ComplianceSectionReview
      title="Right to Work Compliance"
      description="Review the applicant's Right to Work information and complete the required compliance checks."
    >
      <div className="space-y-5">
        <RightToWorkComplianceForm
          formId="right-to-work-applicant"
          title="Applicant Right to Work Information"
          description="Right to Work information provided as part of the applicant's recruitment application."
          fields={rightToWorkApplicantFields}
          values={sectionValues}
          canEdit={true}
          isSaving={isUpdatingSection}
          onSave={updateSection}
        />

        {/* Right to Work Verification */}
        <section className="rounded-xl border border-blue-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-blue-900/60 dark:bg-slate-900/40 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Right to Work Verification
                </h3>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Verify the applicant's share code and date of birth using the
                external Right to Work service.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {hasVerificationResponse && (
                <button
                  type="button"
                  onClick={() => setIsResponseModalOpen(true)}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50"
                >
                  <Eye className="h-4 w-4" />
                  View Response
                </button>
              )}

              <button
                type="button"
                onClick={handleVerifyRightToWork}
                disabled={!canVerifyRightToWork || isVerifying}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Verify Right to Work
                  </>
                )}
              </button>
            </div>
          </div>

          {!canVerifyRightToWork && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
              Enter the share code and date of birth before verifying.
            </p>
          )}

          {Boolean(verifyRightToWorkError) && (
            <p
              role="alert"
              className="mt-3 text-sm text-red-600 dark:text-red-400"
            >
              Unable to verify Right to Work details. Please check the
              information and try again.
            </p>
          )}
        </section>

        <RightToWorkReviewStatus values={managerSectionValues} />

        <RightToWorkComplianceForm
          formId="right-to-work-manager"
          title="Right to Work Compliance Check"
          description="Compliance checks and supporting documents completed by the Recruitment Manager."
          fields={rightToWorkManagerFields}
          values={managerSectionValues}
          canEdit={true}
          isSaving={isUpdatingManagerSection}
          onSave={updateManagerSection}
        />
      </div>

      {/* Verification Response Modal */}
      {isResponseModalOpen && hasVerificationResponse && (
        <RightToWorkVerificationResponseModal
          response={verificationResponse}
          onClose={() => setIsResponseModalOpen(false)}
        />
      )}
    </ComplianceSectionReview>
  );
}
