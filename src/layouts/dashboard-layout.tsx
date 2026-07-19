import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-72">Sidebar</aside>

      <div className="flex flex-1 flex-col">
        <header className="h-16">Header</header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
