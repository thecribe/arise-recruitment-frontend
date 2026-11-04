import PageLoader from "@/components/feedback/page-loader";
import { adminRoles } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { useGeneralSettings } from "@/features/settings/hooks/useGeneralSettings";

import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const { data: settings, isLoading } = useGeneralSettings();
  const { data: user, isPending } = useCurrentUser();

  const organisationName = settings?.organisation_name || "Recruitment Portal";

  const siteName = settings?.site_name || organisationName;

  const description =
    settings?.description || "Recruitment & Compliance Portal";

  const logoUrl = settings?.logo?.document_url;

  if (isPending) {
    return <PageLoader />;
  }

  if (user && !adminRoles.includes(user.role)) {
    return (
      <Navigate
        to={ROUTES.APPLICATION.ROOT}
        replace
        state={{
          from: location,
        }}
      />
    );
  }
  if (user && adminRoles.includes(user.role)) {
    return (
      <Navigate
        to={ROUTES.RECRUITMENT.ROOT}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return (
    <main
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-gradient-to-br
      from-sky-50
      via-blue-100
      to-blue-300
      px-4
      py-6
    "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="
          absolute
          -left-40
          top-0
          h-96
          w-96
          rounded-full
          bg-sky-300/40
          blur-3xl
        "
        />

        <div
          className="
          absolute
          -right-32
          bottom-0
          h-96
          w-96
          rounded-full
          bg-blue-500/30
          blur-3xl
        "
        />
      </div>

      <section
        className="
        relative
        z-10
        flex
        w-full
        max-w-3xl
        flex-col
        items-center
      "
      >
        {/* Brand */}
        <header className="relative z-10 mx-auto w-full max-w-5xl shrink-0 py-4 text-center">
          <div className="mb-3 flex justify-center">
            {isLoading ? (
              <div className="h-14 w-14 animate-pulse rounded-2xl bg-white/60" />
            ) : logoUrl ? (
              <img
                src={logoUrl}
                alt={organisationName}
                className="max-h-14 max-w-48 object-contain"
              />
            ) : (
              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/70
                bg-white/60
                text-2xl
                font-bold
                text-blue-700
                shadow-lg
                backdrop-blur-xl
              "
              >
                {organisationName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
            {organisationName}
          </h1>

          <p className="mt-1 text-sm font-medium text-blue-700">{siteName}</p>

          {description && (
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              {description}
            </p>
          )}
        </header>

        {/* Page Content */}
        <Outlet />

        <p
          className="
          mt-6
          text-center
          text-xs
          text-slate-500
        "
        >
          © {new Date().getFullYear()} {organisationName}. All rights reserved.
        </p>
      </section>
    </main>
  );
}
