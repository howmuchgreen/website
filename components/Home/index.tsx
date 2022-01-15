import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { HowMuchResult } from "../../common/types";
import * as S from "./styles";

const getResultUrl = (result: HowMuchResult) => {
  const { name } = result;
  return `/${name.replace(/ /g, "")}`;
};

export const HomePage: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HowMuchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(getResultUrl(results[0]));
  };

  useEffect(() => {
    if (query.length > 0) {
      fetch(`/api/${query}`)
        .then((res) => res.json())
        .then((res) => {
          setSelectedIndex(null);
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <Head>
        <title>howmuch.green</title>
        <meta name="description" content="How much green?" />
      </Head>
      <S.Container>
        <S.Title>🌱 how green is:</S.Title>
        <form onSubmit={onSubmit}>
          <S.Input
            placeholder="iPho…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <S.ResultsContainer>
          {results.map((result, i) => (
            <Link href={getResultUrl(result)} key={i} passHref>
              <S.Result $selected={i === selectedIndex}>{result.name}</S.Result>
            </Link>
          ))}
        </S.ResultsContainer>
      </S.Container>
    </div>
  );
};
