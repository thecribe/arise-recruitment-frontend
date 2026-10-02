import {
  AlertCircle,
  //   CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";

interface RightToWorkVerificationResponseModalProps {
  response: unknown;
  onClose: () => void;
}

type VerificationResponse = {
  outcome?: string | null;
  title?: string | null;
  name?: string | null;
  date_of_birth?: string | null;
  details?: string | null;
  nationality?: string | null;
  permission_type?: string | null;
  start_date?: string | null;
  expiry_date?: string | null;
  recheck_date?: string | null;
  conditions?: string[] | null;
  restrictions?: string[] | null;
  reference?: string | null;
  company_name?: string | null;
  check_date?: string | null;
  share_code?: string | null;
  photo_data_url?: string | null;
  pdf_data_url?: string | null;
  checked_at?: string | null;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not provided";

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "Not provided";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return (
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(date) + " UTC"
  );
};

const getString = (value: unknown) =>
  typeof value === "string" && value.trim() ? value : null;

function Detail({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-100">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default function RightToWorkVerificationResponseModal({
  response,
  onClose,
}: RightToWorkVerificationResponseModalProps) {
  const data =
    response && typeof response === "object"
      ? (response as VerificationResponse)
      : {};

  const accepted = data.outcome === "ACCEPTED";
  const rejected = data.outcome === "REJECTED";

  const photoUrl = getString(data.photo_data_url);
  const pdfUrl = getString(data.pdf_data_url);

  const conditions = Array.isArray(data.conditions)
    ? data.conditions.filter((item): item is string => typeof item === "string")
    : [];

  const restrictions = Array.isArray(data.restrictions)
    ? data.restrictions.filter(
        (item): item is string => typeof item === "string",
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rtw-modal-title"
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-blue-200/70 bg-white shadow-2xl dark:border-blue-900/60 dark:bg-slate-900"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-700 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="rtw-modal-title"
                className="font-semibold text-slate-900 dark:text-white"
              >
                Right to Work Verification
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                External verification response
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          {/* Outcome */}
          <section
            className={`rounded-xl border p-4 ${
              accepted
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/60 dark:bg-emerald-950/30"
                : rejected
                  ? "border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/30"
                  : "border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {accepted ? (
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
              ) : rejected ? (
                <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
              ) : (
                <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
              )}

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Verification outcome
                </p>
                <h3
                  className={`mt-1 text-lg font-semibold ${
                    accepted
                      ? "text-emerald-700 dark:text-emerald-300"
                      : rejected
                        ? "text-red-700 dark:text-red-300"
                        : "text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {data.outcome || "Outcome unavailable"}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {data.details || "No additional details provided."}
                </p>
              </div>
            </div>
          </section>

          {/* Applicant and check details */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Applicant details
            </h3>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="Name" value={data.name} />
              <Detail
                label="Date of birth"
                value={formatDate(data.date_of_birth)}
              />
              <Detail label="Share code" value={data.share_code} />
              <Detail label="Check type" value={data.title} />
              <Detail label="Nationality" value={data.nationality} />
              <Detail label="Permission type" value={data.permission_type} />
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Permission and check dates
            </h3>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700 sm:grid-cols-2 lg:grid-cols-3">
              <Detail
                label="Permission start date"
                value={formatDate(data.start_date)}
              />
              <Detail
                label="Permission expiry date"
                value={formatDate(data.expiry_date)}
              />
              <Detail
                label="Recheck date"
                value={formatDate(data.recheck_date)}
              />
              <Detail label="Check date" value={formatDate(data.check_date)} />
              <Detail label="Company" value={data.company_name} />
              <Detail label="Reference" value={data.reference} />
            </div>
          </section>

          {/* Conditions */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Work conditions
            </h3>

            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              {conditions.length > 0 ? (
                <ul className="list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {conditions.map((condition, index) => (
                    <li key={`${condition}-${index}`}>{condition}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No work conditions returned.
                </p>
              )}
            </div>
          </section>

          {/* Restrictions */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Restrictions
            </h3>

            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              {restrictions.length > 0 ? (
                <ul className="list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {restrictions.map((restriction, index) => (
                    <li key={`${restriction}-${index}`}>{restriction}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No restrictions returned.
                </p>
              )}
            </div>
          </section>

          {/* Photo */}
          {photoUrl && (
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <ImageIcon className="h-4 w-4 text-blue-600" />
                Applicant photo
              </h3>

              <div className="flex justify-center rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
                <img
                  src={photoUrl}
                  alt="Applicant photo from Right to Work check"
                  className="max-h-72 max-w-full rounded-lg object-contain shadow-sm"
                />
              </div>
            </section>
          )}

          {/* PDF */}
          {pdfUrl && (
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <FileText className="h-4 w-4 text-blue-600" />
                Verification PDF
              </h3>

              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 dark:bg-slate-800/70">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="h-5 w-5 shrink-0 text-red-500" />
                    <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                      Right to Work verification.pdf
                    </span>
                  </div>

                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-blue-950"
                  >
                    Open PDF
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <iframe
                  src={pdfUrl}
                  title="Right to Work verification PDF"
                  className="h-[420px] w-full bg-white"
                />
              </div>
            </section>
          )}

          {!photoUrl && !pdfUrl && (
            <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              No photo or PDF was included in this response.
            </div>
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock3 className="h-4 w-4" />
            Checked at: {formatDateTime(data.checked_at)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 px-4 py-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <a
            href="https://www.gov.uk/view-right-to-work"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            <ExternalLink className="h-4 w-4" />
            Official RTW Check Website
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
