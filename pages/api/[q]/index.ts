import type { NextApiRequest, NextApiResponse } from "next";
import { howMuch, ResultObject } from "@howmuchgreen/howmuchcarbon";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultObject>
) {
  const { q } = req.query;
  const query = `${q}`;

  const result = howMuch(query);

  res.status(200).json(result);
}
