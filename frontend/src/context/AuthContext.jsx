import { createContext, useContext, useMemo, useState } from "react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "bestmotors@admin";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("bestmotors-admin") === "true");

  const login = (username, password) => {
    const ok = username === ADMIN_USER && password === ADMIN_PASS;
    if (ok) {
      setIsAdmin(true);
      localStorage.setItem("bestmotors-admin", "true");
    }
    return ok;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("bestmotors-admin");
  };

  const value = useMemo(() => ({ isAdmin, login, logout }), [isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
