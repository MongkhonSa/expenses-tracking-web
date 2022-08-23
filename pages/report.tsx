import { Col, DatePicker, Row, Radio, Select } from "antd";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryTable from "../components/SummaryTable";
import internalAxiosInstance from "../constant/internalAxiosInstance";
import { TransactionReportOutputDto } from "../interface/transaction";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// set thai time zone
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Bangkok");

const { Option } = Select;
type datePickerType = "date" | "week" | "month";
const ReportPage: NextPage = () => {
  const [picker, setPicker] = useState<datePickerType>("date");
  const [startDate, setStartDate] = useState<String>(
    dayjs().startOf("date").toISOString()
  );
  const [endDate, setEndDate] = useState<String>(
    dayjs().endOf("date").toISOString()
  );
  const [type, setType] = useState<String>("income");
  const [report, setReport] = useState<TransactionReportOutputDto[]>();
  const onDateChange = (date: any) => {
    setStartDate(dayjs(date).startOf(picker).toISOString());
    setEndDate(dayjs(date).endOf(picker).toISOString());
  };
  const onTypeChange = (e: any) => {
    setType(e.target.value);
  };

  useEffect(() => {
    internalAxiosInstance
      .post<TransactionReportOutputDto[], TransactionReportOutputDto[]>(
        "/income-and-expenses-account/report",
        {
          startDate,
          endDate,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        setReport(result);
      })
      .catch(() => {
        alert("Error");
      });
  }, [startDate, endDate, type]);
  return (
    <Fragment>
      <Navbar />
      <Row justify="center">
        <h1>Report</h1>{" "}
      </Row>
      <Row>
        <Col span={6} offset={2}>
          <Select
            style={{ width: "100%" }}
            defaultValue="date"
            onChange={setPicker}
          >
            <Option value={"date"}>Daily</Option>
            <Option value={"week"}>Weekly</Option>
            <Option value={"month"}>Monthly</Option>
          </Select>
        </Col>
        <Col span={6} offset={1}>
          <DatePicker
            style={{ width: "100%" }}
            picker={picker}
            onChange={onDateChange}
          />
        </Col>
        <Col span={6} offset={1}>
          <Radio.Group onChange={onTypeChange} defaultValue="income">
            <Row>
              <Radio value="income">income</Radio>
              <Radio value="expenses">expenses</Radio>
            </Row>
          </Radio.Group>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <SummaryTable dataSource={report} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ReportPage;
