import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { RecruitmentApplicantListResponse } from "../types/recruitment.types";

/**
 * Props required by the RecruitmentPagination component.
 *
 * Pagination state comes from the backend response.
 * Changing the page is delegated to the parent through onPageChange.
 */
interface RecruitmentPaginationProps {
  /**
   * Pagination information returned by the recruitment API.
   */
  pagination?: RecruitmentApplicantListResponse["pagination"];

  /**
   * Called when the user selects another page.
   */
  onPageChange: (page: number) => void;
}

/**
 * Displays pagination controls for the recruitment applicant list.
 *
 * This component does not manage pagination state itself.
 * The current page comes from the backend response and the
 * parent updates the URL through useRecruitmentFilters().
 */
export default function RecruitmentPagination({
  pagination,
  onPageChange,
}: RecruitmentPaginationProps) {
  /*
   * Don't render pagination when there is no pagination data
   * or when there is only one page.
   *
   * There is no reason to show pagination controls when all
   * applicants already fit on a single page.
   */
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const {
    page,
    totalPages,
    total,
    pageSize,
  } = pagination;

  /**
   * Calculate the first and last visible applicant number.
   *
   * Example:
   * page = 2
   * pageSize = 20
   * total = 45
   *
   * Result:
   * Showing 21–40 of 45
   */
  const startItem = (page - 1) * pageSize + 1;

  const endItem = Math.min(
    page * pageSize,
    total,
  );

  /**
   * Move to the previous page.
   *
   * We protect against going below page 1 even though the
   * previous button is disabled there.
   */
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  /**
   * Move to the next page.
   *
   * We protect against going beyond the final page.
   */
  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* 
        Result count.

        This gives the manager context about how many applicants
        exist and which records are currently visible.
      */}
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-700">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-700">
          {total}
        </span>{" "}
        applicants
      </p>

      {/* 
        Pagination controls.

        We currently use Previous/Next rather than rendering
        every page number. This keeps the component compact and
        works well when there are many pages.
      */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={page <= 1}
          leftIcon={<ChevronLeft className="h-4 w-4" />}
        >
          Previous
        </Button>

        {/* 
          Current page indicator.
        */}
        <div className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-3 text-sm font-medium text-slate-700 backdrop-blur-md">
          {page} / {totalPages}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={page >= totalPages}
          rightIcon={<ChevronRight className="h-4 w-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}