import { Navigate, Route, Routes } from "react-router-dom";
import SignInForm from "../pages/auth/signin";
import SignUpForm from "../pages/auth/signup";

const UnauthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
