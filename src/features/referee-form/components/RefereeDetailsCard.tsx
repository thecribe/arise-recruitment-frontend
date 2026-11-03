import { Building2, CalendarDays, Mail, Phone, UserRound } from "lucide-react";

import type { RefereeFormDetails } from "../types/referee-form.types";

interface RefereeDetailsCardProps {
  details: RefereeFormDetails;
}

const formatDate = (date?: string | null): string => {
  if (!date) return "Not provided";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not provided";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value?: string | null;
}) => (
  <div className="flex min-w-0 items-start gap-3">
    <div className="mt-0.5 rounded-lg bg-blue-50 p-2 text-blue-600">
      <Icon size={16} />
    </div>

    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="break-words text-sm font-medium text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const RefereeDetailsCard = ({ details }: RefereeDetailsCardProps) => {
  const { applicant, reference } = details;

  return (
    <div className="space-y-5 rounded-2xl border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-xl sm:p-5">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <UserRound size={18} className="text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Applicant information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem
            icon={UserRound}
            label="Applicant name"
            value={`${applicant.firstName} ${applicant.lastName}`}
          />

          <DetailItem
            icon={Mail}
            label="Email address"
            value={applicant.email}
          />

          <DetailItem
            icon={Phone}
            label="Phone number"
            value={applicant.phoneNumber}
          />

          <DetailItem
            icon={Building2}
            label="Postcode"
            value={applicant.postcode}
          />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <div className="mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Employment details
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem
            icon={Building2}
            label="Organisation"
            value={reference.companyName}
          />

          <DetailItem
            icon={UserRound}
            label="Relationship"
            value={reference.refereeRelationship}
          />

          <DetailItem
            icon={CalendarDays}
            label="Employment start date"
            value={formatDate(reference.fromDate)}
          />

          <DetailItem
            icon={CalendarDays}
            label="Employment end date"
            value={formatDate(reference.toDate)}
          />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <div className="mb-4 flex items-center gap-2">
          <Mail size={18} className="text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Referee information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem
            icon={UserRound}
            label="Referee name"
            value={reference.refereeName}
          />

          <DetailItem
            icon={Mail}
            label="Referee email"
            value={reference.refereeEmail}
          />

          <DetailItem
            icon={Phone}
            label="Referee phone"
            value={reference.refereePhone}
          />
        </div>
      </div>
    </div>
  );
};

export default RefereeDetailsCard;
