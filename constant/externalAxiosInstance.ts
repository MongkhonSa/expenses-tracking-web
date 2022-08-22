import axios from "axios";

const externalAxiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});

export default externalAxiosInstance;
