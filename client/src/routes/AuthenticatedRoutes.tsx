import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/routes/Home";

const AuthenticatedRoutes = () => {
  console.log("Inside AuthenticatedRoutes");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
