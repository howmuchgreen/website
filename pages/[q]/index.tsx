import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Thing } from "../../common/types";
import { ResultThing } from "../../components/ResultThing";

interface Props {
  result: Thing;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { q } = context.query;

  return {
    props: {
      result: {
        name: `${q}`,
        co2eq: {
          kg: 83,
        },
        sources: ["https://apple.com"],
      },
    },
  };
};

const ResultPage: NextPage<Props> = ({ result }) => {
  const { name } = result;

  return (
    <div>
      <Head>
        <title>howmuch.green is {name}?</title>
        <meta name="description" content={`How much green is ${name}?`} />
      </Head>
      <ResultThing result={result} />
    </div>
  );
};

export default ResultPage;
