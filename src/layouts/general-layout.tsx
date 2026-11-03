import { Outlet } from "react-router-dom";

import { useGeneralSettings } from "@/features/referee-form/hooks/general-settings.hooks";

export default function GeneralLayout() {
  const { data: settings, isLoading } = useGeneralSettings();

  const organisationName = settings?.organisation_name || "Recruitment Portal";

  const siteName = settings?.site_name || organisationName;

  const description =
    settings?.description || "Recruitment & Compliance Portal";

  const logoUrl = settings?.logo?.document_url;

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        flex-col
        overflow-x-hidden
        bg-gradient-to-br
        from-sky-50
        via-blue-100
        to-blue-300
        px-4
        py-6
        sm:px-6
      "
    >
      {/* Background Effects */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
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

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-96
            w-96
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/20
            blur-3xl
          "
        />
      </div>

      {/* Organisation Branding */}
      <div className="">
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

        {/* Dynamic Page Content */}

        <section
          className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-5xl
          flex-1
          flex-col
          items-center
          justify-center
          py-6
        "
        >
          <Outlet />
        </section>

        {/* Footer */}

        <footer className="relative z-10 mx-auto mt-auto w-full max-w-5xl shrink-0 py-4 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {organisationName}. All rights
            reserved.
          </p>

          {settings?.website_url && (
            <a
              href={settings.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs text-blue-700 transition hover:text-blue-900 hover:underline"
            >
              Visit our website
            </a>
          )}
        </footer>
      </div>
    </main>
  );
}
