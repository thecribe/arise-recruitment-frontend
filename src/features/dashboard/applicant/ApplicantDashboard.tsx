import DashboardHeader from "../components/DashboardHeader";

import { useDashboard } from "../hooks/useDashboard";

import WelcomeBanner from "./component/WelcomeBanner";
import ApplicationSummaryCard from "./component/ApplicationSummaryCard";
import RecruiterFeedbackCard from "./component/RecruiterFeedbackCard";
import ApplicationJourney from "./component/ApplicationJourney";
import PageLoader from "@/components/feedback/page-loader";
import { ROUTES } from "@/constants/routes";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { capitalize } from "@/utils/generalfunctions";
import { adminRoles } from "@/constants/roles";

const ApplicantDashboard = () => {
  const { data, isPending } = useDashboard();
  const location = useLocation();
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  if (isPending || !data || !user) {
    return <PageLoader />;
  }
  if (user && !adminRoles.includes(user.role)) {
    return (
      <Navigate
        to={ROUTES.APPLICATION.ROOT}
        replace
        state={{
          from: location,
        }}
      />
    );
  }
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Dashboard"
        description="Track your recruitment progress."
      />

      <WelcomeBanner
        applicantName={`${capitalize(user?.firstName) + " " + capitalize(user?.lastName)}`}
        job_type={user?.jobType?.name}
        dashboard={data}
      />

      <ApplicationSummaryCard dashboard={data} />

      <RecruiterFeedbackCard feedback={data.latestFeedback} />

      <ApplicationJourney
        phases={data.phases}
        onPhaseClick={(phase) =>
          navigate(`${ROUTES.APPLICATION.ROOT}?phase=${phase.id}`)
        }
      />
    </div>
  );
};

export default ApplicantDashboard;
