import { useState } from "react";
import { UserRound, ShieldCheck, BriefcaseBusiness } from "lucide-react";

import ProfileDetails from "./components/ProfileDetails";
import ProfileSecurity from "./components/ProfileSecurity";
import ProfileApplicationSettings from "./components/ProfileApplicationSettings";

type SettingsSection = "profile" | "security" | "application";

interface ApplicantProfileSettingsProps {
  applicantId: string;
  applicationId: string;
}

const navigation = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
    icon: UserRound,
  },
  {
    id: "security",
    label: "Security",
    description: "Email and password",
    icon: ShieldCheck,
  },
  {
    id: "application",
    label: "Application",
    description: "Account and application status",
    icon: BriefcaseBusiness,
  },
] satisfies {
  id: SettingsSection;
  label: string;
  description: string;
  icon: typeof UserRound;
}[];

export default function ApplicantProfileSettings({
  applicantId,
}: ApplicantProfileSettingsProps) {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const activeItem = navigation.find((item) => item.id === activeSection)!;

  const ActiveIcon = activeItem.icon;

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-5">
      {/* Header */}
      <div
        className="
          w-full rounded-2xl border
          border-blue-200/50 bg-white/40
          p-4 shadow-xl shadow-blue-900/5
          backdrop-blur-xl sm:p-5 lg:p-6
          dark:border-blue-400/20
          dark:bg-slate-900/30
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <BriefcaseBusiness size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-slate-100">
              Profile & Settings
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage applicant information and account settings.
            </p>
          </div>
        </div>
      </div>

      {/* Settings workspace */}
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        {/* Sidebar / Mobile navigation */}
        <aside
          className="
            w-full min-w-0
            rounded-2xl border
            border-blue-200/50 bg-white/40
            p-2.5 shadow-lg shadow-blue-900/5
            backdrop-blur-xl
            lg:w-64 lg:shrink-0
            dark:border-blue-400/20
            dark:bg-slate-900/30
          "
        >
          <div className="mb-2 hidden px-2 pt-1 lg:block">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Settings
            </h3>
          </div>

          <nav
            aria-label="Profile settings"
            className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    flex min-w-0 shrink-0 items-center gap-3
                    rounded-xl border px-3 py-2.5 text-left
                    transition-all duration-200
                    lg:w-full
                    ${
                      isActive
                        ? "border-blue-200 bg-blue-100/80 text-blue-700 shadow-sm dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                        : "border-transparent text-slate-600 hover:border-blue-100 hover:bg-white/70 dark:text-slate-400 dark:hover:border-blue-900/50 dark:hover:bg-slate-800/60"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-white/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                          : "bg-blue-50/70 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block whitespace-nowrap text-base font-medium">
                      {item.label}
                    </span>
                    <span className="hidden whitespace-nowrap text-sm opacity-70 lg:block text-slate-500 dark:text-slate-400 truncate">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div
            className="
              mb-3 flex items-center gap-2.5
              rounded-xl border border-blue-100/60
              bg-white/40 px-3 py-2.5
              backdrop-blur-lg
              dark:border-blue-900/40
              dark:bg-slate-900/30
            "
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <ActiveIcon size={18} />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {activeItem.label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeItem.description}
              </p>
            </div>
          </div>

          {activeSection === "profile" && (
            <ProfileDetails applicantId={applicantId} />
          )}

          {activeSection === "security" && (
            <ProfileSecurity applicantId={applicantId} />
          )}

          {activeSection === "application" && (
            <ProfileApplicationSettings applicantId={applicantId} />
          )}
        </main>
      </div>
    </div>
  );
}
