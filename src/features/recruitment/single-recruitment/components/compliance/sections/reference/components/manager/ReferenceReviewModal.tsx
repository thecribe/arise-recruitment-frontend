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
import { Download, X } from "lucide-react";

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

  const handleClose = () => {
    if (updateStatus.isPending) {
      return;
    }

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-blue-950/30
        p-4
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="reference-review-modal-title"
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-blue-200/60
          bg-white/80
          shadow-2xl
          shadow-blue-900/10
          backdrop-blur-2xl
          dark:border-blue-400/20
          dark:bg-slate-900/80
        "
      >
        <FormProvider {...methods}>
          {/* -----------------------------------------------------------------
           * Header
           * ----------------------------------------------------------------- */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-b
              border-blue-100/70
              px-5
              py-4
              dark:border-blue-400/10
            "
          >
            <div>
              <h2
                id="reference-review-modal-title"
                className="
                  text-lg
                  font-semibold
                  text-slate-800
                  dark:text-slate-100
                "
              >
                Review Reference
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Review the referee's response before making a decision.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ReferenceStatusBadge status={reference.status} />

                <ReferenceMailStatusBadge status={reference.mailStatus} />
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={updateStatus.isPending}
              aria-label="Close modal"
              className="
                rounded-xl
                border
                border-blue-100/60
                bg-blue-50/50
                p-2
                text-slate-500
                transition
                hover:bg-blue-100/60
                hover:text-blue-600
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-blue-400/10
                dark:bg-blue-500/5
                dark:text-slate-400
                dark:hover:bg-blue-500/10
                dark:hover:text-blue-300
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* -----------------------------------------------------------------
           * Content
           * ----------------------------------------------------------------- */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {/* Loading */}
            {isLoadingResponse && (
              <div className="flex items-center justify-center py-16">
                <div
                  className="
                    h-8
                    w-8
                    animate-spin
                    rounded-full
                    border-2
                    border-blue-200/40
                    border-t-blue-500
                    dark:border-blue-400/20
                    dark:border-t-blue-400
                  "
                />
              </div>
            )}

            {/* Error */}
            {!isLoadingResponse && isResponseError && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-200/70
                  bg-red-50/60
                  p-4
                  text-sm
                  text-red-600
                  backdrop-blur-sm
                  dark:border-red-400/20
                  dark:bg-red-500/10
                  dark:text-red-300
                "
              >
                Unable to load the reference response.
              </div>
            )}

            {/* No response */}
            {!isLoadingResponse && !isResponseError && !response && (
              <div
                className="
                    rounded-xl
                    border
                    border-blue-100/70
                    bg-blue-50/30
                    p-6
                    text-center
                    dark:border-blue-400/10
                    dark:bg-blue-500/5
                  "
              >
                <p
                  className="
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                >
                  No response is available for this reference.
                </p>
              </div>
            )}

            {/* Response */}
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
          <div
            className="
    flex
    flex-col-reverse
    gap-3
    border-t
    border-blue-100/70
    bg-blue-50/20
    px-5
    py-4
    sm:flex-row
    sm:items-center
    sm:justify-between
    dark:border-blue-400/10
    dark:bg-blue-500/5
  "
          >
            {/* Left actions */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  // TODO: Implement reference response download
                  console.log("Download reference response", reference.id);
                }}
                disabled={isLoadingResponse || !response}
                className="
        inline-flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-blue-200/60
        bg-white/50
        px-5
        py-2.5
        text-sm
        font-medium
        text-slate-600
        transition
        hover:bg-white/80
        hover:text-blue-600
        disabled:cursor-not-allowed
        disabled:opacity-50
        sm:w-auto
        dark:border-blue-400/20
        dark:bg-white/5
        dark:text-slate-300
        dark:hover:bg-white/10
        dark:hover:text-blue-300
      "
              >
                <Download className="h-4 w-4" />
                Download
              </button>

              <button
                type="button"
                onClick={handleClose}
                disabled={updateStatus.isPending}
                className="
        inline-flex
        w-full
        items-center
        justify-center
        rounded-xl
        border
        border-blue-200/60
        bg-white/50
        px-5
        py-2.5
        text-sm
        font-medium
        text-slate-600
        transition
        hover:bg-white/80
        hover:text-slate-800
        disabled:cursor-not-allowed
        disabled:opacity-50
        sm:w-auto
        dark:border-blue-400/20
        dark:bg-white/5
        dark:text-slate-300
        dark:hover:bg-white/10
        dark:hover:text-white
      "
              >
                Cancel
              </button>
            </div>

            {/* Review actions */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => handleStatusUpdate("rejected")}
                disabled={updateStatus.isPending || !response}
                className="
        inline-flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-red-200/70
        bg-red-50/60
        px-5
        py-2.5
        text-sm
        font-medium
        text-red-600
        transition
        hover:bg-red-100/70
        disabled:cursor-not-allowed
        disabled:opacity-50
        sm:w-auto
        dark:border-red-400/20
        dark:bg-red-500/10
        dark:text-red-300
        dark:hover:bg-red-500/20
      "
              >
                {updateStatus.isPending && (
                  <span
                    className="
            h-4
            w-4
            animate-spin
            rounded-full
            border-2
            border-red-300/30
            border-t-red-500
          "
                  />
                )}
                Reject Reference
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate("approved")}
                disabled={updateStatus.isPending || !response}
                className="
        inline-flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-5
        py-2.5
        text-sm
        font-medium
        text-white
        shadow-lg
        shadow-blue-900/20
        transition
        hover:bg-blue-500
        disabled:cursor-not-allowed
        disabled:opacity-50
        sm:w-auto
      "
              >
                {updateStatus.isPending && (
                  <span
                    className="
            h-4
            w-4
            animate-spin
            rounded-full
            border-2
            border-white/30
            border-t-white
          "
                  />
                )}
                Approve Reference
              </button>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
