import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UIButton, UICard } from "../components/ui";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(form.username.trim(), form.password);
    if (!ok) {
      setError("Invalid admin credentials");
      return;
    }
    navigate("/admin");
  };

  return (
    <Layout>
      <div style={{ maxWidth: "420px", margin: "40px auto" }}>
        <UICard style={{ padding: "28px" }}>
          <h1 className="bebas" style={{ fontSize: "34px", letterSpacing: "2px", marginBottom: "6px" }}>Admin Login</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
            Only admins can access add/edit/delete controls.
          </p>

          <p style={{ color: "var(--text-dim)", fontSize: "12px", marginBottom: "14px" }}>Demo: <b>admin</b> / <b>bestmotors@admin</b></p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
            <input
              className="input-base"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              className="input-base"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && <div style={{ color: "var(--danger)", fontSize: "13px" }}>{error}</div>}

            <UIButton variant="primary" type="submit" style={{ width: "100%" }}>
              Log In as Admin
            </UIButton>
          </form>
        </UICard>
      </div>
    </Layout>
  );
}

export default Login;
