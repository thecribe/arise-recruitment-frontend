interface RecruitmentHeaderProps {
  applicantCount?: number;
}

export function RecruitmentHeader({
  applicantCount,
}: RecruitmentHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Recruitment
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage and review applicant applications.
          </p>
        </div>

        {applicantCount !== undefined && (
          <div className="rounded-full border border-blue-200/60 bg-blue-50/70 px-3 py-1 text-sm font-medium text-blue-700 backdrop-blur-md dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
            {applicantCount} applicants
          </div>
        )}
      </div>
    </div>
  );
}