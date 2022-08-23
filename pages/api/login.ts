// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorType } from "../../interface/error-type";
import { LoginOutput } from "../../interface/Login";
import { loginService } from "../../service";
import errorParser from "../../utils/error-parser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginOutput | ErrorType>
) {
  try {
    const response = await loginService(req.body);
    res.status(200).json(response);
  } catch (err) {
    const parseError = errorParser(err);
    return res.status(parseError.status).send(parseError);
  }
}
