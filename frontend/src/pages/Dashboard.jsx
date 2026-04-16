import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import VehicleCard from "../components/VehicleCard";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("vehicles/").then((res) => {
      setVehicles(res.data);
    });
  }, []);

  // 🔍 Filter vehicles
  const filtered = vehicles.filter((v) => {
  const query = search.toLowerCase();

  return (
    (v.vehicle_number || "").toLowerCase().includes(query) ||
    (v.brand || "").toLowerCase().includes(query) ||
    (v.model || "").toLowerCase().includes(query)
  );
});

  const soldCount = vehicles.filter((v) => v.status === "sold").length;
  const availableCount = vehicles.length - soldCount;

  return (
    <Layout>
      <div className="grid gap-3 md:grid-cols-3 mb-5">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">Total Inventory</p>
          <h3 className="text-2xl font-semibold mt-2">{vehicles.length}</h3>
        </div>
        <div className="rounded-xl border border-white/10 bg-green-500/10 p-4">
          <p className="text-xs uppercase tracking-wide text-green-300">Sold</p>
          <h3 className="text-2xl font-semibold mt-2 text-green-300">{soldCount}</h3>
        </div>
        <div className="rounded-xl border border-white/10 bg-blue-500/10 p-4">
          <p className="text-xs uppercase tracking-wide text-blue-300">Available</p>
          <h3 className="text-2xl font-semibold mt-2 text-blue-300">{availableCount}</h3>
        </div>
      </div>

      {/* 🔍 Search */}
      <div className="flex gap-2 mb-5">
        <input
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-blue-400"
          placeholder="Search by number, brand, or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🚗 Cards */}
      {filtered.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/20 p-10 text-center text-zinc-400">
          No vehicles found for this search.
        </div>
      )}

    </Layout>
  );
}

export default Dashboard;
