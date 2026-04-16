import { FaFilter } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const activeTab = location.pathname === "/add" ? "add" : "dashboard";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-5">
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">🚗 Best Motors</h1>
              <p className="text-xs text-zinc-400">Manage inventory, margins and expenses in one view.</p>
            </div>

            <div className="flex gap-2 items-center">
              <Link
                to="/"
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  activeTab === "dashboard"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-zinc-100 hover:bg-white/15"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/add"
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  activeTab === "add"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-zinc-100 hover:bg-white/15"
                }`}
              >
                Add vehicle
              </Link>
              <button className="bg-white/10 px-3 py-1.5 rounded-lg text-sm hover:bg-white/15 transition">
                CSV
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/15 transition">
                <FaFilter className="text-zinc-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 md:p-6 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
