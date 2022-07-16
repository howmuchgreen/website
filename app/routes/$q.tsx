import { MetaFunction, redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { howMuch } from "@howmuchgreen/howmuchcarbon";
import { HowMuchResult } from "@howmuchgreen/howmuchcarbon/domain";
import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { ResultThing } from "~/components/Results/ResultThing";
import {
  getCarbon2050Percentage,
  getCarbonTodayPercentage,
} from "~/common/carbon";
import { ResultTrip } from "~/components/Results/ResultTrip";
import { getResultCo2Eq, getResultName } from "~/common/result";

export const loader: LoaderFunction = async ({ params }) => {
  const { q } = params;
  const query = `${q}`;

  const result = howMuch(query).bestResult;

  if (!result) {
    return redirect("/");
  }

  const encodedResult = HowMuchResult.codec.encode(result);

  return {
    result: encodedResult,
    query,
  };
};

export const meta: MetaFunction = ({ data }) => {
  const { result, query } = data;

  const decodedResult = pipe(
    result,
    HowMuchResult.codec.decode,
    Either.getOrElseW((e) => null)
  );

  if (!decodedResult) {
    throw new Error("Should not happen");
  }

  const co2Eq = getResultCo2Eq(decodedResult);
  const name = getResultName(decodedResult);

  const percentageCarbonToday = getCarbonTodayPercentage(co2Eq);
  const percentageCarbon2050 = getCarbon2050Percentage(co2Eq);

  const ogUrl = `https://howmuch.green/${query}`;
  const ogDescription = `${name} emits about ${co2Eq.format()} CO2eq. That’s ${percentageCarbonToday}% of today average human emission, and ${percentageCarbon2050}% of the 2050 target.`;
  const ogImage = `https://howmuch.green/api/${query}/img`;

  return {
    title: `howmuch.green is ${name}?`,
    description: ogDescription,
    "og:url": ogUrl,
    "og:title": `How green is ${name}?`,
    "og:description": ogDescription,
    "og:image": ogImage,
    "twitter:site": "@howmuchgreen",
    "twitter:card": "summary_large_image",
    "twitter:image": ogImage,
  };
};

export default function Posts() {
  const { result } = useLoaderData();

  const decodedResult = pipe(
    result,
    HowMuchResult.codec.decode,
    Either.getOrElseW((e) => null)
  );

  if (!decodedResult) {
    return null;
  }

  if (decodedResult.kind === "thing") {
    return <ResultThing result={decodedResult} />;
  } else if (decodedResult.kind === "trip") {
    return <ResultTrip result={decodedResult} />;
  }

  return null;
}
