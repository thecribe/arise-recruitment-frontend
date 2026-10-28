import { useEffect, useState } from "react";
import { Search, X, RotateCcw } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import ComplianceColumnSelector from "../components/ComplianceColumnSelector";
import ComplianceTable from "../components/ComplianceTable";
import { useComplianceApplicants } from "../hooks/useCompliance";
import { DEFAULT_VISIBLE_COLUMNS } from "../constants/compliance-columns";
import type { ComplianceFilters } from "../types/compliance.types";
import { useRecruitmentDefaultData } from "@/features/recruitment/hooks/useRecruitmentDefaultData";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const STORAGE_KEY = "airse-compliance-visible-columns";
const SEARCH_DEBOUNCE_MS = 300;

const DEFAULT_FILTERS: ComplianceFilters = {
  page: 1,
  limit: 10,
  search: "",
  job_type_id: "",
};

export default function CompliancePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ComplianceFilters>({
    ...DEFAULT_FILTERS,
  });

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...DEFAULT_VISIBLE_COLUMNS,
  ]);

  const [searchInput, setSearchInput] = useState("");

  const { data: defaultData, isLoading: isLoadingDefaultData } =
    useRecruitmentDefaultData();

  const jobTypes = defaultData?.jobTypes ?? [];

  // Load saved column preferences.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (
          Array.isArray(parsed) &&
          parsed.every((column) => typeof column === "string")
        ) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setVisibleColumns(parsed);
        }
      }
    } catch {
      // Keep default columns if storage is unavailable or invalid.
    }
  }, []);

  // Save column preferences.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleColumns));
    } catch {
      // The page remains usable if storage is unavailable.
    }
  }, [visibleColumns]);

  // Debounce text search so the API is not called for every keystroke.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFilters((current) => {
        if (current.search === searchInput) return current;

        return {
          ...current,
          search: searchInput.trim(),
          page: 1,
        };
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const { data, isLoading, isFetching, isError, refetch } =
    useComplianceApplicants(filters);

  const trainingRequirements = data?.trainingRequirements ?? [];

  const handleJobTypeChange = (jobTypeId: string) => {
    setFilters((current) => ({
      ...current,
      job_type_id: jobTypeId,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters({ ...DEFAULT_FILTERS });
  };

  const handleColumnChange = (columns: string[]) => {
    setVisibleColumns([...new Set(columns)]);
  };

  const handlePageChange = (page: number) => {
    setFilters((current) => ({
      ...current,
      page,
    }));
  };

  const hasActiveFilters =
    searchInput.trim().length > 0 || filters.job_type_id !== "";

  const handleApplicantClick = (applicantId: string) => {
    const path = ROUTES.RECRUITMENT.APPLICANT.replace(
      ":applicantId",
      applicantId,
    );

    navigate(path);
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-5">
      <PageHeader
        title="General Compliance"
        description="Monitor staff compliance, missing requirements, and certificate expiry dates."
      />

      <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:max-w-3xl">
          {/* Applicant name / postcode search */}
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search name or postcode..."
              aria-label="Search applicants by name or postcode"
              className="h-10 w-full rounded-xl border border-blue-100 bg-white/70 pl-9 pr-9 text-sm text-slate-700 shadow-sm outline-none backdrop-blur-md transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            />

            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Job type filter */}
          <select
            value={filters.job_type_id}
            onChange={(event) => handleJobTypeChange(event.target.value)}
            disabled={isLoadingDefaultData}
            aria-label="Filter by job type"
            className="h-10 w-full min-w-0 rounded-xl border border-blue-100 bg-white/70 px-3 text-sm text-slate-700 shadow-sm outline-none backdrop-blur-md transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {isLoadingDefaultData ? "Loading job types..." : "All job types"}
            </option>

            {jobTypes.map((jobType) => (
              <option key={jobType.id} value={String(jobType.id)}>
                {jobType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-blue-100 bg-white/70 px-3 text-sm text-slate-600 transition hover:bg-blue-50"
            >
              <RotateCcw className="h-4 w-4" />
              Clear filters
            </button>
          )}

          <ComplianceColumnSelector
            visibleColumns={visibleColumns}
            trainingColumns={trainingRequirements.map((requirement) => ({
              id: `training.${requirement.id}`,
              label: requirement.name,
            }))}
            onChange={handleColumnChange}
          />
        </div>
      </div>

      <div className="min-w-0 max-w-full">
        <ComplianceTable
          applicants={data?.data ?? []}
          visibleColumns={visibleColumns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          onRetry={() => void refetch()}
          trainingRequirements={trainingRequirements}
          onApplicantClick={handleApplicantClick}
        />
      </div>

      {data?.pagination && data.pagination.totalPages > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing page {data.pagination.page} of {data.pagination.totalPages}{" "}
            · {data.pagination.total} applicants
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={data.pagination.page <= 1 || isFetching}
              onClick={() => handlePageChange(data.pagination.page - 1)}
              className="rounded-lg border border-blue-100 bg-white/70 px-3 py-2 text-sm text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                data.pagination.page >= data.pagination.totalPages || isFetching
              }
              onClick={() => handlePageChange(data.pagination.page + 1)}
              className="rounded-lg border border-blue-100 bg-white/70 px-3 py-2 text-sm text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
