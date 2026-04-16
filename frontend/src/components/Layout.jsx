import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGrid, FiTruck, FiMoon, FiSun, FiLogIn, FiShield, FiLogOut } from "react-icons/fi";
import { UIButton, UIIconButton } from "./ui";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("bestmotors-theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bestmotors-theme", theme);
  }, [theme]);

  const navLinks = useMemo(() => [{ to: "/", label: "Fleet", icon: FiGrid }], []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <nav
        style={{
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "10px 24px",
            minHeight: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
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
              <FiTruck size={18} color="#fff" strokeWidth={2.5} />
            </motion.div>
            <span className="bebas" style={{ letterSpacing: "3px", fontSize: "22px", color: "var(--accent)" }}>
              BEST MOTORS
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto", flexWrap: "wrap" }}>
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} style={{ textDecoration: "none" }}>
                <UIButton
                  style={{
                    background: location.pathname === to ? "var(--accent-dim)" : "transparent",
                    color: location.pathname === to ? "var(--accent)" : "var(--text-muted)",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </UIButton>
              </Link>
            ))}

            {isAdmin && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <UIButton
                  style={{
                    background: location.pathname === "/admin" ? "var(--accent-dim)" : "transparent",
                    color: location.pathname === "/admin" ? "var(--accent)" : "var(--text-muted)",
                  }}
                >
                  <FiShield size={14} />
                  Admin
                </UIButton>
              </Link>
            )}

            <UIIconButton
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
            </UIIconButton>

            {isAdmin ? (
              <UIButton
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <FiLogOut size={14} />
                Log Out
              </UIButton>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <UIButton variant="primary">
                    <FiLogIn size={14} />
                    Log In
                  </UIButton>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}

export default Layout;
