import { Button } from "@/components/ui/button";

import DashboardCard from "../../components/DashboardCard";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <DashboardCard>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>

        <div className="grid gap-3 md:grid-cols-4">
          <Button
            onClick={() => navigate("/recruitment")}
            className="cursor-pointer"
          >
            Recruitment
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/staff")}
            className="cursor-pointer"
          >
            Staff
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/compliance")}
            className="cursor-pointer"
          >
            Compliance
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/settings")}
            className="cursor-pointer"
          >
            Settings
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default QuickActions;
