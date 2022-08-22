import externalAxiosInstance from "./constant/externalAxiosInstance";

import { LoginInput } from "./interface/Login";

export const loginService = async (loginInput: LoginInput) => {
  return await externalAxiosInstance.post("/auth", loginInput, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getIncomeAndExpensesAccount = async (accessToken?: string) => {
  return await externalAxiosInstance.get("/income-and-expenses-account", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
  });
};
