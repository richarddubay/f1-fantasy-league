import { Navigate, Route, Routes } from "react-router-dom";
import SignInForm from "../pages/Auth/routes/SignIn";
import SignUpForm from "../pages/Auth/routes/SignUp";

const UnauthenticatedRoutes = () => {
  console.log("Inside UnauthenticatedRoutes");
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
