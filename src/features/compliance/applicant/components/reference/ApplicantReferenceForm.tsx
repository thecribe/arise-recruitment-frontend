import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";
import type { ApplicantReference } from "@/features/recruitment/types/reference.types";
import {
  useCreateApplicantReference,
  useUpdateApplicantReference,
} from "../../hooks/useApplicantReferences";
import { referenceFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/reference/forms/reference.fields";

interface ApplicantReferenceFormValues {
  companyName: string;
  fromDate: string;
  toDate: string;
  refereeName: string;
  refereeEmail: string;
  refereePhone: string;
  refereeRelationship: string;
}

interface ApplicantReferenceFormProps {
  reference: ApplicantReference | null;
  onClose: () => void;
}

const emptyValues: ApplicantReferenceFormValues = {
  companyName: "",
  fromDate: "",
  toDate: "",
  refereeName: "",
  refereeEmail: "",
  refereePhone: "",
  refereeRelationship: "",
};

export default function ApplicantReferenceForm({
  reference,
  onClose,
}: ApplicantReferenceFormProps) {
  const isEditing = Boolean(reference);

  const methods = useForm<ApplicantReferenceFormValues>({
    defaultValues: emptyValues,
    mode: "onBlur",
  });

  const createMutation = useCreateApplicantReference();
  const updateMutation = useUpdateApplicantReference();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!reference) {
      methods.reset(emptyValues);
      return;
    }

    methods.reset({
      companyName: reference.companyName ?? "",
      fromDate: reference.fromDate ?? "",
      toDate: reference.toDate ?? "",
      refereeName: reference.refereeName ?? "",
      refereeEmail: reference.refereeEmail ?? "",
      refereePhone: reference.refereePhone ?? "",
      refereeRelationship: reference.refereeRelationship ?? "",
    });
  }, [reference, methods]);

  const onSubmit = async (values: ApplicantReferenceFormValues) => {
    if (reference) {
      await updateMutation.mutateAsync({
        referenceId: reference.id,
        payload: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }

    onClose();
  };

  return (
    <div className="rounded-3xl border border-white/20 bg-white/75 p-5 shadow-lg backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing ? "Edit reference" : "Add reference"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Provide accurate details for your employment reference.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close reference form"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <FormRenderer
            fields={referenceFields}
            config={{
              mode: "edit",
              canEdit: true,
            }}
          />

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200/70 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update reference"
                  : "Add reference"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
