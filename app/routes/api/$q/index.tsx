import {
  CITIES_ABOVE_10_000,
  HowMuch,
  ResultObject,
  ALL_THINGS,
} from "@howmuchgreen/howmuchcarbon";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const { q } = params;
  const query = `${q}`;

  const results = new HowMuch({
    cities: CITIES_ABOVE_10_000,
    things: ALL_THINGS,
  }).search(query);

  const encodedResults = ResultObject.codec.encode(results);
  return encodedResults;
};
