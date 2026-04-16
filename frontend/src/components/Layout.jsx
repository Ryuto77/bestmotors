import { FaFilter } from "react-icons/fa";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">🚗 Best Motors</h1>

        <div className="flex gap-2 items-center">
          <button className="bg-white/10 px-3 py-1 rounded-lg">
            CSV
          </button>
          <FaFilter />
        </div>
      </div>

      {children}
    </div>
  );
}

export default Layout;