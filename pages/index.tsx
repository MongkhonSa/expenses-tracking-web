import { Col, Row } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TrasactionForm from "../components/TransactionForm";

import WithAuth from "../components/WithAuth";
import internalAxiosInstance from "../constant/internalAxiosInstance";
import { IGetIncomeAndExpensesAccountOutputType } from "../interface/income-and-expenses-account";
import { Transaction } from "../interface/transaction";
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
    const { categoryName, amount, type, file } = value;
    internalAxiosInstance
      .post<Transaction, Transaction>(
        `/income-and-expenses-account/${type}`,
        {
          categoryName,
          amount,
          image: file?.file?.response || "",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(async () => {
        await getIncomeAndExpensesAccountHandler();
      })
      .catch(() => {
        alert("error");
      });
  };

  return (
    <Fragment>
      <Navbar />
      <Row justify="center">
        <h1>Dashboard</h1>{" "}
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
