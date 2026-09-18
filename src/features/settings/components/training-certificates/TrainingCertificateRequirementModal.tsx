import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import FormRenderer from "@/components/forms/FormRenderer";
import { createPortal } from "react-dom";

import { trainingCertificateRequirementFields } from "../../forms/training-certificate-requirement.fields";
import {
  trainingCertificateRequirementSchema,
  type TrainingCertificateRequirementSchemaValues,
} from "../../schemas/training-certificate-requirement.schema";
import {
  useCreateTrainingCertificateRequirement,
  useUpdateTrainingCertificateRequirement,
} from "../../hooks/training-certificate-requirements.hooks";
import type { TrainingCertificateRequirement } from "../../types/training-certificate-requirement.types";

interface TrainingCertificateRequirementModalProps {
  open: boolean;
  requirement?: TrainingCertificateRequirement | null;
  onClose: () => void;
}

const TrainingCertificateRequirementModal = ({
  open,
  requirement,
  onClose,
}: TrainingCertificateRequirementModalProps) => {
  const isEdit = Boolean(requirement);

  const createRequirement = useCreateTrainingCertificateRequirement();

  const updateRequirement = useUpdateTrainingCertificateRequirement(
    requirement?.id ?? "",
  );

  const mutation = isEdit ? updateRequirement : createRequirement;

  const methods = useForm<TrainingCertificateRequirementSchemaValues>({
    resolver: zodResolver(trainingCertificateRequirementSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!open) return;

    reset({
      name: requirement?.name ?? "",
      description: requirement?.description ?? "",
    });
  }, [open, requirement, reset]);

  const handleClose = () => {
    if (mutation.isPending) return;

    reset({
      name: "",
      description: "",
    });

    onClose();
  };

  const onSubmit = async (
    values: TrainingCertificateRequirementSchemaValues,
  ) => {
    try {
      await mutation.mutateAsync(values);

      reset({
        name: "",
        description: "",
      });

      onClose();
    } catch {
      // Mutation error is handled by the mutation/query
      // error handling already used by the application.
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-blue-950/30
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-xl
          flex-col
          overflow-hidden
          rounded-2xl
          border border-blue-200/60
          bg-white/80
          shadow-2xl
          shadow-blue-900/10
          backdrop-blur-2xl
          dark:border-blue-400/20
          dark:bg-slate-900/80
        "
      >
        {/* Header */}
        <div
          className="
            flex shrink-0 items-center justify-between gap-4
            border-b border-blue-100/70
            px-5 py-4
            dark:border-blue-400/20
          "
        >
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {isEdit
                ? "Edit Training Certificate"
                : "Add Training Certificate"}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isEdit
                ? "Update this mandatory certificate requirement."
                : "Add a mandatory certificate applicants must provide."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={mutation.isPending}
            aria-label="Close"
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl
              bg-blue-50/50
              text-slate-500
              transition
              hover:bg-blue-100/70
              hover:text-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-blue-500/10
              dark:text-slate-400
              dark:hover:bg-blue-500/20
              dark:hover:text-blue-300
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FormRenderer
                fields={trainingCertificateRequirementFields}
                config={{
                  mode: isEdit ? "edit" : "create",
                  canEdit: true,
                  disabled: mutation.isPending,
                  readOnly: false,
                }}
              />
            </div>

            {/* Footer */}
            <div
              className="
                flex shrink-0
                flex-col-reverse gap-2
                border-t border-blue-100/70
                bg-blue-50/20
                px-5 py-4
                sm:flex-row
                sm:justify-end
                dark:border-blue-400/20
                dark:bg-blue-500/5
              "
            >
              <button
                type="button"
                onClick={handleClose}
                disabled={mutation.isPending}
                className="
                  w-full
                  rounded-xl
                  border border-blue-200/60
                  bg-white/50
                  px-4 py-2.5
                  text-sm font-medium
                  text-slate-700
                  transition
                  hover:bg-blue-50/70
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                  dark:border-blue-400/20
                  dark:bg-slate-900/30
                  dark:text-slate-200
                  dark:hover:bg-blue-500/10
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="
                  inline-flex w-full items-center justify-center
                  rounded-xl
                  bg-blue-600
                  px-4 py-2.5
                  text-sm font-medium
                  text-white
                  shadow-lg
                  shadow-blue-950/20
                  transition
                  hover:bg-blue-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {mutation.isPending
                  ? "Saving..."
                  : isEdit
                    ? "Save Changes"
                    : "Add Certificate"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>,
    document.body,
  );
};

export default TrainingCertificateRequirementModal;
