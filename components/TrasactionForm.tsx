import Icon from "@ant-design/icons/lib/components/Icon";
import { Button, Form as FormAntd, Input, Radio, Row } from "antd";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Upload from "antd/lib/upload/Upload";
import externalAxiosInstance from "../constant/externalAxiosInstance";
import { UploadSucess } from "../interface/income-and-expenses-account";

const Form = styled(FormAntd)`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
type LoginProps = {
  onSubmit: (loginInput: any) => void;
};

const TrasactionForm = ({ onSubmit }: LoginProps) => {
  const [token, setToken] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<string>();

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  });

  return (
    <Form
      onFinish={onSubmit}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
    >
      <Form.Item
        label="Name"
        name="categoryName"
        rules={[
          {
            required: true,
            message: "Please input your category name!",
          },
        ]}
      >
        <Input placeholder="Category name" />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            message: "Please input your amount",
          },
        ]}
      >
        <Input placeholder="amount" />
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input your amount",
          },
        ]}
      >
        <Radio.Group>
          <Row>
            <Radio value={"income"}>income</Radio>
            <Radio value={"expenses"}>expenses</Radio>
          </Row>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Upload bill" name="file">
        <Upload
          onRemove={() => setFile(undefined)}
          customRequest={async ({ onSuccess, onError, file, onProgress }) => {
            const form = new FormData();
            form.append("file", file);
            try {
              const data: UploadSucess = await externalAxiosInstance.post(
                "/income-and-expenses-account/upload",
                form,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                  onUploadProgress: (event) => {
                    const percent = Math.floor(
                      (event.loaded / event.total) * 100
                    );
                    setProgress(percent);
                    if (percent === 100) {
                      setTimeout(() => setProgress(0), 1000);
                    }
                    onProgress &&
                      onProgress({
                        percent: (event.loaded / event.total) * 100,
                      });
                  },
                }
              );
              setFile(data.path);
              onSuccess && onSuccess("Ok");
            } catch (err) {
              console.log("Error: ", err);
              const error = new Error("Some error");
            }
          }}
        >
          <Button disabled={!!file} icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Record
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TrasactionForm;
