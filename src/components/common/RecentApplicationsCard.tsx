import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui";

const applicants = [
  {
    name: "John Smith",
    role: "Registered Nurse",
    stage: "Compliance",
  },
  {
    name: "Sarah Jones",
    role: "Healthcare Assistant",
    stage: "Interview",
  },
  {
    name: "Michael Brown",
    role: "Support Worker",
    stage: "Application Review",
  },
];

export default function RecentApplicationsCard() {
  return (
    <GlassCard className="divide-y divide-slate-100">
      {applicants.map((applicant) => (
        <div
          key={applicant.name}
          className="flex items-center justify-between p-5"
        >
          <div>
            <h4 className="font-medium text-slate-900">{applicant.name}</h4>

            <p className="text-sm text-slate-500">{applicant.role}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {applicant.stage}
            </span>

            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </GlassCard>
  );
}
