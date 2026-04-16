import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function VehicleDetail() {
  const { number } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`search/?number=${number}`).then((res) => {
      setData(res.data);
    });
  }, [number]);

  if (!data) return <Layout>Loading...</Layout>;

  return (
    <Layout>

      {/* Vehicle Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {data.vehicle.vehicle_number}
        </h1>

        <p className="text-gray-400">
          {data.vehicle.brand} • {data.vehicle.model} • {data.vehicle.year}
        </p>
      </div>

      {/* Cover Image */}
      {data.vehicle.cover_image && (
        <img
          src={data.vehicle.cover_image}
          className="rounded-xl mb-4 w-full max-h-80 object-cover"
        />
      )}

      {/* Gallery */}
      <div className="flex gap-2 mb-6">
        {data.vehicle.images.map((img, i) => (
          <img key={i} src={img} className="w-24 rounded" />
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white/5 p-4 rounded-xl">
          <p>Purchase</p>
          <h2>₹{data.purchase.amount}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p>Expenses</p>
          <h2>₹{data.total_expense}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p>Profit</p>
          <h2 className="text-green-400">₹{data.profit}</h2>
        </div>

      </div>

      {/* Expense List */}
      <div className="bg-white/5 p-4 rounded-xl">
        <h3 className="mb-2">Expenses</h3>

        {data.expenses.map((e, i) => (
          <div key={i} className="flex justify-between border-b border-gray-700 py-1">
            <span>{e.type}</span>
            <span>₹{e.amount}</span>
          </div>
        ))}
      </div>

    </Layout>
  );
}

export default VehicleDetail;