import axios from "axios";
import storage from "@/utils/storage";

const instance = axios.create({
  baseURL: import.meta.env.API_URL ?? "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
