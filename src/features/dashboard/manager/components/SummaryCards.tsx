import { ROUTES } from "@/constants/routes";
import StatCard from "../../components/StatCard";
import type { ManagerSummary } from "../../types/manager-dashboard";
import { useNavigate } from "react-router-dom";

interface Props {
  summary: ManagerSummary;
}

const SummaryCards = ({ summary }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Pending Reviews"
        value={summary.pendingReviews}
        onClick={() => navigate(`${ROUTES.RECRUITMENT.ROOT}?status=submitted`)}
      />

      <StatCard
        title="Returned Phases"
        value={summary.returnedPhases}
        onClick={() => navigate(`${ROUTES.RECRUITMENT.ROOT}?status=submitted`)}
      />

      <StatCard
        title="Approved Today"
        value={summary.approvedToday}
        onClick={() => navigate(`${ROUTES.RECRUITMENT.ROOT}?status=submitted`)}
      />

      <StatCard
        title="Active Applicants"
        value={summary.activeApplicants}
        onClick={() => navigate(`${ROUTES.RECRUITMENT.ROOT}?status=submitted`)}
      />
    </div>
  );
};

export default SummaryCards;
