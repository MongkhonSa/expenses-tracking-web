// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { LoginOutput } from "../../interface/Login";
import { getIncomeAndExpensesAccount, loginService } from "../../service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const response = await getIncomeAndExpensesAccount(req.headers.authorization);
  res.status(response.status).json(response.data);
  res.send("200");
}
