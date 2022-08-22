import axios from "axios";
import externalAxiosInstance from "../constant/externalAxiosInstance";
import { LoginInput } from "../interface/Login";

export const loginService = async (loginInput: LoginInput) =>
  axios.post("http://localhost:5001/auth", loginInput, {
    headers: {
      "Content-Type": "application/json",
    },
  });
