import FormData from "form-data";
import externalAxiosInstance from "./constant/externalAxiosInstance";
import { IGetIncomeAndExpensesAccountOutputType } from "./interface/income-and-expenses-account";

import { LoginInput, LoginOutput } from "./interface/login";
import { Transaction } from "./interface/transaction";

export const loginService = (loginInput: LoginInput) => {
  return externalAxiosInstance.post<LoginOutput, LoginOutput>(
    "/auth",
    loginInput,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const registerService = (loginInput: LoginInput) => {
  return externalAxiosInstance.post("/users", loginInput, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const createIncomeService = (
  transaction: Transaction,
  accessToken?: string
) => {
  return externalAxiosInstance.post<Transaction, Transaction>(
    "/income-and-expenses-account/income",
    transaction,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    }
  );
};
export const createExpensesService = (
  transaction: Transaction,
  accessToken?: string
) => {
  return externalAxiosInstance.post<Transaction, Transaction>(
    "/income-and-expenses-account/expenses",
    transaction,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
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
