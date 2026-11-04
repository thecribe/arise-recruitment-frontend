import { useGeneralSettings } from "@/features/settings/hooks/useGeneralSettings";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const { data: settings } = useGeneralSettings();

  useEffect(() => {
    if (!settings) return;

    // Update browser title
    document.title = settings.site_name || "Recruitment & Compliance Portal";

    // Update favicon
    if (settings.favicon?.document_url) {
      let favicon =
        document.querySelector<HTMLLinkElement>("link[rel~='icon']");

      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }

      favicon.href = settings.favicon.document_url;
    }

    // Update meta description
    if (settings.description) {
      let metaDescription = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      metaDescription.content = settings.description;
    }
  }, [settings]);

  return <Outlet />;
}
