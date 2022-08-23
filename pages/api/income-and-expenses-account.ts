// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorType } from "../../interface/error-type";
import { IGetIncomeAndExpensesAccountOutputType } from "../../interface/income-and-expenses-account";
import { getIncomeAndExpensesAccount } from "../../service";
import errorParser from "../../utils/error-parser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetIncomeAndExpensesAccountOutputType | ErrorType>
) {
  try {
    const response = await getIncomeAndExpensesAccount(
      req.headers["authorization"]
    );
    res.status(200).json(response);
  } catch (err) {
    const parseError = errorParser(err);
    return res.status(parseError.status).send(parseError);
  }
}
