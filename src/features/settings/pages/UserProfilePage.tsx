import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ChevronRight,
  KeyRound,
  LoaderCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useUser } from "../hooks/useUsers";
import UserPasswordReset from "../components/users/UserPasswordReset";
import UserProfileDetails from "../components/users/UserProfileDetails";
import UserAccessRole from "../components/users/UserAccessRole";
import UserAccountSecurity from "../components/users/UserAccountSecurity";

type ProfileSection = "profile" | "access" | "password" | "security";

const sections: {
  id: ProfileSection;
  label: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal details",
    icon: UserRound,
  },
  {
    id: "access",
    label: "Access & role",
    description: "Role and permissions",
    icon: BriefcaseBusiness,
  },
  {
    id: "password",
    label: "Password",
    description: "Reset account password",
    icon: KeyRound,
  },
  {
    id: "security",
    label: "Account security",
    description: "Status and activity",
    icon: ShieldCheck,
  },
];

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState<ProfileSection>("profile");

  const { data: user, isLoading, isError, refetch } = useUser(id ?? "");

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <LoaderCircle className="animate-spin text-blue-600" size={28} />
        <span className="ml-3 text-sm text-slate-500">
          Loading user profile...
        </span>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white/80 p-6 dark:border-red-900 dark:bg-slate-950/70">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Unable to load user
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The user may not exist or you may not have permission to view this
          profile.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <Link
            to="/settings/users"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            Back to users
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${user.first_name} ${user.last_name}`.trim();

  return (
    <div className="space-y-5">
      <Link
        to="/settings/users"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
      >
        <ArrowLeft size={17} />
        Back to user management
      </Link>

      <header className="rounded-2xl border border-blue-100/80 bg-gradient-to-br from-white/90 via-blue-50/70 to-sky-100/60 p-5 shadow-sm backdrop-blur-xl dark:border-blue-950/70 dark:from-slate-950/90 dark:via-blue-950/30 dark:to-slate-900/70 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-blue-100 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
            {user.profile_img ? (
              <img
                src={user.profile_img}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold">
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {fullName}
            </h1>
            <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
                {user.role?.name ?? "No role"}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  user.is_active
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-blue-100/80 bg-white/70 p-2 shadow-sm backdrop-blur-xl dark:border-blue-950/70 dark:bg-slate-950/50 lg:sticky lg:top-5">
          <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            User settings
          </p>

          <nav
            aria-label="User profile sections"
            className="flex gap-1 overflow-x-auto lg:flex-col"
          >
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-w-max flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left transition lg:w-full lg:flex-none ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-300"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">
                      {section.label}
                    </span>
                    <span
                      className={`mt-0.5 hidden text-xs lg:block ${
                        isActive
                          ? "text-blue-100"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {section.description}
                    </span>
                  </span>

                  <ChevronRight
                    size={16}
                    className="hidden shrink-0 lg:block"
                  />
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          {activeSection === "password" && <UserPasswordReset user={user} />}

          {activeSection === "profile" && <UserProfileDetails user={user} />}

          {activeSection === "access" && <UserAccessRole user={user} />}

          {activeSection === "security" && <UserAccountSecurity user={user} />}
        </main>
      </div>
    </div>
  );
}
