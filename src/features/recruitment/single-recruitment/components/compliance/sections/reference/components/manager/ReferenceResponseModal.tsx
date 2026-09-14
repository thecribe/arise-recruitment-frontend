/**
 * -----------------------------------------------------------------------------
 * File: ReferenceResponseModal.tsx
 *
 * Description:
 * Manager modal for viewing a submitted reference response.
 *
 * The response is rendered using the application's shared dynamic form
 * renderer in read-only mode.
 *
 * Backend ratings are dynamically flattened into the form structure before
 * being passed to React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";

import type {
  ManagerReference,
  ReferenceResponseFormValues,
} from "@/features/recruitment/types/reference.types";

import { useReferenceResponse } from "../../../../hooks/reference.hooks";

import { referenceResponseApiToForm } from "../../utils/reference-response.utils";
import { referenceResponseFields } from "../../forms/reference-response.fields";

interface ReferenceResponseModalProps {
  applicationId: string;
  reference: ManagerReference;
  open: boolean;
  onClose: () => void;
}

export default function ReferenceResponseModal({
  applicationId,
  reference,
  open,
  onClose,
}: ReferenceResponseModalProps) {
  const {
    data: response,
    isLoading,
    isError,
  } = useReferenceResponse(applicationId, reference.id, open);

  const methods = useForm<ReferenceResponseFormValues>({
    defaultValues: {},
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
      aria-labelledby="reference-response-modal-title"
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
          {/* -------------------------------------------------------------------
           * Header
           * ------------------------------------------------------------------- */}
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
                id="reference-response-modal-title"
                className="
                  text-lg
                  font-semibold
                  text-slate-800
                  dark:text-slate-100
                "
              >
                Reference Response
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                View the response provided for{" "}
                <span className="font-medium text-blue-600 dark:text-blue-300">
                  {reference.refereeName || "the referee"}
                </span>
                .
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
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

          {/* -------------------------------------------------------------------
           * Content
           * ------------------------------------------------------------------- */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {isLoading && (
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

            {isError && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-200/60
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

            {!isLoading && !isError && !response && (
              <div
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-blue-200/60
                  bg-blue-50/30
                  p-8
                  text-center
                  backdrop-blur-sm
                  dark:border-blue-400/20
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
                  No reference response has been submitted yet.
                </p>
              </div>
            )}

            {!isLoading && !isError && response && (
              <FormRenderer
                fields={referenceResponseFields}
                config={{
                  mode: "view",
                  canEdit: false,
                  readOnly: true,
                  disabled: true,
                }}
              />
            )}
          </div>

          {/* -------------------------------------------------------------------
           * Footer
           * ------------------------------------------------------------------- */}
          <div
            className="
              flex
              justify-end
              border-t
              border-blue-100/70
              bg-blue-50/20
              px-5
              py-4
              dark:border-blue-400/10
              dark:bg-blue-500/5
            "
          >
            <button
              type="button"
              onClick={onClose}
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
                sm:w-auto
                dark:border-blue-400/20
                dark:bg-white/5
                dark:text-slate-300
                dark:hover:bg-white/10
                dark:hover:text-white
              "
            >
              Close
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
