/**
 * -----------------------------------------------------------------------------
 * File: DashboardHeader.tsx
 * Description:
 * Top navigation bar for the authenticated dashboard.
 *
 * Responsibilities:
 * - Display the sidebar trigger (mobile & collapsed desktop).
 * - Display the current page title.
 * - Display quick action buttons.
 * - Display notifications.
 * - Display the authenticated user's profile menu.
 *
 * NOTE:
 * This component should remain presentation-focused.
 * Business logic should be handled by dedicated hooks/components.
 * -----------------------------------------------------------------------------
 */

import { Bell, PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserMenu from "./UserMenu";
import { useSidebarStore } from "@/stores/sidebar.store";

/**
 * Dashboard application header.
 */
export default function DashboardHeader() {
  const { toggleCollapsed } = useSidebarStore();

  return (
    <header
      className="
      glass-header
      sticky
      top-0
      z-40
      flex
      h-16
      items-center
      justify-between
      px-6
  "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="clickable hover:bg-blue-50 cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}
