import { Route, Routes, Navigate  } from "react-router-dom";
import Navbarr from "./components/navbar/Navbar";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Dashboard from "./pages/adminDashboard/Dashboard";
import UserDashboard from "./pages/userDashboard/UserDashboard";

// This is for protected routes
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Unauthorized from "./pages/unauthorized/Unauthorized";

function App() {
  return (
    <>
      <Navbarr />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/adminDashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<ProtectedRoute requiredRole="customer" />}>
          <Route path="/userDashboard" element={<UserDashboard />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
