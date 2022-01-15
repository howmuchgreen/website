// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { HowMuchResult } from "../../../common/types";

type Result = {
  results: HowMuchResult[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { q } = req.query;
  const query = `${q}`;

  res.status(200).json({
    results: [
      { name: query, co2eq: { kg: 83 }, sources: [] },
      { name: "iPad", co2eq: { kg: 83 }, sources: [] },
      { name: "iPhone 13 Pro", co2eq: { kg: 83 }, sources: [] },
    ],
  });
}
