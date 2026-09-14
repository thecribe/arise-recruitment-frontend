/**
 * -----------------------------------------------------------------------------
 * File: ManagerReferenceResponseModal.tsx
 *
 * Description:
 * Manager modal for completing a reference response on behalf of a referee.
 *
 * Important:
 * - Uses the shared dynamic form renderer.
 * - The manager can fill/edit the response.
 * - Saving this response does NOT change the reference mail status.
 * - Saving this response does NOT approve/reject the reference.
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";

import type {
  ManagerReference,
  ReferenceResponseFormValues,
} from "@/features/recruitment/types/reference.types";

import {
  useReferenceResponse,
  useSaveManagerReferenceResponse,
} from "../../../../hooks/reference.hooks";

import { referenceResponseSchema } from "../../schemas/reference-response.schema";

import {
  referenceResponseApiToForm,
  referenceResponseFormToApi,
} from "../../utils/reference-response.utils";

import { referenceResponseFields } from "../../forms/reference-response.fields";

interface ManagerReferenceResponseModalProps {
  applicationId: string;
  reference: ManagerReference;
  open: boolean;
  onClose: () => void;
}

export default function ManagerReferenceResponseModal({
  applicationId,
  reference,
  open,
  onClose,
}: ManagerReferenceResponseModalProps) {
  const {
    data: response,
    isLoading: isLoadingResponse,
    isError: isResponseError,
  } = useReferenceResponse(applicationId, reference.id, open);

  const saveResponse = useSaveManagerReferenceResponse(
    applicationId,
    reference.id,
  );

  const methods = useForm<ReferenceResponseFormValues>({
    resolver: zodResolver(referenceResponseSchema),

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

  const { handleSubmit, reset } = methods;

  /**
   * Populate the form when an existing response exists.
   */
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

  const handleFormSubmit = async (values: ReferenceResponseFormValues) => {
    const payload = referenceResponseFormToApi(values, referenceResponseFields);

    await saveResponse.mutateAsync(payload);

    onClose();
  };

  const handleClose = () => {
    if (saveResponse.isPending) {
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
      aria-labelledby="manager-reference-response-modal-title"
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
        {/* ---------------------------------------------------------------------
         * Header
         * --------------------------------------------------------------------- */}
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
              id="manager-reference-response-modal-title"
              className="
                text-lg
                font-semibold
                text-slate-800
                dark:text-slate-100
              "
            >
              Fill Reference
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Complete the reference response on behalf of the referee.
            </p>

            <p
              className="
                mt-2
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Referee:{" "}
              <span
                className="
                  font-medium
                  text-blue-600
                  dark:text-blue-300
                "
              >
                {reference.refereeName || "—"}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={saveResponse.isPending}
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

        {/* ---------------------------------------------------------------------
         * Form
         * --------------------------------------------------------------------- */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            {/* -----------------------------------------------------------------
             * Loading
             * ----------------------------------------------------------------- */}
            {isLoadingResponse && (
              <div className="flex flex-1 items-center justify-center px-5 py-16">
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

            {/* -----------------------------------------------------------------
             * Error
             * ----------------------------------------------------------------- */}
            {!isLoadingResponse && isResponseError && (
              <div className="flex-1 px-5 py-6">
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
                  Unable to load the existing reference response. Please try
                  again.
                </div>
              </div>
            )}

            {/* -----------------------------------------------------------------
             * Dynamic Form
             * ----------------------------------------------------------------- */}
            {!isLoadingResponse && !isResponseError && (
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <FormRenderer
                  fields={referenceResponseFields}
                  config={{
                    mode: "edit",
                    canEdit: true,
                    disabled: saveResponse.isPending,
                    readOnly: false,
                  }}
                />
              </div>
            )}

            {/* -----------------------------------------------------------------
             * Footer
             * ----------------------------------------------------------------- */}
            {!isLoadingResponse && !isResponseError && (
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
                  sm:justify-end
                  dark:border-blue-400/10
                  dark:bg-blue-500/5
                "
              >
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={saveResponse.isPending}
                  className="
                    w-full
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

                <button
                  type="submit"
                  disabled={saveResponse.isPending}
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
                  {saveResponse.isPending && (
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

                  {saveResponse.isPending ? "Saving..." : "Save Reference"}
                </button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
