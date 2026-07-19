import { Outlet } from "react-router-dom";
// import Logo from "@/assets/logos/logo.png";

export default function AuthLayout() {
  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-blue-100 to-blue-300 px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
      </div>

      <section className="relative z-10 w-full max-w-md ">
        <div className="rounded-3xl border border-white/40 bg-white/30 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center space-y-3">
            {/* <img src={Logo} alt="Airse Nursing" className="h-14 w-auto" /> */}

            <h1 className="text-2xl font-bold text-slate-800">
              Airse Nursing Agency
            </h1>

            <p className="text-sm text-slate-600">
              Recruitment & Compliance Portal
            </p>
          </div>

          <div className="mt-8">
            <Outlet />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Airse Nursing Agency
        </p>
      </section>
    </main>
  );
}
