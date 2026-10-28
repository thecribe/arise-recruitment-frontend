import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { complianceApi } from "../api/compliance.api";
import type { ComplianceFilters } from "../types/compliance.types";

export const complianceKeys = {
  all: ["compliance"] as const,

  applicants: (filters: ComplianceFilters) =>
    [...complianceKeys.all, "applicants", filters] as const,
};

export const useComplianceApplicants = (filters: ComplianceFilters) => {
  return useQuery({
    queryKey: complianceKeys.applicants(filters),
    queryFn: () => complianceApi.getApplicants(filters),
    placeholderData: keepPreviousData,
  });
};
