import axios from "axios";
import { resHandler, internalErrorHandler } from "./handler";

const internalAxiosInstance = axios.create({
  baseURL: "/api",
});

internalAxiosInstance.interceptors.response.use(
  resHandler,
  internalErrorHandler
);
export default internalAxiosInstance;
