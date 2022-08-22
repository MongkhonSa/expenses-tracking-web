import { Col, Row } from "antd";
import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";

import WithAuth from "../components/WithAuth";
import internalAxiosInstance from "../constant/internalAxiosInstance";
import { IGetIncomeAndExpensesAccountOutputType } from "../interface/incomeAndExpensesAccount";
import { getIncomeAndExpensesAccount } from "../service";

const Home: NextPage = () => {
  const [incomeAndExpensesAccount, setIncomeAndExpensesAccount] =
    useState<IGetIncomeAndExpensesAccountOutputType>();

  const getIncomeAndExpensesAccountHandler = () => {
    internalAxiosInstance
      .get<
        IGetIncomeAndExpensesAccountOutputType,
        IGetIncomeAndExpensesAccountOutputType
      >("/income-and-expenses-account", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((value) => {
        setIncomeAndExpensesAccount(value);
      });
  };

  useEffect(() => {
    getIncomeAndExpensesAccountHandler();
  }, []);

  return (
    <Fragment>
      <Row justify="center"> Report</Row>
    </Fragment>
  );
};

export default WithAuth(Home);
