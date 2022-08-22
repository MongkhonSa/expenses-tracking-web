import axios from "axios";

export const internalAxiosInstance = axios.create({
  baseURL: "/api",
});
