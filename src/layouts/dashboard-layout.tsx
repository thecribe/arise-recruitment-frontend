import { Outlet } from "react-router-dom";

import { DashboardSidebar } from "@/components/layout/dashboard";
import AppBackground from "@/components/layout/dashboard/AppBackground";
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader";

export default function DashboardLayout() {
  return (
    <>
      <AppBackground />

      <div className="flex min-h-screen w-full min-w-0">
        <DashboardSidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <main className="min-w-0 w-full flex-1 overflow-x-hidden p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="mx-auto w-full min-w-0 max-w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
