import axios from "axios";

const internalAxiosInstance = axios.create({
  baseURL: "/api",
});

internalAxiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
    }
    throw { ...err.response, message: err.message };
  }
);
export default internalAxiosInstance;
