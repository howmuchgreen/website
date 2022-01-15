import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ResultThing } from "../../components/ResultThing";
import { howMuch, HowMuchResult } from "@howmuchgreen/howmuchcarbon";
import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/function";
interface Props {
  result: any;
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
    },
  };
};

const ResultPage: NextPage<Props> = ({ result }) => {
  const decodedResult = pipe(
    result,
    HowMuchResult.codec.decode,
    Either.getOrElseW((e) => null)
  );

  if (!decodedResult) {
    return null;
  }

  const { name } = decodedResult;

  return (
    <div>
      <Head>
        <title>howmuch.green is {name}?</title>
        <meta name="description" content={`How green is ${name}?`} />
      </Head>
      <ResultThing result={decodedResult} />
    </div>
  );
};

export default ResultPage;
