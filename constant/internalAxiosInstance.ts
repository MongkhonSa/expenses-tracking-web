import axios from "axios";

const internalAxiosInstance = axios.create({
  baseURL: "/api",
});

internalAxiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
    }
    return { ...err.response, message: err.message };
  }
);
export default internalAxiosInstance;
