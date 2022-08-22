import { Col, ColProps, Row, RowProps } from "antd";
import axios, { AxiosResponse } from "axios";
import type { NextPage } from "next";
import styled from "styled-components";
import Login from "../components/Login";
import internalAxiosInstance from "../constant/internalAxiosInstance";
import { LoginInput, LoginOutput } from "../interface/Login";

const LoginCol: React.FunctionComponent<ColProps> = styled(Col)`
  display: flex;
`;
const LoginContainer: React.FunctionComponent<RowProps> = styled(Row)`
  justify-content: center;
  height: 100vh;
`;

const Home: NextPage = () => {
  const onSubmit = async (value: LoginInput) => {
    const token = await internalAxiosInstance.post<LoginOutput, LoginOutput>(
      "/login",
      value
    );
    localStorage.setItem("token", token.accessToken);
  };

  return (
    <LoginContainer>
      <LoginCol>
        <Login onSubmit={onSubmit} />
      </LoginCol>
    </LoginContainer>
  );
};

export default Home;
