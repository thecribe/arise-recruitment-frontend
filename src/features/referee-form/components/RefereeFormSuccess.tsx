import { CheckCircle2, ShieldCheck } from "lucide-react";

const RefereeFormSuccess = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-white/60 bg-white/80 p-6 text-center shadow-xl shadow-blue-900/5 backdrop-blur-xl sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 size={42} className="text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Reference submitted successfully
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Thank you for providing this professional reference. Your response has
          been received and will be reviewed by the Airse recruitment team.
        </p>

        <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-blue-600" />

            <div>
              <p className="text-sm font-semibold text-blue-900">
                Your response is secure
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                Your submitted information will be handled confidentially as
                part of the applicant's recruitment process.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-7 text-xs text-slate-400">
          You may now safely close this page.
        </p>
      </div>
    </div>
  );
};

export default RefereeFormSuccess;
