import { Button } from "@/components/ui/button";

import DashboardCard from "../../components/DashboardCard";

const QuickActions = () => {
  return (
    <DashboardCard>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>

        <div className="grid gap-3 sm:grid-cols-3">
          <Button className="w-full">Pending Reviews</Button>

          <Button variant="outline" className="w-full">
            Recruitment
          </Button>

          <Button variant="outline" className="w-full">
            Compliance
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default QuickActions;
