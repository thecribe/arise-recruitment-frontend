import { FileText } from "lucide-react";

import { useApplicationContext } from "../../context/ApplicationContext";

export default function ApplicationHeader() {
  const {
    applicantApplication,
    currentPhase,
    activeSection,
    activeApplicantSection,
  } = useApplicationContext();

  return (
    <section
      className="
        rounded-3xl
        border border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-lg
        px-5
        py-4
        sm:px-6
        sm:py-5
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* ------------------------------------------------------------------ */}
        {/* Application Information                                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex items-start gap-4 min-w-0">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-500/15
              text-blue-600
            "
          >
            <FileText className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Application
            </h1>

            <p className="text-base font-semibold text-blue-700 sm:text-lg">
              {currentPhase.title}
            </p>

            {currentPhase.description && (
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {currentPhase.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                {activeSection.title}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                {activeApplicantSection.status}
              </span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Progress                                                           */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white/40
            px-4
            py-3
            lg:min-w-[180px]
            lg:flex-col
            lg:items-end
            lg:bg-transparent
            lg:p-0
          "
        >
          <span className="text-sm text-slate-500">Overall Progress</span>

          <span className="text-2xl font-bold text-blue-700 sm:text-3xl">
            {applicantApplication.progress}%
          </span>
        </div>
      </div>
    </section>
  );
}
