import { Navigate, Route, Routes } from "react-router-dom";

const SharedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default SharedRoutes;
