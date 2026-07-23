import { Navigate } from "react-router-dom";

import ApplicantDashboard from "./applicant/ApplicantDashboard";

import PageLoader from "@/components/feedback/page-loader";
import { ROLE_CODES } from "@/constants/roles";
import { useCurrentUser } from "../auth/hooks/use-auth";
import ManagerDashboard from "./manager/ManagerDashboard";
import AdminDashboard from "./admin/AdminDashboard";

const DashboardPage = () => {
  const { data: user, isPending } = useCurrentUser();

  if (isPending) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case ROLE_CODES.APPLICANT:
      return <ApplicantDashboard />;

    case ROLE_CODES.RECRUITMENT_MANAGER:
      return <ManagerDashboard />;

    case ROLE_CODES.ADMIN:
      return <AdminDashboard />;

    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default DashboardPage;
