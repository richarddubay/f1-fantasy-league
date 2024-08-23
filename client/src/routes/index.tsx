import { useAuth } from "../context/AuthContext";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
// import SharedRoutes from "./SharedRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";

function RootRouter() {
  const { isSignedIn } = useAuth();

  console.log("isSignedIn = ", isSignedIn);
  return (
    <>
      {isSignedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      {/* <SharedRoutes /> */}
    </>
  );
}
export default RootRouter;
