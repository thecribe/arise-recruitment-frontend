import { instance } from "@/api/client";

import type {
  ComplianceApiResponse,
  ComplianceFilters,
  ComplianceListResponse,
} from "../types/compliance.types";

const BASE_URL = "/compliance";

const getApplicants = async (
  filters: ComplianceFilters,
): Promise<ComplianceListResponse> => {
  const response = await instance.get<
    ComplianceApiResponse<ComplianceListResponse>
  >(BASE_URL, {
    params: {
      page: filters.page,
      limit: filters.limit,
      search: filters.search || undefined,
      job_type_id: filters.job_type_id || undefined,
    },
  });

  return response.data.data;
};

export const complianceApi = {
  getApplicants,
};
