import axios from "axios";

const externalAxiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});

externalAxiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    throw { ...err.response, message: err.message };
  }
);
export default externalAxiosInstance;
