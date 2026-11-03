import { AlertCircle } from "lucide-react";

interface RefereeFormErrorProps {
  onRetry?: () => void;
}

const RefereeFormError = ({ onRetry }: RefereeFormErrorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4 dark:from-slate-950 dark:to-blue-950">
      <div className="w-full max-w-md rounded-2xl border border-blue-200/60 bg-white/70 p-8 text-center shadow-xl backdrop-blur-xl dark:border-blue-400/20 dark:bg-slate-900/70">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
          <AlertCircle className="h-7 w-7" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
          Reference Link Unavailable
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          This reference link is invalid, expired or has already been used.
          Please contact the recruitment team if you need assistance.
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        )}

        <p className="mt-6 text-xs text-slate-400">Airse Nursing Agency</p>
      </div>
    </div>
  );
};

export default RefereeFormError;
