import axios from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export type SignUpType = {
  firstName: string;
  lastName: string;
  identifier: string;
  password: string;
};

export const signUp = async (data: SignUpType) => {
  const dataToSend = {
    first_name: data.firstName,
    last_name: data.lastName,
    identifier: data.identifier,
    password: data.password,
  };
  console.log("dataToSend = ", dataToSend);
  return await axios.post("/auth/signup", dataToSend);
};

const usePostSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      alert(`An error occurred during sign up: ${error}`);
    },
  });
};

export default usePostSignUp;
