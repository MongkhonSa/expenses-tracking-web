import { AxiosError, AxiosResponse } from "axios";

export const errorHandler = (err: AxiosError) => {
  throw { ...err.response, message: err.message };
};
export const resHandler = (res: AxiosResponse) => {
  return res.data;
};
export const internalErrorHandler = (err: AxiosError) => {
  if (err.response?.status === 401) {
    localStorage.clear();
    window.location.href = "http://localhost:3000/login";
  }

  return Promise.reject(err);
};
