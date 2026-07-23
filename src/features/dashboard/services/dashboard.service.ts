import { adminDashboardMock } from "../mocks/admin-dashboard.mock";
import { applicantDashboardMock } from "../mocks/applicant-dashboard.mock";
import { managerDashboardMock } from "../mocks/manager-dashboard.mock";

class DashboardService {
  async getApplicantDashboard() {
    return applicantDashboardMock;
  }

  async getManagerDashboard() {
    return managerDashboardMock;
  }

  async getAdminDashboard() {
    return adminDashboardMock;
  }
}

export const dashboardService = new DashboardService();
