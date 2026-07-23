import { ChevronRight } from "lucide-react";

import DashboardCard from "../../components/DashboardCard";

import type { ManagerPhaseQueue } from "../../types/manager-dashboard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface Props {
  phases: ManagerPhaseQueue[];
}

const PhaseReviewQueue = ({ phases }: Props) => {
  const navigate = useNavigate();
  return (
    <DashboardCard>
      <div className="space-y-5">
        <h3 className="text-lg font-semibold">Reviews by Phase</h3>

        {phases.map((phase) => (
          <button
            key={phase.id}
            className="flex w-full items-center justify-between rounded-xl border p-4 transition hover:bg-muted cursor-pointer"
            onClick={() => {
              // Handle phase click event
              navigate(
                `${ROUTES.RECRUITMENT.ROOT}?phase=${phase.id}&status=submitted`,
              );
            }}
          >
            <div>
              <p className="font-medium">{phase.title}</p>

              <p className="text-sm text-muted-foreground">
                {phase.pending} awaiting review
              </p>
            </div>

            <ChevronRight className="h-5 w-5" />
          </button>
        ))}
      </div>
    </DashboardCard>
  );
};

export default PhaseReviewQueue;
