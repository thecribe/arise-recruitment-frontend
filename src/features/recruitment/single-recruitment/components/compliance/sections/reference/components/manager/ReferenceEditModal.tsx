/**
 * -----------------------------------------------------------------------------
 * File: ReferenceEditModal.tsx
 *
 * Description:
 * Manager modal for editing an applicant reference.
 *
 * Uses the application's shared dynamic form system.
 * The modal owns React Hook Form state and submission handling while
 * FormRenderer is responsible only for rendering the configured fields.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";

import { useUpdateReference } from "../../../../hooks/reference.hooks";

import type {
  ManagerReference,
  ReferenceFormValues,
} from "@/features/recruitment/types/reference.types";

import { referenceSchema } from "../../schemas/reference.schema";
import { referenceFields } from "../../forms/reference.fields";

interface ReferenceEditModalProps {
  applicationId: string;
  reference: ManagerReference;
  open: boolean;
  onClose: () => void;
}

export default function ReferenceEditModal({
  applicationId,
  reference,
  open,
  onClose,
}: ReferenceEditModalProps) {
  const updateReference = useUpdateReference(applicationId, reference.id);

  const defaultValues = useMemo<ReferenceFormValues>(
    () => ({
      companyName: reference.companyName ?? "",
      fromDate: reference.fromDate ?? "",
      toDate: reference.toDate ?? "",
      refereeName: reference.refereeName ?? "",
      refereeEmail: reference.refereeEmail ?? "",
      refereePhone: reference.refereePhone ?? "",
      refereeRelationship: reference.refereeRelationship ?? "",
    }),
    [reference],
  );

  const methods = useForm<ReferenceFormValues>({
    resolver: zodResolver(referenceSchema),
    defaultValues,
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;

  /**
   * Reset the form whenever the selected reference changes
   * or the modal is opened.
   */
  useEffect(() => {
    if (!open) return;

    reset(defaultValues);
  }, [open, defaultValues, reset]);

  if (!open) {
    return null;
  }

  const handleFormSubmit = async (values: ReferenceFormValues) => {
    try {
      await updateReference.mutateAsync(values);

      onClose();
    } catch {
      // Global mutation/error handling handles the error.
      // Keep the modal open so the manager can retry.
    }
  };

  const handleClose = () => {
    if (updateReference.isPending) {
      return;
    }

    reset(defaultValues);
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
      aria-labelledby="reference-edit-modal-title"
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
              id="reference-edit-modal-title"
              className="
                text-lg
                font-semibold
                text-slate-800
                dark:text-slate-100
              "
            >
              Edit Reference
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Update the referee and employment details for this reference.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={updateReference.isPending}
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
            {/* Form fields */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FormRenderer
                fields={referenceFields}
                config={{
                  mode: "edit",
                  canEdit: true,
                  disabled: updateReference.isPending,
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
                disabled={updateReference.isPending}
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
                disabled={updateReference.isPending}
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
                {updateReference.isPending && (
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

                {updateReference.isPending ? "Saving..." : "Save Reference"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
