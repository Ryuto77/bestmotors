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

  return (
    <Layout>

      {/* 🔍 Search */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 bg-white/5 px-4 py-2 rounded-xl"
          placeholder="Search vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🚗 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>

    </Layout>
  );
}

export default Dashboard;