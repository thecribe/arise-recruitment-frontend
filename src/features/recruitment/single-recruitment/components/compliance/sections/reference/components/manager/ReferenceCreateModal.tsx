/**
 * -----------------------------------------------------------------------------
 * File: ReferenceCreateModal.tsx
 *
 * Description:
 * Modal for a recruitment manager to add an employment reference
 * on behalf of an applicant.
 *
 * Uses the application's dynamic FormRenderer system.
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";

import type { ReferenceFormValues } from "@/features/recruitment/types/reference.types";
import { useCreateReference } from "../../../../hooks/reference.hooks";

import { referenceSchema } from "../../schemas/reference.schema";
import type { ReferenceSchemaValues } from "../../schemas/reference.schema";

import { referenceFields } from "../../forms/reference.fields";

interface ReferenceCreateModalProps {
  applicationId: string;
  open: boolean;
  onClose: () => void;
}

const defaultValues: ReferenceFormValues = {
  companyName: "",
  fromDate: "",
  toDate: "",
  refereeName: "",
  refereeEmail: "",
  refereePhone: "",
  refereeRelationship: "",
};

export default function ReferenceCreateModal({
  applicationId,
  open,
  onClose,
}: ReferenceCreateModalProps) {
  const createReference = useCreateReference(applicationId);

  const methods = useForm<ReferenceSchemaValues>({
    resolver: zodResolver(referenceSchema),
    defaultValues,
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  if (!open) {
    return null;
  }

  const onSubmit = async (values: ReferenceSchemaValues) => {
    try {
      await createReference.mutateAsync(values);

      reset(defaultValues);
      onClose();
    } catch {
      // Global mutation/error handling handles the error.
      // Keep the modal open so the manager can retry.
    }
  };

  const handleClose = () => {
    if (createReference.isPending) {
      return;
    }

    reset(defaultValues);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/30 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reference-create-modal-title"
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-3xl
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
            border-b
            border-blue-100/70
            px-5
            py-4
            dark:border-blue-400/10
          "
        >
          <div>
            <h2
              id="reference-create-modal-title"
              className="text-lg font-semibold text-slate-800 dark:text-slate-100"
            >
              Add Reference
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add an employment reference for this applicant.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={createReference.isPending}
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
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ---------------------------------------------------------------------
         * Form
         * --------------------------------------------------------------------- */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FormRenderer
                fields={referenceFields}
                config={{
                  mode: "create",
                  canEdit: true,
                  disabled: createReference.isPending,
                  readOnly: false,
                }}
              />
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
                sm:justify-end
                dark:border-blue-400/10
                dark:bg-blue-500/5
              "
            >
              <button
                type="button"
                onClick={handleClose}
                disabled={createReference.isPending}
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
                disabled={createReference.isPending}
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
                {createReference.isPending && (
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

                {createReference.isPending ? "Adding..." : "Add Reference"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
