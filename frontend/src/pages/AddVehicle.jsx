import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function AddVehicle() {
  const [form, setForm] = useState({
    name: "",
    vehicle_number: "",
    brand: "",
    model: "",
    year: "",
    km_driven: ""
  });

  const handleSubmit = async () => {
    await api.post("vehicles/", form);
    alert("Vehicle Added");
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Vehicle</h1>
        <p className="text-sm text-zinc-400 mt-1">Create a new vehicle listing to track purchase, expenses, and sales.</p>
      </div>

      <div className="grid gap-3 max-w-2xl md:grid-cols-2">
        {Object.keys(form).map((key) => (
          <label key={key} className="text-sm text-zinc-300">
            <span className="mb-1 block capitalize">{key.replaceAll("_", " ")}</span>
            <input
              placeholder={`Enter ${key.replaceAll("_", " ")}`}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-blue-400"
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
            />
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 rounded-xl bg-blue-500 px-5 py-2.5 font-medium text-white hover:bg-blue-400 transition"
      >
          Submit
      </button>
    </Layout>
  );
}

export default AddVehicle;
