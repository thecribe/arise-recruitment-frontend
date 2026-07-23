import DashboardHeader from "../components/DashboardHeader";

import { useAdminDashboard } from "../hooks/useDashboard";
import QuickActions from "./components/QuickActions";
import RecruitmentPipeline from "./components/RecruitmentPipeline";
import SummaryCards from "./components/SummaryCards";
import WelcomeBanner from "./components/WelcomeBanner";

const AdminDashboard = () => {
  const { data, isPending } = useAdminDashboard();

  if (isPending || !data) {
    return <div>Loading...</div>;
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