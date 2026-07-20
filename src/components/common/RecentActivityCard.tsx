import { GlassCard } from "@/components/ui";

import ActivityItem from "./ActivityItem";

export default function RecentActivityCard() {
  return (
    <GlassCard className="space-y-4 p-6">
      <ActivityItem
        title="New applicant submitted"
        description="John Smith applied for Registered Nurse."
        time="5 mins ago"
      />

      <ActivityItem
        title="Compliance uploaded"
        description="DBS certificate uploaded."
        time="20 mins ago"
      />

      <ActivityItem
        title="Application approved"
        description="Sarah Jones completed Stage 4."
        time="1 hour ago"
      />
    </GlassCard>
  );
}
