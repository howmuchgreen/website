import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HowMuchResult } from "../../common/types";

import * as S from "./styles";

export const HomePage: NextPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HowMuchResult[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (query.length > 0) {
      fetch(`/api/${query}`)
        .then((res) => res.json())
        .then((res) => setResults(res.results));
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
            <Link href={`/${result.name.replace(/ /g, "")}`} key={i} passHref>
              <S.Result>{result.name}</S.Result>
            </Link>
          ))}
        </S.ResultsContainer>
      </S.Container>
    </div>
  );
};
