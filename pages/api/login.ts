// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { LoginOutput } from "../../interface/Login";
import { loginService } from "../../service/login.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginOutput>
) {
  const response = await loginService(req.body);
  res.status(response.status).json(response.data);
}
