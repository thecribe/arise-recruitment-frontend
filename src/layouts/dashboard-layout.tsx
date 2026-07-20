import { DashboardSidebar } from "@/components/layout/dashboard";
import AppBackground from "@/components/layout/dashboard/AppBackground";
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <AppBackground />

      <div className="flex min-h-screen">
        <DashboardSidebar />

        <div className="flex flex-1 flex-col">
          <DashboardHeader />

          <main className="flex-1 overflow-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
