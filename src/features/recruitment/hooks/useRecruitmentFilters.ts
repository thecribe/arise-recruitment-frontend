/**
 * -----------------------------------------------------------------------------
 * File: useRecruitmentFilters.ts
 *
 * Description:
 * Manages Recruitment applicant filters through URL search parameters.
 *
 * Keeping the filters in the URL allows:
 * - Browser back/forward navigation
 * - Refreshing without losing filters
 * - Sharing a filtered Recruitment URL
 * -----------------------------------------------------------------------------
 */

import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import type {
  RecruitmentApplicantFilters,
  RecruitmentApplicantStatus,
} from "../types/recruitment.types";

/**
 * Default Recruitment list configuration.
 */
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_STATUS: RecruitmentApplicantStatus = "IN_PROGRESS";

export function useRecruitmentFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Convert URL search parameters into the typed
   * Recruitment filter object.
   */
  const filters: RecruitmentApplicantFilters = {
    page: Number(searchParams.get("page") ?? DEFAULT_PAGE),

    pageSize: Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE),

    search: searchParams.get("search") || undefined,

    jobTypeId: searchParams.get("jobTypeId") || undefined,

    phaseId: searchParams.get("phaseId") || undefined,

    /**
     * Recruitment defaults to active/in-progress applicants.
     */
    status:
      (searchParams.get("status") as RecruitmentApplicantStatus) ??
      DEFAULT_STATUS,
  };

  /**
   * Update a single Recruitment filter.
   */
  const updateFilter = useCallback(
    (
      key: keyof RecruitmentApplicantFilters,
      value: string | number | RecruitmentApplicantStatus | undefined,
    ) => {
      const params = new URLSearchParams(searchParams);

      /**
       * Remove empty filter values from the URL.
       */
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      /**
       * Changing a filter should return the applicant
       * list to the first page.
       *
       * Pagination changes themselves do not reset the page.
       */
      if (key !== "page" && key !== "pageSize") {
        params.set("page", String(DEFAULT_PAGE));
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  /**
   * Reset all Recruitment filters.
   *
   * The default status remains IN_PROGRESS because the
   * Recruitment page should display active applications
   * by default.
   */
  const resetFilters = useCallback(() => {
    setSearchParams({
      page: String(DEFAULT_PAGE),
      pageSize: String(DEFAULT_PAGE_SIZE),
      status: DEFAULT_STATUS,
    });
  }, [setSearchParams]);

  return {
    filters,
    updateFilter,
    resetFilters,
  };
}
