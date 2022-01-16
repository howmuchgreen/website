import type { NextApiRequest, NextApiResponse } from "next";
import { howMuch, ResultObject } from "@howmuchgreen/howmuchcarbon";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { q } = req.query;
  const query = `${q}`;

  const results = howMuch(query);

  const encodedResults = ResultObject.codec.encode(results);

  res.status(200).json(encodedResults);
}
