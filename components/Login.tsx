import Icon from "@ant-design/icons/lib/components/Icon";
import { Button, Checkbox, Form as FormAntd, Input } from "antd";
import styled from "styled-components";
import { LoginInput } from "../pages/interface/Login";

const Form = styled(FormAntd)`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
type LoginProps = {
  onSubmit: (loginInput: any) => void;
};

const Login = ({ onSubmit }: LoginProps) => {
  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        label="Username"
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
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
