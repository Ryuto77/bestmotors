import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VehicleDetail from "./pages/VehicleDetail";
import AddVehicle from "./pages/AddVehicle";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AdminOnly({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vehicle/:number" element={<VehicleDetail />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={(
          <AdminOnly>
            <AdminPanel />
          </AdminOnly>
        )}
      />
      <Route
        path="/add"
        element={(
          <AdminOnly>
            <AddVehicle />
          </AdminOnly>
        )}
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
