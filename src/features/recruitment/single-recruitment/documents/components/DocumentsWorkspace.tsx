import { FileText, Menu } from "lucide-react";

import type { DocumentView } from "./DocumentsSidebar";
import ApplicationFormDocument from "./ApplicationFormDocument";
import { InterviewScoresheetDocument } from "./InterviewScoresheetDocument";
import UploadedDocumentsDocument from "./UploadedDocumentsDocument";

interface DocumentsWorkspaceProps {
  activeView: DocumentView;
  onOpenMobileSidebar: () => void;
  applicationId: string;
}

const viewDetails: Record<
  DocumentView,
  {
    title: string;
    description: string;
  }
> = {
  "application-form": {
    title: "Application Form",
    description:
      "Review and generate a PDF from the applicant's submitted information.",
  },
  "interview-scoresheet": {
    title: "Interview Scoresheet",
    description:
      "Generate a document containing the applicant's interview assessment.",
  },
  "interview-notes": {
    title: "Interview Notes",
    description:
      "Review and generate a document containing recruitment interview notes.",
  },
  "compliance-summary": {
    title: "Compliance Summary",
    description:
      "Generate a summary of the applicant's compliance information.",
  },
  "uploaded-documents": {
    title: "Uploaded Documents",
    description:
      "Upload, preview, download, and manage manager-uploaded documents.",
  },
};

const DocumentsWorkspace = ({
  activeView,
  onOpenMobileSidebar,
  applicationId,
}: DocumentsWorkspaceProps) => {
  const details = viewDetails[activeView];

  return (
    <main className="min-w-0 flex-1">
      <div className="flex items-center gap-3 border-b border-white/60 px-4 py-4 sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open documents navigation"
          className="rounded-xl border border-blue-100 bg-white/70 p-2 text-slate-600 shadow-sm"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-xs text-slate-400">Documents</p>
          <h2 className="text-sm font-semibold text-slate-800">
            {details.title}
          </h2>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-blue-600">
              <FileText size={15} />
              <span>Applicant Documents</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {details.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {details.description}
            </p>
          </div>
        </div>

        {activeView === "application-form" && (
          <ApplicationFormDocument applicationId={applicationId} />
        )}

        {activeView === "interview-scoresheet" && (
          <InterviewScoresheetDocument applicationId={applicationId} />
        )}

        {activeView === "interview-notes" && (
          <EmptyDocumentState
            title="Interview Notes"
            description="The interview notes document builder will be connected here."
          />
        )}

        {activeView === "compliance-summary" && (
          <EmptyDocumentState
            title="Compliance Summary"
            description="The compliance summary document builder will be connected here."
          />
        )}

        {activeView === "uploaded-documents" && (
          <UploadedDocumentsDocument applicationId={applicationId} />
        )}
      </div>
    </main>
  );
};

const EmptyDocumentState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <FileText size={28} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-800">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default DocumentsWorkspace;
