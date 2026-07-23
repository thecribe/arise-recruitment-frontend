import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../services/dashboard.service";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["applicant-dashboard"],

    queryFn: () => dashboardService.getApplicantDashboard(),
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
