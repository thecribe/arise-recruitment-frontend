import DashboardCard from "../../components/DashboardCard";
import JourneyPhaseItem from "./JourneyPhaseItem";

import type { ApplicantDashboardPhase } from "../../types/applicant-dashboard";

interface ApplicationJourneyProps {
  phases: ApplicantDashboardPhase[];
  onPhaseClick?: (phase: ApplicantDashboardPhase) => void;
}

const ApplicationJourney = ({
  phases,
  onPhaseClick,
}: ApplicationJourneyProps) => {
  return (
    <DashboardCard>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Application Journey</h3>

          <p className="text-sm text-muted-foreground">
            Track the progress of your application through each recruitment
            phase.
          </p>
        </div>

        <div className="space-y-6">
          {phases.map((phase, index) => (
            <JourneyPhaseItem
              key={phase.id}
              phase={phase}
              isLast={index === phases.length - 1}
              onClick={() => onPhaseClick?.(phase)}
            />
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default ApplicationJourney;
