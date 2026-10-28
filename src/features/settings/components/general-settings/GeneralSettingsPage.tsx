import { AlertCircle, Building2, LoaderCircle, Settings2 } from "lucide-react";
import {
  useGeneralSettings,
  useUpdateGeneralSettings,
} from "../../hooks/useGeneralSettings";
import GeneralSettingsForm from "./GeneralSettingsForm";

export default function GeneralSettingsPage() {
  const settingsQuery = useGeneralSettings();
  const updateMutation = useUpdateGeneralSettings();

  if (settingsQuery.isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="size-5 animate-spin text-blue-600" />
          Loading general settings...
        </div>
      </div>
    );
  }

  if (settingsQuery.isError) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
      >
        <AlertCircle className="mt-0.5 size-5 shrink-0" />
        <div>
          <p className="font-semibold">Unable to load general settings</p>
          <p className="mt-1">Check your connection and try again.</p>
          <button
            type="button"
            onClick={() => void settingsQuery.refetch()}
            className="mt-3 font-semibold underline underline-offset-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <header className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-sky-100 p-5 shadow-sm dark:border-blue-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/60 sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-blue-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-blue-300">
            <Building2 className="size-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                General settings
              </h1>
              <Settings2 className="size-4 text-blue-500" />
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Manage your organisation details, contact information, and website
              branding in one place.
            </p>
          </div>
        </div>
      </header>

      {!settingsQuery.data && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3 text-sm text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
          General settings have not been configured yet. Complete the form below
          to save your organisation settings.
        </div>
      )}

      <GeneralSettingsForm
        settings={settingsQuery.data ?? null}
        isSaving={updateMutation.isPending}
        onSave={async (values) => {
          await updateMutation.mutateAsync(values);
        }}
      />
    </div>
  );
}
