/**
 * -----------------------------------------------------------------------------
 * File: UserMenu.tsx
 * Description:
 * Authenticated user menu displayed in the dashboard header.
 *
 * Responsibilities:
 * - Display the current user's avatar.
 * - Display user name and role.
 * - Provide quick access to profile.
 * - Allow the user to logout.
 * -----------------------------------------------------------------------------
 */

import { User } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * User profile menu.
 *
 * TODO:
 * Replace this placeholder with a shadcn DropdownMenu
 * after the authentication flow is complete.
 */
export default function UserMenu() {
  return (
    <Button variant="ghost" className="flex items-center gap-2">
      <User className="h-5 w-5" />

      <span className="hidden text-sm font-medium md:inline">My Account</span>
    </Button>
  );
}
