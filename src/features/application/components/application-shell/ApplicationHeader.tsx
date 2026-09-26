import { CheckCircle2, FileText, Layers3 } from "lucide-react";

import { useApplicationContext } from "../../context/ApplicationContext";
import { PHASE_STATUS } from "../../constants/phase-status";

export default function ApplicationHeader() {
  const {
    applicantApplication,
    currentPhase,
    activeSection,
    activeApplicantSection,
  } = useApplicationContext();

  const totalPhases = applicantApplication.phases.length;

  const completedPhases = applicantApplication.phases.filter(
    (phase) => phase.status === PHASE_STATUS.APPROVED,
  ).length;
  return (
    <section
      className="
        rounded-3xl
        border border-white/20
        bg-white/70
        px-4
        py-4
        shadow-lg
        backdrop-blur-xl
        sm:px-5
      "
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* --------------------------------------------------------------- */}
        {/* Application / Phase Information                                 */}
        {/* --------------------------------------------------------------- */}
        <div className="flex min-w-1/2 items-start gap-3">
          {/* Icon */}
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-500/15
              text-blue-600
            "
          >
            <FileText className="h-5 w-5" />
          </div>

          {/* Information */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                Application
              </h1>

              <span className="text-slate-300">•</span>

              <span className="text-sm font-semibold text-blue-700 sm:text-base">
                {currentPhase.title}
              </span>
            </div>

            {currentPhase.description && (
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 sm:text-sm">
                {currentPhase.description}
              </p>
            )}

            {/* Current Section + Status */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span
                className="
                  rounded-full
                  bg-blue-100
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  text-blue-700
                "
              >
                {activeSection.title}
              </span>

              <span
                className="
                  rounded-full
                  bg-slate-100
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  capitalize
                  text-slate-600
                "
              >
                {activeApplicantSection.status}
              </span>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Progress Summary                                                 */}
        {/* --------------------------------------------------------------- */}
        <div
          className="
            flex
            items-center
            gap-5
            border-t
            border-slate-200/70
            pt-3
            lg:min-w-1/2
            lg:border-t-0
            lg:border-l
            lg:pl-5
            lg:pt-0
          "
        >
          {/* Current Phase */}
          <div className="hidden items-center gap-2.5 sm:flex">
            <div className="rounded-xl bg-blue-500/10 p-2">
              <Layers3 className="h-4 w-4 text-blue-600" />
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Phase
              </p>

              <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                {currentPhase.title}
              </p>
            </div>
          </div>

          {/* Completed */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="rounded-xl bg-green-500/10 p-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Completed
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {completedPhases}/{totalPhases}
              </p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Progress
              </p>

              <span className="text-lg font-bold text-blue-700">
                {applicantApplication.progress}%
              </span>
            </div>

            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="
                  h-full
                  rounded-full
                  bg-blue-600
                  transition-all
                  duration-500
                "
                style={{
                  width: `${applicantApplication.progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
