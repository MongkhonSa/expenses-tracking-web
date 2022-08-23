import FormData from "form-data";
import externalAxiosInstance from "./constant/externalAxiosInstance";
import { IGetIncomeAndExpensesAccountOutputType } from "./interface/income-and-expenses-account";

import { LoginInput, LoginOutput } from "./interface/Login";

export const loginService = async (loginInput: LoginInput) => {
  return await externalAxiosInstance.post<LoginOutput, LoginOutput>(
    "/auth",
    loginInput,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getIncomeAndExpensesAccount = (accessToken?: string) =>
  externalAxiosInstance.get<
    IGetIncomeAndExpensesAccountOutputType,
    IGetIncomeAndExpensesAccountOutputType
  >("/income-and-expenses-account", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
  });

export const upload = (file: FormData, accessToken?: string) => {
  return externalAxiosInstance.post(
    "/income-and-expenses-account/upload",
    file,
    {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `${accessToken}`,
      },
    }
  );
};
