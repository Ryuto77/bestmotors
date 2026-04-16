import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGrid, FiPlus, FiTruck } from "react-icons/fi";

function Layout({ children }) {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Fleet", icon: FiGrid },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      {/* Top Nav */}
      <nav
        style={{
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(7,7,9,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiTruck size={18} color="#000" strokeWidth={2.5} />
            </motion.div>
            <span
              className="bebas"
              style={{
                letterSpacing: "3px",
                fontSize: "22px",
                color: "var(--accent)",
              }}
            >
              BEST MOTORS
            </span>
          </Link>

          {/* Nav right */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                    background: location.pathname === to ? "var(--accent-dim)" : "transparent",
                    color: location.pathname === to ? "var(--accent)" : "var(--text-muted)",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              </Link>
            ))}

            <Link to="/add" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "9px 18px",
                  borderRadius: "9px",
                  border: "none",
                  background: "var(--accent)",
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Outfit, sans-serif",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 16px rgba(232,160,32,0.2)",
                }}
              >
                <FiPlus size={14} strokeWidth={2.5} />
                Add Vehicle
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

export default Layout;
