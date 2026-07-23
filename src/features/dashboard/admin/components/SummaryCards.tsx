import { useNavigate } from "react-router-dom";
import StatCard from "../../components/StatCard";
import type { AdminSummary } from "../../types/admin-dashboard";

interface Props {
  summary: AdminSummary;
}

const SummaryCards = ({ summary }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Applicants"
        value={summary.totalApplicants}
        onClick={() => navigate("/recruitment?status=submitted")}
      />

      <StatCard
        title="Approved Staff"
        value={summary.approvedStaff}
        onClick={() => navigate("/staff?status=approved")}
      />

      <StatCard
        title="Managers"
        value={summary.activeManagers}
        onClick={() => navigate("/managers")}
      />

      <StatCard
        title="Pending Compliance"
        value={summary.pendingCompliance}
        onClick={() => navigate("/compliance?status=pending")}
      />
    </div>
  );
};

export default SummaryCards;
