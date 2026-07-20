import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/navigation/navigation.types";

interface Props {
  item: NavigationItem;
  collapsed: boolean;
}

export function DashboardSidebarItem({ item, collapsed }: Props) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          "clickable",
          "flex items-center gap-3 rounded-2xl px-4 py-3",
          "text-slate-600",
          "transition-all duration-200",

          "hover:bg-blue-50",
          "hover:text-blue-700",

          isActive && "bg-blue-600 text-white shadow-lg",

          collapsed && "justify-center px-0",
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />

      {!collapsed && <span className="font-medium">{item.title}</span>}
    </NavLink>
  );
}
