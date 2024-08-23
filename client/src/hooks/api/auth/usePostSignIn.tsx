import { useAuth } from "@/context/AuthContext";
import axios from "@/utils/axios";
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export type SignInCredentialsType = {
  identifier: string;
  password: string;
};

export const signIn = async (data: SignInCredentialsType) => {
  return await axios.post("/auth/signin", data);
};

const usePostSignIn = () => {
  const { setUserToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      const token = res.data.accessToken;
      if (token) {
        storage.setToken(token);
        setUserToken(token);
        navigate("/");
      } else {
        alert("Invalid email and password");
      }
    },
    onError: (error) => {
      alert(`An error occurred during sign in: ${error}`);
    },
  });
};

export default usePostSignIn;
