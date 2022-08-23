export type Transaction = {
  type: string;
  categoryName: string;
  amount: number;
  image?: string;
};
export type TransactionReportInputDto = {
  type: string;
  startDate: string;
  endDate: string;
};
export type TransactionReportOutputDto = {
  categoryName: string;
  total: string;
};
