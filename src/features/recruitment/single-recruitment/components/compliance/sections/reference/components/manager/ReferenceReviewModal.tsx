/**
 * -----------------------------------------------------------------------------
 * File: ReferenceReviewModal.tsx
 *
 * Description:
 * Manager modal for reviewing and approving/rejecting a reference.
 *
 * Important:
 * - Reference status and mail status are separate.
 * - Approving/rejecting changes only the reference status.
 * - Mail status is never modified by this action.
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import FormRenderer from "@/components/forms/FormRenderer";

import type {
  ManagerReference,
  ReferenceResponseFormValues,
} from "@/features/recruitment/types/reference.types";
import {
  useReferenceResponse,
  useUpdateReferenceStatus,
} from "../../../../hooks/reference.hooks";
import { referenceResponseApiToForm } from "../../utils/reference-response.utils";
import { referenceResponseFields } from "../../forms/reference-response.fields";
import { ReferenceStatusBadge } from "./ReferenceStatusBadge";
import { ReferenceMailStatusBadge } from "./ReferenceMailStatusBadge";

interface ReferenceReviewModalProps {
  applicationId: string;
  reference: ManagerReference;
  open: boolean;
  onClose: () => void;
}

export default function ReferenceReviewModal({
  applicationId,
  reference,
  open,
  onClose,
}: ReferenceReviewModalProps) {
  const {
    data: response,
    isLoading: isLoadingResponse,
    isError: isResponseError,
  } = useReferenceResponse(applicationId, reference.id, open);

  const updateStatus = useUpdateReferenceStatus(applicationId, reference.id);

  const methods = useForm<ReferenceResponseFormValues>({
    defaultValues: {
      reEmploy: "Yes",

      suitabilityToRole: undefined,
      knowledge: undefined,
      abilityToWorkUnderPressure: undefined,
      interpersonalSkills: undefined,
      timeKeeping: undefined,
      consultationSkills: undefined,
      cooperationWithOtherStaff: undefined,
      presentation: undefined,
      trustworthiness: undefined,
      reliability: undefined,
      computerSkills: undefined,

      detailReference: "",
      refererName: "",
      refererSignature: null,
      signatureDate: "",
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (!response) return;

    const formValues = referenceResponseApiToForm(
      response,
      referenceResponseFields,
    );

    reset(formValues);
  }, [response, reset]);

  if (!open) {
    return null;
  }

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    await updateStatus.mutateAsync(status);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
        <FormProvider {...methods}>
          {/* -----------------------------------------------------------------
           * Header
           * ----------------------------------------------------------------- */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Review Reference
              </h2>

              <p className="mt-1 text-sm text-blue-100/70">
                Review the referee's response before making a decision.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ReferenceStatusBadge status={reference.status} />

                <ReferenceMailStatusBadge status={reference.mailStatus} />
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={updateStatus.isPending}
              aria-label="Close"
              className="rounded-lg p-2 text-blue-100/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              ✕
            </button>
          </div>

          {/* -----------------------------------------------------------------
           * Content
           * ----------------------------------------------------------------- */}
          <div className="px-6 py-6">
            {isLoadingResponse && (
              <div className="flex items-center justify-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200/30 border-t-blue-400" />
              </div>
            )}

            {!isLoadingResponse && isResponseError && (
              <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
                Unable to load the reference response.
              </div>
            )}

            {!isLoadingResponse && !isResponseError && !response && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-sm text-blue-100/70">
                  No response is available for this reference.
                </p>
              </div>
            )}

            {!isLoadingResponse && !isResponseError && response && (
              <FormRenderer
                fields={referenceResponseFields}
                config={{
                  mode: "view",
                  canEdit: false,
                  disabled: true,
                  readOnly: true,
                }}
              />
            )}
          </div>

          {/* -----------------------------------------------------------------
           * Footer
           * ----------------------------------------------------------------- */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              disabled={updateStatus.isPending}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-blue-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleStatusUpdate("rejected")}
                disabled={updateStatus.isPending}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateStatus.isPending ? "Updating..." : "Reject Reference"}
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate("approved")}
                disabled={updateStatus.isPending}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateStatus.isPending ? "Updating..." : "Approve Reference"}
              </button>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
