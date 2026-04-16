import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VehicleDetail from "./pages/VehicleDetail";
import AddVehicle from "./pages/AddVehicle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicle/:number" element={<VehicleDetail />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/add" element={<AddVehicle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;