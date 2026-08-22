/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentFilters.tsx
 *
 * Description:
 * Filter controls for the Recruitment applicant list.
 *
 * Filters:
 * - Application status
 * - Applicant search
 * - Job type
 * - Current application phase
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

import GlassCard from "@/components/ui/GlassCard";
import SearchInput from "@/components/ui/SearchInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { RotateCcw } from "lucide-react";

import { useDebounce } from "@/hooks/use-debounce";

import type { ApplicationPhase } from "@/features/application/types";

import type {
  JobType,
  RecruitmentApplicantFilters,
  RecruitmentApplicantStatus,
} from "../types/recruitment.types";

interface RecruitmentFiltersProps {
  /**
   * Current Recruitment filters.
   */
  filters: RecruitmentApplicantFilters;

  /**
   * Job types returned by the backend.
   */
  jobTypes: JobType[];

  /**
   * Application phases returned by the application definition service.
   */
  phases: ApplicationPhase[];

  /**
   * Indicates that default filter data is loading.
   */
  isLoading?: boolean;

  /**
   * Update a single filter.
   */
  onFilterChange: (
    key: keyof RecruitmentApplicantFilters,
    value: string | number | RecruitmentApplicantStatus | undefined,
  ) => void;

  /**
   * Reset all filters.
   */
  onReset: () => void;
}

/**
 * Display labels for application lifecycle statuses.
 *
 * The actual values are used internally for filtering,
 * while these labels are what the user sees.
 */
const applicationStatusLabels: Record<RecruitmentApplicantStatus, string> = {
  IN_PROGRESS: "Active Applicants",
  REJECTED: "Rejected Applicants",
  APPROVED: "Approved Applicants",
};

export default function RecruitmentFilters({
  filters,
  jobTypes,
  phases,
  isLoading = false,
  onFilterChange,
  onReset,
}: RecruitmentFiltersProps) {
  /**
   * Keep search input local so typing remains immediate.
   */
  const [search, setSearch] = useState(filters.search ?? "");

  /**
   * Wait until the user stops typing before updating
   * the URL and triggering a new query.
   */
  const debouncedSearch = useDebounce(search, 500);

  /**
   * Update the search filter after the debounce period.
   */
  useEffect(() => {
    const currentSearch = filters.search ?? "";

    if (debouncedSearch === currentSearch) {
      return;
    }

    onFilterChange("search", debouncedSearch || undefined);
  }, [debouncedSearch, filters.search, onFilterChange]);

  /**
   * Keep the local search input synchronized with
   * changes made outside the input.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(filters.search ?? "");
  }, [filters.search]);

  return (
    <GlassCard className="p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* ----------------------------------------------------------------- */}
        {/* Application status */}
        {/* ----------------------------------------------------------------- */}

        <Select
          value={filters.status ?? "IN_PROGRESS"}
          onValueChange={(value) => {
            onFilterChange("status", value as RecruitmentApplicantStatus);
          }}
        >
          <SelectTrigger
            className="w-full lg:w-48 h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm,
          focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <SelectValue placeholder="Application Status">
              {applicationStatusLabels[filters.status ?? "IN_PROGRESS"]}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="IN_PROGRESS">Active Applicants</SelectItem>

            <SelectItem value="REJECTED">Rejected Applicants</SelectItem>

            <SelectItem value="APPROVED">Approved Applicants</SelectItem>
          </SelectContent>
        </Select>

        {/* ----------------------------------------------------------------- */}
        {/* Applicant search */}
        {/* ----------------------------------------------------------------- */}

        <SearchInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search applicants..."
          containerClassName="max-w-none flex-1"
        />

        {/* ----------------------------------------------------------------- */}
        {/* Job type */}
        {/* ----------------------------------------------------------------- */}

        <Select
          value={filters.jobTypeId ?? ""}
          onValueChange={(value) =>
            onFilterChange("jobTypeId", value || undefined)
          }
          disabled={isLoading}
        >
          <SelectTrigger
            className="w-full lg:w-48 h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm,
          focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <SelectValue
              placeholder={isLoading ? "Loading job types..." : "Job Type"}
            />
          </SelectTrigger>

          <SelectContent>
            {jobTypes.map((jobType) => (
              <SelectItem key={jobType.id} value={jobType.id}>
                {jobType.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ----------------------------------------------------------------- */}
        {/* Current application phase */}
        {/* ----------------------------------------------------------------- */}

        <Select
          value={filters.phaseId ?? ""}
          onValueChange={(value) =>
            onFilterChange("phaseId", value || undefined)
          }
          disabled={isLoading}
        >
          <SelectTrigger
            className="w-full lg:w-48 h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm,
          focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <SelectValue
              placeholder={isLoading ? "Loading stages..." : "Current Stage"}
            />
          </SelectTrigger>

          <SelectContent>
            {phases.map((phase) => (
              <SelectItem key={phase.id} value={phase.id}>
                {phase.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ----------------------------------------------------------------- */}
        {/* Reset */}
        {/* ----------------------------------------------------------------- */}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Reset
        </Button>
      </div>
    </GlassCard>
  );
}
