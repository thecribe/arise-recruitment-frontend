import { CheckCircle2, Layers3, ListChecks } from "lucide-react";

import { useApplicationContext } from "../../context/ApplicationContext";
import { PHASE_STATUS } from "../../constants/phase-status";

export default function ProgressCard() {
  const { applicantApplication, currentPhase, currentSection } =
    useApplicationContext();

  const totalPhases = applicantApplication.phases.length;

  const completedPhases = applicantApplication.phases.filter(
    (phase) => phase.status === PHASE_STATUS.APPROVED,
  ).length;

  return (
    <section
      className="
        rounded-3xl
        border border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-lg
        p-5
        sm:p-6
      "
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Progress */}
        <div className="rounded-2xl bg-white/30 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Overall Progress
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${applicantApplication.progress}%`,
              }}
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-blue-700">
            {applicantApplication.progress}%
          </p>
        </div>

        {/* Current Phase */}
        <div className="flex gap-3 rounded-2xl bg-white/30 p-4">
          <div className="rounded-xl bg-blue-500/10 p-2.5">
            <Layers3 className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Current Phase
            </p>

            <p className="font-semibold text-slate-900">{currentPhase.title}</p>
          </div>
        </div>

        {/* Current Section */}
        <div className="flex gap-3 rounded-2xl bg-white/30 p-4">
          <div className="rounded-xl bg-blue-500/10 p-2.5">
            <ListChecks className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Current Section
            </p>

            <p className="font-semibold text-slate-900">
              {currentSection.title}
            </p>
          </div>
        </div>

        {/* Completed */}
        <div className="flex gap-3 rounded-2xl bg-white/30 p-4">
          <div className="rounded-xl bg-green-500/10 p-2.5">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Completed Phases
            </p>

            <p className="font-semibold text-slate-900">
              {completedPhases} / {totalPhases}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
