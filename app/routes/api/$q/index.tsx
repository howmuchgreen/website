import {
  CITIES_ABOVE_10_000,
  HowMuch,
  ResultObject,
} from "@howmuchgreen/howmuchcarbon";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const { q } = params;
  const query = `${q}`;

  const results = new HowMuch({
    cities: CITIES_ABOVE_10_000,
  }).search(query);

  const encodedResults = ResultObject.codec.encode(results);
  return encodedResults;
};
