import { MessageSquare } from "lucide-react";

import { GlassCard } from "@/components/ui";

export default function RecruiterCommentsCard() {
  return (
    <GlassCard className="p-6">
      <h3 className="mb-5 text-lg font-semibold">Recruiter Comments</h3>

      <div className="rounded-2xl bg-blue-50 p-4">
        <div className="flex gap-3">
          <MessageSquare className="mt-1 h-5 w-5 text-blue-600" />

          <div>
            <p className="font-medium">Emma Wilson</p>

            <p className="mt-2 text-sm text-slate-600">
              Your application looks great. Please upload your Enhanced DBS
              certificate to continue.
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
