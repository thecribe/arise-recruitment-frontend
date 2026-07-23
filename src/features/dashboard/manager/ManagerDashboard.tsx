import DashboardHeader from "../components/DashboardHeader";

import { useManagerDashboard } from "../hooks/useDashboard";
import PhaseReviewQueue from "./components/PhaseReviewQueue";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import SummaryCards from "./components/SummaryCards";
import WelcomeBanner from "./components/WelcomeBanner";

const ManagerDashboard = () => {
  const { data, isPending } = useManagerDashboard();

  if (isPending || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader title="Dashboard" description="Recruitment overview" />

      <WelcomeBanner
        managerName="Sarah Williams"
        pendingReviews={data.summary.pendingReviews}
      />

      <SummaryCards summary={data.summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <PhaseReviewQueue phases={data.phaseQueue} />

        <RecentActivity activities={data.recentActivities} />
      </div>

      <QuickActions />
    </div>
  );
};

export default ManagerDashboard;
