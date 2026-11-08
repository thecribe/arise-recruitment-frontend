/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentPage.tsx
 *
 * Description:
 * Recruitment applicant management page.
 *
 * Responsibilities:
 * - Load recruitment filter/default data
 * - Manage URL-based recruitment filters
 * - Load applicants
 * - Compose the recruitment UI
 * -----------------------------------------------------------------------------
 */

import PageHeader from "@/components/ui/PageHeader";

import RecruitmentFilters from "../components/RecruitmentFilters";
import RecruitmentTable from "../components/RecruitmentTable";
import RecruitmentPagination from "../components/RecruitmentPagination";

import { useRecruitmentApplicants } from "../hooks/useRecruitmentApplicants";
import { useRecruitmentDefaultData } from "../hooks/useRecruitmentDefaultData";
import { useRecruitmentFilters } from "../hooks/useRecruitmentFilters";
import { useState } from "react";
import AddApplicantButton from "../components/applicants/AddApplicantButton";
import AddApplicantModal from "../components/applicants/AddApplicantModal";
import type { AddApplicantFormValues } from "../types/add-applicant.types";
import { useCreateApplicant } from "../hooks/useCreateApplicant";

export default function RecruitmentPage() {
  const [isAddApplicantOpen, setIsAddApplicantOpen] = useState(false);

  /**
   * Load the reference data required by the recruitment filters.
   *
   * The backend provides:
   * - Job types
   * - Application phases
   */
  const { data: defaultData, isLoading: isLoadingDefaultData } =
    useRecruitmentDefaultData();

  /**
   * Read and update the recruitment filters from the URL.
   *
   * Keeping the filters in the URL means:
   * - Refreshing the page preserves the filters
   * - Browser back/forward works naturally
   * - The filter state can be shared through the URL
   */
  const { filters, updateFilter, resetFilters } = useRecruitmentFilters();

  /**
   * Load applicants using the current filters.
   *
   * The filters are part of the React Query key, so changing
   * a filter automatically causes the appropriate applicant
   * query to run.
   */
  const {
    data: applicantsData,
    isLoading: isLoadingApplicants,
    isFetching: isFetchingApplicants,
    isError: isApplicantsError,
    refetch,
  } = useRecruitmentApplicants(filters);

  const createApplicantMutation = useCreateApplicant();

  const handleCreateApplicant = async (values: AddApplicantFormValues) => {
    await createApplicantMutation.mutateAsync(values);

    setIsAddApplicantOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Shared page heading */}
      <PageHeader
        title="Recruitment"
        description="Manage and review applicant applications."
      />
      <AddApplicantButton onClick={() => setIsAddApplicantOpen(true)} />

      {/* 
        Search and filter controls.

        Job types and application phases are supplied by the
        recruitment default-data request.
      */}
      <RecruitmentFilters
        filters={filters}
        jobTypes={defaultData?.jobTypes ?? []}
        phases={defaultData?.phases ?? []}
        isLoading={isLoadingDefaultData}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      {/* 
        Applicant list.

        RecruitmentTable owns the visual states for:
        - Loading
        - Error
        - Empty
        - Success
      */}
      <RecruitmentTable
        applicants={applicantsData?.data ?? []}
        isLoading={isLoadingApplicants}
        isFetching={isFetchingApplicants}
        isError={isApplicantsError}
        onRetry={refetch}
      />

      {/* 
        Pagination is rendered from the pagination metadata
        returned by the backend.
      */}
      <RecruitmentPagination
        pagination={applicantsData?.pagination}
        onPageChange={(page) => updateFilter("page", page)}
      />

      <AddApplicantModal
        open={isAddApplicantOpen}
        onClose={() => setIsAddApplicantOpen(false)}
        onSubmit={handleCreateApplicant}
        isSubmitting={createApplicantMutation.isPending}
      />
    </div>
  );
}
