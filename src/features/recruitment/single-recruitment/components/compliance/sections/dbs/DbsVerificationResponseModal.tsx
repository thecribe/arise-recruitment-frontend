import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Info,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

interface DbsVerificationResponse {
  statusCheckResultType?: string;
  status?: string;
  forename?: string;
  surname?: string;
  printDate?: {
    "#text"?: string;
    "@_class"?: string;
  } | null;
  statusCheckingResponse?: string;
  meaning?: string;
}

interface DbsVerificationResponseModalProps {
  response: DbsVerificationResponse | null;
  onClose: () => void;
}

const DBS_STATUS_CONFIG = {
  BLANK_NO_NEW_INFO: {
    title: "Certificate is current",
    subtitle: "No new information found",
    description:
      "This DBS certificate did not reveal any information and remains current as no further information has been identified since its issue.",
    meaning:
      "The individual's DBS certificate contains no criminal record information and no new information has come to light since its issue.",
    icon: CheckCircle2,
    color: "emerald",
  },
  NON_BLANK_NO_NEW_INFO: {
    title: "Certificate is current",
    subtitle: "No new information found",
    description:
      "This DBS certificate remains current as no further information has been identified since its issue.",
    meaning:
      "The individual's DBS certificate contains criminal record information, but no new information has come to light since its issue.",
    icon: ShieldCheck,
    color: "blue",
  },
  NEW_INFO: {
    title: "New information available",
    subtitle: "A new DBS check is required",
    description:
      "This DBS Certificate is no longer current. Please apply for a new DBS check to get the most up-to-date information.",
    meaning:
      "The individual's DBS certificate should not be relied upon as new information is now available. You should request a new DBS certificate.",
    icon: AlertTriangle,
    color: "amber",
  },
} as const;

type DbsStatus = keyof typeof DBS_STATUS_CONFIG;

export default function DbsVerificationResponseModal({
  response,
  onClose,
}: DbsVerificationResponseModalProps) {
  if (!response) return null;

  const status = response.status;

  const statusConfig =
    status && status in DBS_STATUS_CONFIG
      ? DBS_STATUS_CONFIG[status as DbsStatus]
      : null;

  const isSuccessful = response.statusCheckResultType === "SUCCESS";

  const StatusIcon = statusConfig?.icon ?? Info;
  const color = statusConfig?.color ?? "slate";

  const applicantName = [response.forename, response.surname]
    .filter(Boolean)
    .join(" ");

  const bannerColors = !isSuccessful
    ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30"
    : color === "emerald"
      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30"
      : color === "blue"
        ? "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30"
        : color === "amber"
          ? "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30"
          : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60";

  const iconColors = !isSuccessful
    ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
    : color === "emerald"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
      : color === "blue"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
        : color === "amber"
          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
          : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";

  const badgeColors = !isSuccessful
    ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
    : color === "emerald"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
      : color === "blue"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
        : color === "amber"
          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
          : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dbs-response-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/30 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3.5 dark:border-slate-700 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2
                id="dbs-response-title"
                className="font-semibold text-slate-900 dark:text-white"
              >
                DBS Verification Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                DBS Update Check result
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close response"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          {/* Result banner */}
          <div className={`rounded-xl border p-4 ${bannerColors}`}>
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconColors}`}
              >
                {!isSuccessful ? (
                  <ShieldAlert className="h-5 w-5" />
                ) : (
                  <StatusIcon className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {!isSuccessful
                      ? "Verification unsuccessful"
                      : (statusConfig?.title ?? "Unrecognized DBS status")}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeColors}`}
                  >
                    {!isSuccessful
                      ? "Unsuccessful"
                      : (statusConfig?.subtitle ?? "Unknown status")}
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {!isSuccessful
                    ? "The verification service did not return a successful result. Review the response before proceeding."
                    : (statusConfig?.description ??
                      "The service returned an unrecognized DBS status. Review the response before proceeding.")}
                </p>
              </div>
            </div>
          </div>

          {/* Applicant details */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Applicant details
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/40 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full name
                </p>
                <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-100">
                  {applicantName || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Certificate date
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-800 dark:text-slate-100">
                  <CalendarDays className="h-4 w-4 text-slate-400" />
                  {response.printDate?.["#text"] || "Not provided"}
                </p>
              </div>
            </div>
          </section>

          {/* Meaning */}
          {isSuccessful && statusConfig && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  What this means
                </h3>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {response.meaning || statusConfig.meaning}
                </p>
              </div>
            </section>
          )}

          {/* Service response */}
          {response.statusCheckingResponse && (
            <section>
              <div className="mb-2 flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Status checking response
                </h3>
              </div>

              <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
                {response.statusCheckingResponse}
              </p>
            </section>
          )}

          {/* Technical details */}
          <section className="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Verification details
            </h3>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Service result
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {response.statusCheckResultType || "Not provided"}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                DBS status
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {response.status || "Not provided"}
              </span>
            </div>
          </section>

          {isSuccessful && !statusConfig && (
            <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              This response contains a status that is not recognized by the
              application. Review it before making a compliance decision.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 px-4 py-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <a
            href="https://secure.crbonline.gov.uk/crsc/check?execution=e1s1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            <ExternalLink className="h-4 w-4" />
            Official DBS Website
          </a>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Close report
          </button>
        </div>
      </div>
    </div>
  );
}
