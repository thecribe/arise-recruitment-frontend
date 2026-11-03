import { FormProvider, type UseFormReturn } from "react-hook-form";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";

import type { ReferenceResponseFormValues } from "@/features/recruitment/types/reference.types";

import { referenceResponseFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/reference/forms/reference-response.fields";

interface RefereeFormContentProps {
  form: UseFormReturn<ReferenceResponseFormValues>;
  onSubmit: (values: ReferenceResponseFormValues) => void | Promise<void>;
  isSubmitting: boolean;
  isError: boolean;
}

const RefereeFormContent = ({
  form,
  onSubmit,
  isSubmitting,
  isError,
}: RefereeFormContentProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-200/60 bg-white/70 shadow-xl shadow-blue-900/5 backdrop-blur-2xl dark:border-blue-400/20 dark:bg-slate-900/70">
      {/* Form Header */}

      <div className="border-b border-blue-100/70 px-5 py-5 sm:px-7 dark:border-blue-400/10">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Reference Assessment
        </h2>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Please provide an honest assessment of the applicant.
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="px-5 py-6 sm:px-7">
            <FormRenderer
              fields={referenceResponseFields}
              config={{
                mode: "create",
                canEdit: true,
                disabled: isSubmitting,
                readOnly: false,
              }}
            />

            {/* Submission Error */}

            {isError && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200/70 bg-red-50/60 p-4 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                <p>We couldn't submit your reference. Please try again.</p>
              </div>
            )}
          </div>

          {/* Form Footer */}

          <div className="border-t border-blue-100/70 bg-blue-50/30 px-5 py-5 sm:px-7 dark:border-blue-400/10 dark:bg-blue-500/5">
            <div className="mb-4 flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />

              <p>
                Your information will be treated confidentially and used for
                recruitment and employment reference purposes.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Reference...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Submit Reference
                </>
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RefereeFormContent;
