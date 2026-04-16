import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/vehicle/${vehicle.vehicle_number}`)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur cursor-pointer
      flex justify-between items-center gap-4 min-h-44 hover:-translate-y-1 hover:bg-white/10
      shadow-md hover:shadow-xl transition-all duration-200"
    >
      <div className="absolute -top-16 -right-16 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl transition group-hover:bg-blue-400/25" />

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-between flex-1 h-full">

        <div>
          <h2 className="text-lg font-semibold tracking-wide">
            {vehicle.vehicle_number}
          </h2>

          <p className="text-sm text-zinc-300">
            {vehicle.brand} • {vehicle.model}
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            {vehicle.year}
          </p>
        </div>

        {/* STATUS */}
        <div className="mt-2">
          <span
            className={`text-sm px-2.5 py-1 rounded-full capitalize ${
              vehicle.status === "sold"
                ? "bg-green-500/20 text-green-400"
                : "bg-blue-500/20 text-blue-300"
            }`}
          >
            {vehicle.status}
          </span>
        </div>

      </div>

      {/* RIGHT SIDE IMAGE */}
      {vehicle.cover_image && (
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={vehicle.cover_image}
            className="w-full h-full object-cover rounded-xl border border-white/10"
          />
        </div>
      )}

    </div>
  );
}

export default VehicleCard;
