import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../services/dashboard.service";
import { dashboardApi } from "../api/dashboard.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["applicant-dashboard"],

    queryFn: () => dashboardApi.getApplicantDashboard(),
  });
};

export const useManagerDashboard = () =>
  useQuery({
    queryKey: ["manager-dashboard"],
    queryFn: () => dashboardService.getManagerDashboard(),
  });

export const useAdminDashboard = () =>
  useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => dashboardService.getAdminDashboard(),
  });
