import { Col, ColProps, Row, RowProps } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const onSubmit = async (value: LoginInput) => {
    internalAxiosInstance
      .post<LoginOutput, LoginOutput>("/login", value)
      .then((token) => {
        localStorage.setItem("token", token.accessToken);
        router.push("/");
      });
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
