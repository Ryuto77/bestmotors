import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/vehicle/${vehicle.vehicle_number}`)}
      className="bg-white/5 border h-50 border-white/10 rounded-xl p-7 backdrop-blur cursor-pointer 
      flex justify-between items-center gap-3 
      hover:bg-white/10 hover:scale-[1.02] 
      shadow-md hover:shadow-lg transition-all duration-200"
    >

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-between flex-1 h-full">

        <div>
          <h2 className="text-sm font-semibold">
            {vehicle.vehicle_number}
          </h2>

          <p className="text-xs text-gray-400">
            {vehicle.brand} • {vehicle.model}
          </p>

          <p className="text-xs text-gray-500">
            {vehicle.year}
          </p>
        </div>

        {/* STATUS */}
        <div className="mt-2">
          <span
            className={`text-[15px] px-2 py-1 rounded ${
              vehicle.status === "sold"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {vehicle.status}
          </span>
        </div>

      </div>

      {/* RIGHT SIDE IMAGE */}
      {vehicle.cover_image && (
        <div className="w-35 h-full flex-shrink-0">
          <img
            src={vehicle.cover_image}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

    </div>
  );
}

export default VehicleCard;