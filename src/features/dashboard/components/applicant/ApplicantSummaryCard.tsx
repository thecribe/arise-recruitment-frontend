/**
 * -----------------------------------------------------------------------------
 * File: ApplicantSummaryCard.tsx
 * Description:
 * Applicant overview card displayed at the top of the dashboard.
 * -----------------------------------------------------------------------------
 */

import {
  BriefcaseBusiness,
  CalendarDays,
  CircleDot,
  Hash,
  Mail,
  UserRoundCheck,
} from "lucide-react";

import { GlassCard, UserAvatar } from "@/components/ui";
import type { ApplicantSummary } from "../../types/type";

interface ApplicantSummaryCardProps {
  applicant: ApplicantSummary;
}

export default function ApplicantSummaryCard({
  applicant,
}: ApplicantSummaryCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <UserAvatar
            name={`${applicant.firstName} ${applicant.lastName}`}
            image={applicant.avatar}
          />

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {applicant.firstName} {applicant.lastName}
            </h2>

            <p className="text-slate-500">{applicant.jobRole}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <InfoItem
            icon={Hash}
            label="Application ID"
            value={applicant.applicationNumber}
          />

          <InfoItem
            icon={CircleDot}
            label="Current Stage"
            value={applicant.currentStage}
          />

          <InfoItem
            icon={CalendarDays}
            label="Applied"
            value={applicant.appliedDate}
          />

          <InfoItem
            icon={BriefcaseBusiness}
            label="Role"
            value={applicant.jobRole}
          />

          <InfoItem
            icon={UserRoundCheck}
            label="Recruitment Manager"
            value={applicant.recruitmentManager}
          />

          <InfoItem icon={Mail} label="Email" value={applicant.email} />
        </div>
      </div>
    </GlassCard>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="rounded-xl bg-blue-100 p-2">
        <Icon className="h-4 w-4 text-blue-700" />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-1 font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}
