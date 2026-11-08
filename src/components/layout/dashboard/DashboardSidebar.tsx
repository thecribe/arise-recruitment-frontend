import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import { useNavigation } from "@/navigation/use-navigation";
import { DashboardSidebarItem } from "./DashboardSidebarItem";
import { useGeneralSettings } from "@/features/settings/hooks/useGeneralSettings";

export function DashboardSidebar() {
  const { collapsed } = useSidebarStore();
  const { data: settings, isLoading } = useGeneralSettings();

  const organisationName = settings?.organisation_name || "Recruitment Portal";

  const logoUrl = settings?.logo?.document_url;

  const navigation = useNavigation();

  return (
    <aside
      className={cn(
        "glass-sidebar",
        "sticky top-0",
        "hidden h-screen lg:flex",
        "transition-all duration-300",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="flex w-full flex-col p-4">
        {/* Logo */}

        <div className="mb-10 flex h-16 items-center">
          {isLoading ? (
            <span className="text-xl font-bold text-blue-400 ">A</span>
          ) : collapsed ? (
            <span className="text-xl font-bold bg-blue-400 ">
              <img
                src={logoUrl}
                alt={organisationName}
                className="max-h-11 max-w-32 object-contain"
              />
            </span>
          ) : (
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {organisationName}
              </h1>

              <p className="text-xs text-slate-400">Recruitment Portal</p>
            </div>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {["APPLICANT", "STAFF"].includes(
            navigation.role ? navigation.role : "",
          ) && (
            <div className="space-y-2">
              <p
                className={`${collapsed ? "truncate" : "normal"} uppercase text-gray-400 border-b-2 w-full py-2`}
              >
                Application
              </p>
              {navigation.permission.map((item) => {
                return (
                  item.type === "general" && (
                    <DashboardSidebarItem
                      key={item.href}
                      item={item}
                      collapsed={collapsed}
                    />
                  )
                );
              })}
            </div>
          )}
          {!(navigation.role === "APPLICANT") && (
            <div className="space-y-5">
              <p
                className={`${collapsed ? "truncate" : "normal"} uppercase text-gray-400 border-b-2 w-full py-2`}
              >
                Management
              </p>
              {navigation.permission.map((item) => {
                return (
                  item.type === "management" && (
                    <DashboardSidebarItem
                      key={item.href}
                      item={item}
                      collapsed={collapsed}
                    />
                  )
                );
              })}
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
}
