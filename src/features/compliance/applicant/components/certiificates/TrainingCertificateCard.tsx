import { CalendarDays, FileText, Pencil, Trash2 } from "lucide-react";
import type {
  ApplicantTrainingCertificate,
  TrainingCertificateRequirement,
} from "../../types/training-certificate.types";

interface TrainingCertificateCardProps {
  certificate: ApplicantTrainingCertificate;
  requirement?: TrainingCertificateRequirement;
  canEdit: boolean;
  onEdit: (certificate: ApplicantTrainingCertificate) => void;
  onDelete: (certificate: ApplicantTrainingCertificate) => void;
}

const formatDate = (date: string | null) => {
  if (!date || date === "0000-00-00") return "Not provided";

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export const TrainingCertificateCard = ({
  certificate,
  requirement,
  canEdit,
  onEdit,
  onDelete,
}: TrainingCertificateCardProps) => {
  const documentName = certificate.document?.name ?? "Certificate document";

  return (
    <article className="rounded-2xl border border-white/20 bg-white/60 p-4 shadow-sm backdrop-blur-xl transition hover:shadow-md dark:bg-slate-900/50 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="break-words font-semibold text-slate-900 dark:text-white">
              {certificate.certificate_name}
            </h3>

            {requirement && (
              <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                Mandatory certificate
              </p>
            )}

            {certificate.certificate_number && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Certificate No: {certificate.certificate_number}
              </p>
            )}
          </div>
        </div>

        {canEdit && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(certificate)}
              aria-label={`Edit ${certificate.certificate_name}`}
              className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-500/10"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(certificate)}
              aria-label={`Delete ${certificate.certificate_name}`}
              className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-3 border-t border-slate-200/70 pt-4 dark:border-slate-700/70 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Issue Date
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {formatDate(certificate.issue_date)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Expiry Date
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {formatDate(certificate.expiry_date)}
            </p>
          </div>
        </div>
      </div>

      {certificate.document && (
        <div className="mt-4 rounded-xl bg-slate-100/70 p-3 dark:bg-slate-800/60">
          <p className="truncate text-sm text-slate-700 dark:text-slate-200">
            {documentName}
          </p>

          {certificate.document.url && (
            <a
              href={certificate.document.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              View document
            </a>
          )}
        </div>
      )}
    </article>
  );
};

export default TrainingCertificateCard;
