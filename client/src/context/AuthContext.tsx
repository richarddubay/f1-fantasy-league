import { createContext, ReactNode, useContext, useState } from "react";
import storage from "../utils/storage";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  identifier?: string;
};

interface IAuthContext {
  isSignedIn: boolean;
  user: User | null;
  signOut: () => void;
  setUserToken: (token: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isSignedIn: false,
  user: null,
  signOut: () => {},
  setUserToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = storage.getToken();

  // Set up the stuff the AuthContext needs.
  const isSignedIn = Boolean(token);

  const signOut = () => {
    setUser(null);
    storage.clearToken();
  };

  const setUserToken = (token: string) => {
    const decoded = jwtDecode(token);
    console.log("decoded = ", decoded);

    if (decoded.sub && decoded.exp) {
      if (Date.now() >= decoded.exp * 1000) {
        storage.clearToken();
        setUser(null);
        return;
      }
      return setUser({ id: decoded.sub });
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, user, signOut, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth has to be used within <AuthContext.Provider>");
  }

  return authContext;
};
