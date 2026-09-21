import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FileText, RefreshCw } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";

import ComplianceCommentView from "./ComplianceCommentView";
import ComplianceFormActions from "./ComplianceFormActions";
import ComplianceStatusBadge from "./ComplianceStatusBadge";

import { useApplicantComplianceForm } from "../providers/ApplicantComplianceFormContext";
import { APPLICANT_COMPLIANCE_SECTIONS } from "../config/compliance-sections";

type ComplianceFormValues = Record<string, unknown>;

export default function ComplianceFormWorkspace() {
  const {
    activeSection,
    fields,
    values,
    comment,
    isLoading,
    isFetching,
    error,
    isSaving,
    isSubmitting,
    retryActiveSection,
    saveDraft,
    submitSection,
  } = useApplicantComplianceForm();

  const methods = useForm<ComplianceFormValues>({
    defaultValues: values,
    mode: "onTouched",
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  if (!activeSection) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-white/20 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl">
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <FileText size={24} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-800">
            Select a compliance form
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Select a form from the navigation menu to view or complete it.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading || isFetching) {
    return (
      <section className="rounded-3xl border border-white/20 bg-white/70 p-5 shadow-lg backdrop-blur-xl sm:p-6">
        <div className="animate-pulse space-y-5">
          <div className="h-7 w-2/5 rounded-lg bg-slate-200" />
          <div className="h-4 w-4/5 rounded bg-slate-200" />
          <div className="h-24 rounded-2xl bg-slate-200/80" />
          <div className="h-24 rounded-2xl bg-slate-200/80" />
          <div className="h-24 rounded-2xl bg-slate-200/80" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-red-200/70 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl">
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <FileText size={24} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-800">
            Unable to load this form
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Something went wrong while loading this compliance section.
          </p>

          <button
            type="button"
            onClick={() => void retryActiveSection()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const isReadOnly =
    activeSection.status === "locked" ||
    activeSection.status === "submitted" ||
    activeSection.status === "approved";

  const formConfig = {
    mode: isReadOnly ? ("view" as const) : ("edit" as const),
    canEdit: !isReadOnly,
    disabled: isReadOnly,
    readOnly: isReadOnly,
  };

  const handleSaveDraft = handleSubmit(async (formValues) => {
    await saveDraft(formValues);
  });

  const handleSubmitSection = handleSubmit(async (formValues) => {
    await submitSection(formValues);
  });

  const section = APPLICANT_COMPLIANCE_SECTIONS.find(
    (sectionDetails) => sectionDetails.key === activeSection.section_id,
  );

  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-5 shadow-lg backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
              Compliance Section
            </p>
          </div>

          <h1 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
            {section?.title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center">
          <ComplianceStatusBadge status={activeSection.status} />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <ComplianceCommentView comment={comment} />

        <FormProvider {...methods}>
          <form className="space-y-5">
            <FormRenderer fields={fields} config={formConfig} />
          </form>
        </FormProvider>

        <ComplianceFormActions
          status={activeSection.status}
          isSaving={isSaving}
          isSubmitting={isSubmitting}
          onSaveDraft={() => void handleSaveDraft()}
          onSubmit={() => void handleSubmitSection()}
        />
      </div>
    </section>
  );
}
