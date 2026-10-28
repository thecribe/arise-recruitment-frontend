import { useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  FileSignature,
  LoaderCircle,
} from "lucide-react";
import { useApplicantDeclarations } from "../../components/declarations/hooks/useApplicantDeclarations";
import { useApplicantDeclarationValues } from "../../components/declarations/hooks/useApplicantDeclarationValues";
import DeclarationsPreviewModal from "./DeclarationsPreviewModal";

interface DeclarationsDocumentProps {
  applicationId: string;
}

const DeclarationsDocument = ({ applicationId }: DeclarationsDocumentProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    data: declarations,
    isLoading: isDefinitionsLoading,
    isError: isDefinitionsError,
  } = useApplicantDeclarations(applicationId);

  const {
    data: values,
    isLoading: isValuesLoading,
    isError: isValuesError,
  } = useApplicantDeclarationValues(applicationId);

  const isLoading = isDefinitionsLoading || isValuesLoading;

  const isError = isDefinitionsError || isValuesError;

  const sections = declarations ? Object.values(declarations) : [];

  const completedSections = sections.filter((section) => {
    const sectionValues = values?.[section.id];

    if (!sectionValues) {
      return false;
    }

    return Object.values(sectionValues).some((value) => {
      if (value === undefined || value === null) {
        return false;
      }

      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return true;
    });
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-white/15 bg-white/[0.06] shadow-xl shadow-blue-950/10 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle size={28} className="animate-spin text-blue-400" />

          <p className="text-sm text-slate-500">Loading declarations...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-red-400/20 bg-red-500/[0.08] p-6 text-center shadow-xl backdrop-blur-xl">
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-500">
          <AlertCircle size={30} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">
          Unable to load declarations
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          We could not retrieve the applicant&apos;s declarations. Please try
          again later.
        </p>
      </div>
    );
  }

  if (!sections.length) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/15 bg-white/[0.06] p-6 text-center shadow-xl backdrop-blur-xl">
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-blue-600">
          <FileSignature size={30} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">
          No declarations available
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          There are currently no declarations configured for this application.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        {/* Main card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-5 shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:p-6">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex min-w-0 items-start gap-4">
              <div className="shrink-0 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-600">
                <FileSignature size={25} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Declarations
                  </h2>

                  {completedSections.length === sections.length && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                      <CheckCircle2 size={12} />
                      Completed
                    </span>
                  )}
                </div>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                  Preview the applicant&apos;s completed declarations as a
                  formatted PDF document.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
            >
              <FileSignature size={17} />
              Preview PDF
            </button>
          </div>
        </div>

        {/* Document information */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-lg shadow-blue-950/10 backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-2 text-blue-600">
              <FileSignature size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Declaration Information
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Information associated with this declaration document
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-700/20 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-blue-600/75">
                Total Sections
              </p>

              <p className="mt-2 text-sm font-medium text-slate-900">
                {sections.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-700/20 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-blue-600/75">
                Completed Sections
              </p>

              <p className="mt-2 text-sm font-medium text-slate-900">
                {completedSections.length}
              </p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-2xl border border-blue-400/15 bg-blue-500/[0.07] p-4">
          <FileSignature size={17} className="mt-0.5 shrink-0 text-blue-600" />

          <p className="text-xs leading-5 text-slate-500">
            The generated PDF contains the applicant&apos;s declaration
            responses and declaration text. Only saved declaration values are
            included.
          </p>
        </div>
      </div>

      <DeclarationsPreviewModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        sections={sections}
        values={values ?? {}}
      />
    </>
  );
};

export default DeclarationsDocument;
