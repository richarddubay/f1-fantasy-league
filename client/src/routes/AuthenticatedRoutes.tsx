import { Navigate, Route, Routes } from "react-router-dom";
import Drivers from "../pages/drivers.tsx";
import Home from "../pages/home/routes/Home";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
