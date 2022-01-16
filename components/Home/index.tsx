import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import * as S from "./styles";
import { ResultObject, Thing } from "@howmuchgreen/howmuchcarbon";

const getResultUrl = (result: Thing) => {
  const { name } = result;
  return `/${name.replace(/ /g, "")}`;
};

export const HomePage: NextPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Thing[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useHotkeys(
    "down",
    (e) => {
      e.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, results.length - 1));
    },
    { enableOnTags: ["INPUT"] },
    [results]
  );
  useHotkeys(
    "up",
    (e) => {
      e.preventDefault();
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    },
    {
      enableOnTags: ["INPUT"],
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(getResultUrl(results[selectedIndex]));
  };

  useEffect(() => {
    if (query.length > 0) {
      fetch(`/api/${query}`)
        .then((res) => res.json())
        .then((res) => {
          setSelectedIndex(0);
          const newResults = pipe(
            res,
            ResultObject.codec.decode,
            Either.getOrElseW((e) => null)
          );
          setResults(newResults?.results ?? []);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>howmuch.green</title>
        <meta name="description" content="How much green?" />
      </Head>
      <S.Container>
        <S.Title>🌱 how green is:</S.Title>
        <form onSubmit={onSubmit} method="post" action="/api/query">
          <S.Input
            placeholder="iPho…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            name="query"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <S.ResultsContainer>
          {results.map((result, i) => (
            <Link href={getResultUrl(result)} key={i} passHref>
              <S.Result $selected={i === selectedIndex}>
                <span>{result.name}</span>
                <span>{result.co2Eq.format()}</span>
              </S.Result>
            </Link>
          ))}
        </S.ResultsContainer>
      </S.Container>
    </div>
  );
};
