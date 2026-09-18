import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <div
      className="
        flex min-h-[420px] items-center justify-center
        rounded-2xl
        border border-blue-200/60
        bg-white/40
        p-8
        text-center
        shadow-sm
        backdrop-blur-xl
        dark:border-blue-400/20
        dark:bg-slate-900/30
      "
    >
      <div className="max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200/70 bg-blue-50/70 text-blue-600 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
          <Settings className="h-7 w-7" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
          Application Settings
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Select a settings category from the menu to configure your recruitment
          application.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
