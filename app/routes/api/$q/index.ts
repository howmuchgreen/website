import { howMuch } from "@howmuchgreen/howmuchcarbon";
import { ResultObject } from "@howmuchgreen/howmuchcarbon";
import { LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  const { q } = params;
  const query = `${q}`;

  const results = howMuch(query);

  const encodedResults = ResultObject.codec.encode(results);
  return encodedResults;
};
