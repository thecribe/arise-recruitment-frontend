import { ROUTES } from "@/constants/routes";
import DashboardCard from "../../components/DashboardCard";

import type { ManagerActivity } from "../../types/manager-dashboard";
import { useNavigate } from "react-router-dom";

interface Props {
  activities: ManagerActivity[];
}

const RecentActivity = ({ activities }: Props) => {
  const navigate = useNavigate();
  return (
    <DashboardCard>
      <div className="space-y-5">
        <h3 className="text-lg font-semibold">Recent Activity</h3>

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-b pb-4 last:border-none cursor-pointer"
            onClick={() =>
              navigate(`${ROUTES.RECRUITMENT.ROOT}/${activity.applicantId}`)
            }
          >
            <p className="font-medium">{activity.applicantName}</p>

            <p className="text-sm text-muted-foreground">
              {activity.action} • {activity.phase}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {activity.createdAt}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RecentActivity;
