import { Navigate, useLocation } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

import { useAdminDashboard } from "../hooks/useDashboard";
import QuickActions from "./components/QuickActions";
import RecruitmentPipeline from "./components/RecruitmentPipeline";
import SummaryCards from "./components/SummaryCards";
import WelcomeBanner from "./components/WelcomeBanner";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { ROUTES } from "@/constants/routes";
import { adminRoles } from "@/constants/roles";

const AdminDashboard = () => {
  const { data, isPending } = useAdminDashboard();
  const { data: user } = useCurrentUser();
  const location = useLocation();

  if (isPending || !data) {
    return <div>Loading...</div>;
  }
  if (user && adminRoles.includes(user.role)) {
    return (
      <Navigate
        to={ROUTES.RECRUITMENT.ROOT}
        replace
        state={{
          from: location,
        }}
      />
    );
  }
  return (
    <div className="space-y-8">
      <DashboardHeader title="Dashboard" description="Organisation overview" />

      <WelcomeBanner adminName="System Administrator" />

      <SummaryCards summary={data.summary} />

      <RecruitmentPipeline pipeline={data.pipeline} />

      <QuickActions />
    </div>
  );
};

export default AdminDashboard;
