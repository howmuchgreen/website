import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ResultThing } from "../../components/ResultThing";
import { howMuch, HowMuchResult } from "@howmuchgreen/howmuchcarbon";
import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import {
  getCarbon2050Percentage,
  getCarbonTodayPercentage,
} from "../../common/carbon";

interface Props {
  result: any;
  query: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { q } = context.query;
  const query = `${q}`;

  const result = howMuch(query).bestResult;

  if (!result) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const encodedResult = HowMuchResult.codec.encode(result);

  return {
    props: {
      result: encodedResult,
      query,
    },
  };
};

const ResultPage: NextPage<Props> = ({ result, query }) => {
  const decodedResult = pipe(
    result,
    HowMuchResult.codec.decode,
    Either.getOrElseW((e) => null)
  );

  if (!decodedResult) {
    return null;
  }

  const { name, co2Eq } = decodedResult;

  const percentageCarbonToday = getCarbonTodayPercentage(co2Eq);
  const percentageCarbon2050 = getCarbon2050Percentage(co2Eq);

  const ogUrl = `https://howmuch.green/${query}`;
  const ogDescription = `${name} emits about ${decodedResult.co2Eq.format()} CO2eq. That’s ${percentageCarbonToday}% of today average human emission, and ${percentageCarbon2050}% of the 2050 target.`;
  const ogImage = `https://howmuch.green/api/${query}/img`;

  return (
    <div>
      <Head>
        <title>howmuch.green is {name}?</title>
        <meta property="description" content={ogDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:title" content={`How green is ${name}?`} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:site" content="@howmuchgreen" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
      </Head>
      <ResultThing result={decodedResult} />
    </div>
  );
};

export default ResultPage;
