import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import Layout from "../components/Layout";
import {
  FiArrowLeft,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";

function MetricCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </span>
        {Icon && (
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: color ? `${color}15` : "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={14} color={color || "var(--text-muted)"} />
          </div>
        )}
      </div>
      <div style={{ fontSize: "26px", fontWeight: 700, color: color || "var(--text)" }}>
        ₹{(value || 0).toLocaleString("en-IN")}
      </div>
      {sub && <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>{sub}</div>}
    </div>
  );
}

function VehicleDetail() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    api.get(`search/?number=${number}`).then((res) => setData(res.data));
  }, [number]);

  if (!data) {
    return (
      <Layout>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40vh" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading vehicle…</div>
        </div>
      </Layout>
    );
  }

  const { vehicle, purchase, sale, expenses, total_expense, profit, status } = data;
  const allImages = [vehicle.cover_image, ...vehicle.images].filter(Boolean);
  const isSold = status === "sold";
  const profitPositive = profit >= 0;

  return (
    <Layout>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          fontSize: "14px",
          fontFamily: "Outfit, sans-serif",
          padding: "0",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        <FiArrowLeft size={16} />
        Back to fleet
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <h1 className="bebas" style={{ fontSize: "40px", letterSpacing: "2px", color: "var(--text)", lineHeight: 1 }}>
                {vehicle.vehicle_number}
              </h1>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  background: isSold ? "var(--sold-bg)" : "var(--unsold-bg)",
                  color: isSold ? "var(--success)" : "var(--danger)",
                  border: `1px solid ${isSold ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
                }}
              >
                {isSold ? "Sold" : "In Stock"}
              </span>
            </div>
            <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
              {vehicle.brand} {vehicle.model} · {vehicle.year}
              {vehicle.km_driven && ` · ${vehicle.km_driven.toLocaleString()} km`}
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left: Images */}
          <div>
            {/* Main image */}
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                aspectRatio: "16/10",
                marginBottom: "10px",
              }}
            >
              {allImages.length > 0 ? (
                <img
                  src={allImages[imgIdx]}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "64px", opacity: 0.1 }}>🚗</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setImgIdx(i)}
                    style={{
                      width: "64px",
                      height: "48px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      flexShrink: 0,
                      border: `2px solid ${i === imgIdx ? "var(--accent)" : "transparent"}`,
                      opacity: i === imgIdx ? 1 : 0.5,
                      transition: "all 0.2s",
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Financials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Metrics grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <MetricCard
                label="Purchase"
                value={purchase?.amount}
                sub={purchase?.date}
                icon={FiDollarSign}
              />
              <MetricCard
                label="Total Expenses"
                value={total_expense}
                sub={`${expenses.length} item${expenses.length !== 1 ? "s" : ""}`}
                icon={FiActivity}
              />
              {isSold && (
                <MetricCard
                  label="Sale Price"
                  value={sale?.amount}
                  sub={sale?.date}
                  icon={FiTrendingUp}
                  color="var(--success)"
                />
              )}
              <MetricCard
                label={isSold ? "Profit / Loss" : "Investment"}
                value={Math.abs(profit)}
                sub={isSold ? (profitPositive ? "Profit ↑" : "Loss ↓") : "Total invested"}
                icon={profitPositive ? FiTrendingUp : FiTrendingDown}
                color={isSold ? (profitPositive ? "var(--success)" : "var(--danger)") : "var(--accent)"}
              />
            </div>

            {/* Expenses list */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "16px",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "14px",
                }}
              >
                Expense Breakdown
              </div>

              {expenses.length === 0 ? (
                <div style={{ color: "var(--text-muted)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
                  No expenses recorded
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  {expenses.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: i < expenses.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "14px", color: "var(--text)" }}>{e.type}</div>
                        {e.date && (
                          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                            <FiCalendar size={10} style={{ display: "inline", marginRight: "3px" }} />
                            {e.date}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>
                        ₹{e.amount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}

                  {/* Total row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 12px 4px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      background: "var(--surface2)",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-dim)" }}>Total</span>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent)" }}>
                      ₹{total_expense.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default VehicleDetail;
