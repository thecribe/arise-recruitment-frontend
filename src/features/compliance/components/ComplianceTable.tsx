import { AlertCircle, ChevronRight, Users } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import {
  APPLICANT_COLUMN,
  COMPLIANCE_COLUMN_GROUPS,
  SINGLE_COMPLIANCE_COLUMNS,
  type ComplianceColumn,
} from "../constants/compliance-columns";

import type {
  ComplianceApplicant,
  TrainingRequirement,
} from "../types/compliance.types";

interface ComplianceTableProps {
  applicants: ComplianceApplicant[];
  visibleColumns: string[];
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  onRetry: () => void;
  trainingRequirements: {
    id: string;
    name: string;
  }[];
  onApplicantClick: (applicantId: string) => void;
}

const getValue = (data: unknown, fieldName: string): unknown => {
  if (!data || typeof data !== "object") {
    return undefined;
  }

  return (data as Record<string, unknown>)[fieldName];
};

const hasValue = (value: unknown): boolean => {
  if (value == null || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
};

const displayValue = (value: unknown, type?: string) => {
  if (type === "date" && typeof value === "string") {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Invalid date";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date < today ? (
      <span className="inline-flex rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600 text">
        Expired
      </span>
    ) : (
      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
        Valid
      </span>
    );
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "Available";
};

function ComplianceValue({ value, type }: { value: unknown; type?: string }) {
  if (!hasValue(value)) {
    return (
      <span className="inline-flex rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">
        Missing
      </span>
    );
  }

  return (
    <span className="text-sm text-green-700">{displayValue(value, type)}</span>
  );
}

function TrainingCell({
  requirement,
  applicant,
}: {
  requirement: { id: string; name: string };
  applicant: ComplianceApplicant;
}) {
  const training = applicant.compliance.training;

  const item = training.requirements.find(
    (entry: TrainingRequirement) => entry.requirementId === requirement.id,
  );

  if (!item?.uploaded || item.certificates.length === 0) {
    return (
      <span className="inline-flex rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">
        Missing
      </span>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const certificates = item.certificates;
  const expired = certificates.some((certificate) => {
    if (!certificate.expiryDate) return false;

    const expiry = new Date(`${certificate.expiryDate}T00:00:00`);
    return !Number.isNaN(expiry.getTime()) && expiry < today;
  });

  const expiringSoon = certificates.some((certificate) => {
    if (!certificate.expiryDate) return false;

    const expiry = new Date(`${certificate.expiryDate}T00:00:00`);
    const daysRemaining = (expiry.getTime() - today.getTime()) / 86_400_000;

    return (
      !Number.isNaN(expiry.getTime()) &&
      daysRemaining >= 0 &&
      daysRemaining <= 30
    );
  });

  if (expired) {
    return (
      <span className="inline-flex rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">
        Expired
      </span>
    );
  }

  if (expiringSoon) {
    return (
      <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
        Expiring soon
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
      Uploaded
    </span>
  );
}

export default function ComplianceTable({
  applicants,
  visibleColumns,
  isLoading,
  isFetching = false,
  isError,
  onRetry,
  trainingRequirements,
  onApplicantClick,
}: ComplianceTableProps) {
  if (isLoading) {
    return <ComplianceTableSkeleton />;
  }

  if (isError) {
    return (
      <GlassCard className="p-8">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="mb-3 h-9 w-9 text-rose-500" />
          <h3 className="text-base font-semibold text-slate-900">
            Unable to load compliance
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            We couldn't retrieve the compliance records. Please try again.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={onRetry}
          >
            Try again
          </Button>
        </div>
      </GlassCard>
    );
  }

  if (applicants.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-8 w-8 text-blue-500" />}
        title="No compliance records found"
        description="No approved applicants match your current search or filters."
      />
    );
  }

  const visible = (id: string) => visibleColumns.includes(id);

  const visibleGroups = COMPLIANCE_COLUMN_GROUPS.map((group) => ({
    ...group,
    columns: group.columns.filter((column) => visible(column.id)),
  })).filter((group) => group.columns.length > 0);

  const visibleTraining = trainingRequirements.filter((requirement) =>
    visible(`training.${requirement.id}`),
  );

  const visibleSingles = SINGLE_COMPLIANCE_COLUMNS.filter((column) =>
    visible(column.id),
  );

  const totalColumns =
    1 +
    visibleGroups.reduce((total, group) => total + group.columns.length, 0) +
    visibleTraining.length +
    visibleSingles.length;

  return (
    <GlassCard className="w-full min-w-0 max-w-full overflow-hidden p-0">
      <div className="relative min-w-0 max-w-full">
        {isFetching && (
          <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-blue-100">
            <div className="h-full w-1/3 animate-pulse bg-blue-500" />
          </div>
        )}

        <div
          className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain"
          role="region"
          aria-label="Applicant compliance table"
          tabIndex={0}
        >
          <table className="w-max min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50/70">
                <th
                  rowSpan={2}
                  className="sticky left-0 z-20 min-w-[210px] border-r border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  {APPLICANT_COLUMN.label}
                </th>

                {visibleGroups.map((group) => (
                  <th
                    key={group.id}
                    colSpan={group.columns.length}
                    className="border-r border-blue-100 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-blue-800"
                  >
                    {group.label}
                  </th>
                ))}

                {visibleTraining.length > 0 && (
                  <th
                    colSpan={visibleTraining.length}
                    className="border-r border-blue-100 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-blue-800"
                  >
                    Mandatory Training
                  </th>
                )}

                {visibleSingles.map((column) => (
                  <th
                    key={column.id}
                    rowSpan={2}
                    className="min-w-[135px] border-r border-blue-100 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>

              <tr className="border-b border-slate-200/70 bg-white/60">
                {visibleGroups.map((group) =>
                  group.columns.map((column) => (
                    <th
                      key={column.id}
                      className="min-w-[145px] border-r border-slate-200/70 px-3 py-3 text-xs font-medium text-slate-500"
                    >
                      {column.label}
                    </th>
                  )),
                )}

                {visibleTraining.map((requirement) => (
                  <th
                    key={requirement.id}
                    className="min-w-[150px] border-r border-slate-200/70 px-3 py-3 text-xs font-medium text-slate-500"
                  >
                    {requirement.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/60">
              {applicants.map((applicant) => (
                <tr
                  key={applicant.applicationId}
                  className="group hover:bg-blue-50/40"
                >
                  <td className="sticky left-0 z-10 min-w-[210px] border-r border-slate-200/70 bg-white px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onApplicantClick(applicant.id)}
                      className="flex min-w-[175px] items-center gap-2.5 text-left"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                        {applicant.firstName?.[0]}
                        {applicant.lastName?.[0]}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-800">
                          {applicant.fullName}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {applicant.postcode}
                        </span>
                      </span>

                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600" />
                    </button>
                  </td>

                  {visibleGroups.flatMap((group) =>
                    group.columns.map((column: ComplianceColumn) => {
                      const section =
                        group.id === "identity"
                          ? applicant.compliance.identity
                          : applicant.compliance.professionalMemberships;

                      return (
                        <td
                          key={column.id}
                          className="border-r border-slate-200/50 px-3 py-3"
                        >
                          <ComplianceValue
                            value={getValue(section, column.fieldName ?? "")}
                          />
                        </td>
                      );
                    }),
                  )}

                  {visibleTraining.map((requirement) => (
                    <td
                      key={requirement.id}
                      className="border-r border-slate-200/50 px-3 py-3"
                    >
                      <TrainingCell
                        requirement={requirement}
                        applicant={applicant}
                      />
                    </td>
                  ))}

                  {visibleSingles.map((column) => (
                    <td
                      key={column.id}
                      className="border-r border-slate-200/50 px-3 py-3"
                    >
                      {column.id === "rightToWork" ? (
                        <ComplianceValue
                          value={
                            applicant.compliance.rightToWork
                              ? applicant.compliance.rightToWork
                                  .rightToWorkExpiryDate
                              : null
                          }
                          type="date"
                        />
                      ) : column.id === "dbs" ? (
                        <ComplianceValue
                          value={
                            applicant.compliance.dbs
                              ? applicant.compliance.dbs.expiryDate
                              : null
                          }
                          type="date"
                        />
                      ) : (
                        <span className="text-xs text-slate-600">
                          {applicant.compliance.references.responsesReceived}/
                          {applicant.compliance.references.total} received
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200/70 px-4 py-2">
          <p className="text-xs text-slate-500">
            {applicants.length} applicants on this page · {totalColumns} visible
            columns
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function ComplianceTableSkeleton() {
  return (
    <GlassCard className="overflow-hidden p-4">
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </GlassCard>
  );
}
