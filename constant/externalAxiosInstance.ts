import axios, { AxiosError, AxiosResponse } from "axios";
import { errorHandler, resHandler } from "./handler";

const externalAxiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});

externalAxiosInstance.interceptors.response.use(resHandler, errorHandler);
export default externalAxiosInstance;
