import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import { UIButton, UICard } from "../components/ui";
import { useAuth } from "../context/AuthContext";

const EMPTY_FORM = { vehicle_number: "", brand: "", model: "", year: "", km_driven: "" };

function AdminPanel() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchVehicles = async () => {
    const res = await api.get("vehicles/");
    setVehicles(res.data);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
      return;
    }
    fetchVehicles();
  }, [isAdmin, navigate]);

  const startEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setForm({
      vehicle_number: vehicle.vehicle_number || "",
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      year: vehicle.year || "",
      km_driven: vehicle.km_driven || "",
    });
  };

  const saveEdit = async () => {
    await api.patch(`vehicles/${editingId}/`, {
      vehicle_number: form.vehicle_number,
      brand: form.brand,
      model: form.model,
      year: form.year,
      km_driven: form.km_driven || null,
    });
    setEditingId(null);
    setForm(EMPTY_FORM);
    fetchVehicles();
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    await api.delete(`vehicles/${id}/`);
    fetchVehicles();
  };

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        <div>
          <h1 className="bebas" style={{ fontSize: "36px", letterSpacing: "2px" }}>Admin Panel</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Manage fleet records: add, edit or delete vehicles.</p>
        </div>
        <UIButton variant="primary" onClick={() => navigate("/add")}>Add Vehicle</UIButton>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        {vehicles.map((vehicle) => (
          <UICard key={vehicle.id} style={{ padding: "16px" }}>
            {editingId === vehicle.id ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                {Object.keys(form).map((key) => (
                  <input
                    key={key}
                    className="input-base"
                    value={form[key]}
                    placeholder={key.replace("_", " ")}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ))}
                <UIButton variant="primary" onClick={saveEdit}>Save</UIButton>
                <UIButton onClick={() => setEditingId(null)}>Cancel</UIButton>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <div className="bebas" style={{ fontSize: "24px", letterSpacing: "1px" }}>{vehicle.vehicle_number}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                    {vehicle.brand} {vehicle.model} · {vehicle.year}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <UIButton onClick={() => startEdit(vehicle)}>Edit</UIButton>
                  <UIButton style={{ borderColor: "rgba(220,38,38,0.45)", color: "var(--danger)" }} onClick={() => deleteVehicle(vehicle.id)}>
                    Delete
                  </UIButton>
                </div>
              </div>
            )}
          </UICard>
        ))}
      </div>
    </Layout>
  );
}

export default AdminPanel;
