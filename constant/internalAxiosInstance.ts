import axios from "axios";

const internalAxiosInstance = axios.create({
  baseURL: "/api",
});

internalAxiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
      window.location.href = "http://localhost:3000/login";
    }

    return Promise.reject(err);
  }
);
export default internalAxiosInstance;
