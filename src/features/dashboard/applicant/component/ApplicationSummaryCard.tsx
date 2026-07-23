import { Button } from "@/components/ui/button";

import DashboardCard from "../../components/DashboardCard";
import ProgressBar from "../../components/ProgressBar";
import StatusBadge from "../../components/StatusBadge";

import type { ApplicantDashboard } from "../../types/applicant-dashboard";
import { useNavigate } from "react-router-dom";

interface Props {
  dashboard: ApplicantDashboard;
}

const ApplicationSummaryCard = ({ dashboard }: Props) => {
  const { currentPhase, overallProgress, nextAction } = dashboard;
  const navigate = useNavigate();

  return (
    <DashboardCard>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current Phase</p>

            <h2 className="text-2xl font-bold">{currentPhase.title}</h2>

            {currentPhase.description && (
              <p className="max-w-xl text-muted-foreground">
                {currentPhase.description}
              </p>
            )}
          </div>

          <StatusBadge status={currentPhase.status} />
        </div>

        <ProgressBar value={overallProgress} />

        <div className="flex justify-end ">
          <Button
            onClick={() => navigate(nextAction.route)}
            disabled={nextAction.disabled}
            className="cursor-pointer"
          >
            {nextAction.label}
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ApplicationSummaryCard;
