import { Globe, Mail, Phone } from "lucide-react";

import type { GeneralSettings } from "../types/general-settings.types";

interface RefereeFormHeaderProps {
  settings: GeneralSettings | null | undefined;
  isLoading?: boolean;
}

const RefereeFormHeader = ({
  settings,
  isLoading = false,
}: RefereeFormHeaderProps) => {
  if (isLoading) {
    return (
      <div className="mb-8 rounded-2xl border border-blue-200/60 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-blue-400/20 dark:bg-slate-900/60">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-blue-100 dark:bg-slate-800" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-blue-100 dark:bg-slate-800" />
            <div className="h-3 w-56 max-w-full animate-pulse rounded bg-blue-100 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  const organisationName = settings?.organisation_name || "Arise";

  const siteName = settings?.site_name || organisationName;

  const logoUrl = settings?.logo?.document_url;

  return (
    <header className="mb-8 overflow-hidden rounded-2xl border border-blue-200/60 bg-white/70 shadow-lg shadow-blue-900/5 backdrop-blur-2xl dark:border-blue-400/20 dark:bg-slate-900/70">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-6 sm:px-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {logoUrl ? (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white p-2 shadow-sm">
                <img
                  src={logoUrl}
                  alt={`${organisationName} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl font-bold text-white">
                {organisationName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                {organisationName}
              </h1>

              <p className="mt-1 text-sm text-blue-100">{siteName}</p>
            </div>
          </div>

          <div className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
            Reference Verification
          </div>
        </div>

        {settings?.description && (
          <p className="mt-5 max-w-3xl text-sm leading-6 text-blue-100">
            {settings.description}
          </p>
        )}
      </div>

      {(settings?.organisation_email ||
        settings?.telephone ||
        settings?.website_url) && (
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:px-7">
          {settings.organisation_email && (
            <a
              href={`mailto:${settings.organisation_email}`}
              className="flex items-center gap-2 text-xs text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              {settings.organisation_email}
            </a>
          )}

          {settings.telephone && (
            <a
              href={`tel:${settings.telephone}`}
              className="flex items-center gap-2 text-xs text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              {settings.telephone}
            </a>
          )}

          {settings.website_url && (
            <a
              href={settings.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Visit website
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default RefereeFormHeader;
