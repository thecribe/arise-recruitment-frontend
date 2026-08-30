import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import { useNavigation } from "@/navigation/use-navigation";
import { DashboardSidebarItem } from "./DashboardSidebarItem";

export function DashboardSidebar() {
  const { collapsed } = useSidebarStore();

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

        <div className="mb-10 flex h-16 items-center px-3">
          {collapsed ? (
            <span className="text-xl font-bold text-blue-400">A</span>
          ) : (
            <div>
              <h1 className="text-xl font-bold text-slate-900">AIRSE</h1>

              <p className="text-xs text-slate-400">Recruitment Portal</p>
            </div>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <div className="space-y-2">
            <p className="uppercase text-gray-400 border-b-2 w-full py-2">
              Application
            </p>
            {navigation.map((item) => {
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
          <div className="space-y-5">
            <p className="uppercase text-gray-400 border-b-2 w-full py-2">
              Management
            </p>
            {navigation.map((item) => {
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
        </nav>
      </div>
    </aside>
  );
}
