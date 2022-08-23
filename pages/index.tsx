import { Col, Row } from "antd";
import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import TrasactionForm from "../components/TrasactionForm";

import WithAuth from "../components/WithAuth";
import internalAxiosInstance from "../constant/internalAxiosInstance";
import { IGetIncomeAndExpensesAccountOutputType } from "../interface/income-and-expenses-account";
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

  const onSubmit = async (value: any) => {
    console.log(value);
  };

  return (
    <Fragment>
      <Row justify="center">
        <h1>Report</h1>{" "}
      </Row>
      <Row justify="center">
        <Col span={8}>
          <Row>{`Total Income: ${incomeAndExpensesAccount?.totalIncome}`}</Row>
          <Row>{`Total Expenses: ${incomeAndExpensesAccount?.totalExpenses}`}</Row>
        </Col>
        <Col>
          <TrasactionForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default WithAuth(Home);
