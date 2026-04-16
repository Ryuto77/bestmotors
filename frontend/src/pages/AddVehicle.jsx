import { useState } from "react";
import api from "../api/axios";

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
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl mb-4">Add Vehicle</h1>

      <div className="flex flex-col gap-3 max-w-md">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="p-2 bg-gray-800 rounded"
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

        <button onClick={handleSubmit} className="bg-green-600 p-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddVehicle;