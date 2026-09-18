import type { TrainingCertificateRequirement } from "../../types/training-certificate-requirement.types";

import TrainingCertificateRequirementCard from "./TrainingCertificateRequirementCard";

interface TrainingCertificateRequirementListProps {
  requirements: TrainingCertificateRequirement[];
  onEdit: (requirement: TrainingCertificateRequirement) => void;
  onToggleStatus: (requirement: TrainingCertificateRequirement) => void;
}

const TrainingCertificateRequirementList = ({
  requirements,
  onEdit,
  onToggleStatus,
}: TrainingCertificateRequirementListProps) => {
  if (!requirements.length) {
    return (
      <div
        className="
          flex min-h-[260px] items-center justify-center
          rounded-2xl
          border border-dashed border-blue-200/70
          bg-white/20
          px-6 py-10
          text-center
          dark:border-blue-400/20
          dark:bg-slate-900/20
        "
      >
        <div className="max-w-sm">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
            No training certificates configured
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Add your first mandatory training certificate requirement to make it
            available during recruitment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requirements.map((requirement) => (
        <TrainingCertificateRequirementCard
          key={requirement.id}
          requirement={requirement}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TrainingCertificateRequirementList;
