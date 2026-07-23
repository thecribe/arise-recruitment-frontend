import { AlertCircle, CheckCircle2, Clock3, Loader } from "lucide-react";

import { useApplicationContext } from "../context/ApplicationContext";
import { SECTION_STATUS } from "../constants/section-status";

export default function ReviewPanel() {
  const { activeApplicantSection } = useApplicationContext();

  const status = activeApplicantSection.status;

  /**
   * Hide while editing a draft or before the section has been submitted.
   */
  if (status === SECTION_STATUS.LOCKED || status === SECTION_STATUS.DRAFT) {
    return null;
  }

  const config = {
    [SECTION_STATUS.SUBMITTED]: {
      icon: Clock3,
      title: "Awaiting Review",
      containerClass: "border-amber-200 bg-amber-50 text-amber-800",
      iconClass: "text-amber-600",
    },
    [SECTION_STATUS.IN_PROGRESS]: {
      icon: Loader,
      title: "In Progress",
      containerClass: "border-amber-200 bg-amber-50 text-amber-800",
      iconClass: "text-amber-600",
    },

    [SECTION_STATUS.APPROVED]: {
      icon: CheckCircle2,
      title: "Section Approved",
      containerClass: "border-green-200 bg-green-50 text-green-800",
      iconClass: "text-green-600",
    },

    [SECTION_STATUS.REJECTED]: {
      icon: AlertCircle,
      title: "Changes Requested",
      containerClass: "border-red-200 bg-red-50 text-red-800",
      iconClass: "text-red-600",
    },
  };

  const current = config[status];

  const Icon = current.icon;

  return (
    <section className={`rounded-2xl border p-5 ${current.containerClass}`}>
      <div className="flex gap-4">
        <Icon className={`mt-1 h-6 w-6 ${current.iconClass}`} />

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{current.title}</h3>

          {activeApplicantSection.recruiterComment && (
            <div className="rounded-xl bg-white/60 p-3">
              <p className="text-sm">
                {activeApplicantSection.recruiterComment}
              </p>
            </div>
          )}

          {activeApplicantSection.approvedAt && (
            <p className="text-sm opacity-80">
              Reviewed on{" "}
              {new Date(activeApplicantSection.approvedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
