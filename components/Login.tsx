import Icon from "@ant-design/icons/lib/components/Icon";
import { Button as ButtonAntd, Form as FormAntd, Input } from "antd";
import Link from "next/link";
import { Fragment } from "react";
import styled from "styled-components";

const Form = styled(FormAntd)`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled(ButtonAntd)`
  width: 100%;
`;
type LoginProps = {
  onSubmit: (loginInput: any) => void;
  submitText?: string;
  isRegister?: boolean;
  registerText?: string;
};

const LoginForm = ({
  onSubmit,
  submitText = "Login",
  isRegister = false,
  registerText = "register now!",
}: LoginProps) => {
  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
        {isRegister && (
          <Fragment>
            Or <Link href="/register">{registerText}</Link>
          </Fragment>
        )}
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
