import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useComplianceSummaryDocument } from "../hooks/useComplianceSummaryDocument";
import type {
  ComplianceRecord,
  ComplianceSummaryDocument as ComplianceSummaryDocumentType,
} from "../types/document.types";
import ComplianceSummaryPreviewModal from "../pdf/ComplianceSummaryPreviewModal";

interface ComplianceSummaryDocumentProps {
  applicationId: string;
}

const getApplicantName = (
  applicant: ComplianceSummaryDocumentType["applicant"],
): string => {
  if (!applicant) return "Applicant";

  if (typeof applicant.fullName === "string" && applicant.fullName.trim()) {
    return applicant.fullName;
  }

  const firstName =
    typeof applicant.first_name === "string" ? applicant.first_name : "";
  const lastName =
    typeof applicant.last_name === "string" ? applicant.last_name : "";

  return `${firstName} ${lastName}`.trim() || "Applicant";
};

const formatDate = (value: unknown): string => {
  if (typeof value !== "string" || !value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatLabel = (key: string): string =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") return value ? "Yes" : "No";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.length ? `${value.length} item(s)` : "None";
  }

  return "Available";
};

const getSectionValues = (
  values: ComplianceRecord | undefined,
): [string, unknown][] =>
  Object.entries(values ?? {}).filter(
    ([, value]) => value !== undefined && value !== null && value !== "",
  );

const StatusPill = ({ status }: { status: string }) => {
  const normalized = status.toLowerCase();

  const approved = normalized === "approved";
  const rejected = normalized === "rejected";
  const pending = normalized === "in_progress" || normalized === "pending";

  const className = approved
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : rejected
      ? "border-red-200 bg-red-50 text-red-700"
      : pending
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-blue-100 bg-blue-50 text-blue-700";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {formatLabel(status || "not_started")}
    </span>
  );
};

const SummaryCard = ({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: typeof ShieldCheck;
}) => (
  <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm shadow-blue-950/5 backdrop-blur-xl sm:p-5">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-2.5 text-blue-600">
        <Icon size={19} />
      </div>
    </div>
  </div>
);

const ComplianceSectionCard = ({
  title,
  status,
  values,
  description,
}: {
  title: string;
  status: string;
  values: ComplianceRecord;
  description: string;
}) => {
  const entries = getSectionValues(values);

  return (
    <section className="rounded-2xl border border-white/60 bg-white/75 p-4 shadow-sm shadow-blue-950/5 backdrop-blur-xl sm:p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
        <StatusPill status={status} />
      </div>

      {entries.length ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="min-w-0 rounded-xl border border-blue-50 bg-blue-50/40 p-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {formatLabel(key)}
              </p>
              <p className="mt-1 break-words text-sm font-medium text-slate-800">
                {formatValue(value)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl bg-slate-50 px-3 py-4 text-xs text-slate-500">
          No compliance values have been provided for this section.
        </p>
      )}
    </section>
  );
};

const ComplianceSummaryDocument = ({
  applicationId,
}: ComplianceSummaryDocumentProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    data: document,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useComplianceSummaryDocument(applicationId);

  if (isLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle size={28} className="animate-spin text-blue-600" />
          <p className="text-sm text-slate-500">
            Loading compliance summary...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !document) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-red-200 bg-red-50/70 p-6 text-center">
        <div className="rounded-2xl bg-red-100 p-3 text-red-600">
          <AlertCircle size={28} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          Unable to load compliance summary
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          The applicant&apos;s compliance information could not be retrieved.
          Please try again.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isFetching && <LoaderCircle size={15} className="animate-spin" />}
          Try again
        </button>
      </div>
    );
  }

  const { summary, sections, trainingCertificates, references } = document;
  const applicantName = getApplicantName(document.applicant);

  const rightToWorkValues = {
    ...(sections.rightToWork.applicantValues ?? {}),
    ...(sections.rightToWork.managerValues ?? {}),
  };

  const dbsValues = sections.dbs.managerValues ?? {};

  const membershipValues = sections.professionalMemberships.values ?? {};

  return (
    <>
      <div className="space-y-5">
        <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50/80 p-5 shadow-sm shadow-blue-950/5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex min-w-0 items-start gap-3">
              <div className="shrink-0 rounded-2xl border border-blue-100 bg-blue-50 p-3 text-blue-600">
                <ShieldCheck size={25} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Compliance Summary
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    <CheckCircle2 size={12} />
                    Summary available
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Review compliance information, training requirements, and
                  reference responses for {applicantName}.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:w-auto"
            >
              <FileText size={17} />
              Preview PDF
            </button>
          </div>

          <div className="relative mt-5 grid grid-cols-1 gap-3 border-t border-blue-100/80 pt-4 sm:grid-cols-2">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Applicant
              </p>
              <p className="mt-1 break-words text-sm font-medium text-slate-800">
                {applicantName}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Application reference
              </p>
              <p className="mt-1 break-all text-sm font-medium text-slate-800">
                {document.application.id}
              </p>
            </div>
            {/* <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Submitted
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {formatDate(document.application.submittedAt)}
              </p>
            </div> */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Generated
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {formatDate(document.generatedAt)}
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Uploaded certificates"
            value={summary.uploadedCertificateCount}
            description="Training certificates on record"
            icon={FileText}
          />
          <SummaryCard
            label="Missing requirements"
            value={summary.missingMandatoryCertificateCount}
            description="Active mandatory certificates not uploaded"
            icon={AlertCircle}
          />
          <SummaryCard
            label="Responses received"
            value={summary.receivedReferenceResponses}
            description={`Of ${summary.totalReferences} references`}
            icon={CheckCircle2}
          />
          <SummaryCard
            label="Pending responses"
            value={summary.pendingReferenceResponses}
            description="References awaiting a response"
            icon={Clock3}
          />
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-blue-600" />
          <h3 className="text-base font-semibold text-slate-900">
            Compliance sections
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ComplianceSectionCard
            title="Identity Compliance"
            status={sections.identityCompliance.status}
            values={sections.identityCompliance.values}
            description="Identity and address verification information."
          />
          <ComplianceSectionCard
            title="Right to Work"
            status={sections.rightToWork.status}
            values={rightToWorkValues}
            description="Applicant declarations and manager verification details."
          />
          <ComplianceSectionCard
            title="DBS"
            status={sections.dbs.status}
            values={dbsValues}
            description="Manager-recorded DBS check and expiry information."
          />
          <ComplianceSectionCard
            title="Professional Memberships"
            status={sections.professionalMemberships.status}
            values={membershipValues}
            description="Professional registration and membership details."
          />
        </div>

        <section className="rounded-2xl border border-white/60 bg-white/75 p-4 shadow-sm shadow-blue-950/5 backdrop-blur-xl sm:p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-2.5 text-blue-600">
              <FileText size={19} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900">
                Training Certificates
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {trainingCertificates.uploaded.length} uploaded certificate(s)
                and {trainingCertificates.missingMandatoryRequirements.length}{" "}
                outstanding mandatory requirement(s).
              </p>
            </div>
          </div>

          {trainingCertificates.uploaded.length > 0 && (
            <div className="mt-4 divide-y divide-slate-100">
              {trainingCertificates.uploaded.map((certificate) => (
                <div
                  key={certificate.id}
                  className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="break-words text-sm font-medium text-slate-800">
                      {certificate.certificate_name ??
                        certificate.certificateName ??
                        "Training certificate"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Certificate number:{" "}
                      {certificate.certificate_number ??
                        certificate.certificateNumber ??
                        "Not provided"}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs text-slate-500">
                    Expires{" "}
                    {formatDate(
                      certificate.expiry_date ?? certificate.expiryDate,
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {trainingCertificates.missingMandatoryRequirements.length > 0 ? (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
              <p className="text-xs font-semibold text-amber-800">
                Outstanding mandatory requirements
              </p>
              <ul className="mt-2 space-y-2">
                {trainingCertificates.missingMandatoryRequirements.map(
                  (requirement) => (
                    <li key={requirement.id} className="text-sm text-amber-900">
                      <span className="font-medium">{requirement.name}</span>
                      {requirement.description && (
                        <span className="mt-0.5 block text-xs text-amber-800/80">
                          {requirement.description}
                        </span>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-700">
              <CheckCircle2 size={15} />
              No missing active mandatory certificate requirements.
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/60 bg-white/75 p-4 shadow-sm shadow-blue-950/5 backdrop-blur-xl sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-2.5 text-blue-600">
                <Users size={19} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  References
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {references.length} reference(s) on record
                </p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {summary.receivedReferenceResponses} received
            </span>
          </div>

          {references.length ? (
            <div className="mt-4 space-y-3">
              {references.map((reference) => {
                const received = reference.responseStatus === "received";

                return (
                  <div
                    key={reference.id}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 bg-white/70 p-3 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0">
                      <p className="break-words text-sm font-medium text-slate-800">
                        {reference.companyName || "Company not provided"}
                      </p>
                      <p className="mt-1 break-words text-xs text-slate-500">
                        {reference.refereeName || "Referee not provided"}
                        {reference.refereeRelationship
                          ? ` · ${reference.refereeRelationship}`
                          : ""}
                      </p>
                    </div>
                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                        received
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {received ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock3 size={12} />
                      )}
                      {received ? "Response received" : "Response pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No references are recorded for this application.
            </p>
          )}
        </section>

        <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-xs leading-5 text-slate-600">
          <CalendarDays size={15} className="mt-0.5 shrink-0 text-blue-600" />
          <p>
            This summary reflects the compliance data returned by the server at
            the time it was generated. Review the source documents before making
            compliance decisions.
          </p>
        </div>
      </div>

      <ComplianceSummaryPreviewModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        document={document}
      />
    </>
  );
};

export default ComplianceSummaryDocument;
