import { Alert, Col, ColProps, Row, RowProps } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Register from "../components/Login";
import internalAxiosInstance from "../constant/internalAxiosInstance";
import { LoginInput, LoginOutput } from "../interface/login";

const RegisterCol: React.FunctionComponent<ColProps> = styled(Col)`
  display: flex;
`;
const RegisterContainer: React.FunctionComponent<RowProps> = styled(Row)`
  justify-content: center;
  height: 100vh;
`;

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const onSubmit = (value: LoginInput) => {
    internalAxiosInstance
      .post("/register", value)
      .then(() => {
        alert("Register success!");
        router.push("/login");
      })
      .catch(() => {
        alert("Duplicated User");
      });
  };

  return (
    <RegisterContainer>
      <RegisterCol>
        <Register onSubmit={onSubmit} submitText="Register" />
      </RegisterCol>
    </RegisterContainer>
  );
};

export default RegisterPage;
