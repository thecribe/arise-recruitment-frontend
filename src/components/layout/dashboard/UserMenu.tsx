/**
 * -----------------------------------------------------------------------------
 * File: UserMenu.tsx
 *
 * Description:
 * Authenticated user menu displayed in the dashboard header.
 * -----------------------------------------------------------------------------
 */

import { ChevronDown, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser, useLogout } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { notification } from "@/components/feedback/notification";
import type { AxiosError } from "axios";

export default function UserMenu() {
  // TODO: Replace with authenticated user
 
  const {data:user } = useCurrentUser();
  const logout =  useLogout()
  const navigate = useNavigate();
  

const initials = user&&`${user.firstName[0]}${user.lastName[0]}`.toUpperCase();  

    

  const handleLogout = () => {
  logout.mutate(undefined, {
    onSuccess: () => {
      notification.success("Logged out successfully.");

      navigate("/login", {
        replace: true,
      });
    },

    onError: (error) => {
       const axiosError = error as AxiosError<{
                message: string;
                errors?: string[];
              }>;
              notification.error(
                axiosError.response?.data.message ||
                  "Unable to logout. Please try again.",
              );
    },
  });
};

  return (
    user &&<DropdownMenu>
      <DropdownMenuTrigger
        className="
          flex
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          px-2
          py-1.5
          outline-none
          transition-colors
          hover:bg-blue-50/60
          focus-visible:ring-2
          focus-visible:ring-blue-500/30
        "
      >
        <Avatar className="h-9 w-9 border border-blue-100">
          <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="hidden text-left lg:block">
          <p className="text-sm font-semibold text-slate-900">
            {user.firstName + " " + user.lastName}
          </p>

          <p className="text-xs text-slate-500">
            {user.role}
          </p>
        </div>

        <ChevronDown className="hidden h-4 w-4 text-slate-500 lg:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl p-2"
      >
        {/* Profile Header */}
        <div className="flex items-center gap-3 rounded-xl p-3">
          <Avatar className="h-10 w-10 border border-blue-100">
            <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              {user.firstName + " " + user.lastName}
            </p>

            <p className="text-xs text-slate-500">
              {user.role}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            // TODO: Navigate to settings
          }}
        >
          <Settings className="size-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={logout.isPending}
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
           <span>
    {logout.isPending ? "Logging out..." : "Logout"}
  </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}