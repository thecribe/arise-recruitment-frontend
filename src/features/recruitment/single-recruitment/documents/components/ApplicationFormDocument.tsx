import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  FileText,
  LoaderCircle,
  UserRound,
} from "lucide-react";

import { useApplicationFormDocument } from "../hooks/useApplicationFormDocument";
import { useApplicationFormSections } from "../hooks/useApplicationFormSections";
import { PHASE_IDS } from "@/features/compliance/constants/application-stage";
import ApplicationFormPreviewModal from "../pdf/ApplicationFormPreviewModal";

interface ApplicationFormDocumentProps {
  applicationId: string;
}

const getApplicantName = (
  applicant: Record<string, unknown> | null,
): string => {
  if (!applicant) {
    return "Applicant";
  }

  const fullName = applicant.fullName;

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName;
  }

  const firstName =
    typeof applicant.firstName === "string" ? applicant.firstName : "";

  const lastName =
    typeof applicant.lastName === "string" ? applicant.lastName : "";

  const name = `${firstName} ${lastName}`.trim();

  return name || "Applicant";
};

const formatDate = (date: string | null | undefined): string => {
  if (!date) {
    return "Not available";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const ApplicationFormDocument = ({
  applicationId,
}: ApplicationFormDocumentProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    data: applicationDocument,
    isLoading: isDocumentLoading,
    isError: isDocumentError,
  } = useApplicationFormDocument(applicationId);

  const {
    data: sections = [],
    isLoading: isSectionsLoading,
    isError: isSectionsError,
  } = useApplicationFormSections(PHASE_IDS.APPLICATION_FORM);

  const isLoading = isDocumentLoading || isSectionsLoading;

  const isError = isDocumentError || isSectionsError;

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-white/15 bg-white/[0.06] shadow-xl shadow-blue-950/10 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle size={28} className="animate-spin text-blue-400" />

          <p className="text-sm text-blue-100/70">
            Loading application form...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !applicationDocument) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-red-400/20 bg-red-500/[0.08] p-6 text-center shadow-xl backdrop-blur-xl">
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-300">
          <AlertCircle size={30} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">
          Unable to load application form
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-red-100/60">
          We could not retrieve the applicant's application form. Please try
          again later.
        </p>
      </div>
    );
  }

  const applicantName = getApplicantName(applicationDocument.applicant);

  return (
    <>
      <div className="space-y-5">
        {/* Main card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-5 shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:p-6">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex min-w-0 items-start gap-4">
              <div className="shrink-0 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-300">
                <FileText size={25} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Application Form
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                    <CheckCircle2 size={12} />
                    Generated
                  </span>
                </div>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-900/55">
                  Preview the applicant's submitted application information as a
                  formatted PDF document.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
            >
              <FileText size={17} />
              Preview PDF
            </button>
          </div>
        </div>

        {/* Applicant summary */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-lg shadow-blue-950/10 backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-2 text-blue-300">
              <UserRound size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Document Information
              </h3>

              <p className="mt-1 text-xs text-blue-100/45">
                Basic information associated with this document
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-700/20 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-blue-600/75">
                Applicant
              </p>

              <p className="mt-2 break-words text-sm font-medium text-slate-900">
                {applicantName}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-700/20 p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-blue-600/75">
                Application Reference
              </p>

              <p className="mt-2 break-all text-sm font-medium text-slate-900">
                {applicationDocument.application.id}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-700/20 p-4">
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-blue-300" />

                <p className="text-[11px] font-medium uppercase tracking-wider text-blue-600/75">
                  Created Date
                </p>
              </div>

              <p className="mt-2 text-sm font-medium text-slate-900">
                {formatDate(applicationDocument.application.createdAt)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-700/20 p-4">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-blue-300" />

                <p className="text-[11px] font-medium uppercase tracking-wider text-blue-600/75">
                  Available Sections
                </p>
              </div>

              <p className="mt-2 text-sm font-medium text-slate-900">
                {sections.length} sections
              </p>
            </div>
          </div>
        </div>

        {/* Information notice */}
        <div className="flex items-start gap-3 rounded-2xl border border-blue-400/15 bg-blue-500/[0.07] p-4">
          <FileText size={17} className="mt-0.5 shrink-0 text-blue-300" />

          <p className="text-xs leading-5 text-slate-900/60">
            The generated PDF contains the applicant's application information.
            Recruitment comments and section statuses are not displayed in the
            document.
          </p>
        </div>
      </div>

      <ApplicationFormPreviewModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        documents={applicationDocument}
        sections={sections}
      />
    </>
  );
};

export default ApplicationFormDocument;
