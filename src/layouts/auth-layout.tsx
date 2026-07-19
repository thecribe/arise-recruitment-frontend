import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-gradient-to-br
      from-sky-50
      via-blue-100
      to-blue-300
      px-4
      py-6
    "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="
          absolute
          -left-40
          top-0
          h-96
          w-96
          rounded-full
          bg-sky-300/40
          blur-3xl
        "
        />

        <div
          className="
          absolute
          -right-32
          bottom-0
          h-96
          w-96
          rounded-full
          bg-blue-500/30
          blur-3xl
        "
        />
      </div>

      <section
        className="
        relative
        z-10
        flex
        w-full
        max-w-3xl
        flex-col
        items-center
      "
      >
        {/* Brand */}
        <div
          className="
          mb-8
          text-center
        "
        >
          {/* <img src={Logo} alt="Airse Nursing" className="h-14 w-auto" /> */}
          <h1
            className="
            text-3xl
            font-bold
            text-slate-800
          "
          >
            Airse Nursing Agency
          </h1>

          <p
            className="
            mt-2
            text-sm
            text-slate-600
          "
          >
            Recruitment & Compliance Portal
          </p>
        </div>

        {/* Page Content */}
        <Outlet />

        <p
          className="
          mt-6
          text-center
          text-xs
          text-slate-500
        "
        >
          © {new Date().getFullYear()} Airse Nursing Agency
        </p>
      </section>
    </main>
  );
}
