import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import Layout from "../components/Layout";
import VehicleCard from "../components/VehicleCard";
import { FiSearch, FiPackage, FiCheckCircle, FiClock } from "react-icons/fi";
import { UICard } from "../components/ui";

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <UICard style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: accent ? "var(--accent-dim)" : "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={18} color={accent ? "var(--accent)" : "var(--text-muted)"} />
      </div>
      <div>
        <div style={{ fontSize: "22px", fontWeight: 700, color: accent ? "var(--accent)" : "var(--text)" }}>
          {value}
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "1px" }}>{label}</div>
      </div>
      </UICard>
    </motion.div>
  );
}

const FILTERS = ["All", "In Stock", "Sold"];

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("vehicles/").then((res) => {
      setVehicles(res.data);
      setLoading(false);
    });
  }, []);

  const filtered = vehicles.filter((v) => {
    const query = search.toLowerCase();
    const matchSearch =
      (v.vehicle_number || "").toLowerCase().includes(query) ||
      (v.brand || "").toLowerCase().includes(query) ||
      (v.model || "").toLowerCase().includes(query);

    const matchFilter =
      filter === "All" ||
      (filter === "Sold" && v.status === "sold") ||
      (filter === "In Stock" && v.status !== "sold");

    return matchSearch && matchFilter;
  });

  const total = vehicles.length;
  const sold = vehicles.filter((v) => v.status === "sold").length;
  const inStock = total - sold;

  return (
    <Layout>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
          <h1
            className="bebas"
            style={{ fontSize: "36px", letterSpacing: "2px", color: "var(--text)", lineHeight: 1 }}
          >
            FLEET
          </h1>
          <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            {total} vehicles
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Manage your vehicle inventory</p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <StatCard icon={FiPackage} label="Total Vehicles" value={total} accent />
        <StatCard icon={FiClock} label="In Stock" value={inStock} />
        <StatCard icon={FiCheckCircle} label="Sold" value={sold} />
      </div>

      {/* Search + Filter row */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
          <FiSearch
            size={15}
            color="var(--text-muted)"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            className="input-base"
            style={{ paddingLeft: "40px" }}
            placeholder="Search by plate, brand, model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: "6px" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "Outfit, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
                background: filter === f ? "var(--accent-dim)" : "transparent",
                borderColor: filter === f ? "var(--border-accent)" : "var(--border)",
                color: filter === f ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                borderRadius: "16px",
                height: "240px",
                border: "1px solid var(--border)",
                animation: "pulse 1.5s infinite",
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }}>🚗</div>
          <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "6px", color: "var(--text-dim)" }}>
            No vehicles found
          </div>
          <div style={{ fontSize: "13px" }}>Try adjusting your search or filters</div>
        </div>
      ) : (
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          <AnimatePresence>
            {filtered.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <VehicleCard vehicle={v} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Layout>
  );
}

export default Dashboard;
