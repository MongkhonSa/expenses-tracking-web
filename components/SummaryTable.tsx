import React from "react";
import { Table } from "antd";
import { TransactionReportOutputDto } from "../interface/transaction";
const columns = [
  {
    title: "Category Name",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];
type SummaryTableProps = {
  dataSource?: TransactionReportOutputDto[];
};

const SummaryTable = ({ dataSource }: SummaryTableProps) => (
  <Table columns={columns} dataSource={dataSource} />
);

export default SummaryTable;
