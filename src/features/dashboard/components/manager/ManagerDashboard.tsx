import { FileSearch, ShieldCheck, Users } from "lucide-react";

import { PageHeader, Section } from "@/components/ui";
import RecentApplicationsCard from "@/components/common/RecentApplicationsCard";
import RecentActivityCard from "@/components/common/RecentActivityCard";
import QuickActionCard from "@/components/common/QuickActionCard";

export default function ManagerDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Good Morning, John 👋"
        description="Recruitment Manager Dashboard"
      />

      <Section title="Recent Applications">
        <RecentApplicationsCard />
      </Section>

      <Section title="Recent Activity">
        <RecentActivityCard />
      </Section>

      <Section title="Quick Actions">
        <div className="space-y-4">
          <QuickActionCard
            title="Review Applications"
            description="Process pending applications."
            icon={FileSearch}
          />

          <QuickActionCard
            title="Compliance Queue"
            description="Review compliance documents."
            icon={ShieldCheck}
          />

          <QuickActionCard
            title="Manage Staff"
            description="View approved staff."
            icon={Users}
          />
        </div>
      </Section>
    </div>
  );
}
