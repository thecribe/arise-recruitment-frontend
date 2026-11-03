import { LoaderCircle } from "lucide-react";

const RefereeFormLoading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/75 p-8 text-center shadow-xl shadow-blue-900/5 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
          <LoaderCircle size={28} className="animate-spin text-blue-600" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-slate-900">
          Loading reference form
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we securely retrieve the reference details.
        </p>
      </div>
    </div>
  );
};

export default RefereeFormLoading;
