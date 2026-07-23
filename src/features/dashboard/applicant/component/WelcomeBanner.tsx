import DashboardCard from "../../components/DashboardCard";
import StatusBadge from "../../components/StatusBadge";

import type { ApplicantDashboard } from "../../types/applicant-dashboard";

interface Props {
  applicantName: string;
  dashboard: ApplicantDashboard;
}

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";

  if (hour < 18) return "Good Afternoon";

  return "Good Evening";
};

const WelcomeBanner = ({ applicantName, dashboard }: Props) => {
  return (
    <DashboardCard className="overflow-hidden bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-sky-100">{getGreeting()},</p>

          <h1 className="text-4xl font-bold">{applicantName}</h1>

          <p className="text-sky-100">Registered Nurse Recruitment</p>
        </div>

        <div className="space-y-3 rounded-2xl bg-white/10 p-5 backdrop-blur">
          <p className="text-sm text-sky-100">Current Phase</p>

          <h2 className="text-xl font-semibold">
            {dashboard.currentPhase.title}
          </h2>

          <StatusBadge status={dashboard.currentPhase.status} />
        </div>
      </div>
    </DashboardCard>
  );
};

export default WelcomeBanner;
